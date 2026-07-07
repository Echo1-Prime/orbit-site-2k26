import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal",
  description: "Terms, privacy, and accessibility statement for Echo 1 Labs.",
};

// First-pass stub. Real legal copy (terms, privacy, cookie, accessibility) is a
// separate reviewed deliverable — do not treat this as binding language.
export default function LegalPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "72ch" }}>
        <p className="eyebrow">Legal</p>
        <h1>Legal</h1>
        <p className="lede">
          Echo 1 Labs is a trade name of Mingma Inc. Terms of service, privacy
          policy, cookie policy, and our accessibility statement will be
          published here.
        </p>
        <p style={{ color: "var(--text-muted)" }}>
          This page is a placeholder pending reviewed legal copy.
        </p>
      </div>
    </section>
  );
}
