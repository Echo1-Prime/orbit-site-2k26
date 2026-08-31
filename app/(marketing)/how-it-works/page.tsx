import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import { Eyebrow, Badge } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'How It Works',
  description:
    'Seven apps, one Fusion Grid, agents that act on unified signals across every domain. Activate, Connect, Run, and Supervise: how the BLM OS works.',
  path: '/how-it-works',
});

const STEPS = [
  {
    num: '01',
    title: 'Activate',
    body: 'Select the apps that match your current operational gaps. Most operators start with Prime + one domain app (Engine, Broadcast, or RevOps).',
  },
  {
    num: '02',
    title: 'Connect',
    body: 'Link your existing tools (QuickBooks, Apollo, HubSpot, Airtable) to the Fusion Grid. Data flows in, agents get context, signals start forming.',
  },
  {
    num: '03',
    title: 'Run',
    body: 'Agents begin executing across every connected domain. Prospecting runs. Content schedules. Reconciliation closes. Briefings compile. Your first signal arrives within 72 hours.',
  },
  {
    num: '04',
    title: 'Supervise',
    body: 'Prime surfaces every signal into one dashboard. You see what agents did, what thresholds were crossed, and where a decision is needed. You supervise. You don\'t manage.',
  },
];

const INTEGRATIONS = [
  'QuickBooks', 'Apollo', 'HubSpot', 'Airtable', 'AWS Bedrock', 'Slack',
];

const FAQS = [
  {
    q: 'What is the Fusion Grid?',
    a: 'The Fusion Grid is the integration layer that connects all seven Echo 1 Labs apps to each other and to external systems: QuickBooks, Apollo, Airtable, HubSpot, AWS Bedrock, and Slack. Data flows in real time so agents can act on unified signals across every domain without manual handoffs.',
  },
  {
    q: 'What is the supervision layer?',
    a: 'The supervision layer is the human-in-the-loop interface where operators see all agent activity, validate threshold alerts, and redirect work. Supervision replaces management, not judgment. Operators stay in control of decisions while agents handle execution.',
  },
  {
    q: 'How long does activation take?',
    a: 'Most operators receive their first signal within 72 hours of activation. The onboarding process covers app selection, data source connections, and supervision threshold configuration before agents begin executing.',
  },
  {
    q: 'Which integrations does the OS support?',
    a: 'The OS connects to QuickBooks (financial sync), Apollo (prospecting and enrichment), Airtable (data coordination), HubSpot (CRM), AWS Bedrock (agent infrastructure), and Slack (alerting and briefings). Additional integrations are available via the Fusion Grid.',
  },
  {
    q: 'What is an agent execution?',
    a: 'An agent execution is a single completed business outcome performed by an autonomous agent: one lead enriched, one financial sync run, one piece of content delivered, one signal surfaced. The Growth tier includes 3,000 agent executions per month.',
  },
];

export default function HowItWorksPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'HowTo',
        name: 'How to activate the Echo 1 Labs BLM OS',
        description: 'Four steps to run your business on agents: Activate, Connect, Run, and Supervise.',
        step: STEPS.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.title,
          text: s.body,
        })),
      },
    ],
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
              Seven apps. One Fusion Grid. Agents that act on unified signals across every domain.
            </h1>
            <p className="body-lg" style={{ maxWidth: '540px', marginTop: '1rem' }}>
              Activate the apps you need. Connect your existing tools. Run agents across every domain.
              Supervise from one dashboard.
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
                body: 'Connects all seven apps to each other and to external systems. Data flows in real time so agents can act on unified signals across every domain without manual handoffs.',
              },
              {
                title: 'Agent Layer',
                body: 'Seven operational apps (Engine, RevOps, Broadcast, Ledger, Titan, Signal, Prime), each running specialist agents against the Fusion Grid data.',
              },
              {
                title: 'Supervision Layer',
                body: 'Prime surfaces every signal into one dashboard. Operators see what agents did, where thresholds were crossed, and where a decision is needed. Supervision replaces management.',
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
              The Fusion Grid connects to the tools you already use. No migration required.
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
        sub="Application-based access. Rate locked for the life of your subscription. Rates for new customers after the cohort closes will be higher."
        buttonLabel="Apply Now"
        buttonHref="/founding-cohort"
        dark
      />
    </>
  );
}
