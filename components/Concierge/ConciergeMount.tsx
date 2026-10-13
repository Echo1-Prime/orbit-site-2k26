'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { SUBPAGE_SLUG } from '@/lib/subpage-routes';

// Load the concierge only on the client, after hydration, so it adds ~0 to
// the server-rendered critical path (LCP/TBT). A server component cannot use
// ssr:false, so this thin client wrapper owns the dynamic import.
const Concierge = dynamic(() => import('./Concierge'), { ssr: false });

// The 2K26 home page brings its own chrome (components/Site/SiteChrome), including the
// concierge, so the original concierge is skipped there. The product subpages bring the same chrome.
const SITE_CHROME_PATHS = new Set<string>(['/', ...Object.values(SUBPAGE_SLUG).map((s) => `/${s}`)]);

export default function ConciergeMount() {
  const pathname = usePathname();
  if (SITE_CHROME_PATHS.has(pathname)) return null;
  return <Concierge />;
}
