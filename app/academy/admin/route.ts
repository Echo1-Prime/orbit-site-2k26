import { shell, esc } from '../../../lib/academy-pages';
import { authenticate, sameOrigin } from '../../../lib/academy-session';
import { addMember, canAdmin, POC_MANAGES, removeMember, ROLES, validEmail, type Members, type Role } from '../../../lib/academy-members';
import { canWriteMembers, loadMembers, saveMembers } from '../../../lib/academy-store';
import { after } from 'next/server';
import { canManageRecordings, canRetry, planApproval, reassign, sortRecords } from '../../../lib/academy-approval';
import { applyApproval, listRecords, logApproval, readPersonFolder, readRecord, readRetryInfo, runIngest, writeRecord } from '../../../lib/academy-ingest-store';
import type { IngestRecord } from '../../../lib/academy-zoom';

// Member admin for owners and points of contact. Rules live in lib/academy-members.ts.
// Writes need the Global Config write env vars; without them this page is read-only.
// Reads and writes of one list are not atomic: two admins saving at the same moment
// can overwrite each other. Fine for a handful of admins.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // a retried Zoom download runs after the response

const LABEL: Record<Role, string> = { owner: 'Owner', 'point-of-contact': 'Point of contact', member: 'Member', partner: 'Partner' };

function view(members: Members, actor: Role, message = '', status = 200, recordings = ''): Response {
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
  return shell(status, 'Academy members', `${msg}<table><tr><th>Email</th><th>Role</th><th></th></tr>${rows}</table>${add}${recordings}<p class="note"><a href="/academy">Back to the Academy</a></p>`);
}

// Owners only: the Zoom recordings waiting for approval. The topic is shown here (it can name other
// people) and never to the person; their clip list gets labels built from the date and length.
const STATUS_LABEL: Record<IngestRecord['status'], string> = {
  downloading: 'Downloading',
  pending: 'Waiting',
  unassigned: 'Unassigned',
  failed: 'Failed',
  approved: 'Approved',
};

function when(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Chicago' }).format(d);
}

function recordingsSection(records: IngestRecord[] | null, members: Members): string {
  if (records === null) return '<h2>Recordings</h2><p class="note">The recordings queue could not be read.</p>';
  if (records.length === 0) return '<h2>Recordings</h2><p class="note">No Zoom recordings have arrived yet.</p>';
  const emails = [...members.keys()].sort();
  const options = (selected: string | null, blank: string) =>
    `<option value="">${blank}</option>` +
    emails.map((e) => `<option value="${esc(e)}"${e === selected ? ' selected' : ''}>${esc(e)}</option>`).join('');
  const hidden = (action: string, key: string) =>
    `<input type="hidden" name="action" value="${action}"><input type="hidden" name="key" value="${esc(key)}">`;
  const now = Date.now();
  const rows = sortRecords(records)
    .map((r) => {
      const mins = r.durationMinutes ? ` · ${r.durationMinutes} min` : '';
      const head = `<td>${esc(when(r.startTime))}${mins}<br><span class="note">${esc(r.topic)}</span></td>`;
      let detail = STATUS_LABEL[r.status];
      let actions = '';
      if (r.status === 'pending' || r.status === 'unassigned') {
        actions =
          `<form method="post" action="/academy/admin">${hidden('approve', r.key)}<label for="ap-${esc(r.key)}">Approve for (they see it right away)</label><select id="ap-${esc(r.key)}" name="email" required>${options(r.assignedTo, 'Choose a person')}</select><button type="submit">Approve</button></form>` +
          `<form method="post" action="/academy/admin">${hidden('reassign', r.key)}<label for="sg-${esc(r.key)}">Suggest for (nobody sees it yet)</label><select id="sg-${esc(r.key)}" name="email">${options(r.assignedTo, 'Leave unassigned')}</select><button type="submit">Save</button></form>`;
        if (r.assignedTo) detail += ` for ${esc(r.assignedTo)}`;
      } else if (r.status === 'approved') {
        detail += ` as ${esc(r.clipId ?? '')} for ${esc(r.assignedTo ?? '')}`;
      } else if (r.error) {
        detail += `: ${esc(r.error)}`;
      }
      if (canRetry(r, now)) actions += `<form class="one" method="post" action="/academy/admin">${hidden('retry', r.key)}<button type="submit">Retry download</button></form>`;
      return `<tr>${head}<td><p class="st">${detail}</p>${actions}</td></tr>`;
    })
    .join('');
  return `<h2>Recordings</h2><p class="note">A recording reaches a person only after you approve it. It becomes their next P## clip.</p><table class="rec"><tr><th>Call</th><th>Status</th></tr>${rows}</table>`;
}

