import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "../tokens-v5.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Self-hosted at build time by next/font — no runtime CDN call.
// Space Grotesk = display / wordmark (700, -0.03em). DM Sans = body / UI.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://echoorbit.vercel.app"),
  title: {
    default: "Echo 1 Labs — AI-enhanced business systems with management support",
    template: "%s — Echo 1 Labs",
  },
  description:
    "Business Lifecycle Management for founder-led companies. AI-enhanced systems for go-to-market, sales, marketing, finance, delivery, and governance — with real people supervising the output.",
  openGraph: {
    title: "Echo 1 Labs",
    description:
      "AI-enhanced business systems with management support for founder-led companies.",
    type: "website",
  },
};

// Applies stored theme before paint to avoid a flash. Default: dark (brand default).
const themeInit = `(function(){try{var t=localStorage.getItem('e1-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
