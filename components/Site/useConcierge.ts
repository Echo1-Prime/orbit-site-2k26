'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { answer, type Answer } from './chrome-data';

export type Msg =
  | { id: string; kind: 'user'; text: string }
  | { id: string; kind: 'typing' }
  | { id: string; kind: 'agent'; text: string; dest: import('./chrome-data').DestKey }
  | { id: string; kind: 'unknown' }
  | { id: string; kind: 'error' };

/** Concierge state machine from the handoff: idle, typing, answer, "I do not know, here is a
 *  human", error with static FAQ fallback. `answer()` is a stub; swap it for a service later. */
export function useConcierge(reduced: boolean) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const last = useRef<{ text: string; opt?: { diag?: boolean } } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const settle = useCallback((id: string, a: Answer) => {
    setMsgs((m): Msg[] => [...m.filter((x) => x.kind !== 'typing'), { id: id + 'a', ...a } as Msg]);
    setBusy(false);
  }, []);

  const ask = useCallback(
    (raw: string, opt?: { diag?: boolean }) => {
      const text = raw.trim();
      if (!text || busy) return;
      const id = 'm' + Date.now();
      last.current = { text, opt };
      setMsgs((m): Msg[] => [...m, { id: id + 'u', kind: 'user', text }, { id: id + 't', kind: 'typing' }]);
      setBusy(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => settle(id, answer(text, opt)), reduced ? 500 : 1100 + Math.round(Math.random() * 500));
    },
    [busy, reduced, settle],
  );

  const retry = useCallback(() => {
    const q = last.current;
    if (!q || busy) return;
    const id = 'r' + Date.now();
    setMsgs((m): Msg[] => [...m.filter((x) => x.kind !== 'error'), { id: id + 't', kind: 'typing' }]);
    setBusy(true);
    timer.current = setTimeout(() => {
      let a = answer(q.text.replace(/offline/gi, ''), q.opt);
      if (a.kind === 'error') a = { kind: 'unknown' };
      settle(id, a);
    }, 900);
  }, [busy, settle]);

  const clearPending = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setBusy(false);
    setMsgs((m) => m.filter((x) => x.kind !== 'typing'));
  }, []);

  return { msgs, busy, ask, retry, clearPending };
}
