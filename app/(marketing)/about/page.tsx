import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import InViewStagger from '@/components/Reveal/InViewStagger';
import { Eyebrow, Card, Badge } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Echo 1 Labs builds the Business Lifecycle Management OS — an integrated agent system that runs operations for owner-led businesses and lets humans supervise at scale.',
  path: '/about',
});

const PRINCIPLES = [
  {
    num: '01',
    title: 'No black boxes',
    body: 'Every agent action is logged. The owner can always see what ran, what it produced, and what it escalated. Supervision requires visibility.',
  },
  {
    num: '02',
    title: 'Exceptions, not approvals',
    body: "The operator's time goes to decisions that require judgment. Everything else runs. The exception queue is how you know what needs you.",
  },
  {
    num: '03',
    title: 'One architecture',
    body: 'Seven layers, one data model, one governance interface. The BLM OS is not a bundle of tools. It is a coordinated system with a single point of control.',
  },
  {
    num: '04',
    title: 'Real operations, not demos',
    body: 'The BLM OS runs production workloads — outreach, content, reconciliation, documents. It is not an experiment. It is how business gets done.',
  },
];

const APPS = [
  { num: '01', name: 'Engine', cat: 'Go-to-Market' },
  { num: '02', name: 'RevOps', cat: 'Revenue Operations' },
  { num: '03', name: 'Broadcast', cat: 'Marketing' },
  { num: '04', name: 'Ledger', cat: 'Finance · Coming Soon' },
  { num: '05', name: 'Titan', cat: 'Document Intelligence' },
  { num: '06', name: 'Signal', cat: 'Deal Intelligence · Private' },
  { num: '07', name: 'Prime', cat: 'Governance' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <Eyebrow>About Echo 1 Labs</Eyebrow>
          <h1 className="display-lg" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
            Built by operators.<br />Run by agents.
          </h1>
          <p className="body-lg" style={{ maxWidth: '640px', color: 'var(--oa-slate)' }}>
            Echo 1 Labs was started because the problems of an owner-led business do not get smaller
            as the business grows. They get louder. The answer is not more headcount. It is better
            infrastructure.
          </p>
        </div>
      </section>

      {/* Why we exist */}
      <section className="section" style={{ borderTop: '1px solid var(--oa-border)' }}>
        <div className="container">
          <Eyebrow tone="muted">Why we exist</Eyebrow>
          <h2 className="display-md" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            The owner-led business has no OS.
          </h2>
          <div style={{ maxWidth: '720px' }}>
            <p className="body-md" style={{ color: 'var(--oa-slate)', marginBottom: '1.25rem' }}>
              Owner-led businesses between $5M and $100M carry an unusual burden: the operational
              surface area of a mid-market company with the staffing model of a startup. Revenue
              operations, marketing, finance, documents, deal flow — every function lands on the
              same small group of people, and the owner sits at the center of it.
            </p>
            <p className="body-md" style={{ color: 'var(--oa-slate)', marginBottom: '1.25rem' }}>
              The result is a class of businesses that are perpetually capable of more than they
              produce. Not because the people are wrong. Because the infrastructure is missing.
              Point solutions exist for every problem, but they do not add up to an operating
              system. Each one creates its own queue. None of them talk to each other. And none of
              them reduce the number of decisions the owner needs to make each day.
            </p>
            <p className="body-md" style={{ color: 'var(--oa-slate)' }}>
              That is the problem Echo 1 Labs was built to solve.
            </p>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="section" style={{ borderTop: '1px solid var(--oa-border)' }}>
        <div className="container">
          <Eyebrow tone="muted">What we believe</Eyebrow>
          <h2 className="display-md" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Supervision scales. Execution does not.
          </h2>
          <div
            style={{
              background: 'var(--oa-panel)',
              border: '1px solid var(--oa-border-accent)',
              borderRadius: 'var(--oa-radius)',
              padding: '2.5rem 2.75rem',
              marginBottom: '2rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--oa-font-display)',
                fontSize: 'clamp(1rem, 2.4vw, 1.375rem)',
                fontWeight: 800,
                lineHeight: 1.4,
                color: 'var(--oa-white)',
              }}
            >
              &ldquo;<span style={{ color: 'var(--oa-ember)' }}>Built by operators.</span> Run by
              agents.{' '}
              <span style={{ color: 'var(--oa-ember)' }}>Supervised by humans</span> at scale.&rdquo;
            </p>
          </div>
          <div style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
            <p className="body-md" style={{ color: 'var(--oa-slate)', marginBottom: '1.25rem' }}>
              The BLM OS is built on a specific premise: agents should run execution, and humans
              should supervise it. Not because humans are slow, but because that is the correct
              division of labor. Routine decisions should not require the owner&rsquo;s attention.
              Consequential decisions always will.
            </p>
            <p className="body-md" style={{ color: 'var(--oa-slate)' }}>
              Supervision at scale is different from execution at scale. You can supervise many
              things at once. You cannot execute many things at once. The BLM OS is designed to
              expand what one person can supervise, not to replace judgment.
            </p>
          </div>
          <InViewStagger className="grid-2">
            {PRINCIPLES.map((p) => (
              <Card key={p.num}>
                <div style={{ marginBottom: 10 }}>
                  <Badge tone="muted">{p.num}</Badge>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    marginBottom: 8,
                    color: 'var(--oa-white)',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--oa-slate)', lineHeight: 1.7 }}>
                  {p.body}
                </p>
              </Card>
            ))}
          </InViewStagger>
        </div>
      </section>

      {/* The product */}
      <section className="section" style={{ borderTop: '1px solid var(--oa-border)' }}>
        <div className="container">
          <Eyebrow tone="muted">The product</Eyebrow>
          <h2 className="display-md" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            Seven layers. One operating system.
          </h2>
          <p className="body-md" style={{ color: 'var(--oa-slate)', maxWidth: '640px', marginBottom: '2rem' }}>
            The BLM OS covers the full operational lifecycle of an owner-led business. Every layer
            connects to the same Fusion Grid data architecture and reports to Prime, the governance
            layer.
          </p>
          <div className="grid-2">
            {APPS.map((app) => (
              <div
                key={app.num}
                style={{
                  background: 'var(--oa-surface)',
                  border: '1px solid var(--oa-border)',
                  borderRadius: 'var(--oa-radius-sm)',
                  padding: '0.875rem 1.125rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--oa-font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    color: 'var(--oa-slate)',
                    flexShrink: 0,
                  }}
                >
                  {app.num}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--oa-font-display)',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      color: 'var(--oa-white)',
                    }}
                  >
                    {app.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--oa-slate)' }}>{app.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we build for */}
      <section className="section" style={{ borderTop: '1px solid var(--oa-border)' }}>
        <div className="container">
          <Eyebrow tone="muted">Who we build for</Eyebrow>
          <h2 className="display-md" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Owner-led businesses between $5M and $100M.
          </h2>
          <div style={{ maxWidth: '720px' }}>
            <p className="body-md" style={{ color: 'var(--oa-slate)', marginBottom: '1.25rem' }}>
              The BLM OS is built for businesses with 50 to 200 employees where the owner retains
              active operational authority. Businesses that are large enough to have real operational
              surface area but structured in a way that makes adding headcount to cover it the wrong
              answer.
            </p>
            <p className="body-md" style={{ color: 'var(--oa-slate)' }}>
              This is not a category that has historically had good infrastructure options. Enterprise
              software is built for large teams and long procurement cycles. Point solutions are built
              for individual use cases. The BLM OS is built for the in-between — businesses that are
              serious, complex, and owner-operated.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" style={{ borderTop: '1px solid var(--oa-border)' }}>
        <div className="container">
          <Eyebrow tone="muted">Contact</Eyebrow>
          <h2 className="display-md" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            Get in touch.
          </h2>
          <p className="body-md" style={{ color: 'var(--oa-slate)', marginBottom: '2rem' }}>
            For Founding Cohort inquiries, partnerships, press, or general questions about the BLM OS.
          </p>
          <Card>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 800,
                    fontSize: '1.125rem',
                    color: 'var(--oa-white)',
                    marginBottom: '0.375rem',
                  }}
                >
                  Direct line
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--oa-slate)' }}>
                  For Founding Cohort applicants, operators interested in the BLM OS, and any
                  questions about the platform.
                </p>
              </div>
              <a
                href="mailto:hello@echo1labs.com"
                style={{
                  fontFamily: 'var(--oa-font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'var(--oa-ember)',
                  color: 'var(--oa-white)',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--oa-radius-sm)',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
              >
                hello@echo1labs.com
              </a>
            </div>
          </Card>
        </div>
      </section>

      <CTA
        eyebrow="Break free from business gravity."
        headline="Ready to see the OS?"
        sub="Join the Founding Cohort to get access, locked-in pricing, and direct input into the product as we ship the remaining layers."
        buttonLabel="Join Founding Cohort"
        buttonHref="/contact"
        dark
      />
    </>
  );
}
