# S3 SEO, AEO and GEO spec for the ten subpages

Written 2026-10-12 to the draft skill `seo-aeo-geo-page-spec` (PR 128). "PEO" in the request was read as AEO, answer engine optimization. Nothing here promises a ranking or a citation. The page copy is the handoff's own sentences; a fact that is not in the handoff or already on the live site is not on a page.

## Slugs and keywords (Semrush US database, read 2026-10-12, 700 API units, Josh approved the spend)

One primary keyword per page; secondary terms are used in the copy. Volume is monthly searches, KD is keyword difficulty. Re-check before launch: volumes move.

| Page | Slug | Primary keyword (volume, KD) | Secondary terms | Replaces (301) |
|---|---|---|---|---|
| Engine | `/automated-lead-generation` | automated lead generation (590, 26) | ai lead generation (2,900, 56), b2b lead generation software (1,600, 50) | `/products/engine` |
| RevOps | `/crm-automation` | crm automation (2,400, 43) | sales pipeline automation (260, 20) | `/products/revops` |
| Broadcast | `/content-marketing-automation` | content marketing automation (590, 35) | social media automation (1,900, 41), brand voice ai (110, 25) | `/products/broadcast` |
| Signal | `/ma-deal-sourcing` | m&a deal sourcing (140, 19) | deal sourcing software (90, 12) | `/products/signal` |
| Ledger | `/month-end-close-automation` | month end close automation (140, 14) | month end close software (170, 20), month end close (880, 36) | `/products/ledger` |
| Titan | `/construction-estimating-software` | construction estimating software (4,400, 38) | construction bidding software (2,400, 40), takeoff software (1,300, 35) | `/products/titan` |
| Prime | `/ai-agent-governance` | ai agent governance (480, 42) | ai governance platform (1,900, 50), human in the loop ai (720, 59) | `/products/prime` |
| AI Readiness | `/ai-readiness-assessment` | ai readiness assessment (1,600, 38) | ai readiness (720, 53), process mapping (5,400, 48) | `/ai-readiness`, `/products/ai-readiness`, `/quiz`, `/ai-readiness-quiz` |
| Info Management | `/document-processing-automation` | document processing automation (590, 31) | intelligent document processing (3,600, 57), document management software (5,400, 55) | none |
| Voice Agents | `/ai-voice-agents` | ai voice agents (1,900, 47) | ai receptionist (6,600, 57), virtual receptionist (5,400, 39) | none |

Rejected on purpose: "ai governance platform" for Prime (it means enterprise compliance, Prime is agent supervision), "document automation software" for Info Management (it means template generation), "lead generation agents" (10 searches a month).

## Per page

Titles get " | Echo 1 Labs" from the root layout template. Descriptions, answer blocks and Q&A are in `lib/subpages.ts`; word and character counts were checked by script (titles 40 to 56 characters with the brand, descriptions 111 to 145, answer blocks 50 to 57 words).

Every page carries:

- A definition block under the hero with a question heading (`What is ... ?`) and a 50 to 57 word direct answer, then a visible "Last updated" date in a `<time>` element that matches `dateModified` in the JSON-LD.
- Three buyer questions with answers (h3 under an h2), mirrored by FAQPage JSON-LD. Google retired the FAQ rich result on 2026-05-07, so the markup is for machine readability only and every question and answer is visible.
- One JSON-LD graph: `WebPage` (with `primaryImageOfPage` and a caption), `BreadcrumbList`, `Service` for the entity, `FAQPage`. No `offers` (pricing is by quote) and no ratings (there are no reviews to show).
- A visible breadcrumb (Home, All Echo 1 Labs products, the page), a link to each of the nine sibling pages with descriptive anchor text, related blog posts, and links to pricing, contact, how it works and about. The validator link matrix is full: every page links to every other page.
- A canonical URL on `https://www.echo1labs.com`, `og:image` with `og:image:alt`, `twitter:image` with alt, and a 1200 by 630 share card per page at `/og/<slug>`.
- One h1 and a clean outline (h1, then h2, then h3 under an h2) on every page. The handoff made the band labels `<p>` lines, so the generator turns them into h2 elements with the same inline style: no visual change.
- Images: the pages have no `<img>`. The hero clip and the SVG artwork are decorative and sit in `aria-hidden` containers (axe reports no image rule failures). The image description for metadata is the share card alt text, set as `og:image:alt`, `twitter:image` alt and the JSON-LD `primaryImageOfPage` caption.

## Site-wide changes made for search

