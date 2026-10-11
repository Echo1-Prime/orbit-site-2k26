import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import UseCasePage from '@/components/landing/UseCasePage';
import { truckingCopy } from '@/lib/landing/trucking';
import { breadcrumbSchema } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const PATH = '/use-cases/trucking';

export const metadata: Metadata = {
  title: truckingCopy.seoTitle,
  description: truckingCopy.seoDesc,
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
  openGraph: {
    title: truckingCopy.seoTitle,
    description: truckingCopy.seoDesc,
    url: new URL(PATH, SITE_URL).toString(),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: truckingCopy.seoTitle,
    description: truckingCopy.seoDesc,
  },
};

export default function TruckingUseCase() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Trucking use case', path: PATH },
        ])}
      />
      <UseCasePage copy={truckingCopy} />
    </>
  );
}
