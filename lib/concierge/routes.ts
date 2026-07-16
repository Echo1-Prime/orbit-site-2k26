// Allowlisted destinations for the navigateTo tool. The agent can never route
// to an arbitrary URL — only these known site paths (prompt-injection guard).
import { PRODUCT_SLUGS } from '@/lib/products';

export const NAV_ROUTES = [
  '/',
  '/ai-readiness',
  '/products',
  '/about',
  '/contact',
  ...PRODUCT_SLUGS.map((s) => `/products/${s}`),
] as const;

export type NavRoute = (typeof NAV_ROUTES)[number];

export function isNavRoute(route: string): route is NavRoute {
  return (NAV_ROUTES as readonly string[]).includes(route);
}

// Products that showDashboard can surface an in-page demo for.
export const DASHBOARD_SLUGS = PRODUCT_SLUGS;
