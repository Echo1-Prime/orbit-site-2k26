// Echo 1 Labs product stack: source of truth for cards, nav, and product pages.
// Ported from the Vite app's src/data/products.js. Two brand corrections applied:
//   1. Off-brand per-product colorHex values dropped. Solar is the single accent.
//   2. Retired "enhanced by AI" phrasing (§6) replaced with "Agentic" / "agent-based".
// Eight Harnesses (Product Stack deck, Nov 2026). AI Readiness is the ENABLE-stage
// advisory engagement, NOT a Harness. `isAdvisory: true` flags it.

export interface ProductMetric {
  value: string;
  label: string;
}

export interface ProductCapability {
  name: string;
  desc: string;
}

export interface Product {
  slug: string;
  name: string;
  stage: string;
  category: string;
  /** One-line label used in the lifecycle grid. */
  gridLine: string;
  tagline: string;
  problem: string;
  description: string;
  poster: string;
  deployedIn: string[];
  metrics: ProductMetric[];
  capabilities: ProductCapability[];
  /** AI Readiness only: advisory engagement, excluded from product routes. */
  isAdvisory?: boolean;
  /** Flags a product as pre-release; drives "Coming soon" labels and hides pricing CTAs. */
  comingSoon?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'ai-readiness',
    name: 'AI Readiness',
    stage: 'ENABLE',
    category: 'Enablement',
    gridLine: 'Personal AI to Institutional AI',
    isAdvisory: true,
    tagline: 'From Individual AI to Institutional AI',
    problem:
      'Built for organizations past the AI-experiment phase, turning fragmented individual tool use into Institutional AI with shared standards, secure setup, and governance the leadership team can stand behind.',
    description:
      'AI Readiness is the enablement engagement in the Echo 1 Labs business lifecycle. For organizations that have outgrown individual AI experimentation (every employee using a different tool with no coordination), it delivers Institutional AI: secure environment setup on Claude Team/Enterprise, 101+201 training, five org-wide and five personal skills per seat, ongoing advisory, and governance. Agent-based automation is only sustainable when your team knows how to use it and your leadership knows how to govern it.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/AI%20Readiness.jpg',
    deployedIn: ['Any Organization Adopting AI', '10-200+ Employees', 'Every Industry'],
    metrics: [
      { value: '5/mo', label: 'Automation workflows built' },
      { value: '6-8 wk', label: 'Full deployment timeline' },
      { value: '5+5', label: 'Org skills + personal skills per seat' },
      { value: 'Scoped', label: 'Monthly advisory (ongoing)' },
    ],
    capabilities: [
      { name: 'Assessment & Strategy', desc: 'Use case discovery, data audit, AI opportunity heatmap, ROI model, and 30-60-90 day execution roadmap.' },
      { name: 'AI Training 101', desc: 'Prompting basics, advanced techniques, pitfalls/limitations, system walkthrough, for all employees.' },
      { name: 'AI Training 201', desc: 'Cowork, Claude Code, individual and organizational skills, memory files, security best practices.' },
      { name: 'Institutional Setup', desc: '5 org-wide skills + 5 personal skills per seat, built from individual discovery sessions with each employee.' },
      { name: 'Advisory & Automation', desc: 'Process engineering, 5 workflows/month, 2 trainings/month, full documentation, monthly strategy review.' },
      { name: 'Governance', desc: 'Acceptable use policies, data classification, human-in-the-loop requirements, audit logging, quarterly reviews.' },
    ],
  },
  {
    slug: 'engine',
    name: 'Engine',
    stage: 'STRATEGIZE',
    category: 'Win the business',
    gridLine: 'Voice intake to a GTM plan',
    tagline: 'Win the business.',
    problem:
      'Voice intake to a financial plan and a go-to-market workbook.',
    description:
      'Engine is Harness 1 of 8 in Echo 1 Labs Business Lifecycle Management. It runs voice intake, then discovery and compliance, and builds ICP profiles, a message matrix and a channel strategy, a financial model, creative and a CMO strategy. A person reviews every plan. Outbound waits for your approval, and the voice agent never claims to be human.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Engine.webp',
    deployedIn: ['Owners and sales leaders'],
    metrics: [
      { value: '78', label: 'Agents' },
      { value: '18', label: 'Workflows' },
    ],
    capabilities: [
      { name: 'Voice intake', desc: 'Voice intake, then discovery and compliance.' },
      { name: 'ICP and messaging', desc: 'ICP profiles, message matrix and channel strategy.' },
      { name: 'Plan and model', desc: 'Financial model, creative and CMO strategy.' },
      { name: 'Follow-ups and routing', desc: 'Follow-ups drafted and calls routed by intent, in English or Spanish.' },
      { name: 'Quality gate', desc: 'Risk review and a quality gate before anything ships.' },
      { name: 'Who decides', desc: 'A person reviews every plan. Outbound waits for your approval, and the voice agent never claims to be human.' },
    ],
  },
  {
    slug: 'revops',
    name: 'RevOps',
    stage: 'FIND',
    category: 'Win the business',
    gridLine: 'Every deal moving',
    tagline: 'Every deal moving. Every follow-up sent.',
    problem:
      'Stalled deals get flagged the day they stall, and every follow-up is written and queued for your approval.',
    description:
      'RevOps is Harness 2 of 8. It flags stalled deals the day they stall, writes every follow-up and queues it for approval, scores each deal against your qualification criteria, routes calls by intent in English or Spanish, and runs email and text sequences in your voice, sent after approval. Terms outside your limits go to a named person, and the voice agent never claims to be human.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/RevOps.webp',
    deployedIn: ['Owners and sales leads'],
    metrics: [
      { value: 'Day 1', label: 'Stalled deals flagged' },
      { value: '0', label: 'Sends without approval' },
    ],
    capabilities: [
      { name: 'Stalled-deal flags', desc: 'Stalled deals flagged the day they stall.' },
      { name: 'Follow-ups', desc: 'Every follow-up written and queued for approval.' },
      { name: 'Deal scoring', desc: 'Each deal scored against your qualification criteria.' },
      { name: 'Call routing', desc: 'Calls routed by intent, in English or Spanish.' },
      { name: 'Sequences', desc: 'Email and text sequences in your voice, sent after approval.' },
      { name: 'Who decides', desc: 'Outbound waits for your approval. Terms outside your limits go to a named person.' },
    ],
  },
  {
    slug: 'broadcast',
    name: 'Broadcast',
    stage: 'ATTRACT',
    category: 'Win the business',
    gridLine: 'Content that sounds like you',
    tagline: 'Content that sounds like you.',
    problem:
      'Posts, newsletters and captions drafted in your voice, held for your signature.',
    description:
      'Broadcast is Harness 3 of 8. It drafts posts and newsletters from what you already know and say, writes captions and reel copy for each channel, turns job-site photos into drafted posts, watches ad spend and creative against limits you set, and publishes through the accounts you connect. Nothing publishes without your signature. Spend or creative outside your limits goes to a named person.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Broadcast.webp',
    deployedIn: ['Owners and marketing leads'],
    metrics: [
      { value: '0', label: 'Posts without your signature' },
      { value: '1', label: 'Queue for every channel' },
    ],
    capabilities: [
      { name: 'Posts and newsletters', desc: 'Drafted from what you already know and say.' },
      { name: 'Captions and reels', desc: 'Captions and reel copy written for each channel.' },
      { name: 'Job-site photos', desc: 'Job-site photos turned into drafted posts.' },
      { name: 'Spend limits', desc: 'Ad spend and creative watched against limits you set.' },
      { name: 'Publishing', desc: 'Published through the accounts you connect.' },
      { name: 'Who decides', desc: 'Nothing publishes without your signature.' },
    ],
  },
  {
    slug: 'signal',
    name: 'Signal',
    stage: 'ANALYZE',
    category: 'Buy the business',
    gridLine: 'Targets screened against your thesis',
    tagline: 'Buy the business.',
    problem:
      'Acquisition targets screened against your thesis. You decide.',
    description:
      'Signal is Harness 4 of 8. It takes deal intake and ingests documents, screens every target against your thesis with gates, runs valuation scenarios and quality of earnings, and drafts an investment memo for your review. The owner decides every deal. Signal drafts the memo; it never commits capital.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Signal.webp',
    deployedIn: ['Owners buying add-ons and acquirers'],
    metrics: [
      { value: '9', label: 'Agents' },
      { value: '0', label: 'Capital committed by an agent' },
    ],
    capabilities: [
      { name: 'Deal intake', desc: 'Deal intake and document ingest.' },
      { name: 'Thesis screen', desc: 'Screen every target against your thesis, with gates.' },
      { name: 'Valuation', desc: 'Valuation scenarios and quality of earnings.' },
      { name: 'Investment memo', desc: 'Investment memo drafted for your review.' },
      { name: 'Who decides', desc: 'The owner decides every deal. Signal drafts the memo; it never commits capital.' },
    ],
  },
  {
    slug: 'ledger',
    name: 'Ledger',
    stage: 'MANAGE',
    category: 'Run the operation',
    gridLine: 'Continuous accounting, as a memo',
    tagline: 'Continuous accounting.',
    problem:
      'Books kept current every day and delivered as a memo, not a raw ledger.',
    description:
      'Ledger is Harness 7 of 8. It delivers cash flow, books and a written memo, runs continuous accounting with payroll and tax support, reads from the accounting system you already run with authorization, and carries margin and KPIs from the field to the company. If the books do not tie, the memo is stamped DRAFT. A person signs off before anything is relied on.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Ledger.jpg',
    deployedIn: ['Owners, controllers and CFOs'],
    metrics: [
      { value: 'DRAFT', label: "Stamped when the books don't tie" },
      { value: 'Daily', label: 'Books kept current' },
    ],
    capabilities: [
      { name: 'Cash flow and memo', desc: 'Cash flow, books and a written memo.' },
      { name: 'Continuous accounting', desc: 'Continuous accounting, payroll and tax support.' },
      { name: 'Your system', desc: 'Reads from the accounting system you already run, with authorization.' },
      { name: 'Margin and KPIs', desc: 'Margin and KPIs from the field to the company.' },
      { name: 'Who decides', desc: "If the books don't tie, the memo is stamped DRAFT. A person signs off before anything is relied on." },
    ],
  },
  {
    slug: 'ignition',
    name: 'Ignition',
    stage: 'MOVE',
    category: 'Run the operation',
    gridLine: 'Field logistics, call to invoice',
    tagline: 'Run the field.',
    problem:
      'The logistics operating system, from the first call to the invoice.',
    description:
      'Ignition is Harness 6 of 8 and the oilfield logistics operating system. Twenty-eight agents run one board: job line and dispatch by voice in English or Spanish, sensor and tank alerts that climb the call chain, tickets and invoices on one board in 3D, and compliance, settlement, pricing and incident response. It pulls from the systems you already run, with authorization. Agents draft; people approve, and the call chain escalates to a named person.',
    poster: '/images/ignition/ignition-board-1391.webp',
    deployedIn: ['Dispatch, field operations and the owner'],
    metrics: [
      { value: '28', label: 'Agents on the board' },
      { value: '7', label: 'Live on the demo line' },
    ],
    capabilities: [
      { name: 'Job line and dispatch', desc: 'Job line and dispatch by voice, in English or Spanish.' },
      { name: 'Tank and sensor alerts', desc: 'Sensor and tank alerts that climb the call chain.' },
      { name: 'One board, in 3D', desc: 'Tickets and invoices on one board, in 3D.' },
      { name: 'Compliance and risk', desc: 'Compliance, settlement, pricing and incident response.' },
      { name: 'Your systems', desc: 'Pulls from the systems you already run, with authorization.' },
      { name: 'Who decides', desc: 'Agents draft; people approve. The call chain escalates to a named person.' },
    ],
  },
  {
    slug: 'titan',
    name: 'Titan',
    stage: 'BUILD',
    category: 'Build the assets',
    gridLine: 'Plan set in, priced bid out',
    tagline: 'Build the assets.',
    problem:
      'Plan set in, priced bid out, job tracked in 3D.',
    description:
      'Titan is Harness 5 of 8. It takes a project from site selection to final payment: site identification with local and federal code review, business planning before a dollar is committed, bids with a full BOM, research on missing items and a price book, scope check and payment release, and 3D progress tracking against plan. Every line carries a confidence score. A person approves pricing and every payment release.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Titan.webp',
    deployedIn: ['Developers, general contractors and facility owners'],
    metrics: [
      { value: '37', label: 'Agents' },
      { value: 'Every line', label: 'Confidence scored' },
    ],
    capabilities: [
      { name: 'Site and code', desc: 'Site identification with local and federal code review.' },
      { name: 'Business plan', desc: 'Business planning before a dollar is committed.' },
      { name: 'Bid and BOM', desc: 'Bids, full BOM, research on missing items and a price book.' },
      { name: 'Payment release', desc: 'Scope check and payment release.' },
      { name: '3D progress', desc: '3D progress tracking against plan.' },
      { name: 'Who decides', desc: 'Confidence score on every line. A person approves pricing and every payment release.' },
    ],
  },
  {
    slug: 'prime',
    name: 'Prime',
    stage: 'GOVERN',
    category: 'Govern every action',
    gridLine: 'Who can do what, and who did',
    tagline: 'Who can do what, and who did.',
    problem:
      'Roles, limits and a permanent record for every person and every agent.',
    description:
      'Prime is Harness 8 of 8 and lives inside Agent Orbit. It sets roles and limits for every person and every agent, logs every proposal, approval and action with who and when, and escalates to a named person rather than improvise. The action log is yours. Gated runs stop on a failed check and say why.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/PRIME.jpg',
    deployedIn: ['Owners, operations leads and compliance'],
    metrics: [
      { value: 'Logged', label: 'Every action, with who and when' },
      { value: 'Yours', label: 'The action log' },
    ],
    capabilities: [
      { name: 'Roles and limits', desc: 'Roles and limits for every person and every agent.' },
      { name: 'Action log', desc: 'Every proposal, approval and action logged with who and when.' },
      { name: 'Escalation', desc: 'Escalate to a named person; never improvise.' },
      { name: 'Inside Agent Orbit', desc: 'Lives inside Agent Orbit.' },
      { name: 'Who decides', desc: 'The action log is yours. Gated runs stop on a failed check and say why.' },
    ],
  },
];

/** The eight Harnesses (excludes the advisory). Content: Echo 1 Labs Product Stack deck, Nov 2026. */
export const PRODUCT_SLUGS = PRODUCTS.filter((p) => !p.isAdvisory).map((p) => p.slug);

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const AI_READINESS = PRODUCTS.find((p) => p.slug === 'ai-readiness')!;
