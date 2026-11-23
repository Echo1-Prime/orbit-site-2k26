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

Partner clips use ids `P01`, `P02`, ... and live in their own private Blob folder,
`academy/partner/<id>.mp4`, apart from the internal clips in `academy/videos/`. The id
decides the audience (`lib/academy-clips.ts`). A partner is served `academy-private/partner.html`
instead of the internal page, so internal training text never reaches them, and the clip
routes refuse any internal clip for a partner. To add a partner clip: upload it, then add
its entry to the `CLIPS` list in `partner.html`.
```bash
vercel blob put ./P01.mp4 --pathname academy/partner/P01.mp4 --access private --content-type video/mp4 --force
```
All partners share the same partner folder. Keeping one partner's call recordings from
another partner would need a folder per partner and is not built.

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
