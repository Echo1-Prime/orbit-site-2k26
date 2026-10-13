# S4 QA report: E1-SITE rebuild

Run 2026-10-12 on `rebuild/s4-qa` (base `origin/dev-from-main` `7f5596b`, PR 34 merged; `origin/main` is still `37744f6`, so none of this is live). Production build served locally with `next start` on 127.0.0.1:3410, driven with the headless Chrome harness and `qa_scan.py` from `origin/main` of `echo1-claude-skills` (draft skill `web-release-qa-gate`, `status: unreviewed`). Paid spend: $0. No `api/**` change. Evidence is in `docs/rebuild/s4/evidence/`.

Decision `recjHMu8joyDQGcSp` (keyword h1) is still Pending, so the ten h1s were left as they are and Step 0 did not run.

## Result by check

| # | Check | Result |
|---|---|---|
| 1 | `tsc --noEmit` | PASS after the build (a first run showed stale `.next` types for the deleted fixture; gone after rebuild). |
| 2 | `next build` | PASS. |
| 3 | Routes, 45 (33 new, 12 retired URLs answering 308 then 200), `/chrome-preview` and `/nope` | PASS. `routes=45 failures=0`; `/chrome-preview` 404; `/nope` 404. `evidence/routes.txt`. |
| 4 | axe 4.14.0, WCAG 2.0, 2.1, 2.2 A and AA tags, 14 routes | Two chrome items FIXED. `color-contrast` is OPEN (design tokens, decision 1). One `label-content-name-mismatch` is OPEN on `/` (a link in `components/UseCaseShowcase`, which E1-MARKETING owns). Table below. |
| 5 | axe `incomplete` items | REVIEWED. All 73 on `/` and all 7 on a subpage compute at 4.5:1 or better against the nearest solid background (script in the run log; it ignores ancestor opacity and overlays, say so). One is the `↓` glyph on the Minimize button, a symbol, not text. |
| 6 | Lighthouse mobile 13.5.0, two runs each | RECORDED, no floor set. Table below. `evidence/lighthouse-mobile.txt`. |
| 7 | Bundle delta against a clean build of `dev-from-main` (route tables, 33 routes) | PASS. Every route +0.0 kB, max growth 0.00% (limit 5%). Only change: `/chrome-preview` (117 kB) removed on purpose. |
| 8 | No horizontal scroll at 375 px, 14 routes | PASS. `scrollWidth` 367 or 375, never over. `evidence/width-375.txt`. |
| 9 | Content scan on the changed files (`qa_scan.py content`) | PASS. 11 files, 0 findings. `R-CLIENT` skipped (Josh 2026-10-12: handoff companies are fictional), as in S3. |
| 10 | `voice-lint` | PASS (`node --experimental-strip-types scripts/voice-lint.ts`; `npm run voice-lint` fails here, `ts-node` is not installed). |
| 11 | Keyboard walk, real Tab keys, 22 stops on `/` and on a subpage | Order is sensible, skip link first, every stop shows an indicator. The indicator is faint on most chrome controls, see decision 3. |

### axe violations, before and after the fix

| Route | Before | After |
|---|---|---|
| `/` | color-contrast 29, label-content-name-mismatch 3 | color-contrast 29, label-content-name-mismatch 1 |
| `/products`, `/contact` | none | none |
| `/pricing` | color-contrast 3 | color-contrast 3 |
| engine, revops, broadcast, signal, ledger, titan, prime, ai-readiness (8 pages) | color-contrast 5 or 6, label-content-name-mismatch 2 | color-contrast 5 or 6 |
| document-processing-automation, ai-voice-agents | label-content-name-mismatch 2 | none |

### Lighthouse mobile (accessibility / best practices / performance / SEO)

| Route | Run 1 | Run 2 |
|---|---|---|
| `/` | 97 / 96 / 89 / 100 | 97 / 100 / 89 / 100 |
| `/automated-lead-generation` | 96 / 96 / 92 / 100 | 96 / 96 / 93 / 100 |
| `/construction-estimating-software` | 96 / 96 / 93 / 100 | 96 / 96 / 78 / 100 |

