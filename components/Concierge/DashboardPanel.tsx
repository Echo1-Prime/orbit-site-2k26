'use client';

// In-page demo panel surfaced by the showDashboard tool — the "immediate product
// demo" of agent capability. Built from the product catalog; clearly labelled as
// illustrative so it never reads as live client data.

import { getProduct } from '@/lib/products';
import styles from './Concierge.module.css';

export default function DashboardPanel({ slug }: { slug: string }) {
  const p = getProduct(slug);
  if (!p) return null;
  return (
    <div className={styles.dash}>
      <div className={styles.dashHead}>
        <span className="lifecycle-cell__stage">{p.stage}</span>
        <span className={styles.dashName}>{p.name}</span>
        <span className={styles.dashDemo}>Illustrative demo</span>
      </div>
      <div className={styles.dashMetrics}>
        {p.metrics.map((m) => (
          <div key={m.label} className={styles.dashMetric}>
            <div className={styles.dashValue}>{m.value}</div>
            <div className={styles.dashLabel}>{m.label}</div>
          </div>
        ))}
      </div>
      <ul className={styles.dashCaps}>
        {p.capabilities.slice(0, 3).map((c) => (
          <li key={c.name}><strong>{c.name}.</strong> {c.desc}</li>
        ))}
      </ul>
      <a href={`/products/${p.slug}`} className="btn btn--primary btn--sm">Open {p.name}</a>
    </div>
  );
}
