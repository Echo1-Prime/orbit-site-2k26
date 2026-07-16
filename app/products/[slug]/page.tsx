import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, PRODUCT_SLUGS, PRODUCTS } from '@/lib/products';
import { getProductSEO } from '@/lib/product-seo';
import { productPageMetadata, pageMetadata, serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.isAdvisory) return {};
  const seo = getProductSEO(slug);
  if (seo) return productPageMetadata(product, seo);
  return pageMetadata({
    title: `${product.name} — ${product.tagline}`,
    description: product.problem,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.isAdvisory) notFound();
  const seo = getProductSEO(slug);

  const relatedProducts = seo?.relatedSlugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean) ?? [];

  return (
    <>
      {/* ── Structured data ─────────────────────────────── */}
      <JsonLd data={serviceSchema(product, seo)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      {seo && <JsonLd data={faqSchema(seo.faq)} />}

      {/* ── §1 HERO — keyword-optimized H1 + primary CTA ── */}
      <section className="section band--dark">
        <div className="container">
          <span className="stage-badge">
            {product.stage} · {product.category}
            {product.comingSoon ? ' · Coming Soon' : ''}
          </span>

          <h1
            className="display-lg"
            style={{ margin: '1.25rem 0 1rem', maxWidth: '22ch' }}
          >
            {seo?.hook ?? product.tagline}
          </h1>

          <p
            className="body-lg"
            style={{ maxWidth: '600px', marginBottom: '2rem' }}
          >
            {product.problem}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--primary">
              Schedule a call
            </Link>
            <button
              className="btn btn--ghost"
              onClick={undefined}
              data-open-concierge="true"
            >
              Talk to Orbit
            </button>
          </div>

          {/* Primary keyword as visible sub-label — aids on-page relevance */}
          {seo && (
            <p
              className="body-md muted"
              style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}
            >
              {product.name} ·{' '}
              <span style={{ textTransform: 'capitalize' }}>
                {seo.primaryKeyword}
              </span>
            </p>
          )}
        </div>
      </section>

      {/* ── §2 METRICS BAND ──────────────────────────────── */}
      <section className="section--sm">
        <div className="container">
          <div className="metrics">
            {product.metrics.map((m) => (
              <div className="metric" key={m.label}>
                <div className="metric__value">{m.value}</div>
                <div className="metric__label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §3 WHO IT'S FOR — ICP targeting (SBO/PMax) ───── */}
      {seo && (
        <section className="section--sm band--muted">
          <div className="container">
            <div className="prod-who-for">
              <p className="label">Who this is for</p>
              <p className="body-lg" style={{ maxWidth: '680px', marginTop: '0.5rem' }}>
                {seo.whoFor}
              </p>
              <div className="deployed-chips" style={{ marginTop: '1rem' }}>
                {product.deployedIn.map((d) => (
                  <span key={d} className="stage-badge" style={{ marginRight: '0.5rem', marginBottom: '0.4rem', display: 'inline-block' }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── §4 WHAT IT DOES — long-form for GEO/AI citation ─ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-header">
            <p className="label">What it does</p>
            <h2 className="display-md">{product.tagline}</h2>
          </div>
          <p className="body-lg">{product.description}</p>
        </div>
      </section>

      {/* ── §5 CAPABILITIES GRID ─────────────────────────── */}
      <section className="section band--muted">
        <div className="container">
          <div className="section-header">
            <p className="label">Capabilities</p>
            <h2 className="display-md">
              Built into {product.name}.
            </h2>
          </div>
          <div className="capability-grid">
            {product.capabilities.map((c) => (
              <div className="card" key={c.name}>
                <div className="card__title">{c.name}</div>
                <p className="card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §6 WHAT IT REPLACES — SBO comparison signal ─── */}
      {seo && (
        <section className="section">
          <div className="container" style={{ maxWidth: '780px' }}>
            <div className="section-header">
              <p className="label">What this replaces</p>
              <h2 className="display-md">
                One system. Not six.
              </h2>
            </div>
            <p className="body-lg">
              Most companies at this stage are stitching together{' '}
              {seo.comparesTo}. Each tool
              solves part of the problem — none of them share data, and you
              manage the gaps manually.
            </p>
            <p className="body-lg" style={{ marginTop: '1rem' }}>
              {product.name} is built to replace that stack. One system,
              one data model, one bill — with agent-based automation running
              the workflow end-to-end and a human operator staying in control.
            </p>
          </div>
        </section>
      )}

      {/* ── §7 FAQ — FAQPage schema + GEO/AI search anchor ─ */}
      {seo && seo.faq.length > 0 && (
        <section className="section band--muted">
          <div className="container" style={{ maxWidth: '780px' }}>
            <div className="section-header">
              <p className="label">Frequently asked</p>
              <h2 className="display-md">
                Common questions about {product.name}.
              </h2>
            </div>
            <dl className="faq-list">
              {seo.faq.map(({ q, a }) => (
                <div key={q} className="faq-item">
                  <dt className="faq-q">{q}</dt>
                  <dd className="faq-a">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ── §8 RELATED STAGES — internal linking for SEO ── */}
      {relatedProducts.length > 0 && (
        <section className="section--sm">
          <div className="container">
            <p className="label" style={{ marginBottom: '1rem' }}>
              Other stages in the lifecycle
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {relatedProducts.map((rp) =>
                rp ? (
                  <Link
                    key={rp.slug}
                    href={`/products/${rp.slug}`}
                    className="btn btn--ghost btn--sm"
                  >
                    {rp.name} — {rp.gridLine}
                  </Link>
                ) : null,
              )}
              <Link href="/products" className="btn btn--ghost btn--sm">
                See all 7 stages →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── §9 FINAL CTA BAND ────────────────────────────── */}
      <section className="section band--dark">
        <div className="container center">
          <h2 className="display-md" style={{ marginBottom: '0.75rem' }}>
            {product.comingSoon
              ? `${product.name} is coming soon.`
              : `Put ${product.name} to work.`}
          </h2>
          <p
            className="body-lg"
            style={{ maxWidth: '520px', margin: '0 auto 2rem' }}
          >
            {product.comingSoon
              ? 'Contact us to be notified when it launches or to discuss early access.'
              : `Schedule a call to see ${product.name} in action, or ask Orbit anything about how it works.`}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--primary">
              {product.comingSoon ? 'Get notified' : 'Schedule a call'}
            </Link>
            <Link href="/products" className="btn btn--ghost">
              See all stages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
