import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CLIP_ID, canViewClip, clipAudience, clipPath } from '../lib/academy-clips.ts';
import type { Role } from '../lib/academy-members.ts';

test('clip ids are D##, T## or P## and nothing else', () => {
  for (const ok of ['D01', 'T15', 'P01', 'P99']) assert.match(ok, CLIP_ID);
  for (const bad of ['', 'X01', 'D1', 'D001', 'd01', 'P01.mp4', '../D01', 'D01/../P01', 'P01\n', ' P01'])
    assert.doesNotMatch(bad, CLIP_ID);
});

test('audience and blob path follow the id, so the two folders never mix', () => {
  assert.equal(clipAudience('P01'), 'partner');
  assert.equal(clipAudience('D01'), 'internal');
  assert.equal(clipAudience('T05'), 'internal');
  assert.equal(clipPath('P01'), 'academy/partner/P01.mp4');
  assert.equal(clipPath('D01'), 'academy/videos/D01.mp4');
  assert.equal(clipPath('T05'), 'academy/videos/T05.mp4');
});

test('a partner sees partner clips only, never an internal clip', () => {
  assert.equal(canViewClip('partner', 'P01'), true);
  for (const id of ['D01', 'D09', 'T01', 'T15']) assert.equal(canViewClip('partner', id), false);
});

test('owners, points of contact and members see internal and partner clips', () => {
  for (const role of ['owner', 'point-of-contact', 'member'] as Role[]) {
    for (const id of ['D01', 'T01', 'P01']) assert.equal(canViewClip(role, id), true);
  }
});

test('no role, an unknown role or a bad id sees nothing', () => {
  assert.equal(canViewClip(undefined, 'P01'), false);
  assert.equal(canViewClip('admin' as Role, 'D01'), false);
  assert.equal(canViewClip('owner', 'nope'), false);
  assert.equal(canViewClip('partner', '../P01'), false);
});
