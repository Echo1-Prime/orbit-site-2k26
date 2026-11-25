// Owner password sign-in: a second way in for owners, next to the emailed link.
//
// The password is never stored. Vercel holds only a scrypt hash in
// ACADEMY_OWNER_PASSWORD_HASH (format scrypt$N$r$p$salt$hash, base64). Only an email that
// is an owner on the live member list can sign in with it. Every attempt runs the scrypt
// check, even for an email that is not an owner, so timing does not reveal who is an owner.

import { randomBytes, scrypt, scryptSync, timingSafeEqual, type ScryptOptions } from 'node:crypto';
import { normalizeEmail } from './academy-auth.ts';
import type { Members } from './academy-members.ts';
import type { Limiter } from './academy-ratelimit.ts';

const N = 16384;
const R = 8;
const P = 1;
const KEYLEN = 32;

export function hashPassword(password: string, salt: Buffer = randomBytes(16)): string {
  const hash = scryptSync(password, salt, KEYLEN, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${hash.toString('base64')}`;
}

const scryptAsync = (password: string, salt: Buffer, keylen: number, opts: ScryptOptions) =>
  new Promise<Buffer>((resolve, reject) => scrypt(password, salt, keylen, opts, (err, key) => (err ? reject(err) : resolve(key))));

// A malformed stored hash verifies nothing. Runs scrypt off the main thread (async), so
// a burst of attempts cannot freeze the server instance.
export async function verifyPassword(password: string, stored: string | undefined): Promise<boolean> {
  if (!stored) return false;
  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [n, r, p] = [Number(parts[1]), Number(parts[2]), Number(parts[3])];
  if (![n, r, p].every((x) => Number.isInteger(x) && x > 0 && x <= 1 << 20)) return false;
  try {
    const salt = Buffer.from(parts[4], 'base64');
    const want = Buffer.from(parts[5], 'base64');
    if (want.length === 0 || salt.length === 0) return false;
    const got = await scryptAsync(password, salt, want.length, { N: n, r, p });
    return timingSafeEqual(got, want);
  } catch {
    return false;
  }
}

export type OwnerSignInDeps = {
  storedHash: string | undefined;
  members: Members | null;
  ipLimiter: Limiter;
  emailLimiter: Limiter;
  now?: number; // ms, for tests
};

const MAX_PASSWORD = 256;

// Returns the owner's email on success, null for every failure (the caller shows one message).
// Over either rate limit, no hashing happens at all: a blocked caller costs almost nothing.
// Within the limits, scrypt runs for every attempt, even for an email that is not an owner,
// so timing does not reveal who is an owner.
export async function ownerSignIn(emailRaw: unknown, passwordRaw: unknown, ip: string, deps: OwnerSignInDeps): Promise<string | null> {
  const email = typeof emailRaw === 'string' ? normalizeEmail(emailRaw) : '';
  const password = typeof passwordRaw === 'string' && passwordRaw.length <= MAX_PASSWORD ? passwordRaw : '';
  // Both limiters tick on every attempt (no short circuit), so one tripping does not change the counting.
  const ipOk = deps.ipLimiter.allow(`ip:${ip}`, deps.now);
  const emailOk = deps.emailLimiter.allow(`email:${email}`, deps.now);
  if (!ipOk || !emailOk) return null;
  const passwordOk = await verifyPassword(password, deps.storedHash);
  const isOwner = Boolean(deps.members && deps.members.get(email) === 'owner');
  return passwordOk && isOwner && password.length > 0 ? email : null;
}
