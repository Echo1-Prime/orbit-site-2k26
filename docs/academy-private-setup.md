# Sales Academy: private clips, member list, sign-in

This PR takes the Academy clips and page out of `public/` and puts the member list in a
store. Nothing live was created by the PR. These are the steps that do that, for Josh
to run. Until they are done, `/academy` answers 503 ("not configured"): it fails closed.

## What changed

| Before | After |
| --- | --- |
| `public/academy/videos/*.mp4` (23 clips), served to anyone with the URL | Private Vercel Blob store, path `academy/videos/<id>.mp4`. Streamed by `/academy/clip/<id>` only |
| `public/academy/index.html`, rewritten by the middleware | `academy-private/index.html`, served by `app/academy/route.ts` after the session check |
| `ACADEMY_MEMBERS` env var | Vercel Global Config store, item `academy_members` (`{ email: role }`) |
| Personal links only, minted by hand | Plus `/academy/sign-in`: email a link, 15-minute TTL |

Clip URLs are signed (`signToken`, kind `clip`, scoped to one clip id and one member,
10-minute TTL) and also need a live member session. The page asks `/academy/clip-url`
for a fresh URL as each clip nears the screen, and again if one expires.

## Roles

`owner` can add or remove anyone and set any role, but cannot remove or demote the last
owner. `point-of-contact` can add and remove members and partners, nothing else.
`member` sees the internal Academy and has no admin access. `partner` is for outside
partners: it sees the partner training only (below) and has no admin access. The admin view
is `/academy/admin`. Rules: `lib/academy-members.ts`.

## Partner training

Partner clips use ids `P01`, `P02`, ... and are personal: each partner has their own private
Blob folder, `academy/partner/<key>/`, where `<key>` is the first 24 hex characters of the
SHA-256 of their lowercased email (`partnerKey` in `lib/academy-clips.ts`). The folder is
chosen from the signed-in email, never from the request, so one partner cannot reach another
partner's recordings, and the email never appears in a blob path or in this public repo.

