import Link from "next/link";
import { OrbitFlame } from "@/components/OrbitFlame";
import styles from "./home.module.css";

// Home. Concierge-forward hero (dark card on Orbit White page — signature move),
// followed by SSR GTM sections. Crawlable content sits alongside the concierge.

const products = [
  { name: "Engine", cat: "Go-to-Market", stage: "Enable" },
  { name: "RevOps", cat: "Sales", stage: "Find" },
  { name: "Broadcast", cat: "Marketing", stage: "Attract" },
  { name: "Signal", cat: "Finance / Deal Flow", stage: "Analyze" },
  { name: "Ledger", cat: "Finance / Ops", stage: "Manage", soon: true },
  { name: "Titan", cat: "Bid + Fulfillment", stage: "Deliver" },
  { name: "Prime", cat: "Governance", stage: "Strategize" },
];

const steps = [
  {
    n: "01",
    h: "We map the lifecycle",
    p: "Where the work is, where it breaks, and which stage is pulling you under.",
  },
  {
    n: "02",
    h: "Systems do the volume",
    p: "AI-enhanced systems run the operating work across every stage of the business.",
  },
  {
    n: "03",
    h: "People supervise the output",
    p: "A human checks what ships. That oversight is the part that isn't optional.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — dark card on Orbit White page (signature move) */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroCard}>
            <OrbitFlame />
            <p className={`eyebrow ${styles.heroEyebrow}`}>Business Lifecycle Management</p>
            <h1 className={styles.heroTitle}>Break free from business gravity.</h1>
            <p className={styles.heroSub}>
              Built by Operators · Run by Agents · Supervised by Humans
            </p>
            <div className={styles.heroCtas}>
              <Link href="/contact" className="btn btn-primary">
                Apply for founding access
              </Link>
              <Link href="/pricing" className="btn btn-outline">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offer — on light page (rhythm: no card here) */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">What we do</p>
          <h2>We run the operating work, so you can run the company.</h2>
          <p className="lede">
            Not an agency, not a tool, not a hire. A process-engineered system
            that takes the recurring operating work off a founder&apos;s desk —
            with real people supervising the output.
          </p>
        </div>
      </section>

      {/* How it works — 3 dark cards */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2>Three steps, one operating rhythm.</h2>
          <div className={styles.steps}>
            {steps.map((s) => (
              <div key={s.n} className={styles.step}>
                <span className={styles.stepN}>{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 7 products — dark cards with status badges */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Seven products, one lifecycle</p>
          <h2>The whole business, covered end to end.</h2>
          <div className={styles.products}>
            {products.map((p) => (
              <div key={p.name} className={styles.product}>
                <div className={styles.productTop}>
                  <span className={styles.productName}>{p.name}</span>
                  {p.soon && <span className={styles.soon}>Coming soon</span>}
                </div>
                <span className={styles.productCat}>{p.cat}</span>
                <span className={styles.productStage}>{p.stage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing — dark card CTA */}
      <section className="section">
        <div className="container">
          <div className={styles.closing}>
            <h2>Built by operators, for operators.</h2>
            <p className="lede">
              Founding seats are open at $997 a month against a $2,997 regular
              rate.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/contact" className="btn btn-primary">
                Apply for founding access
              </Link>
              <Link href="/pricing" className="btn btn-outline">
                See what a month covers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
