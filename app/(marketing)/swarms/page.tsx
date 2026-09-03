import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Agent Swarms',
  description:
    'Eight agent swarms, each running the work of a core business function. You supervise the decisions; the swarm runs the execution.',
  path: '/swarms',
});

// Role-level only. Each swarm is described by the business function it fills,
// never by its internal composition. No agent names, no counts, no taxonomy.
const SWARMS = [
  {
    role: 'Go-to-Market',
    body: 'Finds and warms your next accounts. Prospecting, enrichment, and outreach that run on a set cadence instead of on your attention.',
  },
  {
    role: 'Revenue Operations',
    body: 'Qualifies inbound, surfaces stalled deals, and keeps the forecast honest. The operational discipline of a RevOps team without the headcount.',
  },
  {
    role: 'Marketing & Content',
    body: 'Produces and publishes multi-channel content on brand and on schedule, then reports what moved.',
  },
  {
    role: 'Finance & Accounting',
    body: 'Runs the close, reconciles the ledger against the books, and watches cash position so nothing compounds unseen.',
  },
  {
    role: 'Data & Document Intelligence',
    body: 'Turns unstructured documents into clean, structured data, with quality and compliance checks built in.',
  },
  {
    role: 'Engineering & Automation',
    body: 'Connects your systems and automates the repetitive work between them, so execution keeps moving after hours.',
  },
  {
    role: 'Advisory & Diligence',
    body: 'Builds the models, runs the analysis, and pressure-tests the numbers ahead of a decision or a deal.',
  },
  {
    role: 'Executive Operations',
    body: 'Coordinates across every function, triages what needs you, and keeps the day moving from one system of record.',
  },
];

export default function SwarmsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Agent Swarms', path: '/swarms' },
        ])}
      />
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label">Agent Swarms</p>
            <h1 className="display-lg" style={{ marginBottom: '1rem' }}>
              Eight swarms. Eight departments, on demand.
            </h1>
            <p className="body-lg" style={{ maxWidth: '620px' }}>
              Every core function of the business has a swarm built to run it. You supervise the
              decisions. The swarm runs the execution, on cadence, across the whole operation.
            </p>
          </div>

          <div className="swarms-grid">
            {SWARMS.map((s) => (
              <div key={s.role} className="card swarm-card">
                <h3 className="swarm-card__role">{s.role}</h3>
                <p className="swarm-card__body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Founding Cohort"
        headline="Put a department to work."
        sub="Application-based access. Founding-cohort pricing. Most operators are live in six to eight weeks."
        buttonLabel="Apply Now"
        buttonHref="/founding-cohort"
        dark
      />

      <style>{`
        .swarms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .swarm-card {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding: 1.75rem;
        }
        .swarm-card__role {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--e1-white);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .swarm-card__body {
          font-size: 0.875rem;
          color: var(--e1-text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        @media (max-width: 640px) {
          .swarms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
