'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackPath } from '@/lib/attribution';

/* Mounted once in the root layout. It remembers the page the visitor came from (in memory only) and pushes a
   dataLayer event when a link to the contact page is clicked, so GTM and GA4 can report which button led there.
   Without consent the push is harmless: Consent Mode keeps analytics storage denied until the visitor accepts. */
export default function Attribution() {
  const pathname = usePathname();

  useEffect(() => {
    trackPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      try {
        const u = new URL(a.href, window.location.href);
        const sameSite = u.host === window.location.host || u.host === 'www.echo1labs.com';
        if (!sameSite || u.pathname !== '/contact') return;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'contact_cta_click',
          cta_source: u.searchParams.get('src') || 'untagged',
          cta_position: u.searchParams.get('cta') || '',
          from_path: window.location.pathname,
        });
      } catch {
        /* an unparseable link is not tracked */
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
