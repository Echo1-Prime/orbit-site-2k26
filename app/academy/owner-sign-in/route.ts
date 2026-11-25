import { SESSION_COOKIE, SESSION_TTL_SECONDS, signToken } from '../../../lib/academy-auth';
import { esc, shell } from '../../../lib/academy-pages';
import { createLimiter } from '../../../lib/academy-ratelimit';
import { sameOrigin } from '../../../lib/academy-session';
import { loadMembers } from '../../../lib/academy-store';
import { ownerSignIn } from '../../../lib/academy-ownerpw';

// Owner sign-in with a password, an alternative to the emailed link. Off (404) unless
// ACADEMY_OWNER_PASSWORD_HASH is set. Only owner emails can use it. Rate limited per IP
// and per email in memory (best effort per instance); add a Vercel Firewall rate-limit
// rule on POST /academy/owner-sign-in as the hard limit.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ipLimiter = createLimiter(5, 15 * 60 * 1000);
const emailLimiter = createLimiter(5, 15 * 60 * 1000);
const MAX_BODY = 2048;
const TITLE = 'Owner sign in';

const off = () => new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
const form = (note = '') =>
  `${note ? `<p style="text-align:center">${esc(note)}</p>` : ''}<form method="post" action="/academy/owner-sign-in"><input type="email" name="email" autocomplete="username" maxlength="254" required placeholder="you@company.com" aria-label="Email"><input type="password" name="password" autocomplete="current-password" maxlength="256" required aria-label="Password"><button type="submit">Sign in</button></form><p style="text-align:center;font-size:13px"><a href="/academy/sign-in">Use an emailed link instead</a></p>`;

export async function GET() {
  if (!process.env.ACADEMY_OWNER_PASSWORD_HASH) return off();
  return shell(200, TITLE, form());
}

export async function POST(req: Request) {
  const storedHash = process.env.ACADEMY_OWNER_PASSWORD_HASH;
  const secret = process.env.ACADEMY_LINK_SECRET;
  if (!storedHash) return off();
  if (!sameOrigin(req)) return shell(403, TITLE, '<p style="text-align:center">That request could not be accepted.</p>');

  let email: unknown = '';
  let password: unknown = '';
  if (Number(req.headers.get('content-length') ?? 0) <= MAX_BODY) {
    try {
      const f = await req.formData();
      email = f.get('email');
      password = f.get('password');
    } catch {
      /* treated as a failed attempt */
    }
  }
  const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const who = ownerSignIn(email, password, ip, { storedHash, members: await loadMembers(), ipLimiter, emailLimiter });
  if (!who || !secret || secret.length < 32) return shell(401, TITLE, form('That did not work.'));

  const token = await signToken(secret, 'session', who, SESSION_TTL_SECONDS);
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL('/academy', req.url).toString(),
      'Set-Cookie': `${SESSION_COOKIE}=${token}; Path=/academy; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`,
      'Cache-Control': 'no-store',
    },
  });
}