The best-practices 96 is `errors-in-console`: the Google Analytics and Google Ads collect calls from 127.0.0.1 were refused by this machine's network filter (`ERR_CONNECTION_REFUSED`). That is the test setup, not the site. The 78 is a single run with total blocking time 327 ms against 52 to 88 ms elsewhere; the other run of the same page scored 93. LCP is 3.2 to 4.2 s on every run.

## Fixed in this PR

1. `components/Site/SiteHeader.tsx`: the brand link's name is now "E1 Echo 1 Labs, home". The link shows two SVGs that read "E1" then "Echo 1 Labs"; the old name did not contain that text. A plain space sits between the SVGs (nothing renders there, the link is a flex row), and the name starts with the visible text. Rerun: mismatch gone on all 14 routes.
2. `components/Site/SiteChrome.tsx`: the Agent Orbit launcher's name is now "Agent Orbit, tap to ask, Agent Orbit, tap to ask", which contains the text printed on its ring (the design system default, the phrase twice). Rerun: mismatch gone on all 14 routes. The spoken name is repetitive; see decision 2 for the cleaner fix.
3. Removed the `/chrome-preview` fixture (`app/(site)/chrome-preview/page.tsx`) and its entry in `SITE_CHROME_PATHS` (`components/Concierge/ConciergeMount.tsx`). Nothing else linked to it (grep of `app`, `components`, `lib`). The route now returns 404 on the production build.

## Motion-on pass (headless Chrome, 1440 x 900, motion on)

| Behaviour | Measured | Result |
|---|---|---|
| Hero rotation and progress bars | Slides 0, 1, 2 advance about every 4.5 to 5 s (`SLIDE_MS` 5000); progress animation running | PASS |
| Hero pause button and hover | Pause freezes the slide for 6.5 s and sets the progress animation to paused; label flips to Resume; resume restarts; hover pauses, mouse-out resumes | PASS |
| Brush draw-on | h1 underline clip-path moves from `inset(-80% 108% ...)` to `inset(-80% -8%)` and holds | PASS |
| Lifecycle orbit auto-rotate | Steps at 1.6 s, 5.3 s, 8.9 s (3.6 to 3.7 s apart) | PASS |
| Activity strip | New item at 1.6, 4.8, 8.4, 11.6 s (3.2 to 3.6 s apart; the strip is scrolled into view first, it only runs in view) | PASS |
| Launcher tuck over primary CTAs | `e1-tucked` equals "launcher overlaps a `[data-primary-cta]`" at every 250 px step: at 1440 it tucked once, over the final CTA at 9250 px; at 390 px it never overlapped at that step size; 0 mismatches at both | PASS (phone coverage is coarse) |
| Next-best drawer | With a scroll to 70 percent: not shown at 5 s, shown by 12 s, session key set. With no scroll: not shown at 42 s, shown by 48 s | PASS |
| Reduced motion | One slide, no progress animation, orbit and strip do not advance, brush fully drawn; the only CSS animations are two `ao-pulse` at 0.00001 s (the design system clamp) | PASS |
| Subpage hero clip (engine page) | 1440 motion on: playing, muted, loop. 375 px: paused at 0.5 s, `preload=metadata`. Reduced motion: paused at 0.5 s. Data Saver (emulated by defining `navigator.connection.saveData`): paused at 0.5 s | PASS |

## Concierge

On `/` and on `/automated-lead-generation` the launcher opens the panel (`aria-expanded=true`), a typed question gets an answer ("What does this cost?" returns the pricing answer, an off-topic question returns "I do not know that one... A person at Echo 1 Labs can answer it properly"), the input keeps focus, and Escape closes it. **These answers are scripted**: `components/Site/useConcierge.ts` calls the local `answer()` in `components/Site/chrome-data.ts` (its own comment says "swap it for a service later") and made no request to `/api/concierge/chat`. The old concierge that does call the model is skipped on `/` and the ten pages. Decision 4.

## Decisions needed (Josh)

