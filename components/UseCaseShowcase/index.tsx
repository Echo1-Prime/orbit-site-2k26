'use client';

/*
  UseCaseShowcase: a row of use-case cards, each with a preview video. Placed by the page layout
  (the E1-SITE rebuild session) directly below its hero; nothing imports it yet.

  Contract with the layout session (agreed 2026-10-12, subject to Josh authorizing its S1):
  - Named export `UseCaseShowcase`. Props are all optional: `heading`, `intro`, `tiles`.
    `tiles` defaults to `showcaseTiles` from lib/landing/showcase.ts (data only).
  - The component owns everything inside its own <section>. It sets no page background, no z-index
    outside itself and no fixed height. The host owns what sits around it.
  - Styling uses only the existing --e1-* variables from app/globals.css. No hex, no new variable names.
  - Every card is one link to the tile's href. The pause button is a sibling of the link, never inside it.
  - The poster is server-rendered. No <video> exists in the server HTML or before hydration.

  Behaviour (approved by Josh with "go H1", 2026-10-12):
  - A video mounts only after hydration, when motion is allowed (no reduced motion, no Data Saver),
    and only for a card in view. An error falls back to the poster. A card out of view pauses.
  - 900 px and wider: one row, at most two videos playing (the two most visible; a hovered, focused or
    just-resumed card goes first). Under 900 px: a snap row with the next card peeking; only the snapped
    card plays, and not at all on a reported 2g or 3g connection (Chromium only, feature-detected).
  - Each card has a visible 44 px pause and play button (WCAG 2.2.2).
*/

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { showcaseTiles } from '@/lib/landing/showcase';
import type { ShowcaseTile } from '@/lib/landing/showcase';
import styles from './UseCaseShowcase.module.css';

export interface UseCaseShowcaseProps {
  /** Section heading. */
  heading?: string;
  /** One line under the heading. */
  intro?: string;
  /** Cards to show. Defaults to lib/landing/showcase.ts. */
  tiles?: ShowcaseTile[];
}

/* Written for review (Josh approves every public line). */
const DEFAULT_HEADING = 'Check out our use cases.';
const DEFAULT_INTRO = 'What comes in, what the agent does, and where you sign.';
const ROW_LABELS = { in: 'In', agent: 'Agent', you: 'You' } as const;

const WIDE_QUERY = '(min-width: 900px)';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const SLOW_TYPES = ['slow-2g', '2g', '3g'];
/* Share of a card that must be on screen before it may play. */
const MIN_VISIBLE_WIDE = 0.4;
const MIN_VISIBLE_NARROW = 0.5;
const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: 'change', fn: () => void) => void;
  removeEventListener?: (type: 'change', fn: () => void) => void;
};

/* 'unknown' on the server and on the first client render, so no <video> is rendered then. */
type Gate = { state: 'unknown' | 'allowed' | 'blocked'; wide: boolean };

function useVideoGate(): Gate {
  const [gate, setGate] = useState<Gate>({ state: 'unknown', wide: false });
  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_QUERY);
    const wideMq = window.matchMedia(WIDE_QUERY);
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const compute = () => {
      const saveData = conn?.saveData === true;
      const slow = SLOW_TYPES.includes(conn?.effectiveType ?? '');
      const wide = wideMq.matches;
      setGate({ state: reduced.matches || saveData || (!wide && slow) ? 'blocked' : 'allowed', wide });
    };
    compute();
    reduced.addEventListener('change', compute);
    wideMq.addEventListener('change', compute);
    conn?.addEventListener?.('change', compute);
    return () => {
      reduced.removeEventListener('change', compute);
      wideMq.removeEventListener('change', compute);
      conn?.removeEventListener?.('change', compute);
    };
  }, []);
  return gate;
}

function CardVideo({ src, playing, onFail }: { src: string; playing: boolean; onFail: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      v.muted = true;
      v.play()?.catch(() => {
        /* The browser refused to autoplay: the poster stays. */
      });
    } else {
      v.pause();
    }
  }, [playing]);
  return (
    <video
      ref={ref}
      className={styles.video}
      data-ready={ready}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setReady(true)}
      onError={onFail}
    />
  );
}

