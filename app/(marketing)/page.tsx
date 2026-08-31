import Image from 'next/image';
import Hero from '@/components/Hero/Hero';
import LifecycleGrid from '@/components/LifecycleGrid/LifecycleGrid';
import ProductShowcase from '@/components/ProductShowcase/ProductShowcase';
import CTA from '@/components/CTA/CTA';
import InViewStagger from '@/components/Reveal/InViewStagger';
import { Eyebrow, Card, Badge } from '@/components/ds';

export const dynamic = 'force-static';

const APPROACH = [
  {
    tag: 'Operational Architecture',
    title: 'From execution mode to supervision mode',
    body:
      "We build your organization's second brain — connecting individual AI productivity to enterprise-grade governance, security, and scalable agentic infrastructure.",
    image: '/voice-agent.svg',
    imageAlt: 'Voice agent operational architecture',
  },
  {
    tag: 'Process engineering',
    title: 'Process engineering first',
    body:
      'Automations, agentic workflows, and lifecycle management are not features — they are the operating model. We engineer your business to run like software.',
    image: '/ai-readiness.svg',
    imageAlt: 'AI readiness process engineering',
  },
  {
    tag: 'Human-supervised',
    title: 'Agent-based, human-supervised',
    body:
      'Every system is agent-based and supervised by people. Prime gives you a production-ready platform; custom workflows are built for your exact stack.',
    image: '/candidates.png',
    imageAlt: 'Human-supervised agent system',
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

      <ProductShowcase />

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
                <Image
                  src={a.image}
                  alt={a.imageAlt}
                  width={320}
                  height={160}
                  style={{ width: '100%', height: 160, objectFit: 'contain', marginBottom: 16 }}
                  priority={false}
                />
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
