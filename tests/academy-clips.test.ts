import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  CLIP_ID,
  CLIPS_PLACEHOLDER,
  canViewClip,
  clipAudience,
  clipPath,
  injectPartnerClips,
  parsePartnerManifest,
  partnerKey,
  partnerManifestPath,
} from '../lib/academy-clips.ts';
import type { Role } from '../lib/academy-members.ts';

test('clip ids are D##, T## or P## and nothing else', () => {
  for (const ok of ['D01', 'T15', 'P01', 'P99']) assert.match(ok, CLIP_ID);
  for (const bad of ['', 'X01', 'D1', 'D001', 'd01', 'P01.mp4', '../D01', 'D01/../P01', 'P01\n', ' P01'])
    assert.doesNotMatch(bad, CLIP_ID);
});

const A = 'partner-a@example.com';
const B = 'partner-b@example.org';

test('audience and blob path follow the id, so the two folders never mix', () => {
  assert.equal(clipAudience('P01'), 'partner');
  assert.equal(clipAudience('D01'), 'internal');
  assert.equal(clipAudience('T05'), 'internal');
  assert.equal(clipPath('P01', A), `academy/partner/${partnerKey(A)}/P01.mp4`);
  assert.equal(clipPath('D01', A), 'academy/videos/D01.mp4');
  assert.equal(clipPath('T05', B), 'academy/videos/T05.mp4');
});

test('each partner has their own folder, chosen by their email', () => {
  assert.match(partnerKey(A), /^[0-9a-f]{24}$/);
  assert.notEqual(partnerKey(A), partnerKey(B));
  assert.notEqual(clipPath('P01', A), clipPath('P01', B));
  assert.notEqual(partnerManifestPath(A), partnerManifestPath(B));
  assert.equal(partnerKey(' Partner-A@Example.com '), partnerKey(A));
  assert.equal(partnerManifestPath(A), `academy/partner/${partnerKey(A)}/clips.json`);
  // The email never appears in a blob path.
  assert.ok(!clipPath('P01', A).includes('example'));
});

test('the partner list keeps clean P## entries and drops everything else', () => {
  const clips = parsePartnerManifest([
    { id: 'P01', title: 'Founder meeting', note: 'Our call', len: '61:00' },
    { id: 'P01', title: 'duplicate id' },
    { id: 'D01', title: 'internal id' },
    { id: '../P02', title: 'traversal' },
    { id: 'P03', title: '   ' },
    { id: 'P04', title: 'x'.repeat(500), note: 42 },
    null,
    'P05',
  ]);
  assert.deepEqual(clips.map((c) => c.id), ['P01', 'P04']);
  assert.equal(clips[1].title.length, 200);
  assert.equal(clips[1].note, '');
  for (const bad of [null, undefined, {}, 'x', 7]) assert.deepEqual(parsePartnerManifest(bad), []);
});

test('the clip list is injected into the partner page and cannot break out of the script', () => {
  const page = readFileSync(new URL('../academy-private/partner.html', import.meta.url), 'utf8');
  assert.ok(page.includes(CLIPS_PLACEHOLDER), 'partner.html must keep the placeholder line');
  const html = injectPartnerClips(page, [{ id: 'P01', title: '</script><script>alert(1)</script>', note: '', len: '' }]);
  assert.ok(!html.includes(CLIPS_PLACEHOLDER));
  assert.ok(!html.includes('</script><script>alert(1)'));
  assert.ok(html.includes('const CLIPS = [{"id":"P01"'));
  assert.ok(injectPartnerClips(page, []).includes('const CLIPS = [];'));
});

test('a partner sees partner clips only, never an internal clip', () => {
  assert.equal(canViewClip('partner', 'P01'), true);
  assert.equal(canViewClip('partner', 'P99'), true);
  for (const id of ['D01', 'D09', 'T01', 'T15']) assert.equal(canViewClip('partner', id), false);
});

test('owners, points of contact and members see internal clips, not personal partner clips', () => {
  for (const role of ['owner', 'point-of-contact', 'member'] as Role[]) {
    for (const id of ['D01', 'T01']) assert.equal(canViewClip(role, id), true);
    assert.equal(canViewClip(role, 'P01'), false);
  }
});

test('no role, an unknown role or a bad id sees nothing', () => {
  assert.equal(canViewClip(undefined, 'P01'), false);
  assert.equal(canViewClip('admin' as Role, 'D01'), false);
  assert.equal(canViewClip('owner', 'nope'), false);
  assert.equal(canViewClip('partner', '../P01'), false);
});
