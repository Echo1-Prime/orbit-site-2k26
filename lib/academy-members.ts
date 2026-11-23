// Sales Academy member allowlist: roles and the rules for changing it.
//
// Pure logic, no I/O, so the same rules run in the admin view and in tests. The list
// itself is stored by lib/academy-store.ts (Vercel Global Config), one JSON object of
// { email: role } under the key `academy_members`.
//
// Roles
//   owner             full control: add or remove anyone, set any role.
//   point-of-contact  add or remove members and partners. Cannot touch owners or other
//                     points of contact, and cannot grant either role.
//   member            can use the internal Academy. No admin access.
//   partner           outside partners. See only the partner training (clip ids P##,
//                     lib/academy-clips.ts), never the internal page or clips. No admin access.

import { normalizeEmail } from './academy-auth.ts';

export const ROLES = ['owner', 'point-of-contact', 'member', 'partner'] as const;
export type Role = (typeof ROLES)[number];
export type Members = Map<string, Role>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;

export function isRole(x: unknown): x is Role {
  return typeof x === 'string' && (ROLES as readonly string[]).includes(x);
}

export function validEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const e = normalizeEmail(raw);
  return e.length <= MAX_EMAIL && EMAIL_RE.test(e) ? e : null;
}

// Turns whatever the store returned into a member map. Anything malformed is dropped,
// never guessed at: an entry with an unknown role gets no access.
export function parseMemberRecord(raw: unknown): Members {
  const out: Members = new Map();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    const email = validEmail(k);
    if (email && isRole(v)) out.set(email, v);
  }
  return out;
}

export function toMemberRecord(members: Members): Record<string, Role> {
  return Object.fromEntries([...members.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

export function canAdmin(role: Role | undefined): boolean {
  return role === 'owner' || role === 'point-of-contact';
}

// The roles a point of contact may grant, change and remove.
export const POC_MANAGES: readonly Role[] = ['member', 'partner'];
const pocMay = (role: Role | undefined) => role !== undefined && POC_MANAGES.includes(role);

export type ChangeResult = { ok: true; members: Members } | { ok: false; reason: string };

export function addMember(members: Members, actor: Role | undefined, emailRaw: unknown, role: unknown): ChangeResult {
  if (!canAdmin(actor)) return { ok: false, reason: 'Not allowed.' };
  const email = validEmail(emailRaw);
  if (!email) return { ok: false, reason: 'That is not a valid email address.' };
  if (!isRole(role)) return { ok: false, reason: 'Unknown role.' };
  if (actor === 'point-of-contact' && !pocMay(role)) {
    return { ok: false, reason: 'A point of contact can only add members and partners.' };
  }
  const existing = members.get(email);
  if (actor === 'point-of-contact' && existing && !pocMay(existing)) {
    return { ok: false, reason: 'A point of contact cannot change an owner or another point of contact.' };
  }
  if (existing === 'owner' && role !== 'owner' && ownerCount(members) <= 1) {
    return { ok: false, reason: 'The last owner cannot be demoted.' };
  }
  const next = new Map(members);
  next.set(email, role);
  return { ok: true, members: next };
}

export function removeMember(members: Members, actor: Role | undefined, emailRaw: unknown): ChangeResult {
  if (!canAdmin(actor)) return { ok: false, reason: 'Not allowed.' };
  const email = validEmail(emailRaw);
  if (!email) return { ok: false, reason: 'That is not a valid email address.' };
  const target = members.get(email);
  if (!target) return { ok: false, reason: 'That email is not on the list.' };
  if (actor === 'point-of-contact' && !pocMay(target)) {
    return { ok: false, reason: 'A point of contact cannot remove an owner or another point of contact.' };
  }
  if (target === 'owner' && ownerCount(members) <= 1) {
    return { ok: false, reason: 'The last owner cannot be removed.' };
  }
  const next = new Map(members);
  next.delete(email);
  return { ok: true, members: next };
}

function ownerCount(members: Members): number {
  let n = 0;
  for (const r of members.values()) if (r === 'owner') n++;
  return n;
}
