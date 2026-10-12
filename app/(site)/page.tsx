import HomeBands from '@/components/Home/HomeBands';
import SiteChrome from '@/components/Site/SiteChrome';

/* The 2K26 home page: nine bands from the design handoff, with the use-case showcase row
   directly below the hero. Page metadata comes from the root layout. */
export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <SiteChrome />
      <main id="main">
        <HomeBands />
      </main>
    </>
  );
}
