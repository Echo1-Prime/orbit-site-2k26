'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './ProductShowcase.module.css';

const PRODUCTS = [
  {
    key: 'engine',
    label: 'Engine',
    eyebrow: 'Engine · Go-to-Market',
    headline: 'Go-to-market that runs itself.',
    sub: 'Engine builds the list, runs the outreach, and books the meetings. You show up to the conversations that matter.',
    video: '/videos/engine.mp4',
    href: '/products/engine',
  },
  {
    key: 'revops',
    label: 'RevOps',
    eyebrow: 'RevOps · Sales Operations',
    headline: 'Revenue operations without the ops.',
    sub: 'One agentic engine runs qualification, forecasting, and reconciliation while your team stays on the conversations that close.',
    video: '/videos/lead-gen-network.mp4',
    href: '/products/revops',
  },
  {
    key: 'broadcast',
    label: 'Broadcast',
    eyebrow: 'Broadcast · Marketing',
    headline: 'Content that ships on schedule.',
    sub: 'SEO, content, social, and paid across every channel, on brand, without a marketing team.',
    video: '/videos/broadcast.mp4',
    href: '/products/broadcast',
  },
  {
    key: 'titan',
    label: 'Titan',
    eyebrow: 'Titan · Document Intelligence',
    headline: 'Documents that process themselves.',
    sub: 'Classify, extract, and route every document. You review outcomes, not paperwork.',
    video: '/videos/titan.mp4',
    href: '/products/titan',
  },
  {
    key: 'prime',
    label: 'Prime',
    eyebrow: 'Prime · Governance',
    headline: 'Your business. One layer. Full view.',
    sub: 'Every agent reports to Prime. Every decision that needs you surfaces here, and only here.',
    video: '/videos/prime.mp4',
    href: '/products/prime',
  },
];

const AUTOPLAY_INTERVAL = 8000;

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % PRODUCTS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, AUTOPLAY_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, advance]);

  useEffect(() => {
    videoRef.current?.load();
  }, [active]);

  const select = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, AUTOPLAY_INTERVAL);
  };

  const product = PRODUCTS[active];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className="section-header">
          <p className="label">The BLM OS</p>
          <h2 className={`display-md ${styles.heading}`}>Seven layers. Each runs a job.</h2>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Products">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.key}
              role="tab"
              aria-selected={i === active}
              className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
              onClick={() => select(i)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          className={styles.player}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={styles.videoWrap}>
            <video
              ref={videoRef}
              key={product.video}
              className={styles.video}
              autoPlay
              muted
              loop
              playsInline
              aria-label={`${product.label} product demo`}
            >
              <source src={product.video} type="video/mp4" />
            </video>
            <div className={styles.overlay}>
              <div className={styles.overlayInner}>
                <p className={styles.overlayEyebrow}>{product.eyebrow}</p>
                <h3 className={styles.overlayHeadline}>{product.headline}</h3>
                <p className={styles.overlaySub}>{product.sub}</p>
                <Link href={product.href} className={`btn btn--ghost btn--sm ${styles.cta}`}>
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          {PRODUCTS.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => select(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
