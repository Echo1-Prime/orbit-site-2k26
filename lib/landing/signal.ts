import type { LandingCopy } from './types';

export const signalCopy: LandingCopy = {
  slug: 'signal',
  seoTitle: 'Signal — AI Deal Screening and IC Memo Generation for Investors',
  seoDesc:
    'Screen deals in under 30 minutes. Investor committee memos in one click. Echo 1 Labs Signal is purpose-built for PE, VC, and family office deal flow — at the pace the market moves.',

  presuasionFrame: 'scarcity',

  eyebrow: 'Echo 1 Labs · Signal',
  headline: 'Screen deals in under 30 minutes. IC memos in one click.',
  subhead:
    'Your deal flow is moving faster than your team can screen. Signal gives you the analytical depth of a full associate on every opportunity — in the time it takes to drink your coffee.',
  ctaPrimary: 'See Signal in action',
  ctaSecondary: 'Talk to an operator',

  storyHeadline: 'Every deal you pass on slowly is a deal you\'re really passing on.',
  storyBody: [
    'PE and VC deal teams face a version of the same problem every quarter: the pipeline is full, the IC schedule is packed, and the associate team is three memos behind. The deals that should get a fast no are sitting in a queue. The deals that deserve a deep look aren\'t getting one.',
    'Speed in deal screening isn\'t about moving fast for its own sake. It\'s about freeing up the time to do the hard analytical work on the opportunities that actually warrant it.',
    'Signal was built by operators who\'ve sat in the IC chair. It doesn\'t replace your judgment — it eliminates the 80% of screening work that shouldn\'t require it.',
  ],

  offerHeadline: 'What Signal delivers on every deal.',
  dreamOutcome: 'Every inbound deal gets a structured screen within the hour. IC-ready memos generated without an associate bottleneck.',
  perceivedLikelihood: 'Integrated with your deal intake process in 2 weeks. Works with your existing data room and CRM.',
  timeDelay: 'First deal screened in Signal within 48 hours of deployment.',
  effortReduction: 'Signal handles the data gathering, comp analysis, and memo drafting. Your team handles the judgment calls.',

  metrics: [
    { value: '<30 min', label: 'per deal screen', note: 'Post-setup target' },
    { value: '1 click', label: 'IC memo generation', note: 'From completed screen' },
    { value: '2 weeks', label: 'to first deployment', note: 'Standard integration' },
    { value: '10×', label: 'more deals screened per analyst', note: 'Illustrative / client target' },
  ],

  capabilitiesHeadline: 'What Signal does across your deal lifecycle.',
  capabilities: [
    {
      icon: '🔍',
      title: 'Structured deal intake',
      desc: 'Every inbound opportunity captured in a consistent format — no more PDF decks floating in email.',
    },
    {
      icon: '📊',
      title: 'Automated comp analysis',
      desc: 'Public and proprietary comparable transactions pulled, formatted, and ranked by relevance to the deal.',
    },
    {
      icon: '🧠',
      title: 'IC memo generation',
      desc: 'Thesis, market, management, financials, risks — structured memo in your firm\'s format, one click.',
    },
    {
      icon: '⚠️',
      title: 'Red flag surfacing',
      desc: 'Anomalies in financials, management tenure gaps, market size mismatches — flagged before the IC meeting.',
    },
    {
      icon: '📁',
      title: 'Data room organization',
      desc: 'Auto-indexes and surfaces the documents that matter for each stage of diligence.',
    },
    {
      icon: '📋',
      title: 'Portfolio monitoring',
      desc: 'Post-close KPI tracking and board-prep briefs generated on the cadence you set.',
    },
  ],

  comparisonHeadline: 'What Signal replaces.',
  comparisonEnemy: 'The associate bottleneck',
  comparisonRows: [
    { feature: 'Deal intake', them: 'Email + PDF deck in a shared drive', us: 'Structured intake form → Signal pipeline' },
    { feature: 'Initial screen', them: '2–3 hours per analyst', us: '<30 minutes, structured output' },
    { feature: 'Comp analysis', them: 'Manual pull from CapIQ + Excel', us: 'Auto-pulled, formatted, ranked' },
    { feature: 'IC memo', them: '1–2 days associate time', us: '1 click from completed screen' },
    { feature: 'Red flag review', them: 'Experience-dependent, inconsistent', us: 'Systematic across every deal' },
    { feature: 'Portfolio monitoring', them: 'Quarterly spreadsheet + calls', us: 'Automated KPI tracking + board briefs' },
  ],

  objectionsHeadline: 'Common questions.',
  objections: [
    {
      q: 'We have an associate team. Is this replacing them?',
      a: 'No — Signal multiplies your associates. It eliminates the low-judgment screening work so your team can focus on the deals and diligence work that actually requires their expertise.',
    },
    {
      q: 'Our deals are complex. Can Signal handle bespoke situations?',
      a: 'Signal handles the structured, repeatable 80% of every deal screen — intake, comps, initial thesis, red flags. Complex bespoke analysis is still done by your team, now with a cleaner foundation.',
    },
    {
      q: 'How does Signal connect to our existing deal flow tools?',
      a: 'Signal integrates with Salesforce, HubSpot, Affinity, and most CRM tools via API. Data room integrations include Datasite, Intralinks, and Google Drive. We handle the integration during deployment.',
    },
    {
      q: 'What\'s the data security posture?',
      a: 'Deal data stays in your environment. Signal does not train on your deal data. We support SSO and can deploy to your own infrastructure on request.',
    },
    {
      q: 'Does this work for family offices and independent sponsors, or just institutionalized funds?',
      a: 'Signal was designed specifically for teams of 2–15 investment professionals. It scales down to a one-person shop and up to a multi-strategy fund. The IC memo format is fully customizable.',
    },
  ],

  ctaBandHeadline: 'Your next deal deserves a faster screen.',
  ctaBandSub: 'A 30-minute demo shows Signal on a live deal type from your pipeline.',
  ctaBandPrimary: 'Schedule your demo',
};
