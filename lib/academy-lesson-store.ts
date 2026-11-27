// Node-only Blob I/O for call-to-lesson. S2 holds the transcript half: the raw VTT and the retry
// details needed to fetch it again. S3 adds lessons, the index and the spend ledger here.
// Contract: Projects/sales-academy/04-CALL-TO-LESSON-DESIGN.md, "Storage" and "Transcript ingest".
// Never imported by the Edge middleware.

import { BlobNotFoundError, del, get, head, put } from '@vercel/blob';
import { parseRetryInfo, type RetryInfo } from './academy-approval.ts';
import { readJson } from './academy-ingest-store.ts';
import { isZoomDownloadUrl } from './academy-zoom.ts';
import { downloadWithOneRetry, judgeTranscriptResponse, MAX_VTT_CHARS, type TranscriptAttempt } from './academy-vtt.ts';

// <key> is ingestKey(uuid), so the recording, its transcript and its lesson share one key.
export const transcriptPath = (key: string) => `academy/ingest/transcripts/${key}.vtt`;
const transcriptRetryPath = (key: string) => `academy/ingest/transcript-retry/${key}.json`;

export async function transcriptExists(key: string): Promise<boolean> {
  try {
    await head(transcriptPath(key));
    return true;
  } catch (e) {
    if (e instanceof BlobNotFoundError) return false;
    throw e; // a Blob outage is not "missing"; the caller decides
  }
}

export async function readTranscript(key: string): Promise<string | null> {
  try {
    const r = await get(transcriptPath(key), { access: 'private', useCache: false });
    if (!r || r.statusCode !== 200 || !r.stream) return null;
    return await new Response(r.stream).text();
  } catch {
    return null;
  }
}

// Zoom's token is dead after 24 hours; Blob deletes the file itself after 2 days.
export async function saveTranscriptRetry(key: string, info: RetryInfo) {
  await put(transcriptRetryPath(key), JSON.stringify(info), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    ttlDays: 2,
  });
}

export async function readTranscriptRetry(key: string): Promise<RetryInfo | null> {
  try {
    const j = await readJson(transcriptRetryPath(key));
    return j ? parseRetryInfo(j.value) : null;
  } catch {
    return null;
  }
}

// One GET of the transcript. The token goes only to the zoom.us URL that parseRetryInfo accepted.
export async function fetchTranscriptOnce(info: RetryInfo): Promise<TranscriptAttempt> {
  // Checked here too, not only in the parser: this is the line that sends the token out. The
  // inline host test repeats isZoomDownloadUrl on the parsed URL so the guard sits on the value fetched.
  if (!isZoomDownloadUrl(info.url)) return { ok: false, reason: 'not a Zoom download URL' };
  const url = new URL(info.url);
  if (url.protocol !== 'https:' || !(url.hostname === 'zoom.us' || url.hostname.endsWith('.zoom.us'))) {
    return { ok: false, reason: 'not a Zoom download URL' };
  }
  const res = await fetch(url, { headers: { Authorization: `Bearer ${info.token}` } });
  const len = Number(res.headers.get('content-length'));
  if (len > MAX_VTT_CHARS) return { ok: false, reason: 'transcript too large' };
  return judgeTranscriptResponse(res.status, await res.text());
}

// The raw VTT, unchanged. First write wins: a second delivery of the same transcript finds the file
// and stops, so the stored text never changes under a lesson built from it.
async function storeTranscript(key: string, text: string): Promise<'stored' | 'exists'> {
  try {
    await put(transcriptPath(key), text, { access: 'private', contentType: 'text/vtt', allowOverwrite: false });
    return 'stored';
  } catch (e) {
    if (await transcriptExists(key).catch(() => false)) return 'exists';
    throw e;
  }
}

export type TranscriptOutcome = 'stored' | 'exists' | 'not_ready' | 'failed';

// One log line per run. Never logs a token, a URL or any transcript text: the key, the outcome,
// how many tries and a short reason.
function logTranscript(key: string, outcome: TranscriptOutcome, tries: number, reason?: string) {
  const level = outcome === 'stored' || outcome === 'exists' ? 'info' : 'warn';
  const detail = reason ? ` reason=${JSON.stringify(reason.slice(0, 200))}` : '';
  console[level](`[academy-transcript] key=${key} outcome=${outcome} tries=${tries}${detail}`);
}

// Downloads (once, then once more after 60 s) and stores the transcript. The retry details stay
// until the file is stored, so an owner can fetch it again within Zoom's 24 hours. Never throws.
export async function runTranscriptIngest(
  key: string,
  info: RetryInfo,
  sleep: (ms: number) => Promise<void> = (ms) => new Promise((r) => setTimeout(r, ms)),
): Promise<TranscriptOutcome> {
  const got = await downloadWithOneRetry(() => fetchTranscriptOnce(info), sleep);
  if (!got.ok) {
    logTranscript(key, 'not_ready', got.tries, got.reason);
    return 'not_ready';
  }
  try {
    const outcome = await storeTranscript(key, got.text);
    await del(transcriptRetryPath(key)).catch(() => {});
    logTranscript(key, outcome, got.tries);
    return outcome;
  } catch (e) {
    logTranscript(key, 'failed', got.tries, e instanceof Error ? `${e.name}: ${e.message}` : 'store failed');
    return 'failed';
  }
}
