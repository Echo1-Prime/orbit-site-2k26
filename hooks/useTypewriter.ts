'use client';

import { useEffect, useRef, useState } from 'react';

// Streaming-safe typewriter: reveals characters up to the current `text` length,
// catching up as streamed tokens grow it. Because each concierge message mounts
// its own instance (keyed by message id), a new message starts fresh at 0.
// enabled=false (reduced motion) shows the full text immediately.
export function useTypewriter(text: string, { charDelay = 18, enabled = true } = {}) {
  const [n, setN] = useState(0);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      setN((prev) => (prev < textRef.current.length ? prev + 1 : prev));
    }, charDelay);
    return () => clearInterval(id);
  }, [enabled, charDelay]);

  if (!enabled) return { displayed: text, done: true };
  const displayed = text.slice(0, Math.min(n, text.length));
  return { displayed, done: n >= text.length };
}
