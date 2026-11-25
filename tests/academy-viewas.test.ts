import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chooseView, resolveView, viewOptions } from '../lib/academy-viewas.ts';
import type { Members, Role } from '../lib/academy-members.ts';

const members = (): Members =>
  new Map<string, Role>([
    ['boss@example.com', 'owner'],
    ['poc@example.com', 'point-of-contact'],
    ['rep@example.com', 'member'],
    ['pat@example.com', 'partner'],
  ]);
const owner = { email: 'boss@example.com', role: 'owner' as Role };

test('an owner can view as point of contact or member, keeping their own email', () => {
  assert.deepEqual(resolveView(owner, 'member', members()), { who: { email: 'boss@example.com', role: 'member' }, viewing: 'member' });
  assert.equal(resolveView(owner, 'point-of-contact', members()).who.role, 'point-of-contact');
});

test('an owner can view as a listed partner and gets that partner identity', () => {
  const v = resolveView(owner, 'partner:Pat@Example.com', members());
  assert.deepEqual(v, { who: { email: 'pat@example.com', role: 'partner' }, viewing: 'partner:pat@example.com' });
});

test('a partner value for someone who is not a partner on the list is ignored', () => {
  for (const raw of ['partner:rep@example.com', 'partner:poc@example.com', 'partner:ghost@example.com', 'partner:']) {
    assert.deepEqual(resolveView(owner, raw, members()), { who: owner, viewing: null }, raw);
  }
});

test('only owners can use it: every other role ignores the cookie', () => {
  for (const role of ['point-of-contact', 'member', 'partner'] as Role[]) {
    const actor = { email: 'x@example.com', role };
    assert.deepEqual(resolveView(actor, 'partner:pat@example.com', members()), { who: actor, viewing: null });
    assert.deepEqual(resolveView(actor, 'member', members()), { who: actor, viewing: null });
  }
});

test('unknown, empty and owner values leave the real view', () => {
  for (const raw of [undefined, '', 'owner', 'admin', 'Member', 'point-of-contact ']) {
    assert.deepEqual(resolveView(owner, raw, members()), { who: owner, viewing: null }, String(raw));
  }
});

test('the switcher lists the owner view, both roles and every partner', () => {
  const values = viewOptions(members()).map((o) => o.value);
  assert.deepEqual(values, ['owner', 'point-of-contact', 'member', 'partner:pat@example.com']);
});

test('chooseView returns a cookie value for valid input and null to clear', () => {
  assert.equal(chooseView(owner, 'member', members()), 'member');
  assert.equal(chooseView(owner, 'partner:pat@example.com', members()), 'partner:pat@example.com');
  assert.equal(chooseView(owner, 'owner', members()), null);
  assert.equal(chooseView(owner, 'partner:rep@example.com', members()), null);
  assert.equal(chooseView(owner, 42, members()), null);
  assert.equal(chooseView({ email: 'rep@example.com', role: 'member' }, 'member', members()), null);
});
