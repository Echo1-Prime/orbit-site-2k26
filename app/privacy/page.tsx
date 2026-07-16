import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, LEGAL_ENTITY } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Privacy',
    description: 'How Echo 1 Labs handles data on this site, including the Orbit concierge.',
    path: '/privacy',
  }),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '760px' }}>
        <p className="label" style={{ marginBottom: '0.75rem' }}>Privacy</p>
        <h1 className="display-lg" style={{ marginBottom: '1.5rem' }}>Privacy summary</h1>
        <p className="body-lg" style={{ marginBottom: '2rem' }}>
          This is a plain-language summary of how {LEGAL_ENTITY} (operating as Echo 1 Labs) handles
          data on echo1labs.com. It is not a substitute for a full legal agreement in an engagement.
        </p>

        <div className="stack" style={{ gap: '1.75rem' }}>
          <div>
            <h2 className="display-sm" style={{ marginBottom: '0.6rem' }}>The Orbit concierge</h2>
            <p className="body-md">
              Orbit is an AI concierge. If you type, your messages are sent to our AI provider to
              generate a response. If you choose voice, your browser&apos;s speech service converts
              your speech to text so Orbit can respond; Echo 1 Labs does not store your microphone
              audio. You can browse the site without using Orbit at all, and switch to text at any time.
            </p>
          </div>
          <div>
            <h2 className="display-sm" style={{ marginBottom: '0.6rem' }}>Contact and lead details</h2>
            <p className="body-md">
              If you submit the contact form or ask Orbit to have someone follow up, we collect the
              details you provide (such as name, email, company, and message) to respond to you. We do
              not sell your personal information.
            </p>
          </div>
          <div>
            <h2 className="display-sm" style={{ marginBottom: '0.6rem' }}>Messaging consent</h2>
            <p className="body-md">
              We only send SMS or calls where you have explicitly opted in, and standard message and
              data rates may apply. You can opt out at any time.
            </p>
          </div>
          <div>
            <h2 className="display-sm" style={{ marginBottom: '0.6rem' }}>Questions</h2>
            <p className="body-md">
              Email <a style={{ color: 'var(--link)', textDecoration: 'underline' }} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> for
              any privacy question or a data request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
