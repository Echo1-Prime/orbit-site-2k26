import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import LandingPage from '@/components/landing/LandingPage';
import { signalCopy } from '@/lib/landing/signal';
import { faqSchema } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: signalCopy.seoTitle,
  description: signalCopy.seoDesc,
  robots: { index: false, follow: true },
  alternates: { canonical: '/products/signal' },
  openGraph: {
    title: signalCopy.seoTitle,
    description: signalCopy.seoDesc,
    url: new URL('/lp/signal', SITE_URL).toString(),
    type: 'website',
  },
};

export default function SignalLP() {
  return (
    <>
      <JsonLd data={faqSchema(signalCopy.objections)} />
      <LandingPage copy={signalCopy} />
    </>
  );
}
