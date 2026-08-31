import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { Eyebrow, Badge } from '@/components/ds';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Glossary',
  description:
    'Definitions for the terms and concepts used across the BLM OS — agents, layers, Fusion Grid, Prime, and the supervision model.',
  path: '/glossary',
});

interface Term {
  name: string;
  def: string;
  tag?: string;
}

const TERMS: Term[] = [
  { name: 'Agent', def: 'A software process that executes a defined task on a schedule or in response to an event, without requiring a human to initiate or complete each instance. In the BLM OS, agents are the execution layer — they run within each operational layer and report exceptions and completions to Prime.' },
  { name: 'Agent Layer', def: 'The tier of the BLM OS architecture that sits between the Fusion Grid (data) and Prime (governance). All seven operational layers run their specialist agents within this tier. The agent layer is what moves work forward without waiting for the operator.' },
  { name: 'Approval Gate', def: "A configured checkpoint where an agent pauses and routes a decision to the operator before continuing. Approval gates are set by the operator for high-value or high-risk actions — payments above a threshold, outreach messages, content before it publishes. They surface in Prime's approval queue." },
  { name: 'BLM OS', def: 'Business Lifecycle Management Operating System. The integrated seven-layer agent system built by Echo 1 Labs for owner-led businesses. The OS covers go-to-market, revenue operations, marketing, finance, document intelligence, market intelligence, and governance in a single coordinated architecture.' },
  { name: 'Broadcast', def: 'The marketing layer of the BLM OS. Broadcast runs content brief generation, drafting across channels, scheduling, and performance monitoring. The operator approves briefs and drafts; execution runs on the schedule they configure. Connected to Prime for briefing and exception reporting.', tag: 'Layer 03' },
  { name: 'Business Lifecycle Management', def: 'A category of business infrastructure that covers the full operational lifecycle of a business through an integrated agent layer, supervised by a governance layer. Echo 1 Labs is the defining company in this category.' },
  { name: 'Confidence Threshold', def: 'A configurable minimum confidence score below which an agent will not act autonomously and will instead escalate to the exception queue. Confidence thresholds let the operator define how much uncertainty is acceptable before a human decision is required.' },
  { name: 'CRM Hygiene', def: 'The ongoing maintenance of accurate and current data within a customer relationship management system. In the RevOps layer, CRM hygiene is handled automatically through stage-gate automation and field updates based on activity signals, rather than requiring manual cleanup.' },
  { name: 'Engine', def: "The go-to-market layer of the BLM OS. Engine handles ICP prospecting, contact enrichment, outreach sequencing, meeting scheduling, and pipeline velocity monitoring. The operator configures the ICP and approves messaging; outreach executes on schedule regardless of the operator's daily bandwidth.", tag: 'Layer 01' },
  { name: 'Event-Triggered Agent', def: 'An agent that activates when a specific condition occurs — an invoice arriving, a deal entering a new stage, a document being uploaded — rather than on a fixed schedule. Event-triggered agents reduce latency between a business event and the appropriate response.' },
  { name: 'Exception Queue', def: "The list of items that agents have escalated because they fall outside configured parameters. The operator reviews the exception queue through Prime and makes decisions on each item. Exceptions are the primary surface where the operator's attention is directed." },
  { name: 'Founding Cohort', def: 'The first group of businesses onboarded to the BLM OS. Founding Cohort members receive locked-in pricing, priority access to new layers as they ship, and direct input into the product development process. Access is application-based.' },
  { name: 'Fusion Grid', def: "The data integration and normalization layer of the BLM OS. The Fusion Grid connects to the business's existing tools — CRM, QuickBooks, project management, communication platforms — and normalizes their data into a consistent schema that all seven agent layers can operate against without custom translation logic per source." },
  { name: 'Governance Layer', def: 'The supervision tier of the BLM OS, implemented by Prime. The governance layer compiles activity from all seven operational layers, surfaces exceptions and approvals, and maintains the structured record of what agents have done and what decisions the operator has made. It is how humans stay in control when agents are running operations.' },
  { name: 'ICP', def: "Ideal Customer Profile. A defined description of the company type, revenue band, headcount range, industry, role, and problem that an outreach program is designed to reach. In the BLM OS, the ICP is the configuration input for the Engine layer's prospecting and enrichment agents." },
  { name: 'Ledger', def: 'The finance operations layer of the BLM OS. Ledger handles daily general ledger reconciliation, accounts payable routing and approval, cash flow monitoring and projection, and expense categorization. Native integration with QuickBooks. Founding Cohort waitlist open.', tag: 'Layer 04 · Coming Soon' },
  { name: 'Operator', def: "In the BLM OS model, the operator is the human in the supervision role — the owner or the designated point of authority. The operator configures the agents, reviews exceptions, approves high-value actions, and reads the daily briefing. They do not run execution; they supervise it." },
  { name: 'Owner-Led Business', def: 'A company where the owner or founder retains active operational authority — making or approving key decisions across revenue, finance, and operations. The BLM OS is built specifically for this profile: $5M to $100M revenue, 50 to 200 employees, no dedicated RevOps or marketing operations team.' },
  { name: 'Pipeline Velocity', def: "The rate at which deals move through the sales pipeline from initial contact to close. The RevOps layer's Pipeline Velocity Monitor tracks stalls and flags deals that are not moving at the expected rate, so the operator can re-engage before opportunities go cold." },
  { name: 'Prime', def: 'The governance layer of the BLM OS. Prime compiles a daily briefing from all seven operational layers, manages the exception queue and approval gates, and maintains a structured record of agent activity and operator decisions. It is the primary interface between the operator and everything the system is doing on their behalf.', tag: 'Layer 07' },
  { name: 'RevOps', def: 'The revenue operations layer of the BLM OS. RevOps handles lead qualification scoring, deal intelligence and stall detection, rolling pipeline forecasting, revenue reconciliation against accounting records, and CRM data hygiene. It delivers the operational discipline of a full RevOps team without the headcount.', tag: 'Layer 02' },
  { name: 'Scheduled Agent', def: 'An agent that runs on a fixed cadence — daily, weekly, or at a configured interval — regardless of whether a specific event triggered it. GL reconciliation, content brief generation, and pipeline forecasting are examples of tasks that run on schedule rather than on event.' },
  { name: 'Signal', def: 'The market intelligence layer of the BLM OS. Signal is designed for PE-backed businesses and capital allocators who need business intelligence in a transaction context. It is not self-serve; access requires application and individual review. No pricing is publicly listed.', tag: 'Layer 06 · Private Access' },
  { name: 'Supervision Model', def: 'The operating principle underlying the BLM OS: agents run execution, operators supervise it. The supervision model defines which decisions require human judgment and which can be handled autonomously. It is implemented through approval gates, confidence thresholds, and the Prime exception queue.' },
  { name: 'Titan', def: 'The document intelligence layer of the BLM OS. Titan classifies incoming documents by type, extracts structured data from them, parses contract terms and obligations, and matches invoices against purchase orders. It processes documents on arrival rather than when someone has time to review them.', tag: 'Layer 05' },
];

