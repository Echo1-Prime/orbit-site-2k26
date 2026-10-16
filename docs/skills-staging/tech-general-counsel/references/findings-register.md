# Findings Register

Every finding raised against Echo 1 Labs legal documents, with its status. A reviewer starting fresh reads this so closed items stay closed and open items get cited, not rediscovered.

Status key: CLOSED (applied in the single-source module), OPEN (needs an owner fact or counsel), WATCH (correct today, re-check on a trigger).

## From the July 2026 compliance audit and insurance review (v1 documents)

| # | Finding | Status | Where resolved |
|---|---|---|---|
| J1 | 72-hour breach notice mislabeled as a TDPSA requirement | CLOSED | Terms 17.3 and Privacy 8 state 72h as a contractual processor-to-controller notice; Texas timelines stated separately |
| J2 | Colorado cited as nonexistent "HB 1468" | CLOSED | Not cited in Terms; Privacy does not cite Colorado. If cited, use SB 26-189, eff. Jan 1 2027 |
| J3 | TRAIGA overstated as mandating risk tiers and documentation | CLOSED | Terms 17.1 row and Privacy 5.3, 10.3 trimmed to prohibited uses and required disclosures |
| J4 | CCPA ADMT phase-in misdated | CLOSED | Jan 1 2027 in both documents |
| J5 | Section 17 to 19 termination cross-references wrong | CLOSED | Renumbered in v2 port |
| J6 | Capitalized terms used but undefined | CLOSED | Definitions table; Human Sign-Off, Subscription Term, Beta Services, Effective Date, Privacy Policy added Sept 2026 |
| J7 | AI Output ownership unallocated | CLOSED | Terms 10.1 |
| J8 | Liability cap has no carve-outs | CLOSED, then restructured (see S3) | Terms 14 |
| J9 | No insurance covenant, additional-insured, waiver of subrogation | CLOSED, then restructured (see S4) | Terms 16 |
| J10 | "No sale or share" claim conflicts with site tags | CLOSED Oct 2026 | Privacy 6, 10.2, 11, 13; consent code honors GPC |
| J11 | Exhibit A and DPA referenced but not attached | PARTIAL | Exhibit A included (content CONFIRM); DPA conditional, Section 17 self-sufficient |
| J12 | No SLA | CLOSED | Terms 18 |

## From the September 2026 GC audit (Terms v1.0 preview)

| # | Finding | Severity | Status |
|---|---|---|---|
| S1 | No effective date; entity name unverified | Critical | OPEN (owner facts) |
| S2 | DPA incorporated by reference does not exist | Critical | CLOSED (conditional DPA, 17.2 processor duties) |
| S3 | Uncapped data-protection, confidentiality, indemnity liability; $1M floor via insurance reference | Critical | CLOSED (1x general, 3x super-cap, narrow uncapped list) |
| S4 | Insurance covenant promises limits not confirmed bound | Critical | CLOSED (limits moved to Order Form); OPEN to restore once bound |
| S5 | Interest "or the maximum rate" ambiguous, no usury savings clause | High | CLOSED (lesser of; savings clause) |
| S6 | No survival clause | High | CLOSED (21) |
| S7 | Predecessor contracts unaddressed | High | CLOSED (1.5 transition and assignment consent) |
| S8 | Arbitration lacks FAA, delegation, jury waiver | High | CLOSED (20.1 to 20.3) |
| S9 | 13.3 names products with mismatched descriptions | High | CLOSED (generic disclaimer) |
| S10 | 17 overstates own TRAIGA obligation | High | CLOSED |
| S11 | No regulated-data exclusion | High | CLOSED (8.4) |
| S12 | No export or sanctions covenant | High | CLOSED (7.2) |
| S13 | Assignment ambiguous as to M&A party | High | CLOSED (mutual successor assignment) |
| S14 to S23 | Definitions, Subscription Term, precedence, notices, AI-output assignment conditioned on payment, Feedback license, usage data, Beta, business-use, waiver and third-party beneficiaries | Medium | CLOSED |
| S24 to S28 | Exhibit A closing line, "AI-driven" descriptor, venue consent, trademark notice, predecessor naming | Low | CLOSED except S25 (brand pass) and S28 (counsel decides whether to name predecessor) |

## From the October 2026 privacy port and KB research

| # | Finding | Severity | Status |
|---|---|---|---|
| O1 | July privacy draft named an individual as EEA/UK contact | High | CLOSED (role mailboxes only) |
| O2 | July privacy draft claimed first-party analytics only and said GPC had no effect; site runs GA4 and Google Ads | Critical | CLOSED (disclosure corrected; GPC honored in code) |
| O3 | Privacy Section 8 security controls are representations not yet confirmed | High | OPEN (owner) |
| O4 | Retention schedule not confirmed against system behavior | Medium | OPEN (owner) |
| O5 | Terms 17.2 lacks GDPR Art. 28(3) audit-and-inspection and DPIA-assistance terms | Medium | OPEN, apply in next rewrite |
| O6 | Privacy 13.2 messaging consent should reflect the FCC revocation rule: any reasonable method, honored within 10 business days | Low | OPEN, apply in next rewrite |
| O7 | Terms 20 jury waiver should sit in its own captioned paragraph to meet the Texas conspicuousness standard (In re Bank of America, Tex. 2009) | Low | WATCH: current rendering is a bold stand-alone paragraph with a caption; confirm the export keeps it that way |
| O8 | 3x super-cap sits above the 2x most common in the 2026 Common Paper benchmark; defensible, but expect pushback from enterprise buyers | Note | WATCH |
| O9 | Insurance requirements appear in only 13% of signed SaaS agreements (Common Paper 2026); moving limits to the Order Form is in line with market | Note | Supports S4 |

## Re-check triggers

- Any entity, address, or contact change: re-run Phase 1 on both documents.
- Any new product route in `lib/products.ts`: update Terms 2 and 3.2 and Privacy 1.
- Any new tag or tracker on the site: update Privacy 6, 13 and the consent code the same day.
- EEA or UK customer: open the Article 27 and SCC items.
- Coverage bound: restore Terms 16 limits and consider a dollar floor in 14.2.
