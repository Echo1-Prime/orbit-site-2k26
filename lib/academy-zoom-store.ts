// Node-only reads for the Zoom ingest. Kept out of academy-store.ts on purpose: that module is
// imported by the Edge middleware, and academy-zoom.ts needs node:crypto, which the Edge bundle
// cannot load. Only the /hooks/zoom route (Node runtime) imports this file.

import { createClient } from '@vercel/global-config';
import { parseAliases } from './academy-zoom.ts';

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
