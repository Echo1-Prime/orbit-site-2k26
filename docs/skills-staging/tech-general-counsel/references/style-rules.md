# Style and Build Rules for Legal Documents

## Words

- No em dashes anywhere: code, comments, exports, chat. Use commas, colons, periods, or parentheses.
- Banned vocabulary from the brand rules: AI-enhanced, AI Business-in-a-Box, Flywheel of Death, founder gravity, founder-led, agency, consultancy, tool (as a product descriptor). Legal terms of art are exempt ("agency" in the independent-contractor clause).
- Voice-lint list in `scripts/voice-lint.ts` applies to marketing copy; legal copy may use "comprehensive" or "robust" only where a statute does.
- No vendor names in client-facing clauses. Exception: cookie disclosures name the tag vendor.
- No named individuals. Role mailboxes only.
- Product names only as they appear in `lib/products.ts`. "Bid Titan" never.
- "Business Lifecycle Management" is the category. "AI-driven" is tolerated inside legal descriptors pending a brand pass (Finding S25).

## Structure

- One source: `lib/legal/<document>.ts`. The page and the export both render it. Never edit page copy by hand.
- Constants from `lib/site.ts` (`LEGAL_ENTITY`, `POSTAL_ADDRESS`, `CONTACT_EMAIL`, `PRIVACY_EMAIL`, `SITE_URL`). Never hardcode them in a document.
- Block model in `lib/legal/types.ts`: h3, p (optionally strong), ul, table, callout. Bold stand-alone paragraphs with a caption for anything that must be conspicuous (disclaimers, waivers, assumption of risk).
- Section numbering is stable once published; insert subsections (1.4, 1.5) rather than renumbering, and update the survival list when you do renumber.
- `OPEN_ITEMS` renders as the draft banner. `CHANGES` is the counsel-facing diff log. Keep both current in the same edit as the text.
- `*_IS_DRAFT` controls `noindex` and the banner. The build guard throws if the flag is flipped while a CONFIRM fact is unset. Do not remove the guard.

## Verification before any deploy

1. `npx tsc --noEmit -p tsconfig.json`
2. `npm run export-legal`; copy exports to `VAULTS/Orbit/E1-Global/Legal/` with a dated name.
3. Grep exports and modules for: the predecessor entity, Delaware, vendor names, legal@, the owner's name, em dashes.
4. `npx next build`; confirm the legal routes are static and the shared bundle did not grow more than 5%.
5. `cat .vercel/project.json` and confirm the project name before `vercel deploy --yes` (preview only, never `--prod`).
6. `vercel curl` the deployed route: HTTP 200, `<meta name="robots" content="noindex, follow"/>` while draft, expected strings present, banned strings absent, redirects returning 308.

## Delivery

Preview URL first in the chat reply. Audit report to `docs/legal-out/` and the vault. Airtable Decisions row for any structural change. Next Session Brief in `VAULTS/Orbit/` as the last artifact, naming `/echo1-session-start:session-start E1-SITE` and one clear next task. Disclaimer verbatim at the end of any output carrying legal conclusions. End with the routing line.
