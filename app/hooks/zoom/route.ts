import { after } from 'next/server';
import { loadMembers } from '../../../lib/academy-store';
import { loadAliases } from '../../../lib/academy-zoom-store';
import { readRecord, runIngest, saveRetryInfo, writeRecord } from '../../../lib/academy-ingest-store';
import { runTranscriptIngest, saveTranscriptRetry, transcriptExists } from '../../../lib/academy-lesson-store';
import {
  ingestKey,
  matchPerson,
  parseRecordingCompleted,
  parseTranscriptCompleted,
  pickMp4,
  urlValidationResponse,
  verifySignature,
  type IngestRecord,
  type ZoomRecording,
  type ZoomTranscript,
} from '../../../lib/academy-zoom';

// Zoom `recording.completed` receiver. Off (404) until ZOOM_WEBHOOK_SECRET is set. Verifies the
// signature on the raw body, answers fast, then streams the MP4 into private Blob in the
// background. EVERY recording is staged at `academy/ingest/raw/<key>.mp4`, outside every person's
// folder, so nobody can play it. A call that names exactly one listed person is PENDING with that
// person as the suggested owner; anything else is UNASSIGNED. Only owner approval (slice 2) copies
// it into the person's folder as the next P## and lists it in their clips.json.
//
// UNVERIFIED: that a 300-800 MB stream finishes inside maxDuration. A failure is recorded as
// `failed` in the record, never lost silently.
//
// Also takes `recording.transcript_completed` (call-to-lesson S2): the VTT goes to
// academy/ingest/transcripts/<key>.vtt, server only. See acceptTranscript below.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const MAX_BODY = 200_000;
export async function POST(req: Request) {
  const secret = process.env.ZOOM_WEBHOOK_SECRET;
  if (!secret) return new Response('Not found', { status: 404 });
  const raw = await req.text();
  if (raw.length > MAX_BODY) return new Response('Too large', { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const b = body as { event?: string; payload?: { plainToken?: unknown } };
  if (b.event === 'endpoint.url_validation') {
    const plain = b.payload?.plainToken;
    if (typeof plain !== 'string' || plain.length > 200) return new Response('Bad request', { status: 400 });
    return Response.json(urlValidationResponse(secret, plain));
  }

  if (!verifySignature(secret, req.headers.get('x-zm-request-timestamp'), raw, req.headers.get('x-zm-signature'))) {
    return new Response('Unauthorized', { status: 401 });
  }

  const tx = parseTranscriptCompleted(body);
  if (tx) return acceptTranscript(tx);

  const rec = parseRecordingCompleted(body);
  if (!rec) return Response.json({ ignored: true }); // some other event, or nothing usable

  const key = ingestKey(rec.uuid);
  if (await readRecord(key)) return Response.json({ duplicate: true });
  const record: IngestRecord = {
    key,
    uuid: rec.uuid,
    meetingId: rec.meetingId,
    topic: rec.topic,
    startTime: rec.startTime,
    durationMinutes: rec.durationMinutes,
    status: 'downloading',
    assignedTo: null,
    clipId: null,
    path: null,
    error: null,
    receivedAt: new Date().toISOString(),
  };
  try {
    await writeRecord(record, false);
  } catch {
    // Either a parallel delivery created the record first (a real duplicate), or the write failed.
    // Only a record we can read back counts as a duplicate; otherwise answer 500 so Zoom redelivers
    // instead of the recording being dropped. UNVERIFIED: Zoom's retry policy for non-2xx answers.
    if (await readRecord(key)) return Response.json({ duplicate: true });
    return new Response('Could not record the delivery', { status: 500 });
  }
  after(() => ingest(rec, record));
  return Response.json({ accepted: true });
}

// recording.transcript_completed. Stored at academy/ingest/transcripts/<key>.vtt under the same key
// as the recording, even if recording.completed has not arrived yet; the ingest record gains no
// status, the file's existence is the state. The retry details are saved BEFORE answering, so a
// failed save makes Zoom redeliver instead of losing the transcript. S3 adds maybeStartDraft(key)
// after the store; until then nothing reads the file but the server.
async function acceptTranscript(tx: ZoomTranscript): Promise<Response> {
  const key = ingestKey(tx.uuid);
  try {
    if (await transcriptExists(key)) return Response.json({ duplicate: true });
    await saveTranscriptRetry(key, { url: tx.url, token: tx.downloadToken });
  } catch {
    return new Response('Could not record the delivery', { status: 500 });
  }
  after(() => runTranscriptIngest(key, { url: tx.url, token: tx.downloadToken }).then(() => {}));
  return Response.json({ accepted: true });
}

async function ingest(rec: ZoomRecording, record: IngestRecord) {
  const file = pickMp4(rec.files);
  if (!file) {
    await writeRecord({ ...record, status: 'failed', error: 'no MP4 in this recording' }, true).catch(() => {});
    return;
  }
  const info = { url: file.url, token: rec.downloadToken };
  // Kept (private, never shown) so an owner can retry a failed download within Zoom's 24 hours.
  await saveRetryInfo(record.key, info).catch(() => {});
  const members = await loadMembers();
  const who = members ? matchPerson(rec.topic, await loadAliases(), members) : null;
  // Staged outside every person's folder whether matched or not: a P## file in a person's folder
  // is playable by them even before it is in clips.json, so it must not land there unapproved.
  await runIngest(record, info, who);
}
