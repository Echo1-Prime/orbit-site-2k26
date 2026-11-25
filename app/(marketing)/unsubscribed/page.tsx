import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/site';
import { resolveUnsubscribeStatus, unsubscribeCopy } from '@/lib/unsubscribe-status';

// Landing page after an outreach unsubscribe click. /unsubscribe (vercel.json) proxies to
// the n8n Unsubscribe Handler, which redirects here with ?status=. Not indexed.
export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Your Echo 1 Labs email preferences.',
  robots: { index: false, follow: false },
};

export default async function UnsubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const { status } = await searchParams;
  const copy = unsubscribeCopy(resolveUnsubscribeStatus(status));

  return (
    <section className="section" style={{ minHeight: '60svh', display: 'grid', placeItems: 'center' }}>
      <div className="container center">
        <p className="label mx-auto" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Email preferences</p>
        <h1 className="display-md" style={{ marginBottom: '1rem' }}>{copy.heading}</h1>
        <p className="body-lg mx-auto" style={{ maxWidth: '480px', marginBottom: '1.75rem' }}>{copy.body}</p>
        {copy.showManual && (
          <p className="body-md mx-auto" style={{ maxWidth: '480px', marginBottom: '1.75rem' }}>
            Email <a href={`mailto:${CONTACT_EMAIL}?subject=Unsubscribe`}>{CONTACT_EMAIL}</a> with the subject
            &ldquo;Unsubscribe&rdquo; and we will remove you by hand.
          </p>
        )}
        <Link href="/" className="btn btn--primary">Return home</Link>
      </div>
    </section>
  );
}
