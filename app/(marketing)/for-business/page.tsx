import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import { Eyebrow, ButtonLink, Badge } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'For Owner-Led Businesses',
  description:
    'The BLM OS is built for owner-led businesses between $5M and $100M in revenue. The operator supervises. Agents execute. Here is how it applies to your business.',
  path: '/for-business',
});

const PROFILE = [
  { label: 'Revenue', value: '$5M to $100M' },
  { label: 'Headcount', value: '50 to 200 employees' },
  { label: 'Structure', value: 'Owner retains operational authority' },
  { label: 'Common gap', value: 'No dedicated RevOps, marketing ops, or finance ops team' },
];

const USE_CASES = [
  {
    title: 'The operator is the bottleneck.',
    body: 'Growth stalls because every decision, every outreach, every report waits on the owner or a small senior team. The BLM OS shifts the model: agents run the execution track, the operator runs the decision track. Volume moves without expanding headcount.',
    layers: ['Engine', 'RevOps', 'Prime'],
  },
  {
    title: 'Your pipeline dries up the week your top rep is traveling.',
    body: 'Prospecting happens when someone has time. Cadences break when someone is traveling. Qualification is inconsistent between reps. Engine and RevOps run outreach on schedule, score every lead on entry, and surface pipeline exceptions when they happen — not when someone checks.',
    layers: ['Engine', 'RevOps'],
  },
  {
    title: 'Marketing runs on bandwidth, not on a calendar.',
    body: 'Content gets produced when someone has time and killed when they don\'t. Broadcast generates briefs on the configured calendar, routes them for approval, and publishes drafts on cadence. The operator approves the brief, not the execution.',
    layers: ['Broadcast'],
  },
  {
    title: "Invoices sit in someone's inbox until the vendor calls.",
    body: 'Incoming contracts sit until someone reads them. Invoices are matched manually. Titan classifies and routes documents on arrival, extracts structured data, and flags exceptions — contracts with unusual terms, invoices without matching POs — for review.',
    layers: ['Titan'],
  },
  {
    title: 'Finance visibility is a month-end event.',
    body: 'Cash flow and reconciliation are things you find out about at the end of the month. Ledger runs daily reconciliation against QuickBooks, monitors cash position, routes AP approvals, and surfaces anomalies before they compound. Coming soon.',
    layers: ['Ledger · Coming Soon'],
  },
  {
    title: 'Every decision lives in email threads no one can find.',
    body: 'Every major decision lives in email or the owner\'s head. Prime maintains a structured record of agent activity and operator decisions, compiles the daily briefing, and surfaces exceptions as they arise — so the operator has a running account of what is running and what needs attention.',
    layers: ['Prime'],
  },
];

const LAYERS = [
  { name: 'Engine', num: '01', desc: 'Go-to-market: ICP prospecting, outreach sequencing, pipeline velocity' },
  { name: 'RevOps', num: '02', desc: 'Revenue operations: lead scoring, forecast, CRM hygiene' },
  { name: 'Broadcast', num: '03', desc: 'Marketing: content briefs, drafting, scheduling, performance' },
  { name: 'Ledger', num: '04', desc: 'Finance ops: reconciliation, AP routing, cash flow — coming soon', comingSoon: true },
  { name: 'Titan', num: '05', desc: 'Document intelligence: classification, extraction, invoice matching' },
  { name: 'Signal', num: '06', desc: 'Market intelligence: PE-backed businesses, capital allocators — private access', private: true },
  { name: 'Prime', num: '07', desc: 'Governance: daily briefing, exception queue, approval gates' },
];

export default function ForBusinessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'For Business', path: '/for-business' },
        ])}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <Eyebrow>Who It Is For</Eyebrow>
              <h1 className="display-lg" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                Built for owner-led businesses.
              </h1>
              <p className="body-lg" style={{ marginBottom: '1.5rem' }}>
                The BLM OS is built for businesses where the owner still runs operations. Not because
                they want to — because the systems that would let them step back do not exist yet.
              </p>
              <p className="body-md" style={{ marginBottom: '2rem' }}>
                The operator does not disappear. They shift from running execution to supervising it.
                Agents handle volume. The operator handles decisions.
              </p>
              <ButtonLink href="/founding-cohort" variant="ember">
                Apply for Founding Cohort
              </ButtonLink>
            </div>

            <div className="card" style={{ padding: '1.5rem 2rem' }}>
              <p
                style={{
                  fontFamily: 'var(--oa-font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--oa-ember)',
                  marginBottom: '1.25rem',
                }}
              >
                Target Profile
              </p>
              <div className="stack" style={{ gap: '1rem' }}>
                {PROFILE.map((p) => (
                  <div key={p.label} style={{ borderBottom: '1px solid var(--oa-border-subtle)', paddingBottom: '1rem' }}>
                    <p
                      style={{
                        fontFamily: 'var(--oa-font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--oa-text-muted)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {p.label}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--oa-font-display)',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: 'var(--oa-white)',
                        margin: 0,
                      }}
                    >
                      {p.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All seven layers */}
      <section
        className="section"
        style={{ background: 'var(--oa-panel)', borderTop: '1px solid var(--oa-border-subtle)' }}
      >
        <div className="container">
          <div className="section-header">
            <Eyebrow>The Seven Layers</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem' }}>
              Modular. Start where the friction is.
            </h2>
            <p className="body-md" style={{ maxWidth: '520px', marginTop: '0.75rem' }}>
              Every tier includes Prime. Add the layers that match your current operational stage.
            </p>
          </div>
          <div className="stack" style={{ gap: '0.5rem', maxWidth: '780px' }}>
            {LAYERS.map((layer) => (
              <div
                key={layer.name}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1rem 1.375rem',
                  opacity: layer.comingSoon || layer.private ? 0.7 : 1,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--oa-font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    color: 'var(--oa-ember)',
                    flexShrink: 0,
                    width: '2rem',
                  }}
                >
                  {layer.num}
                </p>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <p
                      style={{
                        fontFamily: 'var(--oa-font-display)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: 'var(--oa-white)',
                        margin: 0,
                      }}
                    >
                      {layer.name}
                    </p>
                    {layer.comingSoon && <Badge tone="muted">Coming Soon</Badge>}
                    {layer.private && <Badge tone="ion">Private Access</Badge>}
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--oa-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>Where It Applies</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem' }}>
              Six situations the BLM OS addresses.
            </h2>
          </div>
          <div className="grid-2" style={{ gap: '1rem' }}>
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--oa-white)',
                    lineHeight: 1.4,
                  }}
                >
                  {uc.title}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--oa-text-secondary)', lineHeight: 1.7, flex: 1 }}>
                  {uc.body}
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {uc.layers.map((l) => (
                    <Badge key={l} tone={l.includes('Coming Soon') ? 'muted' : 'ion'}>
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Founding Cohort"
        headline="Start with the layers that fit now."
        sub="Application-based. Locked pricing. Month-to-month."
        buttonLabel="Apply Now"
        buttonHref="/founding-cohort"
        dark
      />
    </>
  );
}
