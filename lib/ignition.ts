/*
  Ignition (Harness 6 of 8): single source for every Ignition line on the site.

  Sources, both Josh's own decks (uploaded 2026-11-27):
  - IT: "Echo 1 Labs Ignition and Titan" teaser, 15 pages (counts as of Oct 29, 2026: demo board and Agent Orbit catalog).
  - PS: "Echo 1 Labs Product Stack", 17 pages (counts from Echo 1 Labs, Nov 2026, BETA).
  Lines are verbatim from those decks unless marked WRITTEN (site glue: labels, alt text, link text). Every screen is
  SAMPLE DATA, as the decks label it. No client names, no figures beyond the decks' own counts, no ROI claims.

  UNVERIFIED(conflict): the teaser lists the demo dispatch agent as 361-333-1113; /oilandgas and the /logistics-demo hero
  still use (361) 333-1176. This file follows the teaser. Josh confirms which line is live.
*/

export const IGNITION_DEMO_TEL = '+13613331113';
export const IGNITION_DEMO_TEL_DISPLAY = '(361) 333-1113';
export const IGNITION_ROUTE = '/oilfield-logistics-software';
export const IGNITION_USE_CASE_ROUTE = '/use-cases/oilfield-spill-response';

export const IGNITION_IMG = {
  board: {
    src: '/images/ignition/ignition-board-1600.webp',
    src960: '/images/ignition/ignition-board-960.webp',
    src640: '/images/ignition/ignition-board-640.webp',
    width: 1600,
    height: 900,
    // WRITTEN
    alt: 'Ignition board, sample data: a 3D tank battery with one settling tank past its high mark in orange, a tank card with level and fill rate, and buttons to delegate or call dispatch.',
  },
  tank: {
    src: '/images/ignition/ignition-tank-1402.webp',
    width: 1402,
    height: 758,
    // WRITTEN
    alt: 'Ignition board view, sample data: tank Z4 at 60 percent, past its high mark, with the next step drafted and a Call dispatch button.',
  },
  pumper: {
    src: '/images/ignition/phone-pumper-520.webp',
    width: 520,
    height: 1067,
    // WRITTEN
    alt: "Pumper's phone, sample data: the emergency line answers as an agent, logs the shut valve, assigns a vac truck after dispatch approves, adds photos to the incident and texts when the crew is on scene.",
  },
  onCall: {
    src: '/images/ignition/phone-oncall-520.webp',
    width: 520,
    height: 1067,
    // WRITTEN
    alt: "On-call supervisor's phone, sample data: a spill alert asking for an acknowledgement within 60 seconds, a second page, a dispatch draft to approve, and an incident fact file with a notice drafted for review, not filed.",
  },
} as const;

/* IT p1 and PS p10 */
export const IGNITION_HERO = {
  eyebrow: 'Run the operation · Ignition', // WRITTEN (PS lifecycle label + name)
  headline: 'Ignition runs the field.', // IT p1
  sub: 'The logistics operating system, from the first call to the invoice.', // PS p10
  body: 'Ignition is the oilfield logistics operating system. It runs on agents you supervise.', // IT p1 (Titan clause removed)
  tagline: 'Built by operators. Run by agents. Supervised by you.',
};

/* IT p3 */
export const IGNITION_STATS = [
  { value: '28', label: 'Ignition agents on the oilfield logistics board' },
  { value: '7', label: 'Live on the demo line' },
  { value: '200+', label: 'Agents offered to operators' },
];
export const IGNITION_STATS_NOTE = 'Counts as of Oct 29, 2026: demo board and Agent Orbit catalog. Images: Ignition board, sample data.';

/* PS p10 */
export const IGNITION_DOES = [
  'Job line and dispatch by voice, in English or Spanish',
  'Sensor and tank alerts that climb the call chain',
  'Tickets and invoices on one board, in 3D',
  'Compliance, settlement, pricing and incident response',
  'Pulls from the systems you already run, with authorization',
];
export const IGNITION_DECIDES = 'Agents draft; people approve. The call chain escalates to a named person.';
export const IGNITION_FOR = 'Dispatch, field operations and the owner';

/* IT p6 */
export const IGNITION_AGENT_GROUPS = [
  { n: 8, title: 'Job line and dispatch', line: 'Gryphon, front desk, dispatch, disposal, fresh water' },
  { n: 5, title: 'Compliance and risk', line: 'Broker compliance, carrier identity, contract audit' },
  { n: 3, title: 'Settlement and margin', line: 'Payment integrity, credit and cash gap, KPIs' },
  { n: 3, title: 'Systems and training', line: 'TMS and EDI, training and QA, orchestrator' },
  { n: 3, title: 'Sales and pricing', line: 'Lane pricing, carrier capacity, LTL rating' },
  { n: 3, title: 'Incident response', line: 'Environmental consultant, paralegal, claims' },
  { n: 3, title: 'Agent governance', line: 'Fleet scorecard, policy author, migration runbook' },
];
export const IGNITION_AGENT_NOTE = 'Live on the demo line: 7. The rest simulated in the demo.';

