import type { Metadata } from 'next';
import HomeBands from '@/components/Home/HomeBands';
import SiteChrome from '@/components/Site/SiteChrome';

/* Trucking demo landing: the home hero (Login + Call Dispatch Agent) and the seven-stage lifecycle band. */
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Trucking Demo',
  description: 'Echo 1 Labs trucking demo. Log in to the demo or call the dispatch agent.',
  alternates: { canonical: '/trucking-demo' },
  robots: { index: false, follow: false },
};

export default function TruckingDemoPage() {
  return (
    <>
      <SiteChrome />
      <main id="main">
        <HomeBands variant="trucking" />
      </main>
    </>
  );
}
