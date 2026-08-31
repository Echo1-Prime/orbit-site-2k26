/**
 * Per-product SEO, SBO (AI search / GEO), and PMax optimization data.
 * Kept separate from products.ts (product logic) to make content editing fast.
 *
 * Naming discipline:
 *  seoTitle     : keyword-optimized <title> tag (~60 chars)
 *  seoDesc      : CTR-optimized meta description (150–160 chars)
 *  primaryKeyword : single target keyword driving on-page optimization
 *  keywords     : secondary / LSI keywords for contextual relevance
 *  hook         : PMax-style benefit headline (replaces the H1 on the page)
 *  whoFor       : ICP targeting statement (1–2 sentences, SBO anchor)
 *  comparesTo   : short description of the product's own job (no brand or competitor names)
 *  faq          : 4–5 definitional Q&As for FAQPage schema + GEO/AI citation
 *
 * Ethics gate: NO fabricated proof, NO performance claims beyond what is
 * documented and verifiable in products.ts. FAQs are factual descriptions,
 * not conversion copy.
 */

export interface ProductSEO {
  slug: string;
  seoTitle: string;
  seoDesc: string;
  primaryKeyword: string;
  keywords: string[];
  hook: string;
  whoFor: string;
  comparesTo: string;
  faq: { q: string; a: string }[];
  /** Short lifecycle text shown in the "Related stages" strip. */
  relatedSlugs: string[];
}

