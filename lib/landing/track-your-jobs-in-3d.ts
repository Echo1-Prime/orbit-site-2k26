import type { UseCaseCopy } from './types';

/*
  Track your jobs in 3D: the construction use case. The demo is the live build-it show
  (https://build-it.echo1labs.com/, read 2026-10-13), embedded as it is (Josh, 2026-10-13).

  Verbatim from the show: intro and seoDesc (its meta and Open Graph descriptions), the three beats and the
  closing (its headline lines), `note` (its on-screen disclaimer), and each location's `title` (the trade
  labels in show/data/site-a.json).
  Josh, 2026-10-13: headline "Track your jobs in 3D".
  Lines written for this page: seoTitle, eyebrow, embedTitle, embedFallback, locationsHeadline, todayLabel,
  orbitLabel, signupLabel, bookLabel.
  DRAFT-FOR-JOSH (Josh chose "draft from the show", 2026-10-13): every location's what, today, orbit, risk and
  covered. The show has no per-trade copy. Each draft is grounded in the show's own lines: "Every trade and
  material tracked.", "Every product tracked with every follow-up written.", "Every ticket tracked.", "Every
  dollar accounted for.", its tips "Job site problems pop up here. Tap Solve it and pick who to call." and
  "Job status lives here. It opens itself for the weekly review: schedule, budget, and what is next.", and its
  sample change order and punch list. No figures, names, results or urgency.
*/
export const trackYourJobsIn3dCopy: UseCaseCopy = {
  slug: 'track-your-jobs-in-3d',
  seoTitle: 'Track your jobs in 3D with Agent Orbit',
  seoDesc: 'A building goes up one trade at a time, traced from real structural drawings. Fly through it.',

  eyebrow: 'Use case · Construction',
  headline: 'Track your jobs in 3D',
  intro: 'A building goes up one trade at a time, traced from real structural drawings.',
  beats: [
    'Every trade and material tracked.',
    'Every product tracked with every follow-up written.',
    'Every dollar accounted for.',
  ],

  embedUrl: 'https://build-it.echo1labs.com/',
  embedTitle: 'Track your jobs in 3D demo: a building going up one trade at a time',
  embedFallback: 'Open the demo in its own tab',
  note: "Heights are drawn 1.9× taller so the floors read clearly. Real schedule uses typical production rates from industry planning ranges, not this project's actual schedule. Events, change orders, punch items and budget figures are simulated.",

  locationsHeadline: 'Seven trades, today and with Agent Orbit',
  todayLabel: 'Today',
  orbitLabel: 'With Agent Orbit',
  locations: [
    {
      id: 'site',
      title: 'Ground prep',
      what: 'The pad is cleared and graded before anything is set on it.',
      today: 'Site progress is reported by phone and written up later.',
      orbit: 'Each day of site work is logged against the schedule.',
      risk: {
        title: 'Progress by phone',
        text: 'Progress on the pad is called in and written up later, so the schedule is updated from memory.',
      },
      covered: {
        title: 'Logged against the schedule',
        text: 'Each day of site work is logged against the schedule as it happens, and a person reviews the weekly status.',
      },
    },
    {
      id: 'concrete',
      title: 'Concrete',
      what: 'Footings and slabs are formed and poured.',
      today: 'Delivery tickets are filed by hand after the trucks leave.',
      orbit: 'Each delivery ticket is read once and matched to its pour.',
      risk: {
        title: 'Tickets filed later',
        text: 'Delivery tickets collect in the trucks and the trailer and are filed by hand after the pour.',
      },
      covered: {
        title: 'Matched to the pour',
        text: 'Each ticket is read when it arrives and matched to its pour. A person reviews the record.',
      },
    },
    {
      id: 'masonry',
      title: 'Block walls',
      what: 'Block walls go up course by course.',
      today: 'Material counts are tallied on site and called in.',
      orbit: 'Each delivery is checked against the takeoff as it arrives.',
      risk: {
        title: 'Counts called in',
        text: 'Deliveries are counted on site, called in, and entered against the order later.',
      },
      covered: {
        title: 'Checked against the takeoff',
        text: 'Each delivery is checked against the takeoff from the drawings, and a gap goes to a named person.',
      },
    },
    {
      id: 'steel',
      title: 'Steel frame',
      what: 'Columns and beams are set and bolted.',
      today: 'Changes from the field travel by text and phone.',
      orbit: 'Each change is drafted as a change order for review.',
      risk: {
        title: 'Changes by text',
        text: 'A change found in the field is sent by text, and the paperwork catches up later.',
      },
      covered: {
        title: 'A change order for each change',
        text: 'Each field change is drafted as a change order with the drawing it touches, and a person approves it.',
      },
    },
    {
      id: 'deck',
      title: 'Metal deck',
      what: 'Deck is laid on the steel, floor by floor.',
      today: 'A problem on site waits for the next walk.',
      orbit: 'A problem is raised as it is found, with who to call.',
      risk: {
        title: 'Waits for the walk',
        text: 'A problem found on the deck waits for the next site walk before the right person hears about it.',
      },
      covered: {
        title: 'Raised with who to call',
        text: 'A problem is raised as it is found and routed to the person who solves it. People decide the fix.',
      },
    },
    {
      id: 'wood',
      title: 'Wood framing',
      what: 'Walls and floors are framed in wood.',
      today: 'Follow-ups with suppliers are written when someone has time.',
      orbit: 'Every product is tracked, and every follow-up is drafted.',
      risk: {
        title: 'Follow-ups wait',
        text: 'Orders and follow-ups with suppliers are written when someone finds the time.',
      },
      covered: {
        title: 'Every follow-up written',
        text: 'Each product is tracked from order to delivery, and each follow-up is drafted for a person to send.',
      },
    },
    {
      id: 'sheathing',
      title: 'Sheathing',
      what: 'The frame is closed in with sheathing.',
      today: 'The punch list lives in a notebook.',
      orbit: 'Each punch item is logged with an owner as it is found.',
      risk: {
        title: 'Punch list in a notebook',
        text: 'Punch items are written in a notebook and typed up before closeout.',
      },
      covered: {
        title: 'One punch list',
        text: 'Each punch item is logged with an owner, and the weekly review shows schedule, budget and what is next.',
      },
    },
  ],

  closing: 'Supervised by you.',
  signupLabel: 'Sign up with Agent Orbit',
  signupUrl: 'https://build-it.echo1labs.com/track-your-jobs-in-3d-contact?src=track-your-jobs-in-3d',
  bookLabel: 'Book the onsite',
  bookUrl: 'https://www.echo1labs.com/contact',
};
