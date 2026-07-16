'use client';

// Orbit concierge — browse / text / voice with an A2P consent gate, streaming
// answers (AI SDK + gateway Claude), ElevenLabs voice-out, Web Speech voice-in,
// client tools (showDashboard, navigateTo), and a Compass Mark state machine.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from 'ai';
import OrbitAvatar, { type AvatarState } from '@/components/OrbitAvatar/OrbitAvatar';
import DashboardPanel from './DashboardPanel';
import MagicalText from './MagicalText';
import { useVoiceCapture } from '@/hooks/useVoiceCapture';
import { useOrbitTts } from '@/hooks/useOrbitTts';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CONCIERGE_EVENT, type ConciergeMode } from '@/lib/concierge-bus';
import { isNavRoute } from '@/lib/concierge/routes';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '@/lib/site';
import styles from './Concierge.module.css';

type View = 'closed' | 'consent' | 'panel';

const GREETING = "I'm Orbit, Echo 1 Labs' AI concierge. Where does the business feel stuck?";

export default function Concierge() {
  const router = useRouter();
  const [view, setView] = useState<View>('closed');
  const [mode, setMode] = useState<ConciergeMode>('text');
  const [input, setInput] = useState('');
  const [dashboard, setDashboard] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [reveal, setReveal] = useState(false);
  const spoken = useRef<{ id: string; len: number }>({ id: '', len: 0 });
  const logRef = useRef<HTMLDivElement>(null);

  const tts = useOrbitTts();
  const reduced = useReducedMotion();

  const { messages, sendMessage, addToolOutput, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/concierge/chat' }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    onError: () => setOffline(true),
    async onToolCall({ toolCall }) {
      if (toolCall.dynamic) return;
      if (toolCall.toolName === 'showDashboard') {
        const product = (toolCall.input as { product: string }).product;
        setDashboard(product);
        addToolOutput({ tool: 'showDashboard', toolCallId: toolCall.toolCallId, output: { shown: true, product } });
      } else if (toolCall.toolName === 'navigateTo') {
        const route = (toolCall.input as { route: string }).route;
        if (isNavRoute(route)) router.push(route);
        addToolOutput({ tool: 'navigateTo', toolCallId: toolCall.toolCallId, output: { navigated: isNavRoute(route), route } });
      }
    },
  });

  const send = useCallback((text: string) => {
    const t = text.trim();
    if (!t) return;
    setOffline(false);
    tts.stop(); // barge-in: cut any current speech when a new turn starts
    sendMessage({ text: t });
  }, [sendMessage, tts]);

  // Voice-in: final transcripts become messages.
  const voice = useVoiceCapture(send);

  const open = useCallback((m: ConciergeMode) => {
    if (m === 'browse') { setView('closed'); return; }
    setMode(m);
    setView(m === 'voice' ? 'consent' : 'panel');
    setReveal(true);
    setTimeout(() => setReveal(false), 900);
  }, []);

  // Event-bus wiring (hero / header / CTA triggers).
  useEffect(() => {
    const handler = (e: Event) => open(((e as CustomEvent<{ mode: ConciergeMode }>).detail?.mode) ?? 'text');
    window.addEventListener(CONCIERGE_EVENT, handler as EventListener);
    return () => window.removeEventListener(CONCIERGE_EVENT, handler as EventListener);
  }, [open]);

  // Esc closes; closing stops voice + speech.
  useEffect(() => {
    if (view === 'closed') { voice.stop(); tts.stop(); return; }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setView('closed'); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, voice, tts]);

  // Sentence-chunk streaming assistant text → TTS (voice mode only).
  useEffect(() => {
    if (mode !== 'voice' || !messages.length) return;
    const last = messages[messages.length - 1];
    if (last.role !== 'assistant') return;
    const text = last.parts.filter((p) => p.type === 'text').map((p: any) => p.text).join('');
    if (spoken.current.id !== last.id) spoken.current = { id: last.id, len: 0 };
    const rest = text.slice(spoken.current.len);
    const re = /(.+?[.!?])(\s+|$)/gs;
    let m: RegExpExecArray | null;
    let consumed = 0;
    while ((m = re.exec(rest))) { tts.enqueue(m[1]); consumed = m.index + m[0].length; }
    spoken.current.len += consumed;
    // Flush the tail once the stream is done.
    if (status === 'ready' && spoken.current.len < text.length) {
      tts.enqueue(text.slice(spoken.current.len));
      spoken.current.len = text.length;
    }
  }, [messages, status, mode, tts]);

  // Auto-scroll the transcript.
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [messages, dashboard]);

  const busy = status === 'submitted' || status === 'streaming';
  const markState: AvatarState = useMemo(() => {
    if (reveal) return 'reveal';
    if (tts.speaking) return 'speaking';
    if (busy) return 'thinking';
    if (voice.state === 'listening') return 'listening';
    return 'idle';
  }, [reveal, busy, tts.speaking, voice.state]);

  const toggleMic = () => {
    if (voice.state === 'listening') voice.stop();
    else { tts.stop(); voice.start(); }
  };

  const grantMic = () => { setView('panel'); voice.start(); };

  return (
    <>
      <button
        type="button"
        className={styles.launcher}
        aria-label="Ask Orbit, the Echo 1 Labs concierge"
        aria-expanded={view !== 'closed'}
        onClick={() => (view === 'closed' ? open('text') : setView('closed'))}
      >
        <OrbitAvatar size="md" state={view === 'closed' ? 'idle' : markState} level={tts.level} reduced={reduced} aria-label="Orbit" />
        <span className={styles.launcherLabel}>Ask Orbit</span>
      </button>

      {view !== 'closed' && (
        <div className={styles.panel} role="dialog" aria-label="Orbit concierge">
          <header className={styles.head}>
            <div className={styles.headTitle}>
              <OrbitAvatar size="sm" state={markState} level={tts.level} reduced={reduced} aria-label="Orbit" />
              <div>
                <div className={styles.headName}>Orbit</div>
                <div className={styles.headSub}>Echo 1 Labs AI concierge</div>
              </div>
            </div>
            <button type="button" className={styles.close} aria-label="Close" onClick={() => setView('closed')}>×</button>
          </header>

          {view === 'consent' ? (
            <div className={styles.body}>
              <p className={styles.greeting}>Talk to Orbit</p>
              <p className={styles.note}>
                Orbit is an AI concierge. To talk, it needs your microphone. Your speech is converted
                to text so Orbit can respond — audio is not stored. See our <a href="/privacy">privacy policy</a>.
              </p>
              <div className={styles.consentActions}>
                <button type="button" className="btn btn--primary btn--sm" onClick={grantMic}>Allow microphone</button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setMode('text'); setView('panel'); }}>
                  Type instead
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.log} ref={logRef} role="log" aria-live="polite">
                <div className={`${styles.msg} ${styles.msgOrbit}`}>
                  <MagicalText text={GREETING} animate={!reduced && messages.length === 0} />
                </div>

                {messages.map((msg, i) => {
                  const text = msg.parts.filter((p) => p.type === 'text').map((p: any) => p.text).join('');
                  const usedDash = msg.parts.some((p: any) => p.type === 'tool-showDashboard');
                  const isLastAssistant = msg.role === 'assistant' && i === messages.length - 1;
                  return (
                    <div key={msg.id} className={`${styles.msg} ${msg.role === 'user' ? styles.msgUser : styles.msgOrbit}`}>
                      {msg.role === 'assistant'
                        ? <MagicalText text={text} animate={!reduced && isLastAssistant} />
                        : text}
                      {usedDash && <span className={styles.toolNote}> · showing a demo below</span>}
                    </div>
                  );
                })}

                {voice.interim && <div className={`${styles.msg} ${styles.msgUser} ${styles.msgInterim}`}>{voice.interim}</div>}
                {busy && <div className={styles.typing}>Orbit is thinking…</div>}
                {dashboard && <DashboardPanel slug={dashboard} />}
                {offline && (
                  <div className={styles.offline}>
                    Orbit is offline right now. Reach the team at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or{' '}
                    <a href={`tel:${CONTACT_PHONE_DISPLAY.replace(/[^0-9+]/g, '')}`}>{CONTACT_PHONE_DISPLAY}</a>.
                  </div>
                )}
              </div>

              <form
                className={styles.inputRow}
                onSubmit={(e) => { e.preventDefault(); send(input); setInput(''); }}
              >
                {voice.supported && (
                  <button
                    type="button"
                    className={`${styles.mic} ${voice.state === 'listening' ? styles.micOn : ''}`}
                    aria-label={voice.state === 'listening' ? 'Stop voice' : 'Start voice'}
                    aria-pressed={voice.state === 'listening'}
                    onClick={toggleMic}
                  >
                    {voice.state === 'listening' ? '◉' : '🎙'}
                  </button>
                )}
                <input
                  className={styles.input}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={voice.state === 'listening' ? 'Listening…' : 'Ask Orbit anything'}
                  aria-label="Message Orbit"
                />
                <button type="submit" className={styles.sendBtn} aria-label="Send" disabled={!input.trim()}>→</button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
