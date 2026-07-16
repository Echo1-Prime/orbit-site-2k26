// Echo 1 Labs product stack — source of truth for cards, nav, and product pages.
// Ported from the Vite app's src/data/products.js. Two brand corrections applied:
//   1. Off-brand per-product colorHex values dropped — Solar is the single accent.
//   2. Banned term "AI-Enhanced" (§6) replaced with "Agentic" / "agent-based".
// The lifecycle has 8 STAGES; there are 7 PRODUCTS. AI Readiness is the ENABLE-stage
// advisory engagement, NOT the 8th product — `isAdvisory: true` flags it.

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
  /** AI Readiness only — advisory engagement, excluded from product routes. */
  isAdvisory?: boolean;
  /** Ledger — the only product currently pre-release. */
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
      'Built for organizations past the AI-experiment phase — turning fragmented individual tool use into Institutional AI with shared standards, secure setup, and governance the leadership team can stand behind.',
    description:
      'AI Readiness is the enablement engagement in the Echo 1 Labs business lifecycle. For organizations that have outgrown individual AI experimentation — every employee using a different tool with no coordination — it delivers Institutional AI: secure environment setup on Claude Team/Enterprise, 101+201 training, five org-wide and five personal skills per seat, ongoing advisory, and governance. Agent-based automation is only sustainable when your team knows how to use it and your leadership knows how to govern it.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/AI%20Readiness.jpg',
    deployedIn: ['Any Organization Adopting AI', '10-200+ Employees', 'Every Industry'],
    metrics: [
      { value: '30-70%', label: 'Reduction in manual work' },
      { value: '6-8 wk', label: 'Full deployment timeline' },
      { value: '5+5', label: 'Org skills + personal skills per seat' },
      { value: '$2-10K', label: 'Monthly advisory (ongoing)' },
    ],
    capabilities: [
      { name: 'Assessment & Strategy', desc: 'Use case discovery, data audit, AI opportunity heatmap, ROI model, and 30-60-90 day execution roadmap.' },
      { name: 'AI Training 101', desc: 'Prompting basics, advanced techniques, pitfalls/limitations, platform walkthrough — for all employees.' },
      { name: 'AI Training 201', desc: 'Cowork, Claude Code, individual and organizational skills, memory files, security best practices.' },
      { name: 'Institutional Setup', desc: '5 org-wide skills + 5 personal skills per seat — built from individual discovery sessions with each employee.' },
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
    tagline: 'Agentic GTM Strategy & Intake Engine',
    problem:
      "Built for founder-led teams who outgrew DIY but aren't ready for a six-figure agency — a complete GTM playbook plus the system to actually run it, in days instead of quarters.",
    description:
      "Engine is the front door to the Echo 1 Labs business lifecycle. Founder-led companies that have outgrown founder-as-marketer — but aren't ready for a six-person in-house team — start here. Engine runs an adaptive intake: 26 questions if you verify with LinkedIn (we pre-fill what's already public), or the full 55 questions if you're starting fresh. Answer via multiple choice, multi-select, text, or speech-to-text — whatever is fastest. Engine then ingests your existing content — website copy, sales decks, podcasts, past campaigns — and produces a complete GTM program: a 30-40 page strategic playbook, a 24-sheet execution workbook, branded landing pages, and pre-configured campaigns that flow directly into RevOps, Broadcast, and Signal.",
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Engine.webp',
    deployedIn: ['SMBs Without Marketing Teams', 'Founder-Led Companies', 'Pre-GTM Startups'],
    metrics: [
      { value: '26/55', label: 'Adaptive intake (LinkedIn-verified / new)' },
      { value: '<30m', label: 'From intake to strategic playbook' },
      { value: '30-40', label: 'Page strategy + 24-sheet workbook' },
      { value: '40%+', label: 'Content repurposed from existing assets' },
    ],
    capabilities: [
      { name: 'Adaptive LinkedIn-Verified Intake', desc: '26 questions when we verify your LinkedIn (we pre-fill the basics), 55 when starting fresh.' },
      { name: 'Multi-Modal Input', desc: 'Multiple choice, multi-select, free text, file upload, and speech-to-text.' },
      { name: 'Existing Content Ingestion', desc: 'Absorbs your website copy, sales decks, podcasts, and past campaigns as the strategic raw material.' },
      { name: 'Brand Voice + Positioning', desc: 'Extracts tone, messaging pillars, and positioning so nothing sounds generated.' },
      { name: 'GTM Strategy Generation', desc: '30-40 page strategic playbook + 24-sheet execution workbook with ICPs, KPIs, budget, and timelines.' },
      { name: 'Module Config Handoff', desc: 'Pre-configures RevOps, Broadcast, and Signal with your ICP, Apollo filters, email templates, and campaigns.' },
    ],
  },
  {
    slug: 'revops',
    name: 'RevOps',
    stage: 'FIND',
    category: 'Sales',
    gridLine: 'Revenue operations + outbound',
    tagline: 'Agentic Sales Intelligence & Outbound Pipeline',
    problem:
      'Built for SMB sales teams stitching together six tools to find pipeline — research, voice agents, and outreach unified into one revenue engine, so reps close instead of search.',
    description:
      'RevOps is the sales application in the Echo 1 Labs business lifecycle. When founder-led companies outgrow a basic CRM and a part-time SDR, RevOps takes over — combining deep prospect research, AI voice and text agents, personalized email sequences, and CRM automation into one agent-based system. It replaces the 4-6 disconnected sales tools your team cobbled together at 20 employees and still cannot live without at 150, so your sales team focuses on closing, not searching.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/RevOps.webp',
    deployedIn: ['Real Estate', 'Home Services', 'IT Services', 'Business Consultants'],
    metrics: [
      { value: '6-8x', label: 'Faster lead screening vs. manual research' },
      { value: '200+', label: 'Leads/month capacity per team' },
      { value: '78%', label: 'First-contact resolution (voice agents)' },
      { value: '$0.08', label: 'Per interaction cost (AI agents)' },
    ],
    capabilities: [
      { name: 'Omega Deep Research', desc: 'Multi-pass web research builds complete prospect profiles with ICP scoring, firmographics, and buying signals.' },
      { name: 'AI Voice Agents', desc: '24/7 inbound/outbound calling via Vapi + Twilio — qualifies leads, books demos, handles tier-1 support.' },
      { name: 'Text & Chat Agents', desc: 'SMS automation, web chatbots, and Slack bots with confidence-based escalation to human operators.' },
      { name: 'Personalized Email', desc: 'Multi-touch drip campaigns with behavior triggers, A/B testing, and CRM-synced personalization.' },
      { name: 'Apollo Integration', desc: 'ICP-to-leads pipeline: describe your ideal customer, get ranked contacts with emails and phones.' },
      { name: 'LinkedIn Warm Lists', desc: 'Scrape post engagers, enrich profiles, build warm outreach lists from competitor audiences.' },
    ],
  },
  {
    slug: 'broadcast',
    name: 'Broadcast',
    stage: 'ATTRACT',
    category: 'Marketing',
    gridLine: 'Content + brand amplification',
    tagline: 'Agentic Marketing Operations & Content Engine',
    problem:
      'Built for founders done paying three agencies to repeat each other — one agentic engine running SEO, content, ads, social, and brand voice end-to-end with unified attribution.',
    description:
      "Broadcast is the marketing application in the Echo 1 Labs business lifecycle. When you have outgrown the founder-as-marketer stage but cannot justify a six-person in-house team, Broadcast runs the function: SEO audits, branding roadmaps, campaign generation, content creation, social media, paid ads, and analytics. One agent-based system powered by thousands of data points — replacing the 6+ fragmented marketing tools most founder-led companies accumulate by year three.",
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Broadcast.webp',
    deployedIn: ['Every SMB Without a Robust Marketing Team'],
    metrics: [
      { value: '1000s', label: 'Data points powering every recommendation' },
      { value: '18+', label: 'Interconnected marketing skills' },
      { value: '6 Wks', label: 'Full GTM strategy to execution' },
      { value: '74+', label: 'Automated ad audit checks per platform' },
    ],
    capabilities: [
      { name: 'SEO Audit & Gap Analysis', desc: 'Technical audits (148 rules), GSC-powered optimization, programmatic SEO, gap identification, keyword intelligence.' },
      { name: 'Marketing & Branding Roadmap', desc: 'Full roadmaps with configurable timelines — 30-40 page strategy doc + 13-sheet Excel workbook with ICPs, KPIs.' },
      { name: 'Campaign Gen & Management', desc: 'End-to-end campaign creation, A/B testing, performance tracking across Google, Meta, YouTube, LinkedIn, TikTok.' },
      { name: 'Content Creation Engine', desc: 'Blog posts, LinkedIn content, newsletters, infographics, generated images/video — powered by deep industry data.' },
      { name: 'Social Media Command', desc: 'Managed presence across LinkedIn, Instagram, TikTok, X, Facebook — automated posting, engagement, analytics.' },
      { name: 'Brand Voice Engine', desc: 'Consistent tone enforcement across all channels — extracts voice from docs and calls, generates guidelines.' },
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
      'Built for PE and VC teams stuck on analyst-heavy screening — deck reading, benchmarking, and IC memos in under thirty minutes, so diligence starts where the work matters.',
    description:
      'Signal is the deal intelligence application in the Echo 1 Labs business lifecycle. PE/VC firms and strategic acquirers that have outgrown spreadsheets and analyst-heavy deal screening use Signal to consolidate deal sourcing, financial analysis, deck reading, industry benchmarking (61 BizMiner ratios across 5,000+ NAICS codes), screening gates, and one-click IC memo generation. It cuts deal screening from 2-4 hours to under 30 minutes — agent-based automation replacing the manual analyst workflow that does not scale past 20 deals a quarter.',
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
      { name: 'Industry Benchmarking', desc: '61 BizMiner financial ratios with P25/Median/P75 overlay — auto-matched by NAICS code and revenue band.' },
      { name: 'Deal Sourcing', desc: 'Unified intake from Kumo (100K+ deals), BizBuySell (200K+ via Apify), and manual submissions.' },
      { name: 'One-Click IC Memos', desc: 'Generated investment committee memos with financials, risk assessment, and recommendation — PDF export.' },
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
    tagline: 'The Agentic CFO for Founder-Led Companies',
    problem:
      'Built for founder-led companies past the bookkeeper stage but not ready for a full-time CFO — live cash flow, ROI, and unit economics on a single dashboard you can actually trust.',
    description:
      'Ledger is the finance-operations application in the Echo 1 Labs business lifecycle. Founder-led companies that have outgrown their bookkeeper-plus-spreadsheets stage — but are not ready for a full-time CFO — use Ledger as an agent-based fractional finance function. It integrates live with QuickBooks, tracks budget versus actual across campaigns and departments, forecasts cash flow on rolling 30/60/90 day horizons, calculates campaign ROI and LTV:CAC from live RevOps and Broadcast data, and surfaces financial KPIs to operators through Prime.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Ledger.jpg',
    deployedIn: ['Founder-Led SMBs', 'Portfolio Companies', 'Multi-Entity Operators'],
    metrics: [
      { value: 'Live', label: 'QuickBooks integration for real-time data' },
      { value: '30/60/90', label: 'Day rolling cash flow forecasts' },
      { value: 'Auto', label: 'LTV:CAC + campaign ROI from live data' },
      { value: '1', label: 'Fractional CFO — no added headcount' },
    ],
    capabilities: [
      { name: 'QuickBooks Integration', desc: 'Live financial data feeds into budget, cash flow, and KPI dashboards in real time.' },
      { name: 'Budget vs. Actual Tracking', desc: 'Per-campaign, per-department, per-initiative spend versus plan with variance alerts.' },
      { name: 'Cash Flow Forecasting', desc: '30/60/90 day rolling horizons with revenue-lag modeling and Base/Conservative/Aggressive scenarios.' },
      { name: 'Campaign ROI Analytics', desc: 'Closes the loop between Broadcast ad spend, RevOps pipeline, and actual revenue booked.' },
      { name: 'LTV:CAC + Unit Economics', desc: 'Auto-calculated from Engine intake data and live RevOps pipeline — no manual spreadsheet rebuilds.' },
      { name: 'Variance Analysis', desc: 'Claude-powered explanations for budget variances, anomaly detection, and forward-looking recommendations.' },
    ],
  },
  {
    slug: 'titan',
    name: 'Titan',
    stage: 'DELIVER',
    category: 'Bid + Fulfillment',
    gridLine: 'Project + delivery management',
    tagline: 'Agentic Estimating, Plans, PO & Vendor Management',
    problem:
      'Built for construction, manufacturing, and project teams scaling past ten active jobs — plan extraction, real-time pricing, and PO management in one workflow that replaces the spreadsheet stack.',
    description:
      'Titan is the delivery application in the Echo 1 Labs business lifecycle. For manufacturing, construction, distribution, and oil & gas SMBs that have outgrown estimating spreadsheets and paper POs, Titan runs the full 23-step workflow from customer configuration to project completion — plan extraction, parametric plan generation, real-time pricing with 180+ configurations, digital contracting, PO and vendor management, and job site monitoring. One agent-based system replacing the cobbled-together estimating, contracting, and PO tracking that breaks when you scale past 10 active projects.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/Titan.webp',
    deployedIn: ['Manufacturing', 'Construction', 'Distribution', 'Oil & Gas'],
    metrics: [
      { value: '23', label: 'Step end-to-end operational workflow' },
      { value: '180+', label: 'Pre-configured building size/height combos' },
      { value: '85%+', label: 'High-confidence extraction accuracy' },
      { value: '2-4hr', label: 'Manual work eliminated per deal' },
    ],
    capabilities: [
      { name: 'AI Plan Extraction', desc: 'Upload PDFs — the model extracts measurements across 7 disciplines with dual-AI QA and confidence scoring.' },
      { name: 'Estimating Engine', desc: '393+ line items, 16-category markup, 10 labor trades, GC fee structure — real-time transparent pricing.' },
      { name: 'Digital Contracting', desc: '10-step guided signing with arbitration, RCLA, dual signature capture — UETA/E-SIGN compliant.' },
      { name: 'PO & Vendor Mgmt', desc: 'Auto-generated POs from BOMs, distributor follow-up sequences, payment tracking — cross-industry applicable.' },
      { name: 'Plan Generation', desc: '11-21 PE-stamped sheets per building via parametric generators with config-hash caching.' },
      { name: 'Document Extraction', desc: 'Multi-discipline classification, large PDF splitting, audit trail, signed URL storage — works for any industry.' },
    ],
  },
  {
    slug: 'prime',
    name: 'Prime',
    stage: 'GOVERN',
    category: 'Governance',
    gridLine: 'Agentic operations platform',
    tagline: 'Mission Control — GRC, Risk & Compliance at Scale',
    problem:
      'Built for operators running the full Echo 1 stack — a single command center consolidating pipeline, performance, risk, and approvals across every system, so nothing slips between the cracks.',
    description:
      'Prime is the executive command center of the Echo 1 Labs business lifecycle. As founder-led companies scale past the point where the founder can personally track what every system is doing, Prime consolidates KPIs, risk signals, compliance status, and financial performance from every Echo 1 Labs application — Engine, RevOps, Broadcast, Signal, Ledger, Titan, and AI Readiness — into one dashboard. It is the single source of truth for how the business is running: what pipelines are producing, what campaigns are performing, what contracts are at risk, what automations are failing, and where human approvals are still waiting.',
    poster: 'https://www.echo1labs.com/images/Hero%202026%20mp4/PRIME.jpg',
    deployedIn: ['Multi-Product Echo 1 Labs Stacks', 'Founder-Led Operating Teams'],
    metrics: [
      { value: '100%', label: 'Cross-application KPI aggregation in real time' },
      { value: '7', label: 'Product data streams unified into one view' },
      { value: '24/7', label: 'Risk + compliance signals surfaced' },
      { value: '1', label: 'Single source of truth across the business' },
    ],
    capabilities: [
      { name: 'Cross-App KPI Aggregation', desc: 'Unifies metrics from all Echo 1 Labs applications into one dashboard with executive rollups.' },
      { name: 'Risk Monitoring', desc: 'Surfaces operational, financial, and compliance risks in real time — stuck deals, failed automations, overdue approvals.' },
      { name: 'Compliance Tracking', desc: 'Tracks regulatory, contractual, and policy obligations across workflows, vendors, and client engagements.' },
      { name: 'Audit Logs', desc: 'Full traceability of automated decisions, human approvals, and system changes — UETA / E-SIGN / SOC-2 ready.' },
      { name: 'Executive Reporting', desc: 'Board-ready reports with financial, operational, and strategic rollups generated on demand.' },
      { name: 'Governance Controls', desc: 'Acceptable use policies, data classification, human-in-the-loop enforcement, quarterly review cycles built in.' },
    ],
  },
];

/** The 7 products that get generated /products/[slug] pages (excludes the advisory). */
export const PRODUCT_SLUGS = PRODUCTS.filter((p) => !p.isAdvisory).map((p) => p.slug);

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const AI_READINESS = PRODUCTS.find((p) => p.slug === 'ai-readiness')!;
