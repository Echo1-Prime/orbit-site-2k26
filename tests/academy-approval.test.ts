import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  canManageRecordings,
  canRetry,
  parseIngestRecord,
  parseRetryInfo,
  planApproval,
  reassign,
  RETRY_WINDOW_MS,
  sortRecords,
  STALE_DOWNLOAD_MS,
} from '../lib/academy-approval.ts';
import { partnerFolder } from '../lib/academy-clips.ts';
import type { IngestRecord } from '../lib/academy-zoom.ts';
import type { Members, Role } from '../lib/academy-members.ts';

const REC_ID = 'a1b2c3d4e5f6a1b2c3d4e5f6';
const NOW = Date.parse('2026-11-26T18:00:00Z');
const rec = (over: Partial<IngestRecord> = {}): IngestRecord => ({
  key: REC_ID,
  uuid: 'uuid-1',
  meetingId: '123',
  topic: 'Level 10 Brandon+Josh with Acme Co',
  startTime: '2026-11-18T17:03:09Z',
  durationMinutes: 133,
  status: 'pending',
  assignedTo: 'brandon@example.com',
  clipId: null,
  path: `academy/ingest/raw/${REC_ID}.mp4`,
  error: null,
  receivedAt: '2026-11-26T12:00:00Z',
  attemptAt: null,
  ...over,
});
const members: Members = new Map<string, Role>([
  ['josh@example.com', 'owner'],
  ['brandon@example.com', 'owner'],
  ['partner@example.com', 'partner'],
]);

test('only owners manage recordings; points of contact, members and partners do not', () => {
  assert.equal(canManageRecordings('owner'), true);
  for (const r of ['point-of-contact', 'member', 'partner', undefined] as const) assert.equal(canManageRecordings(r), false);
});

test('approve gives the next free P## after files AND manifest ids, and labels never carry the topic', () => {
  const manifest = [{ id: 'P01', title: 'Call with Josh Meunier', note: 'Our call on 9 November 2026', len: '1:05:00' }];
  const r = planApproval(rec(), 'Brandon@Example.com ', members, ['P01.mp4', 'P03.mp4', 'clips.json'], manifest);
  assert.ok(r.ok);
  const p = r.value;
  assert.equal(p.email, 'brandon@example.com');
  assert.equal(p.clipId, 'P04');
  assert.equal(p.from, `academy/ingest/raw/${REC_ID}.mp4`);
  assert.equal(p.to, `${partnerFolder('brandon@example.com')}/P04.mp4`);
  assert.deepEqual(p.manifest.map((c) => c.id), ['P01', 'P04']);
  const added = p.manifest[1];
  assert.equal(added.title, 'Call with Josh Meunier');
  assert.equal(added.note, 'Our call on 18 November 2026');
  assert.equal(added.len, '2:13:00');
  assert.ok(!JSON.stringify(p.manifest).includes('Acme'), 'the Zoom topic must never reach the person');
  assert.equal(p.record.status, 'approved');
  assert.equal(p.record.clipId, 'P04');
  assert.equal(p.record.path, p.to);
});

test('approve to a person with no folder yet starts at P01', () => {
  const r = planApproval(rec({ status: 'unassigned', assignedTo: null }), 'partner@example.com', members, [], null);
  assert.ok(r.ok);
  assert.equal(r.value.clipId, 'P01');
  assert.equal(r.value.manifest.length, 1);
});

test('approve refuses non-members, bad emails, non-waiting records, a missing file and an unreadable list', () => {
  const no = (x: ReturnType<typeof planApproval>) => assert.equal(x.ok, false);
  no(planApproval(rec(), 'stranger@example.com', members, [], null));
  no(planApproval(rec(), 'not-an-email', members, [], null));
  no(planApproval(rec(), '', members, [], null));
  for (const status of ['downloading', 'failed', 'approved'] as const) no(planApproval(rec({ status }), 'brandon@example.com', members, [], null));
  no(planApproval(rec({ path: null }), 'brandon@example.com', members, [], null));
  no(planApproval(rec(), 'brandon@example.com', members, [], { not: 'a list' }));
});

test('approve refuses a person who already has 50 recordings or no free number', () => {
  const full = Array.from({ length: 50 }, (_, i) => ({ id: `P${String(i + 1).padStart(2, '0')}`, title: 't', note: '', len: '' }));
  assert.equal(planApproval(rec(), 'brandon@example.com', members, [], full).ok, false);
  assert.equal(planApproval(rec(), 'brandon@example.com', members, ['P99.mp4'], []).ok, false);
});

test('reassign suggests a member or leaves it unassigned, only while waiting', () => {
  const a = reassign(rec({ status: 'unassigned', assignedTo: null }), 'partner@example.com', members);
  assert.ok(a.ok);
  assert.equal(a.value.status, 'pending');
  assert.equal(a.value.assignedTo, 'partner@example.com');
  const b = reassign(rec(), '', members);
  assert.ok(b.ok);
  assert.equal(b.value.status, 'unassigned');
  assert.equal(b.value.assignedTo, null);
  assert.equal(reassign(rec(), 'stranger@example.com', members).ok, false);
  assert.equal(reassign(rec({ status: 'approved' }), 'partner@example.com', members).ok, false);
  assert.equal(reassign(rec({ status: 'failed' }), '', members).ok, false);
});