/* Every card in a row lines up section by section (Josh, 2026-10-13: "make sure everything aligns on the page with
   the different use cases"). Each [data-align] block (eyebrow, title, each row) takes the height of the tallest block
   with the same key in the row, so rows and calls to action sit on the same lines whatever each card's copy length.
   Re-measured when the row's width changes and once fonts load. */
function useAlignedSections(row: RefObject<HTMLUListElement | null>, count: number) {
  useEffect(() => {
    const el = row.current;
    if (!el || count < 2 || typeof ResizeObserver === 'undefined') return;
    let raf = 0;
    let lastWidth = -1;
    const align = () => {
      raf = 0;
      const groups = new Map<string, HTMLElement[]>();
      el.querySelectorAll<HTMLElement>('[data-align]').forEach((block) => {
        block.style.minHeight = '';
        const key = block.dataset.align as string;
        const list = groups.get(key) ?? [];
        list.push(block);
        groups.set(key, list);
      });
      groups.forEach((blocks) => {
        if (blocks.length < 2) return;
        const tallest = Math.max(...blocks.map((b) => b.getBoundingClientRect().height));
        blocks.forEach((b) => {
          b.style.minHeight = `${Math.ceil(tallest)}px`;
        });
      });
    };
    const schedule = () => {
      if (el.clientWidth === lastWidth) return;
      lastWidth = el.clientWidth;
      if (!raf) raf = requestAnimationFrame(align);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    document.fonts?.ready
      .then(() => {
        lastWidth = -1;
        schedule();
      })
      .catch(() => {});
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [row, count]);
}

export function UseCaseShowcase({ heading = DEFAULT_HEADING, intro = DEFAULT_INTRO, tiles = showcaseTiles }: UseCaseShowcaseProps) {
  const gate = useVideoGate();
  const allowed = gate.state === 'allowed';
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [paused, setPaused] = useState<Set<string>>(() => new Set());
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [mounted, setMounted] = useState<Set<string>>(() => new Set());
  const [recent, setRecent] = useState<string[]>([]);
  const cards = useRef(new Map<string, HTMLElement>());
  const rowRef = useRef<HTMLUListElement>(null);
  useAlignedSections(rowRef, tiles.length);

  /* How much of each card is on screen. A card inside the snap row is clipped by the row, so the
     snapped card reads highest. Observed only once video is allowed. */
  useEffect(() => {
    if (!allowed || typeof IntersectionObserver === 'undefined') return;
    const byEl = new Map<Element, string>();
    cards.current.forEach((el, id) => byEl.set(el, id));
    const io = new IntersectionObserver(
      (entries) => {
        setRatios((prev) => {
          const next = { ...prev };
          for (const e of entries) {
            const id = byEl.get(e.target);
            if (id) next[id] = e.isIntersecting ? e.intersectionRatio : 0;
          }
          return next;
        });
      },
      { threshold: THRESHOLDS },
    );
    byEl.forEach((_id, el) => io.observe(el));
    return () => {
      io.disconnect();
      setRatios({});
    };
  }, [allowed, tiles]);

  const playing = useMemo(() => {
    if (!allowed) return new Set<string>();
    const min = gate.wide ? MIN_VISIBLE_WIDE : MIN_VISIBLE_NARROW;
    const cap = gate.wide ? 2 : 1;
    const eligible = tiles.filter((t) => t.video && !paused.has(t.id) && !failed.has(t.id) && (ratios[t.id] ?? 0) >= min);
    const first = gate.wide ? eligible.filter((t) => recent.includes(t.id)).sort((a, b) => recent.indexOf(a.id) - recent.indexOf(b.id)) : [];
    const rest = eligible.filter((t) => !first.includes(t)).sort((a, b) => (ratios[b.id] ?? 0) - (ratios[a.id] ?? 0));
    return new Set([...first, ...rest].slice(0, cap).map((t) => t.id));
  }, [allowed, gate.wide, tiles, paused, failed, ratios, recent]);

  /* A card gets a <video> the first time it is chosen to play, and keeps it (paused when out of view). */
  useEffect(() => {
    if (!allowed) {
      setMounted((m) => (m.size ? new Set() : m));
      return;
    }
    setMounted((m) => {
      let changed = false;
      const next = new Set(m);
      playing.forEach((id) => {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      });
      return changed ? next : m;
    });
  }, [allowed, playing]);

  const touch = (id: string) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 2));
  const toggle = (id: string) => {
    const wasPaused = paused.has(id);
    setPaused((p) => {
      const next = new Set(p);
      if (wasPaused) next.delete(id);
      else next.add(id);
      return next;
    });
    if (wasPaused) touch(id);
  };
  const fail = (id: string) => setFailed((f) => new Set(f).add(id));
  const toggleExpanded = (id: string) =>
    setExpanded((x) => {
      const next = new Set(x);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (!tiles.length) return null;

  return (
    <section className={styles.section} aria-labelledby="use-case-showcase-heading">
      <div className={styles.head}>
        <h2 id="use-case-showcase-heading" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.intro}>{intro}</p>
      </div>

      <ul ref={rowRef} className={styles.row} role="list" data-count={tiles.length}>
        {tiles.map((tile) => {
          const detailRows = (['in', 'agent'] as const).filter((k) => tile[k]);
          const isOpen = expanded.has(tile.id);
          const panelId = `ucs-more-${tile.id}`;
          const isPaused = paused.has(tile.id);
          const showVideo = allowed && mounted.has(tile.id) && !failed.has(tile.id) && !!tile.video;
          const titleId = `ucs-title-${tile.id}`;
          const ctaId = `ucs-cta-${tile.id}`;
          return (
            <li
              key={tile.id}
              id={tile.id}
              className={styles.card}
              ref={(el) => {
                if (el) cards.current.set(tile.id, el);
                else cards.current.delete(tile.id);
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') touch(tile.id);
              }}
              onFocus={() => touch(tile.id)}
            >
              <a className={styles.link} href={tile.href} aria-labelledby={`${titleId} ${ctaId}`}>
                <span id={ctaId} className={styles.cta}>
                  {tile.ctaLabel}
                </span>
                <span className={styles.media}>
                  <img
                    className={styles.poster}
                    src={tile.posterSmall}
                    srcSet={`${tile.posterSmall} 640w, ${tile.poster} 960w`}
                    sizes="(min-width: 900px) 40vw, 82vw"
                    alt=""
                    width={960}
                    height={540}
                    loading="lazy"
                    decoding="async"
                  />
                  {showVideo && <CardVideo src={tile.video} playing={playing.has(tile.id)} onFail={() => fail(tile.id)} />}
                </span>
                <span className={styles.body}>
                  <span className={styles.kick} data-align="kick">{tile.kick}</span>
                  <span id={titleId} className={styles.title} data-align="title">
                    {tile.title}
                  </span>
                  {tile.you && (
                    <dl className={styles.rows}>
                      <div className={styles.rowItem} data-align="you">
                        <dt>{ROW_LABELS.you}</dt>
                        <dd>{tile.you}</dd>
                      </div>
                    </dl>
                  )}
                </span>
              </a>
              {detailRows.length > 0 && (
                <div className={styles.more}>
                  <button
                    type="button"
                    className={styles.expand}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleExpanded(tile.id)}
                  >
                    <span>{isOpen ? 'Collapse' : 'Expand'}</span>
                    <svg className={styles.chev} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <dl id={panelId} className={styles.rows} hidden={!isOpen}>
                    {detailRows.map((k) => (
                      <div key={k} className={styles.rowItem}>
                        <dt>{ROW_LABELS[k]}</dt>
                        <dd>{tile[k]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {allowed && tile.video && (
                <button
                  type="button"
                  className={styles.pause}
                  aria-label={`${isPaused ? 'Play' : 'Pause'} preview: ${tile.title}`}
                  onClick={() => toggle(tile.id)}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                    {isPaused ? (
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}
