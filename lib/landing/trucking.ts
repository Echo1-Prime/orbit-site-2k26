import type { UseCaseCopy } from './types';

/*
  Trucking use case. Every line about the demo is verbatim from the live
  https://e1-logistics-trucking.echo1labs.com/trucking/locations.json and the
  live page's own links (read 2026-10-11). The `note` line is the demo page's
  own on-screen disclaimer (the tk-honest line, verbatim, Decision
  recoTk8vjIyFFnlbt option A, Josh 2026-10-11). Lines written for this page:
  seoTitle, seoDesc, eyebrow, embedTitle, embedFallback, locationsHeadline,
  todayLabel, orbitLabel. Never reword the verbatim lines; change the source.
*/
export const truckingCopy: UseCaseCopy = {
  slug: 'trucking',
  seoTitle: 'Trucking use case with Agent Orbit',
  seoDesc:
    'Walk a broker office and its carrier yard in x-ray, then see each location as it runs today and with Agent Orbit. Demo data, not a real company or site.',

  eyebrow: 'Use case · Trucking and logistics',
  headline: 'Trucking', // Josh, 2026-10-15: the industry only (was "Trucking, a good day")
  intro: 'A broker office and its carrier yard at night, drawn in x-ray. Pick a location to see its scene.',
  beats: [
    'Orange is where Agent Orbit works.',
    'Grey is the everyday yard.',
    'Pick a card to fly there.',
  ],

  embedUrl: 'https://e1-logistics-trucking.echo1labs.com/trucking/',
  embedTitle: 'Trucking use case demo: a broker office and carrier yard in x-ray',
  embedFallback: 'Open the demo in its own tab',
  note: 'Illustrative office and yard, not a real company or site. Motion is illustrative. Numbers are Demo data.',

  locationsHeadline: 'Seven locations, today and with Agent Orbit',
  todayLabel: 'Today',
  orbitLabel: 'With Agent Orbit',
  locations: [
    {
      id: 'gate',
      title: 'Gate and scale',
      what: 'A truck crosses the scale on its way in.',
      today: 'The guard writes the truck in; the ticket waits in a tray.',
      orbit: 'Read as it prints, the ticket marks the load in.',
      risk: {
        title: 'Hand-written gate log',
        text: 'The guard writes each truck in by hand and the scale ticket sits in a tray until someone walks it to the office. Until then nobody knows the load is on site. A misread number, or a ticket that never leaves the tray, means the load is billed late or not at all.',
      },
      covered: {
        title: 'Read as it prints',
        text: 'The ticket is read the moment it prints, and the load is marked in before the truck reaches the dock. The office sees it on the same screen as everyone else.',
      },
    },
    {
      id: 'dock',
      title: 'Dock',
      what: 'Trailers load and unload at the cross-dock doors.',
      today: 'A driver hands in the ticket; its fields get keyed in twice.',
      orbit: 'The ticket is read once; photo, seal and signature file themselves.',
      risk: {
        title: 'Same fields keyed twice',
        text: 'Someone types the ticket in, then retypes several fields for the invoice, and every retype is a chance for a wrong weight, date or load number. The photo, seal and signature arrive at different times, and one missing piece holds up the whole packet.',
      },
      covered: {
        title: 'Read once, filed once',
        text: 'The ticket is read once and matched to its load. Photo, seal and signature land in the trip packet as each arrives, and a person approves the match.',
      },
    },
    {
      id: 'office',
      title: 'Back office',
      what: 'Dispatch, accounting and records close each trip packet.',
      today: 'Paper and phone calls pass between desks to close a packet.',
      orbit: 'The packet fills as documents arrive; the office shares one screen.',
      risk: {
        title: 'Packets close by phone and paper',
        text: "Dispatch, accounting and records pass paper and calls between desks to close one packet. When the one person who knows where a document sits is out, the packet stalls, and so do the invoice and the driver's pay.",
      },
      covered: {
        title: 'One shared screen',
        text: 'The packet fills itself as documents arrive, and the whole office works from one screen. The supervisor approves it for invoicing.',
      },
    },
    {
      id: 'shop',
      title: 'Shop and fuel',
      what: 'The shop plans a bay and orders a part.',
      today: 'A parts request goes on a form, then a call to dispatch.',
      orbit: 'The request rides a load already headed that way.',
      risk: {
        title: 'Parts requests on paper',
        text: 'The shop fills in a form, then calls dispatch to find a truck headed the right way. Miss the call and the part waits, the bay sits empty, and a rig in the field stays down.',
      },
      covered: {
        title: 'Rides a load already moving',
        text: 'The request rides a load already moving that way, and the shop sees the arrival time. The mechanic plans the bay around it, and a person confirms the plan.',
      },
    },
    {
      id: 'vault',
      title: 'Vault',
      what: 'Every document has one home beside the office.',
      today: 'Folders sit in cabinets and drives; a search means asking around.',
      orbit: 'One copy is the copy; sensitive fields stay covered; looks are logged.',
      risk: {
        title: 'Copies everywhere, no single record',
        text: 'Folders sit in cabinets and copies on shared drives and laptops. Nobody can say who opened a file last, and sensitive driver records sit wherever someone saved them. When an auditor or customer asks for proof, the hunt starts from scratch.',
      },
      covered: {
        title: 'One copy is the copy',
        text: 'Every document is filed under one set of rules: one copy is the copy, sensitive fields stay covered, and every look is logged. A person sets the rules and reviews the log.',
      },
    },
    {
      id: 'rig',
      title: 'Rig site',
      what: 'A rig in the field gets the part it needs.',
      today: 'The site calls the office; the office calls carriers for updates.',
      orbit: 'The route draws itself and arrival updates ride along.',
      risk: {
        title: 'Updates only by phone',
        text: 'The site calls the office, and the office calls carriers until one can take the part. The crew waits without knowing when it lands, and a carrier nobody checked can show up, or not show at all.',
      },
      covered: {
        title: 'Updates ride along',
        text: 'The route draws itself, the carrier is checked before pickup, and arrival updates ride along to the site. A person watches the plan and steps in when it changes.',
      },
    },
    {
      id: 'home',
      title: "Driver's home",
      what: 'A driver ends the day at home on schedule.',
      today: 'The briefing is a morning phone call; the checklist is paper.',
      orbit: 'The briefing arrives early; checklist items close as the driver works.',
      risk: {
        title: 'Paper checklist, phone briefing',
        text: "The briefing is a morning call, and the inspection checklist is paper on the dash. A skipped item or a blown hours limit stays hidden until a roadside inspection or an audit finds it, and the driver's day runs long.",
      },
      covered: {
        title: "Items close as they're done",
        text: 'The briefing arrives before the shift, checklist items close as the driver does them, and hours are checked against the schedule. A person signs off the day.',
      },
    },
  ],

  closing: 'Supervised by you.',
  signupLabel: 'Sign up with Agent Orbit',
  signupUrl: 'https://build-it.echo1labs.com/trucking-contact?src=trucking',
  bookLabel: 'Book the onsite',
  bookUrl: 'https://www.echo1labs.com/contact?src=use-case-trucking',
};