- The canonical host is `https://www.echo1labs.com`. The apex domain answers 308 to `www`, but `SITE_URL` was the apex, so every canonical, sitemap URL and JSON-LD URL pointed at a host that redirects. `lib/site.ts` now uses `www`.
- The sitemap lists the ten new routes with `lastModified` set to the content date (2026-10-12), not the build time. The retired `/products/[slug]` and `/ai-readiness` URLs are not listed because they redirect. `/ai-readiness-assessment` replaced a redirect in the other direction.
- Internal links that pointed at redirected URLs now point at the new routes: the products hub, the lifecycle grid, the home page footer product list (seven links that pointed at `.dc.html` files and went nowhere), the home Front Office card (now `/ai-voice-agents`), the product showcase, the concierge dashboard panel, the chrome destination map and the three `/lp/*` canonicals.
- `/products` now lists the two pages that are not products (voice agents and info management) under "Also from Echo 1 Labs".

## GEO: crawlers and llms.txt (decisions for Josh)

The validator's `--robots` run on the built `robots.txt` shows every AI crawler allowed: search bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot), user-fetch bots (ChatGPT-User, Claude-User, Perplexity-User) and training bots (GPTBot, ClaudeBot, Google-Extended). The recommendation in the skill is to allow the search and user-fetch bots so the pages can be cited. Whether to allow the three training bots is a business decision for Josh; nothing was changed.

`/llms.txt` returns 404. It is a proposal that Google says Search ignores, and none of the OpenAI, Anthropic or Perplexity crawler pages say they read third-party files, so none was added. Say if you want one anyway; it is cheap.

## Backlink plan (a plan only; nothing is published or sent)

| Target type | Page it supports | Why it would link | Asset needed |
|---|---|---|---|
| Owned profiles listed in `sameAs` (the LinkedIn company page exists) | all ten | A profile is the one backlink Echo 1 Labs controls | A line on the profile that names each capability and links its page |
| Industry associations and chapters for the trades the pages use as examples (construction, M&A, finance) | Titan, Signal, Ledger | Members list useful resources | A member-facing summary of the page, from Josh |
| Podcast and webinar guest appearances | Prime, AI Readiness | Show notes link the guest's site | A talking-points page per show, from Josh |
| Original, citable material (a dated note on how the trust ladder works) | Prime and every product page | Other writers cite a specific, dated source | The note, with Josh's approval; no number without a source |

No paid links, no link swaps, no competitor names. Outreach goes through its channel owner with Josh's approval.

## Validator result (draft skill 128, `validate_page.py`, built HTML)

Command: `validate_page.py <10 built pages> --entity "Echo 1 Labs" --site-origin https://www.echo1labs.com --keyword-map keywords.json --robots robots.txt --sitemap sitemap.xml --matrix`. Exit shows findings, not a crash (it read ten files).

| Rule | Count | Reading |
|---|---|---|
| R-KW-H1 (error) | 10 | The h1 is the handoff tagline ("Plan set in. Priced bid out."), not the keyword. Decision for Josh, below. |
| R-ANSWER-LEN, R-KW-ANSWER (warn) | 10 each | The validator reads the first paragraph after the h1, which is the handoff lede (14 to 33 words). The 50 to 57 word definition block with the keyword sits directly under the hero instead. Decision for Josh, below. |
| R-KW-SLUG (warn) | 1 | `m&a deal sourcing` against `ma-deal-sourcing`: the validator does not fold the ampersand. False positive. |
| R-LD-RESTRICTED, R-ROBOTS-AI, R-SITEMAP-IGNORED (notes) | 20 | Informational, described above. |

Everything else passed: unique titles and descriptions in range, one h1, no heading skips, canonical consistent with `og:url`, JSON-LD parses, Open Graph and Twitter tags, internal links, entity spelling, banned vocabulary, footer.

## Decision for Josh: h1 and lede copy

The strongest on-page signal is the h1 and the first paragraph. The handoff wrote both as brand voice. To put the keyword there, with the tagline kept as the second half, the proposals are below. Heights change by one or two lines per page, so the band check would be run again.

| Page | Proposed h1 |
|---|---|
| Engine | Automated lead generation: find the accounts worth chasing. |
| RevOps | CRM automation: every deal moving, every follow-up sent. |
| Broadcast | Content marketing automation that sounds like you. |
| Signal | M&A deal sourcing: find the business worth buying. |
| Ledger | Month end close automation: books closed before month end. |
| Titan | Construction estimating software: plan set in, priced bid out. |
| Prime | AI agent governance: every agent starts supervised. |
| AI Readiness | AI readiness assessment: process first, agents second. |
| Info Management | Document processing automation: paperwork in, records out. |
| Voice Agents | AI voice agents: every call answered. |
