// Single source of truth for the Echo 1 Labs Terms of Service.
// Rendered by app/(marketing)/terms-of-service/page.tsx (web) and
// scripts/export-legal.ts (Markdown export). Edit here only.
//
// Provenance: ported from Echo1Labs_Terms_of_Service_v2.docx (2026-07-29,
// docs/legal-src/), then revised per the GC audit of 2026-09-22
// (docs/legal-out/Terms-of-Service-GC-Audit-2026-09-22.md). Every deviation
// from the July source is listed in CHANGES so counsel can review without a
// redline.
//
// PRODUCTION GATE. Two facts are still blank and only the owner can supply them:
//   1. LEGAL_ENTITY in lib/site.ts must match the Texas certificate of
//      formation character for character.
//   2. EFFECTIVE_DATE below must be the LLC formation date or later.
// The guard at the bottom of this file throws at build time if
// TERMS_IS_DRAFT is false while either fact is unset.

import { CONTACT_EMAIL, LEGAL_ENTITY, POSTAL_ADDRESS, PRIVACY_EMAIL, SITE_URL } from '@/lib/site';

import type { LegalSection, OpenItem } from './types';

export type { LegalBlock, LegalSection, OpenItem } from './types';

/** Set false only after OPEN_ITEMS are closed, counsel has signed off, and the owner approves. */
export const TERMS_IS_DRAFT = true;

/** CONFIRM: formation date or later, ISO format YYYY-MM-DD. */
const EFFECTIVE_DATE: string = 'CONFIRM';

/** CONFIRM: set true once LEGAL_ENTITY has been matched to the certificate of formation. */
const ENTITY_NAME_VERIFIED = false;

export const TERMS_META = {
  title: 'Terms of Service',
  version: '1.0',
  effectiveDate: EFFECTIVE_DATE,
  entity: LEGAL_ENTITY,
  entityForm: 'a Texas limited liability company',
  address: POSTAL_ADDRESS,
  governingLaw: 'Texas',
  arbitrationSeat: 'Victoria, Texas',
  venueCounty: 'DeWitt County, Texas',
  contactEmail: CONTACT_EMAIL,
  privacyUrl: `${SITE_URL}/privacy`,
  versionNote:
    'Version 1.0 is the first edition issued by ' +
    LEGAL_ENTITY +
    '. Prior editions of Platform terms were issued by a predecessor entity and are superseded as described in Section 1.5.',
} as const;

export const OPEN_ITEMS: OpenItem[] = [
  {
    key: 'entity-name',
    status: 'CONFIRM',
    note:
      'Filed name on the Texas certificate of formation. Working value is "' +
      LEGAL_ENTITY +
      '". Must match character for character; the certificate wins. Set ENTITY_NAME_VERIFIED once matched.',
  },
  {
    key: 'effective-date',
    status: 'CONFIRM',
    note: 'Effective Date must be the LLC formation date or later. Set EFFECTIVE_DATE.',
  },
  {
    key: 'exhibit-a-content',
    status: 'CONFIRM',
    note: 'Exhibit A guardrail table must match how the Platform is actually configured. Delete any aspirational row before launch.',
  },
  {
    key: 'insurance-binding',
    status: 'COUNSEL',
    note: 'Section 16 no longer states dollar limits. If technology E&O and cyber are bound before launch, counsel may restore limits here and add a dollar floor to the Section 14 super-cap.',
  },
  {
    key: 'counsel-signoff',
    status: 'COUNSEL',
    note: 'Texas-licensed attorney review of v1.0-rc, with attention to Sections 1.5, 14, 16, 17, and 20.',
  },
  {
    key: 'dpa',
    status: 'OUTSTANDING',
    note: 'A standalone DPA is still recommended for enterprise customers. Section 17 is now self-sufficient so its absence no longer breaks the Terms.',
  },
];

