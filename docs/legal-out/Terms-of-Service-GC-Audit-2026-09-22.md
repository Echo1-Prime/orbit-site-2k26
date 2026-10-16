---
type: audit
date: 2026-09-22
department: legal
project: E1-SITE
status: draft-for-counsel
supersedes: Compliance Audit 2026-07-29 (Terms findings only)
tags: [legal, terms-of-service, ai-governance, saas, texas, v1.0]
---

# LEGAL DOCUMENT AUDIT REPORT

## Document Reviewed

Echo 1 Labs LLC Terms of Service, Version 1.0 draft, as served at the Vercel preview on 2026-09-22 (`/terms-of-service`). Source of truth: `lib/legal/terms-of-service.ts` in `orbit-site-2k26`. Ported from `Echo1Labs_Terms_of_Service_v2.docx` (2026-07-29) with the entity, contact, vendor-name, and venue changes applied that morning. Reviewed as click-through B2B SaaS terms for an AI platform vendor governed by Texas law.

## Executive Summary

The July v2 skeleton is sound for an AI SaaS vendor: the HITL and delegation architecture (Sections 4 and 5), AI Output ownership (10.1), the IP-indemnity remedy ladder (15.2), and the injunctive carve-out from arbitration (20) are all above the market baseline. The draft is not shippable as written for three reasons that have nothing to do with drafting quality: it has no effective date, it incorporates a DPA that does not exist, and Section 14 exposes the company to uncapped data-protection and confidentiality liability while Section 16 promises specific insurance limits nobody has confirmed are bound. A vendor-side general counsel would not let those four clauses go live.

Findings: 4 Critical, 9 High, 10 Medium, 5 Low. All corrections are applied in the v1.0-rc revision of the source module except the two facts only Josh can supply (filed entity name, formation date).

## Critical Findings

**C1. No effective date; entity name unverified.**
Issue: Header reads "Effective date to be confirmed" and the recital name has not been matched to the Texas certificate of formation.
Impact: A click-through agreement with no effective date has an open question about when obligations attach, and an entity-name mismatch is the first argument opposing counsel makes that the LLC is not the party bound.
Fix: Set `effectiveDate` to the formation date or later and set `LEGAL_ENTITY` to the filed name character for character. A build guard now refuses to leave draft mode until both are set.
Basis: Contract formation fundamentals; Tex. Bus. Orgs. Code ch. 101 (LLC name as filed).

**C2. DPA incorporated by reference does not exist.**
Issue: Sections 2, 8.1, 17, and 21 incorporate "the DPA" as a binding document. No DPA has been drafted.
Impact: Incorporation of a nonexistent document is an ambiguity a court resolves against the drafter. It also leaves Section 17's processor obligations without the operative detail the section says lives in the DPA.
Fix: Make the DPA conditional ("if the parties execute a DPA, it is incorporated; absent a DPA, Section 17 governs processing") and make Section 17 self-sufficient at the level of processor duties: process only on instructions, confidentiality, subprocessor flow-down, assistance with rights requests, deletion at end of term, and incident notice.
Basis: Contra proferentem; TDPSA Tex. Bus. & Com. Code sec. 541.104 (controller-processor contract minimums).

**C3. Uncapped liability for data protection, confidentiality, and indemnity.**
Issue: Section 14 lists "breach of confidentiality," "breach of data-protection or data-security obligations," and "either party's indemnification obligations" as Excluded Claims outside any cap. The general cap is "the greater of 12 months' fees or the Section 16 insurance limit," which sets a $1,000,000 floor for a customer paying $4,947 per month.
Impact: For an AI processor of financial and personal data, the single most likely large loss is a data incident. This draft leaves that loss unlimited. The July insurance review asked for super-caps above the general cap, not uncapped exposure.
Fix: General cap equals fees paid in the prior 12 months. Super-cap for data-security breach, confidentiality breach, and Echo 1 Labs's IP indemnity equals three times the general cap. Uncapped only for fraud, gross negligence, willful misconduct, Customer's payment obligations, and Customer's indemnity for HITL bypass and Acceptable Use violations. Remove the insurance-limit reference from the cap formula. Counsel may substitute a dollar floor on the super-cap once coverage is bound.
Basis: Texas enforces negotiated caps between commercial parties; Tex. Civ. Prac. & Rem. Code ch. 41 (exemplary damages require fraud, malice, or gross negligence, which is why those stay uncapped).

