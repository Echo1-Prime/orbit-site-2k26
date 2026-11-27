import type { UseCaseCopy } from './types';
import { IGNITION_COSTS, IGNITION_IMG, IGNITION_SPILL, GRC_LADDER_NOTE } from '@/lib/ignition';

/*
  Ignition use case: a spill, from first call to cleanup. Josh's "Ignition and Titan" teaser (2026-11) is the
  source: steps are IT p8 verbatim (`orbit`), the "today" lines are IT p5 ("What one quiet night on the lease costs")
  verbatim, matched to the step they belong to. Every screen and figure is the decks' SAMPLE DATA.
  WRITTEN for this page (Josh reviews): seoTitle, seoDesc, eyebrow, intro, beats, embedTitle, embedFallback,
  locationsHeadline, todayLabel, orbitLabel, each step's `what` line, and the demo caption.
  The demo (13|7 Waterworks demo board, the Ignition board) sits behind sign-in, so the page shows a still that links to it.
*/
const [alarm, paper, onePhone] = IGNITION_COSTS;

export const oilfieldSpillCopy: UseCaseCopy = {
  slug: 'oilfield-spill-response',
  seoTitle: 'Oilfield Spill Response Use Case: Ignition',
  seoDesc:
    'A spill on the lease, from first call to cleanup: the emergency line, on-call paging, an approved vac truck, a fact file and settlement held until tickets are fixed. Sample data.',

  eyebrow: 'Case study · Ignition with 13|7 Waterworks · Governance, risk and compliance', // Josh, 2026-11-27
  headline: 'A spill, from first call to cleanup',
  intro: 'Fluid over the berm at 2 a.m. Here is the night on one board, with a person approving every truck and every notice.',
  beats: ['Agents draft.', 'People approve.', 'Every call, text and change on a record the business owns.'],

  embedUrl: 'https://137waterworks.demo.echo1labs.com/scorecard/yard/',
  embedTitle: 'Ignition board, sample data',
  embedFallback: 'Open the 13|7 Waterworks demo board (sign-in required)',
  demoImage: {
    src: IGNITION_IMG.board.src,
    srcSet: `${IGNITION_IMG.board.src640} 640w, ${IGNITION_IMG.board.src960} 960w, ${IGNITION_IMG.board.src} 1600w`,
    alt: IGNITION_IMG.board.alt,
    width: IGNITION_IMG.board.width,
    height: IGNITION_IMG.board.height,
    caption: '13|7 Waterworks demo board · Every tank and truck on one board · Sample data',
  },
  voiceProof: true,
  note: `Sample data, not your lease or your data. ${GRC_LADDER_NOTE}`,

  locationsHeadline: 'Six steps, today and with Ignition',
  todayLabel: 'Today',
  orbitLabel: 'With Ignition',
  locations: [
    { id: 'call', title: IGNITION_SPILL[0].title, what: 'The pumper reports fluid over the berm.', today: alarm.text, orbit: IGNITION_SPILL[0].text },
    { id: 'page', title: IGNITION_SPILL[1].title, what: 'The on-call supervisor has to know now.', today: onePhone.text, orbit: IGNITION_SPILL[1].text },
    { id: 'dispatch', title: IGNITION_SPILL[2].title, what: 'A vac truck has to roll.', today: 'Tank alarm, no truck.', orbit: IGNITION_SPILL[2].text },
    { id: 'contain', title: IGNITION_SPILL[3].title, what: 'The crew works the site.', today: 'Standby, lane-hours and disposal capacity get argued about instead of managed.', orbit: IGNITION_SPILL[3].text },
    { id: 'file', title: IGNITION_SPILL[4].title, what: 'The record and the notices.', today: paper.text, orbit: IGNITION_SPILL[4].text },
    { id: 'close', title: IGNITION_SPILL[5].title, what: 'Tickets, settlement and the site after.', today: paper.text, orbit: IGNITION_SPILL[5].text },
  ],

  closing: 'Supervised by you.',
  signupLabel: 'Map one workflow',
  signupUrl: 'https://www.echo1labs.com/contact?src=use-case-ignition',
  bookLabel: 'Explore Ignition',
  bookUrl: 'https://www.echo1labs.com/oilfield-logistics-software',
};
