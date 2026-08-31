import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import { Eyebrow, ButtonLink, Badge } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'How It Works',
  description:
    'The four-step BLM OS setup: activate, connect, run, supervise. How the Fusion Grid, agent layer, and Prime governance work together.',
  path: '/how-it-works',
});

const STEPS = [
  {
    num: '01',
    title: 'Activate',
    body: 'Select the layers that match your current operational needs. Every tier includes Prime — the governance layer — so you have visibility from day one. You can add layers as your operations scale.',
  },
  {
    num: '02',
    title: 'Connect',
    body: 'The Fusion Grid connects to your existing tools — CRM, QuickBooks, project management, email — and normalizes their data into a consistent schema. No custom integrations. No migration required.',
  },
  {
    num: '03',
    title: 'Run',
    body: 'Agents begin executing against the configured parameters. Engine starts prospecting. RevOps starts qualifying. Broadcast starts generating briefs. Prime starts compiling your daily briefing. Execution runs on schedule, not on bandwidth.',
  },
  {
    num: '04',
    title: 'Own the decisions',
    body: 'You read the daily briefing, act on exception items, and approve gates that require your judgment. The agents handle volume. You handle decisions that require context and authority that only you have.',
  },
];

const INTEGRATIONS = [
  'QuickBooks', 'HubSpot', 'Salesforce', 'Apollo', 'Airtable',
  'Slack', 'Google Workspace', 'Microsoft 365', 'AWS Bedrock',
];

const FAQS = [
  {
    q: 'How long does setup take?',
    a: 'The Fusion Grid connection and initial agent configuration typically takes three to five business days. The first full briefing runs in the first week.',
  },
  {
    q: 'What does the operator need to do each day?',
    a: 'Read the Prime briefing (under ten minutes), act on exception items that require judgment, and approve any gates that fired overnight. Most days this is a short morning review.',
  },
  {
    q: 'What tools does the BLM OS connect to?',
    a: 'The Fusion Grid connects to CRM, accounting, project management, communication platforms, and document storage. If your tool has an API, it can connect.',
  },
  {
    q: 'What happens when an agent is uncertain?',
    a: 'It escalates to the Prime exception queue with the relevant context and a confidence score. The operator makes the call. The agent records the decision and applies it to future similar situations.',
  },
  {
    q: 'Does this replace my existing team?',
    a: 'No — and that is the point. The BLM OS returns the time currently consumed by routine execution to your existing team. Every decision that requires human judgment stays with the people who have the authority to make it. Agents handle volume. Your team handles everything else.',
  },
];

export default function HowItWorksPage() {
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
          { name: 'How It Works', path: '/how-it-works' },
        ])}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>How It Works</Eyebrow>
            <h1 className="display-md" style={{ marginTop: '0.75rem' }}>
              From execution bottleneck to supervision architecture.
            </h1>
            <p className="body-lg" style={{ maxWidth: '540px', marginTop: '1rem' }}>
              The BLM OS connects to your existing tools, normalizes your data, and starts running
              agents in week one. The operator shifts from execution to the supervision role.
            </p>
          </div>

          {/* Steps */}
          <div className="grid-2" style={{ gap: '1.25rem' }}>
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--oa-font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--oa-ember)',
                  }}
                >
                  {step.num}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 700,
                    fontSize: '1.35rem',
                    letterSpacing: '-0.02em',
                    color: 'var(--oa-white)',
                  }}
                >
                  {step.title}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--oa-text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section
        className="section"
        style={{ background: 'var(--oa-panel)', borderTop: '1px solid var(--oa-border-subtle)' }}
      >
        <div className="container">
          <div className="section-header">
            <Eyebrow>Architecture</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem' }}>Three layers. One system.</h2>
          </div>
          <div className="grid-3" style={{ gap: '1rem' }}>
            {[
              {
                title: 'Fusion Grid',
                body: 'Connects to your existing tools and normalizes data into a consistent schema. The foundation that all seven agent layers operate against.',
              },
              {
                title: 'Agent Layer',
                body: 'Seven operational layers — Engine, RevOps, Broadcast, Ledger, Titan, Signal, Prime — each running specialist agents against the Fusion Grid data.',
              },
              {
                title: 'Supervision Layer',
                body: 'Prime surfaces the daily briefing, exception queue, and approval gates. The operator makes decisions. The system records and applies them.',
              },
            ].map((item) => (
              <div key={item.title} className="card">
                <p
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--oa-white)',
                    marginBottom: '0.65rem',
                  }}
                >
                  {item.title}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--oa-text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>Integrations</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem' }}>Connects to your stack.</h2>
            <p className="body-md" style={{ maxWidth: '480px', marginTop: '0.75rem' }}>
              The Fusion Grid normalizes data from the tools you already use. No migration.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {INTEGRATIONS.map((name) => (
              <Badge key={name} tone="muted">{name}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section"
        style={{ background: 'var(--oa-panel)', borderTop: '1px solid var(--oa-border-subtle)' }}
      >
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
        eyebrow="Ready to start?"
        headline="Join the Founding Cohort."
        sub="Application-based access. Rate locked for the life of your subscription — rates for new customers after the cohort closes will be higher."
        buttonLabel="Apply Now"
        buttonHref="/founding-cohort"
        dark
      />
    </>
  );
}
