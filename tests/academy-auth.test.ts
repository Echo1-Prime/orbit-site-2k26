import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMembers, signToken, verifyToken } from '../lib/academy-auth.ts';

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
