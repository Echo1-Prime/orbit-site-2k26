import { NextResponse, type NextRequest } from 'next/server';

// Gate for the internal Sales Academy at /academy (page and clips).
// Basic Auth against ACADEMY_USER and ACADEMY_PASSWORD, set in Vercel.
// Fails closed: with either variable unset, nothing under /academy is served.
const NOINDEX = 'noindex, nofollow';
// Clips are large and never change under the same name: let the signed-in
// browser keep them, but never a shared cache. The page itself revalidates.
const CACHE_PAGE = 'private, no-cache';
const CACHE_CLIP = 'private, max-age=86400';

const enc = new TextEncoder();

async function digest(s: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)));
}

// Compares fixed-length SHA-256 digests so timing reveals nothing about
// either value, including its length.
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [x, y] = await Promise.all([digest(a), digest(b)]);
  let r = 0;
  for (let i = 0; i < x.length; i++) r |= x[i] ^ y[i];
  return r === 0;
}

async function authorized(req: NextRequest, user: string, pass: string): Promise<boolean> {
  const [scheme, encoded] = (req.headers.get('authorization') ?? '').split(' ');
  if (scheme !== 'Basic' || !encoded) return false;
  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return false;
  }
  const i = decoded.indexOf(':');
  if (i < 0) return false;
  const [u, p] = await Promise.all([safeEqual(decoded.slice(0, i), user), safeEqual(decoded.slice(i + 1), pass)]);
  return u && p;
}

export async function middleware(req: NextRequest) {
  const user = process.env.ACADEMY_USER;
  const pass = process.env.ACADEMY_PASSWORD;
  if (!user || !pass) {
    return new NextResponse('The Sales Academy is not configured.', {
      status: 503,
      headers: { 'X-Robots-Tag': NOINDEX, 'Cache-Control': 'no-store' },
    });
  }
  if (!(await authorized(req, user, pass))) {
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
  res.headers.set('Cache-Control', path.startsWith('/academy/videos/') ? CACHE_CLIP : CACHE_PAGE);
  return res;
}

export const config = { matcher: ['/academy', '/academy/:path*'] };
