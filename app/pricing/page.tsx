import type { Metadata } from "next";
import Link from "next/link";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One rate, every product, a team behind it. Founding seats open at $997/mo against a $2,997 regular rate. AI-enhanced business systems with management support.",
};

// NOTE: primary CTA routes to the application gate (/contact). The book-a-call
// scheduler URL is a pending input (see PRICING-CONTENT-DRAFT-2026-07-05.md §7).
const APPLY_HREF = "/contact";

const packs = [
  {
    name: "Surge",
    price: "$500",
    credits: "555,000",
    save: "10%",
    // Only Surge has a brief-stated coverage figure; do not fabricate others.
    coverage: "About 5,000 agent tasks on top of your plan",
  },
  {
    name: "Growth",
    price: "$1,000",
    credits: "1,176,471",
    save: "15%",
    coverage: "A sustained push across several products",
  },
  {
    name: "Scale",
    price: "$2,000",
    credits: "2,857,143",
    save: "30%",
    coverage: "Running the full lifecycle at volume",
  },
];

const faqs = [
  {
    q: "Is the $997 rate going to change?",
    a: "It's a founding rate for a limited number of seats. The regular rate is $2,997. When founding seats are gone, the founding rate is gone — your rate stays where you started.",
  },
  {
    q: "What actually gets done for that?",
    a: "The operating work you'd otherwise hire for or stay up doing yourself — across go-to-market, sales, marketing, finance, delivery, and governance. AI-enhanced systems do the volume; a person supervises what ships.",
  },
  {
    q: "Who checks the work?",
    a: "A human, before it goes out. That's the part that isn't optional here.",
  },
  {
    q: "Do unused credits carry over?",
    a: "Monthly credits reset each month. Prepay packs are different — those never expire.",
  },
  {
    q: "What if we need more in a given month?",
    a: "Add a pack. It stacks on your monthly allotment, and the more you buy the better the rate — 10% to 30% off.",
  },
  {
    q: "How do we start?",
    a: "You apply and book a call. We make sure it's a fit before anyone signs anything.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <p className="eyebrow">Pricing</p>
          <h1>One rate. Every product. A team behind it.</h1>
          <p className="lede">
            Echo 1 Labs runs the operating work of a founder-led company —
            go-to-market, sales, marketing, finance, delivery, governance — as
            AI-enhanced systems with real people supervising the output.
            Founding seats are open at $997 a month, against a regular rate of
            $2,997.
          </p>
          <div className={styles.heroCtas}>
            <Link href={APPLY_HREF} className="btn btn-primary">
              Apply for a founding seat
            </Link>
            <a href="#covers" className="btn btn-ghost">
              See what a month covers
            </a>
          </div>
        </div>
      </section>

      {/* Plan card */}
      <section className="section" id="covers">
        <div className="container">
          <div className={styles.planCard}>
            <div className={styles.planHead}>
              <span className={styles.badge}>Founding rate — limited seats</span>
              <p className={styles.planLabel}>Founding Plan</p>
              <p className={styles.price}>
                <span className={styles.priceNow}>$997</span>
                <span className={styles.priceUnit}>/ month</span>
                <span className={styles.anchor}>
                  <s>$2,997</s> regular
                </span>
              </p>
            </div>

            <p className={styles.covers}>
              About <strong>660 standard agent tasks</strong> — or up to{" "}
              <strong>5,000 simple ones</strong> — every month, across all seven
              products, with a human checking the work before it ships.
            </p>

            <ul className={styles.includes}>
              <li>
                Every product: Engine, RevOps, Broadcast, Signal, Ledger{" "}
                <em>(coming soon)</em>, Titan, Prime / Orbit
              </li>
              <li>Human supervision on the work that goes out the door</li>
              <li>150,000 Echo Credits a month — refreshes monthly</li>
            </ul>

            <Link
              href={APPLY_HREF}
              className={`btn btn-primary ${styles.planCta}`}
            >
              Apply for a founding seat
            </Link>
          </div>
        </div>
      </section>

      {/* How credits work */}
      <section className="section">
        <div className="container">
          <div className={styles.explainer}>
            <h2>How credits work</h2>
            <p className="lede">
              You don&apos;t buy tokens or count executions. You get a monthly
              allotment of Echo Credits, and each piece of work — a lead
              enriched, a brief drafted, a report built — draws down what it
              costs. Your founding plan includes 150,000 credits a month, which
              covers roughly 660 standard tasks or 5,000 simple ones. Credits
              reset each month. If you run a heavier stretch, you can top up with
              a pack below.
            </p>
            <p className={styles.finePrint}>
              $1 = 1,000 Echo Credits. Monthly credits refresh; they don&apos;t
              roll over. Packs are separate and don&apos;t expire.
            </p>
          </div>
        </div>
      </section>

      {/* Prepay packs */}
      <section className="section">
        <div className="container">
          <h2>Prepay packs</h2>
          <p className="lede">
            For teams that outrun the monthly allotment. Packs stack on top of
            your monthly credits and never expire.
          </p>
          <div className={styles.packs}>
            {packs.map((p) => (
              <div key={p.name} className={styles.pack}>
                <p className={styles.packName}>{p.name}</p>
                <p className={styles.packPrice}>{p.price}</p>
                <p className={styles.packCredits}>
                  {p.credits} credits
                  <span className={styles.packSave}>Save {p.save}</span>
                </p>
                <p className={styles.packCoverage}>{p.coverage}</p>
              </div>
            ))}
          </div>
          <p className={styles.finePrint}>
            Packs stack on your monthly allotment and never expire. Buy when you
            need the room; keep what you don&apos;t use.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <h2>Questions founders ask</h2>
          <dl className={styles.faq}>
            {faqs.map((f) => (
              <div key={f.q} className={styles.faqItem}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Closing CTA */}
      <section className={`section ${styles.closing}`}>
        <div className="container">
          <h2>Start with a conversation.</h2>
          <p className="lede">
            You apply, we make sure it&apos;s a fit, and you book a call. No
            contract before then.
          </p>
          <Link href={APPLY_HREF} className="btn btn-primary">
            Apply for a founding seat
          </Link>
        </div>
      </section>
    </>
  );
}
