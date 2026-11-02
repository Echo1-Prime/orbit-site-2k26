import { NextResponse, type NextRequest } from 'next/server';
import {
  INVITE_PARAM,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  parseMembers,
  signToken,
  verifyToken,
} from './lib/academy-auth';

// Gate for the internal Sales Academy at /academy (page and clips).
// Personal sign-in links: members by email in ACADEMY_MEMBERS, links signed with
// ACADEMY_LINK_SECRET (both set in Vercel). Make a link with scripts/academy-link.mts.
// Fails closed: with either variable unset, nothing under /academy is served.
const NOINDEX = 'noindex, nofollow';

function page(status: number, title: string, line: string): NextResponse {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title><style>:root{color-scheme:dark}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0A0A0E;color:#F5F0FA;font:16px/1.5 system-ui,-apple-system,sans-serif;padding:16px}main{max-width:420px;text-align:center}h1{font-size:20px;margin:0 0 8px}p{margin:0;color:#F5F0FA;opacity:.75}span{color:#FF7515}</style></head><body><main><h1><span>Echo 1 Labs</span> Sales Academy</h1><p>${line}</p></main></body></html>`;
  return new NextResponse(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': NOINDEX, 'Cache-Control': 'no-store' },
  });
}

export async function middleware(req: NextRequest) {
  const secret = process.env.ACADEMY_LINK_SECRET;
  const members = parseMembers(process.env.ACADEMY_MEMBERS);
  if (!secret || secret.length < 32 || members.size === 0) {
    return page(503, 'Sales Academy', 'The Sales Academy is not configured.');
  }

  const invite = req.nextUrl.searchParams.get(INVITE_PARAM);
  if (invite) {
    const email = await verifyToken(secret, 'invite', invite, members);
    if (!email) {
      return page(401, 'Link not active', 'This sign-in link has expired or is no longer active. Ask Josh for a new one.');
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
    return page(401, 'Members only', 'This page is for Sales Academy members. Open the personal link you were sent.');
  }

  const path = req.nextUrl.pathname;
  const res =
    path === '/academy' || path === '/academy/'
      ? NextResponse.rewrite(new URL('/academy/index.html', req.url))
      : NextResponse.next();
  res.headers.set('X-Robots-Tag', NOINDEX);
  res.headers.set('Cache-Control', 'private, no-store');
  return res;
}

export const config = { matcher: ['/academy', '/academy/:path*'] };
