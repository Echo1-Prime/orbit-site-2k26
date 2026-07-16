import type { LandingCopy } from './types';

export const titanCopy: LandingCopy = {
  slug: 'titan',
  seoTitle: 'Titan — Bid and Project Fulfillment Workflow for SMBs',
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
    'You win the deal. Sales celebrates. And then the real work begins: the frantic email chain to figure out what was actually promised, the project that starts three weeks late because procurement wasn\'t looped in, the change order nobody remembered to document.',
    'Every operator we\'ve talked to knows this story. The problem isn\'t the people. It\'s the gap between the tool that closes deals and the system that delivers them. Those two worlds almost never get synced in time.',
    'Titan is the bridge. A 23-step workflow that carries every job from the moment a customer configures their order through delivery confirmation, with checkpoints at every handoff that matters.',
  ],

  offerHeadline: 'The system under every job you deliver.',
  dreamOutcome: 'Every project starts on time, scoped correctly, with the right resources and the right margin — and nobody had to manually coordinate it.',
  perceivedLikelihood: 'Standard 30-day deployment on your existing project management stack. Nothing gets ripped out.',
  timeDelay: 'First workflow live within 3 weeks. Full 23-step build in 30 days.',
  effortReduction: 'Titan runs the coordination logic. Your team handles the skilled work. We run the system that keeps it moving.',

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
      title: 'Configuration to scoped brief',
      desc: 'Client selections flow directly into a scoped project brief. No re-entry. No "what exactly did we sell them" conversations at kickoff.',
    },
    {
      icon: '📦',
      title: 'Procurement and resource allocation',
      desc: 'Materials, vendors, and internal assignments get triggered at the right workflow stage. Not after someone remembers to ask.',
    },
    {
      icon: '🔔',
      title: 'Stakeholder updates',
      desc: 'Clients and internal teams get the relevant update at the right moment. The workflow fires them. Nobody sits down to draft a status email.',
    },
    {
      icon: '📝',
      title: 'Change order tracking',
      desc: 'Every scope change gets captured, approved, and documented in the workflow before it turns into a margin leak at the end of the job.',
    },
    {
      icon: '✅',
      title: 'Delivery and sign-off',
      desc: 'QA checklist and client sign-off are built into the final workflow stages. Completion is structured, not a string of "did we get that approved?" messages.',
    },
    {
      icon: '📊',
      title: 'Job-level margin reporting',
      desc: 'Estimated vs. actual margin per job, per project type, available in real time. Not 60 days later when accounting runs the numbers.',
    },
  ],

  comparisonHeadline: 'What Titan replaces.',
  comparisonEnemy: 'The handoff gap',
  comparisonRows: [
    { feature: 'Sales to ops handoff', them: 'Email thread + verbal summary', us: '23-step structured workflow fires automatically at deal close' },
    { feature: 'Scope documentation', them: 'Proposal PDF + what the rep remembered', us: 'Brief auto-built from the customer\'s configuration inputs' },
    { feature: 'Procurement triggers', them: 'PM manually reviews and places orders', us: 'Stage-gated triggers in the workflow, no manual review needed' },
    { feature: 'Client communication', them: 'Manual update emails, whenever someone gets to it', us: 'Automated milestone updates at each workflow stage' },
    { feature: 'Change orders', them: 'Informal, often missed, argued about at close', us: 'Tracked, approved, logged in the workflow as they happen' },
    { feature: 'Job profitability', them: 'Accounting looks back 60 days later', us: 'Estimated vs actual per job, available in real time' },
  ],

  objectionsHeadline: 'Common questions.',
  objections: [
    {
      q: 'We already use a project management tool. Does Titan replace it?',
      a: 'No. Titan runs on top of your existing PM stack, or a new one we help you choose. It adds the workflow logic and automation layer that tools like Asana or Monday don\'t provide by default.',
    },
    {
      q: 'Our jobs are all different. Can a standard workflow handle that?',
      a: 'The 23-step framework is configurable per job type during onboarding. Titan ships with branches and conditional logic, so your custom job types become workflow variants instead of exceptions that fall outside the system.',
    },
    {
      q: 'How does this affect our sales process?',
      a: 'It doesn\'t. Titan picks up at deal close and runs from there. Your sales team doesn\'t touch it.',
    },
    {
      q: 'What industries is Titan built for?',
      a: 'Project-based SMBs: construction, field services, professional services, specialty trades. If you win a deal and then deliver a project, Titan fits.',
    },
    {
      q: 'Who manages Titan after deployment?',
      a: 'Echo 1 Labs monitors workflow health, flags exceptions, and runs quarterly optimizations. Your team runs the projects. We run the system that coordinates them.',
    },
  ],

  ctaBandHeadline: 'Your next project deserves a system behind it.',
  ctaBandSub: 'A 30-minute call walks you through what Titan looks like in your specific delivery model.',
  ctaBandPrimary: 'Schedule your strategy call',
};