// Group by first letter
function groupByLetter(terms: Term[]): Map<string, Term[]> {
  const map = new Map<string, Term[]>();
  for (const term of terms) {
    const letter = term.name[0].toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(term);
  }
  return map;
}

export default function GlossaryPage() {
  const grouped = groupByLetter(TERMS);
  const letters = Array.from(grouped.keys()).sort();

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Echo 1 Labs BLM OS Glossary',
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.name,
      description: t.def,
    })),
  };

  return (
    <>
      <JsonLd data={definedTermSet} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Glossary', path: '/glossary' },
        ])}
      />

      {/* Hero */}
      <section className="section--sm">
        <div className="container">
          <Eyebrow>Glossary</Eyebrow>
          <h1 className="display-md" style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
            Terms and concepts.
          </h1>
          <p className="body-lg" style={{ maxWidth: '520px' }}>
            Definitions for the language used across the BLM OS — agents, layers, and the
            infrastructure that connects them.
          </p>

          {/* Jump nav */}
          <div
            style={{
              display: 'flex',
              gap: '0.35rem',
              flexWrap: 'wrap',
              marginTop: '1.5rem',
            }}
          >
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                style={{
                  fontFamily: 'var(--oa-font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--oa-text-secondary)',
                  border: '1px solid var(--oa-border-subtle)',
                  padding: '4px 9px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`} style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
                <p
                  style={{
                    fontFamily: 'var(--oa-font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    letterSpacing: '-0.03em',
                    color: 'var(--oa-ember)',
                    opacity: 0.18,
                    lineHeight: 1,
                    marginBottom: '1rem',
                  }}
                >
                  {letter}
                </p>
                <div className="stack" style={{ gap: '0.5rem' }}>
                  {grouped.get(letter)!.map((term) => (
                    <div key={term.name} className="card" style={{ padding: '1.125rem 1.375rem' }}>
                      {term.tag && (
                        <div style={{ marginBottom: '0.5rem' }}>
                          <Badge tone="ion">{term.tag}</Badge>
                        </div>
                      )}
                      <p
                        style={{
                          fontFamily: 'var(--oa-font-display)',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: 'var(--oa-white)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {term.name}
                      </p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--oa-text-secondary)', lineHeight: 1.75, margin: 0 }}>
                        {term.def}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
