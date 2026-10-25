import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { SUBPAGES, SUBPAGES_UPDATED } from '@/lib/subpages';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/use-cases/trucking`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/oilandgas`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/use-cases/real-estate-development`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/use-cases/how-crude-treating-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/use-cases/track-your-jobs-in-3d`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/refund-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
  // The ten product subpages. lastModified is the date of the last substantial content change, not the build time.
  // The retired /products/[slug] and /ai-readiness URLs redirect, so they are not listed.
  const subpageRoutes: MetadataRoute.Sitemap = SUBPAGES.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: new Date(`${SUBPAGES_UPDATED}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  return [...staticRoutes, ...subpageRoutes];
}
