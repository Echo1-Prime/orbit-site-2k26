import type { LandingCopy } from './types';

export const revopsCopy: LandingCopy = {
  slug: 'revops',
  seoTitle: 'RevOps — Agentic Revenue Engine for SMB Sales Teams',
  seoDesc:
    'Replace your disconnected CRM, sequencer, and analytics stack with one agent-run revenue engine. Echo 1 Labs RevOps drives pipeline, automates follow-up, and surfaces signal — operators stay in the loop.',

  presuasionFrame: 'authority',

  eyebrow: 'Echo 1 Labs · RevOps',
  headline: 'Replace 6 disconnected sales tools with one agentic revenue engine.',
  subhead:
    'Most SMB sales stacks are a patchwork of tools that don\'t talk to each other. Your team spends more time managing the stack than closing deals. RevOps changes that.',
  ctaPrimary: 'Schedule a strategy call',
  ctaSecondary: 'See how it works',

  storyHeadline: 'Built by operators who ran broken stacks.',
  storyBody: [
    'Every founder who builds a sales team learns the same expensive lesson: the tools that worked at 10 reps don\'t scale to 30. Your CRM doesn\'t talk to your sequencer. Analytics lag by a week. Your best reps are spending 40% of their time on data hygiene instead of selling.',
    'We\'ve run those stacks. We hired the consultants and bought the "GTM software platform." None of it fixed the core problem: you need a system that thinks about revenue, not just logs it.',
    'RevOps is what we built for ourselves and now run for clients. The agents run the motion. Your ops lead reviews the playbook. Every decision point that matters stays in human hands.',
  ],

  offerHeadline: 'What you\'re actually buying.',
  dreamOutcome: 'A revenue engine that runs the top-of-funnel motion while your team focuses on qualified conversations.',
  perceivedLikelihood: 'Deployed in 30 days. Connects to your existing Salesforce or HubSpot instance. Nothing gets ripped out.',
  timeDelay: 'First qualified sequences live within 2 weeks of kickoff.',
  effortReduction: 'We run the build, integration, and ongoing optimization. Your team approves the playbook and reviews the weekly numbers.',

  metrics: [
    { value: '6–8×', label: 'outbound volume vs manual', note: 'Illustrative / client target' },
    { value: '78%', label: 'reduction in sequence setup time', note: 'Illustrative / client target' },
    { value: '30 days', label: 'to first qualified pipeline', note: 'Deployment target' },
    { value: '2 hrs/wk', label: 'operator oversight required', note: 'Post-stabilization estimate' },
  ],

  capabilitiesHeadline: 'What RevOps does for your revenue motion.',
  capabilities: [
    {
      icon: '🎯',
      title: 'ICP-tuned outbound sequences',
      desc: 'The system builds sequences matched to each buyer segment, runs them on schedule, and flags which ones to adjust. Your ops lead reviews, not writes.',
    },
    {
      icon: '🔄',
      title: 'Multi-channel orchestration',
      desc: 'Email, LinkedIn, and call cadences run from one playbook. No switching tools per channel, no task lists to manually check.',
    },
    {
      icon: '📊',
      title: 'Pipeline signal surfacing',
      desc: 'Deals going dark, stale contacts, accounts showing buying activity: surfaced to your reps before the window closes.',
    },
    {
      icon: '🤖',
      title: 'Agentic follow-up',
      desc: 'Booking confirms, reply handling, and nurture steps fire automatically. Your reps pick up the thread when it\'s a real conversation.',
    },
    {
      icon: '📋',
      title: 'CRM hygiene',
      desc: 'Contact enrichment, stage updates, and data quality checks run continuously. Your Salesforce stays accurate without someone babysitting it.',
    },
    {
      icon: '📈',
      title: 'Weekly revenue brief',
      desc: 'Every Monday morning: pipeline health, response rates, booked calls, what to fix. Ten minutes to read.',
    },
  ],

  comparisonHeadline: 'What RevOps replaces.',
  comparisonEnemy: 'The 6-tool stack',
  comparisonRows: [
    { feature: 'Outbound sequencing', them: 'Outreach / Apollo — manual build by your SDR', us: 'System-built sequences, runs and adjusts itself' },
    { feature: 'CRM data hygiene', them: 'SDR time — 40% of their week gone', us: 'Automated enrichment + stage logic, always on' },
    { feature: 'Follow-up cadence', them: 'Manual tasks and missed reminders', us: 'Fires automatically, no human trigger needed' },
    { feature: 'Pipeline visibility', them: 'Lag-reports from Salesforce, days old', us: 'Real-time signal surfacing to your reps' },
    { feature: 'Multi-channel coord.', them: 'Separate tools per channel, no sync', us: 'Single playbook across all channels' },
    { feature: 'Reporting', them: 'Someone builds it or it doesn\'t happen', us: 'Auto-generated every Monday, one page' },
  ],

  objectionsHeadline: 'Common questions.',
  objections: [
    {
      q: 'We already have Salesforce / HubSpot. Does RevOps replace it?',
      a: 'No. RevOps runs on top of your existing CRM. It doesn\'t touch the system of record. Your Salesforce stays your Salesforce. RevOps runs the motion on top of it.',
    },
    {
      q: 'How is this different from hiring a RevOps consultant?',
      a: 'A consultant designs the process and leaves. This is an ongoing managed service. The agents run the motion, your ops lead reviews the weekly numbers, and the system gets tighter over time.',
    },
    {
      q: 'What does my team actually have to do?',
      a: 'Approve the ICP and messaging playbook during onboarding. Review the weekly report. Take the qualified calls that come out the other side. That\'s it.',
    },
    {
      q: 'How long until we see results?',
      a: 'Sequences go live within 2 weeks. You\'ll have real response rates and booked calls to look at within 30 days. The numbers compound from there as the system learns what works.',
    },
    {
      q: 'Is this only for outbound?',
      a: 'Primarily yes. RevOps is built for top-of-funnel revenue motion. For deal management it pairs with Signal, and for go-to-market strategy it sits downstream of Engine.',
    },
  ],

  ctaBandHeadline: 'Ready to stop managing the stack and start closing deals?',
  ctaBandSub: 'A 30-minute strategy call shows you exactly what RevOps would look like in your revenue motion.',
  ctaBandPrimary: 'Schedule your strategy call',
};
