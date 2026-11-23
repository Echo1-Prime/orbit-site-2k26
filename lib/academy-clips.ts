// Clip ids: D## and T## are the internal Sales Academy clips, P## are partner training.
// The id decides the audience and the private blob path, so partner and internal clips
// never share a folder. The id is checked against this pattern before a path is built,
// so a request can never choose an arbitrary path.
import type { Role } from './academy-members.ts';

export const CLIP_ID = /^[DTP]\d{2}$/;

export type Audience = 'internal' | 'partner';

export const clipAudience = (id: string): Audience => (id.startsWith('P') ? 'partner' : 'internal');

export const clipPath = (id: string) =>
  clipAudience(id) === 'partner' ? `academy/partner/${id}.mp4` : `academy/videos/${id}.mp4`;

// Partners see partner clips only. Owners, points of contact and members see everything.
// Anything that is not a known role sees nothing.
export function canViewClip(role: Role | undefined, id: string): boolean {
  if (!CLIP_ID.test(id)) return false;
  if (role === 'partner') return clipAudience(id) === 'partner';
  return role === 'owner' || role === 'point-of-contact' || role === 'member';
}