test('retry: failed within 24 h, or a download stuck past 15 min; never after 24 h or for other states', () => {
  const at = (ms: number) => new Date(NOW - ms).toISOString();
  assert.equal(canRetry(rec({ status: 'failed', receivedAt: at(60_000) }), NOW), true);
  assert.equal(canRetry(rec({ status: 'failed', receivedAt: at(RETRY_WINDOW_MS + 1) }), NOW), false);
  assert.equal(canRetry(rec({ status: 'downloading', receivedAt: at(STALE_DOWNLOAD_MS + 1) }), NOW), true);
  assert.equal(canRetry(rec({ status: 'downloading', receivedAt: at(60_000) }), NOW), false);
  for (const status of ['pending', 'unassigned', 'approved'] as const) assert.equal(canRetry(rec({ status, receivedAt: at(60_000) }), NOW), false);
  assert.equal(canRetry(rec({ status: 'failed', receivedAt: 'not a date' }), NOW), false);
});

test('a stored record is cleaned: bad keys, statuses, emails and clip ids are dropped', () => {
  assert.deepEqual(parseIngestRecord(rec()), rec());
  assert.equal(parseIngestRecord({ ...rec(), key: '../../etc' }), null);
  assert.equal(parseIngestRecord({ ...rec(), status: 'live' }), null);
  assert.equal(parseIngestRecord(null), null);
  assert.equal(parseIngestRecord([]), null);
  const odd = parseIngestRecord({ ...rec(), assignedTo: 'nope', clipId: 'X01' });
  assert.equal(odd?.assignedTo, null);
  assert.equal(odd?.clipId, null);
});

test('newest records first', () => {
  const r = sortRecords([rec({ key: REC_ID, receivedAt: '2026-11-01T00:00:00Z' }), rec({ receivedAt: '2026-11-20T00:00:00Z' })]);
  assert.equal(r[0].receivedAt, '2026-11-20T00:00:00Z');
});

test('retry details only accept a Zoom https url and a token', () => {
  assert.deepEqual(parseRetryInfo({ url: 'https://us02web.zoom.us/rec/download/x', token: 't' }), { url: 'https://us02web.zoom.us/rec/download/x', token: 't' });
  assert.equal(parseRetryInfo({ url: 'https://evil.example.com/x', token: 't' }), null);
  assert.equal(parseRetryInfo({ url: 'http://us02web.zoom.us/x', token: 't' }), null);
  assert.equal(parseRetryInfo({ url: 'https://us02web.zoom.us/x', token: '' }), null);
  assert.equal(parseRetryInfo({ url: 'not a url', token: 't' }), null);
});

test('a retried download is only stuck 15 min after the retry started, still inside 24 h of delivery', () => {
  const at = (ms: number) => new Date(NOW - ms).toISOString();
  const old = at(60 * 60 * 1000); // delivered an hour ago
  assert.equal(canRetry(rec({ status: 'downloading', receivedAt: old, attemptAt: at(60_000) }), NOW), false);
  assert.equal(canRetry(rec({ status: 'downloading', receivedAt: old, attemptAt: at(STALE_DOWNLOAD_MS + 1) }), NOW), true);
  assert.equal(canRetry(rec({ status: 'downloading', receivedAt: at(RETRY_WINDOW_MS + 1), attemptAt: at(STALE_DOWNLOAD_MS + 1) }), NOW), false);
  assert.equal(parseIngestRecord(rec({ attemptAt: '2026-11-26T13:00:00Z' }))?.attemptAt, '2026-11-26T13:00:00Z');
});

test('the store reads from origin, writes clips.json safely, keeps retry details until staged, and lists every page', async () => {
  const { readFile } = await import('node:fs/promises');
  const src = await readFile(new URL('../lib/academy-ingest-store.ts', import.meta.url), 'utf8');
  assert.ok(src.includes("useCache: false"), 'record and clips.json reads must bypass the CDN cache');
  assert.ok(src.includes('ifMatch: manifestEtag, allowOverwrite: true'), 'the conditional clips.json write must allow the overwrite it guards');
  const run = src.slice(src.indexOf('export async function runIngest'), src.indexOf('// What approval needs'));
  assert.ok(run.indexOf('writeRecord(') < run.indexOf('del(retryPath'), 'retry details are deleted only after the record says staged');
  const stage = src.slice(src.indexOf('export async function stageFromZoom'), src.indexOf('export async function runIngest'));
  assert.ok(!stage.includes('del('), 'staging never deletes the retry details itself');
  assert.ok(!/out\.length\s*<\s*\d+/.test(src), 'the queue list must not stop at a fixed count');
});
