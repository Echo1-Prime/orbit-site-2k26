import type { Metadata } from 'next';
import Link from 'next/link';
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
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 16px clamp(3rem, 7vw, 5rem)' }}>
            <h2 style={{ margin: '0 0 0.75rem', fontFamily: 'var(--e1-font-display)', fontSize: 'clamp(1.5rem, 3.4vw, 2.1rem)', fontWeight: 700, color: 'var(--e1-white)' }}>
              See where this fits your business.
            </h2>
            <Link href="/contact?src=case-studies&cta=band" className="btn btn--primary">
              Contact Sales
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
