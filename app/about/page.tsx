import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Echo 1 Labs was built by a recovering operator — a CEO, COO, and CFO who process-engineered the way out of the vortex.",
};

// First-pass stub. Full About/Principles content comes from the vault
// (Orbit/Context/operator.md, strategy.md) via the CMO content pass.
export default function AboutPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "72ch" }}>
        <p className="eyebrow">About</p>
        <h1>Built by a recovering operator.</h1>
        <p className="lede">
          Echo 1 Labs started with a CEO, a COO, and a CFO who got tired of
          watching the people who run startups and SMBs get pulled under by the
          same handful of problems — and decided to process-engineer the way
          out.
        </p>
        <p>
          We created a category to describe the work: Business Lifecycle
          Management. It&apos;s the thrust that gets a company to escape
          velocity — out of the vortex and into orbit.
        </p>
        <p style={{ color: "var(--color-text-muted)" }}>
          Full principles and origin content is in progress.
        </p>
      </div>
    </section>
  );
}
