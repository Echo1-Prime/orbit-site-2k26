import type { LandingCopy } from './types';

export const signalCopy: LandingCopy = {
  slug: 'signal',
  seoTitle: 'Signal — Deal Screening and IC Memo Generation for PE, VC, and Family Offices',
  seoDesc:
    'Screen deals in under 30 minutes. IC memos in one click. Echo 1 Labs Signal is built for PE, VC, and family office deal flow, at the pace the market actually moves.',

  presuasionFrame: 'scarcity',

  eyebrow: 'Echo 1 Labs · Signal',
  headline: 'Screen deals in under 30 minutes. IC memos in one click.',
  subhead:
    'Your deal flow is moving faster than your team can screen. Signal gives you the analytical depth of a full associate on every opportunity — in the time it takes to drink your coffee.',
  ctaPrimary: 'See Signal in action',
  ctaSecondary: 'Talk to an operator',

  storyHeadline: 'Every deal you pass on slowly is a deal you\'re really passing on.',
  storyBody: [
    'PE and VC deal teams run into the same crunch every quarter: pipeline is full, the IC schedule is packed, and the associate team is three memos behind. The deals that should get a fast no are sitting in a queue. The ones that deserve a serious look aren\'t getting enough time.',
    'Moving faster on initial screens isn\'t about rushing. It\'s about clearing the obvious passes quickly so your best people can spend real time on the handful of deals that actually warrant it.',
    'Signal was built by operators who\'ve sat in the IC chair. It handles the first 80% of every screen so your team can own the last 20%: judgment, relationships, and the calls that only experience gets right.',
  ],

  offerHeadline: 'What Signal delivers on every deal.',
  dreamOutcome: 'Every inbound deal gets a structured screen within the hour. IC-ready memos without waiting on an associate to finish.',
  perceivedLikelihood: 'Integrated with your deal intake in 2 weeks. Connects to your existing Affinity, Salesforce, or Datasite setup.',
  timeDelay: 'First deal screened in Signal within 48 hours of deployment.',
  effortReduction: 'Signal handles data gathering, comp pulls, and memo drafting. Your team makes the calls.',

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
      desc: 'Every inbound opportunity goes into a consistent format. No PDF decks lost in email, no intake fields your associate has to fill in manually after the fact.',
    },
    {
      icon: '📊',
      title: 'Comp analysis',
      desc: 'Public and proprietary comparable transactions pulled from CapIQ and your firm\'s deal history, formatted, and ranked by relevance. Takes minutes, not half a day.',
    },
    {
      icon: '🧠',
      title: 'IC memo generation',
      desc: 'Thesis, market sizing, management assessment, financials, key risks: structured in your firm\'s IC format, ready for the meeting. One click from a completed screen.',
    },
    {
      icon: '⚠️',
      title: 'Red flag surfacing',
      desc: 'Financial anomalies, management tenure gaps, market size mismatches: flagged and documented before anyone walks into the IC meeting.',
    },
    {
      icon: '📁',
      title: 'Data room indexing',
      desc: 'Indexes the documents in your Datasite or Intralinks room and surfaces what matters at each diligence stage, instead of leaving your team to hunt.',
    },
    {
      icon: '📋',
      title: 'Portfolio monitoring',
      desc: 'Post-close KPI tracking and board-prep briefs on the cadence you set. Not a spreadsheet update every quarter. A structured brief your GP can read in 15 minutes.',
    },
  ],

  comparisonHeadline: 'What Signal replaces.',
  comparisonEnemy: 'The associate bottleneck',
  comparisonRows: [
    { feature: 'Deal intake', them: 'Email + PDF deck shared in Drive, manually filed', us: 'Structured intake form feeds directly into Signal' },
    { feature: 'Initial screen', them: '2–3 hours per analyst, inconsistent depth', us: '<30 minutes, same structure every deal' },
    { feature: 'Comp analysis', them: 'Manual CapIQ pull + Excel build', us: 'Pulled, formatted, and ranked by Signal' },
    { feature: 'IC memo', them: '1–2 days of associate time per deal', us: '1 click from a completed screen' },
    { feature: 'Red flag review', them: 'Whatever the analyst caught, on that day', us: 'Systematic check on every deal, every time' },
    { feature: 'Portfolio monitoring', them: 'Quarterly spreadsheet update and calls', us: 'Structured KPI tracking and board briefs on your cadence' },
  ],

  objectionsHeadline: 'Common questions.',
  objections: [
    {
      q: 'We have an associate team. Is this replacing them?',
      a: 'No. Signal handles the structured, repeatable work that doesn\'t require judgment. Your associates focus on the analysis that actually does. Most teams find it multiplies what they can cover, not what they need to staff.',
    },
    {
      q: 'Our deals are complex. Can Signal handle bespoke situations?',
      a: 'Signal handles the structured 80% of every screen: intake, comps, initial thesis, flag review. The bespoke analysis stays with your team. They just start from a cleaner, faster foundation.',
    },
    {
      q: 'How does Signal connect to our existing deal flow tools?',
      a: 'Integrates with Salesforce, HubSpot, and Affinity via API. Data room integrations include Datasite, Intralinks, and Google Drive. We handle the integration during the 2-week deployment.',
    },
    {
      q: 'What\'s the data security posture?',
      a: 'Deal data stays in your environment. Signal does not train on your firm\'s deal data. We support SSO and can deploy to your own infrastructure if required.',
    },
    {
      q: 'Does this work for family offices and independent sponsors, or just institutional funds?',
      a: 'Signal works well for teams of 2–15 investment professionals. It scales from a solo GP to a multi-strategy fund. The IC memo format is customizable to match your firm\'s existing template.',
    },
  ],

  ctaBandHeadline: 'Your next deal deserves a faster screen.',
  ctaBandSub: 'A 30-minute demo shows Signal on a live deal type from your pipeline.',
  ctaBandPrimary: 'Schedule your demo',
};
