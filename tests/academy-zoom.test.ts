import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import {
  clipLabels,
  ingestKey,
  matchPerson,
  nextClipId,
  parseAliases,
  parseRecordingCompleted,
  pickMp4,
  urlValidationResponse,
  verifySignature,
} from '../lib/academy-zoom.ts';
import type { Members, Role } from '../lib/academy-members.ts';

const SECRET = 'a-webhook-secret-token-0123456789';
const sign = (ts: string, body: string) => `v0=${createHmac('sha256', SECRET).update(`v0:${ts}:${body}`).digest('hex')}`;
const NOW = 1_800_000_000;

test('url validation echoes the plain token with an HMAC of it', () => {
  const r = urlValidationResponse(SECRET, 'abc');
  assert.equal(r.plainToken, 'abc');
  assert.equal(r.encryptedToken, createHmac('sha256', SECRET).update('abc').digest('hex'));
});

test('a correctly signed recent request verifies; tampering, wrong secret, stale or missing parts do not', () => {
  const body = '{"event":"recording.completed"}';
  const ts = String(NOW);
  assert.equal(verifySignature(SECRET, ts, body, sign(ts, body), NOW), true);
  assert.equal(verifySignature(SECRET, ts, body + ' ', sign(ts, body), NOW), false);
  assert.equal(verifySignature('another-secret-token-9876543210', ts, body, sign(ts, body), NOW), false);
  assert.equal(verifySignature(SECRET, String(NOW - 600), body, sign(String(NOW - 600), body), NOW), false);
  assert.equal(verifySignature(SECRET, ts, body, null, NOW), false);
  assert.equal(verifySignature(SECRET, null, body, sign(ts, body), NOW), false);
  assert.equal(verifySignature(undefined, ts, body, sign(ts, body), NOW), false);
  assert.equal(verifySignature('short', ts, body, sign(ts, body), NOW), false);
  assert.equal(verifySignature(SECRET, ts, body, 'v0=' + 'a'.repeat(10), NOW), false);
});

const event = (over: Record<string, unknown> = {}, files?: unknown[]) => ({
  event: 'recording.completed',
  download_token: 'tok',
  payload: {
    object: {
      uuid: 'UUID/with+chars==',
      id: 87097341870,
      topic: 'Echo 1 Labs | Founder Meeting | Josh Meunier.  (Hesham Talaat)',
      start_time: '2026-11-20T15:00:53Z',
      duration: 61,
      host_email: 'host@example.com',
      recording_files: files ?? [
        { id: 'a', file_type: 'MP4', file_size: 300, recording_type: 'shared_screen_with_speaker_view', download_url: 'https://us06web.zoom.us/rec/download/abc' },
        { id: 'b', file_type: 'M4A', file_size: 30, recording_type: 'audio_only', download_url: 'https://us06web.zoom.us/rec/download/def' },
        { id: 'c', file_type: 'TRANSCRIPT', file_size: 1, recording_type: 'audio_transcript', download_url: 'https://us06web.zoom.us/rec/download/ghi' },
      ],
      ...over,
    },
  },
});

test('a recording.completed event is parsed; other events and bad shapes are not', () => {
  const r = parseRecordingCompleted(event());
  assert.ok(r);
  assert.equal(r.durationMinutes, 61);
  assert.equal(r.downloadToken, 'tok');
  assert.equal(r.files.length, 3);
  for (const bad of [null, 'x', {}, { event: 'meeting.started' }, { ...event(), download_token: '' }, event({ uuid: '' }), event({}, [])]) {
    assert.equal(parseRecordingCompleted(bad), null);
  }
});

test('download links that are not https zoom.us are dropped', () => {
  const r = parseRecordingCompleted(
    event({}, [
      { id: 'x', file_type: 'MP4', file_size: 1, recording_type: 'a', download_url: 'https://evil.example.com/steal' },
      { id: 'y', file_type: 'MP4', file_size: 1, recording_type: 'a', download_url: 'http://us06web.zoom.us/insecure' },
      { id: 'z', file_type: 'MP4', file_size: 5, recording_type: 'a', download_url: 'https://us06web.zoom.us/ok' },
    ]),
  );
  assert.deepEqual(r?.files.map((f) => f.id), ['z']);
  assert.equal(parseRecordingCompleted(event({}, [{ id: 'x', file_type: 'MP4', download_url: 'https://evil.example.com/' }])), null);
});

