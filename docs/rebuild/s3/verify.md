# S3 verification

Run 2026-10-12 on branch `rebuild/s3-pages` (base `origin/dev-from-main` at 37744f6), production build served locally with `next start` on port 3210. The reference was the handoff served with `python3 -m http.server` on port 3200. PASS or fixed, or listed as open. Evidence files are in `docs/rebuild/s3/evidence/`.

| # | Check | Result |
|---|---|---|
| 1 | `tsc --noEmit` | PASS. First run found duplicate style keys and untyped style constants in the generated files; the generator now keeps the last declaration (CSS cascade order) and types the shared constants. Fixed. |
| 2 | `next build` | PASS (80 static pages; base has 60). First run failed prerender: the design system's NotificationItem attaches click handlers, so the generated bands are client components. Fixed in the generator. |
| 3 | Bundle delta per route against a clean build of `origin/dev-from-main` | PASS. Every existing route is +0.0 kB except `/` at +1.0 kB (+0.63%); limit is 5%. New: `/[slug]` 141 kB, `/og/[slug]` 103 kB. `evidence/bundle-delta.md`. |
| 4 | Every old and new route ends in 200 | PASS. 45 routes, none failing. The eleven retired URLs answer 308 and land on the new route. `evidence/routes.txt`. |
| 5 | Band heights against the rendered handoff, ten pages at 390, 760, 1100 and 1440 | PASS. 148 bands compared, 0 failing, tolerance 8 percent and 24 px; largest band difference 6 px. The reference page rendered differently on some runs (Ledger at 390 gave 763 then 938 px); where a first run failed, the reference was measured three times and the value two or three runs agreed on was used. `evidence/fidelity/compare-*.txt`. |
| 6 | axe-core 4.14.0, WCAG 2.0, 2.1 and 2.2 A and AA tags, ten pages | OPEN. 2 violation types remain, none in the sections added in S3; see "Open findings". `evidence/axe-*.txt`. |
| 7 | No horizontal scroll at 375 px | PASS. `scrollWidth` 367 on all ten pages. `evidence/width-375.txt`. |
| 8 | Hero clips: no audio track, size cap | PASS. `ffprobe` shows `audio_streams=0` on all five clips: engine 0.58 MB, broadcast 1.38 MB, info management 2.35 MB, voice agents 1.00 MB (cap 3 MB), titan 2.42 MB (S2 clip). The handoff originals had an AAC track and two were over 8 MB. |
| 9 | Hero clip states | PASS. No request before hydration. At 375 px, with reduced motion, and with Data Saver logic, the video is `preload="metadata"`, `src` ends `#t=0.5`, not playing. At 1440 px with motion on it autoplays, muted, looping, `aria-hidden`. `evidence/video-states.txt`. Data Saver itself was not emulated (the code path is read from `navigator.connection.saveData`). |
| 10 | Content scan (banned words, em dashes, navy hexes, second orange, hex in JSX, STAT tokens) | PASS. 22 files, 0 findings, `qa_scan.py content` from draft skill 126. The client name rule was skipped on request: the handoff rows use fictional companies (Josh, 2026-10-12). |
| 11 | SEO, AEO, GEO validator on the ten built pages | OPEN, 1 error type and 2 warning types, all copy decisions; see `seo-spec.md`. Fixed on the way: Ledger title lacked the keyword; hero-only pages had no footer. |
| 12 | Heading outline | PASS. h1, h2, h3 in order on all ten pages after the generator turned the band label lines into h2 elements. |
| 13 | Redirect behaviour | PASS. 308 for all eleven retired URLs; `/nope` returns 404. |
| 14 | Lighthouse mobile, Safari, a real phone, Rich Results Test | NOT RUN (S4 scope, or needs your devices). |

## Open findings

1. **Contrast, handoff design.** The numbers 01, 02, 03 in the light bands are Solar Orange on white, 2.68:1 against the 4.5:1 AA minimum (five or six items per page on eight pages). Two design system pieces also fall short: the "AGENT" status badge is 4.45:1, and the buttons in the notification sample panels are 2.68:1. Orange text on a light surface needs a text-safe token, which is a brand decision, so none was changed.
2. **Shared chrome, aria.** `label-content-name-mismatch` on the header brand link ("Echo 1 Labs, home") and the Ask Agent Orbit launcher (two items on every page, the home page included). This is the S1 chrome, outside S3.
3. **Validator.** The h1 and lede decision in `seo-spec.md`.

## Not tested

- A deployed preview (none exists until the pull request opens).
- The concierge on the new routes. It comes from `SiteChrome`, as on the home page, and the old concierge is skipped on these paths; I did not drive a conversation.
- Dark and light OS theme emulation, keyboard order, focus visibility and screen reader output beyond what axe reports.
- Safari and a real phone keyboard.
