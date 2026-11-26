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

test('the switcher lists the owner view, both roles, every other staff member and every partner', () => {
  const values = viewOptions(members(), 'boss@example.com').map((o) => o.value);
  assert.deepEqual(values, ['owner', 'point-of-contact', 'member', 'staff:poc@example.com', 'staff:rep@example.com', 'partner:pat@example.com']);
});

test('chooseView returns a cookie value for valid input and null to clear', () => {
  assert.equal(chooseView(owner, 'member', members()), 'member');
  assert.equal(chooseView(owner, 'partner:pat@example.com', members()), 'partner:pat@example.com');
  assert.equal(chooseView(owner, 'owner', members()), null);
  assert.equal(chooseView(owner, 'partner:rep@example.com', members()), null);
  assert.equal(chooseView(owner, 42, members()), null);
  assert.equal(chooseView({ email: 'rep@example.com', role: 'member' }, 'member', members()), null);
});

const staffList = (): Members =>
  new Map<string, Role>([...members(), ['co@example.com', 'owner']]);

test('an owner can view as another staff member and gets that identity and role', () => {
  assert.deepEqual(resolveView(owner, 'staff:Co@Example.com', staffList()), { who: { email: 'co@example.com', role: 'owner' }, viewing: 'staff:co@example.com' });
  assert.deepEqual(resolveView(owner, 'staff:rep@example.com', staffList()), { who: { email: 'rep@example.com', role: 'member' }, viewing: 'staff:rep@example.com' });
  assert.deepEqual(resolveView(owner, 'staff:poc@example.com', staffList()).who, { email: 'poc@example.com', role: 'point-of-contact' });
});

test('a staff value for a partner, an unlisted email, the viewer or empty is ignored', () => {
  for (const raw of ['staff:pat@example.com', 'staff:ghost@example.com', 'staff:boss@example.com', 'staff:BOSS@example.com', 'staff:']) {
    assert.deepEqual(resolveView(owner, raw, staffList()), { who: owner, viewing: null }, raw);
  }
});

test('non-owners cannot use a staff value', () => {
  for (const role of ['point-of-contact', 'member', 'partner'] as Role[]) {
    const actor = { email: 'x@example.com', role };
    assert.deepEqual(resolveView(actor, 'staff:co@example.com', staffList()), { who: actor, viewing: null });
  }
});

test('the staff list leaves out the viewer and partners, and labels each role', () => {
  const opts = viewOptions(staffList(), 'Boss@Example.com').filter((o) => o.value.startsWith('staff:'));
  assert.deepEqual(opts, [
    { value: 'staff:co@example.com', label: 'Staff: co@example.com (owner)' },
    { value: 'staff:poc@example.com', label: 'Staff: poc@example.com (point-of-contact)' },
    { value: 'staff:rep@example.com', label: 'Staff: rep@example.com (member)' },
  ]);
});

test('chooseView stores a valid staff value and clears an invalid one', () => {
  assert.equal(chooseView(owner, 'staff:co@example.com', staffList()), 'staff:co@example.com');
  assert.equal(chooseView(owner, 'staff:pat@example.com', staffList()), null);
  assert.equal(chooseView(owner, 'staff:boss@example.com', staffList()), null);
});
