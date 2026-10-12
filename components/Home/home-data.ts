/* Static data for the home page bands, extracted verbatim from the design handoff
   ("Echo 1 Labs Home.dc.html" static tables). Do not rewrite copy here. */

/* eslint-disable @typescript-eslint/no-explicit-any */
export const SYM: any[] = ['Every decision still routes through your phone.', 'You hear about problems after the customer does.', 'Your numbers are a month old by the time you read them.', 'The best process in the company lives in one person\'s head.', 'You hired to get time back. You got more meetings.', 'A week off means checking in every hour.'];

export const CMP: any[] = [
    { dim: 'Coordination', p: 'One person\'s prompts, one answer at a time.', i: 'Agents with defined roles hand work to each other, in order, on the record.', d: 'Agent Kits · Prime' },
    { dim: 'Signal over noise', p: 'More drafts. More summaries. More to read.', i: 'The one right deal, lead, or line item, surfaced first.', d: 'Signal · RevOps' },
    { dim: 'Objectivity', p: 'An assistant that agrees with you.', i: 'Agents built to challenge, check, and audit the work.', d: 'Prime governance · Ledger review' },
    { dim: 'Edge', p: 'General answers to general questions.', i: 'Domain agents trained on one job and nothing else.', d: 'Titan construction kit · Signal M&A deal sourcing' },
    { dim: 'Outcomes', p: 'Hours saved. Maybe.', i: 'Measured in revenue won and margin kept.', d: 'Engine · RevOps' },
    { dim: 'Enablement', p: 'A login and good luck.', i: 'Process engineering first. Then adoption. Then agents.', d: 'AI Readiness' },
    { dim: 'Unprompted', p: 'Waits for you to ask.', i: 'Watches the business and flags drift before you notice it.', d: 'Ledger · Agent Orbit alerts' },
  ];

export const NODES: any[] = [
    { k: 'TRIGGER', c: 'var(--ao-stellar)', t: 'A request lands', ex: 'Bid request · plan set attached', why: 'Something real starts the workflow. A form, an email, a posted invoice. Nothing runs on a hunch.' },
    { k: 'DETERMINISTIC STEPS', c: 'var(--ao-bd-2)', kc: 'var(--ao-t1)', t: 'Rules do the routine', ex: 'Parse sheets · extract quantities', checks: ['Checkpoint · sheets complete', 'Checkpoint · totals reconcile'], why: 'Same input, same output, every time. A checkpoint stops the line if a step does not reconcile.' },
    { k: 'SPECIALIST AGENT', c: 'var(--ao-agent)', agent: true, t: 'One agent, one job', ex: 'Estimating agent · drafts the bid', why: 'The judgment call goes to an agent trained for this job only. It shows its work and its sources.' },
    { k: 'SUPERVISION GATE', c: 'var(--ao-orbit)', gate: true, t: '', ex: '', why: 'You approve, edit, or send it back.' },
    { k: 'LOGGED OUTCOME', c: 'var(--ao-system)', t: 'It goes on the record', ex: 'Bid sent · approver and time logged', why: 'Who approved what, and when, written to a log you own. Any step can be escalated later.' },
  ];

export const TRUST: any[] = [
    { n: '01', name: 'Shadow', line: 'Agent watches. You do.', detail: 'It learns how your people actually do the work. It touches nothing.', gateT: 'You do the work', gateEx: 'Agent observes · compares notes', agentEx: 'Estimating agent · observing', gateWhy: 'At Shadow, the agent only watches and compares its draft to yours.' },
    { n: '02', name: 'Draft and approve', line: 'Agent drafts. You sign.', detail: 'Every output waits for a signature. Your edits teach it your standard.', gateT: 'You sign every one', gateEx: 'Approve · edit · send back', agentEx: 'Estimating agent · drafts the bid', gateWhy: 'At Draft and approve, nothing leaves without your signature.' },
    { n: '03', name: 'Threshold', line: 'Agent acts inside limits you set.', detail: 'Outside those limits it stops and escalates. You can move it back a rung any time.', gateT: 'Your limits decide', gateEx: 'Inside limits · proceed. Outside · escalate', agentEx: 'Estimating agent · sends within limits', gateWhy: 'At Threshold, it proceeds inside your limits and escalates outside them.' },
  ];

