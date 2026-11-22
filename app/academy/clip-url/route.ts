import { CLIP_TTL_SECONDS, signToken } from '../../../lib/academy-auth';
import { authenticate } from '../../../lib/academy-session';
import { CLIP_ID } from '../../../lib/academy-clips';

// Mints a short-lived signed URL for one clip. The page calls this when a clip is
// about to play, and again if the URL has expired. Members only.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id') ?? '';
  if (!CLIP_ID.test(id)) return Response.json({ error: 'bad clip' }, { status: 400 });
  const auth = await authenticate(req);
  if (auth.state !== 'member') return Response.json({ error: 'members only' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  const token = await signToken(process.env.ACADEMY_LINK_SECRET as string, 'clip', auth.who.email, CLIP_TTL_SECONDS, undefined, id);
  return Response.json({ url: `/academy/clip/${id}?t=${token}`, expiresIn: CLIP_TTL_SECONDS }, { headers: { 'Cache-Control': 'no-store' } });
}
