import type { Metadata } from 'next';
import { COLORS, TYPE_SCALE, RADIUS, SPACING, LOGO_FILES } from '@/lib/brand/tokens';

export const metadata: Metadata = {
  title: { absolute: 'Brand Kit — Echo 1 Labs' },
  description: 'Internal brand reference: color system, type scale, spacing, radius, and canonical logo files.',
  robots: { index: false, follow: false },
};

function Swatch({ hex, name, token, note }: { hex: string; name: string; token: string; note: string }) {
  const isRgba = hex.startsWith('rgba');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div
        style={{
          width: '100%',
          height: '64px',
          borderRadius: '10px',
          background: hex,
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      />
      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text)' }}>{name}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{isRgba ? hex : hex}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{token}</div>
      <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{note}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '5rem' }}>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--solar)' }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function BrandKitPage() {
  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', color: 'var(--text)' }}>
      {/* Slim header */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '1.25rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          background: 'var(--void)',
          zIndex: 10,
        }}
      >
        <img src="/echo1-e1-mark.svg" alt="" width={28} height={28} aria-hidden="true" />
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Brand Kit</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: 'auto' }}>Internal reference · noindex</span>
      </div>

      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '4rem 2.5rem 8rem' }}>

        <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Echo 1 Labs Brand Kit
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '4rem', maxWidth: '520px' }}>
          Canonical reference for colors, typography, spacing, radius, and logo assets. Derived from <code>lib/brand/tokens.ts</code>.
        </p>

        {/* ── 1. Logo Identity ── */}
        <Section title="01 · Logo Identity">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {LOGO_FILES.map((logo) => (
              <div key={logo.file} style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: logo.file.includes('voidblack') ? '#f0ede8' : '#0A0A0E', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
                  {logo.file.endsWith('.svg') ? (
                    <img src={logo.file} alt={logo.label} style={{ width: '48px', height: '48px' }} />
                  ) : (
                    <img src={logo.file} alt={logo.label} style={{ maxWidth: '200px', maxHeight: '60px', objectFit: 'contain' }} />
                  )}
                </div>
                <div style={{ padding: '1rem', background: 'var(--void-card)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>{logo.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'monospace', marginBottom: '0.25rem' }}>{logo.file}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{logo.use}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 2. Color System ── */}
        <Section title="02 · Color System">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Neutrals */}
            <div>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Neutrals</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.25rem' }}>
                {COLORS.neutrals.map((c) => <Swatch key={c.token} {...c} />)}
              </div>
            </div>
            {/* Primaries */}
            <div>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Primaries</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.25rem' }}>
                {COLORS.primaries.map((c) => <Swatch key={c.token} {...c} />)}
              </div>
            </div>
            {/* Semantic */}
            <div>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Semantic</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.25rem' }}>
                {COLORS.semantic.map((c) => <Swatch key={c.token} {...c} />)}
              </div>
            </div>
            {/* Mark-only */}
            <div>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E9A84C', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Mark-only · Do not use in UI</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.25rem', opacity: 0.7 }}>
                {COLORS.markOnly.map((c) => <Swatch key={c.token} {...c} />)}
              </div>
            </div>
          </div>
        </Section>

        {/* ── 3. Typography ── */}
        <Section title="03 · Typography">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {TYPE_SCALE.map((t) => (
              <div key={t.class} style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <p className={t.class} style={{ margin: 0 }}>The Business Lifecycle Company</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <code style={{ fontSize: '0.8rem', color: 'var(--solar)' }}>.{t.class}</code>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{t.size} · w{t.weight}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{t.use}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 4. Radius ── */}
        <Section title="04 · Radius">
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {RADIUS.map((r) => (
              <div key={r.token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    background: 'var(--void-card)',
                    border: '2px solid var(--solar)',
                    borderRadius: r.value,
                  }}
                />
                <code style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{r.name}</code>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{r.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 5. Spacing ── */}
        <Section title="05 · Spacing">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {SPACING.map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: `${s}px`, height: `${s}px`, background: 'var(--solar)', opacity: 0.7, borderRadius: '2px' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 6. Cards ── */}
        <Section title="06 · Card Modes">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div className="card">
              <div className="card__title">Default card</div>
              <p className="card__desc">Used on dark backgrounds. Border and `--void-card` background.</p>
            </div>
            <div className="card" style={{ background: 'var(--surface)' }}>
              <div className="card__title">Elevated surface</div>
              <p className="card__desc">Use `--surface` for a second level of elevation above `--void-card`.</p>
            </div>
            <div className="card" style={{ borderColor: 'var(--solar)', boxShadow: '0 0 0 1px var(--solar)' }}>
              <div className="card__title">Highlighted card</div>
              <p className="card__desc">Solar border for featured / recommended state.</p>
            </div>
          </div>
        </Section>

        {/* ── 7. Components ── */}
        <Section title="07 · Buttons">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#" className="btn btn--primary">Primary</a>
            <a href="#" className="btn btn--secondary">Secondary</a>
            <a href="#" className="btn btn--ghost">Ghost</a>
            <a href="#" className="btn btn--primary btn--sm">Primary sm</a>
            <a href="#" className="btn btn--ghost btn--sm">Ghost sm</a>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="stage-badge">ENABLE</span>
            <span className="stage-badge">FIND</span>
            <span className="stage-badge" style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.25)' }}>Violet badge</span>
            <span className="stage-badge" style={{ background: 'rgba(255,117,21,0.12)', color: '#FF7515', border: '1px solid rgba(255,117,21,0.25)' }}>Solar badge</span>
          </div>
        </Section>

        {/* ── 8. Avatar ── */}
        <Section title="08 · Orbit Avatar">
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Agent presence note */}
            <div style={{ maxWidth: '400px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                The <strong style={{ color: 'var(--text)' }}>Orbit agent presence</strong> is rendered via <code style={{ color: 'var(--solar)' }}>components/OrbitAvatar/</code>. Current variant: <code style={{ color: 'var(--solar)' }}>Atom</code>.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '0.75rem', lineHeight: 1.6 }}>
                The <strong style={{ color: 'var(--text)' }}>E¹ brand mark</strong> (header, footer, favicon) is always <code style={{ color: 'var(--solar)' }}>echo1-e1-mark.svg</code> — it is never replaced by the agent presence component.
              </p>
            </div>
            {/* Side-by-side: mark vs agent */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <img src="/echo1-e1-mark.svg" alt="E¹ mark" width={48} height={48} />
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>E¹ mark (brand)</span>
              </div>
              <div style={{ width: '1px', height: '60px', background: 'var(--border)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <img src="/brand/orbit-flame.webp" alt="Orbit flame" width={48} height={48} style={{ borderRadius: '50%' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Agent presence (poster)</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 9. Token Reference ── */}
        <Section title="09 · CSS Token Reference">
          <div style={{ background: 'var(--void-card)', borderRadius: '12px', padding: '1.5rem', overflow: 'auto' }}>
            <pre style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{`/* Neutrals */
--void:          #0A0A0E   /* Page bg */
--void-card:     #111118   /* Card bg */
--surface:       #1A1A24   /* Elevated */
--border:        rgba(255,255,255,0.10)
--muted:         rgba(255,255,255,0.50)
--text:          #FFFFFF

/* Primaries */
--solar:         #FF7515   /* Primary CTA accent */
--blue:          #274578   /* Brand blue */
--violet:        #8B5CF6   /* Secondary accent */
--violet-deep:   #7C3AED   /* Small-text violet */

/* Semantic */
--success:       #22C55E
--warning:       #E9A84C
--info:          var(--blue)

/* MARK-ONLY — not for UI */
--purple:        #655596
--sage:          #6B7E8B

/* Radius */
--radius-xs:     4px   --radius-sm:  6px
--radius-md:     10px  --radius-lg:  12px
--radius-xl:     16px  --radius-2xl: 20px
--radius-full:   999px

/* Other */
--nav-h:         64px
--tracking-widest: 0.18em`}</pre>
          </div>
        </Section>

      </div>
    </div>
  );
}
