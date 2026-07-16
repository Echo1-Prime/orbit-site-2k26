import Hero from '@/components/Hero/Hero';
import LifecycleGrid from '@/components/LifecycleGrid/LifecycleGrid';
import CTA from '@/components/CTA/CTA';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 8-stage lifecycle */}
      <section className="section--sm">
        <div className="container">
          <div className="section-header">
            <p className="label">The 8-Stage Lifecycle</p>
            <h2 className="display-md">Every stage. One system.</h2>
          </div>
          <LifecycleGrid />
        </div>
      </section>

      {/* Approach */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label">Our Approach</p>
            <h2 className="display-md">Not a tool. A system.</h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <div className="card__title">Personal AI to Institutional AI</div>
              <p className="card__desc">
                We build your organization&apos;s second brain — connecting individual AI
                productivity to enterprise-grade governance, security, and scalable agentic
                infrastructure.
              </p>
            </div>
            <div className="card">
              <div className="card__title">Process engineering first</div>
              <p className="card__desc">
                Automations, agentic workflows, and lifecycle management are not features — they
                are the operating model. We engineer your business to run like software.
              </p>
            </div>
            <div className="card">
              <div className="card__title">Agent-based, human-supervised</div>
              <p className="card__desc">
                Every system is agent-based and supervised by people. PRIME gives you a
                production-ready platform; custom workflows are built for your exact stack.
              </p>
            </div>
          </div>
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
