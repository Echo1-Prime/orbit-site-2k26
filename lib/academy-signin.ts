// Sign-in request logic for /academy/sign-in.
//
// The caller always shows the same "check your inbox" reply, whatever happens here:
// unknown email, malformed email, rate limited, store down, member. No status code,
// body or redirect differs. The only difference is the `deliver` step, which the route
// runs after the response has gone out, so response time does not tell members from
// strangers either. Both the IP and the email counters tick on every request.

import { SIGNIN_TTL_SECONDS, INVITE_PARAM, signToken } from './academy-auth.ts';
import { validEmail, type Members } from './academy-members.ts';
import type { Limiter } from './academy-ratelimit.ts';
import type { Mailer } from './academy-mailer.ts';

export type SignInDeps = {
  secret: string | undefined;
  baseUrl: string; // fixed from config, never taken from the request Host header
  loadMembers: () => Promise<Members | null>;
  mailer: Mailer;
  ipLimiter: Limiter;
  emailLimiter: Limiter;
  now?: number; // seconds, for tests
};

export const SIGNIN_REPLY = 'If that email is on the Sales Academy list, a sign-in link is on its way. It works for 15 minutes.';

export async function requestSignIn(
  emailRaw: unknown,
  ip: string,
  deps: SignInDeps,
): Promise<{ deliver: () => Promise<void> }> {
  const email = validEmail(emailRaw);
  const nowMs = deps.now === undefined ? undefined : deps.now * 1000;
  // Evaluate both, no short circuit, so one tripping does not change the work done.
  const ipOk = deps.ipLimiter.allow(`ip:${ip}`, nowMs);
  const emailOk = email ? deps.emailLimiter.allow(`email:${email}`, nowMs) : false;
  const members = await deps.loadMembers();

  const send = Boolean(email && ipOk && emailOk && members && members.has(email) && deps.secret && deps.secret.length >= 32);
  if (!send || !email) return { deliver: async () => {} };

  return {
    deliver: async () => {
      const token = await signToken(deps.secret as string, 'invite', email, SIGNIN_TTL_SECONDS, deps.now);
      const link = `${deps.baseUrl}?${INVITE_PARAM}=${token}`;
      try {
        await deps.mailer.sendSignInLink(email, link);
      } catch {
        // A mail failure must not surface to the visitor: it would reveal membership.
      }
    },
  };
}
