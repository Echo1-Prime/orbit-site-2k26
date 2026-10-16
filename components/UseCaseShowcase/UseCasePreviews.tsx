'use client';

/*
  UseCasePreviews: preview bubbles on a rotation that highlight the case studies; the full cards live on /case-studies
  (Josh, 2026-10-16). Colours come only from the existing --e1-* variables.
  - The highlight advances every few seconds. It does not move when the visitor prefers reduced motion, while the
    pointer or focus is inside, or after the visitor pauses it (WCAG 2.2.2: a visible pause button).
  - Each bubble is a button that chooses its case study; the large preview is one link to that card on /case-studies.
  - No <video> here: posters only, so the home page loads no extra video.
*/

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { showcaseTiles } from '@/lib/landing/showcase';
import type { ShowcaseTile } from '@/lib/landing/showcase';
import styles from './UseCasePreviews.module.css';

export interface UseCasePreviewsProps {
  heading?: string;
  intro?: string;
  tiles?: ShowcaseTile[];
}

/* Written for review (Josh approves every public line). */
const DEFAULT_HEADING = 'Case studies';
const DEFAULT_INTRO = 'Real use cases, with the names removed. Pick one to preview it.';
const ROTATE_MS = 4000;

export function UseCasePreviews({ heading = DEFAULT_HEADING, intro = DEFAULT_INTRO, tiles = showcaseTiles }: UseCasePreviewsProps) {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hold, setHold] = useState(false);
  /* true until the browser's setting is read, so nothing rotates before we know */
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const rotating = !reduced && !stopped && !hold && tiles.length > 1;
  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % tiles.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [rotating, tiles.length]);

  if (!tiles.length) return null;
  const tile = tiles[Math.min(active, tiles.length - 1)];

  return (
    <section className={styles.section} aria-labelledby="case-previews-heading">
      <div className={styles.head}>
        <h2 id="case-previews-heading" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.intro}>{intro}</p>
      </div>

      <div
        className={styles.stage}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') setHold(true);
        }}
        onPointerLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        <ul className={styles.bubbles} role="list">
          {tiles.map((t, i) => (
            <li key={t.id} className={styles.bubbleItem}>
              <button
                type="button"
                className={styles.bubble}
                data-active={i === active}
                aria-pressed={i === active}
                aria-label={`Preview: ${t.title}`}
                onClick={() => setActive(i)}
              >
                <img className={styles.thumb} src={t.posterSmall} alt="" width={96} height={96} loading="lazy" decoding="async" />
                <span className={styles.name}>{t.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <Link className={styles.spot} href={`/case-studies#${tile.id}`}>
          <span className={styles.spotMedia}>
            <img
              key={tile.id}
              className={styles.spotImg}
              src={tile.posterSmall}
              srcSet={`${tile.posterSmall} 640w, ${tile.poster} 960w`}
              sizes="(min-width: 900px) 40vw, 92vw"
              alt=""
              width={960}
              height={540}
              decoding="async"
            />
          </span>
          <span className={styles.spotBody}>
            <span className={styles.kick}>{tile.kick}</span>
            <span className={styles.spotTitle}>{tile.title}</span>
            <span className={styles.spotCta}>Open the case study →</span>
          </span>
        </Link>
      </div>

      <div className={styles.foot}>
        {tiles.length > 1 && !reduced && (
          <button
            type="button"
            className={styles.toggle}
            aria-label={stopped ? 'Play the rotation of case studies' : 'Pause the rotation of case studies'}
            onClick={() => setStopped((s) => !s)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
              {stopped ? (
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" />
              ) : (
                <>
                  <rect x="6" y="5" width="4.5" height="14" rx="1" fill="currentColor" />
                  <rect x="13.5" y="5" width="4.5" height="14" rx="1" fill="currentColor" />
                </>
              )}
            </svg>
          </button>
        )}
        <Link className={styles.all} href="/case-studies">
          View all case studies
        </Link>
        <Link className={styles.sales} href="/contact?src=home-case-previews&cta=previews">
          Contact Sales
        </Link>
      </div>
    </section>
  );
}
