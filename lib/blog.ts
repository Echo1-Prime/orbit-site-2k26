// Blog post data: all 12 seed posts for the E1L BLM OS content program.

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  readingTime: string;
  category: 'Fundamentals' | 'Engine' | 'RevOps' | 'Broadcast' | 'Ledger' | 'Titan' | 'Signal' | 'Prime';
  body: BlogSection[];
}

export interface BlogSection {
  type: 'p' | 'h2' | 'pullquote' | 'steps' | 'checklist';
  content?: string;
  items?: string[];
}

export const BLOG_CATEGORIES = [
  'Fundamentals',
  'Engine',
  'RevOps',
  'Broadcast',
  'Ledger',
  'Titan',
  'Signal',
  'Prime',
] as const;

export const POSTS: BlogPost[] = [
  {
    slug: 'what-is-business-lifecycle-management',
    title: 'What Is Business Lifecycle Management?',
    description: 'Business Lifecycle Management is a category, not a feature. Here is what it means, why it matters for owner-led businesses, and what an OS looks like in practice.',
    datePublished: '2026-09-01',
    readingTime: '5 min',
    category: 'Fundamentals',
    body: [
      { type: 'p', content: 'Business Lifecycle Management is the category of infrastructure that covers the full operational lifecycle of a business through an integrated agent layer, supervised by a governance layer. It is not a feature inside a CRM. It is not a chatbot. It is an operating model.' },
      { type: 'p', content: 'The idea is straightforward: every business of meaningful scale has the same operational surface area: go-to-market, revenue operations, marketing, finance, document intelligence, market intelligence, and governance. Most owner-led businesses cover this surface with a patchwork of disconnected point solutions, each with its own queue, its own login, and its own failure mode.' },
      { type: 'h2', content: 'What makes it an OS' },
      { type: 'p', content: 'An operating system for a business does what an OS does for a computer: it provides a unified execution environment, manages resources across competing demands, and gives the operator a single interface to what the system is doing.' },
      { type: 'p', content: 'The BLM OS achieves this through three architectural layers: the Fusion Grid (data normalization), the Agent Layer (execution), and the Supervision Layer (governance). Each operational domain (Engine, RevOps, Broadcast, Ledger, Titan, Signal) runs as a layer within that architecture. Prime is the governance interface that ties them together.' },
      { type: 'pullquote', content: 'The shift is not from people to agents. It is from execution to supervision, and supervision scales in ways that execution never could.' },
      { type: 'h2', content: 'Who it is for' },
      { type: 'p', content: 'The BLM OS is built for owner-led businesses between $5M and $100M in revenue, with 50 to 200 employees. Businesses that are large enough to have real operational surface area but structured in a way that makes adding headcount to cover it the wrong answer.' },
      { type: 'p', content: 'These businesses have always been underserved by infrastructure. Enterprise software is overkill. Point solutions do not add up to a system. The BLM OS fills that gap.' },
    ],
  },
  {
    slug: 'the-ops-os-why-owner-led-businesses-need-a-different-model',
    title: 'The Ops OS: Why Owner-Led Businesses Need a Different Model',
    description: 'Point solutions accumulate. Headcount grows. But the operator still sits at the center of every decision. Here is why that model breaks and what replaces it.',
    datePublished: '2026-09-03',
    readingTime: '6 min',
    category: 'Fundamentals',
    body: [
      { type: 'p', content: 'The typical owner-led business at $20M runs on six to twelve disconnected point solutions, a small operations team, and the owner as the integration layer between all of them. It works, until it does not.' },
      { type: 'p', content: 'The breaking point is not a single event. It is a gradual accumulation of friction: decisions that require the owner\'s attention because no one else has the full picture; information that lives in five systems and requires manual reconciliation; tasks that should be routine but aren\'t because the person who runs them is overloaded.' },
      { type: 'h2', content: 'The structural problem' },
      { type: 'p', content: 'Owner-led businesses have a structural problem that hiring cannot solve. When you add headcount to cover operational surface area, you add coordination overhead, management cost, and information latency. The owner\'s job shifts from running operations to managing the people running operations, and that is a different job, not a smaller one.' },
      { type: 'p', content: 'The right solution is not more people. It is better infrastructure. Infrastructure that normalizes data across sources, executes routine decisions without requiring a human in the loop, and surfaces exceptions to the right person at the right time.' },
      { type: 'pullquote', content: 'An agent does not need a 1:1 with its manager. It does not need to be managed at all. It needs clear parameters and an exception queue.' },
      { type: 'h2', content: 'What the OS model changes' },
      { type: 'p', content: 'The OS model changes the operator\'s role from executor to supervisor. Instead of running operations, the operator configures them, reviews exceptions, and approves high-value decisions. The agents handle execution.' },
      { type: 'p', content: 'This is not a reduction in control. It is a different kind of control, one that scales as the business grows, rather than demanding more of the operator\'s time.' },
    ],
  },
  {
    slug: 'engine-go-to-market-layer-blm-os',
    title: 'Engine: The Go-to-Market Layer of the BLM OS',
    description: 'Engine handles ICP prospecting, contact enrichment, outreach sequencing, and pipeline stall detection. Here is how the go-to-market layer works.',
    datePublished: '2026-09-05',
    readingTime: '5 min',
    category: 'Engine',
    body: [
      { type: 'p', content: 'Engine is the go-to-market layer of the BLM OS. It handles ICP prospecting, contact enrichment, outreach sequencing, meeting scheduling, and pipeline velocity monitoring. The operator configures the ICP and approves messaging. Execution runs on schedule regardless of the operator\'s daily bandwidth.' },
      { type: 'h2', content: 'ICP prospecting and enrichment' },
      { type: 'p', content: 'The operator defines the ICP: company size, revenue band, industry, role, and problem. Engine takes that definition and generates a prospect list, enriches each contact with firmographic data and digital footprint signals, and scores them by fit. The output is a qualified list ready for outreach, not a raw export from a database.' },
      { type: 'h2', content: 'Outreach sequencing' },
      { type: 'p', content: 'Engine builds multi-touch sequences across email, LinkedIn, and phone, calibrated to the ICP and the stage of the relationship. The operator reviews and approves the messaging template before sequences run. After that, Engine manages the cadence, tracks replies, and handles scheduling when a prospect responds.' },
      { type: 'pullquote', content: 'The operator\'s job is not to send outreach. It is to define who to reach and what to say. Engine handles everything after that.' },
      { type: 'h2', content: 'Pipeline velocity monitoring' },
      { type: 'p', content: 'Engine tracks deals through the pipeline and flags stalls. A deal that has not moved in seven days surfaces in the Prime exception queue with the relevant context. The operator decides whether to re-engage, adjust the sequence, or close the deal out. The monitoring runs continuously; the operator\'s attention is only required at the exception.' },
    ],
  },
  {
    slug: 'revenue-operations-layer-revops-mid-market',
    title: 'The Revenue Operations Layer: What RevOps Does for Mid-Market',
    description: 'Lead qualification, deal intelligence, pipeline forecasting, and CRM hygiene, all automated. Here is how the RevOps layer eliminates the operational overhead of a sales team.',
    datePublished: '2026-09-08',
    readingTime: '5 min',
    category: 'RevOps',
    body: [
      { type: 'p', content: 'RevOps is the revenue operations layer of the BLM OS. It handles lead qualification scoring, deal intelligence and stall detection, rolling pipeline forecasting, revenue reconciliation against accounting records, and CRM data hygiene. It delivers the operational discipline of a full RevOps team without the headcount.' },
      { type: 'h2', content: 'Lead qualification' },
      { type: 'p', content: 'Every inbound and outbound lead is scored against the configured ICP on entry. The Lead Qualifier agent assigns a fit score based on firmographic match, digital signals, and behavioral data. Leads below the threshold are filtered before they reach the pipeline. The operator sets the threshold; the agent enforces it.' },
      { type: 'h2', content: 'Deal intelligence and forecasting' },
      { type: 'p', content: 'The Deal Analyzer tracks signals across open deals (response latency, engagement patterns, stage duration) and surfaces deals that are showing stall signals before they go cold. The Forecast Builder generates rolling pipeline forecasts using stage-weighted probability and historical close rates, updated automatically as deals move.' },
      { type: 'pullquote', content: 'CRM hygiene is not a project. It is a continuous process. The RevOps layer makes it automatic.' },
      { type: 'h2', content: 'Revenue reconciliation and CRM hygiene' },
      { type: 'p', content: 'The Revenue Reconciler compares pipeline value against booked revenue in the accounting system and flags discrepancies. CRM hygiene runs on a configurable schedule, normalizing field values, merging duplicates, and updating stage dates based on actual activity rather than manual entry.' },
    ],
  },
  {
    slug: 'content-on-autopilot-broadcast-marketing-cadence',
    title: 'Content on Autopilot: How Broadcast Runs Your Marketing Cadence',
    description: 'Brief generation, drafting, scheduling, and performance monitoring: the Broadcast layer handles the full content lifecycle so the marketing function runs without constant operator attention.',
    datePublished: '2026-09-10',
    readingTime: '5 min',
    category: 'Broadcast',
    body: [
      { type: 'p', content: 'Broadcast is the marketing layer of the BLM OS. It runs content brief generation, drafting across channels, scheduling, and performance monitoring. The operator approves briefs and reviews drafts. Content publishes on cadence, not on available time.' },
      { type: 'h2', content: 'Content brief generation' },
      { type: 'p', content: 'The Content Strategist agent generates briefs based on the configured content calendar, SEO signals, and the business\'s current positioning. Each brief specifies the topic, angle, target keyword, intended channel, and call to action. The operator reviews and approves briefs before drafting begins.' },
      { type: 'h2', content: 'Drafting and scheduling' },
      { type: 'p', content: 'Once a brief is approved, the Copywriter agent produces a draft for each format in the sequence: long-form, social, email. Drafts are routed for operator review before they schedule. After approval, the Scheduler handles publication timing across channels, calibrated to the configured cadence and channel-specific best practices.' },
      { type: 'pullquote', content: 'The bottleneck in most marketing functions is not ideas. It is execution. Broadcast removes the execution bottleneck.' },
      { type: 'h2', content: 'Performance monitoring' },
      { type: 'p', content: 'After content publishes, Broadcast tracks performance against configured benchmarks: open rates, engagement, traffic, conversions. Pieces that underperform surface in the Prime exception queue with the relevant context. The operator decides whether to adjust the approach or continue the sequence.' },
    ],
  },
  {
    slug: 'what-is-the-fusion-grid',
    title: 'What Is the Fusion Grid?',
    description: 'The Fusion Grid is the data normalization layer that connects business tools to the BLM OS. Here is what it does, what it connects, and why it matters.',
    datePublished: '2026-09-12',
    readingTime: '4 min',
    category: 'Fundamentals',
    body: [
      { type: 'p', content: 'The Fusion Grid is the data integration and normalization layer of the BLM OS. It connects to the business\'s existing tools (CRM, accounting system, project management, communication systems) and normalizes their data into a consistent schema that all seven agent layers can operate against without custom translation logic per source.' },
      { type: 'h2', content: 'What it connects' },
      { type: 'p', content: 'The Fusion Grid connects to the tools the business already uses: CRM, QuickBooks, project management software, email and calendar, communication systems, and document storage. It does not replace any of these tools. It reads from them, normalizes the data, and makes it available to the agent layer.' },
      { type: 'h2', content: 'Why normalization matters' },
      { type: 'p', content: 'Every tool stores data in a different format, uses different field names, and has a different concept of what a contact or a deal or a transaction is. The Fusion Grid translates all of these into a unified schema. This is what allows an agent in the RevOps layer to reference the same contact record that the Engine layer is running outreach against, without a custom integration between the two.' },
      { type: 'pullquote', content: 'The Fusion Grid is not the interesting part of the BLM OS. But it is what makes everything else possible.' },
      { type: 'h2', content: 'Why it matters for Prime' },
      { type: 'p', content: 'Prime\'s daily briefing is only as good as the data it draws from. The Fusion Grid is what ensures that Prime is reading from a consistent, current business context, not a patchwork of stale exports from seven different systems.' },
    ],
  },
  {
    slug: 'ledger-financial-automation-owner-led-businesses',
    title: 'Ledger: What Financial Automation Looks Like for Owner-Led Businesses',
    description: 'GL reconciliation, AP routing, cash flow monitoring, and expense categorization, without adding headcount. Ledger is the finance-ops layer of the BLM OS.',
    datePublished: '2026-09-15',
    readingTime: '5 min',
    category: 'Ledger',
    body: [
      { type: 'p', content: 'Ledger is the finance operations layer of the BLM OS. It handles daily general ledger reconciliation, accounts payable routing and approval, cash flow monitoring and projection, and expense categorization, through native integration with QuickBooks.' },
      { type: 'p', content: 'Ledger is available now in the BLM OS.' },
      { type: 'h2', content: 'The problem it solves' },
      { type: 'p', content: 'Owner-led businesses at the $5M–$100M scale face a specific finance problem: they have outgrown the bookkeeper-plus-spreadsheets stage but are not large enough to justify a full-time CFO. The result is month-end catches instead of daily visibility, reconciliation that runs days behind, and financial decisions made on imprecise data.' },
      { type: 'pullquote', content: 'The books should not be a lagging indicator of the business. Ledger makes them current.' },
      { type: 'h2', content: 'What the agents handle' },
      { type: 'p', content: 'The GL Reconciler agent runs daily, comparing transactions against the general ledger and flagging discrepancies. The Invoice Processor classifies and routes incoming invoices for approval. The Cash Flow Monitor tracks inflows and outflows against the rolling forecast and surfaces variance alerts before they become problems.' },
      { type: 'h2', content: 'What the operator still owns' },
      { type: 'p', content: 'The operator reviews exception items, approves high-value payments, and makes judgment calls on categorization edge cases. Ledger handles the volume; the operator handles the exceptions. This is the same model as every other BLM OS layer.' },
    ],
  },
  {
    slug: 'document-intelligence-titan-contracts-invoices-pos',
    title: 'Document Intelligence: How Titan Processes Contracts, Invoices, and POs',
    description: 'Titan classifies documents on arrival, extracts structured data, parses contract terms, and matches invoices against purchase orders, without a processing queue.',
    datePublished: '2026-09-17',
    readingTime: '5 min',
    category: 'Titan',
    body: [
      { type: 'p', content: 'Titan is the document intelligence layer of the BLM OS. It classifies incoming documents by type, extracts structured data from them, parses contract terms and obligations, and matches invoices against purchase orders. Documents are processed on arrival rather than when someone has time to review them.' },
      { type: 'h2', content: 'Document classification' },
      { type: 'p', content: 'The Document Classifier agent assigns a type to every incoming document (contract, invoice, purchase order, statement, application) based on content signals. Classification gates the downstream extraction workflow, ensuring that each document type is processed by the agent configured for it rather than a generic extractor.' },
      { type: 'h2', content: 'Data extraction and contract parsing' },
      { type: 'p', content: 'The Data Extractor pulls structured fields from classified documents (counterparty names, amounts, dates, terms) and writes them to the Fusion Grid. The Contract Parser goes further: it identifies obligations, key dates, renewal clauses, and termination provisions, and surfaces items that require operator attention.' },
      { type: 'pullquote', content: 'A document that sits in a queue is not being processed. It is being deferred. Titan removes the queue.' },
      { type: 'h2', content: 'Invoice-to-PO matching' },
      { type: 'p', content: 'The PO Processor matches incoming invoices against open purchase orders, flags discrepancies in amount, quantity, or vendor, and routes matched invoices for payment approval. Items that cannot be matched surface in the Prime exception queue with the relevant context so the operator can investigate.' },
    ],
  },
  {
    slug: 'what-is-signal',
    title: 'What Is Signal?',
    description: 'Signal is the intelligence layer of the BLM OS for PE-backed businesses and capital allocators. Private access only. No self-serve.',
    datePublished: '2026-09-19',
    readingTime: '4 min',
    category: 'Signal',
    body: [
      { type: 'p', content: 'Signal is the market intelligence layer of the BLM OS. It is designed for PE-backed businesses and capital allocators who need business intelligence in a transaction context. Signal is not self-serve; access requires application and individual review.' },
      { type: 'p', content: 'Signal surfaces financial health signals, operational performance data, and market positioning intelligence. It is the layer that lets an acquirer or an investor understand what a business is actually doing, not what the deck says it is doing.' },
      { type: 'h2', content: 'Who it is for' },
      { type: 'p', content: 'Signal is built for PE-backed operators managing portfolio companies, capital allocators evaluating acquisition targets, and businesses preparing for a transaction where independent intelligence matters. It is not for general business intelligence use cases.' },
      { type: 'pullquote', content: 'Signal is the layer that closes the gap between what the financials say and what the business is actually doing.' },
      { type: 'h2', content: 'Private access' },
      { type: 'p', content: 'Signal is not listed in the standard pricing tiers. Access is by application only. If Signal is relevant to your situation, apply through the Signal page. Every application is reviewed individually.' },
    ],
  },
  {
    slug: 'prime-governance-layer-agent-run-business',
    title: 'Prime: The Governance Layer Every Agent-Run Business Needs',
    description: 'Daily briefings, exception queues, and approval gates: Prime is how the operator stays in control when agents are running operations across seven layers.',
    datePublished: '2026-09-22',
    readingTime: '5 min',
    category: 'Prime',
    body: [
      { type: 'p', content: 'Prime is the governance layer of the BLM OS. It compiles a daily briefing from all seven operational layers, manages the exception queue and approval gates, and maintains a structured record of agent activity and operator decisions. It is the primary interface between the operator and everything the system is doing on their behalf.' },
      { type: 'h2', content: 'The daily briefing' },
      { type: 'p', content: 'Prime produces a structured briefing each morning: what agents completed overnight, what exceptions require attention, what approvals are pending, and what the key business metrics are showing. The briefing is designed to be read in under ten minutes. The operator reads the briefing, acts on the items that require judgment, and moves on.' },
      { type: 'h2', content: 'Exception queues and approval gates' },
      { type: 'p', content: 'Every agent layer in the BLM OS has configurable confidence thresholds and approval gates. When an agent encounters a decision that falls outside its parameters, it routes the item to the Prime exception queue with the relevant context. When a configured approval gate triggers (a payment above a threshold, content before it publishes), the item surfaces in Prime for the operator to review.' },
      { type: 'pullquote', content: 'Prime is not a dashboard. It is a decision surface. The difference is what it asks of the operator: not attention, but judgment.' },
      { type: 'h2', content: 'Historical context' },
      { type: 'p', content: 'Every agent action is logged. Every operator decision is recorded. Prime maintains the structured record of what the system has done and what the operator has decided, so the full context is available when a pattern needs to be reviewed or an exception needs to be traced.' },
    ],
  },
  {
    slug: 'manual-to-automated-7-layers-blm-os',
    title: 'From Manual to Automated: Mapping the 7 Layers of the BLM OS',
    description: 'A layer-by-layer map of the Business Lifecycle Management OS: what each of the seven operational layers covers, what moves from manual to automated, and what the operator\'s role becomes.',
    datePublished: '2026-09-24',
    readingTime: '7 min',
    category: 'Fundamentals',
    body: [
      { type: 'p', content: 'Business Lifecycle Management is a category, not a product feature. It describes a model for running the full operational lifecycle of a business through an integrated agent layer, supervised by a governance layer, rather than through disconnected point solutions managed by the owner.' },
      { type: 'p', content: 'Here is a map of each layer: what it covers, what it automates, and what the operator still owns.' },
      { type: 'h2', content: 'Layer 01: Engine (Go-to-Market)' },
      { type: 'p', content: 'Automates ICP prospecting, contact enrichment, outreach sequencing, meeting scheduling, and pipeline stall detection. The operator configures the ICP and reviews messaging. Execution runs on schedule.' },
      { type: 'h2', content: 'Layer 02: RevOps (Revenue Operations)' },
      { type: 'p', content: 'Automates lead qualification, deal intelligence, pipeline forecasting, revenue reconciliation, and CRM hygiene. The operator reviews qualification flags and deals that stall. Pipeline stays current without manual audit.' },
      { type: 'h2', content: 'Layer 03: Broadcast (Marketing)' },
      { type: 'p', content: 'Automates content brief generation, draft production across channels, scheduling, and performance monitoring. The operator approves briefs and reviews drafts. Content publishes on cadence, not on available time.' },
      { type: 'h2', content: 'Layer 04: Ledger (Finance Operations)' },
      { type: 'p', content: 'Automates daily GL reconciliation, AP processing, cash flow monitoring, and expense categorization.' },
      { type: 'h2', content: 'Layer 05: Titan (Document Intelligence)' },
      { type: 'p', content: 'Automates document classification, data extraction, contract parsing, and PO matching. Incoming documents process without a queue.' },
      { type: 'h2', content: 'Layer 06: Signal (Deal Intelligence)' },
      { type: 'p', content: 'Intelligence layer for PE-backed businesses and capital allocators. Private access.' },
      { type: 'h2', content: 'Layer 07: Prime (Governance)' },
      { type: 'p', content: 'Compiles the daily briefing from all layers, manages exception queues, handles approval gates, and maintains the structured record of agent activity. The operator\'s interface to everything the system is doing.' },
      { type: 'pullquote', content: 'The shift is not from people to agents. It is from execution to supervision, and supervision scales in ways that execution never could.' },
    ],
  },
  {
    slug: 'evaluate-business-readiness-blm-os',
    title: 'How to Evaluate Whether Your Business Is Ready for the BLM OS',
    description: 'Five questions that determine whether the BLM OS fits your business now, and what changes when it does.',
    datePublished: '2026-09-26',
    readingTime: '5 min',
    category: 'Fundamentals',
    body: [
      { type: 'p', content: 'The BLM OS is not for every business. It is built for owner-led businesses at a specific stage: large enough to have meaningful operational surface area, structured in a way that makes adding headcount the wrong answer, and ready to shift from ad hoc operations to a managed system.' },
      { type: 'p', content: 'Five questions determine whether that description fits your business.' },
      { type: 'h2', content: 'Are you manually integrating data across multiple systems?' },
      { type: 'p', content: 'If your CRM, accounting system, and project management software do not talk to each other and someone is manually reconciling them, the Fusion Grid addresses that. It is one of the most common signals that a business is ready for the BLM OS architecture.' },
      { type: 'h2', content: 'Is the operator still in the execution loop for routine decisions?' },
      { type: 'p', content: 'Routine decisions (lead qualification, content scheduling, invoice matching) should not require the operator. If they do, the business is running on the operator\'s attention rather than on systems. The BLM OS is designed to move routine decisions out of the operator\'s queue.' },
      { type: 'h2', content: 'Do you have a consistent outreach cadence, or does it depend on bandwidth?' },
      { type: 'p', content: 'An outreach cadence that runs when someone has time to run it is not a cadence. It is a project. Engine turns outreach into a scheduled process rather than a bandwidth-dependent one.' },
      { type: 'pullquote', content: 'The best time to build the OS is before you need it. The second best time is now.' },
      { type: 'h2', content: 'Is your content production consistent or reactive?' },
      { type: 'p', content: 'Most owner-led businesses produce content when they have time and stop when they do not. Broadcast changes the model: content runs on a schedule, approved by the operator, regardless of available bandwidth.' },
      { type: 'h2', content: 'Do you know what your agents are doing at any given moment?' },
      { type: 'p', content: 'If you run any automated workflows today, can you see what they are doing, what they have done, and what exceptions they have encountered? Prime answers that question for the full BLM OS. If your current systems cannot answer it, the governance gap is significant.' },
    ],
  },
];

export const POST_SLUGS = POSTS.map((p) => p.slug);

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return POSTS.filter((p) => p.category === category);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
