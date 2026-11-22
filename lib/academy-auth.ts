// Personal sign-in links for the internal Sales Academy at /academy.
//
// Members live in the academy allowlist (lib/academy-members.ts, stored in Vercel
// Global Config, never committed). Links and clip URLs are signed with
// ACADEMY_LINK_SECRET. Opening a sign-in link sets a signed session cookie; every
// request re-checks the list, so removing an email revokes that person on their
// next page load.
//
// Runs in the Edge middleware and in Node (link script, tests): Web Crypto only.

export const SESSION_COOKIE = 'academy_session';
export const INVITE_PARAM = 'invite';
export const INVITE_TTL_SECONDS = 14 * 24 * 60 * 60; // links minted by hand with scripts/academy-link.mts
export const SIGNIN_TTL_SECONDS = 15 * 60; // links emailed from /academy/sign-in
export const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;
export const CLIP_TTL_SECONDS = 10 * 60;

// 'clip' tokens are bound to one clip id through the scope claim, so a clip URL can
// never be replayed as a session or an invite, and an invite can never open a clip.
type Kind = 'invite' | 'session' | 'clip';

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64url(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return b64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data))));
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function parseMembers(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? '')
      .split(',')
      .map(normalizeEmail)
      .filter((e) => e.includes('@')),
  );
}

export async function signToken(
  secret: string,
  kind: Kind,
  email: string,
  ttlSeconds: number,
  now = Math.floor(Date.now() / 1000),
  scope?: string,
): Promise<string> {
  const claims: Record<string, unknown> = { k: kind, e: normalizeEmail(email), x: now + ttlSeconds };
  if (scope !== undefined) claims.s = scope;
  const body = b64url(enc.encode(JSON.stringify(claims)));
  return `${body}.${await hmac(secret, body)}`;
}

// Returns the member email when the token is genuine, unexpired, the right kind,
// carries the expected scope (or none, when none is expected), and the email is
// still on the member list. Otherwise null. `members` is anything with has(email),
// so the Set from parseMembers and the role Map from academy-members both work.
export async function verifyToken(
  secret: string,
  kind: Kind,
  token: string | undefined | null,
  members: { has(email: string): boolean },
  now = Math.floor(Date.now() / 1000),
  scope?: string,
): Promise<string | null> {
  if (!token || token.length > 1024) return null;
  const dot = token.indexOf('.');
  if (dot < 1 || dot !== token.lastIndexOf('.')) return null;
  const body = token.slice(0, dot);
  if (!safeEqual(token.slice(dot + 1), await hmac(secret, body))) return null;
  try {
    const p = JSON.parse(dec.decode(fromB64url(body))) as { k?: unknown; e?: unknown; x?: unknown; s?: unknown };
    if (p.k !== kind || typeof p.e !== 'string' || typeof p.x !== 'number') return null;
    if (p.x <= now) return null;
    if (p.s !== scope) return null;
    return members.has(p.e) ? p.e : null;
  } catch {
    return null;
  }
}
