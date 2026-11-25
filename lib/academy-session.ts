// Who is this request? Used by every academy route handler, so a handler never relies
// on the middleware having run. Re-checks the cookie against the live member list.

import { SESSION_COOKIE, verifyToken } from './academy-auth.ts';
import { loadMembers } from './academy-store.ts';
import type { Role } from './academy-members.ts';
import { VIEW_COOKIE, resolveView } from './academy-viewas.ts';

export type Who = { email: string; role: Role };
export type Auth = { state: 'unconfigured' } | { state: 'anonymous' } | { state: 'member'; who: Who };

export function readCookie(header: string | null, name: string): string | undefined {
  for (const part of (header ?? '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return undefined;
}

export async function authenticate(req: Request): Promise<Auth> {
  const secret = process.env.ACADEMY_LINK_SECRET;
  const members = await loadMembers();
  if (!secret || secret.length < 32 || !members || members.size === 0) return { state: 'unconfigured' };
  const email = await verifyToken(secret, 'session', readCookie(req.headers.get('cookie'), SESSION_COOKIE), members);
  if (!email) return { state: 'anonymous' };
  return { state: 'member', who: { email, role: members.get(email) as Role } };
}

// POSTs from a page on another origin are refused. Cookies are SameSite=Lax as well.
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}

// Like authenticate, but an owner may be viewing as another role or one partner (see
// academy-viewas.ts). `who` is the identity to SERVE (page, clips); `actor` is the real
// signed-in person, which admin and the view switch must keep using.
export type ViewAuth =
  | { state: 'unconfigured' }
  | { state: 'anonymous' }
  | { state: 'member'; who: Who; actor: Who; viewing: string | null };

export async function authenticateView(req: Request): Promise<ViewAuth> {
  const auth = await authenticate(req);
  if (auth.state !== 'member') return auth;
  const members = await loadMembers();
  if (auth.who.role !== 'owner' || !members) return { state: 'member', who: auth.who, actor: auth.who, viewing: null };
  const raw = readCookie(req.headers.get('cookie'), VIEW_COOKIE);
  const view = resolveView(auth.who, raw === undefined ? undefined : safeDecode(raw), members);
  return { state: 'member', who: view.who, actor: auth.who, viewing: view.viewing };
}

function safeDecode(v: string): string | undefined {
  try {
    return decodeURIComponent(v);
  } catch {
    return undefined;
  }
}
