import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import LandingPage from '@/components/landing/LandingPage';
import { revopsCopy } from '@/lib/landing/revops';
import { faqSchema } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: revopsCopy.seoTitle,
  description: revopsCopy.seoDesc,
  robots: { index: false, follow: true },
  alternates: { canonical: '/products/revops' },
  openGraph: {
    title: revopsCopy.seoTitle,
    description: revopsCopy.seoDesc,
    url: new URL('/lp/revops', SITE_URL).toString(),
    type: 'website',
  },
};

export default function RevOpsLP() {
  return (
    <>
      <JsonLd data={faqSchema(revopsCopy.objections)} />
      <LandingPage copy={revopsCopy} />
    </>
  );
}
