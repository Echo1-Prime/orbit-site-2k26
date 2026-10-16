// Single source of truth for the Echo 1 Labs Privacy Policy.
// Rendered by app/(marketing)/privacy/page.tsx (web) and
// scripts/export-legal.ts (Markdown export). Edit here only.
//
// Provenance: ported from Echo1Labs_Privacy_Policy_v2.docx (2026-07-29,
// docs/legal-src/) on 2026-10-15, merged with the site's prior plain-language
// privacy summary (Orbit concierge, cookies, messaging consent), and corrected
// where the July draft contradicted how echo1labs.com actually works. Every
// deviation is listed in PRIVACY_CHANGES.
//
// PRODUCTION GATE: same two facts as the Terms (filed entity name, formation
// date). See lib/legal/terms-of-service.ts.

import { LEGAL_EMAIL, LEGAL_ENTITY, POSTAL_ADDRESS, PRIVACY_EMAIL, SITE_URL } from '@/lib/site';
import type { LegalSection, OpenItem } from './types';

/** Set false only after OPEN_ITEMS are closed, counsel has signed off, and the owner approves. */
export const PRIVACY_IS_DRAFT = true;

/** CONFIRM: formation date or later, ISO format YYYY-MM-DD. */
const EFFECTIVE_DATE: string = 'CONFIRM';

export const PRIVACY_META = {
  title: 'Privacy Policy',
  version: '1.0',
  effectiveDate: EFFECTIVE_DATE,
  entity: LEGAL_ENTITY,
  address: POSTAL_ADDRESS,
  privacyEmail: PRIVACY_EMAIL,
  contactEmail: LEGAL_EMAIL,
  termsUrl: `${SITE_URL}/terms-of-service`,
  versionNote:
    'Version 1.0 is the first edition issued by ' +
    LEGAL_ENTITY +
    '. Prior privacy notices for the Platform were issued by a predecessor entity and are superseded.',
} as const;

export const PRIVACY_OPEN_ITEMS: OpenItem[] = [
  {
    key: 'entity-name',
    status: 'CONFIRM',
    note: 'Filed name on the Texas certificate of formation must match "' + LEGAL_ENTITY + '" character for character. Evidence 2026-10-16: SOS file 0806419373 is of record as TRILOGY 583 LLC; the renaming amendment signed 2026-07-27 is not yet on file.',
  },
  {
    key: 'effective-date',
    status: 'CONFIRM',
    note: 'Effective Date must be the LLC formation date or later.',
  },
  {
    key: 'security-controls',
    status: 'CONFIRM',
    note: 'Section 8 states specific controls (AES-256 at rest, TLS 1.2+, MFA for administrative access, audit logging, security assessments). Each is a representation. Confirm each is implemented or delete it.',
  },
  {
    key: 'retention-schedule',
    status: 'CONFIRM',
    note: 'Section 7 retention periods are carried from the July draft. Confirm they match actual system behavior.',
  },
  {
    key: 'eea-uk',
    status: 'COUNSEL',
    note: 'Whether any EEA or UK individuals use the Platform. If yes, a GDPR Article 27 representative may be required before offering service there.',
  },
  {
    key: 'counsel-signoff',
    status: 'COUNSEL',
    note: 'Texas-licensed attorney review, with attention to Sections 6, 10.2, and 13 (advertising cookies and opt-out treatment).',
  },
];

