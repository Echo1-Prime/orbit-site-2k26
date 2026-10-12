import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '@/styles/ao/index.css';

/* Weights are the handoff's: 300 for headings, body and labels, 400 and 500 for emphasis. */
const display = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-ao-display', display: 'swap' });
const body = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-ao-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400'], variable: '--font-ao-mono', display: 'swap' });

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`ao-site ${display.variable} ${body.variable} ${mono.variable}`}
      style={{ background: 'var(--ao-void)', color: 'var(--ao-t0)', fontFamily: 'var(--ao-f-body)', fontWeight: 300, overflowX: 'clip' }}
    >
      {children}
    </div>
  );
}
