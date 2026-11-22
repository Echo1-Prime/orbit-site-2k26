import { after } from 'next/server';
import { shell, esc } from '../../../lib/academy-pages';
import { createLimiter } from '../../../lib/academy-ratelimit';
import { getMailer } from '../../../lib/academy-mailer';
import { loadMembers } from '../../../lib/academy-store';
import { requestSignIn, SIGNIN_REPLY } from '../../../lib/academy-signin';
import { sameOrigin } from '../../../lib/academy-session';

// Public sign-in form for the Sales Academy. Enter an email; if it is on the list, a
// 15-minute sign-in link goes to it. The reply is the same for everyone (see
// lib/academy-signin.ts). Rate limited by IP and by email; in memory per instance, so
// also set a Vercel Firewall rate-limit rule on POST /academy/sign-in.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ipLimiter = createLimiter(10, 15 * 60 * 1000);
const emailLimiter = createLimiter(3, 15 * 60 * 1000);
const MAX_BODY = 2048;

const form = `<p style="text-align:center">Enter your email to get a sign-in link.</p><form method="post" action="/academy/sign-in"><input type="email" name="email" autocomplete="email" maxlength="254" required placeholder="you@company.com" aria-label="Email"><button type="submit">Send link</button></form>`;

export async function GET() {
  return shell(200, 'Sales Academy sign-in', form);
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return shell(403, 'Sales Academy sign-in', '<p style="text-align:center">That request could not be accepted.</p>');

  let email: unknown = '';
  if (Number(req.headers.get('content-length') ?? 0) <= MAX_BODY) {
    try {
      email = (await req.formData()).get('email');
    } catch {
      email = '';
    }
  }
  const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  const { deliver } = await requestSignIn(email, ip, {
    secret: process.env.ACADEMY_LINK_SECRET,
    baseUrl: process.env.ACADEMY_BASE_URL ?? 'https://www.echo1labs.com/academy',
    loadMembers,
    mailer: getMailer(),
    ipLimiter,
    emailLimiter,
  });
  after(deliver);

  return shell(200, 'Check your inbox', `<p style="text-align:center">${esc(SIGNIN_REPLY)}</p>`);
}
