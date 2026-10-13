import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import UseCasePage from '@/components/landing/UseCasePage';
import { oilAndGasCopy } from '@/lib/landing/oil-and-gas';
import { breadcrumbSchema } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const PATH = '/use-cases/oil-and-gas';

export const metadata: Metadata = {
  title: oilAndGasCopy.seoTitle,
  description: oilAndGasCopy.seoDesc,
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
  openGraph: {
    title: oilAndGasCopy.seoTitle,
    description: oilAndGasCopy.seoDesc,
    url: new URL(PATH, SITE_URL).toString(),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: oilAndGasCopy.seoTitle,
    description: oilAndGasCopy.seoDesc,
  },
};

export default function OilAndGasUseCase() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Oil and Gas use case', path: PATH },
        ])}
      />
      <UseCasePage copy={oilAndGasCopy} />
    </>
  );
}
