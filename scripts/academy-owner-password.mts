// Prints the ACADEMY_OWNER_PASSWORD_HASH value for a password read from stdin.
// The password never appears on the command line or in output; only the hash is printed.
//   printf '%s' "$PW" | node --experimental-strip-types scripts/academy-owner-password.mts
import { hashPassword } from '../lib/academy-ownerpw.ts';

let pw = '';
for await (const chunk of process.stdin) pw += chunk;
if (pw.length < 20) {
  console.error('Password must be at least 20 characters.');
  process.exit(1);
}
process.stdout.write(hashPassword(pw));
