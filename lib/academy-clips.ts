// Clip ids: D## and T## are the internal Sales Academy clips, P## are partner training.
// The id decides the audience. The id is checked against this pattern before a path is
// built, so a request can never choose an arbitrary path.
//
// Partner clips are personal: each partner has their own private blob folder, named by a
// hash of their email, holding their clips and a clips.json list. The folder comes from
// the signed-in email, never from the request, so one partner can never reach another
// partner's recordings. The hash keeps partner emails out of blob paths and this public repo.
import { createHash } from 'node:crypto';
import { normalizeEmail } from './academy-auth.ts';
import type { Role } from './academy-members.ts';

export const CLIP_ID = /^[DTP]\d{2}$/;
export const PARTNER_CLIP_ID = /^P\d{2}$/;

export type Audience = 'internal' | 'partner';

export const clipAudience = (id: string): Audience => (id.startsWith('P') ? 'partner' : 'internal');

// 24 hex characters (96 bits) of SHA-256 over the normalized email.
export const partnerKey = (email: string) =>
  createHash('sha256').update(normalizeEmail(email)).digest('hex').slice(0, 24);

export const partnerFolder = (email: string) => `academy/partner/${partnerKey(email)}`;

export const partnerManifestPath = (email: string) => `${partnerFolder(email)}/clips.json`;

// The viewer's email decides the partner folder. Internal clips ignore it.
export const clipPath = (id: string, email: string) =>
  clipAudience(id) === 'partner' ? `${partnerFolder(email)}/${id}.mp4` : `academy/videos/${id}.mp4`;

// Staff (owner, point of contact, member) see every internal clip (D##, T##).
// Partners see ONLY the product demos cleared for them (PARTNER_DEMOS below, all Josh's own
// demos) and their own recordings (P##). They never get T## clips or the review of the Oct 30
// call, so no other partner's call or identity reaches them. A personal clip (P##) is always
// read from the viewer's own folder (clipPath), so nobody can reach another person's recordings.
// Anything that is not a known role sees nothing.
export const PARTNER_DEMOS: readonly { id: string; title: string; len: string; note: string }[] = [
  { id: 'D01', title: 'Business Lifecycle Management in two minutes', len: '2:32', note: 'Stack tour' },
  { id: 'D04', title: 'Titan: preconstruction workflow', len: '1:08', note: 'Titan' },
  { id: 'D05', title: 'Titan: plan reading and a self-updating price book', len: '2:55', note: 'Titan' },
  { id: 'D06', title: 'Titan: progress in 3D and a risk profile for every project', len: '1:10', note: 'Titan' },
  { id: 'D07', title: 'Agent Orbit: go-to-market studio', len: '0:52', note: 'Agent Orbit' },
  { id: 'D09', title: 'Ignition: dispatch, fleet tracking, and site KPIs', len: '1:41', note: 'Ignition' },
];
const PARTNER_DEMO_IDS = new Set(PARTNER_DEMOS.map((d) => d.id));

export function canViewClip(role: Role | undefined, id: string): boolean {
  if (!CLIP_ID.test(id)) return false;
  if (role === 'partner') return PARTNER_DEMO_IDS.has(id) || PARTNER_CLIP_ID.test(id);
  return role === 'owner' || role === 'point-of-contact' || role === 'member';
}

export type PartnerClip = { id: string; title: string; note: string; len: string };

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '');

// Turns a partner's clips.json into a clean list. Anything malformed is dropped, never
// guessed at. At most 50 clips, one entry per id.
export function parsePartnerManifest(raw: unknown): PartnerClip[] {
  if (!Array.isArray(raw)) return [];
  const out: PartnerClip[] = [];
  const seen = new Set<string>();
  for (const c of raw) {
    if (!c || typeof c !== 'object') continue;
    const r = c as Record<string, unknown>;
    if (typeof r.id !== 'string' || !PARTNER_CLIP_ID.test(r.id) || seen.has(r.id)) continue;
    const title = str(r.title, 200).trim();
    if (!title) continue;
    seen.add(r.id);
    out.push({ id: r.id, title, note: str(r.note, 500), len: str(r.len, 10) });
    if (out.length >= 50) break;
  }
  return out;
}

// JSON that is safe to place inside an inline <script>: no "<" can close the tag, and the
// two line separators JavaScript treats as newlines are escaped too.
export function scriptJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

// The internal page carries two placeholder lines the server replaces for the signed-in
// person: their own recordings (from clips.json in their private folder) and their role.
export const MY_CLIPS_PLACEHOLDER = 'const MY_CLIPS = [];';
export const ROLE_PLACEHOLDER = 'const ROLE = "";';

export function injectPersonal(html: string, clips: PartnerClip[], role: Role): string {
  return html
    .replace(MY_CLIPS_PLACEHOLDER, () => `const MY_CLIPS = ${scriptJson(clips)};`)
    .replace(ROLE_PLACEHOLDER, () => `const ROLE = ${scriptJson(role)};`);
}

// The partner page has two placeholder lines: the cleared demos and the partner's own recordings.
export const PARTNER_CLIPS_PLACEHOLDER = 'const CLIPS = [];';
export const PARTNER_DEMOS_PLACEHOLDER = 'const DEMOS = [];';

export function injectPartnerPage(html: string, clips: PartnerClip[]): string {
  const demos = PARTNER_DEMOS.map((d) => ({ id: d.id, title: d.title, note: d.note, len: d.len }));
  return html
    .replace(PARTNER_CLIPS_PLACEHOLDER, () => `const CLIPS = ${scriptJson(clips)};`)
    .replace(PARTNER_DEMOS_PLACEHOLDER, () => `const DEMOS = ${scriptJson(demos)};`);
}
