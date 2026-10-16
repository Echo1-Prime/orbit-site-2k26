# SaaS Drafting Playbook

Clause patterns Echo 1 Labs uses, with the reasoning, so a reviewer can defend each one to counsel or an enterprise buyer. Market data from the Common Paper 2026 SaaS Contract Benchmark Report (16,140 signed agreements, published July 15, 2026) unless noted.

## Liability structure

Pattern: general cap, super-cap, short uncapped list, consequential-damages exclusion that yields to the uncapped list.

- General cap: fees paid or payable in the 12 months before the event. 96% of signed SaaS agreements cap at 1x fees; a 0.5x cap has fallen to 2.5% of agreements. Do not tie the cap to an insurance limit; that turns a policy number into a contract floor and the July review flagged the cap as "disconnected from any coverage tower".
- Super-cap: 3x the general cap for data-security breach, confidentiality breach, and the vendor's IP indemnity. Market: increased claims appear in 6.9% of agreements (up from 4.1%), with 2x the most common multiple (2.7%) and 5x next (1.7%). Our 3x is above the common band; it is a deliberate choice to show enterprise buyers a real number without an unbounded tail. Replace or supplement with a dollar floor when coverage is bound.
- Uncapped: fraud, gross negligence, willful misconduct (the categories unlimited claims actually cover in 10.2% of agreements), the customer's payment obligations, and the customer's indemnity for HITL bypass and acceptable-use violations. Nothing else. Texas permits exemplary damages only for fraud, malice, or gross negligence (Tex. Civ. Prac. & Rem. Code ch. 41), which is why these stay outside the cap.
- Mutuality: write "each party's" liability. One-sided caps invite unconscionability arguments and slow enterprise procurement.
- Say the limitations are an essential basis of the bargain and apply regardless of the form of action.

## Indemnity

- Customer indemnifies for its data, its violations, HITL bypass, unverified use of AI Outputs, negligence, and willful misconduct.
- Vendor indemnifies for third-party claims that the Platform as provided infringes U.S. IP rights, with the remedy ladder (procure, modify, replace, terminate and refund unused prepaid fees) and the standard exclusions (customer data, AI Outputs, modifications, combinations).
- Procedure clause: prompt notice, sole control of defense, no settlement imposing obligations without consent, cooperation at the indemnitor's expense. Without it the indemnity is a promise with no mechanics.

## Insurance

- Only 13% of signed SaaS agreements contain any insurance requirement (cyber 12%, GL 11%, E&O about 7%). A public covenant with specific limits is unusual and dangerous when unbound: it is a warranty of present fact, breached on execution if untrue.
- Pattern until coverage is bound: "commercially reasonable insurance including technology errors and omissions and cyber liability; certificate on request; limits, additional-insured, waiver of subrogation, and notice of cancellation in the Order Form for enterprise engagements; limits do not cap liability."
- When bound: restore dollar limits matched to the policies, and consider a dollar floor on the super-cap. The July insurance review wanted tech E&O with an affirmative AI endorsement plus media liability, cyber with dependent business interruption, and GL aware of the 2026 ISO generative-AI exclusions (CG 40 47, CG 40 48, CG 35 08).

## Incorporated documents

- Anything "incorporated by reference" must exist on the effective date. If it does not, make it conditional and make the in-document section self-sufficient. Order of precedence: executed DPA for data processing, then Order Form for its subject matter, then Terms, then exhibits; an Order Form may not expand liability beyond the cap unless it says so expressly.
- An exhibit the document itself contains (Exhibit A guardrails) is a representation about product behavior. The owner confirms each row; counsel cannot.

## Fees and interest

"The lesser of 1.5% per month or the maximum rate permitted by applicable law", plus a usury savings paragraph. Taxes: customer pays all except taxes on the vendor's net income. Fee changes with 60 days' notice before renewal. See `statutes-texas.md` for why.

## Dispute resolution

FAA named; 30-day negotiation; AAA Commercial Rules, single arbitrator, seat with real hearing capacity; delegation of arbitrability; carve-out for injunctive relief and IP or confidentiality protection; venue and consent to jurisdiction for the carve-out and for enforcement; class-action waiver and jury waiver as separate, captioned, bold paragraphs (Texas conspicuousness standard). Governing law "without regard to conflict-of-laws principles".

## Term, termination, survival

Subscription Term defined with a default (12 months), auto-renewal with a 30-day non-renewal notice, termination for uncured material breach after 30 days, immediate suspension for HITL bypass, acceptable-use, regulated-data, or legal-compliance reasons, effect of termination (fees due, 30-day export, deletion), refund of unused prepaid fees on the vendor's uncured breach. Survival list by section number; update it whenever sections are renumbered.

## Predecessor transition

When the contracting entity changes, add a transition clause: these Terms supersede prior Platform terms issued by a predecessor; continued use after the Effective Date is acceptance; the customer consents to assignment of any prior agreement and Order Forms to the new entity. Whether to name the predecessor is counsel's call (Finding S28).

## Notices

Email to the role mailbox with a required subject line plus courier or certified mail to the registered address; notice to the customer at the account contact; deemed-receipt rule. Recommend a dedicated legal-notice mailbox; formal notice in a general inbox gets lost.

## Boilerplate that is not optional

Business-use-only statement (reinforces the B2B posture under consumer law), export and sanctions covenant, Beta Services clause when "coming soon" products exist, Feedback as a license (not an ownership claim), trademark notice, waiver, no third-party beneficiaries, severability, independent contractors, force majeure excluding payment, counterparts and e-signatures (UETA, E-SIGN).

## Checklist for a negotiated MSA from a customer

Compare the customer's paper against this playbook clause by clause. Watch for: uncapped vendor liability, indemnity for the customer's own AI use, insurance limits above what is bound, audit rights without notice or frequency limits, data-residency or deletion terms the platform cannot meet, most-favored-customer pricing, broad non-solicitation, and governing law outside Texas without a venue carve-out. Report, do not sign.