export const PRODUCT_SEO_MAP: Record<string, ProductSEO> = {

  engine: {
    slug: 'engine',
    seoTitle: 'Engine: AI Go-to-Market Strategy for Owner-Led SMBs',
    seoDesc:
      'Get a complete GTM playbook in under 30 minutes. Echo 1 Labs Engine combines adaptive intake, content ingestion, and AI strategy generation. Schedule a call.',
    primaryKeyword: 'AI go-to-market strategy tool',
    keywords: [
      'GTM strategy software',
      'AI marketing strategy for small business',
      'owner-led go-to-market system',
      'AI playbook generator',
      'marketing strategy automation',
    ],
    hook: 'Your complete GTM strategy, built from your own voice, in under 30 minutes.',
    whoFor:
      'Built for owner-led companies between $5M and $100M in revenue that have outgrown founder-as-marketer but are not ready for a six-person in-house team.',
    comparesTo: 'Builds a complete GTM strategy and execution plan from your own voice in under 30 minutes',
    relatedSlugs: ['revops', 'broadcast', 'prime'],
    faq: [
      {
        q: 'What is Echo 1 Labs Engine?',
        a: 'Engine is the go-to-market strategy application in the Echo 1 Labs Business Lifecycle Management system. It runs an adaptive intake (26 questions if you verify with LinkedIn, 55 if starting from scratch), ingests your existing content, and produces a complete GTM program: a 30-40 page strategic playbook, a 24-sheet execution workbook, and pre-configured campaigns that feed directly into RevOps, Broadcast, and Signal.',
      },
      {
        q: 'Who is Engine built for?',
        a: 'Engine is built for owner-led companies with $5M–$100M in revenue that have outgrown the founder-as-marketer stage but are not yet ready for (or cannot yet justify) a six-person in-house marketing team.',
      },
      {
        q: 'How long does Engine take to produce a GTM strategy?',
        a: 'From completed intake to strategic playbook delivery takes under 30 minutes. The intake itself takes 15–20 minutes depending on whether you verify with LinkedIn (26 questions) or start without it (55 questions).',
      },
      {
        q: 'What does Engine deliver?',
        a: 'Engine delivers a complete go-to-market program: an adaptive intake, a 30-40 page strategic playbook, a 24-sheet execution workbook, and pre-configured campaigns that flow into RevOps, Broadcast, and Signal. Most manual GTM planning runs 6–12 weeks; Engine runs in under 30 minutes.',
      },
      {
        q: 'Does Engine integrate with other Echo 1 Labs products?',
        a: 'Yes. Engine outputs pre-configured data that flows directly into RevOps (ICP filters, Apollo sequences), Broadcast (campaign briefs, brand voice), and Signal (deal criteria for PE/VC clients). It is the front door to the full Echo 1 Labs business lifecycle.',
      },
    ],
  },

  revops: {
    slug: 'revops',
    seoTitle: 'RevOps: AI Sales Automation & Outbound Pipeline for SMBs',
    seoDesc:
      'Replace 4–6 disconnected sales tools with one agentic revenue engine. AI voice agents, deep prospect research, and personalized outreach, built for SMB sales teams.',
    primaryKeyword: 'AI sales automation for SMBs',
    keywords: [
      'agentic outbound sales system',
      'AI voice agent for sales',
      'sales pipeline automation',
      'B2B lead generation software',
      'AI SDR tool',
    ],
    hook: 'Replace 6 disconnected sales tools with one agentic revenue engine.',
    whoFor:
      'Built for SMB sales teams in real estate, home services, IT services, and consulting, any company with 50–200 employees whose reps are stitching together four or more disconnected tools to find pipeline.',
    comparesTo: 'Runs prospect research, AI voice and email outreach, and lead qualification in one agentic revenue engine',
    relatedSlugs: ['engine', 'broadcast', 'prime'],
    faq: [
      {
        q: 'What is Echo 1 Labs RevOps?',
        a: 'RevOps is the sales intelligence and outbound pipeline application in the Echo 1 Labs Business Lifecycle Management system. It combines deep prospect research (Omega), AI voice agents via Vapi and Twilio, text and chat automation, personalized email sequences, Apollo CRM integration, and LinkedIn warm-list building into one agent-based revenue engine.',
      },
      {
        q: 'Who is RevOps built for?',
        a: 'RevOps is built for SMB sales teams that have outgrown basic CRM-only workflows, most commonly in real estate, home services, IT services, and business consulting. Typical profile: 50–200 employees whose sales team is stitching together four or more disconnected tools to find, qualify, and contact pipeline.',
      },
      {
        q: 'How does the AI voice agent work?',
        a: 'RevOps uses Vapi and Twilio for inbound and outbound calling. The AI voice agent qualifies leads, books discovery calls, handles tier-1 support questions, and escalates to a human rep when its confidence drops below a set threshold. It operates 24/7 without changes to your existing phone infrastructure.',
      },
      {
        q: 'What is Omega Deep Research?',
        a: 'Omega is RevOps\' multi-pass web research engine. It builds complete prospect profiles with ICP scoring, firmographic data, and buying signals before the first outreach touch, so sales reps start conversations with context instead of calling blind.',
      },
      {
        q: 'What does RevOps do?',
        a: 'RevOps unifies prospect research, AI voice and text outreach, personalized email sequences, lead qualification, and CRM enrichment in one agentic revenue engine with a single shared data model, so a sales team no longer stitches together four to six disconnected tools.',
      },
    ],
  },

  broadcast: {
    slug: 'broadcast',
    seoTitle: 'Broadcast: Agentic Marketing Operations for Owner-Led Companies',
    seoDesc:
      'One system for SEO, content, ads, social, and brand voice. Broadcast unifies the fragmented marketing stack owner-led SMBs accumulate by year three.',
    primaryKeyword: 'AI marketing operations system',
    keywords: [
      'agentic marketing system for SMBs',
      'AI content marketing tool',
      'SMB marketing automation',
      'AI SEO system',
      'marketing operations software',
    ],
    hook: 'One agentic engine across every channel: SEO, content, ads, social, and brand voice.',
    whoFor:
      'Built for SMBs with $5M–$100M in revenue where marketing is run by the founder or a single generalist, past the point of owner-led social posts, not yet at the size for a six-person in-house team.',
    comparesTo: 'Runs SEO, content, social, paid ads, and brand-voice enforcement through one agentic marketing engine',
    relatedSlugs: ['engine', 'revops', 'prime'],
    faq: [
      {
        q: 'What is Echo 1 Labs Broadcast?',
        a: 'Broadcast is the marketing operations and content engine in the Echo 1 Labs Business Lifecycle Management system. It runs SEO audits (148 technical rules), campaign generation, content creation, social media management, paid advertising, and brand voice enforcement through one agent-based system, consolidating the 6+ fragmented marketing tools most SMBs accumulate by their third year.',
      },
      {
        q: 'Who is Broadcast built for?',
        a: 'Broadcast is built for owner-led SMBs with $5M–$100M in revenue where marketing is run by the founder or a single generalist. The company has outgrown owner-led social posts but cannot yet justify a six-person in-house team.',
      },
      {
        q: 'What does Broadcast\'s SEO audit cover?',
        a: 'Broadcast\'s SEO audit covers 148 technical rules including Core Web Vitals, crawlability, structured data, internal linking, content gaps, Google Search Console integration, and programmatic SEO opportunities. The output is a prioritized gap list mapped to revenue impact.',
      },
      {
        q: 'How does Broadcast enforce brand voice?',
        a: 'Broadcast extracts brand voice from your existing documents, sales decks, and intake data from Engine, then applies it as a filter across every content output (blog posts, social captions, ad copy, and email sequences) so nothing published sounds like it came from a generic AI tool.',
      },
      {
        q: 'What does Broadcast do?',
        a: 'Broadcast runs SEO, content creation, social media management, paid advertising, and analytics through one agent-based system with a single shared attribution model, so every channel works from the same data instead of in disconnected silos.',
      },
    ],
  },

  signal: {
    slug: 'signal',
    seoTitle: 'Signal: AI Deal Intelligence & Screening for PE and VC',
    seoDesc:
      'Screen PE and VC deals in under 30 minutes with AI deck reading, 61-ratio benchmarking, and one-click IC memos. Echo 1 Labs Signal, built for deal teams.',
    primaryKeyword: 'AI deal screening software for private equity',
    keywords: [
      'PE due diligence automation',
      'venture capital deal intelligence',
      'IC memo generator',
      'deal flow automation software',
      'investment committee memo tool',
    ],
    hook: 'Screen deals in under 30 minutes. IC memos in one click.',
    whoFor:
      'Built for PE firms, VC funds, and strategic acquirers reviewing 10–50+ deals per quarter where analyst-heavy screening is the primary bottleneck between sourcing and diligence.',
    comparesTo: 'Reads decks, screens against four gates, benchmarks 61 industry ratios, and drafts IC memos in under 30 minutes',
    relatedSlugs: ['prime', 'ledger', 'engine'],
    faq: [
      {
        q: 'What is Echo 1 Labs Signal?',
        a: 'Signal is the deal intelligence application in the Echo 1 Labs Business Lifecycle Management system. It combines deal sourcing integrations (Kumo, BizBuySell), AI deck reading, automated screening gates, 61-ratio industry benchmarking via BizMiner, and one-click IC memo generation into a single agent-based workflow for PE firms, VC funds, and strategic acquirers.',
      },
      {
        q: 'Who is Signal built for?',
        a: 'Signal is built for private equity firms, venture capital funds, and strategic acquirers reviewing 10–50+ deals per quarter where analyst-heavy screening is the primary bottleneck. Typical profile: a 3–15 person investment team spending 2–4 hours per deal on preliminary screening before any real analysis begins.',
      },
      {
        q: 'How fast can Signal screen a deal?',
        a: 'Signal reduces deal screening from the typical 2–4 hour manual process to under 30 minutes. This includes deck reading, financial data extraction, four-gate automated screening, industry benchmarking against 61 BizMiner ratios, and preliminary IC memo generation.',
      },
      {
        q: 'What industry benchmark data does Signal use?',
        a: 'Signal integrates BizMiner data covering 61 financial ratios across 5,000+ NAICS codes, segmented by company size and revenue band. Benchmarks include P25, median, and P75 ranges for every metric, so every deal is compared to its specific industry peer group, not generic SMB averages.',
      },
      {
        q: 'What are Signal\'s four automated screening gates?',
        a: 'Signal applies four hard-filter gates before advanced analysis: Revenue Floor (minimum revenue threshold), EBITDA Margin (profitability floor), Entry Multiple (maximum acquisition price multiple), and Data Quality (minimum completeness for a reliable outcome). Deals failing a gate are flagged for analyst review, not automatically discarded.',
      },
    ],
  },

  ledger: {
    slug: 'ledger',
    seoTitle: 'Ledger: The AI CFO System for Owner-Led Companies',
    seoDesc:
      'Live QuickBooks integration, cash flow forecasts, and automatic LTV:CAC. Echo 1 Labs Ledger is the fractional CFO function for owner-led companies. Coming soon.',
    primaryKeyword: 'AI CFO software for small business',
    keywords: [
      'fractional CFO system',
      'cash flow forecasting software',
      'QuickBooks analytics dashboard',
      'SMB financial operations software',
      'LTV CAC tracking tool',
    ],
    hook: 'Live cash flow, ROI, and unit economics, without a full-time CFO.',
    whoFor:
      'Built for owner-led companies with $5M–$100M in revenue that have outgrown bookkeeper-plus-spreadsheets but are not yet ready for (or cannot yet afford) a full-time CFO.',
    comparesTo: 'Delivers live cash flow forecasts, budget-vs-actual tracking, and LTV:CAC from your QuickBooks data',
    relatedSlugs: ['prime', 'signal', 'revops'],
    faq: [
      {
        q: 'What is Echo 1 Labs Ledger?',
        a: 'Ledger is the finance operations application in the Echo 1 Labs Business Lifecycle Management system. It connects live to QuickBooks Online, tracks budget versus actual across campaigns and departments, forecasts cash flow on 30/60/90-day rolling horizons, calculates campaign ROI and LTV:CAC from live RevOps and Broadcast data, and delivers these metrics to the operator through Prime.',
      },
      {
        q: 'Who is Ledger built for?',
        a: 'Ledger is built for owner-led companies with $5M–$100M in revenue that have outgrown their bookkeeper-plus-spreadsheets stage but are not yet ready for (or cannot yet justify) a full-time CFO. Typical gap: cash flow is tracked manually or reviewed monthly instead of in real time.',
      },
      {
        q: 'Does Ledger replace a CFO?',
        a: 'Ledger is a fractional CFO function, not a CFO replacement. It automates the data collection, forecasting, and reporting work that consumes 60–80% of a CFO\'s time, but the operator or an advisor still makes strategic decisions based on what Ledger surfaces. Human judgment is not automated out.',
      },
      {
        q: 'What QuickBooks data does Ledger use?',
        a: 'Ledger integrates with QuickBooks Online via the QBO API to pull live P&L, balance sheet, accounts receivable, accounts payable, and payroll data. It reconciles this against RevOps pipeline data and Broadcast campaign spend to give a complete view of revenue, cost, and return, not just accounting records.',
      },
      {
        q: 'When will Ledger be available?',
        a: 'Ledger is currently in development. Contact Echo 1 Labs to be notified when Ledger launches or to discuss early access.',
      },
    ],
  },

  titan: {
    slug: 'titan',
    seoTitle: 'Titan: AI Estimating, Contracting & Delivery for Project Teams',
    seoDesc:
      'AI plan extraction, real-time estimating, digital contracting, and PO management in one 23-step workflow. Echo 1 Labs Titan for construction and manufacturing.',
    primaryKeyword: 'AI estimating software for construction and manufacturing',
    keywords: [
      'agentic project management software',
      'construction bid management system',
      'AI plan extraction tool',
      'PO management software',
      'digital contracting system',
    ],
    hook: 'From customer configuration to project completion in one 23-step workflow.',
    whoFor:
      'Built for construction, manufacturing, distribution, and oil & gas companies running 10+ active projects simultaneously, past the point where estimating spreadsheets and paper POs hold up.',
    comparesTo: 'Runs plan extraction, parametric estimating, digital contracting, and PO management in one 23-step workflow',
    relatedSlugs: ['prime', 'revops', 'ledger'],
    faq: [
      {
        q: 'What is Echo 1 Labs Titan?',
        a: 'Titan is the bid management and delivery application in the Echo 1 Labs Business Lifecycle Management system. It runs a 23-step workflow from customer configuration to project completion: AI plan extraction across 7 disciplines, parametric estimating with 393+ line items, digital contracting (UETA/E-SIGN compliant), PO and vendor management, and job site monitoring.',
      },
      {
        q: 'Who is Titan built for?',
        a: 'Titan is built for project-based businesses (primarily construction, manufacturing, distribution, and oil & gas SMBs) running 10 or more active projects simultaneously. Typical profile: estimating taking 2–4 hours per deal, vendor PO tracking in disconnected systems, contracting still done on paper or generic e-sign tools.',
      },
      {
        q: 'How does Titan\'s AI plan extraction work?',
        a: 'Upload a PDF set of plans and specifications. Titan\'s AI extracts measurements across 7 structural and mechanical disciplines, runs a dual-AI quality check against the source document, and returns a confidence score per extraction. High-confidence items auto-populate the estimating engine; low-confidence items are flagged for human review before estimate generation.',
      },
      {
        q: 'What does the Titan estimating engine produce?',
        a: 'Titan\'s estimating engine produces a line-item estimate with 393+ components organized into 16 cost categories. It includes a 10-trade labor pricing model, a configurable GC fee structure with markup layers, and real-time total pricing that updates as project specifications change.',
      },
      {
        q: 'Is Titan\'s digital contracting legally binding?',
        a: 'Titan\'s digital contracting uses a 10-step guided signing workflow with dual signature capture, arbitration clauses, and RCLA (Right to Cure) provisions. It is compliant with the Uniform Electronic Transactions Act (UETA) and the Electronic Signatures in Global and National Commerce Act (E-SIGN) for legally binding electronic signatures.',
      },
    ],
  },

  prime: {
    slug: 'prime',
    seoTitle: 'Prime: Mission Control & Governance System',
    seoDesc:
      'One dashboard for pipeline, campaigns, deals, projects, and financials across your full Echo 1 Labs stack. Echo 1 Labs Prime, mission control for operators.',
    primaryKeyword: 'AI business operations system for SMBs',
    keywords: [
      'agentic governance system',
      'SMB executive dashboard',
      'GRC software for small business',
      'AI business intelligence system',
      'multi-application command center',
    ],
    hook: 'One dashboard for everything running: pipeline, performance, risk, and approvals.',
    whoFor:
      'Built for operators running three or more Echo 1 Labs applications simultaneously, and for portfolio operators managing multiple Echo 1 Labs implementations across a portfolio of companies.',
    comparesTo: 'Aggregates KPIs, risk signals, approvals, and financials from every Echo 1 Labs app into one supervision layer',
    relatedSlugs: ['engine', 'revops', 'signal'],
    faq: [
      {
        q: 'What is Echo 1 Labs Prime?',
        a: 'Prime is the governance and executive command center of the Echo 1 Labs Business Lifecycle Management system. It aggregates KPIs, risk signals, compliance status, approval queues, and financial performance from every other Echo 1 Labs application (Engine, RevOps, Broadcast, Signal, Ledger, and Titan) into a single real-time dashboard.',
      },
      {
        q: 'Who is Prime built for?',
        a: 'Prime is built for operators running the full Echo 1 Labs stack, typically owner-led companies past 50 employees where the founder can no longer personally track every system. It is also used by portfolio operators managing multiple Echo 1 Labs implementations across a portfolio of companies.',
      },
      {
        q: 'What does Prime monitor in real time?',
        a: 'Prime monitors pipeline production from RevOps, campaign performance from Broadcast, deal progress from Signal, project status from Titan, financial KPIs from Ledger, and governance compliance across all applications. Risk signals (stuck deals, failed automations, overdue approvals, compliance gaps) surface automatically without manual reporting.',
      },
      {
        q: 'Does Prime include audit logging?',
        a: 'Yes. Prime maintains full traceability of automated decisions, human approvals, and system changes across all connected applications. The audit log is designed for compliance with UETA, the E-SIGN Act, and SOC-2 principles. It also supports quarterly governance review cycles with built-in report generation.',
      },
      {
        q: 'Is Prime a separate product or part of the Echo 1 Labs system?',
        a: 'Prime is the command center for multi-product Echo 1 Labs deployments. It is most valuable when three or more Echo 1 Labs applications are active simultaneously, giving operators a unified view of the business rather than checking each application separately.',
      },
    ],
  },
};

export function getProductSEO(slug: string): ProductSEO | undefined {
  return PRODUCT_SEO_MAP[slug];
}
