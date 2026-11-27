// Node-only Blob reads and writes for the Zoom ingest and its owner approval. Used by
// /hooks/zoom and /academy/admin. Never imported by the Edge middleware.

import { copy, del, get, list, put } from '@vercel/blob';
import { partnerFolder, partnerManifestPath } from './academy-clips.ts';
import { parseIngestRecord, parseRetryInfo, type ApprovalPlan, type RetryInfo } from './academy-approval.ts';
import { stagedVideoPath, type IngestRecord } from './academy-zoom.ts';

const INGEST_PREFIX = 'academy/ingest/';
export const recordPath = (key: string) => `${INGEST_PREFIX}${key}.json`;
// Kept apart from the records so the admin list (one folder level) never reads it.
const retryPath = (key: string) => `${INGEST_PREFIX}retry/${key}.json`;

export async function readJson(path: string): Promise<{ value: unknown; etag: string } | null> {
  // Straight from origin: a cached copy could show an approved record as still waiting.
  const r = await get(path, { access: 'private', useCache: false });
  if (!r || r.statusCode !== 200 || !r.stream) return null;
  return { value: JSON.parse(await new Response(r.stream).text()), etag: r.blob.etag };
}

export async function readRecord(key: string): Promise<IngestRecord | null> {
  try {
    const j = await readJson(recordPath(key));
    return j ? parseIngestRecord(j.value) : null;
  } catch {
    return null;
  }
}

export async function writeRecord(rec: IngestRecord, overwrite: boolean) {
  await put(recordPath(rec.key), JSON.stringify(rec), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: overwrite,
  });
}

// Every record directly under academy/ingest/ (not raw/ or retry/). All pages are read, because
// listing order is by key, not by date. Sorting newest first is the caller's job.
export async function listRecords(): Promise<IngestRecord[]> {
  const out: IngestRecord[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: INGEST_PREFIX, mode: 'folded', cursor, limit: 200 });
    for (const b of page.blobs) {
      const m = /^academy\/ingest\/([0-9a-f]{24})\.json$/.exec(b.pathname);
      if (!m) continue;
      const rec = await readRecord(m[1]);
      if (rec) out.push(rec);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out;
}

export async function saveRetryInfo(key: string, info: RetryInfo) {
  // Zoom's token is dead after 24 hours; Blob deletes the file itself after 2 days if nothing else does.
  await put(retryPath(key), JSON.stringify(info), { access: 'private', contentType: 'application/json', allowOverwrite: true, ttlDays: 2 });
}

export async function readRetryInfo(key: string): Promise<RetryInfo | null> {
  try {
    const j = await readJson(retryPath(key));
    return j ? parseRetryInfo(j.value) : null;
  } catch {
    return null;
  }
}

// Streams the Zoom MP4 to the staging path, outside every person's folder. Overwrites a partial
// file a dead attempt may have left. Throws with a short reason on any failure.
export async function stageFromZoom(key: string, info: RetryInfo): Promise<string> {
  const res = await fetch(info.url, { headers: { Authorization: `Bearer ${info.token}` } });
  if (!res.ok || !res.body) throw new Error(`Zoom download answered ${res.status}`);
  const path = stagedVideoPath(key);
  await put(path, res.body, { access: 'private', contentType: 'video/mp4', multipart: true, allowOverwrite: true });
  return path;
}

// Downloads (or re-downloads) a recording and records the outcome. Never throws.
export async function runIngest(record: IngestRecord, info: RetryInfo, who: string | null) {
  try {
    const path = await stageFromZoom(record.key, info);
    await writeRecord({ ...record, status: who ? 'pending' : 'unassigned', assignedTo: who, clipId: null, path, error: null }, true);
    // Only once the record says it is staged: until then a retry may still need these details.
    await del(retryPath(record.key)).catch(() => {});
  } catch (e) {
    const error = (e instanceof Error ? e.message : 'ingest failed').slice(0, 300);
    await writeRecord({ ...record, status: 'failed', error }, true).catch(() => {});
  }
}

// What approval needs to know about the person's folder: the file names in it and their
// clips.json (null when there is none yet), with the etag so the write cannot race another.
export async function readPersonFolder(email: string): Promise<{ names: string[]; manifest: unknown; etag: string | null }> {
  const folder = `${partnerFolder(email)}/`;
  const names: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: folder, cursor, limit: 1000 });
    for (const b of page.blobs) names.push(b.pathname.slice(folder.length));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const j = await readJson(partnerManifestPath(email));
  return { names, manifest: j ? j.value : null, etag: j ? j.etag : null };
}

// One log line per approval step that fails, so a refused or broken approval shows in the
// runtime logs. Never logs an email address or a token: the record key, the step and the
// error class and message only.
export function logApproval(level: 'warn' | 'error', step: string, key: string, err?: unknown): void {
  const raw = err instanceof Error ? `${err.name}: ${err.message}` : err === undefined ? '' : String(err);
  const detail = raw ? ` err=${JSON.stringify(raw.slice(0, 300))}` : '';
  console[level](`[academy-approve] step=${step} key=${key}${detail}`);
}

export type ApplyResult = { ok: true; warning?: string } | { ok: false; reason: string };

// Applies an approval plan. Order: copy the file (never overwriting), then write clips.json only
// if it has not changed since it was read, then mark the record approved, then tidy the staged
// file. If clips.json cannot be written, the copied file is removed again so nothing is half done.
export async function applyApproval(plan: ApprovalPlan, manifestEtag: string | null): Promise<ApplyResult> {
  try {
    await copy(plan.from, plan.to, { access: 'private', contentType: 'video/mp4', allowOverwrite: false });
  } catch (e) {
    logApproval('error', 'copy', plan.record.key, e);
    return { ok: false, reason: 'The recording could not be copied into that person’s folder. Nothing was changed.' };
  }
  try {
    await put(partnerManifestPath(plan.email), JSON.stringify(plan.manifest, null, 2), {
      access: 'private',
      contentType: 'application/json',
      ...(manifestEtag ? { ifMatch: manifestEtag, allowOverwrite: true } : { allowOverwrite: false }),
    });
  } catch (e) {
    logApproval('error', 'manifest', plan.record.key, e);
    await del(plan.to).catch((d) => logApproval('error', 'rollback', plan.record.key, d));
    return { ok: false, reason: 'That person’s clip list changed or could not be saved. Nothing was changed; try again.' };
  }
  try {
    await writeRecord(plan.record, true);
  } catch (e) {
    logApproval('error', 'record', plan.record.key, e);
    return { ok: true, warning: `Approved as ${plan.clipId}, but the queue entry could not be updated. Do not approve it again.` };
  }
  await del(plan.from).catch((e) => logApproval('warn', 'tidy', plan.record.key, e));
  return { ok: true };
}
