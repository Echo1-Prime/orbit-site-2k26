import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import LeadConversion from '@/components/Analytics/LeadConversion';
import { Eyebrow, ButtonLink } from '@/components/ds';
import { CONTACT_EMAIL } from '@/lib/site';

export const dynamic = 'force-static';

// Confirmation page: not indexed, reached after a booking.
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'You are booked',
    description: 'Your Echo 1 Labs strategy session is confirmed. Here is what to expect and how to prepare.',
    path: '/thank-you',
  }),
  robots: { index: false, follow: true },
};

// UTM decoration for outbound clicks from this page. Plain first-party query
// params (no third-party pixels or scripts): Google Analytics, Meta, and our
// own analytics all read these, so click-through from the confirmation page is
// attributable without any tracker that would need a consent banner.
const UTM = '?utm_source=thank-you&utm_medium=confirmation&utm_campaign=strategy-session';
const t = (path: string) => `${path}${UTM}`;

const EXPECT = [
  { label: 'A readiness read on your business', desc: 'We look at where your operations actually sit today, not a generic maturity model, and name the one or two areas where an agent-based system would change the most.' },
  { label: 'The gap, in plain terms', desc: 'What is working, what is missing, and why the gap matters. No slides, no pitch. Just a clear picture you can act on.' },
  { label: 'A 90-day plan you own', desc: 'A short, prioritized set of moves you can hand to your team. If a deeper engagement fits, we will say so plainly. If it does not, you still leave with a plan.' },
];

const PREP = [
  'Note your top three operational bottlenecks: what takes the most time, costs the most, or slows your team down most.',
  'Pick the one metric you are optimizing for right now: revenue, margin, efficiency, whatever you measure most.',
  'Jot down the three or four systems your team lives in day to day. It helps us spot where the layers would connect.',
];

const READING = [
  { slug: 'ai-readiness-7-questions', title: 'AI Readiness: The 7 Questions Before You Automate Anything' },
  { slug: 'how-to-run-ai-readiness-audit', title: 'How to Run an AI Readiness Audit on Your Own Business' },
  { slug: 'why-smbs-fail-at-ai-implementation', title: 'The $100K Mistake: Why SMBs Fail at AI Implementation' },
];

export default function ThankYouPage() {
  return (
    <>
      {/* Booking conversion signal (consent-gated via Consent Mode). */}
      <LeadConversion />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Thank You', path: '/thank-you' },
        ])}
      />

      {/* Confirmation hero */}
      <section className="section band--dark">
        <div className="container center" style={{ maxWidth: '720px' }}>
          <Eyebrow>Strategy Session</Eyebrow>
          <h1 className="display-lg" style={{ margin: '0.75rem 0 1.25rem' }}>
            You are all set. Your session is booked.
          </h1>
          <p className="body-lg" style={{ marginBottom: '2rem' }}>
            Your calendar invite is on the way with the exact date and time. This is a working
            conversation about your business, not a pitch. Come with your numbers and your biggest
            bottleneck, and you will leave with a plan you can use.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <ButtonLink href={t('/products')} variant="ember">Explore the OS</ButtonLink>
            <ButtonLink href={t('/blog')} variant="ghost">Read the blog</ButtonLink>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="section">
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-header">
            <p className="label">What to expect</p>
            <h2 className="display-md">Twenty focused minutes.</h2>
          </div>
          <div className="stack" style={{ gap: '1rem' }}>
            {EXPECT.map((e) => (
              <div key={e.label} className="card" style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ fontFamily: 'var(--e1-font-display)', fontWeight: 600, color: 'var(--e1-white)', marginBottom: '0.4rem' }}>{e.label}</p>
                <p style={{ fontSize: '0.92rem', color: 'var(--e1-slate)', lineHeight: 1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prep */}
      <section className="section band--muted">
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-header">
            <p className="label">Before we talk</p>
            <h2 className="display-md">Three things that make the call sharper.</h2>
          </div>
          <ol className="stack" style={{ gap: '0.75rem', paddingLeft: '1.1rem' }}>
            {PREP.map((p) => (
              <li key={p} className="body-md" style={{ lineHeight: 1.6 }}>{p}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* While you wait */}
      <section className="section">
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-header">
            <p className="label">While you wait</p>
            <h2 className="display-md">Three short reads to prime your thinking.</h2>
          </div>
          <div className="stack" style={{ gap: '0.75rem' }}>
            {READING.map((r) => (
              <Link
                key={r.slug}
                href={t(`/blog/${r.slug}`)}
                className="card"
                style={{ display: 'block', padding: '1rem 1.25rem', fontFamily: 'var(--e1-font-display)', fontWeight: 600, color: 'var(--e1-white)' }}
              >
                {r.title} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          <p className="body-md muted" style={{ marginTop: '1.5rem' }}>
            Questions before the call? Reach us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
