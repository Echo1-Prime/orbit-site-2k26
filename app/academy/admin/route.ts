import { shell, esc } from '../../../lib/academy-pages';
import { authenticate, sameOrigin } from '../../../lib/academy-session';
import { addMember, canAdmin, POC_MANAGES, removeMember, ROLES, type Members, type Role } from '../../../lib/academy-members';
import { canWriteMembers, loadMembers, saveMembers } from '../../../lib/academy-store';

// Member admin for owners and points of contact. Rules live in lib/academy-members.ts.
// Writes need the Global Config write env vars; without them this page is read-only.
// Reads and writes of one list are not atomic: two admins saving at the same moment
// can overwrite each other. Fine for a handful of admins.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LABEL: Record<Role, string> = { owner: 'Owner', 'point-of-contact': 'Point of contact', member: 'Member', partner: 'Partner' };

function view(members: Members, actor: Role, message = '', status = 200): Response {
  const writable = canWriteMembers();
  const roles = actor === 'owner' ? ROLES : POC_MANAGES;
  const rows = [...members.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([email, role]) => {
      const allowed = writable && removeMember(members, actor, email).ok;
      const btn = allowed
        ? `<form method="post" action="/academy/admin"><input type="hidden" name="action" value="remove"><input type="hidden" name="email" value="${esc(email)}"><button type="submit">Remove</button></form>`
        : '';
      return `<tr><td>${esc(email)}</td><td>${LABEL[role]}</td><td>${btn}</td></tr>`;
    })
    .join('');
  const add = writable
    ? `<form method="post" action="/academy/admin"><input type="hidden" name="action" value="add"><input type="email" name="email" maxlength="254" required placeholder="new@company.com" aria-label="Email"><select name="role" aria-label="Role">${roles.map((r) => `<option value="${r}">${LABEL[r]}</option>`).join('')}</select><button type="submit">Add</button></form>`
    : '<p class="note">Editing is switched off: the write settings for the member list are not set.</p>';
  const msg = message ? `<p class="note" role="status">${esc(message)}</p>` : '';
  return shell(status, 'Academy members', `${msg}<table><tr><th>Email</th><th>Role</th><th></th></tr>${rows}</table>${add}<p class="note"><a href="/academy">Back to the Academy</a></p>`);
}

async function guard(req: Request) {
  const auth = await authenticate(req);
  if (auth.state === 'unconfigured') return { res: shell(503, 'Sales Academy', '<p style="text-align:center">The Sales Academy is not configured.</p>') };
  if (auth.state !== 'member') return { res: shell(401, 'Members only', '<p style="text-align:center"><a href="/academy/sign-in">Sign in with your email</a></p>') };
  if (!canAdmin(auth.who.role)) return { res: shell(403, 'Not allowed', '<p style="text-align:center">This page is for owners and points of contact.</p>') };
  return { who: auth.who };
}

export async function GET(req: Request) {
  const g = await guard(req);
  if (!g.who) return g.res;
  const members = await loadMembers();
  return members ? view(members, g.who.role) : shell(503, 'Academy members', '<p class="note">The member list could not be read.</p>');
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return shell(403, 'Not allowed', '<p style="text-align:center">That request could not be accepted.</p>');
  const g = await guard(req);
  if (!g.who) return g.res;
  const members = await loadMembers();
  if (!members) return shell(503, 'Academy members', '<p class="note">The member list could not be read.</p>');
  if (!canWriteMembers()) return view(members, g.who.role, 'Editing is switched off.', 403);

  const f = await req.formData().catch(() => null);
  const action = f?.get('action');
  const result =
    action === 'add'
      ? addMember(members, g.who.role, f?.get('email'), f?.get('role'))
      : action === 'remove'
        ? removeMember(members, g.who.role, f?.get('email'))
        : ({ ok: false, reason: 'Unknown action.' } as const);
  if (!result.ok) return view(members, g.who.role, result.reason, 400);
  try {
    await saveMembers(result.members);
  } catch {
    return view(members, g.who.role, 'The change could not be saved. Nothing was changed.', 502);
  }
  return view(result.members, g.who.role, action === 'add' ? 'Added.' : 'Removed.');
}
