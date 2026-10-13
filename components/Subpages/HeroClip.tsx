'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Hero clip for a subpage. No video request before hydration, and none on phones, Data Saver or reduced
 *  motion: those show the clip's still frame (#t=0.5) with metadata only. The clip has no audio track and is
 *  decorative, so it is hidden from assistive technology. */
export default function HeroClip({ src }: { src: string }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 759px)');
    const read = () => setNarrow(mq.matches);
    read();
    mq.addEventListener('change', read);
    const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSaveData(!!c?.saveData);
    setMounted(true);
    return () => mq.removeEventListener('change', read);
  }, []);

  if (!mounted) return null;
  const still = reduced || saveData || narrow;
  return (
    <video
      key={src + String(still)}
      src={still ? src + '#t=0.5' : src}
      muted
      autoPlay={!still}
      loop
      playsInline
      preload={still ? 'metadata' : 'auto'}
      aria-hidden="true"
      ref={(el) => {
        if (el) {
          el.muted = true;
          el.defaultMuted = true;
        }
      }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}
