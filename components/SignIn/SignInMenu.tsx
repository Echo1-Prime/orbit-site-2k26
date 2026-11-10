'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { GhostButton } from '@/components/ao/feedback/GhostButton';
import { ghostProps } from '@/components/Site/ghost';
import { SIGN_IN_APPS } from '@/lib/site';
import styles from './SignInMenu.module.css';

interface Props {
  /** 'site' renders the Agent Orbit ghost button (home chrome); 'marketing' the site .btn ghost. */
  variant: 'site' | 'marketing';
}

/** Header "Sign in" disclosure: one button that opens a short list of product app links. */
export default function SignInMenu({ variant }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const triggerProps = {
    ref: buttonRef,
    'aria-expanded': open,
    'aria-controls': panelId,
    onClick: () => setOpen((o) => !o),
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${variant === 'marketing' ? styles.marketingRoot : ''}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      {variant === 'site' ? (
        <GhostButton {...ghostProps('secondary', 'sm')} {...triggerProps}>
          Sign in
        </GhostButton>
      ) : (
        <button type="button" className={`btn btn--ghost btn--sm ${styles.marketingTrigger}`} {...triggerProps}>
          Sign in
        </button>
      )}

      {open && (
        <div id={panelId} className={styles.panel}>
          <p className={styles.label}>Sign in to</p>
          <ul className={styles.list}>
            {SIGN_IN_APPS.map((app) => (
              <li key={app.href}>
                <a href={app.href} className={styles.item} onClick={() => setOpen(false)}>
                  <span className={styles.body}>
                    <span className={styles.name}>{app.name}</span>
                    <span className={styles.line}>{app.line}</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
