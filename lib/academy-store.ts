// Where the academy allowlist lives: Vercel Global Config (formerly Edge Config).
//
// One item, `academy_members`, holds { email: role }. Reads work in the Edge
// middleware and in Node. Writes go through the Vercel REST API and exist only when
// the write env vars below are set; without them the admin view is read-only.
//
//   GLOBAL_CONFIG        connection string of the store, read side (set by Vercel when
//                        the store is linked to the project)
//   GLOBAL_CONFIG_ID     id of that store, write side
//   VERCEL_ACCESS_TOKEN  Vercel API token allowed to edit it, write side. Secret.
//   VERCEL_TEAM_ID       optional team scope for the write call
//
// UNVERIFIED: the store itself. Nothing has been created; see docs/academy-private-setup.md.
// Fails closed: an unset or unreadable store returns null and the gate serves 503.

import { createClient } from '@vercel/global-config';
import { parseMemberRecord, toMemberRecord, type Members } from './academy-members.ts';
import { parseAliases } from './academy-zoom.ts';

export const MEMBERS_KEY = 'academy_members';

export async function loadMembers(): Promise<Members | null> {
  const conn = process.env.GLOBAL_CONFIG;
  if (!conn) return null;
  try {
    const raw = await createClient(conn).get(MEMBERS_KEY);
    return parseMemberRecord(raw);
  } catch {
    return null;
  }
}

export function canWriteMembers(): boolean {
  return Boolean(process.env.GLOBAL_CONFIG_ID && process.env.VERCEL_ACCESS_TOKEN);
}

export async function saveMembers(members: Members): Promise<void> {
  const id = process.env.GLOBAL_CONFIG_ID;
  const token = process.env.VERCEL_ACCESS_TOKEN;
  if (!id || !token) throw new Error('Member list writes are not configured.');
  const conn = process.env.GLOBAL_CONFIG;
  // The REST API wants create for a new key and update for an existing one.
  const existing = conn ? await createClient(conn).get(MEMBERS_KEY).catch(() => undefined) : undefined;
  const team = process.env.VERCEL_TEAM_ID ? `?teamId=${encodeURIComponent(process.env.VERCEL_TEAM_ID)}` : '';
  const res = await fetch(`https://api.vercel.com/v1/global-config/${encodeURIComponent(id)}/items${team}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ operation: existing === undefined ? 'create' : 'update', key: MEMBERS_KEY, value: toMemberRecord(members) }],
    }),
  });
  if (!res.ok) throw new Error(`Member list write failed (${res.status}).`);
}

// Name aliases for matching a Zoom call to a person: one item, `academy_zoom_aliases`,
// { "full name": "email" }, edited by an owner. Missing or unreadable means no matches, so every
// recording waits as unassigned for an owner to place.
export const ALIASES_KEY = 'academy_zoom_aliases';

export async function loadAliases(): Promise<Record<string, string>> {
  const conn = process.env.GLOBAL_CONFIG;
  if (!conn) return {};
  try {
    return parseAliases(await createClient(conn).get(ALIASES_KEY));
  } catch {
    return {};
  }
}
