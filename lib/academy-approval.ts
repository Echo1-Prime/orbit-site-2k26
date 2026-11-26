// Owner approval of ingested Zoom recordings: the pure rules. No network, no storage, so they run
// the same in the admin route and in tests.
//
// An ingested recording waits at academy/ingest/raw/<key>.mp4 (outside every person's folder) with
// a record at academy/ingest/<key>.json. Only an OWNER may:
//   - approve it to a person on the member list: the file is copied into that person's folder as
//     their next free P##, and their clips.json gains one entry built by clipLabels (never the topic);
//   - reassign it (change the suggested person, or leave it unassigned);
//   - retry a failed download while Zoom's download token still lasts (24 hours from delivery).

import { validEmail, type Members, type Role } from './academy-members.ts';
import { PARTNER_CLIP_ID, parsePartnerManifest, partnerFolder, type PartnerClip } from './academy-clips.ts';
import { clipLabels, nextClipId, type IngestRecord, type IngestStatus } from './academy-zoom.ts';

export const canManageRecordings = (role: Role | undefined) => role === 'owner';

const STATUSES: readonly IngestStatus[] = ['downloading', 'pending', 'unassigned', 'failed', 'approved'];
const KEY = /^[0-9a-f]{24}$/;
const s = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '');
const sOrNull = (v: unknown, max: number) => (typeof v === 'string' && v ? v.slice(0, max) : null);

// A record read back from storage. Anything malformed is dropped, never guessed at.
export function parseIngestRecord(raw: unknown): IngestRecord | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;
  const key = s(r.key, 24);
  const status = r.status as IngestStatus;
  if (!KEY.test(key) || !STATUSES.includes(status)) return null;
  const assignedTo = r.assignedTo === null || r.assignedTo === undefined ? null : validEmail(r.assignedTo);
  const clipId = typeof r.clipId === 'string' && PARTNER_CLIP_ID.test(r.clipId) ? r.clipId : null;
  return {
    key,
    uuid: s(r.uuid, 200),
    meetingId: s(r.meetingId, 40),
    topic: s(r.topic, 300),
    startTime: s(r.startTime, 40),
    durationMinutes: Number(r.durationMinutes) > 0 ? Math.round(Number(r.durationMinutes)) : 0,
    status,
    assignedTo,
    clipId,
    path: sOrNull(r.path, 300),
    error: sOrNull(r.error, 300),
    receivedAt: s(r.receivedAt, 40),
    attemptAt: sOrNull(r.attemptAt, 40),
  };
}

// Newest first, so the queue shows the latest calls at the top.
export function sortRecords(records: IngestRecord[]): IngestRecord[] {
  return [...records].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export const RETRY_WINDOW_MS = 24 * 60 * 60 * 1000; // Zoom's download_token lasts 24 hours
// A download still marked `downloading` after this long has died with its function (300 s limit).
export const STALE_DOWNLOAD_MS = 15 * 60 * 1000;

export function canRetry(rec: IngestRecord, nowMs: number): boolean {
  const at = Date.parse(rec.receivedAt);
  if (Number.isNaN(at) || nowMs - at > RETRY_WINDOW_MS) return false;
  if (rec.status === 'failed') return true;
  // A download counts as stuck 15 minutes after its latest start (the delivery, or an owner retry).
  const started = rec.attemptAt ? Date.parse(rec.attemptAt) : at;
  return rec.status === 'downloading' && !Number.isNaN(started) && nowMs - started > STALE_DOWNLOAD_MS;
}

export type Result<T> = { ok: true; value: T } | { ok: false; reason: string };

const waiting = (rec: IngestRecord) => rec.status === 'pending' || rec.status === 'unassigned';

// Change who a waiting recording is suggested for. An empty choice leaves it unassigned.
export function reassign(rec: IngestRecord, emailRaw: unknown, members: Members): Result<IngestRecord> {
  if (!waiting(rec)) return { ok: false, reason: 'Only a waiting recording can be reassigned.' };
  if (emailRaw === '' || emailRaw === null || emailRaw === undefined) {
    return { ok: true, value: { ...rec, status: 'unassigned', assignedTo: null } };
  }
  const email = validEmail(emailRaw);
  if (!email || !members.has(email)) return { ok: false, reason: 'Choose a person on the member list.' };
  return { ok: true, value: { ...rec, status: 'pending', assignedTo: email } };
}

export type ApprovalPlan = {
  email: string;
  clipId: string;
  from: string; // the staged file
  to: string; // the file in the person's folder
  manifest: PartnerClip[]; // the person's clips.json after approval
  record: IngestRecord; // the record after approval
};

// What approving a recording to a person does. `folderNames` are the file names already in that
// person's folder; `manifestRaw` is their clips.json as read (or null when they have none yet).
export function planApproval(
  rec: IngestRecord,
  emailRaw: unknown,
  members: Members,
  folderNames: Iterable<string>,
  manifestRaw: unknown,
): Result<ApprovalPlan> {
  if (!waiting(rec)) return { ok: false, reason: 'This recording is not waiting for approval.' };
  if (!rec.path) return { ok: false, reason: 'This recording has no staged file.' };
  const email = validEmail(emailRaw);
  if (!email || !members.has(email)) return { ok: false, reason: 'Choose a person on the member list.' };

  const existing = manifestRaw === null ? [] : parsePartnerManifest(manifestRaw);
  if (manifestRaw !== null && !Array.isArray(manifestRaw)) {
    return { ok: false, reason: "That person's clip list could not be read, so nothing was changed." };
  }
  if (existing.length >= 50) return { ok: false, reason: 'That person already has 50 recordings.' };

  const clipId = nextClipId([...folderNames, ...existing.map((c) => c.id)]);
  if (!PARTNER_CLIP_ID.test(clipId)) return { ok: false, reason: 'That person has no free recording number left.' };

  const to = `${partnerFolder(email)}/${clipId}.mp4`;
  const labels = clipLabels(rec.startTime, rec.durationMinutes);
  return {
    ok: true,
    value: {
      email,
      clipId,
      from: rec.path,
      to,
      manifest: [...existing, { id: clipId, ...labels }],
      record: { ...rec, status: 'approved', assignedTo: email, clipId, path: to, error: null },
    },
  };
}

// Download details kept beside the record (never shown on any page) so a failed download can be
// retried while Zoom's token lasts. Deleted once the recording is staged.
export type RetryInfo = { url: string; token: string };

export function parseRetryInfo(raw: unknown): RetryInfo | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const url = s(r.url, 2000);
  const token = s(r.token, 4000);
  try {
    if (!url.startsWith('https://') || !new URL(url).hostname.endsWith('zoom.us') || !token) return null;
  } catch {
    return null;
  }
  return { url, token };
}
