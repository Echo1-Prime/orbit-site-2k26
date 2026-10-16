# Web Privacy Playbook

For echo1labs.com and any product app. The rule that produced the biggest correction so far: the policy must describe what the site actually does, and the code must do what the policy says.

## Read the code before the policy

- `lib/site.ts`: GTM container ID and what it manages.
- `components/ConsentBanner/ConsentBanner.tsx` and `lib/consent.ts`: default state (denied until choice), what Accept grants (analytics_storage, ad_storage, ad_user_data, ad_personalization), whether a Global Privacy Control signal is honored.
- `components/Concierge`: where typed messages go, how voice is handled, whether audio is stored.
- Contact and lead forms: fields collected, where they land, any SMS or call opt-in language.

## Cookie disclosure

Name the tag vendor. A visitor cannot act on "analytics cookies" without knowing whose. The no-vendor-names rule is a brand rule for sales copy; a cookie table is a legal disclosure. Four rows are enough: strictly necessary, functional, analytics (consent-gated, vendor named), advertising (consent-gated, vendor named). State the default (off until choice), how to change the choice (clear site cookies), and that no social-media trackers run.

## Opt-out preference signals

If the site runs advertising tags, honor Global Privacy Control: in code (treat the signal as a decline, store it, suppress the banner) and in text (Privacy 10.2, 11, 13). Texas TDPSA requires honoring universal opt-out signals for targeted advertising (verify sec. 541.055); California treats GPC as a valid opt-out of sale or sharing. Never write "GPC has no effect" while an ad tag loads.

## Sale, sharing, targeted advertising

Say "we do not sell personal information" only if true. For advertising cookies, say they may constitute sharing or targeted advertising under some state laws and point to the opt-out. Keep the platform (tenant data) categorically outside advertising.

## Concierge and voice

Disclose that typed messages go to the AI model provider; that voice uses the browser's speech service; that audio is not stored; that the visitor can decline to use the concierge. If the concierge records or transcribes server-side later, this section changes the same day.

## Messaging consent

Prior express written consent before marketing SMS or calls; opt-out by any reasonable method (reply text, email, any clear request), honored within 10 business days across channels; opt-out instructions in every marketing text. See `statutes-us-privacy-ai.md`, TCPA.

## Rights requests

One mailbox (`PRIVACY_EMAIL`), response timelines by regime (Texas and California 45 days extendable, GDPR one month extendable), an appeal path for Texas, and the controller-vs-processor routing sentence for data inside Client Data.

## Security representations

Every control listed (encryption at rest and in transit, MFA for administrative access, audit logging, assessments) is a representation. The July insurance review called them "the answers on a cyber-insurance application". Confirm each with the owner or delete it; never soften one you cannot confirm into vaguer language that still implies it.

## Retention

A table by category with periods the systems actually enforce. If nothing enforces a period, the policy says "in the ordinary course" rather than a number.

## Children, third parties, changes, contact

Standard clauses. Contact table lists role mailboxes and the registered address only.