/** Every deviation from Echo1Labs_Privacy_Policy_v2.docx (2026-07-29), for counsel. */
export const PRIVACY_CHANGES: string[] = [
  'Controller: "Mingma Inc, doing business as Echo 1 Labs" replaced with "' + LEGAL_ENTITY + '" throughout. Address set to ' + POSTAL_ADDRESS + '.',
  'Named individual removed. The July draft listed a named EEA/UK contact with a personal mailbox; privacy requests route to ' + PRIVACY_EMAIL + ' and legal notices to Legal Counsel at ' + LEGAL_EMAIL + ' (owner decision 2026-10-16).',
  'Version reset from 2.0 to 1.0 with a predecessor note. Effective Date gated on formation date.',
  'Product names aligned to the live product set (Section 1).',
  'Vendor names replaced with service categories in Sections 2, 6.1, and 15. Google Tag Manager, Google Analytics, and Google Ads remain named in Section 13 because a visitor cannot act on a cookie disclosure that hides the vendor.',
  'CORRECTED a false statement. The July draft said Echo 1 Labs runs first-party analytics only, conducts no targeted advertising, and that Global Privacy Control has no effect. echo1labs.com loads Google Analytics and Google Ads through Google Tag Manager behind a consent banner. Sections 6, 10.2, 11, and 13 now disclose this, and the site now treats a Global Privacy Control signal as a decline.',
  'Section 2.5 added: website and Orbit concierge (text and voice), carried from the prior site privacy summary.',
  'Section 13.2 added: messaging consent (SMS and calls), carried from the prior site privacy summary.',
  'Section 13.2 (2026-10-15): restated to the current federal standard: prior express written consent, opt-out by any reasonable method, honored within 10 business days.',
  'Section 5.3 and 10.3: TRAIGA described to statutory scope; the self-imposed "we maintain AI governance documentation available on request" commitment removed, consistent with the Terms.',
  'Section 1 and 6.1: DPA made conditional (incorporated if executed), consistent with Terms Section 17.4.',
  'Punctuation only: em dashes replaced. No wording changed by that pass.',
  'Not changed in substance: Sections 3, 4, 5.1, 5.2, 5.4, 6.2, 6.3, 7, 8, 9, 11 (rights list), 12 (rights list), 14, 16.',
];

