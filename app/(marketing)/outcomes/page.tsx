import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import { Eyebrow, ButtonLink } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Outcomes',
  description:
    'What changes when the BLM OS runs operations — for go-to-market, revenue operations, marketing, and finance.',
  path: '/outcomes',
});

const METRICS = [
  { value: '4–6 hrs', label: 'Recovered per operator per day', note: 'Estimated from routine execution tasks moved to agents' },
  { value: '3×', label: 'Faster qualification cadence', note: 'Typical vs. manual lead review and scoring' },
  { value: '100%', label: 'Outreach cadence adherence', note: 'Runs on schedule regardless of operator bandwidth' },
  { value: '<24 hrs', label: 'Document processing time', note: 'Contracts, invoices, POs classified and routed on arrival' },
];

const DOMAINS = [
  {
    domain: 'Go-to-Market',
    layer: 'Engine',
    before: [
      'Prospecting runs when the team has time',
      'Outreach cadence depends on individual discipline',
      'Pipeline stalls discovered in weekly reviews',
      'ICP refinement requires manual list audits',
    ],
    after: [
      'Prospecting runs on a configured schedule',
      'Outreach executes automatically at defined touchpoints',
      'Stalls surface in Prime within 24 hours',
      'ICP scoring updates with each new signal',
    ],
  },
  {
    domain: 'Revenue Operations',
    layer: 'RevOps',
    before: [
      'Lead qualification is manual and inconsistent',
      'Pipeline forecasting is a spreadsheet exercise',
      'CRM hygiene depends on rep discipline',
      'Revenue reconciliation happens at month-end',
    ],
    after: [
      'Every lead scored on entry against the ICP',
      'Rolling forecast updates automatically as deals move',
      'CRM data normalized on a configured schedule',
      'Revenue reconciliation runs daily against accounting',
    ],
  },
  {
    domain: 'Marketing',
    layer: 'Broadcast',
    before: [
      'Content production is reactive to available time',
      'Channel consistency depends on who is available',
      'Performance monitoring is a weekly manual pull',
      'Content calendar is aspirational, not operational',
    ],
    after: [
      'Briefs generated on the configured calendar',
      'Drafts produced across all channels from approved briefs',
      'Performance tracked automatically against benchmarks',
      'Content publishes on cadence, not on bandwidth',
    ],
  },
  {
    domain: 'Document Processing',
    layer: 'Titan',
    before: [
      'Incoming documents sit until someone reviews them',
      'Contract terms tracked in spreadsheets',
      'Invoice-to-PO matching is manual and error-prone',
      'Document classification depends on the processor',
    ],
    after: [
      'Documents classified and routed on arrival',
      'Contract obligations extracted and flagged',
      'Invoice-to-PO matching automated with exception routing',
      'Full audit trail in the Fusion Grid',
    ],
  },
];

export default function OutcomesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Outcomes', path: '/outcomes' },
        ])}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>Outcomes</Eyebrow>
            <h1 className="display-md" style={{ marginTop: '0.75rem' }}>
              What changes when agents run operations.
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px', marginTop: '1rem' }}>
              The BLM OS does not promise outcomes. It changes the operational model. Here is what
              that change looks like across the layers that run.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid-2" style={{ gap: '1rem' }}>
            {METRICS.map((m) => (
              <div key={m.label} className="card">
                <p
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                    letterSpacing: '-0.03em',
                    color: 'var(--oa-ember)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {m.value}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--oa-white)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {m.label}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--oa-text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {m.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After by domain */}
      <section
        className="section"
        style={{ background: 'var(--oa-panel)', borderTop: '1px solid var(--oa-border-subtle)' }}
      >
        <div className="container">
          <div className="section-header">
            <Eyebrow>Before and After</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem' }}>By operational domain.</h2>
          </div>
          <div className="stack" style={{ gap: '1.5rem' }}>
            {DOMAINS.map((d) => (
              <div key={d.domain} className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--oa-font-display)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'var(--oa-white)',
                      margin: 0,
                    }}
                  >
                    {d.domain}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--oa-font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--oa-ember)',
                      border: '1px solid rgba(224,123,39,0.3)',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}
                  >
                    {d.layer}
                  </span>
                </div>
                <div className="grid-2" style={{ gap: '2rem' }}>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--oa-font-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--oa-text-muted)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Before
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {d.before.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: '0.85rem',
                            color: 'var(--oa-text-secondary)',
                            lineHeight: 1.6,
                            padding: '0.4rem 0',
                            borderBottom: '1px solid var(--oa-border-subtle)',
                            display: 'flex',
                            gap: '0.6rem',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span style={{ color: 'var(--oa-text-muted)', flexShrink: 0 }}>—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--oa-font-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--oa-ember)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      After
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {d.after.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: '0.85rem',
                            color: 'var(--oa-white)',
                            lineHeight: 1.6,
                            padding: '0.4rem 0',
                            borderBottom: '1px solid var(--oa-border-subtle)',
                            display: 'flex',
                            gap: '0.6rem',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span style={{ color: 'var(--oa-state-success)', flexShrink: 0 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Founding Cohort"
        headline="See it in your business."
        sub="Join the Founding Cohort to get hands-on access and locked-in pricing."
        buttonLabel="Apply Now"
        buttonHref="/founding-cohort"
        dark
      />
    </>
  );
}