/* IT p5 */
export const IGNITION_COSTS = [
  { title: 'Tank alarm, no truck', text: 'The first person to know is the pumper who calls at 2 a.m., or the operator who finds the overflow.' },
  { title: 'Paper tickets', text: 'Missing photos and wrong volumes hold settlement for days.' },
  { title: 'One phone, one head', text: 'When the dispatcher is off, the yard slows down and nobody can see why.' },
  { title: 'Week-old numbers', text: 'Standby, lane-hours and disposal capacity get argued about instead of managed.' },
];
export const IGNITION_COSTS_CLOSE = 'Every one closes when call, ticket and invoice share one record.';

/* IT p8 */
export const IGNITION_SPILL = [
  { title: 'Call comes in', text: 'The emergency line answers by voice or text, says it is an agent and opens the incident.' },
  { title: 'Page and escalate', text: 'Pages the on-call person every 60 seconds, up to three times, then the next name.' },
  { title: 'Dispatcher approves', text: 'Nearest free vac truck ranked on the board. A person approves the assignment.' },
  { title: 'Contain and recover', text: 'Crew on scene; the 3D campus tracks barrels recovered against the estimate.' },
  { title: 'Fact file and notices', text: 'Fluid, levels and containment logged; notices drafted for review, never filed by an agent.' },
  { title: 'Settle and monitor to close', text: 'Tickets audited, settlement held until fixed, site watched until a person marks it reviewed.' },
];

/* IT p4: who it serves */
export const IGNITION_SEATS = [
  { seat: 'Superintendent', sees: 'Every lease and tank on one map and in 3D', gets: 'The call when a site goes critical', decides: 'Which truck rolls and where' },
  { seat: 'Supervisor', sees: 'The board, drivers on the clock, tickets missing photos', gets: 'Drafted loads and ticket fixes to approve', decides: 'Approve, edit or reject' },
  { seat: 'Dispatcher', sees: 'Loads, drivers and ETAs on one board', gets: 'Calls answered and routed by the voice agent', decides: 'Quality control, driver experience, response times' },
  { seat: 'Driver', sees: 'The job, the ETA and the next step in a text', gets: 'Approved assignments by text, a photo prompt for the ticket', decides: 'Reply, confirm or call dispatch' },
  { seat: 'Executive', sees: 'Cash flow, margin and KPIs from yard to company', gets: 'A memo, not a raw ledger', decides: 'Where capital and crews go next' },
];
export const IGNITION_ONE_DASHBOARD =
  'One operational dashboard for the whole organization: cash flow, construction lifecycle, dispatch and logistics, governance, risk and compliance. Backed by 200+ agent specialists in Agent Orbit.';

/* IT p14 and PS p15: governance, risk and compliance */
export const GRC_HEADLINE = 'Agents draft. People approve.'; // IT p14
export const GRC_SUB = 'Governance is built into the work, not added after it.'; // PS p15
export const GRC_COMMITMENTS = [
  { title: 'Starts at Shadow', text: 'Agents watch the board and the job and draft. They send nothing until you move them up.' },
  { title: 'People approve', text: 'Loads, tickets, prices, payments and outbound texts wait for a person.' },
  { title: 'Your log', text: 'Every call, text and change sits on a record the business owns.' },
  { title: 'Named escalation', text: 'Exceptions go to a named person on the call chain, by voice and text.' },
  { title: 'Checks stop the run', text: 'A failed check stops the send. No ticket, no invoice.' },
];
export const GRC_LADDER_NOTE = 'Each step up is your call. The voice agent never claims to be a person.'; // IT p14

/* Voice capability lines. Each is from the decks or the live site; source noted. */
export const VOICE_HEADLINE = 'Intake, compliance and dispatch, around the clock'; // WRITTEN (Josh's ask, 2026-11-27)
export const VOICE_LINES = [
  { title: 'Intake', text: 'The line answers by voice or text, says it is an agent and opens the record.' }, // IT p8, generalised from "incident"
  { title: 'Compliance', text: 'Every call, text and change sits on a record the business owns. Notices are drafted for review, never filed by an agent.' }, // IT p14, p8
  { title: 'Dispatch', text: 'Nearest free truck ranked on the board. A person approves the assignment.' }, // IT p8
  { title: 'Coverage 24/7', text: 'Pages the on-call person every 60 seconds, up to three times, then the next name.' }, // IT p8; "24/7" from the live /oilandgas job line
  { title: 'English or Spanish', text: 'Job line and dispatch by voice, in English or Spanish.' }, // PS p10
];
export const VOICE_PHONE_CAPTIONS = {
  pumper: 'Pumper: the line answers and opens the incident', // IT p7
  onCall: 'On-call: paged every 60 seconds, then the next name', // IT p7
};
export const SAMPLE_LABEL = 'Sample data · Agents draft, people approve'; // IT p7

/* IT p15 */
export const IGNITION_NEXT = {
  headline: 'Map one workflow, then run it at Shadow',
  text: 'Pick one: a tank alarm with no truck assigned. We map it trigger to logged outcome, then the agents run it at Shadow beside your dispatch.',
};
