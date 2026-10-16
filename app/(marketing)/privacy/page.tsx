import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import LegalDocument from '@/components/Legal/LegalDocument';
import {
  PRIVACY_IS_DRAFT,
  PRIVACY_META,
  PRIVACY_OPEN_ITEMS,
  PRIVACY_SECTIONS,
} from '@/lib/legal/privacy-policy';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Privacy Policy',
    description: `How ${PRIVACY_META.entity} collects, uses, and protects data on echo1labs.com and the Platform, including the Orbit concierge.`,
    path: '/privacy',
  }),
  // Held out of the index until counsel clears the text. Flip with PRIVACY_IS_DRAFT.
  robots: PRIVACY_IS_DRAFT ? { index: false, follow: true } : { index: true, follow: true },
};

export default function PrivacyPage() {
  const effective =
    PRIVACY_META.effectiveDate === 'CONFIRM'
      ? 'Effective date to be confirmed'
      : `Effective ${PRIVACY_META.effectiveDate}`;

  return (
    <LegalDocument
      eyebrow="Legal"
      title={PRIVACY_META.title}
      meta={[`Version ${PRIVACY_META.version}`, effective, PRIVACY_META.entity]}
      versionNote={PRIVACY_META.versionNote}
      isDraft={PRIVACY_IS_DRAFT}
      openItems={PRIVACY_OPEN_ITEMS}
      sections={PRIVACY_SECTIONS}
    />
  );
}
