import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import UseCasePage from '@/components/landing/UseCasePage';
import { trackYourJobsIn3dCopy } from '@/lib/landing/track-your-jobs-in-3d';
import { breadcrumbSchema } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const PATH = '/use-cases/track-your-jobs-in-3d';

export const metadata: Metadata = {
  title: trackYourJobsIn3dCopy.seoTitle,
  description: trackYourJobsIn3dCopy.seoDesc,
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
  openGraph: {
    title: trackYourJobsIn3dCopy.seoTitle,
    description: trackYourJobsIn3dCopy.seoDesc,
    url: new URL(PATH, SITE_URL).toString(),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: trackYourJobsIn3dCopy.seoTitle,
    description: trackYourJobsIn3dCopy.seoDesc,
  },
};

export default function TrackYourJobsIn3dUseCase() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Track your jobs in 3D use case', path: PATH },
        ])}
      />
      <UseCasePage copy={trackYourJobsIn3dCopy} />
    </>
  );
}
