import type { NextConfig } from 'next';
import { OLD_PATHS, SUBPAGE_SLUG } from './lib/subpage-routes';

/* Every live URL that a subpage replaces answers with one permanent redirect to its new route. */
const subpageRedirects = (Object.keys(SUBPAGE_SLUG) as (keyof typeof SUBPAGE_SLUG)[]).flatMap((key) =>
  OLD_PATHS[key].map((source) => ({ source, destination: `/${SUBPAGE_SLUG[key]}`, permanent: true })),
);

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
      // Demo landing renamed; old shared links keep working (301).
      { source: '/trucking-demo', destination: '/logistics-demo', permanent: true },
      // Pricing is being redone. Temporary (307) so the route can return.
      { source: '/pricing', destination: '/contact', permanent: false },
      // Legal routes: canonical paths are /terms-of-service and /privacy (301).
      { source: '/terms', destination: '/terms-of-service', permanent: true },
      { source: '/terms.html', destination: '/terms-of-service', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/refund', destination: '/refund-policy', permanent: true },
      { source: '/refunds', destination: '/refund-policy', permanent: true },
      { source: '/solutions/:slug*', destination: '/products', permanent: false },
      { source: '/smb/:slug*', destination: '/products', permanent: false },
      { source: '/mid-market/:slug*', destination: '/products', permanent: false },
      { source: '/journal/:slug*', destination: '/', permanent: false },
      ...subpageRedirects,
    ];
  },
};

export default nextConfig;
