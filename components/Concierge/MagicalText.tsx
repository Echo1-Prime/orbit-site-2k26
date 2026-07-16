'use client';

import { useTypewriter } from '@/hooks/useTypewriter';
import styles from './Concierge.module.css';

// Letter-by-letter "magical" reveal with a glowing caret. animate=false shows
// the full text at once (reduced motion / older messages).
export default function MagicalText({ text, animate }: { text: string; animate: boolean }) {
  const { displayed, done } = useTypewriter(text, { enabled: animate });
  return (
    <span>
      {displayed}
      {animate && !done && <span className={styles.caret} aria-hidden="true" />}
    </span>
  );
}
