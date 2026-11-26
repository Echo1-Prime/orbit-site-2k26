// Zoom recording ingest: the pure rules. No network, no storage, so they run the same in the
// webhook route and in tests.
//
// Flow: Zoom sends `recording.completed` to /hooks/zoom. We verify the signature, work out whose
// call it is, stream the MP4 into private Blob as PENDING, and show it to nobody until an owner
// approves it. Anything we cannot match to exactly one person waits as UNASSIGNED.
//
// Zoom facts used here (developers.zoom.us, checked 2026-11-25):
//   - endpoint.url_validation: reply { plainToken, encryptedToken = HMAC-SHA256(secret, plainToken) hex }.
//   - Each event is signed: header x-zm-signature = "v0=" + HMAC-SHA256(secret, `v0:${timestamp}:${rawBody}`) hex,
//     timestamp in x-zm-request-timestamp.
//   - recording.completed carries a top-level download_token; send it as `Authorization: Bearer` to each
//     file's download_url. It lasts 24 hours.
// UNVERIFIED: the exact current payload shape (Zoom's examples are old); the parser drops anything it
// does not recognise instead of guessing.

import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { normalizeEmail } from './academy-auth.ts';
import type { Members } from './academy-members.ts';

const REPLAY_WINDOW_SECONDS = 5 * 60;

const hmacHex = (secret: string, data: string) => createHmac('sha256', secret).update(data).digest('hex');

export function urlValidationResponse(secret: string, plainToken: string) {
  return { plainToken, encryptedToken: hmacHex(secret, plainToken) };
}

// True only for a correctly signed request that is recent. The body must be the RAW text Zoom sent.
export function verifySignature(
  secret: string | undefined,
  timestamp: string | null,
  rawBody: string,
  signature: string | null,
  nowSeconds: number = Math.floor(Date.now() / 1000),
): boolean {
  if (!secret || secret.length < 16 || !timestamp || !signature) return false;
  const ts = Number(timestamp);
  if (!Number.isInteger(ts) || Math.abs(nowSeconds - ts) > REPLAY_WINDOW_SECONDS) return false;
  const want = Buffer.from(`v0=${hmacHex(secret, `v0:${timestamp}:${rawBody}`)}`);
  const got = Buffer.from(signature);
  return want.length === got.length && timingSafeEqual(want, got);
}

export type ZoomFile = { id: string; type: string; url: string; size: number; recordingType: string };
export type ZoomRecording = {
  uuid: string;
  meetingId: string;
  topic: string;
  startTime: string;
  durationMinutes: number;
  hostEmail: string;
  downloadToken: string;
  files: ZoomFile[];
};

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.slice(0, max) : '');

// Returns null for anything that is not a usable recording.completed event.
export function parseRecordingCompleted(body: unknown): ZoomRecording | null {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  if (b.event !== 'recording.completed') return null;
  const o = (b.payload as Record<string, unknown> | undefined)?.object as Record<string, unknown> | undefined;
  if (!o || typeof o !== 'object') return null;
  const uuid = str(o.uuid, 200);
  const downloadToken = str(b.download_token, 4000);
  const rawFiles = Array.isArray(o.recording_files) ? o.recording_files : [];
  const files: ZoomFile[] = [];
  for (const f of rawFiles) {
    if (!f || typeof f !== 'object') continue;
    const r = f as Record<string, unknown>;
    const url = str(r.download_url, 2000);
    if (!url.startsWith('https://') || !new URL(url).hostname.endsWith('zoom.us')) continue; // never fetch elsewhere
    files.push({
      id: str(r.id, 100),
      type: str(r.file_type, 20).toUpperCase(),
      url,
      size: Number(r.file_size) > 0 ? Number(r.file_size) : 0,
      recordingType: str(r.recording_type, 60),
    });
  }
  if (!uuid || !downloadToken || files.length === 0) return null;
  return {
    uuid,
    meetingId: String(o.id ?? '').slice(0, 40),
    topic: str(o.topic, 300),
    startTime: str(o.start_time, 40),
    durationMinutes: Number(o.duration) > 0 ? Math.round(Number(o.duration)) : 0,
    hostEmail: str(o.host_email, 254),
    downloadToken,
    files,
  };
}

// The recording to keep: the speaker-view MP4 if there is one, else the largest MP4.
export function pickMp4(files: ZoomFile[]): ZoomFile | null {
  const mp4 = files.filter((f) => f.type === 'MP4');
  if (mp4.length === 0) return null;
  return mp4.find((f) => f.recordingType === 'shared_screen_with_speaker_view') ?? [...mp4].sort((a, b) => b.size - a.size)[0];
}

// Whose call is it? Aliases map a lowercase name to an email (kept in Global Config, edited by an
// owner). A topic that names exactly one listed person is theirs; zero or several is UNASSIGNED.
// Only a person who is still on the member list can match. Never guessed from an email address.
export function matchPerson(topic: string, aliases: Record<string, string>, members: Members): string | null {
  const t = ` ${topic.toLowerCase().replace(/[^a-z0-9]+/g, ' ')} `;
  const hits = new Set<string>();
  for (const [name, email] of Object.entries(aliases)) {
    const n = ` ${name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;
    const e = normalizeEmail(email);
    if (n.trim() && t.includes(n) && members.has(e)) hits.add(e);
  }
  return hits.size === 1 ? [...hits][0] : null;
}

export function parseAliases(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v === 'string' && k.trim()) out[k.trim().toLowerCase()] = normalizeEmail(v);
  }
  return out;
}

export const ingestKey = (uuid: string) => createHash('sha256').update(uuid).digest('hex').slice(0, 24);

// Where an ingested recording waits until an owner approves it. Never inside a person's folder
// (academy/partner/...), because any P## file there is playable by that person.
export const stagedVideoPath = (key: string) => `academy/ingest/raw/${key}.mp4`;

// Next free personal clip id (P01, P02...) given the file names already in the person's folder
// and any ids already promised in the manifest.
export function nextClipId(taken: Iterable<string>): string {
  let max = 0;
  for (const name of taken) {
    const m = /^P(\d{2})(?:\.mp4)?$/.exec(name.split('/').pop() ?? '');
    if (m) max = Math.max(max, Number(m[1]));
  }
  return `P${String(max + 1).padStart(2, '0')}`;
}

// Title, note and length shown to the person. Built from the date and length only, so the Zoom
// topic (which can name other people) never reaches a viewer.
export function clipLabels(startTime: string, durationMinutes: number): { title: string; note: string; len: string } {
  const d = new Date(startTime);
  const date = Number.isNaN(d.getTime())
    ? ''
    : new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Chicago' }).format(d);
  const h = Math.floor(durationMinutes / 60);
  const m = durationMinutes % 60;
  return {
    title: 'Call with Josh Meunier',
    note: date ? `Our call on ${date}` : 'Our call',
    len: h > 0 ? `${h}:${String(m).padStart(2, '0')}:00` : `${m}:00`,
  };
}

export type IngestStatus = 'downloading' | 'pending' | 'unassigned' | 'failed' | 'approved';
export type IngestRecord = {
  key: string;
  uuid: string;
  meetingId: string;
  topic: string; // owners only: shown in the admin queue, never to the person
  startTime: string;
  durationMinutes: number;
  status: IngestStatus;
  assignedTo: string | null; // suggested by the topic match; an owner confirms or changes it on approval
  clipId: string | null; // set only on approval, when the file is copied into the person's folder
  path: string | null; // the staged file while not approved
  error: string | null;
  receivedAt: string;
  attemptAt?: string | null; // when the latest owner retry started; the 24-hour window still runs from receivedAt
};
