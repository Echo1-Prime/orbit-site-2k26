import Hero from '@/components/Hero/Hero';
import LifecycleGrid from '@/components/LifecycleGrid/LifecycleGrid';
import CTA from '@/components/CTA/CTA';
import InViewStagger from '@/components/Reveal/InViewStagger';
import { Eyebrow, Card, Badge } from '@/components/ds';

export const dynamic = 'force-static';

const APPROACH = [
  {
    tag: 'Operational OS',
    title: 'Seven layers. One operating system.',
    body:
      'Every function of your business or ministry runs through one connected system, plus an agent marketplace to extend it. No disconnected tools. No data gaps.',
  },
  {
    tag: 'Agent teams · Day one',
    title: '16 agents. Ready the moment you activate.',
    body:
      'Four pre-built agent teams cover the core functions of every operator-led business. No configuration required. They run from day one and improve with every cycle.',
  },
  {
    tag: 'Human-supervised',
    title: 'Supervision scales. Execution does not.',
    body:
      'Agents run execution. Humans supervise it. The OS is designed to expand what one person can supervise, not to replace judgment. Every action is logged and escalatable.',
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
            <Eyebrow>Business Lifecycle Management</Eyebrow>
            <h2 className="display-md" style={{ marginTop: '0.75rem' }}>Every stage. One system.</h2>
          </div>
          <LifecycleGrid />
        </div>
      </section>

      {/* Approach */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="display-md" style={{ marginTop: '0.75rem' }}>Built to run your operations.</h2>
          </div>
          <InViewStagger className="grid-3">
            {APPROACH.map((a) => (
              <Card key={a.title}>
                <div style={{ marginBottom: 12 }}>
                  <Badge tone="ion">{a.tag}</Badge>
                </div>
                <h3 style={{ fontFamily: 'var(--e1-font-display)', fontWeight: 600, fontSize: '1.05rem', marginBottom: 8, color: 'var(--e1-white)' }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--e1-slate)', lineHeight: 1.6 }}>{a.body}</p>
              </Card>
            ))}
          </InViewStagger>
        </div>
      </section>

      <CTA
        eyebrow="Founding Cohort · Season One"
        headline="Lock in the Founding rate."
        sub="The first operators to activate the BLM OS join at $997/mo: all seven apps, 3,000 agent executions per month, and a 90-day satisfaction guarantee."
        buttonLabel="Join Founding Cohort"
        buttonHref="/contact"
        dark
      />
    </>
  );
}