**C4. Insurance covenant promises specific limits that may not be bound.**
Issue: Section 16 warrants at least $1,000,000 per claim across four coverage lines, plus additional-insured and waiver-of-subrogation commitments.
Impact: If any line is not bound on the Effective Date, the company is in breach of its own public terms on day one, and the July insurance review flagged that the AI-output line is the hardest to place in 2026.
Fix: Public terms state that Echo 1 Labs maintains commercially reasonable insurance including technology errors and omissions and cyber liability, and will furnish a certificate on written request. Specific limits, additional-insured status, and waiver of subrogation move to the Order Form for enterprise engagements, where they can be matched to bound policies deal by deal.
Basis: Warranty of a present fact; breach on execution if untrue.

## High-Priority Findings

**H1. Interest clause is ambiguous and has no usury savings clause.**
Issue: "1.5% per month (18% annual) or the maximum rate permitted by Texas law."
Impact: "Or" lets a customer argue the higher rate applies; a usurious charge in Texas carries statutory penalties of three times the excess.
Fix: "The lesser of 1.5% per month or the maximum rate permitted by applicable law," plus a savings clause that reforms any excess to the lawful maximum and credits overpayments.
Basis: Tex. Fin. Code secs. 302.002, 303.009, 305.001.

**H2. No survival clause.**
Issue: Nothing states which provisions survive termination.
Impact: Confidentiality, indemnity, limitation of liability, and dispute resolution can be argued to die with the agreement.
Fix: Section 21 survival list added.
Basis: Standard drafting; Texas courts enforce express survival.

**H3. Predecessor contracts unaddressed.**
Issue: Customers who accepted terms issued by the predecessor entity accepted with a different party. The draft is silent.
Impact: Continuity of those relationships is an assignment or re-acceptance question. Silence invites the argument that no agreement governs a legacy customer.
Fix: Section 1.5 Transition: these Terms replace any prior Platform terms issued by a predecessor entity; continued use after the Effective Date is acceptance; Customer consents to assignment of any prior agreement to Echo 1 Labs LLC.
Basis: Assignment and novation principles; Texas UETA for electronic assent.

**H4. Arbitration clause lacks FAA designation, jury waiver, and delegation.**
Issue: Section 20 names AAA Commercial Rules and a seat but does not invoke the Federal Arbitration Act, does not waive jury trial if arbitration fails, and does not delegate arbitrability.
Impact: Texas Arbitration Act carve-outs and enforceability fights over who decides scope.
Fix: FAA governs; delegation of arbitrability to the arbitrator; mutual jury waiver as fallback; conflict-of-laws exclusion added to governing law.
Basis: 9 U.S.C. sec. 2; Tex. Civ. Prac. & Rem. Code ch. 171; Rent-A-Center v. Jackson (delegation).

**H5. Section 13.3 disclaimer names products with mismatched descriptions.**
Issue: "TITAN OUTPUTS ARE NOT THE DETERMINATIONS OF A LICENSED ENGINEER" was written for the retired construction-estimating product. Titan is now described as document intelligence for project and delivery management.
Impact: A disclaimer that misdescribes the product weakens the whole section's credibility.
Fix: Generic professional-advice disclaimer covering financial, accounting, tax, legal, engineering, and construction outputs across all products.

**H6. Section 17 overstates the company's own TRAIGA obligation.**
Issue: "Maintain AI governance documentation and safeguards" is presented as a TRAIGA obligation. The July audit confirmed TRAIGA (HB 149) imposes no such documentation mandate on deployers.
Impact: A self-imposed contractual obligation the company may not be performing.
Fix: Row trimmed to what the statute requires: refrain from prohibited uses and provide required disclosures.
Basis: Tex. Bus. & Com. Code ch. 551 (HB 149, eff. Jan 1, 2026).

**H7. No regulated-data exclusion.**
Issue: Nothing prohibits customers from loading protected health information or payment card data.
Impact: A single customer uploading PHI without a BAA creates HIPAA exposure the terms did nothing to prevent. The site's own concierge copy says a BAA is executed before health data is involved; the terms should match.
Fix: Section 8.4: no PHI without an executed BAA; no full payment card numbers; no data the Customer lacks rights to process.
Basis: 45 C.F.R. sec. 164.502(e); PCI DSS scope.

**H8. No export-control or sanctions covenant.**
Issue: An AI platform with model access has no export or sanctioned-party restriction.
Impact: Standard for any U.S. software vendor; absence is a diligence red flag for enterprise buyers.
Fix: Section 7.2 added.
Basis: EAR 15 C.F.R. parts 730-774; OFAC 31 C.F.R. ch. V.

**H9. Assignment clause is ambiguous as to which party may assign in M&A.**
Issue: "Customer may not assign without consent; assignment is permitted for mergers or acquisitions with 30 days' notice."
Impact: Unclear whether the M&A exception is Customer's, the company's, or both.
Fix: Mutual: either party may assign to a successor in a merger, acquisition, or sale of substantially all assets on written notice; otherwise consent required.

