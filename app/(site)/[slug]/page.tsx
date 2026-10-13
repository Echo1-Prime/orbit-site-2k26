import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubpagePage from '@/components/Subpages/SubpagePage';
import { SUBPAGE_SLUGS, getSubpage, subpageMetadata } from '@/lib/subpages';

/* The ten product subpages from the 2K26 design handoff. Slugs come from keyword research (see lib/subpages.ts);
   any other single-segment path is not handled here and returns the site 404. */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return SUBPAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getSubpage(slug);
  return p ? subpageMetadata(p) : {};
}

export default async function SubpageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getSubpage(slug);
  if (!p) notFound();
  return <SubpagePage p={p} />;
}
