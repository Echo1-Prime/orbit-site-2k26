import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import { Eyebrow } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Outcomes',
  description:
    'What changes when agents run your operations. Real outcomes from the BLM OS across go-to-market, sales, content, and finance.',
  path: '/outcomes',
});

const METRICS = [
  {
    value: '15–20',
    label: 'Hours reclaimed weekly',
    note: 'Manual execution hours shifted from operator to agent: outreach, scheduling, reconciliation, reporting.',
    frame: 'Typical · OOB config',
  },
  {
    value: '5×',
    label: 'Outreach cadence',
    note: 'Prospecting and outreach running 5 days per week without manual sends or sequence management.',
    frame: 'Typical · Engine OOB',
  },
  {
    value: 'Same day',
    label: 'Month-end close review',
    note: 'GL reconciliation completes daily. Month-end becomes a review of a prepared package, not a sprint to gather numbers.',
    frame: 'Typical · Ledger OOB',
  },
  {
    value: '<24 hrs',
    label: 'AP processing time',
    note: 'Invoices classified, extracted, GL-coded, and routed for approval within 24 hours of receipt, without manual handling.',
    frame: 'Typical · Titan + Ledger',
  },
];

type LogLine = {
  ts: string;
  agent: string;
  msg: string;
  ok?: boolean;
};

type Story = {
  domain: string;
  app: string;
  lines: LogLine[];
  summary: string;
};

const STORIES: Story[] = [
  {
    domain: 'Engine',
    app: 'Go-to-Market',
    lines: [
      { ts: '06:00', agent: 'ICP Prospector', msg: 'ICP match run: 47 net-new accounts identified' },
      { ts: '06:04', agent: 'ICP Prospector', msg: 'Enrichment complete: revenue, headcount, tech stack appended' },
      { ts: '06:09', agent: 'Outreach Sequencer', msg: '38 contacts entered Step 1 sequence: emails queued' },
      { ts: '09:14', agent: 'Outreach Sequencer', msg: '4 positive replies detected: moved to active thread' },
      { ts: '09:17', agent: 'Meeting Scheduler', msg: '3 meetings booked: calendar invites sent' },
      { ts: '09:18', agent: 'Pipeline Monitor', msg: 'Prime briefing updated: 3 new meetings this cycle', ok: true },
    ],
    summary: 'The operator reviews the Prime briefing at 9:30am. The pipeline moved without a single manual send.',
  },
  {
    domain: 'RevOps',
    app: 'Deal Intelligence',
    lines: [
      { ts: '00:00', agent: 'Pipeline Monitor', msg: 'Velocity scan complete: 6 deals reviewed' },
      { ts: '00:01', agent: 'Pipeline Monitor', msg: 'Deal #0042: 12 days stall detected at Proposal stage' },
      { ts: '00:02', agent: 'Deal Analyzer', msg: 'Stall analysis: no activity since demo, champion unresponsive' },
      { ts: '00:04', agent: 'Outreach Sequencer', msg: 'Re-engagement sequence initiated: Day 1 touchpoint queued' },
      { ts: '10:31', agent: 'Deal Analyzer', msg: 'Reply received: champion re-engaged, meeting requested' },
      { ts: '10:33', agent: 'Pipeline Monitor', msg: 'Deal #0042 moved to Negotiation: Prime queue updated', ok: true },
    ],
    summary: 'The deal was stalling. The operator did not notice; the OS did. By morning, re-engagement was already underway.',
  },
  {
    domain: 'Broadcast',
    app: 'Content Pipeline',
    lines: [
      { ts: 'Mon 08:00', agent: 'Content Generator', msg: 'Weekly content brief processed: 4 posts drafted' },
      { ts: 'Mon 08:06', agent: 'Content Generator', msg: 'Drafts submitted to review queue in Prime' },
      { ts: 'Mon 09:15', agent: 'Prime', msg: 'Operator approved 3 of 4: 1 returned for revision' },
      { ts: 'Mon 09:17', agent: 'Social Scheduler', msg: '3 posts scheduled: Tue 8am, Wed 12pm, Thu 7am' },
      { ts: 'Thu 07:00', agent: 'Social Scheduler', msg: 'Week 3 cadence complete: all 3 posts published on schedule' },
      { ts: 'Thu 07:02', agent: 'Campaign Reporter', msg: 'Engagement summary in Prime: Week 3 complete', ok: true },
    ],
    summary: '15 minutes of operator review on Monday. The rest of the week\'s content ran without another touch.',
  },
  {
    domain: 'Titan',
    app: 'Document Intelligence',
    lines: [
      { ts: '14:03', agent: 'Doc Classifier', msg: 'Invoice received, vendor: Acme Supplies, type: AP invoice' },
      { ts: '14:03', agent: 'Data Extractor', msg: 'Extracted: amount $4,820, due 30 days, PO ref #PO-0091' },
      { ts: '14:04', agent: 'Data Extractor', msg: 'PO match confirmed: line items reconciled' },
      { ts: '14:04', agent: 'GL Reconciler', msg: 'GL code assigned: COGS:Materials:Supplies' },
      { ts: '14:05', agent: 'Invoice Processor', msg: 'AP record created: approval routed to operator queue' },
      { ts: '14:06', agent: 'Prime', msg: 'Invoice queued for approval: no manual entry required', ok: true },
    ],
    summary: 'Invoice to approval queue in under 3 minutes. The operator clicks approve. That is the full extent of the manual work.',
  },
];

