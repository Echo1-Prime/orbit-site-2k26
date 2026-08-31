'use client';

import OrbitAvatar from '@/components/OrbitAvatar/OrbitAvatar';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { openConcierge, type ConciergeMode } from '@/lib/concierge-bus';
import styles from './Hero.module.css';

export default function Hero() {
  const reduced = useReducedMotion();
  const choose = (mode: ConciergeMode) => openConcierge(mode);

  return (
    <section className={`band--dark ${styles.hero}`}>
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
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.mark}>
          <OrbitAvatar size="hero" state="idle" reduced={reduced} aria-label="Orbit" />
        </div>

        <p className="label">Business Lifecycle Management</p>
        <h1 className={`display-xl ${styles.headline}`}>Break free from business gravity.</h1>
        <p className={`body-lg ${styles.sub}`}>
          Built for owner-led businesses between $5M and $100M. We replace execution bottlenecks
          with agent-run operations — supervised by you. Most operators are running their first
          agents in six to eight weeks.
        </p>

        <div className={styles.actions} role="group" aria-label="Choose how to explore">
          <button type="button" className="btn btn--primary" onClick={() => choose('voice')}>
            Talk to Orbit
          </button>
          <button type="button" className={styles.browse} onClick={() => choose('browse')}>
            Browse on my own
          </button>
        </div>

        <p className={styles.disclosure}>
          Orbit is an AI concierge. Voice and text are optional — you can always browse on your own.
        </p>
      </div>
    </section>
  );
}
