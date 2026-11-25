import { readFile } from 'node:fs/promises';
import { get } from '@vercel/blob';
import path from 'node:path';
import { esc, shell } from '../../lib/academy-pages';
import { authenticateView } from '../../lib/academy-session';
import { loadMembers } from '../../lib/academy-store';
import { viewOptions } from '../../lib/academy-viewas';
import { canAdmin } from '../../lib/academy-members';
import { injectPartnerPage, injectPersonal, parsePartnerManifest, partnerManifestPath, type PartnerClip } from '../../lib/academy-clips';

// The Sales Academy page. The file is not in public/, so it is only ever served here,
// after the session is checked (again, after the middleware).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const auth = await authenticateView(req);
  if (auth.state === 'unconfigured') return shell(503, 'Sales Academy', '<p style="text-align:center">The Sales Academy is not configured.</p>');
  if (auth.state !== 'member') {
    return shell(401, 'Members only', '<p style="text-align:center"><a href="/academy/sign-in">Sign in with your email</a></p>');
  }
  // Staff get the internal training. Partners get a small page: the product demos cleared for
  // them plus their own recordings, so no other partner's call or name reaches them.
  // Each person's own recordings come from their private folder, chosen by signed-in email.
  const isPartner = auth.who.role === 'partner';
  let html = await readFile(path.join(process.cwd(), 'academy-private', isPartner ? 'partner.html' : 'index.html'), 'utf8');
  const mine = await loadPartnerClips(auth.who.email);
  html = isPartner ? injectPartnerPage(html, mine) : injectPersonal(html, mine, auth.who.role);
  if (canAdmin(auth.who.role)) {
    html = html.replace(
      '</body>',
      '<a href="/academy/admin" style="position:fixed;right:12px;bottom:12px;font:13px system-ui;color:#FF7515">Manage members</a></body>',
    );
  }
  if (auth.actor.role === 'owner') {
    const members = await loadMembers();
    if (members) html = html.replace('</body>', viewSwitcher(viewOptions(members), auth.viewing) + '</body>');
  }
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'private, no-store',
    },
  });
}

// A partner's own clip list, from clips.json in their private folder. Missing or unreadable
// means no clips, and the page says nothing has been shared yet.
async function loadPartnerClips(email: string): Promise<PartnerClip[]> {
  try {
    const result = await get(partnerManifestPath(email), { access: 'private' });
    if (!result || !result.stream) return [];
    return parsePartnerManifest(JSON.parse(await new Response(result.stream).text()));
  } catch {
    return [];
  }
}

// Owner-only switcher, posted to /academy/view. The server re-checks that the signed-in
// person is an owner, so this markup being visible to someone else would do nothing.
function viewSwitcher(options: { value: string; label: string }[], current: string | null): string {
  const opts = options
    .map((o) => `<option value="${esc(o.value)}"${(current ?? 'owner') === o.value ? ' selected' : ''}>${esc(o.label)}</option>`)
    .join('');
  const note = current ? `<span style="color:#FF7515">Viewing as ${esc(current.replace('partner:', 'partner '))}</span> ` : '';
  return (
    '<form method="post" action="/academy/view" style="position:fixed;right:12px;bottom:44px;z-index:2147483000;font:13px system-ui;background:#fff;color:#111;border:1px solid #ccc;border-radius:6px;padding:6px 8px">' +
    note +
    `<label>View as <select name="view">${opts}</select></label> <button type="submit">Switch</button></form>`
  );
}
