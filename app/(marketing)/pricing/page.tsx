import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import { Eyebrow, ButtonLink, Badge } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing',
  description:
    'BLM OS pricing — modular layers, Founding Cohort locked rates, and Signal by application only. No per-seat pricing. No implementation fees.',
  path: '/pricing',
});

const TIERS = [
  {
    name: 'Starter',
    label: 'Engine + RevOps',
    price: '$2,500',
    period: '/mo',
    description: 'Go-to-market and revenue operations. ICP prospecting, outreach sequencing, lead qualification, pipeline forecasting, and CRM hygiene.',
    layers: ['Engine', 'RevOps'],
    cta: 'Apply for Founding Cohort',
    href: '/founding-cohort',
    featured: false,
  },
  {
    name: 'Growth',
    label: 'Starter + Broadcast + Titan',
    price: '$4,500',
    period: '/mo',
    description: 'Full go-to-market stack plus marketing and document intelligence. Adds content brief generation, drafting, scheduling, and document processing.',
    layers: ['Engine', 'RevOps', 'Broadcast', 'Titan'],
    cta: 'Apply for Founding Cohort',
    href: '/founding-cohort',
    featured: true,
  },
  {
    name: 'OS',
    label: 'All layers including Ledger',
    price: '$7,500',
    period: '/mo',
    description: 'The complete BLM OS. All active layers plus Ledger when it ships — included at no additional cost for OS-tier customers.',
    layers: ['Engine', 'RevOps', 'Broadcast', 'Titan', 'Ledger (on ship)', 'Prime'],
    cta: 'Apply for Founding Cohort',
    href: '/founding-cohort',
    featured: false,
  },
];

const FAQS = [
  {
    q: 'What is the Founding Cohort pricing?',
    a: 'Founding Cohort members lock in pricing at the rates listed above for the life of their subscription. Rates for new customers after the cohort closes will be higher. Cohort access is application-based.',
  },
  {
    q: 'Are there implementation fees?',
    a: 'No implementation fees. Onboarding is included in the first month for all tiers.',
  },
  {
    q: 'What is Signal pricing?',
    a: 'Signal pricing is not listed publicly. It is available by application and priced based on the specific use case. Apply through the Signal page.',
  },
  {
    q: 'What happens when Ledger ships?',
    a: 'OS-tier customers receive Ledger at no additional cost when it ships. Starter and Growth customers can add Ledger for an additional monthly fee.',
  },
  {
    q: 'Is there a contract term?',
    a: 'Founding Cohort memberships are month-to-month with the locked rate. No annual commitment required.',
  },
];

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
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="display-md" style={{ marginTop: '0.75rem' }}>
              Modular. Transparent. Founding rates.
            </h1>
            <p className="body-lg" style={{ maxWidth: '540px', marginTop: '1rem' }}>
              Pick the layers your business needs now. Add more as you grow. Founding Cohort members
              lock in current rates permanently.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid-3" style={{ marginTop: '0' }}>
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderColor: tier.featured ? 'rgba(224,123,39,0.4)' : undefined,
                  position: 'relative',
                }}
              >
                {tier.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--oa-ember)',
                      color: '#fff',
                      fontFamily: 'var(--oa-font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      padding: '3px 12px',
                      borderRadius: '0 0 6px 6px',
                    }}
                  >
                    Most popular
                  </div>
                )}
                <div style={{ marginBottom: '1rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--oa-font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--oa-ember)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {tier.name}
                  </p>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--oa-text-secondary)',
                    }}
                  >
                    {tier.label}
                  </p>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--oa-font-display)',
                      fontWeight: 700,
                      fontSize: '2.25rem',
                      letterSpacing: '-0.03em',
                      color: 'var(--oa-white)',
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--oa-text-secondary)',
                    }}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--oa-text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem',
                    flex: 1,
                  }}
                >
                  {tier.description}
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {tier.layers.map((l) => (
                    <Badge key={l} tone={l.includes('Ledger') ? 'muted' : 'ion'}>
                      {l}
                    </Badge>
                  ))}
                </div>
                <ButtonLink href={tier.href} variant={tier.featured ? 'ember' : 'secondary'}>
                  {tier.cta}
                </ButtonLink>
              </div>
            ))}
          </div>

          {/* Signal callout */}
          <div
            className="card"
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              borderColor: 'rgba(143,208,242,0.2)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--oa-white)',
                    margin: 0,
                  }}
                >
                  Signal
                </p>
                <Badge tone="ion">Private Access</Badge>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--oa-text-secondary)', margin: 0, maxWidth: '480px' }}>
                Deal intelligence for PE-backed businesses and capital allocators. Pricing by application
                only — not listed publicly. No self-serve access.
              </p>
            </div>
            <ButtonLink href="/products/signal" variant="secondary">
              Apply for Access
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--oa-panel)', borderTop: '1px solid var(--oa-border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem' }}>Common questions.</h2>
          </div>
          <div className="stack" style={{ gap: '0', maxWidth: '720px' }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 0',
                  borderBottom: '1px solid var(--oa-border-subtle)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--oa-white)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {faq.q}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--oa-text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Founding Cohort"
        headline="Lock in your rate before the cohort closes."
        sub="Application-based access. Locked pricing. Priority access to new layers as they ship."
        buttonLabel="Apply Now"
        buttonHref="/founding-cohort"
        dark
      />
    </>
  );
}