1. **Text contrast on orange, grey and purple (design tokens).** Measured, none changed:
   - Orange `#FF7515` on white 2.68:1 (the 01, 02, 03 numerals on eight pages and in the governance band on `/`), on `#F5F0FA` 2.39:1 (the line "Institutional AI speeds up the company." on `/`). A same-hue text-safe orange that passes: `#C75200` on white (4.53:1), `#B84B00` on `#F5F0FA` (4.63:1). That is a second orange, which the brand rules forbid, so it needs your call; the alternative is ink-coloured numerals with the orange as a rule or dot. <!-- qa-gate-allow: R-ORANGE -->
   - AGENT badge `#9B5CF6` on `#1B142A` 4.45:1. `#9D60F6` passes (4.61:1).
   - Muted greys on dark: `#616164` on `#1D1D20` 2.72:1 (metric labels), `#545458` on `#0A0A0E` 2.62:1 (alt pills, "Live signals"), `#58585C` on `#101014` 2.68:1 (panel keys, sample notification buttons). Passing values: `#848488`, `#79797D`, `#7B7B7F`.
   - `/pricing` (an older page): white text on the orange "most popular" chip 2.68:1 and grey `#86868E` on `#271F1E` 4.46:1.
2. **Launcher name.** The repetitive spoken name exists because the ring prints the phrase twice. Cleaner: print it once (a wider letter spacing on the ring) and name the button "Ask Agent Orbit". That changes the design system component's look; your call.
3. **Focus ring.** Most chrome controls (skip link, brand, nav links, buttons, launcher) show a 1 px `rgba(255,255,255,0.22)` outline. On the dark bands that is faint; on the white bands it is close to invisible. The showcase links already use a 2 px orange outline. A ring that holds 3:1 on both band colours needs two tones (an orange outline plus a light or dark halo). Not changed.
4. **Concierge on promotion.** Promoting `dev-from-main` puts the scripted concierge on `/` and the ten pages. If the live home currently answers with the model, that is a capability step back. Confirm which you want before S5, or ask for the chrome to call `/api/concierge/chat` (an `api/**`-adjacent change, halt item, its own row).
5. **Carried from S3** (unchanged): keyword h1 (`recjHMu8joyDQGcSp`), "software" in the Titan slug and title, Info Management and Voice Agents on `/products`, AI Readiness facts, AI crawler rules, removal of the old `/products/[slug]` and `/ai-readiness` files.

## Out of this PR's reach

- The home `UseCaseShowcase` link (`aria-labelledby`, `label-content-name-mismatch`) is in `components/UseCaseShowcase`, owned by E1-MARKETING. Not touched.
- The content scan flags the word "tool" six times in the old concierge (`components/Concierge/Concierge.tsx`, `DashboardPanel.tsx`, `Concierge.module.css`). All are code identifiers and comments (`addToolOutput`, `showDashboard tool`), not visible copy, and this PR does not touch them.
- Generated band markup (the orange numerals, the sample panels) comes from the handoff through `scripts/subpages-from-handoff/build_page.py`; changing it is a generator change tied to decision 1.

## Declared deviations

- `scripts/voice-lint.ts` was run with `node --experimental-strip-types` because `ts-node` is not installed in this checkout.
- Lighthouse was run on `/` and two subpages, two runs each, as briefed; the other pages were not run.
- The three-run reference measurement for the handoff band check was not needed (Step 0 did not run).

## Not tested (needs Josh's devices, or a person)

- Safari, in any version; a real phone (touch, the on-screen keyboard over the concierge input, the launcher on a small screen); Data Saver on a real device (emulated only); a screen reader.
- The real `/api/concierge/chat` path on the new routes (not used by this chrome, and a model call is a paid call).
- The content scan carries one suppression: the two proposed text-safe orange values in decision 1 (marked `qa-gate-allow: R-ORANGE`), shown for a decision, not shipped.
- The tuck behaviour on a phone at a finer scroll step than 250 px.
- The deployed preview and the production deployment (this is a local build; no preview was read).
- Rich Results Test and the share cards on live URLs.

Not proven by this gate: the signed-in app, forms, the real CDN cache. Next: Josh decides 1 to 4, then S5 (promote and verify).
