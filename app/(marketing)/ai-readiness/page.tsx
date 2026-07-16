import type { Metadata } from 'next';
import { AI_READINESS } from '@/lib/products';
import { pageMetadata, serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'AI Readiness — From Individual AI to Institutional AI',
  description:
    'AI Readiness is the ENABLE-stage advisory engagement from Echo 1 Labs — secure setup, 101/201 training, org and personal skills, agentic workflow engineering, and governance. Not a product SKU.',
  path: '/ai-readiness',
});

const FAQS = [
  {
    q: 'Is AI Readiness a product or a service?',
    a: 'It is an advisory engagement — the ENABLE stage of the Business Lifecycle. It is scoped monthly advisory ($2-10K/mo) plus discrete project work, not a per-seat software SKU.',
  },
  {
    q: 'How long does deployment take?',
    a: 'A full institutional AI deployment runs 6 to 8 weeks, ending with a governed environment, trained team, and a 30-60-90 day execution roadmap.',
  },
  {
    q: 'What do we get per seat?',
    a: 'Five org-wide skills plus five personal skills per seat, built from individual discovery sessions with each employee, on a secure Claude Team or Enterprise environment.',
  },
];

export default function AiReadinessPage() {
  const p = AI_READINESS;
  return (
    <>
      <JsonLd data={serviceSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'AI Readiness', path: '/ai-readiness' },
        ])}
      />
      <JsonLd data={faqSchema(FAQS)} />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <span className="stage-badge">ENABLE · Stage 1 · Advisory</span>
          <h1 className="display-lg" style={{ margin: '1.25rem 0 1rem' }}>
            From personal AI to institutional AI.
          </h1>
          <p className="body-lg" style={{ maxWidth: '640px' }}>
            Your team is already using AI. The question is whether your organization owns it — or it
            owns you. We build the second brain that bridges individual productivity to
            enterprise-grade agentic infrastructure.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="section--sm">
        <div className="container">
          <div className="metrics">
            {p.metrics.map((m) => (
              <div className="metric" key={m.label}>
                <div className="metric__value">{m.value}</div>
                <div className="metric__label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The Problem</p>
              <h2 className="display-md" style={{ marginBottom: '1.25rem' }}>
                You&apos;ve outgrown the experiment phase.
              </h2>
              <p className="body-lg" style={{ marginBottom: '1rem' }}>
                Shadow AI is already running through your organization. Employees are using ChatGPT,
                Claude, and Gemini on their own — without governance, without logging, without any
                institutional memory.
              </p>
              <p className="body-md">
                The longer this runs unsupervised, the wider the gap between what your team can do
                individually and what your organization can do at scale.
              </p>
            </div>
            <div className="stack">
              <div className="card">
                <div className="card__title">No institutional memory</div>
                <p className="card__desc">Individual AI wins stay individual. Nothing captures, routes, or scales what is working.</p>
              </div>
              <div className="card">
                <div className="card__title">Zero governance</div>
                <p className="card__desc">No DLP. No logging. No IAM. Your data is leaving through tools you do not control, on accounts you do not own.</p>
              </div>
              <div className="card">
                <div className="card__title">No agentic foundation</div>
                <p className="card__desc">Using AI for tasks is not an AI strategy. You need automations, workflows, and agents that compound over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="section band--muted">
        <div className="container">
          <div className="section-header">
            <p className="label">What We Build</p>
            <h2 className="display-md">Your organization&apos;s second brain.</h2>
          </div>
          <div className="capability-grid">
            {p.capabilities.map((c) => (
              <div className="card" key={c.name}>
                <div className="card__title">{c.name}</div>
                <p className="card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery tracks */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label">How We Deliver</p>
            <h2 className="display-md">Two tracks. One outcome.</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <div className="card__title" style={{ color: 'var(--solar)', fontSize: '1.15rem' }}>PRIME — Out of the box</div>
              <p className="card__desc" style={{ marginBottom: '1rem' }}>
                A production-ready agentic platform for organizations that want institutional AI
                running in weeks, not quarters. Pre-built agents, governance controls, and lifecycle
                dashboards.
              </p>
              <span className="stage-badge">Best for: teams of 5-50</span>
            </div>
            <div className="card">
              <div className="card__title" style={{ fontSize: '1.15rem' }}>Custom workflows &amp; apps</div>
              <p className="card__desc" style={{ marginBottom: '1rem' }}>
                Bespoke automations, agentic web and in-app experiences, and full-stack application
                development for consulting firms, marketing agencies, financial services, and sales
                organizations.
              </p>
              <span className="stage-badge">Best for: specific stack + client base</span>
            </div>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Built on Anthropic Claude"
        headline="Ready to become institutional?"
        sub="Schedule your AI Readiness assessment. We audit your current footprint and deliver a 90-day roadmap."
        buttonLabel="Schedule assessment"
        buttonHref="/contact"
        dark
      />
    </>
  );
}
