import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import LegalDocument from '@/components/Legal/LegalDocument';
import {
  OPEN_ITEMS,
  TERMS_IS_DRAFT,
  TERMS_META,
  TERMS_SECTIONS,
} from '@/lib/legal/terms-of-service';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Terms of Service',
    description: `Terms of Service for the ${TERMS_META.entity} platform.`,
    path: '/terms-of-service',
  }),
  // Held out of the index until counsel clears the text. Flip with TERMS_IS_DRAFT.
  robots: TERMS_IS_DRAFT ? { index: false, follow: true } : { index: true, follow: true },
};

export default function TermsOfServicePage() {
  const effective =
    TERMS_META.effectiveDate === 'CONFIRM'
      ? 'Effective date to be confirmed'
      : `Effective ${TERMS_META.effectiveDate}`;

  return (
    <LegalDocument
      eyebrow="Legal"
      title={TERMS_META.title}
      meta={[
        `Version ${TERMS_META.version}`,
        effective,
        TERMS_META.entity,
        `Governed by ${TERMS_META.governingLaw} law`,
      ]}
      versionNote={TERMS_META.versionNote}
      isDraft={TERMS_IS_DRAFT}
      openItems={OPEN_ITEMS}
      sections={TERMS_SECTIONS}
    />
  );
}
