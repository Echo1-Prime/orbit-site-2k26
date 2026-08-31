// Echo 1 Labs — 28 specialist agents across 7 product domains.
// Organized by product (Prime, Engine, Broadcast, RevOps, Ledger, Titan, Signal).

export type AgentDomain =
  | 'Prime'
  | 'Engine'
  | 'Broadcast'
  | 'RevOps'
  | 'Ledger'
  | 'Titan'
  | 'Signal';

export type AgentTrigger = 'Scheduled' | 'Event' | 'On-Demand';

export interface Agent {
  id: string;
  name: string;
  domain: AgentDomain;
  trigger: AgentTrigger;
  description: string;
}

export const AGENTS: Agent[] = [
  // ── Prime ───────────────────────────────────────────────────────────────
  {
    id: 'prime-observer',
    name: 'Prime Observer',
    domain: 'Prime',
    trigger: 'Scheduled',
    description:
      'Monitors KPIs across all active domains. Surfaces threshold breaches before they become decisions you missed.',
  },
  {
    id: 'threshold-guardian',
    name: 'Threshold Guardian',
    domain: 'Prime',
    trigger: 'Event',
    description:
      'Routes threshold alerts to the right operator layer. Prioritizes by severity. Nothing crosses without being seen.',
  },
  {
    id: 'briefing-compiler',
    name: 'Briefing Compiler',
    domain: 'Prime',
    trigger: 'Scheduled',
    description:
      'Assembles a daily digest of agent activity, open thresholds, and decisions awaiting operator input.',
  },
  {
    id: 'workflow-router',
    name: 'Workflow Router',
    domain: 'Prime',
    trigger: 'Event',
    description:
      "Handles cross-app handoffs when one agent's output triggers another domain's workflow.",
  },

  // ── Engine ──────────────────────────────────────────────────────────────
  {
    id: 'icp-prospector',
    name: 'ICP Prospector',
    domain: 'Engine',
    trigger: 'Scheduled',
    description:
      'Builds targeted prospect lists from your ICP definition. Pulls from Apollo, scores by fit, queues to outreach.',
  },
  {
    id: 'outreach-sequencer',
    name: 'Outreach Sequencer',
    domain: 'Engine',
    trigger: 'Scheduled',
    description:
      'Executes multi-touch outreach sequences on declared cadence. Adapts messaging by stage and persona.',
  },
  {
    id: 'meeting-scheduler',
    name: 'Meeting Scheduler',
    domain: 'Engine',
    trigger: 'On-Demand',
    description:
      'Coordinates calendar availability and confirms meetings with prospects. Runs inside outreach or standalone.',
  },
  {
    id: 'pipeline-velocity-monitor',
    name: 'Pipeline Velocity Monitor',
    domain: 'Engine',
    trigger: 'Event',
    description:
      "Tracks deal movement across stages. Fires a stall alert to Prime when a deal hasn't progressed past threshold.",
  },

  // ── Broadcast ───────────────────────────────────────────────────────────
  {
    id: 'content-generator',
    name: 'Content Generator',
    domain: 'Broadcast',
    trigger: 'Scheduled',
    description:
      'Produces multi-channel copy on cadence — social, email, long-form — aligned to your brand guidelines.',
  },
  {
    id: 'social-scheduler',
    name: 'Social Scheduler',
    domain: 'Broadcast',
    trigger: 'Scheduled',
    description:
      'Queues and publishes content across connected social channels. Maintains cadence. Reports confirmations to Prime.',
  },
  {
    id: 'brand-monitor',
    name: 'Brand Monitor',
    domain: 'Broadcast',
    trigger: 'Scheduled',
    description:
      'Tracks brand mentions and sentiment across channels. Surfaces anomalies and engagement spikes as signals.',
  },
  {
    id: 'campaign-reporter',
    name: 'Campaign Reporter',
    domain: 'Broadcast',
    trigger: 'Scheduled',
    description:
      'Compiles campaign performance data across channels. Builds a summary for operator review on cadence.',
  },

  // ── RevOps ──────────────────────────────────────────────────────────────
  {
    id: 'lead-qualifier',
    name: 'Lead Qualifier',
    domain: 'RevOps',
    trigger: 'Event',
    description:
      'Scores inbound leads against ICP definition and stage-gate logic. Routes qualified leads to pipeline automatically.',
  },
  {
    id: 'deal-analyzer',
    name: 'Deal Analyzer',
    domain: 'RevOps',
    trigger: 'On-Demand',
    description:
      'Runs comparable deal analysis and win/loss pattern recognition on active opportunities.',
  },
  {
    id: 'forecast-builder',
    name: 'Forecast Builder',
    domain: 'RevOps',
    trigger: 'Scheduled',
    description:
      'Builds a rolling pipeline forecast from stage positions and historical conversion rates. Published weekly.',
  },
  {
    id: 'revenue-reconciler',
    name: 'Revenue Reconciler',
    domain: 'RevOps',
    trigger: 'Scheduled',
    description:
      'Reconciles bookings vs. billings on a defined cadence. Surfaces discrepancies as threshold alerts.',
  },

  // ── Ledger ──────────────────────────────────────────────────────────────
  {
    id: 'gl-reconciler',
    name: 'GL Reconciler',
    domain: 'Ledger',
    trigger: 'Scheduled',
    description:
      'Runs a daily general ledger close against QuickBooks. Flags variances before they compound.',
  },
  {
    id: 'invoice-processor',
    name: 'Invoice Processor',
    domain: 'Ledger',
    trigger: 'Event',
    description:
      'Automates AP invoice intake — extracts, categorizes, routes for approval. Triggers on invoice receipt.',
  },
  {
    id: 'cash-flow-monitor',
    name: 'Cash Flow Monitor',
    domain: 'Ledger',
    trigger: 'Scheduled',
    description:
      'Tracks runway and working capital on a rolling basis. Fires to Prime when cash position crosses threshold.',
  },
  {
    id: 'expense-categorizer',
    name: 'Expense Categorizer',
    domain: 'Ledger',
    trigger: 'Event',
    description:
      'Applies GL coding to uncategorized transactions. Maps to chart of accounts. Exceptions only to operator.',
  },

  // ── Titan ───────────────────────────────────────────────────────────────
  {
    id: 'document-classifier',
    name: 'Document Classifier',
    domain: 'Titan',
    trigger: 'Event',
    description:
      'Identifies and categorizes incoming documents by type before routing to the appropriate pipeline.',
  },
  {
    id: 'data-extractor',
    name: 'Data Extractor',
    domain: 'Titan',
    trigger: 'Event',
    description:
      'Pulls structured fields from unstructured documents and outputs clean JSON. Eliminates manual data entry.',
  },
  {
    id: 'contract-parser',
    name: 'Contract Parser',
    domain: 'Titan',
    trigger: 'On-Demand',
    description:
      'Extracts key clauses, obligations, and dates from contracts. Surfaces renewal windows to Prime.',
  },
  {
    id: 'po-processor',
    name: 'PO Processor',
    domain: 'Titan',
    trigger: 'Event',
    description:
      'Handles PO intake and three-way match against receipt and invoice. Flags discrepancies for review only.',
  },

  // ── Signal ──────────────────────────────────────────────────────────────
  {
    id: 'valuation-benchmarker',
    name: 'Valuation Benchmarker',
    domain: 'Signal',
    trigger: 'On-Demand',
    description:
      'Retrieves like-for-like comparable transactions. Builds an enterprise value range against real acquisition data.',
  },
  {
    id: 'exit-timeline-modeler',
    name: 'Exit Timeline Modeler',
    domain: 'Signal',
    trigger: 'On-Demand',
    description:
      'Maps current readiness against comparable exit timelines. Identifies gaps between now and acquirer expectations.',
  },
  {
    id: 'capital-structure-analyzer',
    name: 'Capital Structure Analyzer',
    domain: 'Signal',
    trigger: 'On-Demand',
    description:
      'Analyzes your structure against comparable raises at your stage. Positions the narrative for growth capital conversations.',
  },
  {
    id: 'transaction-monitor',
    name: 'Transaction Monitor',
    domain: 'Signal',
    trigger: 'Scheduled',
    description:
      'Tracks deal activity in your sector on a rolling basis. Surfaces comparable transactions when market conditions shift.',
  },
];

export const AGENT_DOMAINS: AgentDomain[] = [
  'Prime',
  'Engine',
  'Broadcast',
  'RevOps',
  'Ledger',
  'Titan',
  'Signal',
];

export const getAgentsByDomain = (domain: AgentDomain): Agent[] =>
  AGENTS.filter((a) => a.domain === domain);

export const getAgent = (id: string): Agent | undefined =>
  AGENTS.find((a) => a.id === id);
