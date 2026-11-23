import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { shell } from '../../lib/academy-pages';
import { authenticate } from '../../lib/academy-session';
import { canAdmin } from '../../lib/academy-members';

// The Sales Academy page. The file is not in public/, so it is only ever served here,
// after the session is checked (again, after the middleware).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const auth = await authenticate(req);
  if (auth.state === 'unconfigured') return shell(503, 'Sales Academy', '<p style="text-align:center">The Sales Academy is not configured.</p>');
  if (auth.state !== 'member') {
    return shell(401, 'Members only', '<p style="text-align:center"><a href="/academy/sign-in">Sign in with your email</a></p>');
  }
  // Partners get their own page: the internal page carries internal training text.
  const file = auth.who.role === 'partner' ? 'partner.html' : 'index.html';
  let html = await readFile(path.join(process.cwd(), 'academy-private', file), 'utf8');
  if (canAdmin(auth.who.role)) {
    html = html.replace(
      '</body>',
      '<a href="/academy/admin" style="position:fixed;right:12px;bottom:12px;font:13px system-ui;color:#FF7515">Manage members</a></body>',
    );
  }
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'private, no-store',
    },
  });
}
