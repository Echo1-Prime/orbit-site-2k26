import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import AgentsGrid from './AgentsGrid';
import CTA from '@/components/CTA/CTA';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Agent Marketplace',
  description:
    '200+ specialist agents across every business domain. 16 out-of-the-box agents ship with all active plans. No marketplace credit required. Filter by app domain.',
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
            <p className="label">Agent Marketplace</p>
            <h1 className="display-lg" style={{ marginBottom: '1rem' }}>
              200+ agents. Each one a specialist.
            </h1>
            <p className="body-lg" style={{ maxWidth: '560px' }}>
              Every function of the BLM OS has a team of agents built for it. Browse by domain,
              deploy from Prime, supervise from one layer.
            </p>
            <p className="agents-hero-count">
              <strong>16</strong> ship out-of-the-box &nbsp;&middot;&nbsp; <strong>200+</strong> in
              the full marketplace &nbsp;&middot;&nbsp; sample shown below
            </p>
          </div>

          <AgentsGrid />
        </div>
      </section>

      <CTA
        eyebrow="Founding Cohort"
        headline="Activate your first agents."
        sub="Application-based access. Founding-cohort pricing. Most operators are live in six to eight weeks."
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
          background: rgba(255, 117, 21, 0.08);
        }
        .agents-filter__count {
          font-size: 0.75rem;
          opacity: 0.6;
        }

        .agents-hero-count {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--e1-font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--e1-text-secondary);
          margin-top: 1.25rem;
        }
        .agents-hero-count strong {
          color: var(--e1-ember);
          font-family: var(--e1-font-display);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
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
        .agent-card__product {
          font-size: 0.65rem;
          font-family: var(--e1-font-mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--e1-ion);
          background: rgba(255, 117, 21, 0.08);
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
        }
        .agent-card__trigger {
          font-size: 0.6rem;
          font-family: var(--e1-font-mono);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--e1-text-muted);
          background: var(--e1-surface-raised);
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          flex-shrink: 0;
        }
        .agent-card__name {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--e1-white);
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .agent-card__desc {
          font-size: 0.8125rem;
          color: var(--e1-text-secondary);
          line-height: 1.55;
          margin: 0;
          flex: 1;
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
