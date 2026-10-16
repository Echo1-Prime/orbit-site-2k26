import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import UseCasePage from '@/components/landing/UseCasePage';
import { realEstateCopy } from '@/lib/landing/real-estate';
import { breadcrumbSchema } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const PATH = '/use-cases/real-estate-development';

export const metadata: Metadata = {
  title: realEstateCopy.seoTitle,
  description: realEstateCopy.seoDesc,
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
  openGraph: {
    title: realEstateCopy.seoTitle,
    description: realEstateCopy.seoDesc,
    url: new URL(PATH, SITE_URL).toString(),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: realEstateCopy.seoTitle,
    description: realEstateCopy.seoDesc,
  },
};

export default function RealEstateUseCase() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Real estate development use case', path: PATH },
        ])}
      />
      <UseCasePage copy={realEstateCopy} />
    </>
  );
}
