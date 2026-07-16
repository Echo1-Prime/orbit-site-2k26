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
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.mark}>
          <OrbitAvatar size="hero" state="idle" reduced={reduced} aria-label="Orbit" />
        </div>

        <p className="label">Business Lifecycle Management</p>
        <h1 className={`display-xl ${styles.headline}`}>Break free from business gravity.</h1>
        <p className={`body-lg ${styles.sub}`}>
          Echo 1 Labs is the Business Lifecycle Management company. We get startups and SMBs to
          escape velocity with process-engineered, agent-based systems — supervised by people.
          Meet Orbit, our concierge. Ask it anything.
        </p>

        <div className={styles.actions} role="group" aria-label="Choose how to explore">
          <button type="button" className="btn btn--primary" onClick={() => choose('voice')}>
            Talk to Orbit
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => choose('text')}>
            Type instead
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