test('the speaker-view MP4 is kept, else the largest MP4, else nothing', () => {
  const f = (id: string, type: string, size: number, rt: string) => ({ id, type, size, recordingType: rt, url: 'https://zoom.us/x' });
  assert.equal(pickMp4([f('a', 'MP4', 10, 'gallery_view'), f('b', 'MP4', 5, 'shared_screen_with_speaker_view')])?.id, 'b');
  assert.equal(pickMp4([f('a', 'MP4', 10, 'gallery_view'), f('b', 'MP4', 50, 'active_speaker')])?.id, 'b');
  assert.equal(pickMp4([f('a', 'M4A', 10, 'audio_only')]), null);
});

const members = (): Members =>
  new Map<string, Role>([
    ['hesham.talaat@example.com', 'partner'],
    ['paulina.colomo@example.com', 'partner'],
    ['josh@example.com', 'owner'],
  ]);
const aliases = { 'hesham talaat': 'hesham.talaat@example.com', 'paulina colomo': 'paulina.colomo@example.com', 'gone person': 'gone@example.com' };

test('a call is matched only when its topic names exactly one listed person', () => {
  assert.equal(matchPerson('Echo 1 Labs | Founder Meeting | Josh Meunier.  (Hesham Talaat)', aliases, members()), 'hesham.talaat@example.com');
  assert.equal(matchPerson('hesham   TALAAT / Josh', aliases, members()), 'hesham.talaat@example.com');
  assert.equal(matchPerson('Hesham Talaat and Paulina Colomo', aliases, members()), null);
  assert.equal(matchPerson('Weekly All Hands', aliases, members()), null);
  assert.equal(matchPerson('Gone Person sync', aliases, members()), null); // not on the member list
  assert.equal(matchPerson('Hesham Talaat', {}, members()), null);
});

test('aliases are parsed strictly', () => {
  assert.deepEqual(parseAliases({ ' Hesham Talaat ': 'Hesham.Talaat@Example.com', bad: 5, '': 'x@y.z' }), { 'hesham talaat': 'hesham.talaat@example.com' });
  assert.deepEqual(parseAliases(null), {});
  assert.deepEqual(parseAliases([1]), {});
});

test('ids are stable and the next personal clip id skips what is taken', () => {
  assert.equal(ingestKey('u'), ingestKey('u'));
  assert.notEqual(ingestKey('u'), ingestKey('v'));
  assert.equal(ingestKey('u').length, 24);
  assert.equal(nextClipId([]), 'P01');
  assert.equal(nextClipId(['academy/partner/k/P01.mp4', 'academy/partner/k/clips.json', 'academy/partner/k/P04.mp4']), 'P05');
});

test('labels use only the date and length, never the Zoom topic', () => {
  const l = clipLabels('2026-11-20T15:00:53Z', 61);
  assert.equal(l.title, 'Call with Josh Meunier');
  assert.equal(l.note, 'Our call on 20 November 2026');
  assert.equal(l.len, '1:01:00');
  assert.equal(clipLabels('2026-11-23T17:09:43Z', 55).len, '55:00');
  assert.equal(clipLabels('nonsense', 5).note, 'Our call');
});

test('a staged recording never sits inside a person folder, where any P## file is playable', async () => {
  const { stagedVideoPath } = await import('../lib/academy-zoom.ts');
  const { partnerFolder } = await import('../lib/academy-clips.ts');
  const key = ingestKey('UUID/with+chars==');
  const p = stagedVideoPath(key);
  assert.equal(p, `academy/ingest/raw/${key}.mp4`);
  assert.ok(!p.startsWith('academy/partner/'));
  assert.ok(!p.startsWith(`${partnerFolder('hesham.talaat@thedepthgroup.com')}/`));
  assert.ok(!/\/P\d{2}\.mp4$/.test(p));
});

test('modules the Edge middleware loads never import the Node-only Zoom module', async () => {
  const { readFile } = await import('node:fs/promises');
  for (const f of ['lib/academy-store.ts', 'lib/academy-session.ts', 'lib/academy-auth.ts', 'lib/academy-members.ts', 'middleware.ts']) {
    const src = await readFile(new URL(`../${f}`, import.meta.url), 'utf8');
    assert.ok(!/academy-zoom/.test(src), `${f} must not import academy-zoom`);
  }
});

test('the receiver stages every recording and does not write into a person folder', async () => {
  const { readFile } = await import('node:fs/promises');
  const src = await readFile(new URL('../app/hooks/zoom/route.ts', import.meta.url), 'utf8');
  assert.ok(src.includes('stagedVideoPath(record.key)'));
  assert.ok(!/partnerFolder|nextClipId/.test(src));
});
