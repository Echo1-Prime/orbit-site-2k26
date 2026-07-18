import Hero from '@/components/Hero/Hero';
import LifecycleGrid from '@/components/LifecycleGrid/LifecycleGrid';
import CTA from '@/components/CTA/CTA';
import InViewStagger from '@/components/Reveal/InViewStagger';
import { Eyebrow, Card, Badge } from '@/components/ds';

export const dynamic = 'force-static';

const APPROACH = [
  {
    tag: 'Institutional AI',
    title: 'Personal AI to Institutional AI',
    body:
      "We build your organization's second brain — connecting individual AI productivity to enterprise-grade governance, security, and scalable agentic infrastructure.",
  },
  {
    tag: 'Process engineering',
    title: 'Process engineering first',
    body:
      'Automations, agentic workflows, and lifecycle management are not features — they are the operating model. We engineer your business to run like software.',
  },
  {
    tag: 'Human-supervised',
    title: 'Agent-based, human-supervised',
    body:
      'Every system is agent-based and supervised by people. Prime gives you a production-ready platform; custom workflows are built for your exact stack.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 8-stage lifecycle */}
      <section className="section--sm">
        <div className="container">
          <div className="section-header">
            <Eyebrow>The 8-Stage Lifecycle</Eyebrow>
            <h2 className="display-md" style={{ marginTop: '0.75rem' }}>Every stage. One system.</h2>
          </div>
          <LifecycleGrid />
        </div>
      </section>

      {/* Approach */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="display-md" style={{ marginTop: '0.75rem' }}>Not a tool. A system.</h2>
          </div>
          <InViewStagger className="grid-3">
            {APPROACH.map((a) => (
              <Card key={a.title}>
                <div style={{ marginBottom: 12 }}>
                  <Badge tone="ion">{a.tag}</Badge>
                </div>
                <h3 style={{ fontFamily: 'var(--oa-font-display)', fontWeight: 600, fontSize: '1.05rem', marginBottom: 8, color: 'var(--oa-white)' }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--oa-text-secondary)', lineHeight: 1.6 }}>{a.body}</p>
              </Card>
            ))}
          </InViewStagger>
        </div>
      </section>

      <CTA
        eyebrow="Ready to start?"
        headline="Begin with AI Readiness."
        sub="Most companies are still in the experiment phase. We get you to institutional — in 6 to 8 weeks."
        buttonLabel="Schedule your assessment"
        buttonHref="/contact"
        dark
      />
    </>
  );
}
