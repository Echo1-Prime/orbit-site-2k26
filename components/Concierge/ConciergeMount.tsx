'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Load the concierge only on the client, after hydration, so it adds ~0 to
// the server-rendered critical path (LCP/TBT). A server component cannot use
// ssr:false, so this thin client wrapper owns the dynamic import.
const Concierge = dynamic(() => import('./Concierge'), { ssr: false });

// The 2K26 home page brings its own chrome (components/Site/SiteChrome), including the
// concierge, so the original concierge is skipped there.
export default function ConciergeMount() {
  const pathname = usePathname();
  if (pathname === '/' || pathname === '/chrome-preview') return null;
  return <Concierge />;
}
