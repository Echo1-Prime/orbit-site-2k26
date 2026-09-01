import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { Eyebrow, ButtonLink, Badge } from '@/components/ds';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Founding Cohort',
  description:
    'The first group of businesses onboarded to the BLM OS. Founding-cohort pricing, priority layer access, and direct input into the product. Application-based.',
  path: '/founding-cohort',
});

const INCLUSIONS = [
  { label: 'Founding rate', desc: 'Held for the length of your subscription: no increases as the product scales while you are a member.' },
  { label: 'Priority layer access', desc: 'First access to Ledger and future layers when they ship, before general availability.' },
  { label: 'Direct product input', desc: 'Monthly sessions with the team. Your operations shape what gets built next.' },
  { label: 'Dedicated onboarding', desc: 'Hands-on setup of the Fusion Grid, agent configuration, and Prime governance.' },
  { label: 'Month-to-month', desc: 'No annual commitment. Your founding rate holds for as long as you stay a member.' },
];

export default function FoundingCohortPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Founding Cohort', path: '/founding-cohort' },
        ])}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '5rem',
              alignItems: 'start',
            }}
          >
            <div>
              <Eyebrow>Founding Cohort</Eyebrow>
              <h1 className="display-lg" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
                Lock your rate. Shape the product.
              </h1>
              <p className="body-lg" style={{ marginBottom: '1.25rem' }}>
                A small group of owner-led businesses. A founding rate held for the length of your subscription. Direct input into
                what gets built next. Cohort seats are limited and will not reopen at these rates.
              </p>
              <p className="body-md" style={{ marginBottom: '2rem' }}>
                Cohort membership is application-based. We review every application individually and
                prioritize businesses where the BLM OS fits the current stage of operations.
              </p>
              <ButtonLink href="mailto:hello@echo1labs.com" variant="ember">
                Apply for Founding Cohort
              </ButtonLink>
            </div>

            <div className="stack" style={{ gap: '0.75rem' }}>
              {INCLUSIONS.map((item) => (
                <div
                  key={item.label}
                  className="card"
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--e1-ember)',
                      marginTop: '0.35rem',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--e1-font-display)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--e1-white)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--e1-text-secondary)', lineHeight: 1.65, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section
        className="section"
        style={{ background: 'var(--e1-panel)', borderTop: '1px solid var(--e1-border-subtle)' }}
      >
        <div className="container">
          <div style={{ maxWidth: '680px' }}>
            <Eyebrow>Who it is for</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
              Owner-led businesses at the right stage.
            </h2>
            <p className="body-md" style={{ marginBottom: '1rem' }}>
              The BLM OS is built for businesses between $5M and $100M in revenue with 50 to 200
              employees where the owner retains active operational authority. Businesses that are
              large enough to have real operational surface area, but structured in a way that makes
              adding headcount the wrong answer.
            </p>
            <p className="body-md" style={{ marginBottom: '2rem' }}>
              Founding Cohort members are businesses where the fit is clear: multiple operational
              layers that would benefit from the BLM OS architecture, a leadership team ready to
              shift from execution to supervision, and operations that are currently running on the
              operator&apos;s attention rather than on systems.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['$5M–$100M revenue', '50–200 employees', 'Owner-led', 'Multi-layer operations'].map(
                (tag) => (
                  <Badge key={tag} tone="muted">
                    {tag}
                  </Badge>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <Eyebrow>Apply</Eyebrow>
            <h2 className="display-sm" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
              Tell us about your business.
            </h2>
            <p className="body-md" style={{ marginBottom: '1.25rem' }}>
              Email{' '}
              <a
                href="mailto:hello@echo1labs.com"
                style={{ color: 'var(--e1-ember)', textDecoration: 'none' }}
              >
                hello@echo1labs.com
              </a>{' '}
              with three things: your revenue range, team size, and where operations feel hardest.
              That is all we need to start.
            </p>
            <p className="body-md" style={{ marginBottom: '2rem', color: 'var(--e1-text-secondary)' }}>
              What to expect: We review your application → Schedule a 30-minute call → You get a
              go/no-go within the week.
            </p>
            <ButtonLink href="mailto:hello@echo1labs.com" variant="ember">
              hello@echo1labs.com
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
