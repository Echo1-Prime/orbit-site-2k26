import { after } from 'next/server';
import { get, put } from '@vercel/blob';
import { loadMembers } from '../../../lib/academy-store';
import { loadAliases } from '../../../lib/academy-zoom-store';
import {
  ingestKey,
  matchPerson,
  parseRecordingCompleted,
  pickMp4,
  stagedVideoPath,
  urlValidationResponse,
  verifySignature,
  type IngestRecord,
  type ZoomRecording,
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
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const MAX_BODY = 200_000;
const recordPath = (key: string) => `academy/ingest/${key}.json`;

async function readRecord(key: string): Promise<IngestRecord | null> {
  try {
    const r = await get(recordPath(key), { access: 'private' });
    if (!r || !r.stream) return null;
    return JSON.parse(await new Response(r.stream).text()) as IngestRecord;
  } catch {
    return null;
  }
}

async function writeRecord(rec: IngestRecord, overwrite: boolean) {
  await put(recordPath(rec.key), JSON.stringify(rec), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: overwrite,
  });
}

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

async function ingest(rec: ZoomRecording, record: IngestRecord) {
  const fail = async (error: string) => writeRecord({ ...record, status: 'failed', error: error.slice(0, 300) }, true).catch(() => {});
  try {
    const file = pickMp4(rec.files);
    if (!file) return fail('no MP4 in this recording');

    const members = await loadMembers();
    const who = members ? matchPerson(rec.topic, await loadAliases(), members) : null;
    // Staged outside every person's folder whether matched or not: a P## file in a person's folder
    // is playable by them even before it is in clips.json, so it must not land there unapproved.
    const path = stagedVideoPath(record.key);

    const res = await fetch(file.url, { headers: { Authorization: `Bearer ${rec.downloadToken}` } });
    if (!res.ok || !res.body) return fail(`Zoom download answered ${res.status}`);
    await put(path, res.body, { access: 'private', contentType: 'video/mp4', multipart: true, allowOverwrite: false });
    await writeRecord({ ...record, status: who ? 'pending' : 'unassigned', assignedTo: who, clipId: null, path }, true);
  } catch (e) {
    await fail(e instanceof Error ? e.message : 'ingest failed');
  }
}
