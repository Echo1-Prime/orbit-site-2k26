// On-brand knowledge base for Orbit's answerFromKnowledgeBase tool.
// Grounded in Brand Kit v1.1 (BLM, 7 products, agent-based). Stale positioning
// from the old Vapi FAQ ("AI-enhanced", "Lead Gen Omega", "Mingma Method",
// fractional-leadership framing) is intentionally excluded. Only still-true
// operational facts (team, contact, security, scheduler, consent) are carried over.

import { PRODUCTS } from '@/lib/products';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '@/lib/site';

export type KbTopic =
  | 'company'
  | 'products'
  | 'pricing'
  | 'process'
  | 'team'
  | 'security'
  | 'contact';

export interface KbEntry {
  topic: KbTopic;
  q: string;
  a: string;
}

export const KNOWLEDGE_BASE: KbEntry[] = [
  {
    topic: 'company',
    q: 'What does Echo 1 Labs do?',
    a: 'Echo 1 Labs is the Business Lifecycle Management company. We get startups and SMBs to escape velocity with process-engineered, agent-based systems that people supervise. We are a boutique built by operators for operators, not a consultancy, agency, or software tool.',
  },
  {
    topic: 'company',
    q: 'What is Business Lifecycle Management?',
    a: 'It is the category we created: one connected system across eight stages of a company lifecycle, from enabling AI on your team to governing a fully agentic operation. Each stage maps to a product, so you start where the pain is and build toward escape velocity.',
  },
  {
    topic: 'products',
    q: 'What products are there?',
    a: 'Seven products across eight lifecycle stages: Engine (go-to-market), RevOps (sales), Broadcast (marketing), Signal (deal flow), Ledger (finance ops, coming soon), Titan (bid and fulfillment), and Prime (governance). AI Readiness is the ENABLE-stage advisory engagement that gets you there.',
  },
  {
    topic: 'products',
    q: 'Is AI Readiness a product?',
    a: 'No. AI Readiness is the ENABLE-stage advisory engagement, not a software product. It is monthly advisory (roughly $2-10K per month) plus scoped project work: secure setup, 101 and 201 training, org and personal skills per seat, and governance.',
  },
  {
    topic: 'pricing',
    q: 'How much does it cost?',
    a: 'AI Readiness advisory runs about $2-10K per month plus scoped project fees. Product engagements are scoped to your stack and stage, so exact numbers come out of a short discovery call rather than a fixed price list.',
  },
  {
    topic: 'process',
    q: 'How do we get started?',
    a: 'The fast path is a short discovery call to scope what to build first. I can point you to the contact page to book it, or capture your details and have the team reach out within one business day.',
  },
  {
    topic: 'process',
    q: 'How long does deployment take?',
    a: 'A full AI Readiness deployment runs six to eight weeks, ending with a governed environment, a trained team, and a 30-60-90 day roadmap. Product rollouts are scoped per engagement.',
  },
  {
    topic: 'team',
    q: 'Who runs Echo 1 Labs?',
    a: 'Josh Meunier is founder and CEO. The leadership team is Katarina Meunier (Chief Experience Officer), Martin Dunn (President), and Stephen Sala (Chief Revenue Officer). Echo 1 Labs is a brand of Mingma Inc.',
  },
  {
    topic: 'security',
    q: 'Is my data secure?',
    a: 'Yes. Client data lives in Postgres on Supabase with row-level security, encrypted at rest, readable only by authorized accounts. We sign mutual NDAs at engagement start and set up a Business Associate Agreement before any regulated health data is involved.',
  },
  {
    topic: 'security',
    q: 'Is this conversation recorded?',
    a: 'Orbit is an AI concierge. If you use voice, your speech is converted to text so I can respond; audio is not stored. You can browse on your own or type instead at any time.',
  },
  {
    topic: 'contact',
    q: 'How do I reach a human?',
    a: `You can reach the team directly at ${CONTACT_EMAIL} or ${CONTACT_PHONE_DISPLAY}. I can also capture your details and have someone follow up within one business day.`,
  },
];

/** One-line-per-product catalog for the system prompt. */
export function productCatalogLines(): string {
  return PRODUCTS.map(
    (p) => `- ${p.name} (${p.stage}${p.isAdvisory ? ', advisory' : ''}${p.comingSoon ? ', coming soon' : ''}): ${p.tagline}. ${p.gridLine}.`,
  ).join('\n');
}

/** Lightweight topic/keyword search — the corpus is tiny, so no vector DB. */
export function searchKnowledge(query: string, topic?: KbTopic): KbEntry[] {
  const q = query.toLowerCase();
  const scored = KNOWLEDGE_BASE.map((e) => {
    let score = 0;
    if (topic && e.topic === topic) score += 3;
    const words = q.split(/\W+/).filter((w) => w.length > 3);
    const hay = `${e.q} ${e.a}`.toLowerCase();
    for (const w of words) if (hay.includes(w)) score += 1;
    return { e, score };
  });
  const hits = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).map((s) => s.e);
  // Always return something useful; fall back to topic matches or the first few entries.
  if (hits.length) return hits.slice(0, 4);
  if (topic) return KNOWLEDGE_BASE.filter((e) => e.topic === topic).slice(0, 4);
  return KNOWLEDGE_BASE.slice(0, 3);
}
