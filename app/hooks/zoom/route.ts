import { after } from 'next/server';
import { get, list, put } from '@vercel/blob';
import { partnerFolder } from '../../../lib/academy-clips';
import { loadAliases, loadMembers } from '../../../lib/academy-store';
import {
  ingestKey,
  matchPerson,
  nextClipId,
  parseRecordingCompleted,
  pickMp4,
  urlValidationResponse,
  verifySignature,
  type IngestRecord,
  type ZoomRecording,
} from '../../../lib/academy-zoom';

// Zoom `recording.completed` receiver. Off (404) until ZOOM_WEBHOOK_SECRET is set. Verifies the
// signature on the raw body, answers fast, then streams the MP4 into private Blob in the
// background as PENDING. Nobody sees a recording until an owner approves it. A call that does not
// name exactly one listed person waits as UNASSIGNED in `academy/ingest/raw/`.
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
    return Response.json({ duplicate: true }); // a parallel delivery created it first
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

    let path: string;
    let clipId: string | null = null;
    if (who) {
      const folder = partnerFolder(who);
      const taken = (await list({ prefix: `${folder}/` })).blobs.map((x) => x.pathname);
      clipId = nextClipId(taken);
      path = `${folder}/${clipId}.mp4`;
    } else {
      path = `academy/ingest/raw/${record.key}.mp4`;
    }

    const res = await fetch(file.url, { headers: { Authorization: `Bearer ${rec.downloadToken}` } });
    if (!res.ok || !res.body) return fail(`Zoom download answered ${res.status}`);
    await put(path, res.body, { access: 'private', contentType: 'video/mp4', multipart: true, allowOverwrite: false });
    await writeRecord({ ...record, status: who ? 'pending' : 'unassigned', assignedTo: who, clipId, path }, true);
  } catch (e) {
    await fail(e instanceof Error ? e.message : 'ingest failed');
  }
}
