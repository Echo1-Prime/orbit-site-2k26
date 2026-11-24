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

// Partners see their own partner clips only. Owners, points of contact and members see the
// internal clips; partner clips are personal to one partner, so nobody else is served them.
// Anything that is not a known role sees nothing.
export function canViewClip(role: Role | undefined, id: string): boolean {
  if (!CLIP_ID.test(id)) return false;
  if (role === 'partner') return clipAudience(id) === 'partner';
  if (role === 'owner' || role === 'point-of-contact' || role === 'member') return clipAudience(id) === 'internal';
  return false;
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

export const CLIPS_PLACEHOLDER = 'const CLIPS = [];';

export function injectPartnerClips(html: string, clips: PartnerClip[]): string {
  return html.replace(CLIPS_PLACEHOLDER, () => `const CLIPS = ${scriptJson(clips)};`);
}