async function loadRecordings(): Promise<IngestRecord[] | null> {
  try {
    return await listRecords();
  } catch {
    return null;
  }
}

async function page(members: Members, actor: Role, message = '', status = 200): Promise<Response> {
  const recordings = canManageRecordings(actor) ? recordingsSection(await loadRecordings(), members) : '';
  return view(members, actor, message, status, recordings);
}

async function recordingAction(action: string, f: FormData, members: Members): Promise<{ status: number; message: string }> {
  const key = f.get('key');
  const rec = typeof key === 'string' && /^[0-9a-f]{24}$/.test(key) ? await readRecord(key) : null;
  if (!rec) {
    logApproval('error', `${action}:not-found`, typeof key === 'string' ? key.replace(/[^0-9a-f]/gi, '').slice(0, 24) || 'invalid' : 'none');
    return { status: 404, message: 'That recording was not found.' };
  }

  if (action === 'reassign') {
    const r = reassign(rec, f.get('email'), members);
    if (!r.ok) return { status: 400, message: r.reason };
    try {
      await writeRecord(r.value, true);
    } catch {
      return { status: 502, message: 'The change could not be saved. Nothing was changed.' };
    }
    return { status: 200, message: 'Saved.' };
  }

  if (action === 'retry') {
    if (!canRetry(rec, Date.now())) return { status: 400, message: 'This recording can no longer be retried.' };
    const info = await readRetryInfo(rec.key);
    if (!info) return { status: 400, message: 'The download details are gone, so this recording cannot be retried.' };
    const record: IngestRecord = { ...rec, status: 'downloading', error: null, attemptAt: new Date().toISOString() };
    try {
      await writeRecord(record, true);
    } catch {
      return { status: 502, message: 'The retry could not be started.' };
    }
    after(() => runIngest(record, info, rec.assignedTo && members.has(rec.assignedTo) ? rec.assignedTo : null));
    return { status: 200, message: 'Retrying the download. Reload in a few minutes.' };
  }

  // approve
  const email = f.get('email');
  const member = validEmail(email);
  let folder;
  try {
    // Only a person on the member list has their folder read; anyone else is refused by planApproval.
    folder = member && members.has(member) ? await readPersonFolder(member) : null;
  } catch (e) {
    logApproval('error', 'folder-read', rec.key, e);
    return { status: 502, message: "That person's folder could not be read. Nothing was changed." };
  }
  const plan = planApproval(rec, email, members, folder?.names ?? [], folder ? folder.manifest : null);
  if (!plan.ok) {
    logApproval('error', 'plan', rec.key, plan.reason);
    return { status: 400, message: plan.reason };
  }
  const done = await applyApproval(plan.value, folder?.etag ?? null);
  if (!done.ok) return { status: 502, message: done.reason };
  logApproval('warn', `approved:${plan.value.clipId}`, rec.key);
  return { status: 200, message: done.warning ?? `Approved as ${plan.value.clipId} for ${plan.value.email}.` };
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
  return members ? page(members, g.who.role) : shell(503, 'Academy members', '<p class="note">The member list could not be read.</p>');
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    console.error(`[academy-admin] origin refused origin=${JSON.stringify((req.headers.get('origin') ?? 'none').slice(0, 100))} host=${new URL(req.url).host}`);
    return shell(403, 'Not allowed', '<p style="text-align:center">That request could not be accepted.</p>');
  }
  const g = await guard(req);
  if (!g.who) return g.res;
  const members = await loadMembers();
  if (!members) return shell(503, 'Academy members', '<p class="note">The member list could not be read.</p>');
  const f = await req.formData().catch(() => null);
  const action = f?.get('action');
  if (f && (action === 'approve' || action === 'reassign' || action === 'retry')) {
    if (!canManageRecordings(g.who.role)) return page(members, g.who.role, 'Only owners can manage recordings.', 403);
    const r = await recordingAction(action, f, members);
    return page(members, g.who.role, r.message, r.status);
  }
  if (!canWriteMembers()) return page(members, g.who.role, 'Editing is switched off.', 403);
  const result =
    action === 'add'
      ? addMember(members, g.who.role, f?.get('email'), f?.get('role'))
      : action === 'remove'
        ? removeMember(members, g.who.role, f?.get('email'))
        : ({ ok: false, reason: 'Unknown action.' } as const);
  if (!result.ok) return page(members, g.who.role, result.reason, 400);
  try {
    await saveMembers(result.members);
  } catch {
    return page(members, g.who.role, 'The change could not be saved. Nothing was changed.', 502);
  }
  return page(result.members, g.who.role, action === 'add' ? 'Added.' : 'Removed.');
}
