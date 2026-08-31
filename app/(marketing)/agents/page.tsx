import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import AgentsGrid from './AgentsGrid';
import CTA from '@/components/CTA/CTA';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Agent Marketplace',
  description:
    '28 specialist AI agents across Go-to-Market, Revenue, Finance, Operations, and Governance — each engineered for a specific job in the Business Lifecycle Management system.',
  path: '/agents',
});

export default function AgentsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Agent Marketplace', path: '/agents' },
        ])}
      />
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label">28 Specialist Agents</p>
            <h1 className="display-lg" style={{ marginBottom: '1rem' }}>
              Your operating team. On schedule, not on bandwidth.
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px' }}>
              28 specialist agents. Each engineered for a single job in the Business Lifecycle
              Management system. They run on schedule — not on bandwidth, not on headcount.
            </p>
          </div>

          <AgentsGrid />
        </div>
      </section>

      <CTA
        eyebrow="Founding Cohort"
        headline="Activate your first agents."
        sub="Application-based access. Locked pricing. Most operators are live in six to eight weeks."
        buttonLabel="Apply Now"
        buttonHref="/founding-cohort"
        dark
      />

      <style>{`
        .agents-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
        }
        .agents-filter__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-2);
          font-size: 0.85rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: border-color 140ms, color 140ms, background 140ms;
        }
        .agents-filter__btn:hover {
          border-color: var(--text-3);
          color: var(--text);
        }
        .agents-filter__btn--active {
          border-color: var(--link);
          color: var(--link);
          background: rgba(143, 208, 242, 0.08);
        }
        .agents-filter__count {
          font-size: 0.75rem;
          opacity: 0.6;
        }

        .agents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .agent-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.5rem;
        }
        .agent-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }
        .agent-card__icon {
          font-size: 1.5rem;
          line-height: 1;
        }
        .agent-card__product {
          font-size: 0.72rem;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--on-dark-2);
        }
        .agent-card__name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--on-dark-1);
          margin: 0;
        }
        .agent-card__tagline {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--link);
          margin: 0;
          line-height: 1.4;
        }
        .agent-card__desc {
          font-size: 0.875rem;
          color: var(--on-dark-2);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .agent-card__domain {
          display: inline-block;
          margin-top: 0.75rem;
          font-size: 0.7rem;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--on-dark-2);
          padding: 0.2rem 0.5rem;
          border: 1px solid var(--card-border);
          border-radius: 4px;
        }

        @media (max-width: 640px) {
          .agents-grid {
            grid-template-columns: 1fr;
          }
          .agents-filter {
            gap: 0.4rem;
          }
        }
      `}</style>
    </>
  );
}
