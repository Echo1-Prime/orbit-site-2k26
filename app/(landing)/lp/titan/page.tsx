import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import LandingPage from '@/components/landing/LandingPage';
import { titanCopy } from '@/lib/landing/titan';
import { faqSchema } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: titanCopy.seoTitle,
  description: titanCopy.seoDesc,
  robots: { index: false, follow: true },
  alternates: { canonical: '/products/titan' },
  openGraph: {
    title: titanCopy.seoTitle,
    description: titanCopy.seoDesc,
    url: new URL('/lp/titan', SITE_URL).toString(),
    type: 'website',
  },
};

export default function TitanLP() {
  return (
    <>
      <JsonLd data={faqSchema(titanCopy.objections)} />
      <LandingPage copy={titanCopy} />
    </>
  );
}
