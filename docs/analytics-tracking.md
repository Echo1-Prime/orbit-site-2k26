# Analytics & conversion tracking — the index

Single reference for the tags on echo1labs.com. The site loads **one** Google Tag
Manager container, consent-gated; everything else is configured inside GTM or
deferred. IDs were salvaged from the prior `echo-1-com` site.

## Codes

| Tag | ID | Status on this site |
|---|---|---|
| Google Tag Manager | `GTM-5BDZ45QD` | **Installed** (Echo 1 Labs dedicated). Loaded in `components/Analytics/GoogleTagManager.tsx` via `GTM_ID` in `lib/site.ts`. Manages GA4 + Google Ads inside the GTM UI. |
| Google Ads | `AW-3601628174` | Configured **inside GTM** (Conversion Linker + conversion tags). No repo code. |
| GA4 Measurement ID | `G-XXXXXXXXXX` | **Placeholder** — paste the real ID from GA4 Admin → Data Streams → Web into the GA4 Configuration tag inside GTM. Not stored in the repo. |
| GTM (Mingma, retired) | `GTM-TKHF2XW6` | **Do not use.** Shared Mingma container, retired on the switch to the dedicated container. |
| Meta Pixel | `4022898854649294` | **Deferred.** Still a Mingma-shared pixel — not wired here to keep the brands unblended. Add only after a dedicated Echo 1 pixel exists. |
| Meta domain verification | `4i151jjoe2ruin028igumdwk0qbovd` | Deferred (Mingma-shared). |
| Apollo website tracker | `685da1797405550015b1c58c` | Deferred (Mingma-shared). |
| RevMethods | `cmieqkmr3000213xanyxpliqc` | Deferred (Mingma-shared). |
| LinkedIn Insight | — | **None.** No partner ID has ever been provisioned. Nothing to wire. |

## Consent

Google Consent Mode v2 defaults **all storage denied** (`components/Analytics/GoogleTagManager.tsx`).
The first-visit banner (`components/ConsentBanner/ConsentBanner.tsx`) writes
`{ analytics, marketing }` to `localStorage['echo1labs_cookie_consent']` and calls
`gtag('consent','update', …)` (see `lib/consent.ts`). GA4/Ads store nothing until
the visitor accepts. This is disclosed in the Privacy summary (`/privacy`).

## Conversion events (dataLayer)

Pushed from the site and wired to GTM triggers:

- `/thank-you` (booking confirmation) → `generate_lead` + legacy `conversion`
  (`components/Analytics/LeadConversion.tsx`, `lead_source: 'strategy_session_booking'`).

Outbound links on `/thank-you` also carry first-party UTM params
(`utm_source=thank-you`), independent of the tags above.

## To finish inside GTM (tagmanager.google.com, container GTM-5BDZ45QD)

1. GA4 Configuration tag with the real Measurement ID, on All Pages.
2. Google Ads Conversion Linker on All Pages.
3. Google Ads conversion tags wired to the dataLayer events: `form_submission`,
   `generate_lead`, `booking_click`, `quiz_complete`.

## Deferred

Meta and LinkedIn conversion tracking are intentionally out until Echo 1 Labs has
its own (non-Mingma-shared) pixels. When that happens, add them as tags inside the
GTM container and extend the consent `marketing` category to gate them — no new
site code needed beyond the GTM container already installed.
