import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import SiteChrome from '@/components/Site/SiteChrome';
import { SubpageFooter } from '@/components/Subpages/SubpageSections';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import s from './oilandgas.module.css';

/* /oilandgas: Echo 1 Labs for oil and gas operators (Josh, 2026-10-24). Built from the approved design
   ("Oil and Gas Landing Page" canvas). Scope rules: oil treatment is in; skim oil and oil recovery are out
   (not an Echo 1 Labs service). No client names, no figures, no ROI claims. */
export const dynamic = 'force-static';

const PATH = '/oilandgas';
const TITLE = 'Oil and Gas Operations Software';
const DESC =
  'Produced water, hauling, disposal and oil treatment on one system. Tank levels, risk-scored dispatch, digital tickets and a 24/7 job line, from wellhead to invoice.';
const OG = { url: '/videos/oilandgas/og-oilandgas.jpg', width: 1200, height: 630, alt: 'A holographic offshore oil platform. Echo 1 Labs for oil and gas: every barrel accounted for, from wellhead to disposal.' };
const DEMO_TEL = '+13613331176';
const DEMO_TEL_DISPLAY = '(361) 333-1176';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESC,
    url: new URL(PATH, SITE_URL).toString(),
    siteName: SITE_NAME,
    type: 'website',
    images: [OG],
  },
  twitter: { card: 'summary_large_image', title: `${TITLE} | ${SITE_NAME}`, description: DESC, images: [{ url: OG.url, alt: OG.alt }] },
};

const SIGNALS = [
  { label: 'Tank levels · Live', hot: false },
  { label: 'Dispatch · Risk scored', hot: true },
  { label: 'Tickets · Digital', hot: false },
  { label: 'Job line · EN / ES · 24/7', hot: false },
];

const STAGES = [
  { n: '01', k: 'Wellhead', h: 'Tank monitoring', p: 'SCADA tank levels read into one board. Sites trending toward overflow are flagged before a truck is late.' },
  { n: '02', k: 'Haul', h: 'Risk-based dispatch', p: 'Scheduled and will-call loads ranked by site risk and driver hours. Geofenced yards confirm arrival and departure.' },
  { n: '03', k: 'Disposal', h: 'Saltwater disposal intake', p: 'Digital tickets by load type. Offline disposals reroute trucks and notify operators in the same minute.' },
  { n: '04', k: 'Treatment', h: 'Oil treatment', p: 'Oil treatment loads scheduled and ticketed on the same record as the water, traced to the lease they came from.', hot: true },
  { n: '05', k: 'Settlement', h: 'Billing and collections', p: 'Per-barrel and hourly rates applied from the ticket. Invoices, purchase orders and follow-up run on their own.' },
];

const LOADS = [
  ['Drilling wastewater', 'DW'],
  ['Completion fluids', 'CW'],
  ['Flowback', 'FB'],
  ['Produced water', 'PW'],
  ['Workover and kill fluids', 'WO'],
  ['Tank bottoms', 'TB'],
];

const BOARD = ['Water received', 'Oil treatment loads', 'Truck interval', 'Sites at overflow risk', 'Disposals offline'];

const ROLES = [
  { r: 'Owner', p: 'Every yard, disposal and crew in one view, with drill-down by site and operator.' },
  { r: 'Dispatcher', p: 'Ranked load board with red, white and green site status and one-click assignment.' },
  { r: 'Driver', p: 'Next stop, ticket and photo capture on the phone already in the cab.' },
  { r: 'Operator client', p: 'Their own sites only, live disposal status, and a direct message line to your office.' },
];

