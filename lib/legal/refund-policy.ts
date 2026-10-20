// Refund and Cancellation Policy for echo1labs.com.
// Rendered by app/(marketing)/refund-policy/page.tsx.
//
// This page creates no new obligations. Every refund right below is
// restated from the Terms of Service (lib/legal/terms-of-service.ts) with
// its section number, and the Terms control on any conflict. If a Terms
// section changes, update this page in the same commit.
//
// It publishes in lockstep with the Terms: it shares TERMS_IS_DRAFT and the
// Terms effective date.

import { BILLING_EMAIL, LEGAL_ENTITY, POSTAL_ADDRESS, SITE_URL } from '@/lib/site';
import { TERMS_IS_DRAFT, TERMS_META } from './terms-of-service';
import type { LegalSection } from './types';

export const REFUND_IS_DRAFT = TERMS_IS_DRAFT;

export const REFUND_META = {
  title: 'Refund and Cancellation Policy',
  version: '1.0',
  effectiveDate: TERMS_META.effectiveDate,
  entity: LEGAL_ENTITY,
  termsUrl: `${SITE_URL}/terms-of-service`,
  versionNote:
    'This policy summarizes the refund and cancellation terms in our Terms of Service. If this page and the Terms of Service or a signed Order Form differ, the Order Form controls first and the Terms of Service second.',
} as const;

const E = 'Echo 1 Labs';

export const REFUND_SECTIONS: LegalSection[] = [
  {
    number: '01',
    title: 'Overview',
    id: 'overview',
    blocks: [
      {
        type: 'p',
        text: `${LEGAL_ENTITY} provides business software subscriptions and related services under our Terms of Service at ${SITE_URL}/terms-of-service and the applicable Order Form. Fees are billed as stated in the Order Form and processed through our third-party payment processor.`,
      },
      {
        type: 'p',
        strong: true,
        text: 'Except as stated in Section 02 below, fees are non-refundable (Terms of Service, Section 9).',
      },
    ],
  },
  {
    number: '02',
    title: 'When You Receive a Refund',
    id: 'refunds',
    blocks: [
      {
        type: 'p',
        text: 'You receive a refund of pre-paid, unused fees for the remainder of the Subscription Term in each of these cases:',
      },
      {
        type: 'ul',
        items: [
          `Our breach. You terminate because ${E} committed a material breach and did not cure it within 30 days of your written notice (Sections 19.2 and 19.3).`,
          `Loss of core functionality. ${E} retires a feature or model in a way that materially reduces the Platform's core functionality for you, offers no substantially equivalent replacement, and you terminate the affected subscription on written notice within 30 days after the change takes effect (Section 3.5).`,
          'Changes to key terms. We change Section 14 (Limitation of Liability) or Section 20 (Governing Law and Dispute Resolution) to your detriment, and you terminate the affected subscription on written notice within 30 days after our notice (Section 21).',
          'Subprocessor objection. You object to a new subprocessor on reasonable data protection grounds, we cannot resolve the objection, and you terminate the affected subscription (Exhibit C).',
          `Infringement. ${E} terminates an affected subscription because the Platform is or may be enjoined for infringement (Section 15.2).`,
        ],
      },
      {
        type: 'p',
        text: 'If any charge would exceed the maximum lawful rate, the excess is credited against amounts owed or refunded (Section 9.3). Where applicable law requires a refund in a case not listed here, we follow the law.',
      },
    ],
  },
  {
    number: '03',
    title: 'What Is Not Refundable',
    id: 'non-refundable',
    blocks: [
      {
        type: 'ul',
        items: [
          'Fees for the current Subscription Term when you cancel or choose not to renew. Your access continues through the end of the term you paid for.',
          'Prepaid usage credits ("Operations" or similar). Credits have no cash value and are not refundable except as the Terms of Service or applicable law require (Section 9.1).',
          'Fees accrued through a termination date, which become due on termination (Section 19.3).',
        ],
      },
    ],
  },
  {
    number: '04',
    title: 'Cancellation and Non-Renewal',
    id: 'cancellation',
    blocks: [
      {
        type: 'p',
        text: `Subscriptions renew automatically for successive periods equal to the initial term. To stop a renewal, give written notice of non-renewal at least 30 days before the end of the current term (Section 19.1). Send notice to ${BILLING_EMAIL}.`,
      },
      {
        type: 'p',
        text: `After a subscription ends, you have 30 days to export your Client Data (Section 19.3).`,
      },
    ],
  },
  {
    number: '05',
    title: 'Returns',
    id: 'returns',
    blocks: [
      {
        type: 'p',
        text: `${E} sells software subscriptions and services. We do not sell or ship physical goods, so there is nothing to return.`,
      },
    ],
  },
  {
    number: '06',
    title: 'How to Request a Refund',
    id: 'request',
    blocks: [
      {
        type: 'p',
        text: `Email ${BILLING_EMAIL} with your company name, the invoice number, and the reason for the request. The same address handles billing errors. Approved refunds are issued to the original payment method through our payment processor.`,
      },
    ],
  },
  {
    number: '07',
    title: 'Contact',
    id: 'contact',
    blocks: [
      {
        type: 'ul',
        items: [`Billing: ${BILLING_EMAIL}`, `Mail: ${LEGAL_ENTITY}, ${POSTAL_ADDRESS}`],
      },
    ],
  },
];
