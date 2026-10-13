# subpages-from-handoff

`build_page.py` regenerates the ten product subpage band components from the design handoff templates
(`Echo 1 Labs <Page>.dc.html`):

    python3 -I scripts/subpages-from-handoff/build_page.py <repo root> [handoff reference dir]

Output: `components/Subpages/generated/<Name>Bands.tsx` (one per page) and `subpages.module.css` (hover and focus
rules, only when a page has any). It converts the bands and the footer nested in the last band; the header is
replaced by the site chrome. The pages bind four names only (`vid`, `badgeFill`, `act`, `start`); any other
binding, any `sc-if` or `sc-for`, an unmapped link or an unmapped design system component stops the run with
exit 2. The design system button becomes a real link (`components/Subpages/CtaLink.tsx`) so the call to action is
crawlable, and each band's eyebrow line becomes an h2 so the heading outline has no gap.

Slugs repeat the ones in `lib/subpage-routes.ts`; keep them equal. Copy for search (titles, descriptions, the
definition block, buyer questions, links) is in `lib/subpages.ts`, not in the generated files.

The home page has its own generator, `scripts/home-from-handoff/build_home.py`.
