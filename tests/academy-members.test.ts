import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  addMember,
  canAdmin,
  parseMemberRecord,
  removeMember,
  toMemberRecord,
  validEmail,
  type Members,
  type Role,
} from '../lib/academy-members.ts';

const base = (): Members =>
  new Map<string, Role>([
    ['boss@example.com', 'owner'],
    ['poc@example.com', 'point-of-contact'],
    ['rep@example.com', 'member'],
  ]);

test('the stored record is parsed strictly: bad emails and unknown roles get no access', () => {
  const m = parseMemberRecord({
    'Boss@Example.com': 'owner',
    'poc@example.com': 'point-of-contact',
    'rep@example.com': 'member',
    'not-an-email': 'member',
    'ghost@example.com': 'admin',
    'nul@example.com': null,
  });
  assert.deepEqual(toMemberRecord(m), {
    'boss@example.com': 'owner',
    'poc@example.com': 'point-of-contact',
    'rep@example.com': 'member',
  });
  for (const junk of [undefined, null, 'x', 42, ['a@b.co'], true]) assert.equal(parseMemberRecord(junk).size, 0);
});

test('validEmail normalizes and rejects junk', () => {
  assert.equal(validEmail('  Rep@Example.COM '), 'rep@example.com');
  for (const bad of ['', 'a', 'a@b', '@b.co', 'a b@c.co', 'a@@b.co', 42, null, undefined, `${'a'.repeat(250)}@b.co`]) {
    assert.equal(validEmail(bad), null);
  }
});

test('members have no admin rights; owners and points of contact do', () => {
  assert.equal(canAdmin('member'), false);
  assert.equal(canAdmin(undefined), false);
  assert.equal(canAdmin('owner'), true);
  assert.equal(canAdmin('point-of-contact'), true);
  const r = addMember(base(), 'member', 'new@example.com', 'member');
  assert.equal(r.ok, false);
  assert.equal(removeMember(base(), 'member', 'rep@example.com').ok, false);
});

test('a point of contact can add and remove plain members', () => {
  const added = addMember(base(), 'point-of-contact', 'New@Example.com', 'member');
  assert.ok(added.ok);
  assert.equal(added.ok && added.members.get('new@example.com'), 'member');
  const removed = removeMember(base(), 'point-of-contact', 'rep@example.com');
  assert.ok(removed.ok);
  assert.equal(removed.ok && removed.members.has('rep@example.com'), false);
});

test('a point of contact cannot grant roles or touch owners and other points of contact', () => {
  assert.equal(addMember(base(), 'point-of-contact', 'x@example.com', 'owner').ok, false);
  assert.equal(addMember(base(), 'point-of-contact', 'x@example.com', 'point-of-contact').ok, false);
  assert.equal(addMember(base(), 'point-of-contact', 'boss@example.com', 'member').ok, false); // demote the owner
  assert.equal(removeMember(base(), 'point-of-contact', 'boss@example.com').ok, false);
  assert.equal(removeMember(base(), 'point-of-contact', 'poc@example.com').ok, false);
});

test('an owner can set any role and remove anyone but the last owner', () => {
  const m = addMember(base(), 'owner', 'second@example.com', 'owner');
  assert.ok(m.ok);
  assert.ok(m.ok && removeMember(m.members, 'owner', 'boss@example.com').ok); // two owners: fine
  assert.equal(removeMember(base(), 'owner', 'boss@example.com').ok, false); // one owner: refused
  assert.equal(addMember(base(), 'owner', 'boss@example.com', 'member').ok, false); // cannot demote the last owner
  assert.ok(addMember(base(), 'owner', 'rep@example.com', 'point-of-contact').ok);
});

test('changes never mutate the list they were given', () => {
  const m = base();
  addMember(m, 'owner', 'new@example.com', 'member');
  removeMember(m, 'owner', 'rep@example.com');
  assert.equal(m.size, 3);
});

test('bad input is refused, not guessed at', () => {
  assert.equal(addMember(base(), 'owner', 'nope', 'member').ok, false);
  assert.equal(addMember(base(), 'owner', 'a@example.com', 'superuser').ok, false);
  assert.equal(removeMember(base(), 'owner', 'ghost@example.com').ok, false);
  assert.equal(removeMember(base(), 'owner', 42).ok, false);
});
