import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, ownerSignIn, verifyPassword } from '../lib/academy-ownerpw.ts';
import { createLimiter } from '../lib/academy-ratelimit.ts';
import type { Members, Role } from '../lib/academy-members.ts';

const PW = 'correct horse battery staple 42';
const stored = hashPassword(PW);
const members = (): Members =>
  new Map<string, Role>([
    ['boss@example.com', 'owner'],
    ['poc@example.com', 'point-of-contact'],
    ['pat@example.com', 'partner'],
  ]);
const deps = (over: Partial<Parameters<typeof ownerSignIn>[3]> = {}) => ({
  storedHash: stored,
  members: members(),
  ipLimiter: createLimiter(5, 60_000),
  emailLimiter: createLimiter(5, 60_000),
  now: 1_000,
  ...over,
});

test('the hash is salted, never holds the password, and verifies only the right one', () => {
  const a = hashPassword(PW);
  const b = hashPassword(PW);
  assert.notEqual(a, b);
  assert.ok(!a.includes(PW));
  assert.ok(verifyPassword(PW, a));
  assert.ok(!verifyPassword(PW + 'x', a));
  assert.ok(!verifyPassword('', a));
});

test('a missing or malformed stored hash verifies nothing', () => {
  for (const bad of [undefined, '', 'scrypt$1$2', 'bcrypt$16384$8$1$AAAA$AAAA', 'scrypt$x$8$1$AAAA$AAAA', 'scrypt$16384$8$1$$']) {
    assert.equal(verifyPassword(PW, bad), false, String(bad));
  }
});

test('an owner with the right password signs in, email case ignored', () => {
  assert.equal(ownerSignIn('Boss@Example.com', PW, '1.1.1.1', deps()), 'boss@example.com');
});

test('wrong password, non-owner roles, unknown email and bad input all fail', () => {
  assert.equal(ownerSignIn('boss@example.com', 'nope', '1.1.1.1', deps()), null);
  assert.equal(ownerSignIn('poc@example.com', PW, '1.1.1.1', deps()), null);
  assert.equal(ownerSignIn('pat@example.com', PW, '1.1.1.1', deps()), null);
  assert.equal(ownerSignIn('ghost@example.com', PW, '1.1.1.1', deps()), null);
  assert.equal(ownerSignIn(42, PW, '1.1.1.1', deps()), null);
  assert.equal(ownerSignIn('boss@example.com', 42, '1.1.1.1', deps()), null);
  assert.equal(ownerSignIn('boss@example.com', '', '1.1.1.1', deps()), null);
  assert.equal(ownerSignIn('boss@example.com', 'x'.repeat(300), '1.1.1.1', deps()), null);
});

test('feature off or member list unreadable fails closed', () => {
  assert.equal(ownerSignIn('boss@example.com', PW, '1.1.1.1', deps({ storedHash: undefined })), null);
  assert.equal(ownerSignIn('boss@example.com', PW, '1.1.1.1', deps({ members: null })), null);
});

test('attempts are rate limited per email, and a lockout also blocks the right password', () => {
  const d = deps({ emailLimiter: createLimiter(3, 60_000) });
  for (let i = 0; i < 3; i++) assert.equal(ownerSignIn('boss@example.com', 'wrong', `9.9.9.${i}`, d), null);
  assert.equal(ownerSignIn('boss@example.com', PW, '8.8.8.8', d), null);
});

test('attempts are rate limited per IP', () => {
  const d = deps({ ipLimiter: createLimiter(2, 60_000) });
  assert.equal(ownerSignIn('boss@example.com', PW, '7.7.7.7', d), 'boss@example.com');
  assert.equal(ownerSignIn('boss@example.com', PW, '7.7.7.7', d), 'boss@example.com');
  assert.equal(ownerSignIn('boss@example.com', PW, '7.7.7.7', d), null);
});
