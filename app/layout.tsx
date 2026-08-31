import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import ConciergeMount from '@/components/Concierge/ConciergeMount';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Echo 1 Labs — Business Lifecycle Management',
    template: '%s | Echo 1 Labs',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/echo1-e1-favicon.svg', type: 'image/svg+xml' },
      { url: '/echo1-e1-favicon.png', type: 'image/png', sizes: '64x64' },
    ],
    shortcut: '/echo1-e1-favicon.svg',
    apple: '/echo1-e1-apple-touch.png',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: 'Echo 1 Labs — Business Lifecycle Management',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echo 1 Labs — Business Lifecycle Management',
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${plusJakarta.variable}`}>
      <body>
        {children}
        <ConciergeMount />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
