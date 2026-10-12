'use client';

import { useEffect, useRef, useState } from 'react';

export type BandTheme = 'dark' | 'light';

interface ChromeScroll {
  /** Theme of the band under the 52px nav (nav takes the theme of the band beneath it). */
  navTheme: BandTheme;
  /** Theme of the band under the launcher, so the launcher ring flips with it. */
  launcherTheme: BandTheme;
  /** True while the launcher sits over a primary CTA (it tucks away). */
  tucked: boolean;
  /** True once the visitor has scrolled 60% of the page. */
  pastSixty: boolean;
}

/** Reads [data-band] and [data-primary-cta] on scroll (rAF-throttled), as the handoff's
 *  scrollTick does. Bands are marked data-band="dark" | "light". */
export function useChromeScroll(): ChromeScroll {
  const [state, setState] = useState<ChromeScroll>({
    navTheme: 'dark',
    launcherTheme: 'dark',
    tucked: false,
    pastSixty: false,
  });
  const raf = useRef(0);

  useEffect(() => {
    const bandAt = (bands: NodeListOf<Element>, y: number, fallback: BandTheme): BandTheme => {
      for (let i = 0; i < bands.length; i++) {
        const r = bands[i].getBoundingClientRect();
        if (r.top <= y && r.bottom > y) return bands[i].getAttribute('data-band') === 'light' ? 'light' : 'dark';
      }
      return fallback;
    };

    const tick = () => {
      raf.current = 0;
      const bands = document.querySelectorAll('[data-band]');
      const navTheme = bandAt(bands, 26, 'dark');
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pastSixty = max > 0 && window.scrollY / max >= 0.6;

      let tucked = false;
      let launcherTheme: BandTheme = 'dark';
      const launcher = document.querySelector('.ao-launcher');
      if (launcher) {
        const lr = launcher.getBoundingClientRect();
        launcherTheme = bandAt(bands, lr.top + lr.height / 2, 'dark');
        document.querySelectorAll('[data-primary-cta]').forEach((c) => {
          const r = c.getBoundingClientRect();
          if (r.width && !(r.right < lr.left - 12 || r.left > lr.right + 12 || r.bottom < lr.top - 12 || r.top > lr.bottom + 12)) tucked = true;
        });
      }

      setState((s) =>
        s.navTheme === navTheme && s.launcherTheme === launcherTheme && s.tucked === tucked && s.pastSixty === pastSixty
          ? s
          : { navTheme, launcherTheme, tucked, pastSixty },
      );
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const t = window.setTimeout(tick, 300);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(t);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return state;
}
