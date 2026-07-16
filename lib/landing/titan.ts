import type { LandingCopy } from './types';

export const titanCopy: LandingCopy = {
  slug: 'titan',
  seoTitle: 'Titan — End-to-End Bid and Project Fulfillment for SMBs',
  seoDesc:
    'From customer configuration to project completion in one 23-step workflow. Echo 1 Labs Titan eliminates the gap between sales and delivery that bleeds margin on every job.',

  presuasionFrame: 'contrast',

  eyebrow: 'Echo 1 Labs · Titan',
  headline: 'From customer configuration to project completion — in one 23-step workflow.',
  subhead:
    'Most SMBs run delivery on spreadsheets, tribal knowledge, and hope. Every handoff between sales and ops costs you margin and client trust. Titan closes that gap.',
  ctaPrimary: 'See how Titan works',
  ctaSecondary: 'Talk to an operator',

  storyHeadline: 'The handoff between sales and ops is where margin goes to die.',
  storyBody: [
    'You win the deal. Sales celebrates. And then the real work begins — the frantic email chain to figure out what was actually promised, the project that starts three weeks late because procurement wasn\'t looped in, the change order nobody remembered to document.',
    'Every operator we\'ve talked to knows this story. The problem isn\'t the people — it\'s the gap between the tool that closes deals and the system that delivers them. Those two worlds almost never speak the same language.',
    'Titan is the bridge. A 23-step workflow that carries every job from the moment a customer configures their order all the way through delivery confirmation — with agent checkpoints at every handoff that matters.',
  ],

  offerHeadline: 'The system under every job you deliver.',
  dreamOutcome: 'Every project starts on time, with the right scope, right resources, and right margin — without a project manager manually coordinating it.',
  perceivedLikelihood: 'Standard 30-day deployment on your existing project management stack. No rip-and-replace.',
  timeDelay: 'First workflow live within 3 weeks. Full 23-step build in 30 days.',
  effortReduction: 'Titan runs the coordination logic. Your team handles the skilled work. We run the system.',

  metrics: [
    { value: '85%+', label: 'reduction in handoff errors', note: 'Illustrative / client target' },
    { value: '23', label: 'automated workflow checkpoints', note: 'Standard Titan build' },
    { value: '30 days', label: 'to full deployment', note: 'Deployment target' },
    { value: '3×', label: 'faster project start', note: 'Illustrative / client target' },
  ],

  capabilitiesHeadline: 'What Titan runs inside every project.',
  capabilities: [
    {
      icon: '⚙️',
      title: 'Customer configuration to scope',
      desc: 'Client selections and requirements automatically translate into a scoped project brief — no re-entry, no lost specs.',
    },
    {
      icon: '📦',
      title: 'Procurement and resource allocation',
      desc: 'Materials, vendors, and internal resource assignments triggered at the right stage of every job.',
    },
    {
      icon: '🔔',
      title: 'Automated stakeholder updates',
      desc: 'Clients and internal teams get the right update at the right moment — without anyone manually drafting it.',
    },
    {
      icon: '📝',
      title: 'Change order tracking',
      desc: 'Every scope change captured, approved, and documented in the workflow — before it becomes a margin leak.',
    },
    {
      icon: '✅',
      title: 'Delivery confirmation and sign-off',
      desc: 'Structured QA checklist and client sign-off flow baked into the final workflow stages.',
    },
    {
      icon: '📊',
      title: 'Job-level profitability reporting',
      desc: 'Estimated vs. actual margin surfaced per job, per project type — the numbers that tell you where you\'re leaking.',
    },
  ],

  comparisonHeadline: 'What Titan replaces.',
  comparisonEnemy: 'The handoff gap',
  comparisonRows: [
    { feature: 'Sales → ops handoff', them: 'Email thread + verbal summary', us: '23-step structured workflow, automatic' },
    { feature: 'Scope documentation', them: 'Proposal PDF + tribal knowledge', us: 'Auto-generated brief from config inputs' },
    { feature: 'Procurement triggers', them: 'PM manually reviews and orders', us: 'Stage-gated triggers in the workflow' },
    { feature: 'Client communication', them: 'Manual update emails', us: 'Automated milestone updates' },
    { feature: 'Change orders', them: 'Informal — often missed', us: 'Tracked, approved, logged in workflow' },
    { feature: 'Job profitability', them: 'Accounting looks back 60 days later', us: 'Estimated vs actual per job, real-time' },
  ],

  objectionsHeadline: 'Common questions.',
  objections: [
    {
      q: 'We already use a project management tool. Does Titan replace it?',
      a: 'No — Titan runs on top of your existing PM stack (or a new one we help you choose). It adds the workflow logic and automation layer that raw PM tools don\'t provide out of the box.',
    },
    {
      q: 'Our jobs are all different. Can a standard workflow handle that?',
      a: 'The 23-step framework is configurable per job type during onboarding. Titan ships with branches and conditional logic — your custom job types become workflow variants, not exceptions.',
    },
    {
      q: 'How does this affect our sales process?',
      a: 'Titan starts where the deal closes, not before it. Your sales process doesn\'t change — Titan picks up the handoff and runs from there.',
    },
    {
      q: 'What industries is Titan built for?',
      a: 'Titan is designed for project-based SMBs in construction, field services, professional services, and specialty trades. If you win a deal and then deliver a project, Titan is built for you.',
    },
    {
      q: 'Who manages Titan after deployment?',
      a: 'Echo 1 Labs runs the system — monitoring workflow health, flagging exceptions, and running quarterly optimizations. Your team runs the projects; we run the system that coordinates them.',
    },
  ],

  ctaBandHeadline: 'Your next project deserves a system behind it.',
  ctaBandSub: 'A 30-minute call walks you through what Titan looks like in your specific delivery model.',
  ctaBandPrimary: 'Schedule your strategy call',
};
