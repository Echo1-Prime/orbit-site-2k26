import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, PRODUCT_SLUGS } from '@/lib/products';
import { pageMetadata, serviceSchema, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA/CTA';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.isAdvisory) return {};
  return pageMetadata({
    title: `${product.name} — ${product.tagline}`,
    description: product.problem,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.isAdvisory) notFound();

  return (
    <>
      <JsonLd data={serviceSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <span className="stage-badge">
            {product.stage} · {product.category}
            {product.comingSoon ? ' · Coming soon' : ''}
          </span>
          <h1 className="display-lg" style={{ margin: '1.25rem 0 1rem' }}>{product.name}</h1>
          <p className="display-sm" style={{ color: 'var(--text-2)', maxWidth: '30ch', marginBottom: '1.25rem' }}>
            {product.tagline}
          </p>
          <p className="body-lg" style={{ maxWidth: '640px' }}>{product.problem}</p>
        </div>
      </section>

      {/* Metrics */}
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

      {/* Description */}
      <section className="section">
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-header">
            <p className="label">What it does</p>
          </div>
          <p className="body-lg">{product.description}</p>
          <p className="body-md muted" style={{ marginTop: '1.5rem' }}>
            Deployed in: {product.deployedIn.join(' · ')}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section band--muted">
        <div className="container">
          <div className="section-header">
            <p className="label">Capabilities</p>
            <h2 className="display-md">Built into {product.name}.</h2>
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

      <section className="section--sm">
        <div className="container center">
          <h2 className="display-md" style={{ marginBottom: '1.5rem' }}>
            {product.comingSoon ? `${product.name} is coming soon.` : `Put ${product.name} to work.`}
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--primary">Schedule a call</Link>
            <Link href="/products" className="btn btn--ghost">See all stages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
