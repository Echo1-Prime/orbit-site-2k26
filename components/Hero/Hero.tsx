'use client';

import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Hero.module.css';

// Official Echo 1 Labs homepage hero - artifact 03649351 (Josh 2026-08-31).
// Solar Orange #FF7515 orbital field on void black; no ember, no ion-cyan.
export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className={styles.hero}>
      {!reduced && (
        <video
          className={styles.videoBg}
          src="/videos/earth-from-space.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      <svg
        className={styles.orbital}
        viewBox="0 0 700 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="hero-glow-a" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hero-glow-b" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="28" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hero-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF7515" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FF7515" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="350" cy="350" r="180" fill="url(#hero-core-glow)" />
        <circle cx="350" cy="350" r="300" stroke="#FF7515" strokeWidth="0.8" strokeOpacity="0.12" />
        <path d="M 350 50 A 300 300 0 1 1 100 500" stroke="#FF7515" strokeWidth="1.2" strokeOpacity="0.35" filter="url(#hero-glow-a)" strokeLinecap="round" />
        <circle cx="350" cy="350" r="200" stroke="#FF7515" strokeWidth="0.6" strokeOpacity="0.08" />
        <path d="M 350 150 A 200 200 0 0 0 180 520" stroke="#FF7515" strokeWidth="0.8" strokeOpacity="0.20" strokeLinecap="round" />
        <circle cx="350" cy="350" r="110" stroke="#FF7515" strokeWidth="0.5" strokeOpacity="0.12" />

        <g>
          <circle cx="650" cy="350" r="5" fill="#FF7515" filter="url(#hero-glow-a)" opacity="0.9" />
          {!reduced && (
            <animateTransform attributeName="transform" type="rotate" from="0 350 350" to="360 350 350" dur="14s" repeatCount="indefinite" />
          )}
        </g>
        <g>
          <circle cx="550" cy="350" r="3.5" fill="#FF7515" filter="url(#hero-glow-a)" opacity="0.6" />
          {!reduced && (
            <animateTransform attributeName="transform" type="rotate" from="120 350 350" to="-240 350 350" dur="9s" repeatCount="indefinite" />
          )}
        </g>
        <g>
          <circle cx="460" cy="350" r="2.5" fill="#FF7515" filter="url(#hero-glow-b)" opacity="0.4" />
          {!reduced && (
            <animateTransform attributeName="transform" type="rotate" from="240 350 350" to="600 350 350" dur="5.5s" repeatCount="indefinite" />
          )}
        </g>

        <line x1="350" y1="50" x2="350" y2="62" stroke="#FF7515" strokeOpacity="0.3" strokeWidth="1" />
        <line x1="638" y1="228" x2="628" y2="234" stroke="#FF7515" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="638" y1="472" x2="628" y2="466" stroke="#FF7515" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="350" y1="650" x2="350" y2="638" stroke="#FF7515" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="62" y1="472" x2="72" y2="466" stroke="#FF7515" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="62" y1="228" x2="72" y2="234" stroke="#FF7515" strokeOpacity="0.2" strokeWidth="1" />

        <line x1="340" y1="350" x2="360" y2="350" stroke="#FF7515" strokeWidth="0.8" strokeOpacity="0.45">
          {!reduced && (
            <animate attributeName="stroke-opacity" values="0.35;0.55;0.35" dur="2.5s" repeatCount="indefinite" />
          )}
        </line>
        <line x1="350" y1="340" x2="350" y2="360" stroke="#FF7515" strokeWidth="0.8" strokeOpacity="0.45">
          {!reduced && (
            <animate attributeName="stroke-opacity" values="0.35;0.55;0.35" dur="2.5s" repeatCount="indefinite" />
          )}
        </line>
        <circle cx="350" cy="350" r="4" fill="none" stroke="#FF7515" strokeWidth="0.8" strokeOpacity="0.45">
          {!reduced && (
            <>
              <animate attributeName="r" values="4;4.4;4" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.35;0.55;0.35" dur="2.5s" repeatCount="indefinite" />
            </>
          )}
        </circle>
      </svg>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          E1L <span className={styles.sep}>·</span> BUSINESS &amp; MINISTRY LIFECYCLE MANAGEMENT
        </div>
        <h1 className={styles.headline}>
          Break free from<br />
          <em>business gravity.</em>
        </h1>
        <p className={styles.sub}>
          Seven integrated apps. One operating system, for businesses and ministries alike. Built by
          operators. Run by agents. Supervised by humans at scale.
        </p>
        <div className={styles.actions}>
          <Link href="/founding-cohort" className={`${styles.btn} ${styles.btnPrimary}`}>
            You&apos;re Invited
            <span className={styles.btnSub}>Founding Cohort</span>
          </Link>
          <Link href="/products" className={`${styles.btn} ${styles.btnGhost}`}>
            Explore the OS
          </Link>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNum}>7</div>
            <div className={styles.statLabel}>Integrated Apps</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>
              <span className={styles.u}>2</span>
            </div>
            <div className={styles.statLabel}>Verticals · BLM &amp; MLM</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>
              500<span className={styles.u}>+</span>
            </div>
            <div className={styles.statLabel}>Agent Marketplace</div>
          </div>
        </div>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollArrow}>↓</span>
        Select your operating layer
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  );
}
