# AI Vendor Playbook

What makes an AI platform's paper different from ordinary SaaS paper, and how Echo 1 Labs handles each point.

## HITL is a liability structure, not a feature description

Every AI-specific protection in the Terms hangs on the Human-in-the-Loop design: Section 4 (what agents may do alone), Section 5 (the customer's supervisory duty, the definition of Human Sign-Off, assumption of risk on bypass), Section 14.4 (AI Output claims capped at product fees only when HITL was followed), Section 15.1 (customer indemnity for bypass), Exhibit A (the guardrail table). If the product ever lets an agent act externally without sign-off, the paper collapses. Review product changes against Exhibit A before they ship.

## AI Output ownership

Assign the vendor's rights in AI Outputs to the customer, conditioned on payment of fees then due and subject to the vendor's retained Platform rights. Disclaim originality and non-infringement of outputs because the model is a third party's and the inputs are the customer's. Route third-party IP claims about outputs through the indemnity section, where they are excluded from the vendor's indemnity.

## Model providers

Name no provider in client-facing copy. State that agents use large language models from third-party providers, that the vendor does not control the models, training data, or updates, and that outputs may be inaccurate or biased. Keep a named subprocessor list for the DPA and for requests. Flow down: no training on customer data (Terms 8.2) must be true of the provider contract as well; confirm the provider's data-use terms before promising it.

## Professional-advice disclaimer

Generic, in capitals, covering legal, financial, accounting, tax, engineering, construction, and other licensed professions, with the customer responsible for independent verification and licensed review where required. Do not name products in the disclaimer; product descriptions drift and a misdescribed disclaimer discredits the section (Finding S9).

## Regulated data

No PHI without an executed BAA; no full payment card numbers or verification data; no data that would pull the vendor into a regime not named in Section 17 unless an Order Form says so. The site's own concierge copy promises a BAA before health data; the Terms must match.

## High-risk uses

Prohibit use in applications where failure could cause death, injury, or severe physical or environmental damage (medical diagnosis or treatment, weapons, critical infrastructure), automated decisions about individuals that violate fair-lending or employment-discrimination law, and attempts to jailbreak or circumvent guardrails. These align with TRAIGA's prohibited-use list and with model providers' usage policies.

## Usage data and training

Separate two things that buyers conflate: (a) aggregated, de-identified usage data to operate, secure, and improve the Platform (allowed, Section 8.5); (b) using identifiable customer data to train or fine-tune a general-purpose model (never without explicit written consent, Section 8.2). State both so neither is implied.

## Automated decision-making disclosures

Texas TRAIGA: no private-sector disclosure duty today; say only that the vendor refrains from prohibited uses and provides any required disclosures. California ADMT (Jan 1 2027): opt-out where ADMT substantially replaces human judgment in a significant decision; the HITL definition of human involvement should mirror the regulation's (reviewer can understand, evaluate, and change the decision). Colorado SB 26-189 (Jan 1 2027): point-of-interaction notice and adverse-outcome explanation for consequential decisions; handle in the Order Form and workflow for any Colorado-facing deployment. GDPR Art. 22: no solely automated significant decisions; HITL is the safeguard.

## Beta and pre-release

Products marked "coming soon" in `lib/products.ts` need a Beta Services clause: evaluation only, may change or be withdrawn, no warranties or service levels, not for Consequential Decisions.

## Exhibit A discipline

The guardrail table is a binding statement of what the Platform does. Tightening a guardrail is allowed at any time; loosening is an amendment with notice. Before publication the owner confirms each row against the live configuration and deletes any aspirational row. Counsel reviews the words; the owner owns the truth of them.
