import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import LegalDocument from '@/components/Legal/LegalDocument';
import { REFUND_IS_DRAFT, REFUND_META, REFUND_SECTIONS } from '@/lib/legal/refund-policy';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Refund and Cancellation Policy',
    description: `Refund and cancellation terms for ${REFUND_META.entity} subscriptions and services.`,
    path: '/refund-policy',
  }),
  // Publishes in lockstep with the Terms of Service.
  robots: REFUND_IS_DRAFT ? { index: false, follow: true } : { index: true, follow: true },
};

export default function RefundPolicyPage() {
  const effective =
    REFUND_META.effectiveDate === 'CONFIRM'
      ? 'Effective date to be confirmed'
      : `Effective ${REFUND_META.effectiveDate}`;

  return (
    <LegalDocument
      eyebrow="Legal"
      title={REFUND_META.title}
      meta={[`Version ${REFUND_META.version}`, effective, REFUND_META.entity]}
      versionNote={REFUND_META.versionNote}
      isDraft={REFUND_IS_DRAFT}
      openItems={[]}
      sections={REFUND_SECTIONS}
    />
  );
}
