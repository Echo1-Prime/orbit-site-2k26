import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Concierge needs the mic on same-origin only; everything else is denied.
  { key: 'Permissions-Policy', value: 'microphone=(self), camera=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // This project is a nested repo; pin tracing to it so the parent lockfile
  // is not mistaken for the workspace root.
  outputFileTracingRoot: __dirname,
  // Product posters live on the primary domain until copied local; allow that origin.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.echo1labs.com' },
      { protocol: 'https', hostname: 'echo1labs.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Legacy paths from the prior site → nearest live launch page (301).
      { source: '/legacy-home', destination: '/', permanent: true },
      { source: '/solutions/:slug*', destination: '/products', permanent: false },
      { source: '/smb/:slug*', destination: '/products', permanent: false },
      { source: '/mid-market/:slug*', destination: '/products', permanent: false },
      { source: '/journal/:slug*', destination: '/', permanent: false },
      { source: '/quiz', destination: '/ai-readiness', permanent: false },
      { source: '/ai-readiness-quiz', destination: '/ai-readiness', permanent: false },
      { source: '/ai-readiness-assessment', destination: '/ai-readiness', permanent: false },
    ];
  },
};

export default nextConfig;
