import type { Metadata } from 'next';
import SiteChrome from '@/components/Site/SiteChrome';
import { UseCaseShowcase } from '@/components/UseCaseShowcase';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const PATH = '/case-studies';
const TITLE = 'Case studies';
const DESC =
  'Real use cases with the names removed: trucking, oil and gas, waste water, crude treating, real estate development and construction. Open a card to walk the demo.';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESC, url: new URL(PATH, SITE_URL).toString(), siteName: SITE_NAME, type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

export default function CaseStudiesPage() {
  return (
    <>
      <SiteChrome />
      <main id="main">
        <div data-band="dark" style={{ background: 'var(--ao-void)', paddingTop: 'clamp(4rem, 9vw, 6rem)' }}>
          <UseCaseShowcase heading="Case studies" intro="Real use cases, with the names removed. Open Expand on a card for what comes in and what the agent does." />
        </div>
      </main>
    </>
  );
}
