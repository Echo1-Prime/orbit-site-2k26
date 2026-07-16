import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

// The 8-stage lifecycle. ENABLE (AI Readiness) is the advisory entry point;
// the other 7 stages are products with their own pages.
export default function LifecycleGrid() {
  return (
    <div className="lifecycle-grid">
      {PRODUCTS.map((p) => {
        const href = p.isAdvisory ? '/ai-readiness' : `/products/${p.slug}`;
        return (
          <Link
            key={p.slug}
            href={href}
            className={`lifecycle-cell${p.isAdvisory ? ' lifecycle-cell--advisory' : ''}`}
          >
            <div className="lifecycle-cell__stage">{p.stage}</div>
            <div className="lifecycle-cell__name">{p.name}</div>
            <div className="lifecycle-cell__product">{p.gridLine}</div>
          </Link>
        );
      })}
    </div>
  );
}
