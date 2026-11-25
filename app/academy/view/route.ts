import { authenticate, sameOrigin } from '../../../lib/academy-session';
import { loadMembers } from '../../../lib/academy-store';
import { VIEW_COOKIE, VIEW_TTL_SECONDS, chooseView } from '../../../lib/academy-viewas';

// Owner-only: switch which Academy view this browser is shown (see lib/academy-viewas.ts).
// Uses the REAL session, never a "view as" one. Anyone who is not an owner gets a 404.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const notFound = () => new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  if (!sameOrigin(req)) return notFound();
  const auth = await authenticate(req);
  if (auth.state !== 'member' || auth.who.role !== 'owner') return notFound();
  const members = await loadMembers();
  if (!members) return notFound();

  const form = await req.formData().catch(() => null);
  const value = chooseView(auth.who, form?.get('view'), members);
  const cookie = value
    ? `${VIEW_COOKIE}=${encodeURIComponent(value)}; Path=/academy; HttpOnly; Secure; SameSite=Lax; Max-Age=${VIEW_TTL_SECONDS}`
    : `${VIEW_COOKIE}=; Path=/academy; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
  return new Response(null, {
    status: 303,
    headers: { Location: new URL('/academy', req.url).toString(), 'Set-Cookie': cookie, 'Cache-Control': 'no-store' },
  });
}
