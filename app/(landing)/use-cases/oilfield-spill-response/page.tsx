import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import UseCasePage from '@/components/landing/UseCasePage';
import { oilfieldSpillCopy } from '@/lib/landing/oilfield-spill-response';
import { breadcrumbSchema } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const PATH = '/use-cases/oilfield-spill-response';

export const metadata: Metadata = {
  title: oilfieldSpillCopy.seoTitle,
  description: oilfieldSpillCopy.seoDesc,
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
  openGraph: {
    title: oilfieldSpillCopy.seoTitle,
    description: oilfieldSpillCopy.seoDesc,
    url: new URL(PATH, SITE_URL).toString(),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: oilfieldSpillCopy.seoTitle,
    description: oilfieldSpillCopy.seoDesc,
  },
};

export default function OilfieldSpillUseCase() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Ignition spill response use case', path: PATH },
        ])}
      />
      <UseCasePage copy={oilfieldSpillCopy} />
    </>
  );
}
