'use client';

import dynamic from 'next/dynamic';

// Load the concierge only on the client, after hydration, so it adds ~0 to
// the server-rendered critical path (LCP/TBT). A server component cannot use
// ssr:false, so this thin client wrapper owns the dynamic import.
const Concierge = dynamic(() => import('./Concierge'), { ssr: false });

export default function ConciergeMount() {
  return <Concierge />;
}
