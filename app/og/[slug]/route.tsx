import { renderOgImage } from '@/lib/og';
import { SUBPAGE_SLUGS, getSubpage } from '@/lib/subpages';

/* One 1200x630 share card per subpage, so a link preview shows the page it points to.
   Rendered at build time; the alt text is set in the page metadata (og:image:alt). */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return SUBPAGE_SLUGS.map((slug) => ({ slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getSubpage(slug);
  if (!p) return new Response('Not found', { status: 404 });
  return renderOgImage({ eyebrow: `${p.category} · ${p.name}`, line1: p.title, blurb: p.description });
}
