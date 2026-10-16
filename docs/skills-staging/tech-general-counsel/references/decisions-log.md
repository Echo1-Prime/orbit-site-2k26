# Decisions Log (legal documents)

Settled owner decisions. Each has an Airtable Decisions row in Central Hub `applOslkK8lydfVaW`, table `tbl5dxI8qBSKJPdEz`, project `E1-SITE`. A reviewer does not reopen these; the owner may, in the live turn.

| Date | Decision | Airtable | Status |
|---|---|---|---|
| 2026-09-22 | Arbitration seat Victoria, Texas; court venue DeWitt County; LLC single-member, member-managed; privacy route stays `/privacy`; entity name held under CONFIRM; Terms built as a single-source TS module rendering web and export; preview only | `rec4RCGAoVUzhoe96` | Decided |
| 2026-09-22 | GC audit applied to Terms: 1x general cap, 3x super-cap, narrow uncapped list; insurance dollar limits moved to Order Form until bound; DPA conditional with self-sufficient Section 17; predecessor transition clause; FAA, jury waiver, usury savings, survival, export controls, regulated data | `rec4QfkUhFtAMkG8F` | Pending counsel |
| 2026-10-15 | Address `103 Meyersville Rd, Cuero TX 77954` and `privacy@echo1labs.com` as site constants; owner's name removed from all legal documents; Privacy Policy ported to single source; false analytics claim corrected; GPC honored in code; tech-general-counsel skill drafted | `recEIJFEIx3X7NzCH` | Pending counsel |

## Standing rules derived from these decisions

- Contact routing: legal notices and billing to `CONTACT_EMAIL`; privacy and data-rights to `PRIVACY_EMAIL`. A dedicated legal-notice mailbox remains a recommendation, not a decision.
- Vendor names stay out of client-facing copy; a named subprocessor list is available on request and in a DPA.
- Nothing promotes to production without counsel sign-off, every CONFIRM closed, and the owner's explicit approval in the live session.
- Production branch is `dev-from-main`; no force push; never commit without the owner asking.
