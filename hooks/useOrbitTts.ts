'use client';

// Sentence-queued ElevenLabs playback. Enqueue text as the LLM streams; each
// sentence is fetched + played in order so speech starts on sentence one. An
// AnalyserNode exposes a 0..1 amplitude `level` to drive the Compass Mark glow.
// Degrades silently (no audio) when the TTS route is unconfigured.

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseOrbitTts {
  speaking: boolean;
  level: number;
  enqueue: (text: string) => void;
  stop: () => void;
  available: boolean;
}

export function useOrbitTts(): UseOrbitTts {
  const [speaking, setSpeaking] = useState(false);
  const [level, setLevel] = useState(0);
  const [available, setAvailable] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const queueRef = useRef<string[]>([]);
  const playingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const ensureAudioGraph = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.crossOrigin = 'anonymous';
      audioRef.current = el;
    }
    if (!ctxRef.current) {
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (Ctx) {
        const ctx = new Ctx();
        const src = ctx.createMediaElementSource(audioRef.current!);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        src.connect(analyser);
        analyser.connect(ctx.destination);
        ctxRef.current = ctx;
        analyserRef.current = analyser;
      }
    }
    ctxRef.current?.resume().catch(() => {});
  }, []);

  const meter = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    setLevel(Math.min(1, Math.sqrt(sum / data.length) * 3));
    rafRef.current = requestAnimationFrame(meter);
  }, []);

  const playNext = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    const text = queueRef.current.shift();
    if (!text) {
      playingRef.current = false;
      setSpeaking(false);
      setLevel(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    try {
      const res = await fetch('/api/concierge/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        if (res.status === 503) setAvailable(false);
        queueRef.current = [];
        playingRef.current = false;
        setSpeaking(false);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      el.src = url;
      el.onended = () => { URL.revokeObjectURL(url); playNext(); };
      await el.play();
      if (!rafRef.current) meter();
    } catch {
      queueRef.current = [];
      playingRef.current = false;
      setSpeaking(false);
    }
  }, [meter]);

  const enqueue = useCallback((text: string) => {
    const clean = text.trim();
    if (!clean || !available) return;
    ensureAudioGraph();
    queueRef.current.push(clean);
    if (!playingRef.current) {
      playingRef.current = true;
      setSpeaking(true);
      playNext();
    }
  }, [available, ensureAudioGraph, playNext]);

  const stop = useCallback(() => {
    queueRef.current = [];
    playingRef.current = false;
    setSpeaking(false);
    setLevel(0);
    const el = audioRef.current;
    if (el) { el.pause(); el.currentTime = 0; }
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  }, []);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    ctxRef.current?.close().catch(() => {});
  }, []);

  return { speaking, level, enqueue, stop, available };
}
