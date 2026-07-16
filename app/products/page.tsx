import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/products';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'Products',
  description:
    'The 8-stage Business Lifecycle Management system: AI Readiness (ENABLE) plus seven products — Engine, RevOps, Broadcast, Signal, Ledger, Titan, and Prime.',
  path: '/products',
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ])}
      />
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label">8-Stage System</p>
            <h1 className="display-lg" style={{ marginBottom: '1rem' }}>The full lifecycle stack.</h1>
            <p className="body-lg" style={{ maxWidth: '560px' }}>
              Every stage of your business lifecycle maps to a product. Start where the pain is.
              Build toward a fully agentic operation. AI Readiness is the enablement engagement that
              gets you there — it is advisory, not a product SKU.
            </p>
          </div>

          <div className="stack-rows">
            {PRODUCTS.map((p) => {
              const href = p.isAdvisory ? '/ai-readiness' : `/products/${p.slug}`;
              const cta = p.isAdvisory ? 'Learn more' : p.comingSoon ? 'Coming soon' : 'Explore';
              return (
                <div key={p.slug} className="stack-row">
                  <div>
                    <div className="lifecycle-cell__stage">{p.stage}</div>
                    <div className="lifecycle-cell__name">{p.name}</div>
                  </div>
                  <p className="stack-row__desc">{p.problem}</p>
                  <div>
                    <Link href={href} className={`btn btn--sm ${p.isAdvisory ? 'btn--primary' : 'btn--ghost'}`}>
                      {cta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