## Medium-Priority Findings

**M1.** "Human Sign-Off" is used as a defined term from Section 4 but defined in 5.2. Added to the Definitions table.
**M2.** "Subscription Term" and "Initial Term" are undefined; Section 19 assumes annual. Defined: as stated in the Order Form, default 12 months.
**M3.** No order of precedence between Order Form, Terms, DPA, and Exhibit A. Added to Section 21; an Order Form may not expand Echo 1 Labs's liability beyond Section 14 unless it says so expressly.
**M4.** No notices mechanics. Section 22 now states how legal notice is given and when deemed received. Recommendation stands: route formal notice to a dedicated legal address rather than the general inbox.
**M5.** Section 10.1 assigns AI Outputs unconditionally. Conditioned on payment of fees then due.
**M6.** Feedback clause asserts free use without a license grant. Restated as a perpetual, irrevocable, royalty-free license.
**M7.** No de-identified usage-data right. Added Section 8.5 (aggregated, de-identified data for operating and improving the Platform), which does not disturb 8.2's no-training covenant on Client Data.
**M8.** No Beta or pre-release terms although the live product set carries "coming soon" items. Section 3.4 added.
**M9.** No business-use statement. Section 1.4 added; reinforces the B2B posture under Texas consumer law.
**M10.** No waiver or third-party-beneficiary clauses. Added to Section 21.

## Low-Priority Findings

**L1.** Exhibit A closed with "to be finalized with counsel and product owners before publication." Replaced with a change-control sentence; the table content itself is a product-owner confirmation item.
**L2.** Section 3.1 retains "AI-driven" descriptor; brand voice pass recommended, no legal effect.
**L3.** Section 20 "Venue for any such court proceeding" now also states consent to personal jurisdiction.
**L4.** Trademark notice added to Section 10.
**L5.** Version note references a predecessor entity without naming it. Counsel to decide whether to name it in 1.5.

## Compliance Status Matrix

| Requirement | Status in v1.0 preview | Status in v1.0-rc |
|---|---|---|
| Correct legal entity name, consistent throughout | FAIL (unverified) | BLOCKED on certificate |
| Effective date | FAIL | BLOCKED on formation date |
| Tex. Fin. Code ch. 302-305 (usury) | FAIL (ambiguous rate, no savings clause) | PASS |
| Tex. Bus. & Com. Code ch. 322 (UETA) | PASS | PASS |
| FAA / Tex. CPRC ch. 171 (arbitration) | PARTIAL | PASS |
| TDPSA sec. 541.104 processor terms | FAIL (delegated to nonexistent DPA) | PASS (Section 17 self-sufficient) |
| TRAIGA described to actual scope | PARTIAL | PASS |
| Texas breach notice (60 days individuals, 30 days AG) not misattributed | PASS (72h is contractual processor notice) | PASS |
| CCPA ADMT phase-in Jan 1 2027 | PASS | PASS |
| Colorado cite (SB 24-205 as amended by SB 189) | N/A in Terms | N/A |
| No vendor names in client-facing copy | PASS | PASS |
| No pricing tiers | PASS | PASS |
| No consulting framing | PASS | PASS |
| Liability cap enforceable and bounded | FAIL | PASS |
| Insurance covenant matches bound coverage | FAIL (unconfirmed) | PASS (limits moved to Order Form) |
| Survival | FAIL | PASS |
| Export / sanctions | FAIL | PASS |
| Regulated data exclusion | FAIL | PASS |
| DPA and Exhibit A exist | FAIL / PARTIAL | DPA conditional; Exhibit A included, content to confirm |

## Recommendations

1. Josh: read the filed name off the certificate of formation and the formation date; set both constants. Nothing else blocks the build gate.
2. Josh: confirm the Exhibit A guardrail table matches how Prime is actually configured. If a row is aspirational, delete it before launch.
3. Josh: decide whether to bind tech E&O and cyber before launch. If bound, counsel may restore dollar limits to Section 16 and a dollar floor to the Section 14 super-cap.
4. Texas-licensed counsel: review v1.0-rc, with attention to Sections 1.5, 14, 16, 17, and 20. Turnaround should be short; the structure is conventional.
5. Then flip `TERMS_IS_DRAFT` to false, remove the draft banner, commit on `dev-from-main`, and promote.

> **DISCLAIMER**: This analysis is provided for informational purposes and does not constitute legal advice. While this review applies expertise in technology transactions, AI governance, and Texas commercial law, it does not substitute for review by a licensed attorney in Texas. Have a Texas-licensed attorney review all contract language before the Terms are published or accepted by any customer.