/** Every deviation from Echo1Labs_Terms_of_Service_v2.docx (2026-07-29), for counsel. */
export const CHANGES: string[] = [
  // Morning port (PE-2026-09-22-TOS-01)
  'Contracting party: "Mingma Inc, a corporation doing business as Echo 1 Labs" replaced with "' + LEGAL_ENTITY + ', a Texas limited liability company" throughout. All d/b/a language removed.',
  'Version reset from 2.0 to 1.0 with a predecessor note. Effective Date gated on formation date.',
  'Section 20 arbitration seat changed from Dallas County to Victoria, Texas; court venue DeWitt County, Texas.',
  'Vendor names removed from client-facing copy (Sections 3.2, 4.3, 9, 12).',
  'Section 3.2 product list aligned to the live product set; Professional Services bullet removed.',
  'Sections 6 and 22: legal and billing notices route to ' + CONTACT_EMAIL + '; privacy and data-rights requests route to ' + PRIVACY_EMAIL + '; mailing address for notices set from POSTAL_ADDRESS (P.O. Box; the registered office is on the certificate of formation).',
  'Punctuation only: em dashes replaced. No wording changed by that pass.',
  // GC audit revision (v1.0-rc)
  'Section 1.4 added: business use only. Section 1.5 added: transition from predecessor terms, consent to assignment.',
  'Section 2: added definitions for Effective Date, Human Sign-Off, Subscription Term, Beta Services, Privacy Policy. DPA definition made conditional.',
  'Section 3.4 added: Beta Services.',
  'Section 7.2 added: export and sanctions compliance. Section 7.1 gained a high-risk-use prohibition.',
  'Section 8.4 added: regulated data (no PHI without a BAA, no full payment card data). Section 8.5 added: de-identified usage data. Section 8.2 unchanged.',
  'Section 9: interest changed to "the lesser of" 1.5% per month or the lawful maximum; usury savings clause added.',
  'Section 10: Feedback restated as a license; trademark notice added. Section 10.1 assignment of AI Outputs conditioned on payment of fees then due.',
  'Section 13.3: product-specific disclaimer replaced with a generic licensed-professional disclaimer.',
  'Section 14 restructured: general cap is 12 months of fees; super-cap of three times the general cap for data-security breach, confidentiality breach, and Echo 1 Labs IP indemnity; uncapped only for fraud, gross negligence, willful misconduct, Customer payment obligations, and Customer indemnity for HITL bypass and Acceptable Use violations. Insurance-limit reference removed from the cap formula.',
  'Section 16: specific dollar limits, additional-insured, and waiver-of-subrogation commitments moved to Order Form; public covenant is commercially reasonable coverage plus certificate on request.',
  'Section 17: DPA made conditional; processor duties stated in the Terms; TRAIGA row trimmed to statutory scope; Privacy Policy cross-reference added.',
  'Section 17.2 (2026-10-15): added assistance with data protection assessments and an annual audit-and-inspection right, completing the GDPR Article 28(3) and TDPSA sec. 541.104 processor-term list.',
  'Section 19: Subscription Term default and effect of termination added.',
  'Section 20: FAA designation, delegation of arbitrability, conflict-of-laws exclusion, consent to jurisdiction, and mutual jury waiver added.',
  'Section 21: order of precedence, survival, waiver, and no-third-party-beneficiaries added; assignment made mutual for successors.',
  'Section 22: notice mechanics added.',
  'Exhibit A: closing "to be finalized" sentence replaced with a change-control sentence.',
  'Not changed in substance: Sections 4, 5, 8.1 through 8.3, 11, 12, 13.1, 13.2, 15, 18.',
];

const E = 'Echo 1 Labs';

