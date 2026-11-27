import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  CLIP_ID,
  MY_CLIPS_PLACEHOLDER,
  ROLE_PLACEHOLDER,
  canViewClip,
  clipAudience,
  clipPath,
  injectPartnerPage,
  injectPersonal,
  PARTNER_CLIPS_PLACEHOLDER,
  PARTNER_DEMOS,
  PARTNER_DEMOS_PLACEHOLDER,
  parsePartnerManifest,
  partnerFolder,
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

test('personal clips and role are injected into the internal page and cannot break out of the script', () => {
  const page = readFileSync(new URL('../academy-private/index.html', import.meta.url), 'utf8');
  assert.ok(page.includes(MY_CLIPS_PLACEHOLDER), 'index.html must keep the MY_CLIPS line');
  assert.ok(page.includes(ROLE_PLACEHOLDER), 'index.html must keep the ROLE line');
  const html = injectPersonal(page, [{ id: 'P01', title: '</script><script>alert(1)</script>', note: '', len: '' }], 'partner');
  assert.ok(!html.includes(MY_CLIPS_PLACEHOLDER));
  assert.ok(!html.includes(ROLE_PLACEHOLDER));
  assert.ok(!html.includes('</script><script>alert(1)'));
  assert.ok(html.includes('const MY_CLIPS = [{"id":"P01"'));
  assert.ok(html.includes('const ROLE = "partner";'));
  assert.ok(injectPersonal(page, [], 'member').includes('const MY_CLIPS = [];'));
});

test('staff see every internal clip and personal clips', () => {
  for (const role of ['owner', 'point-of-contact', 'member'] as Role[]) {
    for (const id of ['D01', 'D02', 'D09', 'T01', 'T15', 'P01', 'P99']) assert.equal(canViewClip(role, id), true, `${role} ${id}`);
  }
});

test('partners see only the cleared demos and personal clips, never T clips or flagged demos', () => {
  for (const id of ['D01', 'D04', 'D05', 'D06', 'D07', 'D09', 'P01', 'P99']) assert.equal(canViewClip('partner', id), true, id);
  for (const id of ['D02', 'D03', 'D08', 'T01', 'T09', 'T15']) assert.equal(canViewClip('partner', id), false, id);
});

// Nov 5 whiteboard clips (R3): D10 to D15 are cleared for partners; the held ones (N02, N04, N05, N06, N09) were not given ids.
const NOV5_IDS = ['D10', 'D11', 'D12', 'D13', 'D14', 'D15'];

test('the Nov 5 clips D10 to D15 are cleared partner demos and nothing beyond D15 is', () => {
  for (const id of NOV5_IDS) {
    assert.equal(canViewClip('partner', id), true, id);
    assert.equal(PARTNER_DEMOS.filter((d) => d.id === id).length, 1, `${id} listed once`);
    for (const role of ['owner', 'point-of-contact', 'member'] as Role[]) assert.equal(canViewClip(role, id), true, `${role} ${id}`);
    assert.equal(clipPath(id, A), `academy/videos/${id}.mp4`);
  }
  assert.equal(canViewClip('partner', 'D16'), false);
  assert.deepEqual(PARTNER_DEMOS.map((d) => d.id), ['D01', 'D04', 'D05', 'D06', 'D07', 'D09', ...NOV5_IDS]);
});

test('the Nov 5 clips carry no names, vendors or retired words in their listing', () => {
  const banned = /\b(Energy Waste|Wes|Robert|Martin|Brad|Fogan|Grant|Joe|James|Brandon|WaterWorks|ChatGPT|Gemini|OpenAI|Cosequin|Turkeyfest|Cuero|world-class|tool)\b|13\|7|\u2014/i;
  for (const d of PARTNER_DEMOS.filter((x) => NOV5_IDS.includes(x.id))) {
    assert.ok(!banned.test(`${d.title} ${d.note}`), `${d.id} listing has a banned word`);
    assert.match(d.len, /^\d:\d{2}$/);
  }
});

test('the partner page is filled in and cannot break out of the script', () => {
  const page = readFileSync(new URL('../academy-private/partner.html', import.meta.url), 'utf8');
  assert.ok(page.includes(PARTNER_CLIPS_PLACEHOLDER) && page.includes(PARTNER_DEMOS_PLACEHOLDER));
  const html = injectPartnerPage(page, [{ id: 'P01', title: '</script><script>alert(1)</script>', note: '', len: '' }]);
  assert.ok(!html.includes(PARTNER_CLIPS_PLACEHOLDER) && !html.includes(PARTNER_DEMOS_PLACEHOLDER));
  assert.ok(!html.includes('</script><script>alert(1)'));
  assert.ok(html.includes('const CLIPS = [{"id":"P01"'));
});

test('the partner page never names Grant, his call or any T clip', () => {
  const page = readFileSync(new URL('../academy-private/partner.html', import.meta.url), 'utf8');
  const html = injectPartnerPage(page, []);
  assert.ok(!/grant|kennedy|melbourne|game film/i.test(html), 'partner page names Grant or the game film');
  assert.ok(!/\bT\d{2}\b/.test(html), 'partner page lists a T clip');
});

test('every partner demo is a plain demo in the internal list: same title, no internal-use flag', () => {
  const index = readFileSync(new URL('../academy-private/index.html', import.meta.url), 'utf8');
  for (const d of PARTNER_DEMOS) {
    const line = index.split('\n').find((l) => l.trimStart().startsWith(`${d.id}:{t:`));
    assert.ok(line, `${d.id} missing from the internal clip list`);
    assert.ok(line.includes(`t:"${d.title}"`), `${d.id} title differs`);
    assert.ok(!line.includes('flag:'), `${d.id} is flagged for internal use`);
    assert.ok(!/grant|kennedy/i.test(`${d.title} ${d.note}`));
  }
});

test('a personal clip path always comes from the viewer email, never from the request', () => {
  assert.equal(clipPath('P01', 'a@example.com'), `${partnerFolder('a@example.com')}/P01.mp4`);
  assert.notEqual(clipPath('P01', 'a@example.com'), clipPath('P01', 'b@example.com'));
  assert.equal(clipPath('D01', 'a@example.com'), clipPath('D01', 'b@example.com'));
});

test('no role, an unknown role or a bad id sees nothing', () => {
  assert.equal(canViewClip(undefined, 'P01'), false);
  assert.equal(canViewClip('admin' as Role, 'D01'), false);
  assert.equal(canViewClip('owner', 'nope'), false);
  assert.equal(canViewClip('partner', '../P01'), false);
});