const FAQS = [
  {
    q: 'Are these outcomes guaranteed?',
    a: 'No. The metrics and scenarios described represent typical patterns from OOB BLM OS configuration in operator-led businesses with clean data and active supervision. Individual results vary based on industry, data quality, team structure, and how actively the operator configures and reviews agent output.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Outreach and pipeline activity from Engine typically begins within the first week after ICP configuration. Content cadence from Broadcast follows quickly. Financial operations from Ledger and document processing from Titan take longer to calibrate, typically 2 to 4 weeks to establish reliable baseline behavior.',
  },
  {
    q: 'What does "manual execution reclaimed" mean?',
    a: 'It refers to the hours per week typically spent on repeatable execution tasks (writing and sending outreach, updating CRM records, scheduling and posting content, processing invoices, reconciling ledgers) that agents handle instead. It does not include strategic work, client relationships, or judgment-intensive decisions.',
  },
  {
    q: 'Do I need to be technical to get these results?',
    a: 'No. The BLM OS is designed for operators, not developers. Configuration is done through the Prime dashboard. Agents run on the infrastructure we provide. The operator\'s job is to review output, tune thresholds, and handle exceptions, not to build or maintain the system.',
  },
  {
    q: 'What happens when an agent makes a mistake?',
    a: 'All agent output routes to Prime for supervision before consequential action is taken. Operators set confidence thresholds: below threshold, actions queue for review rather than executing automatically. The system is designed for operators to stay in control of outcomes, not to trust agents blindly.',
  },
  {
    q: 'What does a Founding Cohort membership include?',
    a: 'Founding Cohort members join at a locked rate of $997/month for the Growth tier. This includes all seven apps, 16 OOB agents, Prime governance, and direct access to the Echo 1 Labs team during the build period. Ledger is included when it ships. No additional charge during Founding Cohort membership.',
  },
];

export default function OutcomesPage() {
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
          { name: 'Outcomes', path: '/outcomes' },
        ])}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>Outcomes</Eyebrow>
            <h1 className="display-md" style={{ marginTop: '0.75rem' }}>
              What actually changes.
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px', marginTop: '1rem' }}>
              The operations that used to run on your time now run on agent time. Here is what
              that looks like in practice.
            </p>
            <p
              style={{
                fontFamily: 'var(--oa-font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--oa-text-muted)',
                marginTop: '0.75rem',
              }}
            >
              Typical patterns. Not guarantees. Results vary by configuration, data quality, and operator engagement.
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
                <p style={{ fontSize: '0.78rem', color: 'var(--oa-text-muted)', margin: '0 0 0.5rem', lineHeight: 1.5 }}>
                  {m.note}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--oa-font-mono)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--oa-text-muted)',
                    margin: 0,
                  }}
                >
                  {m.frame}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Execution stories */}
      <section
        className="section"
        style={{ background: 'var(--oa-panel)', borderTop: '1px solid var(--oa-border-subtle)' }}
      >
        <div className="container">
          <div className="section-header">
            <Eyebrow>What the OS does while you are not watching</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem' }}>
              Four typical execution sequences.
            </h2>
            <p className="body-md" style={{ maxWidth: '520px', marginTop: '0.75rem' }}>
              Across go-to-market, sales, content, and finance. No company names. These represent
              common patterns, not specific clients.
            </p>
          </div>

          <div className="stack" style={{ gap: '1.5rem' }}>
            {STORIES.map((story) => (
              <div key={story.domain} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Terminal bar */}
                <div
                  style={{
                    padding: '0.6rem 1rem',
                    borderBottom: '1px solid var(--oa-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--oa-panel)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['var(--oa-state-error)', 'var(--oa-state-warning)', 'var(--oa-state-success)'].map((c, i) => (
                      <span
                        key={i}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: c,
                          display: 'block',
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--oa-font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--oa-text-muted)',
                    }}
                  >
                    {story.domain} · {story.app}
                  </span>
                </div>

                {/* Log lines */}
                <div style={{ padding: '1.25rem 1.25rem 0.75rem', fontFamily: 'var(--oa-font-mono)', fontSize: '0.72rem', lineHeight: 1.8 }}>
                  {story.lines.map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: 'var(--oa-text-muted)', flexShrink: 0, minWidth: '3.5rem' }}>
                        {line.ts}
                      </span>
                      <span style={{ color: 'var(--oa-ember)', flexShrink: 0, minWidth: '9rem' }}>
                        {line.agent}
                      </span>
                      <span style={{ color: line.ok ? 'var(--oa-state-success)' : 'var(--oa-text-secondary)' }}>
                        {line.ok ? '→ ' : ''}{line.msg}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div
                  style={{
                    padding: '0.75rem 1.25rem 1.25rem',
                    borderTop: '1px solid var(--oa-border-subtle)',
                    marginTop: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--oa-text-secondary)',
                    lineHeight: 1.7,
                  }}
                >
                  {story.summary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>Questions about outcomes</Eyebrow>
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
        headline="See it in your business."
        sub="Join the Founding Cohort to get hands-on access and locked-in pricing."
        buttonLabel="Apply Now"
        buttonHref="/founding-cohort"
        dark
      />
    </>
  );
}
