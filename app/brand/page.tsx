import type { Metadata } from 'next';
import OrbitAvatar from '@/components/OrbitAvatar/OrbitAvatar';
import { Button, Badge, Card, HudCard, Kpi, StateDot, Eyebrow, Callout } from '@/components/ds';

export const metadata: Metadata = {
  title: 'Orbit Agent Design System',
  description: 'Echo 1 Labs — the canonical Orbit Agent design language.',
  robots: { index: false, follow: false },
};

const COLORS = [
  ['--oa-void', '#0A111E', 'Page canvas, input wells'],
  ['--oa-panel', '#101B2E', 'Cards, surfaces, nav'],
  ['--oa-raised', '#1A2C44', 'Hover / elevated layers'],
  ['--oa-steel', '#2E4E74', 'Borders, grid lines, 2nd rings'],
  ['--oa-slate', '#6C87A6', 'Secondary text, idle dots'],
  ['--oa-ion', '#8FD0F2', 'Interactive, links, focus, rings'],
  ['--oa-ice', '#C9EAFB', 'Highlights, electron dots'],
  ['--oa-white', '#EAF6FF', 'Primary text, triangle stroke'],
  ['--oa-ember', '#E07B27', 'Energy accent, override, arcs'],
  ['--oa-amber', '#F2A23F', 'Deltas, warnings, thinking'],
] as const;

const TYPE = [
  ['Space Grotesk', 'var(--oa-font-display)', 'Display, headings, KPI numerals, wordmark — 700, −0.03em'],
  ['DM Sans', 'var(--oa-font-body)', 'Body, labels, controls, table data — 1.5 line-height at 13px'],
  ['JetBrains Mono', 'var(--oa-font-mono)', 'Telemetry, coordinates, hex, eyebrow labels — 0.32em'],
] as const;

