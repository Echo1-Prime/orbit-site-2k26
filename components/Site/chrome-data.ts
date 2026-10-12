/* Copy and behaviour for the site chrome, taken verbatim from the design handoff
   ("Echo 1 Labs Home.dc.html": nav, menu, drawer, concierge). Do not rewrite copy here.
   Deviations, each listed in the PR:
   - STARTERS omits the handoff's fourth chip, the "how is this different" one (it names a vendor;
     handoff open item 7). The matching answer stays reachable by typing.
   - DEST routes point at routes that exist on the site today (UNVERIFIED mapping, Josh to confirm):
     the handoff's own routes are stubs ("Destination page, outside this prototype"). */

export type DestKey = 'titan' | 'signal' | 'orbit' | 'pricing' | 'cohort' | 'start';

export interface Dest {
  eyebrow: string;
  title: string;
  line: string;
  route: string;
}

export const NAV_LINKS = [
  { href: '/#bls', label: 'Lifecycle' },
  { href: '/#process', label: 'How it runs' },
  { href: '/#agent-orbit', label: 'Agent Orbit' },
  { href: '/#governance', label: 'Governance' },
  { href: '/pricing', label: 'Pricing' },
] as const;

export const DEST: Record<DestKey, Dest> = {
  titan: { eyebrow: 'Build it', title: 'Titan', line: 'Construction Lifecycle Management', route: '/products/titan' },
  signal: { eyebrow: 'Buy it', title: 'Signal', line: 'M&A Lifecycle Management, starting with deal sourcing', route: '/products/signal' },
  orbit: { eyebrow: 'Run it', title: 'Agent Orbit', line: 'Operational Lifecycle Management, with you in the chair', route: '/#agent-orbit' },
  pricing: { eyebrow: 'Published', title: 'Pricing', line: 'Everything we charge, on one page', route: '/pricing' },
  cohort: { eyebrow: 'First in', title: 'Founding Cohort', line: 'How the first companies work with us', route: '/founding-cohort' },
  start: { eyebrow: 'Handoff · A person', title: 'Start the conversation', line: 'A person at Echo 1 Labs reads it. Not an agent.', route: '/contact' },
};

/** The three cards in the "Where operators go next" drawer. */
export const DRAWER_CARDS: { dest: DestKey; eyebrow: string; title: string; line: string }[] = [
  { dest: 'orbit', eyebrow: 'Run it', title: 'Agent Orbit', line: 'See the command center up close.' },
  { dest: 'cohort', eyebrow: 'First in', title: 'Founding Cohort', line: 'How the first companies work with us.' },
  { dest: 'pricing', eyebrow: 'Published', title: 'Pricing', line: 'No call required to see it.' },
];

export const STARTERS = [
  'What would this run in a company like mine?',
  'Show me Signal',
  'What does it cost?',
];

export const FAQ = [
  { q: 'What is Echo 1 Labs?', a: 'The Business Lifecycle Management company. Seven apps, one lifecycle, run by agents you supervise.' },
  { q: 'Is this a chat assistant?', a: 'No. Agents hold defined roles, hand work to each other, and log every action. Every one starts supervised.' },
  { q: 'Where is pricing?', a: 'On the pricing page. Nothing is quoted anywhere else.' },
  { q: 'How do I reach a person?', a: 'Start the conversation. A person at Echo 1 Labs reads it.' },
];

const ANS = {
  run: 'Usually the work that waits on you. The close, the pipeline, the bids, the approvals. Every agent starts in Shadow, watching how your people do it now, before it drafts anything. Tell me your industry and headcount and I can be more specific.',
  signal: 'Signal is M&A Lifecycle Management, starting with deal sourcing. It finds acquisition targets, businesses for sale and owners preparing to step back, and screens each one against criteria you set once: margin profile, owner transition, customer concentration, geography. The few that clear the bar reach you with their evidence. The call is still yours.',
  diff: 'A chat assistant makes one person faster at one task. This makes the company faster. Agents here hold defined roles, hand work to each other, check each other, and log everything they do. And every one starts supervised.',
  cost: 'Pricing is published, and I only quote what is on that page. If you are weighing the Founding Cohort, its terms are on their own page.',
  roi: 'I will not put a number on that. It depends on how your work moves today, and anyone who quotes a figure before seeing it is guessing. A person can walk your processes with you.',
  titan: 'Titan is Construction Lifecycle Management. It runs construction from plan set to closeout. Takeoff, bid assembly, subcontractor scope, and fulfillment, with an agent on each handoff and you at the gate.',
  cohort: 'The Founding Cohort is the first group of companies running the full lifecycle with us. Fit, terms, and timing are on its page.',
  orbit: 'Agent Orbit is Operational Lifecycle Management, where you supervise all of it. Every agent, its trust level, and every action it has taken, on one surface. You can pull any agent back a rung at any time.',
  human: 'A person can take it from here. Start the conversation and someone at Echo 1 Labs reads it.',
  diag: 'That pattern has a name here: business gravity. Everything routes through you, so the company moves at the speed of your calendar. The usual first step is mapping where those decisions actually go, then putting one agent in Shadow on the busiest one.',
} as const;

export type Answer =
  | { kind: 'agent'; text: string; dest: DestKey }
  | { kind: 'unknown' }
  | { kind: 'error' };

/** Stub from the handoff: returns an answer, "I do not know", or an error. Wire to a real
 *  service later; the FAQ fallback must stay (handoff "State management"). */
export function answer(text: string, opt?: { diag?: boolean }): Answer {
  const t = text.toLowerCase();
  if (opt?.diag) return { kind: 'agent', text: ANS.diag, dest: 'start' };
  if (/offline/.test(t)) return { kind: 'error' };
  if (/company like mine|what would (this|it) run/.test(t)) return { kind: 'agent', text: ANS.run, dest: 'orbit' };
  if (/\broi\b|return on|payback|how much (will|would) (i|we) save|save me/.test(t)) return { kind: 'agent', text: ANS.roi, dest: 'start' };
  if (/price|pricing|cost|how much|fee/.test(t)) return { kind: 'agent', text: ANS.cost, dest: 'pricing' };
  if (/cohort|founding/.test(t)) return { kind: 'agent', text: ANS.cohort, dest: 'cohort' };
  if (/signal|acqui|m&a|deal|target|buy a/.test(t)) return { kind: 'agent', text: ANS.signal, dest: 'signal' };
  if (/titan|construct|bid|takeoff|contractor|plan set/.test(t)) return { kind: 'agent', text: ANS.titan, dest: 'titan' };
  if (/chatgpt|gpt|copilot|gemini|claude|assistant|different/.test(t)) return { kind: 'agent', text: ANS.diff, dest: 'orbit' };
  if (/human|person|talk to|call|meet|demo|sales/.test(t)) return { kind: 'agent', text: ANS.human, dest: 'start' };
  if (/orbit|agent|govern|supervis|trust|shadow|log|prime/.test(t)) return { kind: 'agent', text: ANS.orbit, dest: 'orbit' };
  return { kind: 'unknown' };
}

export const UNKNOWN_TEXT =
  'I do not know that one, and I would rather not guess. A person at Echo 1 Labs can answer it properly.';
