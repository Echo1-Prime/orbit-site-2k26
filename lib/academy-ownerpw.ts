// Owner password sign-in: a second way in for owners, next to the emailed link.
//
// The password is never stored. Vercel holds only a scrypt hash in
// ACADEMY_OWNER_PASSWORD_HASH (format scrypt$N$r$p$salt$hash, base64). Only an email that
// is an owner on the live member list can sign in with it. Every attempt runs the scrypt
// check, even for an email that is not an owner, so timing does not reveal who is an owner.

import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
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

// A malformed stored hash verifies nothing.
export function verifyPassword(password: string, stored: string | undefined): boolean {
  if (!stored) return false;
  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [n, r, p] = [Number(parts[1]), Number(parts[2]), Number(parts[3])];
  if (![n, r, p].every((x) => Number.isInteger(x) && x > 0 && x <= 1 << 20)) return false;
  try {
    const salt = Buffer.from(parts[4], 'base64');
    const want = Buffer.from(parts[5], 'base64');
    if (want.length === 0 || salt.length === 0) return false;
    const got = scryptSync(password, salt, want.length, { N: n, r, p });
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
export function ownerSignIn(emailRaw: unknown, passwordRaw: unknown, ip: string, deps: OwnerSignInDeps): string | null {
  const email = typeof emailRaw === 'string' ? normalizeEmail(emailRaw) : '';
  const password = typeof passwordRaw === 'string' && passwordRaw.length <= MAX_PASSWORD ? passwordRaw : '';
  // Evaluate everything, no short circuit, so one condition failing does not change the work done.
  const ipOk = deps.ipLimiter.allow(`ip:${ip}`, deps.now);
  const emailOk = deps.emailLimiter.allow(`email:${email}`, deps.now);
  const passwordOk = verifyPassword(password, deps.storedHash);
  const isOwner = Boolean(deps.members && deps.members.get(email) === 'owner');
  return ipOk && emailOk && passwordOk && isOwner && password.length > 0 ? email : null;
}
