import type { Metadata } from 'next';
import HomeBands from '@/components/Home/HomeBands';
import SiteChrome from '@/components/Site/SiteChrome';

/* Logistics demo landing: the home hero (Login + Call Dispatch Agent) and the seven-stage lifecycle band. */
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Logistics Demo',
  description: 'Echo 1 Labs logistics demo. Log in to the demo or call the dispatch agent.',
  alternates: { canonical: '/logistics-demo' },
  robots: { index: false, follow: false },
};

export default function LogisticsDemoPage() {
  return (
    <>
      <SiteChrome />
      <main id="main">
        <HomeBands variant="trucking" />
      </main>
    </>
  );
}
