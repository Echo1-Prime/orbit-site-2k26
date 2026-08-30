'use client';

import { useState } from 'react';
import { AGENTS, AGENT_DOMAINS, type AgentDomain } from '@/lib/agents';

const ALL = 'All' as const;
type FilterValue = typeof ALL | AgentDomain;

const DOMAIN_COUNT = AGENT_DOMAINS.reduce<Record<AgentDomain, number>>(
  (acc, d) => ({ ...acc, [d]: AGENTS.filter((a) => a.domain === d).length }),
  {} as Record<AgentDomain, number>,
);

export default function AgentsGrid() {
  const [active, setActive] = useState<FilterValue>(ALL);
  const shown = active === ALL ? AGENTS : AGENTS.filter((a) => a.domain === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="agents-filter" role="tablist" aria-label="Filter by domain">
        <button
          role="tab"
          aria-selected={active === ALL}
          className={`agents-filter__btn${active === ALL ? ' agents-filter__btn--active' : ''}`}
          onClick={() => setActive(ALL)}
        >
          All <span className="agents-filter__count">{AGENTS.length}</span>
        </button>
        {AGENT_DOMAINS.map((d) => (
          <button
            key={d}
            role="tab"
            aria-selected={active === d}
            className={`agents-filter__btn${active === d ? ' agents-filter__btn--active' : ''}`}
            onClick={() => setActive(d)}
          >
            {d} <span className="agents-filter__count">{DOMAIN_COUNT[d]}</span>
          </button>
        ))}
      </div>

      {/* Agent grid */}
      <div className="agents-grid animate-stagger" key={active}>
        {shown.map((agent) => (
          <div key={agent.id} className="card agent-card">
            <div className="agent-card__header">
              <span className="agent-card__icon" aria-hidden="true">
                {agent.icon}
              </span>
              <span className="agent-card__product">{agent.product}</span>
            </div>
            <h3 className="agent-card__name">{agent.name}</h3>
            <p className="agent-card__tagline">{agent.tagline}</p>
            <p className="agent-card__desc">{agent.description}</p>
            <span className="agent-card__domain">{agent.domain}</span>
          </div>
        ))}
      </div>
    </>
  );
}
