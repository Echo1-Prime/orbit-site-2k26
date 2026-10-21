# US Privacy and AI Statutes Digest (outside Texas)

verified: 2026-10-15. Secondary sources unless marked. Full source list in `sources.md`.

## California CCPA/CPRA and the 2025 regulations

- The California Privacy Protection Agency finalized regulations on automated decision-making technology (ADMT), risk assessments, and cybersecurity audits on July 24, 2025. Source: Hunton Andrews Kurth.
- Compliance dates: ADMT obligations January 1, 2027. Risk assessments completed by December 31, 2027, with attestations submitted to the CPPA by April 1 of the following year. Cybersecurity audits phased by annual gross revenue: April 1, 2028 (over $100M), April 1, 2029 ($50M to $100M), April 1, 2030 (under $50M).
- ADMT opt-out applies where ADMT is used for a significant decision and replaces or substantially replaces human judgment. "Human involvement" means reviewers who can understand and evaluate the output, review it, and change the final decision. Our HITL design is exactly that; document it.
- "Sale" and "sharing": sharing means cross-context behavioral advertising. Advertising cookies on a marketing site can be sharing; a consent banner and honored GPC are the opt-out. Sensitive personal information includes account credentials and financial-account information; a right to limit applies unless use is within permitted purposes.
- Online-only businesses with a direct consumer relationship may offer email as the sole request channel (no toll-free number).
- Response: 45 days, extendable by 45 with notice.

How it lands: Privacy 5.4, 11, 13; Terms 17.1 row.

## Colorado: SB 26-189 (repeal and reenactment of SB 24-205)

- Original Colorado AI Act (SB 24-205) was delayed in the August 2025 special session to June 30, 2026, then blocked: on April 27, 2026 a stipulated order in the U.S. District Court for the District of Colorado (xAI v. Colorado, DOJ intervening) paused enforcement pending a preliminary-injunction ruling. Source: McDermott Will & Schulte, May 27, 2026.
- SB 26-189 signed May 14, 2026, repeals and reenacts the Act, effective January 1, 2027. It drops the duty of care against algorithmic discrimination, deployer risk-management programs, impact assessments, and AG reporting. It keeps: point-of-interaction notice for ADMT used in consequential decisions; a plain-language explanation of the ADMT's role within 30 days of an adverse outcome; data correction and human review; developer-to-deployer documentation and update notices. Sources: Hunton (May 22, 2026), McDermott (May 27, 2026).
- Never cite "HB 1468"; it does not exist (July 2026 audit).

How it lands: not cited in current documents. If a Colorado customer uses the Platform for consequential decisions about Colorado residents, add the notice and adverse-outcome explanation to the Order Form and the HITL workflow.

## TCPA and SMS consent

- The FCC's one-to-one consent rule was vacated by the Eleventh Circuit on January 24, 2025 (Insurance Marketing Coalition v. FCC); the 2012 prior-express-written-consent standard remains for marketing texts and calls. Source: Kelley Drye, January 25, 2025.
- Consent revocation rules effective April 11, 2025: consumers may revoke through any reasonable method (reply text, email, voicemail, any clear expression); the business must honor revocation within 10 business days across channels, and every marketing text must carry opt-out instructions. Source: vendor summary (vida.io), 2026; **verify** against the FCC order (CG Docket 02-278) before relying on the day count in a dispute.
- State quiet hours exist (for example Florida 8am to 9pm); not relevant unless outbound SMS campaigns start.

How it lands: Privacy 13.2 should say "any reasonable method" and "within 10 business days", not only "reply STOP".

## Other state AI and privacy laws (watch list, not cited)

Utah AI Policy Act (disclosure on request in regulated occupations), California AB 2013 (training-data transparency for developers, January 1, 2026; Echo 1 Labs is a deployer, not a developer), state comprehensive privacy laws in Virginia, Colorado, Connecticut, Oregon, Montana, Delaware, New Jersey, and others with 45-day response norms similar to Texas. Re-search before citing any of them.
