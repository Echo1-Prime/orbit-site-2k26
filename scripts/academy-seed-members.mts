// One-time helper for moving the member list off the ACADEMY_MEMBERS env var.
// Prints the JSON to paste as the `academy_members` item in the Vercel Global Config
// store. It writes nothing and calls no API. Roles are your call, so name them:
//
//   node --experimental-strip-types scripts/academy-seed-members.mts \
//     --owner a@x.com --poc b@x.com --members "c@x.com,d@x.com" --partner e@x.com
//
// Pass the old env var's value as --members to carry everyone over as plain members.
import { toMemberRecord, validEmail, type Members, type Role } from '../lib/academy-members.ts';

const args = process.argv.slice(2);
const pick = (flag: string) => args.flatMap((a, i) => (a === flag ? [args[i + 1] ?? ''] : []));
const list = (v: string[]) => v.flatMap((x) => x.split(',')).map((x) => x.trim()).filter(Boolean);

const members: Members = new Map();
const order: [string, Role][] = [['--partner', 'partner'], ['--members', 'member'], ['--poc', 'point-of-contact'], ['--owner', 'owner']]; // later flags win
for (const [flag, role] of order) {
  for (const raw of list(pick(flag))) {
    const email = validEmail(raw);
    if (email) members.set(email, role);
    else console.error(`Skipped (not a valid email): ${raw}`);
  }
}
if (![...members.values()].includes('owner')) {
  console.error('Name at least one --owner, or nobody can manage the list.');
  process.exit(1);
}
console.log(JSON.stringify(toMemberRecord(members), null, 2));
