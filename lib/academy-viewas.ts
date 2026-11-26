// "View as": an owner can look at the Academy the way another role, one named partner, or one
// named staff member sees it. Pure logic, no I/O, so the same rules run in the routes and in tests.
//
// What it changes: only which page and which clips are served for this request. It never
// changes who is signed in. Only a real owner session can use it; for anyone else the
// cookie is ignored. Admin, the member list and the view switch itself always use the real
// session, so "view as member" cannot be used to widen or narrow admin rights.
//
// Cookie value forms (anything else is ignored):
//   point-of-contact | member    the owner's own email with that role
//   partner:<email>              that partner, who must be on the member list as a partner
//   staff:<email>                that staff member (owner, point of contact or member on the
//                                list, not the viewer), served with their own role and their own
//                                My recordings

import { normalizeEmail } from './academy-auth.ts';
import type { Members, Role } from './academy-members.ts';

export const VIEW_COOKIE = 'academy_view';
export const VIEW_TTL_SECONDS = 8 * 60 * 60;

export type Who = { email: string; role: Role };
export type View = { who: Who; viewing: string | null };

export function resolveView(actor: Who, raw: string | undefined, members: Members): View {
  const real: View = { who: actor, viewing: null };
  if (actor.role !== 'owner' || !raw) return real;
  if (raw === 'point-of-contact' || raw === 'member') return { who: { email: actor.email, role: raw }, viewing: raw };
  if (raw.startsWith('partner:')) {
    const email = normalizeEmail(raw.slice('partner:'.length));
    if (members.get(email) === 'partner') return { who: { email, role: 'partner' }, viewing: `partner:${email}` };
  }
  if (raw.startsWith('staff:')) {
    const email = normalizeEmail(raw.slice('staff:'.length));
    const role = members.get(email);
    if (role && role !== 'partner' && email !== normalizeEmail(actor.email)) return { who: { email, role }, viewing: `staff:${email}` };
  }
  return real;
}

export type ViewOption = { value: string; label: string };

// What the switcher offers. 'owner' is the owner's own view and clears the override.
// `self` is the signed-in owner, left out of the staff list (their own view is 'owner').
export function viewOptions(members: Members, self?: string): ViewOption[] {
  const me = self ? normalizeEmail(self) : null;
  const staff = [...members.entries()]
    .filter(([email, role]) => role !== 'partner' && email !== me)
    .map(([email, role]) => ({ value: `staff:${email}`, label: `Staff: ${email} (${role})` }))
    .sort((a, b) => a.label.localeCompare(b.label));
  const partners = [...members.entries()]
    .filter(([, role]) => role === 'partner')
    .map(([email]) => ({ value: `partner:${email}`, label: `Partner: ${email}` }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return [
    { value: 'owner', label: 'Owner (you)' },
    { value: 'point-of-contact', label: 'Point of contact' },
    { value: 'member', label: 'Member' },
    ...staff,
    ...partners,
  ];
}

// Validates a value posted from the switcher. Returns the cookie value to store, or
// null to clear the override. Throws nothing: bad input clears the override.
export function chooseView(actor: Who, raw: unknown, members: Members): string | null {
  if (typeof raw !== 'string' || raw === 'owner') return null;
  return resolveView(actor, raw, members).viewing;
}
