import { get } from '@vercel/blob';
import { verifyToken } from '../../../../lib/academy-auth';
import { authenticate } from '../../../../lib/academy-session';
import { CLIP_ID, clipPath } from '../../../../lib/academy-clips';
import { loadMembers } from '../../../../lib/academy-store';

// Streams one clip out of the private Blob store. Needs BOTH a live member session and
// an unexpired signed URL for this clip and this member, checked here and not only in
// the middleware. Clips are not in public/ and have no URL of their own.
//
// UNVERIFIED: whether get() on a private blob honours a Range header (206). The code
// passes Range through and uses the answer if there is one; otherwise it streams the
// whole file, which plays but seeks less well. Check on a preview deployment.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DENIED = new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!CLIP_ID.test(id)) return DENIED.clone();
  const auth = await authenticate(req);
  if (auth.state !== 'member') return DENIED.clone();

  const members = await loadMembers();
  const t = new URL(req.url).searchParams.get('t');
  const owner = members ? await verifyToken(process.env.ACADEMY_LINK_SECRET as string, 'clip', t, members, undefined, id) : null;
  if (owner !== auth.who.email) return DENIED.clone();

  try {
    const range = req.headers.get('range');
    const result = await get(clipPath(id), { access: 'private', ...(range ? { headers: { range } } : {}) });
    if (!result || !result.stream) return DENIED.clone();
    const headers = new Headers({
      'Content-Type': 'video/mp4',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    });
    const contentRange = result.headers.get('content-range');
    const contentLength = result.headers.get('content-length');
    if (contentRange) headers.set('Content-Range', contentRange);
    if (contentLength) headers.set('Content-Length', contentLength);
    if (contentRange || result.headers.get('accept-ranges')) headers.set('Accept-Ranges', 'bytes');
    return new Response(result.stream, { status: contentRange ? 206 : 200, headers });
  } catch {
    return new Response('Clips are not available right now.', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