const section: React.CSSProperties = { padding: '56px clamp(20px,5vw,64px)', borderTop: '1px solid var(--oa-border-subtle)' };
const grid = (min: number): React.CSSProperties => ({ display: 'grid', gap: 16, gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))` });

export default function BrandPage() {
  return (
    <div className="oa-root" style={{ minHeight: '100vh', background: 'var(--oa-void)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px clamp(20px,5vw,64px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <OrbitAvatar size="sm" state="idle" />
          <span style={{ fontFamily: 'var(--oa-font-display)', fontWeight: 700, letterSpacing: '0.04em', fontSize: 15 }}>
            ECHO <span style={{ color: 'var(--oa-ember)' }}>1</span> LABS
          </span>
        </div>
        <Badge tone="muted">Internal reference · noindex</Badge>
      </header>

      <div style={{ ...section, borderTop: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 32, alignItems: 'center' }}>
        <div>
          <Eyebrow tone="ion">Echo 1 Labs · v1.0 · 2026-07-17</Eyebrow>
          <h1 style={{ fontFamily: 'var(--oa-font-display)', fontWeight: 700, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: '10px 0 12px' }}>
            Orbit Agent Design System
          </h1>
          <p style={{ color: 'var(--oa-text-secondary)', maxWidth: '52ch', lineHeight: 1.6 }}>
            Intelligence in orbital motion. A reverse-triangle core inside three counter-rotating
            rings — the atomic model behind every color, type, motion, and spacing decision.
          </p>
        </div>
        <div style={{ display: 'grid', placeItems: 'center', width: 200, height: 200 }}>
          <OrbitAvatar size="hero" state="listening" />
        </div>
      </div>

      <section style={section}>
        <Eyebrow>01 · Color Palette</Eyebrow>
        <div style={{ ...grid(180), marginTop: 20 }}>
          {COLORS.map(([token, hex, role]) => (
            <Card key={token}>
              <div style={{ height: 56, borderRadius: 6, background: `var(${token})`, border: '1px solid var(--oa-border-subtle)', marginBottom: 12 }} />
              <div style={{ fontFamily: 'var(--oa-font-mono)', fontSize: 11, color: 'var(--oa-ion)' }}>{token}</div>
              <div style={{ fontFamily: 'var(--oa-font-mono)', fontSize: 11, color: 'var(--oa-slate)', marginTop: 2 }}>{hex}</div>
              <div style={{ fontSize: 12, color: 'var(--oa-text-secondary)', marginTop: 8, lineHeight: 1.5 }}>{role}</div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge tone="ion">Perception — ion / ice / slate</Badge>
          <Badge tone="ember">Energy — ember / amber</Badge>
          <Badge tone="muted">Void — navy / panel / raised / steel</Badge>
        </div>
      </section>

      <section style={section}>
        <Eyebrow>02 · Typography</Eyebrow>
        <div style={{ ...grid(280), marginTop: 20 }}>
          {TYPE.map(([name, family, role]) => (
            <Card key={name}>
              <div style={{ fontFamily: family, fontSize: 34, fontWeight: 600, letterSpacing: '-0.01em' }}>{name}</div>
              <div style={{ fontSize: 12, color: 'var(--oa-text-secondary)', marginTop: 10, lineHeight: 1.5 }}>{role}</div>
            </Card>
          ))}
        </div>
      </section>

      <section style={section}>
        <Eyebrow>03 · Component Library</Eyebrow>
        <div style={{ ...grid(300), marginTop: 20 }}>
          <Card>
            <div style={{ fontFamily: 'var(--oa-font-display)', fontWeight: 600, marginBottom: 14 }}>Buttons</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="ember">Override</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </Card>
          <Card>
            <div style={{ fontFamily: 'var(--oa-font-display)', fontWeight: 600, marginBottom: 14 }}>Badges &amp; state dots</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              <Badge tone="ion">Online</Badge>
              <Badge tone="ember">Live</Badge>
              <Badge tone="success">Ready</Badge>
              <Badge tone="error">Error</Badge>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontFamily: 'var(--oa-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--oa-slate)' }}>
              <span><StateDot state="idle" /> idle</span>
              <span><StateDot state="listening" /> listening</span>
              <span><StateDot state="thinking" /> thinking</span>
              <span><StateDot state="streaming" /> streaming</span>
            </div>
          </Card>
          <HudCard>
            <div style={{ fontFamily: 'var(--oa-font-mono)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--oa-ember)', textTransform: 'uppercase' }}>HUD Card</div>
            <div style={{ marginTop: 10, color: 'var(--oa-text-secondary)', fontSize: 13, lineHeight: 1.5 }}>
              Corner tick brackets, 25% cyan hairline, 6px backdrop blur. The signature telemetry frame.
            </div>
          </HudCard>
          <Kpi label="Agent throughput" value="1,284" delta="▲ 12.4%" deltaTone="positive" />
          <Card>
            <div style={{ fontFamily: 'var(--oa-font-display)', fontWeight: 600, marginBottom: 14 }}>Input</div>
            <input className="oa-input" placeholder="Where does it feel stuck?" />
          </Card>
          <Callout>Ember left-border callout — telemetry / system note.</Callout>
        </div>
      </section>

      <section style={section}>
        <Eyebrow>04 · Motion — the Orbit Agent core</Eyebrow>
        <p style={{ color: 'var(--oa-text-secondary)', maxWidth: '60ch', marginTop: 10, lineHeight: 1.6 }}>
          Three counter-rotating rings — ion-cyan 14s CW, ember 22s CCW, pale dashed 30s CW — around a
          reverse-triangle core (outer cyan glow → white stroke → mid ring → inner ember pulse). Ring
          period is state-driven; all motion is CSS transform-only with a reduced-motion freeze.
        </p>
        <div style={{ display: 'flex', gap: 40, marginTop: 24, flexWrap: 'wrap' }}>
          {(['idle', 'listening', 'thinking', 'speaking'] as const).map((s) => (
            <div key={s} style={{ textAlign: 'center' }}>
              <div style={{ width: 110, height: 110, display: 'grid', placeItems: 'center' }}>
                <OrbitAvatar size="md" state={s} />
              </div>
              <div style={{ fontFamily: 'var(--oa-font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--oa-slate)', marginTop: 8 }}>{s}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
