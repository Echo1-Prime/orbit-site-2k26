'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { OrbitMark } from '@/components/ao/core/OrbitMark';
import { GhostButton } from '@/components/ao/feedback/GhostButton';
import { DEST, FAQ, STARTERS, UNKNOWN_TEXT } from './chrome-data';
import { ghostProps } from './ghost';
import type { Msg } from './useConcierge';
import styles from './SiteChrome.module.css';

interface Props {
  msgs: Msg[];
  mobile: boolean;
  keyboard: number;
  reduced: boolean;
  onClose: () => void;
  onAsk: (text: string) => void;
  onRetry: () => void;
}

/** 440 px right side sheet at 760+, bottom sheet below (rides visualViewport so the input stays
 *  above the keyboard). Introduces itself as an agent in first person. */
export default function ConciergePanel({ msgs, mobile, keyboard, reduced, onClose, onAsk, onRetry }: Props) {
  const [input, setInput] = useState('');
  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    opener.current = document.activeElement;
    if (!mobile) {
      const t = setTimeout(() => inputRef.current?.focus(), 380);
      return () => clearTimeout(t);
    }
  }, [mobile]);

  useEffect(
    () => () => {
      if (opener.current instanceof HTMLElement) opener.current.focus();
    },
    [],
  );

  useEffect(() => {
    const b = bodyRef.current;
    if (b) requestAnimationFrame(() => b.scrollTo({ top: b.scrollHeight, behavior: reduced ? 'auto' : 'smooth' }));
  }, [msgs, reduced]);

  const asked = msgs.filter((m) => m.kind === 'user').map((m) => (m as { text: string }).text);
  const moreChips = STARTERS.filter((s) => !asked.includes(s));
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight;
  const sheetStyle = mobile
    ? { bottom: keyboard, height: Math.round(Math.min(vh * 0.88, vh - keyboard - 24)) }
    : undefined;

  return (
    <>
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <aside
        id="e1-concierge"
        role="dialog"
        aria-modal="true"
        aria-label="Agent Orbit concierge"
        className={`${styles.sheet} ${mobile ? styles.sheetMobile : ''}`}
        style={sheetStyle}
      >
        {mobile && (
          <div className={styles.grabber} aria-hidden="true">
            <span />
          </div>
        )}
        <div className={styles.sheetHead}>
          <OrbitMark size={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className={styles.sheetName}>Agent Orbit</p>
            <p className={styles.agentTag}>
              <span className={styles.agentDot} />
              Agent · Not a person
            </p>
          </div>
          <button type="button" className={styles.pill} onClick={onClose}>
            Close
          </button>
        </div>

        <div ref={bodyRef} className={styles.body}>
          <div>
            <p className={styles.label}>Agent Orbit</p>
            <p className={styles.prose}>
              Agent Orbit here. I am an agent, not a person. I answer from published pages only, and I will hand you to a human whenever you want one.
            </p>
          </div>

          {msgs.length === 0 && (
            <div className={styles.starters}>
              {STARTERS.map((s) => (
                <button key={s} type="button" className={styles.starter} onClick={() => onAsk(s)}>
                  <span>{s}</span>
                  <span className={styles.arrow}>→</span>
                </button>
              ))}
            </div>
          )}

          {msgs.map((m) => {
            if (m.kind === 'user') return <div key={m.id} className={styles.userMsg}>{m.text}</div>;
            if (m.kind === 'typing')
              return (
                <div key={m.id} className={styles.typing} role="status">
                  <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
                  <span>Drafting an answer</span>
                </div>
              );
            if (m.kind === 'agent' || m.kind === 'unknown') {
              const unknown = m.kind === 'unknown';
              const d = DEST[unknown ? 'start' : m.dest];
              return (
                <div key={m.id} className={styles.agentMsg}>
                  <p className={`${styles.label} ${unknown ? styles.labelHandoff : ''}`}>
                    {unknown ? 'Agent Orbit · Handoff' : 'Agent Orbit'}
                  </p>
                  <p className={styles.prose}>{unknown ? UNKNOWN_TEXT : m.text}</p>
                  <Link href={d.route} onClick={onClose} className={`${styles.destCard} ${styles.destInline}`}>
                    <span className={styles.destBody}>
                      <span className={styles.destEyebrow} style={{ color: 'var(--ao-orbit)' }}>{d.eyebrow}</span>
                      <span className={styles.destTitle} style={{ fontSize: 18 }}>{d.title}</span>
                      <span className={styles.destLine}>{d.line}</span>
                    </span>
                    <span className={styles.arrow}>→</span>
                  </Link>
                </div>
              );
            }
            return (
              <div key={m.id} className={styles.errorStack}>
                <div className={styles.errorBox}>
                  <p className={styles.errorLabel}>Connection dropped</p>
                  <p className={styles.errorText}>
                    I lost the connection before I could answer. These cover most questions while I reconnect.
                  </p>
                </div>
                <div className={styles.faq}>
                  {FAQ.map((f, i) => (
                    <div key={f.q} className={`${styles.faqItem} ${open === i ? styles.faqOpen : ''}`}>
                      <button type="button" className={styles.faqQ} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                        <span>{f.q}</span>
                        <span className={styles.faqCaret} aria-hidden="true">▼</span>
                      </button>
                      {open === i && <p className={styles.faqA}>{f.a}</p>}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex' }}>
                  <GhostButton {...ghostProps('secondary', 'sm', { minHeight: 40 })} onClick={onRetry}>
                    ⟳ Retry
                  </GhostButton>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.foot}>
          {msgs.length > 0 && moreChips.length > 0 && (
            <div className={styles.chips}>
              {moreChips.map((s) => (
                <button key={s} type="button" className={styles.chip} onClick={() => onAsk(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <form
            className={`${styles.form} ${focus ? styles.formFocus : ''}`}
            onSubmit={(e) => {
              e.preventDefault();
              onAsk(input);
              setInput('');
            }}
          >
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="Ask about Titan, Signal, or how it works"
              aria-label="Message Agent Orbit"
              enterKeyHint="send"
            />
            <button type="submit" className={styles.send} aria-label="Send">
              →
            </button>
          </form>
          <p className={styles.fineprint}>Published pages only · Pricing is set with you</p>
        </div>
      </aside>
    </>
  );
}
