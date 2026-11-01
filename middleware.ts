import { NextResponse, type NextRequest } from 'next/server';

// Gate for the internal Sales Academy at /academy (page and clips).
// Basic Auth against ACADEMY_USER and ACADEMY_PASSWORD, set in Vercel.
// Fails closed: with either variable unset, nothing under /academy is served.
const NOINDEX = 'noindex, nofollow';

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function authorized(req: NextRequest, user: string, pass: string): boolean {
  const [scheme, encoded] = (req.headers.get('authorization') ?? '').split(' ');
  if (scheme !== 'Basic' || !encoded) return false;
  try {
    const decoded = atob(encoded);
    const i = decoded.indexOf(':');
    return i > -1 && safeEqual(decoded.slice(0, i), user) && safeEqual(decoded.slice(i + 1), pass);
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const user = process.env.ACADEMY_USER;
  const pass = process.env.ACADEMY_PASSWORD;
  if (!user || !pass) {
    return new NextResponse('The Sales Academy is not configured.', {
      status: 503,
      headers: { 'X-Robots-Tag': NOINDEX, 'Cache-Control': 'no-store' },
    });
  }
  if (!authorized(req, user, pass)) {
    return new NextResponse('Sign in to the Echo 1 Labs Sales Academy.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Echo 1 Labs Sales Academy", charset="UTF-8"',
        'X-Robots-Tag': NOINDEX,
        'Cache-Control': 'no-store',
      },
    });
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
