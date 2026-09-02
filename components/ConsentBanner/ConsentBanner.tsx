'use client';

import { useEffect, useState } from 'react';
import { readConsent, writeConsent } from '@/lib/consent';
import styles from './ConsentBanner.module.css';

// First-visit cookie banner for Google Consent Mode v2. Renders nothing on the
// server and nothing once a choice is stored, so returning visitors never see
// it. Accept grants analytics + Google Ads; Decline keeps everything denied.
// Consent Mode defaults to denied (see GoogleTagManager), so no tag stores data
// before a choice is made either way.

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setShow(true);
  }, []);

  const choose = (accepted: boolean) => {
    writeConsent({ analytics: accepted, marketing: accepted });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p className={styles.text}>
        We use Google Analytics and Google Ads cookies to understand traffic and measure our
        campaigns. Nothing is stored until you accept. See our{' '}
        <a href="/privacy" className={styles.link}>privacy summary</a>.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={() => choose(true)}>
          Accept
        </button>
        <button type="button" className={styles.decline} onClick={() => choose(false)}>
          Decline
        </button>
      </div>
    </div>
  );
}
