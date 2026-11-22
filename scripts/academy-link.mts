// Print a personal Sales Academy sign-in link for each email given.
// The email must also be on the academy member list (Vercel Global Config, key academy_members),
// or the link is refused when opened. Links made here last 14 days; emailed ones last 15 minutes.
//
//   vercel env pull .env.academy --environment=production   (needs ACADEMY_LINK_SECRET only)
//   node --env-file=.env.academy --experimental-strip-types scripts/academy-link.mts brandon@echo1labs.com
//   rm .env.academy
import { INVITE_PARAM, INVITE_TTL_SECONDS, normalizeEmail, signToken } from '../lib/academy-auth.ts';

const BASE = process.env.ACADEMY_BASE_URL ?? 'https://www.echo1labs.com/academy';
const secret = process.env.ACADEMY_LINK_SECRET;
const emails = process.argv.slice(2).map(normalizeEmail).filter((e) => e.includes('@'));

if (!secret || secret.length < 32) {
  console.error('ACADEMY_LINK_SECRET is missing or shorter than 32 characters.');
  process.exit(1);
}
if (emails.length === 0) {
  console.error('Usage: academy-link.mts <email> [email ...]');
  process.exit(1);
}

for (const email of emails) {
  const token = await signToken(secret, 'invite', email, INVITE_TTL_SECONDS);
  console.log(`${email}\n${BASE}?${INVITE_PARAM}=${token}\n`);
}