Staff (owner, point of contact, member) are served the internal page, `academy-private/index.html`, with their own
recordings added as "My recordings". Partners are served `academy-private/partner.html` instead: the product demos
cleared for them (`PARTNER_DEMOS` in `lib/academy-clips.ts`, all Josh's own demos, none flagged for internal use) plus
their own recordings. Partners get no T## clips, no game-film review and nothing that names another partner; the clip
routes refuse those for a partner, and a test checks the partner page never names Grant Kennedy or lists a T clip.
A personal clip (P##) is always read from the viewer's own folder, so nobody can reach another person's recordings.
If partners are ever allowed to see each other's calls, redact partner identity first.

To share a recording with one partner, put two things in that partner's folder:

```bash
KEY=$(node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1].trim().toLowerCase()).digest('hex').slice(0,24))" partner@example.com)
vercel blob put ./P01.mp4 --pathname academy/partner/$KEY/P01.mp4 --access private --content-type video/mp4
vercel blob put ./clips.json --pathname academy/partner/$KEY/clips.json --access private --content-type application/json --force
```

`clips.json` lists that partner's clips, for example
`[{"id":"P01","title":"Founder meeting","note":"Our call on 19 November","len":"67:00"}]`.
The page reads it on every load; entries that are not a `P##` id with a title are dropped.

## Setup steps

1. **Global Config store.** Create one in the Vercel dashboard and link it to this
   project. Vercel sets `GLOBAL_CONFIG` (read side). For the admin view's write side also
   set `GLOBAL_CONFIG_ID`, `VERCEL_ACCESS_TOKEN` (a token that can edit that store) and,
   for a team, `VERCEL_TEAM_ID`. Without the write variables the admin view is read-only.
2. **Seed the list.** Print the JSON, naming the roles yourself, and paste it as the
   `academy_members` item (`--partner` is for outside partners):
   ```bash
   node --experimental-strip-types scripts/academy-seed-members.mts --owner you@example.com --poc contact@example.com --members "a@example.com,b@example.com" --partner p@example.com
   ```
3. **Private Blob store.**
   ```bash
   vercel blob create-store academy-clips --access private
   ```
   Link it to the project so `BLOB_READ_WRITE_TOKEN` is set.
4. **Upload the clips.** They are no longer in the tree but are in git history. Extract
   them from `main`, then upload each under `academy/videos/<id>.mp4`:
   ```bash
   mkdir -p /tmp/academy-clips && git archive origin/main public/academy/videos | tar -x -C /tmp/academy-clips
   for f in /tmp/academy-clips/public/academy/videos/*.mp4; do
     vercel blob put "$f" --pathname "academy/videos/$(basename "$f")" --access private --content-type video/mp4 --force
   done
   ```
5. **Secrets stay in Vercel.** `ACADEMY_LINK_SECRET` (32+ characters) is already set.
   Optional: `ACADEMY_BASE_URL` (default `https://www.echo1labs.com/academy`). The emailed link
   always uses this value, never the request's Host header. After step 2 works, delete
   `ACADEMY_MEMBERS`; nothing reads it any more.
6. **Hard rate limit.** The in-app limiter (10 per IP and 3 per email per 15 minutes) is in
   memory, per server instance. Add a Vercel Firewall rate-limit rule on
   `POST /academy/sign-in` as the real ceiling.

## Not done, and why

- **Email sender: UNVERIFIED, halted per the brief.** `lib/academy-mailer.ts` is a stub that
  sends nothing. The form, limits and 15-minute link work; no email leaves until a provider
  is chosen and `getMailer()` returns it. Until then, mint links with `scripts/academy-link.mts`.
- **"One-time" links.** The link is short-lived, not single-use: the token is stateless,
  so it can be opened more than once inside its 15 minutes. Single use needs a shared store
  to record used tokens. Global Config is not suited to that write rate.
- **Range requests on private blobs: UNVERIFIED.** The clip route passes `Range` through
  and uses a 206 if the store returns one; otherwise it streams the whole file. Check seeking
  on a preview deployment.
- **The old URLs were public.** The clips and page sat in `public/` and in git history.
  Moving them does not un-share anything already copied, and the history still holds the files.

## Owner password sign-in (optional)

A small "Owner sign in" link under the email form opens a password form for owners only. It is off until `ACADEMY_OWNER_PASSWORD_HASH` is set in Vercel production; with it unset the link is hidden and `/academy/owner-sign-in` returns 404.

- Store only the hash. Generate it from stdin so the password never touches a command line: `printf '%s' "$PW" | node --experimental-strip-types scripts/academy-owner-password.mts`. Keep the password in 1Password.
- Only an email that is an owner on the member list can use it. Every attempt runs the hash check, so timing does not reveal owners.
- Rate limited 5 per 15 minutes per IP and per email, in memory per instance. Add a Vercel Firewall rate-limit rule on `POST /academy/owner-sign-in` as the hard limit.
- To turn it off, remove the env var. To rotate, set a new hash.

## Zoom recording ingest (webhook), slice 1

`POST /hooks/zoom` receives Zoom's `recording.completed` event. It is off (404) until `ZOOM_WEBHOOK_SECRET` is set in Vercel production.

What it does: checks Zoom's signature on the raw body (and refuses anything older than 5 minutes), answers at once, then streams the call's MP4 into private Blob in the background.
- If the meeting topic names exactly one listed person (see aliases below), the file goes to that person's folder as the next free `P##.mp4` and the record is `pending`.
- Otherwise it waits at `academy/ingest/raw/<key>.mp4` as `unassigned`.
- Each call has a record at `academy/ingest/<key>.json` (status, topic, date, length; the Zoom topic is for owners only and is never shown to the person).
- A recording is NOT listed for anyone until an owner adds it to that person's `clips.json`. The approval screen in the admin page is the next slice; until then, approve by hand with the steps above.

Setup (Josh):
1. In the Zoom App Marketplace, create a Webhook Only app (UNVERIFIED: exact app type and menu names; check Zoom's current UI), add the event `recording.completed`, and set the endpoint URL to `https://www.echo1labs.com/hooks/zoom`. Zoom will send an `endpoint.url_validation` challenge, which the route answers once the secret is set.
2. Put the app's Secret Token in 1Password, then set it as the sensitive Vercel env var `ZOOM_WEBHOOK_SECRET` and redeploy.
3. Add the Global Config item `academy_zoom_aliases` as `{ "full name": "email" }` for each person whose calls should match (example: `{"hesham talaat": "hesham.talaat@thedepthgroup.com"}`). Without it every call waits as unassigned.

Limits and checks: the Zoom download token lasts 24 hours, so a failed download must be retried within a day. UNVERIFIED: that a 300 to 800 MB recording streams inside the 300 s function limit; a failure is saved as `failed` in the record. Test with one real recording before relying on it.
