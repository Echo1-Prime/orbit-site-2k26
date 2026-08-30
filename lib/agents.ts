// Echo 1 Labs — 28 specialist agents across 5 lifecycle domains.
// Domain filter values must stay in sync with AgentsGrid.tsx DOMAINS constant.

export type AgentDomain = 'Go-to-Market' | 'Revenue' | 'Finance' | 'Operations' | 'Governance';

export interface Agent {
  id: string;
  name: string;
  domain: AgentDomain;
  product: string;
  tagline: string;
  description: string;
  icon: string;
}

export const AGENTS: Agent[] = [
  // ── Go-to-Market (Engine) ───────────────────────────────────────────────
  {
    id: 'gtm-strategist',
    name: 'GTM Strategist',
    domain: 'Go-to-Market',
    product: 'Engine',
    icon: '🎯',
    tagline: 'Adaptive intake → complete go-to-market strategy.',
    description:
      'Runs the 26/55-question adaptive intake, ingests existing content, and produces a 30–40 page GTM playbook with ICPs, positioning, KPIs, budget, and 90-day roadmap.',
  },
  {
    id: 'icp-builder',
    name: 'ICP Builder',
    domain: 'Go-to-Market',
    product: 'Engine',
    icon: '🔍',
    tagline: 'Defines and refines your ideal customer profile.',
    description:
      'Extracts firmographic and psychographic signals from intake responses and existing deal data to generate scored ICP profiles that feed RevOps prospecting filters.',
  },
  {
    id: 'brand-voice',
    name: 'Brand Voice',
    domain: 'Go-to-Market',
    product: 'Engine',
    icon: '🎙️',
    tagline: 'Locks your tone and messaging across every channel.',
    description:
      'Reads website copy, sales decks, podcasts, and past campaigns to extract your authentic voice, then enforces it across all Engine, RevOps, and Broadcast outputs.',
  },
  {
    id: 'content-repurposer',
    name: 'Content Repurposer',
    domain: 'Go-to-Market',
    product: 'Broadcast',
    icon: '♻️',
    tagline: 'Turns one asset into ten distribution-ready formats.',
    description:
      'Ingests a blog post, podcast, webinar, or sales deck and generates LinkedIn posts, email sequences, short-form clips, infographics, and ad copy — each optimized for the channel.',
  },
  {
    id: 'landing-page-builder',
    name: 'Landing Page Builder',
    domain: 'Go-to-Market',
    product: 'Engine',
    icon: '🏗️',
    tagline: 'Conversion-engineered pages from GTM strategy inputs.',
    description:
      'Generates branded landing pages — hero, ICP-matched value props, social proof blocks, and CTA — directly from Engine playbook outputs, ready to deploy in hours.',
  },
  {
    id: 'seo-auditor',
    name: 'SEO Auditor',
    domain: 'Go-to-Market',
    product: 'Broadcast',
    icon: '📊',
    tagline: '148-rule technical audit + keyword gap map.',
    description:
      'Runs a full technical SEO scan (148 rules), cross-references GSC performance data, identifies keyword gaps, and delivers a prioritized fix list with projected traffic impact.',
  },

  // ── Revenue (RevOps) ────────────────────────────────────────────────────
  {
    id: 'prospect-researcher',
    name: 'Prospect Researcher',
    domain: 'Revenue',
    product: 'RevOps',
    icon: '🔎',
    tagline: 'Deep profile on every prospect — in minutes.',
    description:
      'Multi-pass web research builds complete prospect profiles with ICP scoring, firmographics, tech stack, hiring signals, and buying triggers — 6–8× faster than manual.',
  },
  {
    id: 'outreach-writer',
    name: 'Outreach Writer',
    domain: 'Revenue',
    product: 'RevOps',
    icon: '✉️',
    tagline: 'Hyper-personalized sequences at scale.',
    description:
      'Generates multi-touch email, LinkedIn, and SMS sequences from prospect profiles and ICP data — A/B variants included, synced to Apollo sequences via CRM automation.',
  },
  {
    id: 'voice-qualifier',
    name: 'Voice Qualifier',
    domain: 'Revenue',
    product: 'RevOps',
    icon: '📞',
    tagline: '24/7 inbound and outbound calling agent.',
    description:
      'Vapi + Twilio-powered voice agent that qualifies leads, handles objections, books demos, and escalates edge cases to humans — $0.08 per interaction.',
  },
  {
    id: 'linkedin-scout',
    name: 'LinkedIn Scout',
    domain: 'Revenue',
    product: 'RevOps',
    icon: '🔗',
    tagline: 'Warm lists from competitor audiences.',
    description:
      'Scrapes post engagers from competitor LinkedIn accounts, enriches profiles against Apollo, and builds warm outreach lists segmented by ICP fit score.',
  },
  {
    id: 'pipeline-analyst',
    name: 'Pipeline Analyst',
    domain: 'Revenue',
    product: 'RevOps',
    icon: '📈',
    tagline: 'Deal velocity, coverage gaps, forecast risk.',
    description:
      'Analyzes CRM pipeline health — stage velocity, coverage ratio, deal age, and churn risk — and surfaces weekly recommendations to the sales team before the forecast call.',
  },
  {
    id: 'text-chat-agent',
    name: 'Text & Chat Agent',
    domain: 'Revenue',
    product: 'RevOps',
    icon: '💬',
    tagline: 'SMS + web chat with confidence-based escalation.',
    description:
      'Runs SMS automation, web chatbots, and Slack bots for lead qualification, appointment reminders, and first-response support — with automatic human escalation when confidence drops.',
  },

  // ── Finance (Signal + Ledger) ───────────────────────────────────────────
  {
    id: 'deal-screener',
    name: 'Deal Screener',
    domain: 'Finance',
    product: 'Signal',
    icon: '🛡️',
    tagline: 'Four hard-filter gates in under 30 minutes.',
    description:
      'Applies Revenue Floor, EBITDA Margin, Entry Multiple, and Data Quality gates to every incoming deal — instant pass/fail with flagged exceptions, cutting screening from 2–4 hours to 30 minutes.',
  },
  {
    id: 'ic-memo-generator',
    name: 'IC Memo Generator',
    domain: 'Finance',
    product: 'Signal',
    icon: '📝',
    tagline: 'Investment committee memo in one click.',
    description:
      'Generates board-ready IC memos with financials, risk assessment, industry benchmarks, and recommendation — PDF export, branded template, ready for partner review.',
  },
  {
    id: 'benchmark-analyst',
    name: 'Benchmark Analyst',
    domain: 'Finance',
    product: 'Signal',
    icon: '📉',
    tagline: '61 BizMiner ratios across 5,000+ NAICS codes.',
    description:
      'Auto-matches a company to its NAICS code and revenue band, overlays 61 financial ratios at P25/Median/P75, and flags material deviations that need diligence attention.',
  },
  {
    id: 'cash-flow-forecaster',
    name: 'Cash Flow Forecaster',
    domain: 'Finance',
    product: 'Ledger',
    icon: '💵',
    tagline: '30/60/90-day rolling horizon — three scenarios.',
    description:
      'Builds Base, Conservative, and Aggressive cash flow models from live QuickBooks data with revenue-lag modeling — surfaces shortfall alerts 60 days before they hit.',
  },
  {
    id: 'budget-monitor',
    name: 'Budget Monitor',
    domain: 'Finance',
    product: 'Ledger',
    icon: '🎯',
    tagline: 'Budget vs. actual — per department, per campaign.',
    description:
      'Tracks spend against plan across every initiative with real-time QuickBooks feeds, sends variance alerts when any line exceeds threshold, and explains the delta in plain language.',
  },
  {
    id: 'unit-economics',
    name: 'Unit Economics',
    domain: 'Finance',
    product: 'Ledger',
    icon: '⚖️',
    tagline: 'LTV:CAC and campaign ROI from live data.',
    description:
      'Auto-calculates LTV:CAC, payback period, and gross margin from RevOps pipeline and Broadcast ad spend — closes the loop between marketing investment and revenue booked.',
  },

  // ── Operations (Titan) ──────────────────────────────────────────────────
  {
    id: 'plan-extractor',
    name: 'Plan Extractor',
    domain: 'Operations',
    product: 'Titan',
    icon: '📐',
    tagline: '85%+ extraction accuracy across 7 disciplines.',
    description:
      'Uploads PDFs and extracts measurements across structural, mechanical, electrical, plumbing, civil, architectural, and fire disciplines — dual-AI QA with confidence scoring.',
  },
  {
    id: 'estimator',
    name: 'Estimator',
    domain: 'Operations',
    product: 'Titan',
    icon: '🔢',
    tagline: '393+ line-item estimate — real-time transparent pricing.',
    description:
      'Generates 393+ line item estimates with 16-category markup, 10 labor trades, and GC fee structure — from plan extraction data, configuration-hash cached for instant repricing.',
  },
  {
    id: 'contract-generator',
    name: 'Contract Generator',
    domain: 'Operations',
    product: 'Titan',
    icon: '📜',
    tagline: '10-step digital signing — UETA/E-SIGN compliant.',
    description:
      'Produces UETA/E-SIGN compliant contracts from estimate data, guides both parties through a 10-step signing workflow with arbitration clauses, RCLA, and dual-capture.',
  },
  {
    id: 'po-manager',
    name: 'PO Manager',
    domain: 'Operations',
    product: 'Titan',
    icon: '📋',
    tagline: 'Auto-generated POs from BOMs — payment tracked.',
    description:
      'Converts bill-of-materials outputs to purchase orders, routes to distributors, runs automated follow-up sequences, and tracks payment milestones — cross-industry applicable.',
  },
  {
    id: 'vendor-tracker',
    name: 'Vendor Tracker',
    domain: 'Operations',
    product: 'Titan',
    icon: '🤝',
    tagline: 'Supplier performance and risk in one dashboard.',
    description:
      'Monitors vendor delivery timelines, surfaces at-risk POs, flags pricing deviations, and maintains a scored supplier registry — alerts before delays become project failures.',
  },
  {
    id: 'document-extractor',
    name: 'Document Extractor',
    domain: 'Operations',
    product: 'Titan',
    icon: '🗂️',
    tagline: 'Multi-discipline classification for any document type.',
    description:
      'Classifies and extracts structured data from contracts, invoices, POs, and permits at scale — large PDF splitting, audit trail, and signed URL storage across any industry.',
  },

  // ── Governance (Prime) ──────────────────────────────────────────────────
  {
    id: 'risk-monitor',
    name: 'Risk Monitor',
    domain: 'Governance',
    product: 'Prime',
    icon: '🚨',
    tagline: 'Operational and financial risk — surfaced 24/7.',
    description:
      'Monitors stuck deals, failed automations, overdue approvals, and financial anomalies across every connected system — surfaces risk signals to the operator before they escalate.',
  },
  {
    id: 'compliance-tracker',
    name: 'Compliance Tracker',
    domain: 'Governance',
    product: 'Prime',
    icon: '✅',
    tagline: 'Regulatory, contractual, and policy obligations in one view.',
    description:
      'Tracks compliance obligations across workflows, vendors, and client engagements — flags upcoming deadlines, missing evidence, and policy violations before they become findings.',
  },
  {
    id: 'audit-logger',
    name: 'Audit Logger',
    domain: 'Governance',
    product: 'Prime',
    icon: '🗒️',
    tagline: 'Full traceability — SOC-2, UETA, E-SIGN ready.',
    description:
      'Maintains immutable audit trails of automated decisions, human approvals, and system changes — structured for SOC-2 evidence, legal discovery, and quarterly review cycles.',
  },
  {
    id: 'executive-reporter',
    name: 'Executive Reporter',
    domain: 'Governance',
    product: 'Prime',
    icon: '📊',
    tagline: 'Board-ready reports generated on demand.',
    description:
      'Aggregates KPIs from all Echo 1 Labs applications and generates board-ready reports with financial, operational, and strategic rollups — formatted, branded, and PDF-exported.',
  },
];

export const AGENT_DOMAINS: AgentDomain[] = [
  'Go-to-Market',
  'Revenue',
  'Finance',
  'Operations',
  'Governance',
];

export const getAgentsByDomain = (domain: AgentDomain): Agent[] =>
  AGENTS.filter((a) => a.domain === domain);

export const getAgent = (id: string): Agent | undefined =>
  AGENTS.find((a) => a.id === id);
