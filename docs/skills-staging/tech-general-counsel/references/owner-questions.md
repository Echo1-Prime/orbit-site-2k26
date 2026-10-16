# The Questions the Owner Is Not Asking (and first-principles answers)

verified: 2026-10-16. Built from the Perplexity and web research logged in `sources.md`. Each question is derived from an invariant, not from a checklist, so it survives product changes.

## The invariants

1. A contract needs a party that exists. Everything else is downstream.
2. A contract needs provable assent. Unproven terms are not terms.
3. A promise you cannot perform is a liability, not a protection.
4. Liability follows control. Whoever controls the act answers for it.
5. Money, data, and content each have their own regulator, regardless of what the contract says.
6. Courts strike one-sided paper. The enforceable maximum is below the theoretical maximum.
7. The best clause in the world is useless if you cannot prove which version the customer saw.

## Q1. Does the LLC exist today?

Invariant 1. The Texas Comptroller shows no Echo 1 Labs entity under any spelling (search 2026-10-16). Until the certificate of formation is in hand, no document can name the party, no bank or payment processor can onboard it correctly, and every acceptance collected is with nobody. Answer: file or produce the certificate. Nothing else on this list matters first.

## Q2. How will we prove a customer accepted which version?

Invariant 2 and 7. Berman v. Freedom Financial (9th Cir. 2022), Meyer v. Uber (2d Cir. 2017), StubHub v. Ball (Tex. App. 2023), and Ambit Marketing v. TLC Energy (Tex. App. 2024) all turn on evidence: the exact screen, the words next to the button, the version accepted, and who had authority to click. Answer: an acceptance ledger (user, tenant, terms version, content hash, UTC timestamp, IP, user agent, screen snapshot id) written at signup and at every re-acceptance, plus a checkbox whose label says that checking it is agreement. Terms 1.6 now states the ledger is the record; engineering must build it before the first customer.

## Q3. Can we actually honor what the documents promise?

Invariant 3. The Terms and Privacy now promise: 72-hour incident notice, 30-day data export, specific security controls, retention periods, no training on client data, subprocessor notice 30 days ahead, audit cooperation, DMCA takedowns, HITL sign-off logs. Each is a representation. Answer: an operational checklist owned by one person, reviewed quarterly, with evidence per line. Delete any line without evidence.

## Q4. Who is the "initiator" when an AI agent calls or texts on a customer's behalf?

Invariant 4. FCC 24-17 (Feb 8 2024) makes AI voices "artificial" under the TCPA; DISH Network (2013) and Dialing Services make a platform liable when it does more than supply neutral infrastructure: choosing numbers, timing, scripts, caller IDs, or continuing after abuse reports. Answer: the product must keep the customer in control of list, script approval, timing, and caller ID; the Terms must say the customer is sender of record; the platform must have an abuse channel and act on it. Exhibit B Part 3 and Part 8 now say this; product design must match.

## Q5. Where are the regulators we never named?

Invariant 5.
- Sales tax: Texas taxes data-processing services at 80 percent of the charge (Rule 3.330); a Texas-based vendor has physical nexus and must register and collect. Answer: sales tax permit before the first invoice; Terms 9 says taxes are added where required.
- Prepaid credits: non-expiring Operations credits are an outstanding obligation; "never expires" removes the expiration defense and does not remove unclaimed-property analysis. Answer: define credits as non-transferable, no cash value, usable only in-platform, and tied to an active account; counsel to confirm escheat posture.
- DMCA: a platform that stores customer content needs a designated agent registered with the Copyright Office ($6, three-year renewal, street address or a P.O. Box waiver request) and a repeat-infringer policy to keep the section 512 safe harbor. Answer: register before Broadcast publishes for anyone but us.
- Section 230 does not cover content the platform's own AI generated. Answer: the customer approves and publishes; the platform does not auto-publish.
- Bot disclosure: California BOT Act, Utah, Maine, Colorado (consequential decisions), California SB 243 (companion chatbots, not us). Answer: AI-interaction disclosure defaults on in voice and chat agents; customers may not turn it off where law requires it.

## Q6. What is the enforceable maximum, not the theoretical maximum?

Invariant 6. 96 percent of signed SaaS agreements cap at 1x fees; unlimited claims appear in 10 percent and cover fraud, gross negligence, willful misconduct. DTPA cannot be waived in a click-through (Tex. Bus. & Com. Code 17.42). Texas voids claims periods under two years (CPRC 16.070). Heckman v. Live Nation (9th Cir. 2024) struck a mass-arbitration protocol that bound absent claimants to bellwether results. Answer: 1x general cap, 3x super-cap, narrow uncapped list, two-year claims period, informal dispute resolution before arbitration, batching without bellwether binding, no retroactive amendments. That is what v1.2-rc carries.

## Q7. Are we exposed in jurisdictions we never meant to sell into?

Invariant 5. GDPR Article 27 requires an in-region representative once we offer services to EEA or UK individuals; the Colorado AI Act (Jan 1 2027) and California ADMT (Jan 1 2027) attach to consequential decisions about residents. Answer: Terms 1.7 now limits the offer to United States businesses until the owner decides otherwise; Order Forms can open a jurisdiction deliberately.

## Q8. What happens when a model provider changes the rules under us?

Invariant 3. Providers deprecate models, change usage policies, and change prices. Our output-ownership and no-training promises are only as good as theirs (Anthropic on Bedrock: customer owns outputs, no training on customer content; AWS 50.10 indemnity covers listed Amazon services, not clearly third-party models). Answer: Terms 3.5 (changes to the Platform) and 7.5 (provider usage policies flow down) added; do not offer a copyright indemnity on outputs we cannot back with a provider's indemnity.

## Q9. Does the entity structure protect the owner, and what undoes it?

Texas BOC 21.223 via 101.002 shields members from the LLC's contract liabilities absent actual fraud for direct personal benefit; a single member is not an alter ego by itself. Formalities still matter as evidence: company agreement, separate accounts, contracts in the LLC's name, documented distributions. Answer: Terms 1.1 now states the LLC is the sole contracting party and no member assumes personal liability; the owner keeps the formalities.

## Q10. Who signs off, and when do we know we are done?

Invariant 6 and 7. "Bulletproof" is not a state; "enforceable, evidenced, and operated" is. Answer: production when (a) the certificate exists and the constants are set, (b) counsel has signed the v1.2-rc package, (c) the acceptance ledger and sign-off log exist in the product, (d) the operational checklist has evidence per line, (e) the owner says promote.
