# Acceptance Ledger and Sign-Off Log: Engineering Spec v1

Status: required before the first customer accepts the Terms. Owner: engineering. Legal basis: Terms 1.6 (Record of Acceptance), 5.2 and 5.3 (Human Sign-Off), 14.4 (AI Output claims), Exhibit A. Case law: Berman v. Freedom Financial (9th Cir. 2022), Meyer v. Uber (2d Cir. 2017), StubHub v. Ball (Tex. App. 2023), Ambit Marketing v. TLC Energy (Tex. App. 2024).

## 1. Why

Courts enforce online terms when the company can prove the exact screen, the words next to the button, the version accepted, and who had authority. Without a ledger, every other clause is argument. Separately, the assumption-of-risk defense in Section 5.3 only works if the product can show which outputs received Human Sign-Off, by whom, and when.

## 2. Acceptance screen (UI contract)

- A checkbox, unchecked by default, whose label reads: "I have read and agree to the Terms of Service and Privacy Policy on behalf of [Company]." The two document names are links that open the current version in a new tab.
- The Continue or Create account button is disabled until the box is checked.
- The label, links, and button sit together above the fold on desktop and mobile; no scrolling between them.
- Re-acceptance is required when a new Terms version is published with material changes (Section 21): the same screen, shown at next sign-in, with the version and effective date visible.

## 3. Ledger table (Supabase, `legal_acceptances`)

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| tenant_id | uuid | the Customer |
| user_id | uuid | the Authorized User who clicked |
| user_email | text | as of acceptance |
| document | text | `terms-of-service` or `privacy-policy` |
| version | text | from `TERMS_META.version` |
| content_hash | text | SHA-256 of the rendered Markdown export of that version |
| accepted_at | timestamptz | UTC |
| ip_address | inet | |
| user_agent | text | |
| screen_snapshot_id | text | reference to a stored render of the acceptance screen for that version |
| method | text | `signup`, `re-acceptance`, `order-form` |
| authority_attestation | boolean | the user checked the authority statement |

Rows are insert-only. Row-level security: tenant can read its own rows; nobody can update or delete. Retain for the Subscription Term plus six years.

## 4. Version publication

On every release of `lib/legal/*.ts`: run `npm run export-legal`, compute SHA-256 of each export, store a row in `legal_versions` (document, version, content_hash, effective_date, published_at, export_path), and store the rendered acceptance-screen snapshot. The ledger's `content_hash` must match a `legal_versions` row.

## 5. Sign-off log (`hitl_signoffs`)

| Column | Type | Notes |
|---|---|---|
| id | uuid | |
| tenant_id | uuid | |
| user_id | uuid | the Authorized User who signed off |
| output_id | uuid | the AI Output or agent action |
| action_class | text | matches an Exhibit A row |
| decision | text | `approved`, `modified`, `rejected` |
| decided_at | timestamptz | |
| output_hash | text | hash of the output as reviewed |
| guardrail_version | text | Exhibit A version in force |

Insert-only, same RLS, same retention. An external send, financial action, filing, or onboarding (Exhibit A prohibited-without-sign-off rows) must reference a `hitl_signoffs` row with `decision = approved` or it does not execute.

## 6. Evidence pack

A one-command export (`npm run legal-evidence -- --tenant <id>`) that produces, for a tenant: all acceptance rows, the matching version rows, the screen snapshots, and the sign-off rows for a date range. This is what counsel hands a court.

> This specification supports legal defensibility and is not legal advice. Counsel should confirm the retention period and the attestation language.
