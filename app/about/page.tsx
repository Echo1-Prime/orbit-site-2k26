import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';
import { LEGAL_ENTITY } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Echo 1 Labs is the Business Lifecycle Management company — a boutique built by operators for operators. Agent-based, human-supervised, a brand of Mingma Inc.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '5rem', alignItems: 'start' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.75rem' }}>About Echo 1 Labs</p>
              <h1 className="display-lg" style={{ marginBottom: '1.5rem' }}>Built by operators. For operators.</h1>
              <p className="body-lg" style={{ marginBottom: '1.25rem' }}>
                Most AI consulting firms are staffed by researchers. We are not. Echo 1 Labs was
                founded by recovering operators — a CEO, COO, and CFO who spent years inside
                founder-led companies watching the same five problems pull good teams under, and
                decided to process-engineer the way out.
              </p>
              <p className="body-md" style={{ marginBottom: '1.25rem' }}>
                We built Echo 1 Labs to solve the problem we lived: how do you take a company that
                has outgrown its systems and staff, and compress the next decade of growth into the
                next two years?
              </p>
              <p className="body-md">
                The answer is Business Lifecycle Management — a structured way to deploy agent-based
                systems, automations, and human supervision across every stage of a company&apos;s
                growth. Not a tool. Not a chatbot. A system that compounds — the thrust that gets you
                to escape velocity.
              </p>
            </div>
            <div className="stack" style={{ gap: '1.25rem' }}>
              <div className="card">
                <div className="card__title">{LEGAL_ENTITY}</div>
                <p className="card__desc">Echo 1 Labs is a brand of {LEGAL_ENTITY} — the legal entity behind the full suite of Business Lifecycle Management products and client engagements.</p>
              </div>
              <div className="card">
                <div className="card__title">Anthropic Claude partners</div>
                <p className="card__desc">We specialize in Anthropic Claude deployment — from individual productivity to multi-agent Bedrock orchestration. Every system we build is designed to get smarter over time.</p>
              </div>
              <div className="card">
                <div className="card__title">Consulting firm partners</div>
                <p className="card__desc">We work alongside marketing agencies, sales consultancies, branding firms, and financial advisors — giving their clients the AI infrastructure layer their firm cannot build alone.</p>
              </div>
              <div className="card">
                <div className="card__title">Startup &amp; SMB focus</div>
                <p className="card__desc">We are built for startups and SMBs that have outgrown their systems and staff. Past the experiment phase and need institutional AI — that is us.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Break free from business gravity."
        headline="Ready to build your lifecycle?"
        buttonLabel="Schedule a call"
        buttonHref="/contact"
        dark
      />
    </>
  );
}
