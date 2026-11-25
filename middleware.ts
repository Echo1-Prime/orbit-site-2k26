import { NextResponse, type NextRequest } from 'next/server';
import { INVITE_PARAM, SESSION_COOKIE, SESSION_TTL_SECONDS, signToken, verifyToken } from './lib/academy-auth';
import { loadMembers } from './lib/academy-store';
import { shell } from './lib/academy-pages';

// Gate for the internal Sales Academy at /academy: the page, the clip URLs and the
// admin view. Members come from the allowlist in Vercel Global Config (lib/academy-store),
// links and cookies are signed with ACADEMY_LINK_SECRET. Fails closed: with the secret
// unset or the list unreadable or empty, nothing under /academy is served except
// the sign-in form, which reveals nothing. Route handlers re-check the session
// themselves (lib/academy-session), so they never depend on this file having run.
const NOINDEX = 'noindex, nofollow';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path === '/academy/sign-in' || path === '/academy/sign-in/') return NextResponse.next();
  // The owner password form is public like the email form; its route returns 404 unless enabled.
  if (path === '/academy/owner-sign-in' || path === '/academy/owner-sign-in/') return NextResponse.next();

  const secret = process.env.ACADEMY_LINK_SECRET;
  const members = await loadMembers();
  if (!secret || secret.length < 32 || !members || members.size === 0) {
    return shell(503, 'Sales Academy', '<p style="text-align:center">The Sales Academy is not configured.</p>');
  }

  const invite = req.nextUrl.searchParams.get(INVITE_PARAM);
  if (invite) {
    const email = await verifyToken(secret, 'invite', invite, members);
    if (!email) {
      return shell(
        401,
        'Link not active',
        '<p style="text-align:center">This sign-in link has expired or is no longer active.</p><p style="text-align:center"><a href="/academy/sign-in">Get a new one</a></p>',
      );
    }
    const clean = req.nextUrl.clone();
    clean.searchParams.delete(INVITE_PARAM);
    const res = NextResponse.redirect(clean, 303);
    res.cookies.set(SESSION_COOKIE, await signToken(secret, 'session', email, SESSION_TTL_SECONDS), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/academy',
      maxAge: SESSION_TTL_SECONDS,
    });
    res.headers.set('X-Robots-Tag', NOINDEX);
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }

  const email = await verifyToken(secret, 'session', req.cookies.get(SESSION_COOKIE)?.value, members);
  if (!email) {
    return shell(
      401,
      'Members only',
      '<p style="text-align:center">This page is for Sales Academy members.</p><p style="text-align:center"><a href="/academy/sign-in">Sign in with your email</a></p>',
    );
  }

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', NOINDEX);
  res.headers.set('Cache-Control', 'private, no-store');
  return res;
}

export const config = { matcher: ['/academy', '/academy/:path*'] };
