import type { UseCaseCopy } from './types';

/*
  Oil and Gas use case. Every line about the demo is verbatim from the live
  https://e1-booth-oil-and-gas.vercel.app/oil-and-gas/locations.json and the
  live page's own links (read 2026-10-12). The `note` line is the demo page's
  own on-screen disclaimer (the tk-honest line, verbatim), the same choice as
  the Trucking deck (Decision recoTk8vjIyFFnlbt option A, Josh 2026-10-11).
  Lines written for this page: seoTitle, seoDesc, eyebrow, embedTitle,
  embedFallback, locationsHeadline, todayLabel, orbitLabel. Never reword the
  verbatim lines; change the source.
*/
export const oilAndGasCopy: UseCaseCopy = {
  slug: 'oil-and-gas',
  seoTitle: 'Oil and Gas use case with Agent Orbit',
  seoDesc:
    'Walk a tank battery, its lease pad and a field office in x-ray, then see each location as it runs today and with Agent Orbit. Demo data, not a real company or place.',

  eyebrow: 'Use case · Oil and gas',
  headline: 'Oil and Gas, a good day',
  intro: 'A tank battery, its lease pad and a field office at night, drawn in x-ray. Pick a location to see its scene.',
  beats: [
    'Orange is where Agent Orbit works.',
    'Grey is the everyday site.',
    'Pick a card to fly there.',
  ],

  embedUrl: 'https://e1-booth-oil-and-gas.vercel.app/oil-and-gas/',
  embedTitle: 'Oil and Gas use case demo: a tank battery, lease pad and field office in x-ray',
  embedFallback: 'Open the demo in its own tab',
  note: 'Illustrative site, not a real company or place. Motion is illustrative. Numbers are Demo data.',

  locationsHeadline: 'Six locations, today and with Agent Orbit',
  todayLabel: 'Today',
  orbitLabel: 'With Agent Orbit',
  locations: [
    {
      id: 'lease',
      title: 'Lease pad',
      what: 'A producing site on its own fenced pad, where the daily walk starts.',
      today: 'The walk is written on paper and carried to the office.',
      orbit: 'Each reading is logged against its tank as it is entered.',
      risk: {
        title: 'Paper on a clipboard',
        text: 'The walk is written on paper and carried to the office, where someone types the readings in later.',
      },
      covered: {
        title: 'Entered once',
        text: 'Each reading is entered once and logged against its tank. The walk record fills as the walk goes, and a person reviews it.',
      },
    },
    {
      id: 'bay',
      title: 'Receiving bay',
      what: 'A truck backs up, hooks a hose and unloads.',
      today: 'The driver hands over a run ticket that is keyed in later.',
      orbit: 'The run ticket is read once and matched to its load.',
      risk: {
        title: 'Ticket keyed in later',
        text: 'The driver hands over a run ticket, and its fields are keyed in at the office after the truck has gone.',
      },
      covered: {
        title: 'Read once, matched once',
        text: 'The ticket is read when it is handed over and matched to its load. The first record of the load starts at the bay.',
      },
    },
    {
      id: 'battery',
      title: 'Tank battery',
      what: 'Receiving and treating tanks fill in batches.',
      today: 'Gauge readings and sample notes sit on separate sheets.',
      orbit: 'Each tank keeps its own gauge and sample record.',
      risk: {
        title: 'Readings on separate sheets',
        text: 'Each gauge reading and sample note is written on its own sheet, and someone matches them to a tank afterward.',
      },
      covered: {
        title: 'One record per tank',
        text: 'Each gauge reading and sample record is logged against its own tank as it is entered. A person reviews the records.',
      },
    },
    {
      id: 'skid',
      title: 'Treating skid',
      what: 'Heat and separation happen on a skid set back from the tanks.',
      today: 'The start and end of each batch are noted by hand.',
      orbit: 'Each batch gets a start record and an end record.',
      risk: {
        title: 'Start and end by hand',
        text: 'The start and the end of each batch are noted by hand, often on different pages.',
      },
      covered: {
        title: 'A start and an end',
        text: 'Each batch opens with a start record and closes with an end record, both built for a person to review.',
      },
    },
    {
      id: 'custody',
      title: 'Sales point',
      what: 'Treated product leaves by truck, and a hand-off ticket closes the batch.',
      today: 'The hand-off ticket is assembled from several notes.',
      orbit: 'The hand-off ticket is assembled and held for review.',
      risk: {
        title: 'Ticket from several notes',
        text: 'The hand-off ticket is put together from several notes after the truck has loaded.',
      },
      covered: {
        title: 'Ticket built from the batch',
        text: 'The hand-off ticket is built from the batch records, and a person reviews it before it goes anywhere.',
      },
    },
    {
      id: 'office',
      title: 'Field office',
      what: 'Where the daily record is assembled and reviewed.',
      today: 'Paper from the pad, the bay and the skid lands on one desk.',
      orbit: "The daily record fills as the day's papers arrive.",
      risk: {
        title: 'Paper on one desk',
        text: 'Paper from the pad, the bay and the skid arrives at different times and is typed in by hand.',
      },
      covered: {
        title: 'One daily record',
        text: 'The daily record fills as papers arrive. A question goes to a named role, and a supervisor reviews it.',
      },
    },
  ],

  closing: 'Supervised by you.',
  signupLabel: 'Sign up with Agent Orbit',
  signupUrl: 'https://build-it.echo1labs.com/oil-and-gas-contact?src=oil-and-gas',
  bookLabel: 'Book the onsite',
  bookUrl: 'https://www.echo1labs.com/contact',
};
