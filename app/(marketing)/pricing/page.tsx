import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import { Eyebrow, ButtonLink } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Echo 1 Labs orbit tiers: Explorer free, Starter $497/mo, Growth $997/mo (Founding Cohort rate), Scale custom. All plans include the full BLM OS and 500+ agent marketplace.',
  path: '/pricing',
});

const TIERS = [
  {
    name: 'Explorer',
    pitch: 'Evaluate the OS with no commitment',
    price: '$0',
    period: '/mo',
    credits: '250 Echo Credits · ~250 executions/mo',
    featured: false,
    foundingBadge: false,
    features: [
      'Prime dashboard access',
      '1 connected integration',
      'Basic signal monitoring',
      'Community access',
      'Up to 250 agent executions',
    ],
    cta: 'Start Free',
    href: '/founding-cohort',
    ctaVariant: 'secondary' as const,
  },
  {
    name: 'Starter',
    pitch: 'First orbit: one domain running on agents',
    price: '$497',
    period: '/mo',
    credits: '750 Echo Credits · ~750 executions/mo',
    featured: false,
    foundingBadge: false,
    features: [
      '2 active BLM apps',
      '3 connected integrations',
      'Weekly signal reports',
      'Email support',
      'Up to 750 agent executions',
    ],
    cta: 'Get Started',
    href: '/founding-cohort',
    ctaVariant: 'secondary' as const,
  },
  {
    name: 'Growth',
    pitch: 'Full OS activation, the ICP sweet spot',
    price: '$997',
    period: '/mo · founding',
    credits: null,
    executions: { count: '3,000', label: 'Agent Executions / Mo', cpe: '~$0.33', note: 'Each execution is a completed business outcome: a lead enriched, a sync run, a content piece delivered, a signal surfaced.' },
    featured: true,
    foundingBadge: true,
    features: [
      'All 7 apps (incl. Titan & Signal)',
      '16 out-of-the-box agent teams',
      'Unlimited integrations',
      'Daily signal intelligence',
      'Dedicated success agent',
      '90-day satisfaction guarantee ($2,991 refund)',
      'Founding Cohort rate, held while you subscribe',
      'Direct product team access',
    ],
    cta: "You're Invited · Founding Cohort",
    href: '/founding-cohort',
    ctaVariant: 'ember' as const,
  },
  {
    name: 'Scale',
    pitch: 'High-volume operations and custom deployments',
    price: 'Contact Sales',
    period: '',
    credits: 'Unlimited Credits · Custom Terms',
    featured: false,
    foundingBadge: false,
    features: [
      'Everything in Growth',
      'Titan custom development',
      'Multi-entity support',
      'Dedicated agent engineering',
      'SLA and priority routing',
      'PE/VC portfolio management',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    ctaVariant: 'secondary' as const,
  },
] as const;

const GUARANTEES = [
  { title: '90-Day Guarantee', body: '$2,991 back if it isn\'t working' },
  { title: 'Founding Rate', body: 'Held for the length of your subscription' },
  { title: 'Day-One Activation', body: '16 agents run the moment you activate' },
  { title: '500+ Agents', body: 'Full marketplace included in all active plans' },
];

const COMPARE_ROWS = [
  { group: 'PRICING' },
  { feature: 'Monthly rate',       explorer: '$0',          starter: '$497/mo',   growth: '$997/mo',              scale: 'Custom' },
  { feature: 'Agent executions',   explorer: '250/mo',      starter: '750/mo',    growth: '3,000/mo',             scale: 'Unlimited' },
  { feature: 'Cost per execution', explorer: '–',           starter: '~$0.66',    growth: '~$0.33',               scale: 'Custom' },
  { group: 'APPS & INTEGRATIONS' },
  { feature: 'Active BLM apps',    explorer: 'Prime only',  starter: '2 apps',    growth: 'All 7',                scale: 'All 7 + custom' },
  { feature: 'Titan (Bid + Fulfillment)',         explorer: false, starter: false, growth: true,  scale: true },
  { feature: 'Signal (Capital Intelligence)',     explorer: false, starter: false, growth: true,  scale: true },
  { feature: 'Ledger (AI CFO)',      explorer: false, starter: false, growth: true,  scale: true },
  { feature: 'Connected integrations', explorer: '1', starter: '3', growth: 'Unlimited', scale: 'Unlimited' },
  { group: 'AGENT ACCESS' },
  { feature: 'Agent marketplace (500+ agents)',  explorer: false, starter: 'Core agents', growth: '✓ Full access', scale: '✓ Full access' },
  { feature: '16 out-of-the-box agent teams',    explorer: false, starter: 'Partial',     growth: '✓ All 16',     scale: '✓ All 16' },
  { feature: 'Custom agent development (Titan)', explorer: false, starter: false,          growth: true,           scale: '✓ + engineering' },
  { group: 'INTELLIGENCE & REPORTING' },
  { feature: 'Signal cadence',          explorer: 'Manual only', starter: 'Weekly', growth: 'Daily',      scale: 'Real-time' },
  { feature: 'Dashboard & supervision', explorer: 'Read-only',   starter: 'Basic',  growth: '✓ Full',     scale: '✓ Full' },
  { group: 'SUPPORT & GUARANTEES' },
  { feature: 'Support channel',               explorer: 'Community', starter: 'Email', growth: 'Dedicated success agent', scale: 'Dedicated + SLA' },
  { feature: '90-day satisfaction guarantee', explorer: false, starter: false, growth: '$2,991 refund', scale: 'Negotiated' },
  { feature: 'Founding Cohort rate',          explorer: false, starter: false, growth: '✓ Season One only', scale: false },
  { feature: 'Multi-entity / PE portfolio',  explorer: false, starter: false, growth: false,               scale: true },
] as const;

const FAQS = [
  {
    q: 'What is an Echo Credit?',
    a: 'An Echo Credit funds one agent execution: a single completed business outcome like a lead enriched, a financial sync, a content piece delivered, or a workflow run. The Growth tier includes 3,000 per month at approximately $0.33 each. Credits do not roll over.',
  },
  {
    q: 'How long does the Founding Cohort rate hold?',
    a: 'Season One members hold the Growth tier at $997/mo for the length of their subscription. Your rate does not increase when we add new apps or new verticals, as long as the subscription stays active. Rates for customers who join after the cohort closes will be higher.',
  },
  {
    q: 'How does the 90-day guarantee work?',
    a: 'Founding Cohort members receive three months\' fees back ($2,991) within 90 days if the OS isn\'t delivering value to your operations. There\'s no performance benchmark to hit. If it isn\'t working, we return the money. Request it directly with the product team.',
  },
  {
    q: 'What does "all 7 apps" include?',
    a: 'Growth and Scale include all seven Echo 1 Labs apps: Prime (Command Center), Engine (Revenue Generation), Broadcast (Brand in Market), RevOps (Revenue Intelligence), Ledger (AI CFO / FP&A), Titan (Bid + Fulfillment + custom development), and Signal (Capital Intelligence, private access). Titan and Signal are included at no additional charge.',
  },
  {
    q: 'Can I upgrade from Explorer or Starter later?',
    a: 'Yes, you can upgrade at any time. The Founding Cohort Growth rate ($997/mo) is available to Season One members. Securing it now also includes the 90-day satisfaction guarantee, so you can evaluate the full OS at the founding rate.',
  },
  {
    q: 'What happens when I run out of executions?',
    a: 'Agents pause at the monthly limit. You can purchase additional execution blocks mid-cycle or upgrade to the next tier. Scale tier includes unlimited executions with custom volume terms. Prime surfaces a warning before you reach the threshold so you\'re never caught off guard.',
  },
  {
    q: 'Does Signal require a separate purchase?',
    a: 'Signal is available under a private access model. Growth and Scale members can apply for Signal access at no additional charge. Signal is not a product you self-activate; it is an intelligence layer deployed with you based on your use case (exit preparation, capital raise positioning, or strategic acquisition readiness).',
  },
  {
    q: 'Who is Echo 1 Labs built for?',
    a: 'The BLM OS is built for operator-led businesses: $5M to $100M in revenue, 50 to 200 employees, where the owner or executive director is the primary decision-maker. Also built for PE and VC portfolio teams managing multiple operating entities. Not built for pre-traction companies or Fortune 500 procurement cycles.',
  },
];

function CellValue({ val }: { val: string | boolean | undefined }) {
  if (val === true) return <span style={{ color: 'var(--e1-state-success)' }}>✓</span>;
  if (val === false) return <span style={{ color: 'var(--e1-text-muted)' }}>–</span>;
  return <>{val}</>;
}

export default function PricingPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>Orbit Tiers · Pricing</Eyebrow>
            <h1 className="display-md" style={{ marginTop: '0.75rem' }}>
              Choose your <em style={{ fontStyle: 'normal', color: 'var(--e1-ember)' }}>orbit</em>
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px', marginTop: '1rem' }}>
              All plans include the full BLM OS plus access to the 500+ agent marketplace. Echo Credits
              power your agents: more credits, more autonomous operation.
            </p>
            <p
              style={{
                fontFamily: 'var(--e1-font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                color: 'var(--e1-text-muted)',
                marginTop: '0.75rem',
              }}
            >
              Founding Cohort Season One is open.{' '}
              <strong style={{ color: 'var(--e1-ember)', fontWeight: 500 }}>
                Growth is $997/mo for the Founding Cohort.
              </strong>
            </p>
          </div>

          {/* Founding Cohort banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(224,123,39,0.10) 0%, rgba(143,208,242,0.06) 100%)',
              border: '1px solid rgba(224,123,39,0.25)',
              borderRadius: '12px',
              padding: '1.25rem 1.75rem',
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--e1-font-mono)',
                fontSize: '0.55rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: 'var(--e1-ember)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '3px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Season One · Open
            </span>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--e1-white)', margin: 0 }}>
                Founding Cohort Growth rate: $997/mo.
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--e1-text-secondary)', marginTop: '2px', marginBottom: 0 }}>
                Join as a Season One member and hold the founding rate for the length of your subscription, with a 90-day $2,991 satisfaction guarantee.
              </p>
            </div>
            <ButtonLink href="/founding-cohort" variant="ember">
              Claim Your Spot
            </ButtonLink>
          </div>

          {/* Tier cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderColor: tier.featured ? 'rgba(224,123,39,0.35)' : undefined,
                  background: tier.featured ? 'var(--e1-raised)' : undefined,
                }}
              >
                {tier.foundingBadge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--e1-ember)',
                      color: '#fff',
                      fontFamily: 'var(--e1-font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '3px 12px',
                      borderRadius: '0 0 6px 6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Founding Cohort Rate
                  </div>
                )}

                <div style={{ marginTop: tier.foundingBadge ? '1rem' : 0, marginBottom: '0.5rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--e1-font-display)',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      color: 'var(--e1-white)',
                      margin: 0,
                    }}
                  >
                    {tier.name}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--e1-text-secondary)', marginTop: '3px', marginBottom: 0 }}>
                    {tier.pitch}
                  </p>
                </div>

                <div style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--e1-font-display)',
                      fontWeight: 800,
                      fontSize: tier.price === 'Contact Sales' ? '1.4rem' : '2rem',
                      letterSpacing: '-0.03em',
                      color: 'var(--e1-white)',
                    }}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--e1-text-secondary)' }}>
                      {' '}
                      {tier.period}
                    </span>
                  )}
                </div>

                {'executions' in tier && tier.executions ? (
                  <div
                    style={{
                      background: 'rgba(224,123,39,0.08)',
                      border: '1px solid rgba(224,123,39,0.2)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--e1-font-display)',
                        fontWeight: 800,
                        fontSize: '2rem',
                        color: 'var(--e1-white)',
                        margin: 0,
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {tier.executions.count}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--e1-font-mono)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--e1-ember)',
                        margin: '2px 0 6px',
                      }}
                    >
                      {tier.executions.label}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--e1-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {tier.executions.note}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--e1-font-mono)',
                          fontSize: '0.6rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--e1-text-muted)',
                        }}
                      >
                        Cost per execution
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--e1-font-display)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          color: 'var(--e1-ember)',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {tier.executions.cpe}
                      </span>
                    </div>
                  </div>
                ) : (
                  tier.credits && (
                    <p
                      style={{
                        fontFamily: 'var(--e1-font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--e1-text-secondary)',
                        marginBottom: '0.75rem',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {tier.credits}
                    </p>
                  )
                )}

                <div style={{ height: '1px', background: 'var(--e1-border)', margin: '0 0 1rem' }} />

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.5rem',
                    flex: 1,
                  }}
                >
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--e1-text-secondary)',
                        padding: '5px 0',
                        borderBottom: '1px solid var(--e1-border)',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          color: tier.featured ? 'var(--e1-ember)' : 'var(--e1-text-muted)',
                          fontSize: '0.7rem',
                          marginTop: '2px',
                          flexShrink: 0,
                        }}
                      >
                        →
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <ButtonLink href={tier.href} variant={tier.ctaVariant}>
                  {tier.cta}
                </ButtonLink>
              </div>
            ))}
          </div>

          {/* Guarantee strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              background: 'var(--e1-surface)',
              border: '1px solid var(--e1-border)',
              borderRadius: '12px',
              padding: '1.25rem 2rem',
              marginTop: '1.5rem',
            }}
          >
            {GUARANTEES.map((g) => (
              <div key={g.title} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--e1-white)', margin: 0 }}>
                    {g.title}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--e1-text-secondary)', margin: 0 }}>
                    {g.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section
        className="section"
        style={{ background: 'var(--e1-panel)', borderTop: '1px solid var(--e1-border)' }}
        id="compare"
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--e1-font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--e1-text-muted)',
              }}
            >
              Full Comparison
            </span>
            <span style={{ flex: 1, height: '1px', background: 'var(--e1-border)' }} />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '640px',
                fontSize: '0.8rem',
              }}
            >
              <thead>
                <tr>
                  {['Feature', 'Explorer', 'Starter', 'Growth', 'Scale'].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        borderBottom: i === 3 ? '2px solid rgba(224,123,39,0.35)' : '1px solid var(--e1-border)',
                        background: 'var(--e1-raised)',
                        fontFamily: 'var(--e1-font-display)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: i === 3 ? 'var(--e1-ember)' : 'var(--e1-white)',
                        minWidth: i === 0 ? '200px' : undefined,
                        position: 'sticky',
                        top: 0,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, idx) => {
                  if ('group' in row) {
                    return (
                      <tr key={idx}>
                        <td
                          colSpan={5}
                          style={{
                            fontFamily: 'var(--e1-font-mono)',
                            fontSize: '0.55rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--e1-text-muted)',
                            background: 'var(--e1-void)',
                            borderBottom: '1px solid var(--e1-border)',
                            padding: '0.5rem 1rem',
                            fontWeight: 500,
                          }}
                        >
                          {row.group}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={idx}>
                      <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--e1-border)', color: 'var(--e1-text-secondary)' }}>
                        {row.feature}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--e1-border)', color: 'var(--e1-text-secondary)' }}>
                        <CellValue val={row.explorer} />
                      </td>
                      <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--e1-border)', color: 'var(--e1-text-secondary)' }}>
                        <CellValue val={row.starter} />
                      </td>
                      <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--e1-border)', color: 'var(--e1-ember)', background: 'rgba(224,123,39,0.03)', fontWeight: typeof row.growth === 'string' && !row.growth.startsWith('✓') ? 600 : undefined }}>
                        <CellValue val={row.growth} />
                      </td>
                      <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--e1-border)', color: 'var(--e1-text-secondary)' }}>
                        <CellValue val={row.scale} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section"
        style={{ background: 'var(--e1-void)', borderTop: '1px solid var(--e1-border)' }}
        id="faq"
      >
        <div className="container">
          <div className="section-header">
            <Eyebrow>Frequently Asked</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem' }}>
              Common questions.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 0,
              maxWidth: '960px',
              border: '1px solid var(--e1-border)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {FAQS.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderBottom: i < FAQS.length - 2 ? '1px solid var(--e1-border)' : undefined,
                  borderRight: i % 2 === 0 ? '1px solid var(--e1-border)' : undefined,
                }}
              >
                <summary
                  style={{
                    padding: '1.25rem 1.5rem',
                    fontFamily: 'var(--e1-font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--e1-white)',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  {faq.q}
                  <span
                    style={{
                      color: 'var(--e1-text-muted)',
                      fontSize: '1rem',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    padding: '0 1.5rem 1.25rem',
                    fontSize: '0.8rem',
                    color: 'var(--e1-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Founding Cohort"
        headline="The OS runs while you supervise."
        sub="Join the Founding Cohort at $997/mo, backed by a 90-day satisfaction guarantee."
        buttonLabel="You're Invited · Founding Cohort"
        buttonHref="/founding-cohort"
        dark
      />
    </>
  );
}
