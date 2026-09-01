'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './ProductShowcase.module.css';

const PRODUCTS = [
  {
    key: 'engine',
    label: 'Engine',
    job: 'Your go-to-market machine. Turns strategy into pipeline.',
    video: '/videos/engine.mp4',
    href: '/products/engine',
  },
  {
    key: 'revops',
    label: 'RevOps',
    job: 'Closes the gap between pipeline and revenue.',
    video: '/videos/lead-gen-network.mp4',
    href: '/products/revops',
  },
  {
    key: 'broadcast',
    label: 'Broadcast',
    job: 'Content at scale. Brand-consistent, always on.',
    video: '/videos/broadcast.mp4',
    href: '/products/broadcast',
  },
  {
    key: 'titan',
    label: 'Titan',
    job: 'Bid, fulfill, and deliver — without the bottlenecks.',
    video: '/videos/titan.mp4',
    href: '/products/titan',
  },
  {
    key: 'prime',
    label: 'Prime',
    job: 'Agent governance and oversight for every layer.',
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
          </div>
          <div className={styles.meta}>
            <h3 className={styles.productName}>{product.label}</h3>
            <p className={styles.productJob}>{product.job}</p>
            <Link href={product.href} className={`btn btn--ghost btn--sm ${styles.cta}`}>
              Learn more
            </Link>
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