export const FEED: any[] = [
    { a: 'LEDGER · CLOSE AGENT', t: 'Bank reconciliation drafted, waiting on controller', c: 'var(--ao-agent)' },
    { a: 'SIGNAL · SCREEN AGENT', t: 'Acquisition target cleared every criterion, owner review requested', c: 'var(--ao-orbit)' },
    { a: 'TITAN · TAKEOFF AGENT', t: 'Quantities checked against plan set rev C', c: 'var(--ao-system)' },
    { a: 'REVOPS · QUALIFICATION AGENT', t: 'Follow-up drafted for 3 stalled deals, approval requested', c: 'var(--ao-orbit)' },
    { a: 'PRIME · AUDIT AGENT', t: 'Permission change recorded to the log', c: 'var(--ao-system)' },
    { a: 'LEDGER · VARIANCE AGENT', t: 'Freight cost drift flagged on 2 open jobs', c: 'var(--ao-alert)' },
    { a: 'BROADCAST · CONTENT AGENT', t: 'Newsletter draft running in Shadow review', c: 'var(--ao-agent)' },
    { a: 'ENGINE · PROSPECT AGENT', t: 'Target account list refreshed from new permits', c: 'var(--ao-stellar)' },
  ];

export const LOG: any[] = [
    { t: '09:14:02', act: 'Bank reconciliation drafted', who: 'Ledger · Close agent', trust: 'Draft and approve', out: 'Approved · Controller', c: 'var(--ao-system)' },
    { t: '09:15:40', act: 'Quantities checked against plan set rev C', who: 'Titan · Takeoff agent', trust: 'Threshold', out: 'Inside limits', c: 'var(--ao-system)' },
    { t: '09:21:17', act: 'Acquisition target cleared every criterion', who: 'Signal · Screen agent', trust: 'Shadow', out: 'Observed · Owner reviewing', c: 'var(--ao-agent)' },
    { t: '09:26:55', act: 'Payment terms change outside limit', who: 'RevOps · Qualification agent', trust: 'Threshold', out: 'Escalated · Owner', c: 'var(--ao-orbit)', esc: true },
    { t: '09:30:08', act: 'Permission change recorded', who: 'Prime · Audit agent', trust: 'Threshold', out: 'Logged', c: 'var(--ao-system)' },
  ];

export const BLS: any[] = [
    { st: 'Strategize', n: 'Engine', cat: 'Go-to-market', c: 'var(--ao-orbit)', f: 'Echo 1 Labs Engine.dc.html', o: 'An execution-ready GTM workbook, fast. A defined audience to work.' },
    { st: 'Find', n: 'RevOps', cat: 'Sales', c: 'var(--ao-agent)', f: 'Echo 1 Labs RevOps.dc.html', o: 'The calendar fills without chasing.' },
    { st: 'Attract', n: 'Broadcast', cat: 'Marketing', c: 'var(--ao-stellar)', f: 'Echo 1 Labs Broadcast.dc.html', o: 'Cross-channel content without a content team. The brand shows up consistently.' },
    { st: 'Analyze', n: 'Signal', cat: 'M&A Lifecycle Management', c: 'var(--ao-system)', f: 'Echo 1 Labs Signal.dc.html', o: 'M&A deal sourcing. Acquisition targets found, screened and compared before you commit.' },
    { st: 'Manage', n: 'Ledger', cat: 'Finance and ops', c: 'var(--ao-orbit)', f: 'Echo 1 Labs Ledger.dc.html', o: 'Books read without manual cleanup. The operator reads a memo, not a raw ledger.' },
    { st: 'Deliver', n: 'Titan', cat: 'Construction Lifecycle Management', c: 'var(--ao-stellar)', f: 'Echo 1 Labs Titan.dc.html', o: 'Committed work delivered and tracked. Delivery without separate project tooling.' },
    { st: 'Govern', n: 'Prime', card: 'Prime · Agent Orbit', cat: 'Operational Lifecycle Management', c: 'var(--ao-agent)', f: 'Echo 1 Labs Prime.dc.html', o: 'Operational Lifecycle Management. The owner runs the whole business from the Agent Orbit command center.' },
    { st: 'Every stage', n: 'Front Office', cat: 'Voice agents', c: 'var(--ao-stellar)', f: 'Echo 1 Labs Voice Agents.dc.html', o: 'Calls answered and made without a front desk. No lead goes cold from missed follow-up.' },
  ];
