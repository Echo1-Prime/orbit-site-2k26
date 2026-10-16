# Texas Statutes Digest

verified: 2026-10-15. Secondary sources unless marked. Re-verify after 2027-01-13 or on any legislative session. Full source list in `sources.md`.

## Texas Data Privacy and Security Act (TDPSA), Tex. Bus. & Com. Code ch. 541

- Effective July 1, 2024 (HB 4). Source: Texas AG summary page.
- Applies to persons that conduct business in Texas or produce a product or service consumed by Texas residents and process or sell personal data. No revenue or consumer-count threshold. Small businesses as defined by the SBA are exempt except that selling sensitive data requires consent. GLBA financial institutions, HIPAA covered entities and business associates, nonprofits, state agencies, and higher-education institutions are exempt.
- Consumer rights: confirm and access, correct, delete, portability, opt out of targeted advertising, sale, and profiling in furtherance of decisions with legal or similarly significant effects. Non-discrimination for exercising rights.
- Response: without undue delay and no later than 45 days; one 45-day extension with notice and reason inside the first 45 days. Free twice per year per consumer.
- Appeals: controller must establish a conspicuous appeal process; if denied, must tell the consumer how to complain to the AG. The AG page states no appeal deadline; the July draft's "60 days to respond to appeals" is plausible under sec. 541.053 but **verify in statute** before relying on it.
- Controller-processor contract: required, must bind the processor to the controller's instructions, confidentiality, deletion or return, information to demonstrate compliance, cooperation on assessments, and flow-down of the same obligations to subprocessors (sec. 541.104). Mirrors GDPR Art. 28; see `statutes-gdpr-uk.md`.
- Opt-out preference signals: the Act requires controllers that engage in targeted advertising or sale to honor a universal opt-out mechanism (Global Privacy Control qualifies) from January 1, 2025. The AG page does not address this; the obligation is in the statute (sec. 541.055). **Verify in statute**. Practical rule: if the site runs advertising tags, honor GPC.
- Enforcement: AG only, no private right of action, 30-day cure after written notice, civil penalty up to $7,500 per violation.

How it lands in our documents: Privacy 10.1 (rights and 45-day timeline), 10.2 (targeted-advertising opt-out and GPC), Terms 17.2 (processor duties). The platform is B2B; the site is where TDPSA consumer rights actually bite.

## Texas Responsible Artificial Intelligence Governance Act (TRAIGA), HB 149

- Signed June 22, 2025; effective January 1, 2026. Source: Latham & Watkins alert, June 23, 2025.
- Applies to persons doing business in Texas, producing products or services used by Texas residents, or developing or deploying AI systems in Texas. "AI system" is any machine-based system that infers outputs from inputs.
- Private-sector prohibitions: (1) intentionally encouraging self-harm, harm to others, or crime; (2) developing or deploying with the sole intent to infringe constitutional rights; (3) developing or deploying with intent to unlawfully discriminate against a protected class (disparate impact alone is not intent); (4) sexual content involving minors or unlawful deepfakes, and impersonating a minor in explicit conversation.
- No private-sector consumer disclosure duty survived into the enacted Act (disclosure duties were limited to governmental entities and, per other summaries, health care contexts; **verify** if a health-care use appears). No risk tiers, impact assessments, or documentation mandates for private deployers.
- Enforcement: AG only, 60-day cure, penalties $10,000 to $12,000 per curable violation, $80,000 to $200,000 per uncurable violation, up to $40,000 per day continuing. Affirmative defenses for self-discovered violations through testing, red-teaming, guidelines, or internal review; the NIST AI RMF is referenced for the internal-review defense. Sandbox administered by DIR, 36 months.

How it lands: Terms 17.1 row and Privacy 5.3 and 10.3 say we refrain from prohibited uses and provide any required disclosures. Do not promise governance documentation on request; the Act does not require it and the promise becomes a contract obligation.

## Breach notification, Tex. Bus. & Com. Code sec. 521.053

- Notice to affected individuals: without unreasonable delay and no later than 60 days after determining the breach. Covers any affected individual, not only Texas residents.
- Notice to the Attorney General: as soon as practicable and no later than 30 days, when 250 or more Texas residents are affected (SB 768, effective September 1, 2023). The AG posts notices publicly for up to one year. Source: Davis Wright Tremaine, June 2023.
- 72 hours is the GDPR controller-to-supervisory-authority deadline. In our documents it is a contractual processor-to-controller notice, which is permissible and stricter than Texas law; label it as such every time.

## Usury, Tex. Fin. Code chs. 302, 303, 305

- No agreed rate: 6% legal rate (Tex. Const. art. XVI sec. 11; Fin. Code 302.002).
- Agreed rate: general ceiling 18% per year under the optional rate ceilings in ch. 303, with floating ceilings that can reach 24% and, for commercial loans over $250,000, 28%. Source: Silberman Law Firm, July 2025. The weekly ceiling mechanics in ch. 303 are not reproduced here; a 1.5% per month late charge sits at the 18% line, which is why the clause must read "the lesser of".
- Penalties (ch. 305) include forfeiture of interest, refund of overcharges, and in some cases treble the excess plus attorney's fees. Texas courts recognize usury savings clauses as evidence of intent but do not treat them as a cure for a clearly usurious charge. **Verify** against ch. 305 and current case law before relying on the clause alone.

How it lands: Terms 9, "lesser of 1.5% per month or the maximum rate permitted by applicable law", plus the savings paragraph.

## Electronic transactions, Tex. Bus. & Com. Code ch. 322 (UETA) and 15 U.S.C. ch. 96 (E-SIGN)

Click-through acceptance, electronic signatures, and electronic records are enforceable. Keep the reference in Terms 21. For a negotiated Order Form, capture the signer's authority (Terms 1.3).

## Arbitration and jury waiver

- Federal Arbitration Act, 9 U.S.C. sec. 2, governs an arbitration clause in a contract involving interstate commerce. Naming the FAA avoids Texas Arbitration Act carve-outs (Tex. Civ. Prac. & Rem. Code ch. 171). Delegation of arbitrability to the arbitrator is enforced when clear and unmistakable, and must be specifically challenged to be avoided (Rent-A-Center, West, Inc. v. Jackson, 561 U.S. 63 (2010)).
- Contractual jury waivers are enforceable in Texas when knowing and voluntary (In re Prudential Ins. Co. of Am., 148 S.W.3d 124 (Tex. 2004)). A conspicuous waiver (separately spaced paragraph, bold or underlined caption) is presumed knowing; the resisting party bears the burden (In re Bank of America, N.A. (Tex. 2009)). Source: Winstead alert, April 2009.
- AAA hearing capacity: Cuero has none practical; Victoria (28 miles) is the chosen seat; San Antonio (87 miles) was the alternative.

How it lands: Terms 20.1 names the FAA; 20.2 delegates arbitrability; 20.3 venue and consent to jurisdiction; the class-action and jury waivers are bold, captioned, stand-alone paragraphs.

## LLC name and formation

Tex. Bus. Orgs. Code ch. 5 governs entity names; the recital must match the certificate of formation exactly. Formation date is on the certificate. Both remain CONFIRM items.
