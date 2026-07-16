import type { Metadata } from 'next';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import ContactForm from './ContactForm';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: 'Schedule your AI Readiness assessment or connect with the Echo 1 Labs team.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '5rem', alignItems: 'start' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.75rem' }}>Get in touch</p>
              <h1 className="display-lg" style={{ marginBottom: '1.25rem' }}>Let&apos;s talk about your AI lifecycle.</h1>
              <p className="body-lg" style={{ marginBottom: '2.5rem' }}>
                Whether you are starting with AI Readiness or building a fully agentic operation, we
                will meet you where you are and map where you need to go.
              </p>
              <div className="stack" style={{ gap: '1.25rem' }}>
                <div>
                  <div className="label" style={{ marginBottom: '0.25rem' }}>AI Readiness Assessment</div>
                  <p className="body-md">Audit your current AI footprint and receive a 90-day institutional AI roadmap.</p>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: '0.25rem' }}>Custom Workflow Design</div>
                  <p className="body-md">Bespoke automations and agentic apps for your specific stack and team.</p>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: '0.25rem' }}>PRIME Platform</div>
                  <p className="body-md">Deploy out-of-the-box agentic operations for your organization.</p>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
