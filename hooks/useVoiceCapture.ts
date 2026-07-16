'use client';

// Web Speech API STT, wrapped behind a stable interface so a streaming cloud
// STT (Deepgram) can swap in later without touching the UI. Chromium-only today;
// callers must gate the mic button on `supported`.

import { useCallback, useEffect, useRef, useState } from 'react';

type VoiceState = 'idle' | 'listening' | 'denied' | 'error';

interface UseVoiceCapture {
  supported: boolean;
  state: VoiceState;
  interim: string;
  start: () => void;
  stop: () => void;
}

export function useVoiceCapture(onFinal: (text: string) => void): UseVoiceCapture {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<VoiceState>('idle');
  const [interim, setInterim] = useState('');
  const recRef = useRef<any>(null);
  const wantOnRef = useRef(false);
  const onFinalRef = useRef(onFinal);
  onFinalRef.current = onFinal;

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    setSupported(true);
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onresult = (e: any) => {
      let interimText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          const text = r[0].transcript.trim();
          if (text) onFinalRef.current(text);
        } else {
          interimText += r[0].transcript;
        }
      }
      setInterim(interimText);
    };
    rec.onerror = (e: any) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        wantOnRef.current = false;
        setState('denied');
      } else if (e.error !== 'no-speech' && e.error !== 'aborted') {
        setState('error');
      }
    };
    rec.onend = () => {
      // Chromium ends the session on silence; restart while the user still wants voice.
      if (wantOnRef.current) {
        try { rec.start(); } catch { /* already starting */ }
      } else {
        setInterim('');
        setState('idle');
      }
    };
    recRef.current = rec;

    return () => {
      wantOnRef.current = false;
      try { rec.stop(); } catch { /* noop */ }
    };
  }, []);

  const start = useCallback(() => {
    const rec = recRef.current;
    if (!rec) return;
    wantOnRef.current = true;
    setState('listening');
    try { rec.start(); } catch { /* already running */ }
  }, []);

  const stop = useCallback(() => {
    const rec = recRef.current;
    wantOnRef.current = false;
    setInterim('');
    setState('idle');
    try { rec?.stop(); } catch { /* noop */ }
  }, []);

  return { supported, state, interim, start, stop };
}
