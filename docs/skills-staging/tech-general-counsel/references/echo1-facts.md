# Echo 1 Labs: Verified Facts and CONFIRM Register

Source hierarchy: the owner's live words in session, then the live codebase (`lib/site.ts`, `lib/products.ts`), then a document the owner named. Nothing here came from training data. A fact without a source line is not a fact.

## Entity (verified 2026-09-22, 2026-10-15)

| Field | Value | Source |
|---|---|---|
| Legal name (working) | Echo 1 Labs LLC | Owner, 2026-09-22. CONFIRM spelling against certificate of formation. |
| Entity form | Texas limited liability company, single-member, member-managed | Owner, 2026-09-22 |
| Predecessor | Mingma Inc, Delaware corporation, dissolved. Never appears in any new document. | Owner |
| Mailing address for notices | P.O. Box 23, Meyersville TX 77954 (`POSTAL_ADDRESS`) | Owner, 2026-10-16. A P.O. Box cannot be the Texas registered office (Bus. Orgs. Code 5.201); never label it "registered address". |
| Legal notices, security reports, DMCA, account contact | Legal Counsel, legal@echo1labs.com (`LEGAL_EMAIL`), a role not a person | Owner, 2026-10-16. Mailbox existence unverified. |
| Billing | billing@echo1labs.com (`BILLING_EMAIL`) | Owner, 2026-10-16. Mailbox existence unverified. |
| Privacy and data-rights requests | privacy@echo1labs.com (`PRIVACY_EMAIL`) | Owner, 2026-10-15. Mailbox existence unverified. |
| Website general contact | hello@echo1labs.com (`CONTACT_EMAIL`) | Exists (Workspace account). Not used in legal documents. |
| Named individuals in legal documents | None, ever | Owner, 2026-10-15 |
| Governing law | Texas, without regard to conflict-of-laws principles | Owner |
| Arbitration seat | Victoria, Texas (AAA Commercial Rules) | Owner, 2026-09-22 |
| Court venue | DeWitt County, Texas | Owner, 2026-09-22 |
| Positioning | Business Lifecycle Management; owner-led companies | Owner. Never "founder-led", never "AI-enhanced". |

## Products (verified against `lib/products.ts`, 2026-09-22)

Prime (agentic operations and governance), Engine (go-to-market), RevOps (revenue operations and outbound), Broadcast (content and brand), Signal (deal intelligence), Ledger (financial operations, accounting-system integration), Titan (document intelligence for project and delivery), AI Agent Fleet. AI Readiness is an advisory engagement, not a product route. "Bid Titan" is a retired name and a different brand's product; never use it in Echo 1 Labs documents.

## Site and infrastructure (verified 2026-10-15)

- Repo `~/echo1labs-site/orbit-site-2k26`, Next.js App Router, React 19. Vercel project `orbit-site-2k26` (`prj_ejQUbnhRTF54dy9b3LFx6uKJYzA2`), team `mingagents-projects`.
- Legal routes: `/terms-of-service` and `/privacy`. 308 redirects from `/terms`, `/terms.html`, `/privacy.html`, `/privacy-policy`.
- Tags: Google Tag Manager container loading GA4 and Google Ads, Consent Mode v2 default denied, consent banner in `components/ConsentBanner`, state in `lib/consent.ts`. GPC signal treated as decline since 2026-10-15.
- Orbit concierge: text goes to the AI model provider; voice uses the browser speech service; audio not stored.
- Hosting and processing: AWS (Bedrock, Lambda, Step Functions), Supabase, Vercel, n8n. These names are for the subprocessor list on request and the DPA, never for client-facing copy.

## CONFIRM register (open as of 2026-10-15)

| Key | What is needed | Who | Blocks |
|---|---|---|---|
| entity-name | Filed name on the Texas certificate of formation, character for character. Evidence 2026-10-16: Texas Comptroller franchise-tax search returns no entity for "Echo 1 Labs", "Echo1Labs", or any "Echo 1" variant (five unrelated ECHO 1 entities exist). Gmail (hello@) and Drive hold no certificate. Either the filing is too new for the Comptroller sync or the LLC is not yet filed. | Owner | Production for both documents |
| effective-date | LLC formation date; Effective Date must be that date or later. Same evidence as entity-name. | Owner | Production for both documents |
| ledger-no-funds | Exhibit B Part 6 states Ledger does not initiate payments or move funds. Code scan 2026-10-16 of ~/code found no payment-initiation calls in application code (hits only in skill reference docs). Owner confirms. | Owner | Terms production |
| orbit-no-audio | Exhibit B Part 8 states voice audio is not retained unless Customer enables retention. Code scan 2026-10-16 found no audio persistence in application code; site concierge stores only a teaser flag locally. Owner confirms. | Owner | Terms production |
| privacy-mailbox | privacy@echo1labs.com must exist and route. Gmail (hello@) shows no message ever sent to or from it as of 2026-10-16. | Owner | Both documents |
| exhibit-a-content | Each guardrail row in Terms Exhibit A matches Prime's real configuration | Owner | Terms production |
| security-controls | Privacy Section 8 controls (AES-256, TLS 1.2+, MFA for admin, audit logging, security assessments) are each implemented | Owner | Privacy production |
| retention-schedule | Privacy Section 7 periods match system behavior | Owner | Privacy production |
| insurance-binding | Which of tech E&O, cyber, GL are bound; limits | Owner and broker | Whether dollar limits return to Terms Section 16 and a floor to 14.2 |
| eea-uk | Whether any EEA or UK individuals use the Platform | Owner | Article 27 representative; SCC exhibit |
| counsel-signoff | Texas-licensed attorney review of v1.0-rc Terms and Privacy | Counsel | Production for both |
| dpa | Standalone DPA for enterprise customers | Counsel | Not blocking; Section 17 is self-sufficient |
| prime-signup | Acceptance checkbox in the Prime signup form points at `/terms-of-service` and `/privacy` | Different repo, not yet touched | Platform acceptance flow |

## Airtable

Central Hub `applOslkK8lydfVaW`. Project code `E1-SITE`. Decisions table `tbl5dxI8qBSKJPdEz`. Never invent a project code; read the Projects table (`tbl20rfUmWl5TTPOq`).