export const TERMS_SECTIONS: LegalSection[] = [
  {
    number: '01',
    title: 'Acceptance and Formation of Agreement',
    id: 'acceptance',
    blocks: [
      { type: 'h3', text: '1.1 Agreement Formation' },
      {
        type: 'p',
        text: `These Terms of Service ("Terms" or "Agreement") constitute a legally binding contract between ${LEGAL_ENTITY}, ${TERMS_META.entityForm} ("${E}," "Company," "we," "us," or "our"), and you ("Customer," "Client," "Subscriber," or "you"), whether acting individually or on behalf of an entity, governing your access to and use of the ${E} AI-driven business lifecycle management Platform and all related products and services.`,
      },
      { type: 'h3', text: '1.2 Acceptance' },
      {
        type: 'p',
        text: `You enter into this Agreement by the earliest of: (a) clicking "I Accept" or a similar button; (b) creating a user account or Tenant on the Platform; (c) accessing or using any feature of the Platform; or (d) executing an Order Form or SOW referencing these Terms. If you do not agree, do not access or use the Platform.`,
      },
      { type: 'h3', text: '1.3 Authority to Bind an Entity' },
      {
        type: 'p',
        text: `If you accept on behalf of a legal entity, you represent that you are authorized to bind that entity. "You" and "Customer" then refer to that entity.`,
      },
      { type: 'h3', text: '1.4 Business Use Only' },
      {
        type: 'p',
        text: `The Platform is offered to businesses and organizations for business purposes. It is not offered to individuals for personal, family, or household use, and consumer-protection statutes that apply only to consumer transactions do not apply to this Agreement.`,
      },
      { type: 'h3', text: '1.5 Transition from Predecessor Terms' },
      {
        type: 'p',
        text: `These Terms replace and supersede any prior terms of service, terms of use, or similar agreement governing the Platform that were issued by a predecessor entity. If Customer accepted such prior terms, Customer's continued access to or use of the Platform on or after the Effective Date constitutes acceptance of these Terms, and Customer consents to the assignment to ${LEGAL_ENTITY} of any such prior agreement and of any Order Form or SOW entered into under it.`,
      },
    ],
  },
  {
    number: '02',
    title: 'Definitions',
    id: 'definitions',
    blocks: [
      {
        type: 'table',
        head: ['Term', 'Definition'],
        rows: [
          ['"AI Agent"', 'A Platform component that autonomously executes tasks using AI/ML models, subject to Policy Guardrails and HITL requirements.'],
          ['"AI Outputs"', 'All text, data, analysis, recommendations, code, or other content generated by AI Agents or AI-assisted features.'],
          ['"Authorized User"', `Any employee, contractor, or agent of Customer authorized to access the Platform under Customer's account.`],
          ['"Beta Services"', 'Any Platform feature or product identified as beta, preview, early access, coming soon, or pre-release.'],
          ['"Client Data"', 'All data submitted by Customer or Authorized Users to the Platform, including financial records and personal data.'],
          ['"Confidential Information"', `Non-public information disclosed by one party to the other that is marked confidential or that a reasonable person would understand to be confidential, including Client Data, pricing, and the Platform's non-public features.`],
          ['"Consequential Decision"', 'Any action that, if erroneous, could cause material financial loss, legal liability, reputational harm, or operational disruption. Requires Human Sign-Off.'],
          ['"DPA"', 'A Data Processing Addendum executed by the parties. If executed, the DPA is incorporated into this Agreement. If no DPA has been executed, Section 17 governs the processing of personal data.'],
          ['"Documentation"', `The user guides, specifications, and materials ${E} makes available describing the Platform's features and permitted use.`],
          ['"Effective Date"', 'The date stated at the top of these Terms, or, for a Customer accepting later, the date of acceptance under Section 1.2.'],
          ['"Feedback"', 'Suggestions, feature requests, or other input Customer provides about the Platform.'],
          ['"HITL"', 'Human-in-the-Loop: the mandatory process by which an Authorized User reviews, approves, modifies, or rejects an AI Output before it takes effect.'],
          ['"Human Sign-Off"', 'Has the meaning given in Section 5.2.'],
          ['"Order Form" / "SOW"', 'An ordering document or statement of work executed by the parties that references these Terms and specifies products, scope, and fees.'],
          ['"Platform"', `The ${E} AI-driven business lifecycle management SaaS environment, including Prime, Engine, RevOps, Broadcast, Signal, Ledger, Titan, the AI Agent Fleet, and all APIs.`],
          ['"Policy Guardrails"', 'The pre-defined rules and HITL escalation triggers governing AI Agent autonomy, described in Section 4 and Exhibit A.'],
          ['"Privacy Policy"', `The ${E} privacy policy published at ${TERMS_META.privacyUrl}, as updated from time to time.`],
          ['"Sensitive Business Data"', 'Client Data whose unauthorized disclosure would be materially harmful, including financial records, customer lists, pricing, trade secrets, and personal data.'],
          ['"Subscription Term"', 'The initial term stated in the Order Form (12 months if none is stated) and each renewal term under Section 19.'],
          ['"Tenant"', `Customer's logically isolated environment within the Platform's multi-tenant architecture.`],
          ['"TRAIGA" / "TDPSA"', 'The Texas Responsible Artificial Intelligence Governance Act (HB 149, eff. Jan 1, 2026) and the Texas Data Privacy and Security Act (eff. July 1, 2024), respectively.'],
        ],
      },
    ],
  },
  {
    number: '03',
    title: 'Description of Platform and Services',
    id: 'platform',
    blocks: [
      { type: 'h3', text: '3.1 Core Offering' },
      {
        type: 'p',
        text: `${E} provides an AI-driven business lifecycle management platform that enables businesses to automate, orchestrate, and supervise critical functions, including go-to-market strategy, financial analysis, operations management, sales engineering, and process automation, through coordinated AI Agents operating under human governance controls.`,
      },
      { type: 'h3', text: '3.2 Platform Products' },
      {
        type: 'ul',
        items: [
          'Prime: agentic operations system and governance layer.',
          'Engine: go-to-market strategy and execution.',
          'RevOps: revenue operations and outbound.',
          'Broadcast: content and brand amplification.',
          'Signal: deal intelligence and benchmarking.',
          'Ledger: financial operations with accounting-system integration and AI-assisted analysis.',
          'Titan: document intelligence for project and delivery management.',
          'AI Agent Fleet: specialized AI Agents operating under Policy Guardrails.',
        ],
      },
      { type: 'h3', text: '3.3 SaaS Delivery' },
      {
        type: 'p',
        text: 'The Platform is delivered as cloud-hosted SaaS. No software is licensed for local installation unless an Order Form specifies otherwise.',
      },
      { type: 'h3', text: '3.4 Beta Services' },
      {
        type: 'p',
        text: `${E} may make Beta Services available. Beta Services are provided for evaluation, may be changed or withdrawn at any time, are excluded from Section 13.1 warranties and Section 18 service levels, and may not be used for Consequential Decisions. Customer's use of Beta Services is at Customer's own risk.`,
      },
    ],
  },
  {
    number: '04',
    title: 'AI Agent Services: Delegation of Authority and Policy Guardrails',
    id: 'ai-agents',
    blocks: [
      {
        type: 'callout',
        text: `CRITICAL: READ CAREFULLY. This section governs what AI Agents may do autonomously and where human approval is mandatory. ${E} is not liable for harms caused by Customer's failure to observe the HITL requirements in Section 5 or the guardrails in Exhibit A.`,
      },
      { type: 'h3', text: '4.1 Authorized Autonomous Actions' },
      {
        type: 'ul',
        items: [
          'Research and analysis for human review.',
          'Internal drafting of documents and artifacts for Authorized User review prior to external use.',
          'Financial data ingestion and normalization from connected systems.',
          'Workflow orchestration within pre-approved, Customer-configured guardrails.',
          'Notification and escalation of conditions requiring Human Sign-Off.',
        ],
      },
      { type: 'h3', text: '4.2 Actions Requiring Human Sign-Off' },
      { type: 'p', text: 'No AI Agent may, without prior Human Sign-Off by an Authorized User:' },
      {
        type: 'ul',
        items: [
          'Send any external communication, report, or proposal to a third party.',
          'Execute, authorize, or represent agreement to any contract, commitment, or financial obligation.',
          'Process, initiate, or authorize any financial transaction.',
          `Share Sensitive Business Data outside the Customer's Tenant.`,
          'Modify, overwrite, or delete Client Data in a non-reversible manner.',
          'Publish any go-to-market recommendation, pricing change, or strategic decision to be acted upon externally.',
          'File any regulatory, tax, or compliance document.',
          'Onboard new users, integrations, or data connections.',
        ],
      },
      { type: 'h3', text: '4.3 Third-Party Model Disclaimer' },
      {
        type: 'p',
        text: `AI Agents use large language models from third-party providers. ${E} does not control these models, their training data, or their updates. AI Outputs may reflect limitations, biases, or hallucinations inherent in any LLM system.`,
      },
    ],
  },
  {
    number: '05',
    title: 'Human Supervision and Sign-Off Requirements',
    id: 'human-supervision',
    blocks: [
      { type: 'h3', text: `5.1 Customer's Supervisory Obligation` },
      {
        type: 'p',
        text: 'Customer is solely responsible for: (a) designating qualified Authorized Users to supervise AI Agent activity; (b) reviewing AI Outputs before any Consequential Decision is acted upon or communicated to any third party; (c) establishing internal governance procedures implementing HITL requirements; and (d) ensuring AI Agents are not permitted to act without Human Sign-Off where required.',
      },
      { type: 'h3', text: '5.2 Human Sign-Off Definition' },
      {
        type: 'p',
        text: '"Human Sign-Off" means affirmative approval by an Authorized User who has reviewed the AI Output in full, applied independent professional judgment, and taken responsibility for the resulting action. Passive inaction or automated acknowledgment does not constitute Human Sign-Off.',
      },
      { type: 'h3', text: '5.3 Customer Assumption of Risk' },
      {
        type: 'p',
        strong: true,
        text: 'IF CUSTOMER PERMITS AN AI AGENT TO TAKE AN ACTION THAT REQUIRES HUMAN SIGN-OFF WITHOUT OBTAINING THAT SIGN-OFF, WHETHER BY MISCONFIGURATION, NEGLIGENCE, OR DELIBERATE BYPASS, ECHO 1 LABS BEARS NO LIABILITY FOR RESULTING HARM. CUSTOMER ASSUMES ALL RISK AND LIABILITY, AND SUCH USE CONSTITUTES A MATERIAL BREACH OF THIS AGREEMENT.',
      },
    ],
  },
  {
    number: '06',
    title: 'Account Registration and Security',
    id: 'accounts',
    blocks: [
      {
        type: 'p',
        text: `Customer must register with accurate and current information, maintain the confidentiality of all credentials, restrict access to Authorized Users only, and promptly notify ${CONTACT_EMAIL} of any suspected unauthorized access. Customer is responsible for all activities conducted under its account.`,
      },
    ],
  },
  {
    number: '07',
    title: 'Acceptable Use Policy',
    id: 'acceptable-use',
    blocks: [
      { type: 'h3', text: '7.1 Prohibited Activities' },
      { type: 'p', text: 'Customer shall not:' },
      {
        type: 'ul',
        items: [
          'Use the Platform for any illegal purpose or in violation of applicable law.',
          `Attempt to gain unauthorized access to any portion of the Platform or another customer's Tenant.`,
          'Reverse engineer, decompile, or extract source code, model weights, or prompt templates from any AI Agent.',
          'Use the Platform to train or build any competing AI system or product.',
          'Submit malware, viruses, or other harmful code to the Platform.',
          'Use AI Agents to make automated decisions about individuals that violate applicable law, including fair lending or employment discrimination laws.',
          'Use the Platform in any application where failure could lead to death, personal injury, or severe physical or environmental damage, including medical diagnosis or treatment, weapons, or the operation of critical infrastructure.',
          'Attempt to "jailbreak" or manipulate AI Agents to circumvent Policy Guardrails.',
          `Resell or sublicense the Platform without ${E}'s prior written consent.`,
          'Process data that Customer does not have the legal right to process.',
        ],
      },
      { type: 'h3', text: '7.2 Export and Sanctions Compliance' },
      {
        type: 'p',
        text: `Customer represents that neither it nor any Authorized User is located in, organized under the laws of, or ordinarily resident in a country or territory subject to comprehensive U.S. sanctions, or listed on any U.S. government restricted-party list. Customer shall comply with all applicable export-control and sanctions laws in its use of the Platform and AI Outputs.`,
      },
    ],
  },
  {
    number: '08',
    title: 'Client Data and Data Processing',
    id: 'client-data',
    blocks: [
      { type: 'h3', text: '8.1 Customer Ownership' },
      {
        type: 'p',
        text: `Customer retains all right, title, and interest in Client Data. ${E} receives a limited license to process Client Data solely to provide the Platform and related services, as described in Section 17 and any DPA.`,
      },
      { type: 'h3', text: '8.2 No Use for Model Training' },
      {
        type: 'p',
        text: `${E} shall not use Customer's Client Data to train, fine-tune, or improve any general-purpose AI model without Customer's prior explicit written consent.`,
      },
      { type: 'h3', text: '8.3 Data Return and Deletion' },
      {
        type: 'p',
        text: `Upon termination, ${E} will make Client Data available for export for 30 days, then delete or de-identify it in the ordinary course unless law requires longer retention.`,
      },
      { type: 'h3', text: '8.4 Regulated Data' },
      {
        type: 'p',
        text: `Customer shall not submit to the Platform (a) protected health information as defined under HIPAA unless the parties have executed a business associate agreement; (b) full payment card numbers or card verification data; or (c) any data whose processing by ${E} would require ${E} to comply with a regulatory regime not identified in Section 17, unless agreed in an Order Form.`,
      },
      { type: 'h3', text: '8.5 Usage Data' },
      {
        type: 'p',
        text: `${E} may collect and use data about the operation and use of the Platform in aggregated or de-identified form that does not identify Customer, any Authorized User, or any individual, to operate, secure, and improve the Platform. This Section 8.5 does not modify Section 8.2.`,
      },
    ],
  },
  {
    number: '09',
    title: 'Fees, Billing, and Payment',
    id: 'fees',
    blocks: [
      {
        type: 'p',
        text: `Fees are as specified in the applicable Order Form and are processed through our third-party payment processor. Past-due amounts accrue interest at the lesser of 1.5% per month or the maximum rate permitted by applicable law. If payment remains outstanding 30 days after written notice, ${E} may suspend Platform access. Customer is responsible for all applicable taxes other than taxes on ${E}'s net income. ${E} may adjust fees with 60 days' notice before a renewal term. Except as expressly stated, fees are non-refundable.`,
      },
      {
        type: 'p',
        text: `Usury savings. The parties intend to comply with applicable usury law. If any charge under this Agreement would be usurious, it is reduced to the maximum lawful rate, and any excess already paid is credited against amounts owed or refunded.`,
      },
    ],
  },
  {
    number: '10',
    title: 'Intellectual Property and AI Outputs',
    id: 'intellectual-property',
    blocks: [
      {
        type: 'p',
        text: `${E} and its licensors own all right, title, and interest in the Platform, including AI Agent architectures, prompt engineering frameworks, workflow templates, and Documentation. Customer grants ${E} a perpetual, irrevocable, worldwide, royalty-free license to use Feedback for any purpose without obligation or compensation. ${E}, the ${E} logo, and the product names listed in Section 3.2 are trademarks of ${LEGAL_ENTITY}.`,
      },
      { type: 'h3', text: '10.1 Ownership of AI Outputs' },
      {
        type: 'p',
        text: `As between the parties, and subject to ${E}'s retained rights in the Platform and to Customer's payment of fees then due, ${E} assigns to Customer its rights in the AI Outputs generated for Customer. Customer is responsible for reviewing AI Outputs (per Section 5) before use. Because AI Outputs are generated by third-party models from inputs ${E} does not control, ${E} does not warrant that any AI Output is original or non-infringing, and Section 15 governs allocation of third-party intellectual-property claims arising from AI Outputs.`,
      },
      { type: 'h3', text: '10.2 Prohibited IP Activities' },
      {
        type: 'ul',
        items: [
          'Remove or obscure any proprietary notices on the Platform.',
          `Use ${E} trademarks or logos without prior written authorization.`,
          'Represent AI Outputs as the work of a licensed human professional without independent professional review.',
          'Use the Platform to develop a competing product or service.',
        ],
      },
    ],
  },
  {
    number: '11',
    title: 'Confidentiality',
    id: 'confidentiality',
    blocks: [
      {
        type: 'p',
        text: `Each party shall hold the other's Confidential Information in strict confidence, use it solely to exercise rights under this Agreement, and disclose it only to employees and contractors with a need to know who are bound by comparable obligations. Confidentiality obligations survive termination for 5 years; obligations regarding trade secrets survive as long as the information remains a trade secret.`,
      },
    ],
  },
  {
    number: '12',
    title: 'Third-Party Services and Integrations',
    id: 'third-party',
    blocks: [
      {
        type: 'p',
        text: `The Platform integrates with third-party services, including accounting, cloud infrastructure, AI model, workflow automation, payment processing, and team messaging providers. Customer is responsible for complying with applicable third-party terms. ${E} is not liable for failures, inaccuracies, or security incidents arising from third-party services beyond its reasonable control.`,
      },
    ],
  },
  {
    number: '13',
    title: 'Warranties and Disclaimers',
    id: 'warranties',
    blocks: [
      { type: 'h3', text: `13.1 ${E} Warranties` },
      {
        type: 'p',
        text: `${E} warrants that: (a) it has authority to enter this Agreement; (b) the Platform will perform materially in accordance with the Documentation; and (c) it will take commercially reasonable measures to keep the Platform free of malware.`,
      },
      { type: 'h3', text: '13.2 Disclaimer of Implied Warranties' },
      {
        type: 'p',
        strong: true,
        text: 'EXCEPT AS IN SECTION 13.1, THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE." ECHO 1 LABS DISCLAIMS ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY AI OUTPUT WILL BE ACCURATE, COMPLETE, UNBIASED, OR SUITABLE FOR ANY PURPOSE.',
      },
      { type: 'h3', text: '13.3 AI Output and Professional-Advice Disclaimer' },
      {
        type: 'p',
        strong: true,
        text: 'AI OUTPUTS DO NOT CONSTITUTE LEGAL, FINANCIAL, ACCOUNTING, TAX, ENGINEERING, CONSTRUCTION, OR OTHER LICENSED PROFESSIONAL ADVICE, AND NO AI OUTPUT IS THE WORK PRODUCT OF A LICENSED PROFESSIONAL. CUSTOMER IS SOLELY RESPONSIBLE FOR INDEPENDENTLY VERIFYING ALL AI OUTPUTS AND FOR OBTAINING LICENSED PROFESSIONAL REVIEW WHERE REQUIRED BY LAW OR PRUDENT PRACTICE.',
      },
    ],
  },
  {
    number: '14',
    title: 'Limitation of Liability',
    id: 'liability',
    blocks: [
      {
        type: 'p',
        strong: true,
        text: 'IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING LOSS OF REVENUE, PROFITS, GOODWILL, OR DATA, REGARDLESS OF CAUSE OR FORESEEABILITY, EXCEPT TO THE EXTENT SUCH DAMAGES ARE THE SUBJECT OF AN UNCAPPED CLAIM UNDER SECTION 14.3.',
      },
      { type: 'h3', text: '14.1 General Cap' },
      {
        type: 'p',
        text: `Except as provided in Sections 14.2 and 14.3, each party's total aggregate liability arising out of or relating to this Agreement shall not exceed the total fees paid or payable by Customer to ${E} in the 12 months immediately preceding the event giving rise to the claim (the "General Cap").`,
      },
      { type: 'h3', text: '14.2 Super-Cap' },
      {
        type: 'p',
        text: `For claims arising from (a) a party's breach of Section 11 (Confidentiality); (b) a party's breach of its data-security obligations under Section 17; or (c) ${E}'s indemnification obligations under Section 15.2, the liable party's total aggregate liability shall not exceed three times the General Cap.`,
      },
      { type: 'h3', text: '14.3 Uncapped Claims' },
      {
        type: 'p',
        text: `Neither the General Cap nor the Super-Cap applies to: (a) a party's fraud, gross negligence, or willful misconduct; (b) Customer's payment obligations; or (c) Customer's indemnification obligations under Section 15.1 for HITL bypass under Section 5.3 or violations of Section 7.`,
      },
      { type: 'h3', text: '14.4 AI Output Claims' },
      {
        type: 'p',
        text: `For claims arising from AI Outputs where Customer complied with the HITL requirements, ${E}'s liability is subject to the General Cap measured by the fees paid for the specific product in the 12 months preceding the claim. Where Customer bypassed HITL, Section 5.3 applies.`,
      },
      {
        type: 'p',
        text: 'The limitations in this Section 14 apply regardless of the form of action, whether in contract, tort, or otherwise, and even if a party has been advised of the possibility of such damages. The parties agree that these limitations are an essential basis of the bargain.',
      },
    ],
  },
  {
    number: '15',
    title: 'Indemnification',
    id: 'indemnification',
    blocks: [
      { type: 'h3', text: `15.1 Customer's Obligations` },
      {
        type: 'p',
        text: `Customer shall defend, indemnify, and hold harmless ${E} from third-party claims arising from Customer's violation of these Terms, Client Data, Customer's failure to comply with HITL requirements, Customer's use of AI Outputs without independent verification, or Customer's negligence or willful misconduct.`,
      },
      { type: 'h3', text: `15.2 ${E}'s Obligations` },
      {
        type: 'p',
        text: `${E} shall defend, indemnify, and hold harmless Customer from third-party claims that the Platform, as provided by ${E}, infringes U.S. intellectual-property rights, provided Customer promptly notifies ${E} and cooperates with the defense. This obligation excludes claims arising from Client Data, AI Outputs, Customer modifications, or combination of the Platform with items not supplied by ${E}. If the Platform is or may be enjoined, ${E} may, at its option, procure the right to continue use, replace or modify the infringing portion, or terminate the affected subscription and refund pre-paid, unused fees.`,
      },
      { type: 'h3', text: '15.3 Procedure' },
      {
        type: 'p',
        text: 'The indemnified party shall give prompt written notice of the claim, allow the indemnifying party sole control of the defense and settlement (provided no settlement imposes obligations on the indemnified party without its consent), and provide reasonable cooperation at the indemnifying party\'s expense.',
      },
    ],
  },
  {
    number: '16',
    title: 'Insurance',
    id: 'insurance',
    blocks: [
      {
        type: 'p',
        text: `During the Subscription Term, ${E} shall maintain commercially reasonable insurance appropriate to its business, including technology errors and omissions and cyber liability coverage. On written request, ${E} will provide a certificate of insurance. Specific coverage limits, additional-insured status, waiver of subrogation, and notice-of-cancellation commitments for enterprise engagements are as set out in the applicable Order Form. Insurance limits are not a cap on, and do not limit, either party's liability under this Agreement.`,
      },
    ],
  },
  {
    number: '17',
    title: 'Data Protection and Privacy Compliance',
    id: 'data-protection',
    blocks: [
      { type: 'h3', text: '17.1 Roles' },
      {
        type: 'p',
        text: `For personal data contained in Client Data, Customer is the controller (or business) and ${E} is the processor (or service provider). For personal data ${E} collects about Authorized Users to administer accounts and for visitors to its websites, ${E} is the controller and the Privacy Policy applies. The following summarizes the allocation:`,
      },
      {
        type: 'table',
        head: ['Framework', `${E} Role`, 'Key Obligation'],
        rows: [
          ['Texas TDPSA', 'Processor (for Client Data)', 'Process only on Customer instructions; support consumer-rights requests within 45 days'],
          ['Texas TRAIGA', 'Deployer', 'Refrain from uses TRAIGA prohibits; provide disclosures TRAIGA requires'],
          ['CCPA/CPRA', 'Service Provider', 'No sale or sharing of personal information; comply with ADMT obligations as they phase in from Jan 1, 2027'],
          ['GDPR / UK GDPR', 'Processor', 'Process on documented instructions; apply Standard Contractual Clauses where a restricted transfer occurs; support data-subject rights; assist with breach notification'],
        ],
      },
      { type: 'h3', text: '17.2 Processor Obligations' },
      {
        type: 'p',
        text: `Where ${E} processes personal data on Customer's behalf, ${E} shall: (a) process it only on Customer's documented instructions, including these Terms and any Order Form; (b) ensure persons authorized to process it are bound by confidentiality; (c) implement appropriate technical and organizational security measures; (d) engage subprocessors only under written terms no less protective than this Section and remain responsible for their performance; (e) assist Customer in responding to data-subject and consumer-rights requests, which may be directed to ${PRIVACY_EMAIL}; (f) assist Customer, taking into account the nature of the processing and the information available to ${E}, with security obligations, breach notification, and data protection assessments; (g) delete or return personal data at the end of the Subscription Term under Section 8.3; and (h) make available information reasonably necessary to demonstrate compliance with this Section and, on reasonable notice and no more than once per year unless required by a regulator or following a security incident, allow and contribute to audits or inspections conducted by Customer or an independent auditor bound by confidentiality.`,
      },
      { type: 'h3', text: '17.3 Security Incidents' },
      {
        type: 'p',
        text: `Where ${E} is a processor, it will notify Customer without undue delay, and no later than 72 hours, after confirming a security incident affecting personal data, so Customer can meet its own statutory deadlines. All AI processing includes a mandatory HITL checkpoint for any processing that could produce legally significant effects on individuals.`,
      },
      { type: 'h3', text: '17.4 DPA' },
      {
        type: 'p',
        text: `If the parties execute a DPA, the DPA controls over this Section 17 to the extent of any conflict. Absent an executed DPA, this Section 17 constitutes the parties' data-processing agreement.`,
      },
    ],
  },
  {
    number: '18',
    title: 'Service Levels',
    id: 'service-levels',
    blocks: [
      {
        type: 'p',
        text: `${E} targets 99.5% monthly Platform availability, excluding scheduled maintenance and events beyond its reasonable control. Any service-level credits, measurement methodology, and support-response targets applicable to an enterprise engagement are as set out in the applicable Order Form or SLA exhibit. Service-level credits are Customer's exclusive remedy for availability shortfalls.`,
      },
    ],
  },
  {
    number: '19',
    title: 'Term, Suspension, and Termination',
    id: 'termination',
    blocks: [
      { type: 'h3', text: '19.1 Term and Renewal' },
      {
        type: 'p',
        text: `The Subscription Term begins on the Effective Date or the start date in the Order Form and renews automatically for successive periods equal to the initial term unless either party gives 30 days' written notice of non-renewal before the end of the then-current term.`,
      },
      { type: 'h3', text: '19.2 Termination' },
      {
        type: 'p',
        text: `Either party may terminate for material breach uncured after 30 days' written notice. ${E} may suspend or terminate immediately for violations of Section 5.3 (HITL bypass), Section 7 (acceptable use), or Section 8.4 (regulated data), or where continued provision would violate applicable law.`,
      },
      { type: 'h3', text: '19.3 Effect of Termination' },
      {
        type: 'p',
        text: `Upon termination, all rights granted to Customer end, fees accrued through the termination date become due, and Customer has 30 days to export Client Data, after which ${E} will delete or de-identify it in the ordinary course under Section 8.3. Termination for ${E}'s uncured material breach entitles Customer to a refund of pre-paid, unused fees for the remainder of the Subscription Term.`,
      },
    ],
  },
  {
    number: '20',
    title: 'Governing Law and Dispute Resolution',
    id: 'governing-law',
    blocks: [
      { type: 'h3', text: '20.1 Governing Law' },
      {
        type: 'p',
        text: `This Agreement is governed by the laws of the State of ${TERMS_META.governingLaw}, without regard to its conflict-of-laws principles. The Federal Arbitration Act governs the interpretation and enforcement of Section 20.2.`,
      },
      { type: 'h3', text: '20.2 Arbitration' },
      {
        type: 'p',
        text: `Disputes are first addressed through 30 days of good-faith negotiation following written notice. Thereafter, any dispute arising out of or relating to this Agreement, including its formation, scope, or arbitrability, is resolved by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules, before a single arbitrator, seated in ${TERMS_META.arbitrationSeat}. The arbitrator may award any relief a court could award to an individual party. Judgment on the award may be entered in any court of competent jurisdiction.`,
      },
      { type: 'h3', text: '20.3 Carve-Out and Venue' },
      {
        type: 'p',
        text: `Notwithstanding Section 20.2, either party may seek injunctive or other equitable relief, or protect its intellectual-property or confidential information, in a court of competent jurisdiction. Venue for any such court proceeding, and for any action to compel arbitration or enforce an award, is the state or federal courts having jurisdiction over ${TERMS_META.venueCounty}, and each party consents to personal jurisdiction there.`,
      },
      {
        type: 'p',
        strong: true,
        text: 'CLASS ACTION WAIVER: EACH PARTY WAIVES ANY RIGHT TO BRING OR PARTICIPATE IN A CLASS ACTION, COLLECTIVE ACTION, OR REPRESENTATIVE PROCEEDING. ALL DISPUTES SHALL BE RESOLVED ONLY ON AN INDIVIDUAL BASIS.',
      },
      {
        type: 'p',
        strong: true,
        text: 'JURY WAIVER: TO THE EXTENT ANY DISPUTE PROCEEDS IN COURT RATHER THAN ARBITRATION, EACH PARTY KNOWINGLY AND VOLUNTARILY WAIVES ANY RIGHT TO A TRIAL BY JURY.',
      },
    ],
  },
  {
    number: '21',
    title: 'Miscellaneous and General Provisions',
    id: 'general',
    blocks: [
      {
        type: 'ul',
        items: [
          'Entire Agreement and Precedence: These Terms, together with each Order Form, SOW, any executed DPA, and Exhibit A, constitute the entire agreement between the parties and supersede all prior proposals and agreements on the subject. In a conflict, an executed DPA controls for data processing, then the Order Form for its subject matter, then these Terms, then Exhibit A; an Order Form may not expand a party\'s liability beyond Section 14 unless it expressly states that it does.',
          `Amendment: ${E} may modify these Terms with 30 days' notice by posting the revised Terms at the URL where they are published and notifying Customer's account contact. Material changes take effect at the next renewal term unless Customer accepts them earlier.`,
          'Assignment: Neither party may assign this Agreement without the other\'s prior written consent, except that either party may assign it in its entirety, on written notice, to a successor in a merger, acquisition, or sale of all or substantially all of the assets to which this Agreement relates. Any other purported assignment is void.',
          'Force Majeure: Neither party is liable for failure or delay caused by events beyond its reasonable control (excluding payment obligations).',
          'Severability: Invalid provisions are modified to the minimum extent necessary; the remainder continues in full force.',
          'Waiver: No waiver is effective unless in writing, and no failure or delay in exercising a right is a waiver of it.',
          'No Third-Party Beneficiaries: This Agreement confers no rights on any person other than the parties and their permitted successors and assigns.',
          'Independent Contractors: No partnership, joint venture, agency, or employment relationship is created.',
          'Survival: Sections 1.5, 5.3, 8.3, 8.5, 9, 10, 11, 13.2, 13.3, 14, 15, 17, 19.3, 20, 21, and 22 survive expiration or termination of this Agreement.',
          'Counterparts and E-Signatures: Valid under the Texas UETA (Tex. Bus. & Com. Code Ch. 322) and the federal E-SIGN Act.',
        ],
      },
    ],
  },
  {
    number: '22',
    title: 'Contact and Notice Information',
    id: 'contact',
    blocks: [
      {
        type: 'table',
        head: ['Channel', 'Detail'],
        rows: [
          ['Legal notices and billing', CONTACT_EMAIL],
          ['Privacy and data-rights requests', PRIVACY_EMAIL],
          ['Mailing Address for Notices', `${LEGAL_ENTITY}, ${TERMS_META.address}`],
        ],
      },
      {
        type: 'p',
        text: `Legal notices to ${E} must be sent by email to ${CONTACT_EMAIL} with the subject line "Legal Notice" and by certified mail, or another mail service that provides proof of delivery, to the Mailing Address for Notices. Legal notices to Customer may be sent to the email address of Customer's account contact. Notice is deemed received one business day after email transmission without bounce, or on confirmed delivery of a physical copy.`,
      },
    ],
  },
  {
    number: 'A',
    title: 'Exhibit A: AI Policy Guardrails',
    id: 'exhibit-a',
    blocks: [
      {
        type: 'p',
        text: 'This Exhibit A sets the default Policy Guardrails governing AI Agent autonomy. Order Forms may tighten, but not loosen, these defaults.',
      },
      {
        type: 'table',
        head: ['Action Class', 'Autonomy', 'Guardrail / HITL Trigger'],
        rows: [
          ['Research, retrieval, internal drafting', 'Autonomous', 'Output flagged as draft; no external transmission without Human Sign-Off'],
          ['Client Data ingestion / normalization', 'Autonomous', 'Read and normalize only; non-reversible changes require Human Sign-Off'],
          ['Configured internal workflows', 'Autonomous within config', 'Runs only within Customer-approved parameters; escalates on exceptions'],
          ['External communication to third parties', 'Prohibited without sign-off', 'Mandatory Human Sign-Off before any send'],
          ['Financial transactions / commitments', 'Prohibited without sign-off', 'Mandatory Human Sign-Off; no autonomous authorization'],
          ['Regulatory, tax, or compliance filings', 'Prohibited without sign-off', 'Mandatory Human Sign-Off and, where required, licensed professional review'],
          ['User / integration / data-connection onboarding', 'Prohibited without sign-off', 'Mandatory Human Sign-Off by an administrator'],
        ],
      },
      {
        type: 'p',
        text: `Escalation: any AI Agent encountering a Consequential Decision, low-confidence output, or a guardrail conflict must halt and route to an Authorized User for Human Sign-Off. ${E} may update this Exhibit A at any time to tighten a guardrail. Any change that loosens a guardrail is an amendment under Section 21.`,
      },
    ],
  },
];

// Production gate: refuse to build a non-draft page while either fact is unset.
if (!TERMS_IS_DRAFT && (EFFECTIVE_DATE === 'CONFIRM' || !ENTITY_NAME_VERIFIED)) {
  throw new Error(
    'terms-of-service: TERMS_IS_DRAFT is false but EFFECTIVE_DATE or ENTITY_NAME_VERIFIED is unset. Resolve both before production.',
  );
}
