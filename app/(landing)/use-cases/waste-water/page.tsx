import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import UseCasePage from '@/components/landing/UseCasePage';
import { wasteWaterCopy } from '@/lib/landing/waste-water';
import { breadcrumbSchema } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const PATH = '/use-cases/waste-water';

export const metadata: Metadata = {
  title: wasteWaterCopy.seoTitle,
  description: wasteWaterCopy.seoDesc,
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
  openGraph: {
    title: wasteWaterCopy.seoTitle,
    description: wasteWaterCopy.seoDesc,
    url: new URL(PATH, SITE_URL).toString(),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: wasteWaterCopy.seoTitle,
    description: wasteWaterCopy.seoDesc,
  },
};

export default function WasteWaterUseCase() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Waste water use case', path: PATH },
        ])}
      />
      <UseCasePage copy={wasteWaterCopy} />
    </>
  );
}
