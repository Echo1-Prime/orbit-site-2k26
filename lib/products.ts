// Echo 1 Labs product stack: source of truth for cards, nav, and product pages.
// Ported from the Vite app's src/data/products.js. Two brand corrections applied:
//   1. Off-brand per-product colorHex values dropped. Solar is the single accent.
//   2. Banned term "AI-Enhanced" (§6) replaced with "Agentic" / "agent-based".
// The lifecycle has 8 STAGES; there are 7 PRODUCTS. AI Readiness is the ENABLE-stage
// advisory engagement, NOT the 8th product. `isAdvisory: true` flags it.

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
  /** Ledger: the only product currently pre-release. */
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
      { value: '$2-10K', label: 'Monthly advisory (ongoing)' },
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
    category: 'Go-to-Market',
    gridLine: 'GTM strategy + execution',
    tagline: 'Go-to-market that runs itself.',
    problem:
      'Engine builds your prospect list, sequences your outreach, books your meetings, and monitors your pipeline, then reports back to Prime. Your job is to show up to the conversations that matter.',
    description:
      'Most GTM teams collapse under the volume required to keep a full pipeline. They hire SDRs, build sequences, manage lists, and still miss quota because the process is manual and the team is spread thin. Engine replaces the manual parts. The ICP Prospector builds the list. The Outreach Sequencer runs the touches. The Meeting Scheduler books the time. You show up to conversations with warm prospects, not cold calls you set yourself.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Engine.webp',
    deployedIn: ['SMBs Without Marketing Teams', 'Owner-Led Companies', 'Pre-GTM Businesses'],
    metrics: [
      { value: 'Automated', label: 'List refresh cadence' },
      { value: 'Multi-touch', label: 'Outreach sequences' },
      { value: 'Configurable', label: 'Pipeline stall threshold' },
      { value: 'Prime', label: 'Reports to' },
    ],
    capabilities: [
      { name: 'ICP Builder', desc: 'Define your ideal customer profile once. Engine uses it to build and refresh prospect lists from Apollo and connected sources on a declared schedule.' },
      { name: 'Prospect Enrichment', desc: 'Inbound and built prospects are enriched with firmographic and contact data before entering the outreach sequence. No manual research required.' },
      { name: 'Outreach Automation', desc: 'Multi-touch sequences run on a declared cadence. Messaging adapts by stage and persona. Engagement signals surface to Prime in real time.' },
      { name: 'Meeting Coordination', desc: 'The Meeting Scheduler handles availability, coordination, and confirmation for qualified prospects, inside the sequence or triggered on demand.' },
      { name: 'Pipeline Intelligence', desc: 'Pipeline Velocity Monitor tracks deal movement across stages. Stall alerts reach Prime before deals go cold. No CRM review required.' },
      { name: 'Lead Scoring', desc: 'Every prospect is scored against your ICP before entering the sequence. Low-fit prospects are filtered before they consume outreach capacity.' },
    ],
  },
  {
    slug: 'revops',
    name: 'RevOps',
    stage: 'FIND',
    category: 'Sales Operations',
    gridLine: 'Revenue operations + outbound',
    tagline: 'Revenue operations without the ops.',
    problem:
      'RevOps qualifies leads, analyzes deals, builds forecasts, and reconciles bookings, then surfaces exceptions to Prime. The work that used to require a RevOps hire runs automatically.',
    description:
      'Revenue operations is the infrastructure of the sales function. Done well, it keeps pipeline clean, forecasts accurate, and bookings reconciled. Done manually, it consumes the time of the people who should be closing deals. RevOps removes the manual part. Lead qualification, deal analysis, forecast generation, and bookings reconciliation all run on declared cadence. You see the output in Prime, not the process.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/RevOps.webp',
    deployedIn: ['Real Estate', 'Home Services', 'IT Services', 'Business Consultants'],
    metrics: [
      { value: 'Automated', label: 'Lead qualification' },
      { value: 'Rolling', label: 'Forecast cadence' },
      { value: 'Scheduled', label: 'Bookings reconciliation' },
      { value: 'Prime', label: 'Reports to' },
    ],
    capabilities: [
      { name: 'Lead Qualification', desc: 'The Lead Qualifier scores inbound leads against your ICP and stage-gate logic. Qualified leads route to pipeline automatically. Unqualified leads are filtered without consuming operator time.' },
      { name: 'Deal Intelligence', desc: 'Deal Analyzer runs comparable analysis and win/loss pattern recognition on active opportunities. Surfaces deal risk factors to Prime before they become lost deals.' },
      { name: 'Pipeline Forecasting', desc: 'Forecast Builder produces a rolling revenue forecast from current stage positions and historical conversion rates. Published to Prime and CRM on your declared cadence.' },
      { name: 'Revenue Reconciliation', desc: 'Revenue Reconciler compares bookings to billings on a configured cadence. Discrepancies surface as threshold alerts, not end-of-month surprises.' },
      { name: 'Stage-Gate Automation', desc: 'Stage-gate criteria are configured once per pipeline stage. RevOps enforces them automatically. No deals advance without meeting the criteria you set.' },
      { name: 'CRM Sync', desc: 'All RevOps data flows through the Fusion Grid to your CRM. Stage updates, qualification results, and forecast data stay current without manual entry.' },
    ],
  },
  {
    slug: 'broadcast',
    name: 'Broadcast',
    stage: 'ATTRACT',
    category: 'Marketing',
    gridLine: 'Content + brand amplification',
    tagline: 'Content that ships on schedule.',
    problem:
      'Broadcast generates multi-channel content, manages your social calendar, monitors your brand, and tracks campaign performance, all without a dedicated marketing team.',
    description:
      "Most owner-led businesses fall behind on content not because they lack ideas, but because execution requires consistent time they don't have. Broadcast fills that gap, generating, scheduling, and distributing content on a cadence you set once. The Brand Monitor makes sure you know when your brand is being talked about before you would have found out on your own. The Campaign Reporter tells you what's working without a weekly analytics session.",
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Broadcast.webp',
    deployedIn: ['Every SMB Without a Robust Marketing Team'],
    metrics: [
      { value: 'Multi-channel', label: 'Content channels' },
      { value: 'Automated', label: 'Publishing cadence' },
      { value: 'Continuous', label: 'Brand monitoring' },
      { value: 'Prime', label: 'Reports to' },
    ],
    capabilities: [
      { name: 'Content Generation', desc: 'The Content Generator produces multi-channel copy (social posts, email campaigns, long-form) on your declared cadence, aligned to your brand guidelines.' },
      { name: 'Social Publishing', desc: 'Social Scheduler queues and publishes to connected channels. Cadence is maintained automatically. Publishing confirmations route to Prime.' },
      { name: 'Brand Monitoring', desc: 'Brand Monitor tracks mentions and sentiment across the web. Anomalies and engagement spikes surface to Prime before they require a response.' },
      { name: 'Campaign Analytics', desc: 'Campaign Reporter compiles performance data across active campaigns. Delivered to Prime on your reporting cadence. No manual analytics review required.' },
      { name: 'Multi-Channel Scheduling', desc: 'One content queue powers all connected channels. Timing, format, and channel are handled by the Social Scheduler. You approve the content; it handles the rest.' },
      { name: 'Cadence Automation', desc: 'Content and publishing cadence are configured once per channel. Broadcast maintains the schedule without manual queuing or intervention.' },
    ],
  },
  {
    slug: 'signal',
    name: 'Signal',
    stage: 'ANALYZE',
    category: 'Deal Flow',
    gridLine: 'Deal intelligence + benchmarking',
    tagline: 'Agentic Deal Intelligence for PE & VC',
    problem:
      'Built for PE and VC teams stuck on analyst-heavy screening: deck reading, benchmarking, and IC memos in under thirty minutes, so diligence starts where the work matters.',
    description:
      'Signal is the deal intelligence application in the Echo 1 Labs business lifecycle. PE/VC firms and strategic acquirers that have outgrown spreadsheets and analyst-heavy deal screening use Signal to consolidate deal sourcing, financial analysis, deck reading, industry benchmarking (61 BizMiner ratios across 5,000+ NAICS codes), screening gates, and one-click IC memo generation. It cuts deal screening from 2-4 hours to under 30 minutes. Agent-based automation replaces the manual analyst workflow that does not scale past 20 deals a quarter.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Signal.webp',
    deployedIn: ['Private Equity', 'Venture Capital', 'Strategic Acquirers'],
    metrics: [
      { value: '<30m', label: 'Deal screening time (was 2-4 hours)' },
      { value: '61', label: 'Industry benchmark ratios per deal' },
      { value: '149', label: 'Due diligence checklist items' },
      { value: '300K+', label: 'Deals accessible via sourcing integrations' },
    ],
    capabilities: [
      { name: 'AI Deck Reader', desc: 'Extracts data from pitch decks and CIMs, then analyzes against success statistics from top-producing companies.' },
      { name: 'Automated Screening', desc: '4 hard-filter gates (Revenue Floor, EBITDA Margin, Entry Multiple, Data Quality) with instant pass/fail.' },
      { name: 'Industry Benchmarking', desc: '61 BizMiner financial ratios with P25/Median/P75 overlay, auto-matched by NAICS code and revenue band.' },
      { name: 'Deal Sourcing', desc: 'Unified intake from Kumo (100K+ deals), BizBuySell (200K+ via Apify), and manual submissions.' },
      { name: 'One-Click IC Memos', desc: 'Generated investment committee memos with financials, risk assessment, and recommendation. PDF export.' },
      { name: 'Portfolio Monitoring', desc: 'Post-acquisition KPI dashboards with QuickBooks integration, health scores, and forecast projections.' },
    ],
  },
  {
    slug: 'ledger',
    name: 'Ledger',
    stage: 'MANAGE',
    category: 'Finance / Ops',
    gridLine: 'Financial operations',
    comingSoon: true,
    tagline: 'The Agentic CFO for Owner-Led Companies',
    problem:
      'Built for owner-led companies past the bookkeeper stage but not ready for a full-time CFO: live cash flow, ROI, and unit economics on a single dashboard you can actually trust.',
    description:
      'Ledger is the finance-operations application in the Echo 1 Labs business lifecycle. Owner-led companies that have outgrown their bookkeeper-plus-spreadsheets stage, but are not ready for a full-time CFO, use Ledger as an agent-based fractional finance function. It integrates live with QuickBooks, tracks budget versus actual across campaigns and departments, forecasts cash flow on rolling 30/60/90 day horizons, calculates campaign ROI and LTV:CAC from live RevOps and Broadcast data, and surfaces financial KPIs to operators through Prime.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Ledger.jpg',
    deployedIn: ['Owner-Led SMBs', 'Portfolio Companies', 'Multi-Entity Operators'],
    metrics: [
      { value: 'Live', label: 'QuickBooks integration for real-time data' },
      { value: '30/60/90', label: 'Day rolling cash flow forecasts' },
      { value: 'Auto', label: 'LTV:CAC + campaign ROI from live data' },
      { value: '1', label: 'Fractional CFO, no added headcount' },
    ],
    capabilities: [
      { name: 'QuickBooks Integration', desc: 'Live financial data feeds into budget, cash flow, and KPI dashboards in real time.' },
      { name: 'Budget vs. Actual Tracking', desc: 'Per-campaign, per-department, per-initiative spend versus plan with variance alerts.' },
      { name: 'Cash Flow Forecasting', desc: '30/60/90 day rolling horizons with revenue-lag modeling and Base/Conservative/Aggressive scenarios.' },
      { name: 'Campaign ROI Analytics', desc: 'Closes the loop between Broadcast ad spend, RevOps pipeline, and actual revenue booked.' },
      { name: 'LTV:CAC + Unit Economics', desc: 'Auto-calculated from Engine intake data and live RevOps pipeline. No manual spreadsheet rebuilds.' },
      { name: 'Variance Analysis', desc: 'Claude-powered explanations for budget variances, anomaly detection, and forward-looking recommendations.' },
    ],
  },
  {
    slug: 'titan',
    name: 'Titan',
    stage: 'DELIVER',
    category: 'Document Intelligence',
    gridLine: 'Project + delivery management',
    tagline: 'Documents that process themselves.',
    problem:
      'Classify incoming documents, extract structured data, parse contracts for key clauses, and route purchase orders for fulfillment, without a document management team. Titan handles the pipeline; you supervise the exceptions.',
    description:
      'Owner-led businesses receive hundreds of documents a month across vendors, contracts, and purchase orders. Most of that volume ends up as manual data entry: someone opening a PDF, pulling fields, entering numbers, and hoping nothing was missed. Titan eliminates that manual layer. Documents enter the pipeline, get classified, extracted, and routed to the right downstream action. Exceptions surface to Prime. The operator reviews outcomes, not documents.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Titan.webp',
    deployedIn: ['Manufacturing', 'Construction', 'Distribution', 'Oil & Gas'],
    metrics: [
      { value: 'Multi-format', label: 'Document types' },
      { value: 'No', label: 'Template required' },
      { value: 'Native', label: 'Ledger integration' },
      { value: 'Prime', label: 'Reports to' },
    ],
    capabilities: [
      { name: 'Document Classification', desc: 'Every incoming document is identified and labeled before anything else touches it. Contract, invoice, PO, SOW: Titan routes each document type through the right pipeline automatically.' },
      { name: 'Data Extraction', desc: 'Structured fields extracted from unstructured documents without templates. Vendor names, amounts, dates, terms, and custom fields pulled into structured records and routed downstream.' },
      { name: 'Contract Parsing', desc: 'Key clauses, term dates, payment milestones, and renewal triggers identified and extracted from contracts on ingestion. Never miss a renewal date buried in a PDF.' },
      { name: 'PO Processing', desc: 'Purchase orders captured, extracted, and routed for fulfillment processing automatically. Line items, quantities, and delivery terms extracted without manual data entry.' },
      { name: 'Ledger Integration', desc: 'Extracted invoice data routes to Ledger for GL coding and AP processing automatically. Titan handles document intake; Ledger handles the accounting action.' },
      { name: 'Exception Routing', desc: 'Documents that fall outside confidence thresholds route to the operator queue in Prime. The system handles the routine; you handle the edge cases.' },
    ],
  },
  {
    slug: 'prime',
    name: 'Prime',
    stage: 'GOVERN',
    category: 'Governance',
    gridLine: 'Agentic operations system',
    tagline: 'Your business. One layer. Full view.',
    problem:
      'Prime is the supervision layer of the BLM OS. Every agent reports here. Every threshold fires here. Every decision that needs you surfaces here, and only here.',
    description:
      "Prime is not a dashboard. It is the operating layer that connects every other app in the BLM OS. Without Prime, agents run in isolation. With Prime, they report to a single supervision point, and you stay in control without being in the way. The role of a Prime operator is not to execute tasks. It is to set thresholds, review exceptions, and make the decisions only a human should make. Everything else runs without you.",
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/PRIME.jpg',
    deployedIn: ['Multi-Product Echo 1 Labs Stacks', 'Owner-Led Operating Teams'],
    metrics: [
      { value: '6 of 6', label: 'Supervised layers' },
      { value: '16 OOB', label: 'Included agents' },
      { value: 'Operator-only', label: 'Decision queue' },
      { value: 'Daily', label: 'Briefing cadence' },
    ],
    capabilities: [
      { name: 'KPI Dashboard', desc: 'All active domains surface their key metrics to Prime. One view of the entire business, not six separate dashboards.' },
      { name: 'Threshold Controls', desc: 'Set the boundaries. Prime alerts you when any metric crosses a declared limit. You decide what warrants your attention.' },
      { name: 'Agent Activity Feed', desc: "Every agent action is logged and surfaced in Prime's activity feed. Full visibility into what ran, when, and what it found." },
      { name: 'Decision Queue', desc: 'Decisions that require operator input queue here, not in email, not in Slack. One place to review and approve.' },
      { name: 'Cross-App Visibility', desc: 'Prime sees across Engine, Broadcast, RevOps, Ledger, Titan, and Signal simultaneously. Nothing stays siloed.' },
      { name: 'Briefing Engine', desc: 'A daily briefing compiled by the Briefing Compiler agent: agent activity, open thresholds, decisions awaiting input. Delivered each morning.' },
    ],
  },
];

/** The 7 products that get generated /products/[slug] pages (excludes the advisory). */
export const PRODUCT_SLUGS = PRODUCTS.filter((p) => !p.isAdvisory).map((p) => p.slug);

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const AI_READINESS = PRODUCTS.find((p) => p.slug === 'ai-readiness')!;