const E = 'Echo 1 Labs';

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    number: '01',
    title: 'Introduction and Scope',
    id: 'scope',
    blocks: [
      {
        type: 'p',
        text: `This Privacy Policy ("Policy") describes how ${LEGAL_ENTITY} ("${E}," "we," "us," or "our"), collects, uses, discloses, retains, and protects information in connection with the ${E} AI-driven business lifecycle management platform, including Prime, Engine, RevOps, Broadcast, Signal, Ledger, Titan, all APIs, and related websites and services, including echo1labs.com (collectively, the "Platform").`,
      },
      {
        type: 'p',
        text: `This Policy applies to Customers (businesses and their Authorized Users), prospective customers and website visitors, and third parties whose personal data is included in Client Data submitted by a Customer. ${E} acts as a data processor for Client Data and as a data controller for information it collects directly from Customers and website visitors. Capitalized terms not defined here have the meaning given in our Terms of Service at ${PRIVACY_META.termsUrl}.`,
      },
      {
        type: 'p',
        text: `Requests about Client Data. Where an individual's personal data is contained in Client Data that a Customer submitted, ${E} is a processor acting on that Customer's instructions. We will forward such rights requests to the relevant Customer (the controller), who is responsible for responding. Our processing of Client Data is governed by Section 17 of the Terms of Service and, if the parties have executed one, a Data Processing Addendum ("DPA").`,
      },
      {
        type: 'p',
        text: 'This Policy does not apply to information governed by a separately executed master agreement to the extent that agreement states otherwise, or to information collected by third-party services that Customers independently access.',
      },
    ],
  },
  {
    number: '02',
    title: 'Information We Collect',
    id: 'collection',
    blocks: [
      { type: 'h3', text: '2.1 Information You Provide Directly' },
      {
        type: 'ul',
        items: [
          'Identity: name, job title, company name, and professional role.',
          'Contact: business email, phone number, and mailing address.',
          'Account credentials: username and hashed password.',
          `Billing: company billing address and payment method. Full card numbers are processed by our third-party payment processor and are not stored by ${E}.`,
          `Communications: support tickets, emails, chat, and call records with ${E}.`,
          'Intake data: business information submitted through intake forms and the website contact form.',
        ],
      },
      { type: 'h3', text: '2.2 Client Data Submitted to the Platform' },
      {
        type: 'p',
        text: `Customers submit Client Data for AI Agent processing. This may include financial data (accounting records, profit and loss statements, balance sheets), business data (customer lists, pricing, strategies), personnel and organizational data, and data from third-party integrations the Customer connects (accounting, messaging, CRM, and data platforms). ${E} processes Client Data as a data processor on the Customer's documented instructions.`,
      },
      { type: 'h3', text: '2.3 Automatically Collected Information' },
      {
        type: 'ul',
        items: [
          'Device and technical: IP address, browser type, operating system, device identifiers, referral URLs.',
          'Usage data: pages visited, features accessed, time spent, API request metadata.',
          'Performance: error logs, diagnostics, and system telemetry.',
          'Cookies and similar technologies: as described in Section 13.',
        ],
      },
      { type: 'h3', text: '2.4 From Third-Party Integrations' },
      {
        type: 'p',
        text: 'When you connect a third-party service to the Platform, we receive the data authorized by your integration configuration. We process this data solely to provide the integrated functionality.',
      },
      { type: 'h3', text: '2.5 Website and the Orbit Concierge' },
      {
        type: 'p',
        text: `Orbit is an AI concierge on echo1labs.com. If you type, your messages are sent to our AI model provider to generate a response. If you choose voice, your browser's speech service converts your speech to text so Orbit can respond; ${E} does not store your microphone audio. You can browse the site without using Orbit at all, and switch to text at any time. If you submit the contact form or ask Orbit to have someone follow up, we collect the details you provide (such as name, email, company, and message) to respond to you.`,
      },
    ],
  },
  {
    number: '03',
    title: 'Lawful Bases for Processing',
    id: 'lawful-bases',
    blocks: [
      { type: 'p', text: 'Where the GDPR or UK GDPR applies, we rely on the following lawful bases:' },
      {
        type: 'table',
        head: ['Processing Activity', 'Lawful Basis'],
        rows: [
          ['Providing the Platform and fulfilling our contract', 'Performance of contract'],
          ['Billing and payment processing', 'Performance of contract; legal obligation'],
          ['Platform security and fraud prevention', 'Legitimate interests; legal obligation'],
          ['Product improvement (aggregated, de-identified only)', 'Legitimate interests'],
          ['Marketing to prospects', 'Legitimate interests or consent (with opt-out)'],
          ['Website analytics and advertising measurement', 'Consent'],
          ['Legal compliance', 'Legal obligation (GDPR Art. 6(1)(c))'],
          ['Processing Client Data on Customer instructions', `Data processor: the Customer's lawful basis applies`],
        ],
      },
    ],
  },
  {
    number: '04',
    title: 'How We Use Your Information',
    id: 'use',
    blocks: [
      {
        type: 'ul',
        items: [
          'Delivering the Platform: operating, maintaining, and improving all products and AI Agent capabilities.',
          'Account administration: managing subscriptions, user accounts, payments, and transactional notices.',
          'AI Agent operations: transmitting Client Data to AI model providers as necessary to generate AI Outputs.',
          'Customer support: responding to inquiries, troubleshooting, and Platform communications.',
          'Security: detecting and preventing unauthorized access, fraud, and security incidents.',
          'Product development: improving Platform features using aggregated, de-identified usage data only (no identifiable Client Data without consent).',
          'Legal compliance: fulfilling legal obligations, responding to lawful government requests, and enforcing our Terms of Service.',
          'Marketing: promotional communications to prospects and, where permitted, existing Customers (opt-out always available), and measuring the performance of our advertising where you have consented to advertising cookies.',
        ],
      },
    ],
  },
  {
    number: '05',
    title: 'AI Processing Disclosure and Automated Decision-Making',
    id: 'ai-processing',
    blocks: [
      { type: 'h3', text: '5.1 AI-Assisted Processing' },
      {
        type: 'p',
        text: 'The Platform uses AI, including large language models (LLMs) from third parties, to process Client Data and generate AI Outputs for analysis and synthesis of financial and business data, research, drafting for human review, workflow orchestration, and generation of recommendations and insights.',
      },
      { type: 'h3', text: '5.2 Human-in-the-Loop Requirement' },
      {
        type: 'p',
        text: 'All AI Outputs that could constitute a Consequential Decision are subject to mandatory human review and sign-off before taking effect. No AI Agent makes final, legally significant decisions about individuals solely by automated means without a human checkpoint. Accuracy disclaimers are also surfaced in-product at the point an AI Output is generated, not only in this Policy.',
      },
      { type: 'h3', text: '5.3 Texas TRAIGA' },
      {
        type: 'p',
        text: `The Texas Responsible Artificial Intelligence Governance Act (HB 149, effective January 1, 2026) restricts certain uses of AI, such as intentional manipulation and unlawful discrimination. ${E} does not use AI for those prohibited purposes and provides the disclosures the Act requires.`,
      },
      { type: 'h3', text: '5.4 GDPR Art. 22 and CCPA ADMT' },
      {
        type: 'p',
        text: `The Platform does not make decisions producing legal or similarly significant effects on individuals solely through automated processing without a human checkpoint, consistent with GDPR Article 22. California's CCPA automated decision-making technology (ADMT) regulations phase in from January 1, 2027; we will comply with those obligations as they take effect to the extent they apply to us.`,
      },
      {
        type: 'p',
        strong: true,
        text: 'AI OUTPUTS MAY BE INACCURATE, INCOMPLETE, OR CONTAIN ERRORS ("HALLUCINATIONS"). AI OUTPUTS ARE NOT PROFESSIONAL FINANCIAL, LEGAL, ACCOUNTING, OR OTHER LICENSED PROFESSIONAL ADVICE. CUSTOMERS ARE SOLELY RESPONSIBLE FOR INDEPENDENTLY VERIFYING AI OUTPUTS BEFORE RELYING ON THEM FOR ANY DECISION.',
      },
    ],
  },
  {
    number: '06',
    title: 'How We Share Information',
    id: 'sharing',
    blocks: [
      {
        type: 'p',
        strong: true,
        text: 'We do not sell your personal information. We do not share Client Data for advertising of any kind.',
      },
      {
        type: 'p',
        text: `On echo1labs.com, and only after you accept advertising cookies, we use Google Ads to measure and personalize our advertising. Under some state privacy laws that use of advertising cookies may be treated as "sharing" or "targeted advertising." You can decline or withdraw that consent at any time as described in Sections 10.2 and 13. We disclose information only as described below.`,
      },
      { type: 'h3', text: '6.1 Sub-Processors and Service Providers' },
      {
        type: 'table',
        head: ['Category', 'Purpose'],
        rows: [
          ['AI model providers', 'Generating AI Outputs from Client Data and powering the Orbit concierge'],
          ['Cloud infrastructure', 'Hosting, compute, storage, security, and first-party usage analytics'],
          ['Database services', 'Data persistence and multi-tenant isolation'],
          ['Application deployment platform', 'Application hosting and edge delivery'],
          ['Workflow automation', 'Automated workflow orchestration'],
          ['Payment processor', 'Processing fees and payments'],
          ['Communications providers', 'Email, messaging, and customer notifications'],
          ['Website analytics and advertising (consent-gated)', 'Traffic measurement and advertising performance on echo1labs.com'],
        ],
      },
      {
        type: 'p',
        text: `A current list of named sub-processors, including processing locations, is available on request at ${PRIVACY_EMAIL} and in any executed DPA. We review the security of each sub-processor before onboarding and bind each to obligations no less protective than those in this Policy.`,
      },
      { type: 'h3', text: '6.2 Legal and Safety Requirements' },
      {
        type: 'p',
        text: `We disclose information when required by law, court order, or lawful government request; to protect the rights and safety of ${E}, our customers, or the public; or to investigate fraud and security incidents.`,
      },
      { type: 'h3', text: '6.3 Business Transfers' },
      {
        type: 'p',
        text: 'In connection with a merger, acquisition, or sale of assets, information may transfer to a successor entity with appropriate confidentiality protections and required customer notification.',
      },
    ],
  },
  {
    number: '07',
    title: 'Data Retention',
    id: 'retention',
    blocks: [
      {
        type: 'table',
        head: ['Data Category', 'Retention Period'],
        rows: [
          ['Account and subscription data', 'Duration of subscription plus 24 months, unless a longer period is legally required'],
          ['Financial and billing records', '7 years from transaction date (tax and audit basis)'],
          ['Client Data (active subscription)', 'Duration of subscription plus 30-day export window after termination'],
          ['Client Data (after export window)', 'Deleted or de-identified in the ordinary course'],
          ['Usage logs and telemetry', '12 months (rolling)'],
          ['Security and audit logs', '12 months, or as required by applicable security frameworks'],
          ['Marketing communications', 'Until opt-out plus 90 days'],
          ['Legal hold data', 'Duration of the hold per applicable legal process'],
        ],
      },
      {
        type: 'p',
        text: 'Retention periods are set per category under data-minimization and storage-limitation principles. We retain only what each purpose requires.',
      },
    ],
  },
  {
    number: '08',
    title: 'Data Security and Breach Notification',
    id: 'security',
    blocks: [
      {
        type: 'ul',
        items: [
          'Encryption at rest (AES-256) and in transit (TLS 1.2+) for Client Data.',
          `Multi-tenant isolation: each Customer's Tenant is logically isolated in the Platform's infrastructure.`,
          'Access controls: role-based, least-privilege, with mandatory MFA for administrative access.',
          'Audit logging: audit trails of AI Agent actions and user activities.',
          'Vulnerability management: regular security assessments and patch management.',
          'Vendor security review: sub-processors evaluated before onboarding.',
        ],
      },
      {
        type: 'p',
        text: `Breach notification. If we confirm a security incident affecting personal data, we will notify affected Customers without undue delay and no later than 72 hours after confirmation. Where ${E} is a processor, we notify the affected Customer (the controller) so it can meet its own obligations. Statutory timelines differ by law: the GDPR requires a controller to notify its supervisory authority within 72 hours, while Texas law (Bus. & Com. Code sec. 521.053) requires notice to affected individuals without unreasonable delay and no later than 60 days, and to the Texas Attorney General within 30 days if 250 or more Texas residents are affected.`,
      },
    ],
  },
  {
    number: '09',
    title: 'Your Privacy Rights and Choices',
    id: 'rights',
    blocks: [
      {
        type: 'table',
        head: ['Right', 'What it means'],
        rows: [
          ['Access', 'Confirm whether we process your data and obtain a copy.'],
          ['Correction', 'Request correction of inaccurate or incomplete personal data.'],
          ['Deletion', 'Request deletion of your personal data, subject to legal retention obligations.'],
          ['Portability', 'Receive your data in a portable, machine-readable format.'],
          ['Opt-out (marketing)', 'Unsubscribe from promotional email at any time via the unsubscribe link.'],
          ['Opt-out (advertising cookies)', 'Decline or withdraw consent for analytics and advertising cookies on echo1labs.com (Section 13).'],
          ['Restriction / objection', 'Request restriction of, or object to, certain processing.'],
        ],
      },
      {
        type: 'p',
        text: `To exercise these rights, contact ${PRIVACY_EMAIL}. We respond within the timeframe required by applicable law and will not discriminate against you for exercising any privacy right. If your data is contained in Client Data submitted by a Customer, we will refer your request to that Customer, who is the controller responsible for responding.`,
      },
    ],
  },
  {
    number: '10',
    title: 'Texas-Specific Rights (TDPSA / TRAIGA)',
    id: 'texas',
    blocks: [
      { type: 'h3', text: '10.1 Rights Under the TDPSA' },
      {
        type: 'ul',
        items: [
          'Right to access: confirm whether we process your personal data and obtain a copy.',
          'Right to correction: request correction of inaccurate personal data.',
          'Right to deletion: request deletion of personal data we hold about you.',
          'Right to data portability: receive your data in a portable, machine-readable format.',
          'Right to opt out of targeted advertising, sale, and certain profiling.',
          'Right to non-discrimination for exercising your rights.',
        ],
      },
      {
        type: 'p',
        text: `We will respond to TDPSA consumer requests within 45 days (extendable by 45 days with notice). If you are dissatisfied with our response, you may appeal within a reasonable time; we will respond to appeals within 60 days. Contact: ${PRIVACY_EMAIL}.`,
      },
      { type: 'h3', text: '10.2 Sale, Targeted Advertising, and Opt-Out Signals' },
      {
        type: 'p',
        text: `${E} does not sell personal data. On echo1labs.com we use consent-gated advertising cookies as described in Section 13, which may constitute targeted advertising under the TDPSA. You can opt out by declining cookies in the consent banner, by clearing this site's cookies, or by sending an opt-out preference signal such as Global Privacy Control from your browser; we treat a Global Privacy Control signal as a decline of analytics and advertising cookies. The Platform itself (your Tenant and Client Data) is never used for advertising.`,
      },
      { type: 'h3', text: '10.3 TRAIGA' },
      {
        type: 'p',
        text: `Under the Texas Responsible Artificial Intelligence Governance Act (HB 149), ${E} does not use AI for the uses the Act prohibits and provides the disclosures the Act requires. See Section 5.`,
      },
    ],
  },
  {
    number: '11',
    title: 'California Rights (CCPA / CPRA)',
    id: 'california',
    blocks: [
      { type: 'p', text: 'If you are a California resident, the CCPA/CPRA provides the following rights:' },
      {
        type: 'ul',
        items: [
          'Right to know the categories and specific pieces of personal information we collect.',
          'Right to delete personal information we have collected, subject to exceptions.',
          'Right to correct inaccurate personal information we maintain.',
          'Right to opt out of sale or sharing: we do not sell personal information. Advertising cookies on echo1labs.com may be "sharing" for cross-context behavioral advertising; decline them in the consent banner or send a Global Privacy Control signal, which we honor.',
          'Right to limit use of sensitive personal information.',
          'Right to non-discrimination.',
        ],
      },
      {
        type: 'p',
        text: `Sensitive personal information (SPI). We may collect account credentials (log-in and password) and financial-account information contained in Client Data, which are "sensitive personal information" under the CPRA. We use SPI only to provide the Platform and for purposes permitted without a right to limit; we do not use or disclose SPI to infer characteristics about you. You may nonetheless request that we limit our use of SPI at ${PRIVACY_EMAIL}.`,
      },
      {
        type: 'p',
        text: `Because ${E} operates exclusively online with a direct relationship with its consumers, you may submit California requests by email to ${PRIVACY_EMAIL}. We respond within 45 days (extendable with notice).`,
      },
    ],
  },
  {
    number: '12',
    title: 'EEA and UK Rights (GDPR / UK GDPR)',
    id: 'eea-uk',
    blocks: [
      {
        type: 'ul',
        items: [
          'Right to object to processing based on legitimate interests.',
          'Right to erasure ("right to be forgotten") in specified circumstances.',
          'Right to restriction of processing.',
          'Right to withdraw consent at any time where processing is based on consent.',
          'Right to lodge a complaint with your local data protection authority.',
        ],
      },
      {
        type: 'p',
        text: `We respond to data-subject requests within one month, extendable by two further months for complex requests with notice. For transfers of EEA or UK personal data to the United States, we rely on the EU Standard Contractual Clauses and the UK International Data Transfer Agreement; contact ${PRIVACY_EMAIL} to obtain copies.`,
      },
      {
        type: 'p',
        text: `EEA and UK contact and representative. EEA and UK data-subject inquiries may be directed to ${PRIVACY_EMAIL}. Where ${E} is required under GDPR Article 27 to designate a representative established in the EEA or the UK, we will appoint a qualifying in-region representative before offering the Platform to individuals in those territories, and will publish its contact details here.`,
      },
    ],
  },
  {
    number: '13',
    title: 'Cookies, Tracking Technologies, and Messaging',
    id: 'cookies',
    blocks: [
      { type: 'h3', text: '13.1 Cookies on echo1labs.com and the Platform' },
      {
        type: 'table',
        head: ['Cookie Type', 'Purpose'],
        rows: [
          ['Strictly necessary', 'Authentication, session management, security, and remembering your cookie choice. Cannot be disabled without breaking the service.'],
          ['Functional / preference', 'Remembering user preferences, language, and interface settings.'],
          ['Analytics (consent-gated)', 'Google Analytics, loaded through Google Tag Manager, to understand how echo1labs.com is used. Set only after you accept.'],
          ['Advertising (consent-gated)', 'Google Ads, loaded through Google Tag Manager, to measure and personalize our advertising. Set only after you accept.'],
        ],
      },
      {
        type: 'p',
        text: `When you first visit echo1labs.com, a banner lets you accept or decline analytics and advertising cookies; until you choose, analytics and advertising storage stay off. You can change your choice at any time by clearing this site's cookies in your browser. If your browser sends a Global Privacy Control signal, we treat it as a decline and do not show the banner. We do not use social-media or other third-party advertising trackers on this site. The Platform itself uses only strictly necessary and functional cookies.`,
      },
      { type: 'h3', text: '13.2 Messaging Consent' },
      {
        type: 'p',
        text: 'We only send marketing SMS messages or place marketing calls where you have given prior express written consent, and standard message and data rates may apply. Every marketing message includes opt-out instructions. You can opt out at any time by any reasonable method, including replying STOP to any message, emailing us, or asking us directly, and we honor opt-out requests across all channels within 10 business days.',
      },
    ],
  },
  {
    number: '14',
    title: `Children's Privacy`,
    id: 'children',
    blocks: [
      {
        type: 'p',
        text: `The Platform is designed for business use by adults and is not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe a child has provided us information, contact ${PRIVACY_EMAIL} and we will delete it promptly.`,
      },
    ],
  },
  {
    number: '15',
    title: 'Third-Party Websites and Services',
    id: 'third-party',
    blocks: [
      {
        type: 'p',
        text: `The Platform may link to or integrate with third-party services, including accounting, messaging, CRM, and data platforms. This Policy does not apply to third-party services. We encourage you to review their privacy policies independently. ${E} is not responsible for the privacy practices of third-party services.`,
      },
    ],
  },
  {
    number: '16',
    title: 'Changes to This Policy',
    id: 'changes',
    blocks: [
      {
        type: 'p',
        text: 'We may update this Policy to reflect changes in our practices, Platform features, or applicable law. When we make material changes, we will update the Effective Date, provide in-Platform notification to Customers, and, where required, seek affirmative consent. Continued use of the Platform after the Effective Date constitutes acceptance.',
      },
    ],
  },
  {
    number: '17',
    title: 'Contact and Data Rights Requests',
    id: 'contact',
    blocks: [
      {
        type: 'table',
        head: ['Channel', 'Detail'],
        rows: [
          ['Privacy inquiries and data-rights requests', PRIVACY_EMAIL],
          ['Legal Counsel (legal notices)', LEGAL_EMAIL],
          ['EEA / UK inquiries', PRIVACY_EMAIL],
          ['Mailing address', `${LEGAL_ENTITY}, ${POSTAL_ADDRESS}`],
        ],
      },
    ],
  },
];

// Production gate: refuse to build a non-draft page while the date is unset.
if (!PRIVACY_IS_DRAFT && EFFECTIVE_DATE === 'CONFIRM') {
  throw new Error('privacy-policy: PRIVACY_IS_DRAFT is false but EFFECTIVE_DATE is unset.');
}
