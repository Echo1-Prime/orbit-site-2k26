import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import UseCasePage from '@/components/landing/UseCasePage';
import { crudeTreatingCopy } from '@/lib/landing/crude-treating';
import { breadcrumbSchema } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const PATH = '/use-cases/how-crude-treating-works';

export const metadata: Metadata = {
  title: crudeTreatingCopy.seoTitle,
  description: crudeTreatingCopy.seoDesc,
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
  openGraph: {
    title: crudeTreatingCopy.seoTitle,
    description: crudeTreatingCopy.seoDesc,
    url: new URL(PATH, SITE_URL).toString(),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: crudeTreatingCopy.seoTitle,
    description: crudeTreatingCopy.seoDesc,
  },
};

export default function CrudeTreatingUseCase() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'How crude treating works', path: PATH },
        ])}
      />
      <UseCasePage copy={crudeTreatingCopy} />
    </>
  );
}
