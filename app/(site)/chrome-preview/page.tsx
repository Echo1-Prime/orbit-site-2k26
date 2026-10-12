import type { Metadata } from 'next';
import SiteChrome from '@/components/Site/SiteChrome';

/* TEMPORARY verification fixture for the S1 chrome (not a site page, no public copy).
   Alternating data-band blocks exercise the nav and launcher theme-follow; the block marked
   data-primary-cta exercises launcher tucking. Deleted when the home page lands in S2. */
export const metadata: Metadata = {
  title: 'Chrome preview',
  robots: { index: false, follow: false },
};

const BANDS: { theme: 'dark' | 'light'; label: string; cta?: boolean }[] = [
  { theme: 'dark', label: 'band 1 · dark' },
  { theme: 'light', label: 'band 2 · light' },
  { theme: 'dark', label: 'band 3 · dark', cta: true },
  { theme: 'light', label: 'band 4 · light' },
];

export default function ChromePreview() {
  return (
    <>
      <SiteChrome />
      <main id="main">
        {BANDS.map((b, i) => (
          <section
            key={b.label}
            data-band={b.theme}
            data-theme={b.theme === 'light' ? 'light' : undefined}
            style={{
              minHeight: '80vh',
              padding: '96px clamp(16px,4vw,48px)',
              background: b.theme === 'light' ? 'var(--ao-bg-page)' : 'var(--ao-void)',
              color: 'var(--ao-t0)',
            }}
          >
            <p style={{ fontFamily: 'var(--ao-f-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ao-t1)' }}>
              {b.label}
            </p>
            {b.cta && (
              <div data-primary-cta={`p${i}`} style={{ marginTop: 40, height: 52, width: 260, border: '1px solid var(--ao-orbit-30)', borderRadius: 100 }} />
            )}
          </section>
        ))}
      </main>
    </>
  );
}