const JOBLINE = [
  { k: 'Front desk', p: 'Routes the caller by need, language and account', hot: false },
  { k: 'Dispatch', p: 'Books scheduled and will-call loads by load type', hot: false },
  { k: 'Disposal', p: 'Confirms intake hours, capacity and offline status', hot: false },
  { k: 'Treatment', p: 'Takes oil treatment requests', hot: false },
  { k: 'Emergency', p: 'Spills and overflows page on-call until acknowledged', hot: true },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${TITLE} | ${SITE_NAME}`,
  description: DESC,
  url: new URL(PATH, SITE_URL).toString(),
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function OilAndGasPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteChrome />
      <main id="main" className={s.page}>
        <section className={s.hero} aria-labelledby="og-hero">
          <div className={`${s.wrap} ${s.split}`}>
            <div className={s.stack}>
              <p className={s.kicker}>Oil and gas · Business Lifecycle Management</p>
              <h1 id="og-hero" className={s.h1}>Every barrel accounted for, from wellhead to disposal.</h1>
              <p className={s.lede}>
                Produced water, hauling, disposal and oil treatment run on one operating system. Tank levels, dispatch, tickets and
                disposal status sit in a single view your team and your operators can trust.
              </p>
              <div className={s.ctas}>
                <a className={s.btnPrimary} href="/contact?src=oilandgas&amp;cta=hero">Book a walkthrough →</a>
                <a className={s.btnGhost} href="/logistics-demo">See the live demo</a>
              </div>
            </div>
            <div className={s.media}>
              {/* The poster is the still for reduced motion, slow loads and link previews. */}
              <video className={s.vid} src="/videos/oilandgas/hero-oil-platform.mp4" poster="/videos/oilandgas/oil-platform-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
            </div>
          </div>
          <div className={s.wrap}>
            <ul className={s.signals} aria-label="What runs live">
              {SIGNALS.map((x) => (
                <li key={x.label}>
                  <span className={x.hot ? s.dotHot : s.dot} aria-hidden="true" />
                  <span className={s.mono}>{x.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="lifecycle" className={s.band} aria-labelledby="og-life">
          <div className={s.wrap}>
            <div className={s.head}>
              <p className={s.kicker}>The barrel&apos;s path</p>
              <h2 id="og-life" className={s.h2}>One record follows the fluid through five hands.</h2>
              <p className={s.body}>
                Most operations run each step on a different spreadsheet, radio channel and paper ticket. Echo 1 Labs ties them into
                one lifecycle, so nothing is lost between the tank and the invoice.
              </p>
            </div>
            <ol className={s.stages}>
              {STAGES.map((x) => (
                <li key={x.n} className={x.hot ? s.stageHot : s.stage}>
                  <span className={x.hot ? s.monoHot : s.monoInfo}>
                    {x.n} · {x.k}
                  </span>
                  <h3 className={s.h3}>{x.h}</h3>
                  <p className={s.small}>{x.p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="well" className={`${s.band} ${s.deep}`} aria-labelledby="og-well">
          <div className={`${s.wrap} ${s.split}`}>
            <div className={s.media}>
              <video className={s.vid} src="/videos/home/hero-drill-frack.mp4" poster="/videos/oilandgas/drill-frack-poster.jpg" autoPlay muted loop playsInline preload="none" aria-hidden="true" />
            </div>
            <div className={s.stack}>
              <p className={s.kicker}>Surface to 12,000 ft</p>
              <h2 id="og-well" className={s.h2}>Every stage of the well makes fluid. Every fluid needs a plan.</h2>
              <p className={s.body}>
                Drilling, completion and flowback each send water and solids to the surface on their own schedule. The plan for
                hauling, disposal and treatment should be in place before the first frac stage fires.
              </p>
              <ul className={s.grid} aria-label="Load types">
                {LOADS.map(([name, code]) => (
                  <li key={code} className={s.cellRow}>
                    <span>{name}</span>
                    <span className={s.monoInfo}>{code}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={s.band} aria-labelledby="og-board">
          <div className={s.wrap}>
            <div className={s.head}>
              <p className={s.kicker}>Operations board</p>
              <h2 id="og-board" className={s.h2}>The numbers your morning call asks for, already on screen.</h2>
            </div>
            <ul className={s.metrics} aria-label="Tracked on the board">
              {BOARD.map((m) => (
                <li key={m}>
                  <span className={s.monoMuted}>Tracked live</span>
                  <span className={s.metric}>{m}</span>
                </li>
              ))}
            </ul>
            <div className={s.roles}>
              {ROLES.map((x) => (
                <p key={x.r} className={s.small}>
                  <span className={s.roleK}>Role · {x.r}</span>
                  {x.p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="jobline" className={s.band} aria-labelledby="og-job">
          <div className={`${s.wrap} ${s.split}`}>
            <div className={s.stack}>
              <p className={s.kicker}>Job line</p>
              <h2 id="og-job" className={s.h2}>A phone line that answers at 2am, in English or Spanish.</h2>
              <p className={s.body}>
                Voice and chat agents take load requests, check disposal availability, open tickets and hand the caller to a person
                when it matters. Emergencies page your on-call lead by text and voice until someone acknowledges.
              </p>
              <div className={s.ctas}>
                <a className={s.btnGhost} href={`tel:${DEMO_TEL}`}>
                  Call the dispatch agent · {DEMO_TEL_DISPLAY}
                </a>
              </div>
            </div>
            <ol className={s.list}>
              {JOBLINE.map((x) => (
                <li key={x.k}>
                  <span className={x.hot ? s.monoHot : s.monoInfo}>{x.k}</span>
                  <span>{x.p}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="walkthrough" className={s.cta} aria-labelledby="og-cta">
          <div className={`${s.wrap} ${s.center}`}>
            <p className={s.kicker}>Start with one yard</p>
            <h2 id="og-cta" className={s.h2Big}>See your own tanks, trucks and disposals on one board.</h2>
            <p className={s.body}>A 30 minute walkthrough of the live system, set against how your operation runs today.</p>
            <div className={s.ctas}>
              <a className={s.btnPrimary} href="/contact?src=oilandgas&amp;cta=closing">Book a walkthrough →</a>
              <a className={s.btnGhost} href="/logistics-demo">See the live demo</a>
            </div>
          </div>
        </section>
        <SubpageFooter />
      </main>
    </>
  );
}
