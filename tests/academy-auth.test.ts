import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CLIP_TTL_SECONDS, SIGNIN_TTL_SECONDS, parseMembers, signToken, verifyToken } from '../lib/academy-auth.ts';

const SECRET = 'test-secret-0123456789abcdef0123456789abcdef';
const members = parseMembers(' Rep@Example.com, other@example.com ,not-an-email');

test('parseMembers lowercases, trims and drops junk', () => {
  assert.deepEqual([...members], ['rep@example.com', 'other@example.com']);
  assert.equal(parseMembers(undefined).size, 0);
});

test('a valid invite verifies to the member email', async () => {
  const t = await signToken(SECRET, 'invite', 'REP@example.com', 60);
  assert.equal(await verifyToken(SECRET, 'invite', t, members), 'rep@example.com');
});

test('removing the email from the list revokes the token', async () => {
  const t = await signToken(SECRET, 'session', 'rep@example.com', 60);
  assert.equal(await verifyToken(SECRET, 'session', t, parseMembers('other@example.com')), null);
});

test('expired, wrong-kind, wrong-secret and tampered tokens fail', async () => {
  const now = 1_000_000;
  const t = await signToken(SECRET, 'invite', 'rep@example.com', 60, now);
  assert.equal(await verifyToken(SECRET, 'invite', t, members, now + 61), null);
  assert.equal(await verifyToken(SECRET, 'session', t, members, now), null);
  assert.equal(await verifyToken('another-secret-0123456789abcdef0123456789', 'invite', t, members, now), null);
  const [body, sig] = t.split('.');
  const forged = await signToken(SECRET, 'invite', 'intruder@example.com', 60, now);
  assert.equal(await verifyToken(SECRET, 'invite', `${forged.split('.')[0]}.${sig}`, members, now), null);
  assert.equal(await verifyToken(SECRET, 'invite', `${body}.${sig}x`, members, now), null);
  assert.equal(await verifyToken(SECRET, 'invite', '', members, now), null);
  assert.equal(await verifyToken(SECRET, 'invite', 'garbage', members, now), null);
});

// ---- expiry: emailed sign-in links last 15 minutes ----

test('the emailed sign-in TTL is 15 minutes and the link dies right after', async () => {
  assert.equal(SIGNIN_TTL_SECONDS, 900);
  const now = 2_000_000;
  const t = await signToken(SECRET, 'invite', 'rep@example.com', SIGNIN_TTL_SECONDS, now);
  assert.equal(await verifyToken(SECRET, 'invite', t, members, now + 899), 'rep@example.com');
  assert.equal(await verifyToken(SECRET, 'invite', t, members, now + 900), null);
  assert.equal(await verifyToken(SECRET, 'invite', t, members, now + 3600), null);
});

test('a token with a missing, zero or negative lifetime is never valid', async () => {
  const now = 3_000_000;
  for (const ttl of [0, -1]) {
    const t = await signToken(SECRET, 'invite', 'rep@example.com', ttl, now);
    assert.equal(await verifyToken(SECRET, 'invite', t, members, now), null);
  }
});

// ---- clip URLs: bound to one clip, never reusable as anything else ----

test('a clip token only opens the clip it was signed for', async () => {
  const now = 4_000_000;
  const t = await signToken(SECRET, 'clip', 'rep@example.com', CLIP_TTL_SECONDS, now, 'D01');
  assert.equal(await verifyToken(SECRET, 'clip', t, members, now, 'D01'), 'rep@example.com');
  assert.equal(await verifyToken(SECRET, 'clip', t, members, now, 'D02'), null);
  assert.equal(await verifyToken(SECRET, 'clip', t, members, now), null);
});

test('clip URLs expire after 10 minutes and die when the member is removed', async () => {
  const now = 5_000_000;
  assert.equal(CLIP_TTL_SECONDS, 600);
  const t = await signToken(SECRET, 'clip', 'rep@example.com', CLIP_TTL_SECONDS, now, 'T05');
  assert.equal(await verifyToken(SECRET, 'clip', t, members, now + 599, 'T05'), 'rep@example.com');
  assert.equal(await verifyToken(SECRET, 'clip', t, members, now + 600, 'T05'), null);
  assert.equal(await verifyToken(SECRET, 'clip', t, parseMembers('other@example.com'), now, 'T05'), null);
});

test('clip, invite and session tokens are not interchangeable', async () => {
  const now = 6_000_000;
  const clip = await signToken(SECRET, 'clip', 'rep@example.com', 60, now, 'D01');
  const invite = await signToken(SECRET, 'invite', 'rep@example.com', 60, now);
  assert.equal(await verifyToken(SECRET, 'session', clip, members, now), null);
  assert.equal(await verifyToken(SECRET, 'invite', clip, members, now), null);
  assert.equal(await verifyToken(SECRET, 'clip', invite, members, now, 'D01'), null);
  // A scoped token cannot pass as an unscoped one by dropping the scope argument.
  assert.equal(await verifyToken(SECRET, 'clip', clip, members, now), null);
});

test('oversized tokens are refused before any signature work', async () => {
  assert.equal(await verifyToken(SECRET, 'invite', 'a'.repeat(5000) + '.b', members), null);
});
