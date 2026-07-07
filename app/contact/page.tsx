import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply for a founding seat. We make sure it's a fit before anyone signs anything.",
};

// The application gate. Three fields, no qualification gauntlet (IA map rule).
// PENDING: wire submission (Supabase form vs direct scheduler link) + book-a-call
// scheduler URL — see PRICING-CONTENT-DRAFT-2026-07-05.md §7. Form currently has
// no action wired; do not represent this as live intake until confirmed.
export default function ContactPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "60ch" }}>
        <p className="eyebrow">Apply</p>
        <h1>Start with a conversation.</h1>
        <p className="lede">
          Tell us where the work is breaking. We&apos;ll make sure it&apos;s a
          fit before anyone signs anything.
        </p>

        <form
          className="card"
          style={{ marginTop: "1.75rem", display: "grid", gap: "1.1rem" }}
          aria-label="Application"
        >
          <label style={{ display: "grid", gap: "0.4rem" }}>
            <span>Name</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              style={fieldStyle}
            />
          </label>
          <label style={{ display: "grid", gap: "0.4rem" }}>
            <span>Work email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              style={fieldStyle}
            />
          </label>
          <label style={{ display: "grid", gap: "0.4rem" }}>
            <span>What&apos;s pulling you under?</span>
            <textarea name="message" rows={4} style={fieldStyle} />
          </label>
          <button type="submit" className="btn btn-primary">
            Apply for a founding seat
          </button>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
            You&apos;ll pick a time to talk on the next step.
          </p>
        </form>
      </div>
    </section>
  );
}

const fieldStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: "1rem",
  padding: "0.75rem 0.9rem",
  background: "var(--bg)",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
};
