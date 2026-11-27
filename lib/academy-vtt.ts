// Zoom transcript (WebVTT) rules: parse, cue starts, end time, speaker labels, compact lines, and
// the accept/retry rule for downloading the file. No network and no storage, so they run the same
// in /hooks/zoom and in tests. Contract: Projects/sales-academy/04-CALL-TO-LESSON-DESIGN.md (S2).
//
// Zoom facts used here (Zoom support KB0064927 and devforum, read 2026-11-27):
//   - The cloud audio transcript is a WebVTT file: numbered cues, a "start --> end" line, then text.
//   - The speaker is written at the start of the cue text as "Name: text"; unknown voices can show
//     as "Unknown Speaker".
// UNVERIFIED: that this account's files follow that form. S2 checks it on one real file. The parser
// fails closed: a cue whose speaker it cannot read is kept with `speaker: null`, and S3 treats any
// such cue as an outside voice (consent needed), never as staff.

export type Cue = { startSec: number; endSec: number; speaker: string | null; text: string };
export type Vtt = { cues: Cue[]; endSec: number };

// Raw files over this size are refused. A 60-minute call is about 60 to 100 KB.
export const MAX_VTT_CHARS = 5_000_000;

const BOM = '﻿';
const TIMING = /^(?:(\d+):)?(\d{2}):(\d{2})[.,](\d{3})\s+-->\s+(?:(\d+):)?(\d{2}):(\d{2})[.,](\d{3})/;
// "Name: text". The name is up to 60 characters and 6 words, with no colon, "?" or "!".
const SPEAKER = /^([^:?!]{1,60}?):\s+(\S[\s\S]*)$/;

const secs = (h: string | undefined, m: string, s: string, ms: string) =>
  Number(h ?? 0) * 3600 + Number(m) * 60 + Number(s) + Number(ms) / 1000;

// True when the text is a WebVTT file. Zoom can answer with an HTML page while the file is not
// ready, so this is the only test of "the transcript arrived".
export function isVtt(text: string): boolean {
  return text.replace(BOM, '').startsWith('WEBVTT');
}

export function splitSpeaker(text: string): { speaker: string | null; text: string } {
  const m = SPEAKER.exec(text);
  if (!m) return { speaker: null, text };
  const label = m[1].trim();
  if (!label || label.split(/\s+/).length > 6) return { speaker: null, text };
  return { speaker: label, text: m[2].trim() };
}

// Returns null for anything that is not WebVTT. Cues with no text are dropped; NOTE, STYLE and
// REGION blocks are skipped because they have no timing line.
export function parseVtt(raw: string): Vtt | null {
  if (!isVtt(raw) || raw.length > MAX_VTT_CHARS) return null;
  const blocks = raw.replace(BOM, '').replace(/\r\n?/g, '\n').split(/\n{2,}/);
  const cues: Cue[] = [];
  let endSec = 0;
  for (const block of blocks) {
    const lines = block.split('\n');
    const at = lines.findIndex((l) => l.includes('-->'));
    if (at < 0) continue;
    const t = TIMING.exec(lines[at].trim());
    if (!t) continue;
    const startSec = secs(t[1], t[2], t[3], t[4]);
    const end = secs(t[5], t[6], t[7], t[8]);
    if (!(end > startSec)) continue;
    const body = lines.slice(at + 1).map((l) => l.trim()).filter(Boolean).join(' ');
    if (!body) continue;
    cues.push({ startSec, endSec: end, ...splitSpeaker(body) });
    endSec = Math.max(endSec, end);
  }
  return { cues, endSec };
}

export const cueStarts = (vtt: Vtt): number[] => vtt.cues.map((c) => c.startSec).sort((a, b) => a - b);

// Distinct speaker labels in order of first appearance, exactly as written, and how many cues had
// no readable speaker (one or more of those means consent is needed, per D1).
export function speakerLabels(vtt: Vtt): { labels: string[]; unlabeledCues: number } {
  const labels: string[] = [];
  let unlabeledCues = 0;
  for (const c of vtt.cues) {
    if (c.speaker === null) unlabeledCues++;
    else if (!labels.includes(c.speaker)) labels.push(c.speaker);
  }
  return { labels, unlabeledCues };
}

export function mmss(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

// The model's view of the call: one line per cue, "[mm:ss] Speaker: text". Minutes run past 59 on a
// long call. Labels are passed in already replaced (S3 prepareTranscript); null means no label.
export function compactLines(cues: Cue[]): string {
  return cues.map((c) => `[${mmss(c.startSec)}] ${c.speaker ? `${c.speaker}: ` : ''}${c.text}`).join('\n');
}

// ---- Download rule ----

export type TranscriptAttempt = { ok: true; text: string } | { ok: false; reason: string };

// One download's verdict. Anything but a WebVTT body counts as "not ready yet".
export function judgeTranscriptResponse(status: number, body: string): TranscriptAttempt {
  if (status < 200 || status > 299) return { ok: false, reason: `Zoom answered ${status}` };
  if (body.length > MAX_VTT_CHARS) return { ok: false, reason: 'transcript too large' };
  if (!isVtt(body)) return { ok: false, reason: 'not a WEBVTT file yet' };
  return { ok: true, text: body };
}

export const TRANSCRIPT_RETRY_MS = 60_000;

// Try once; if that fails, wait and try exactly once more (Zoom can fire the event before the file
// is ready). After that an owner fetches it by hand while Zoom's 24 hours last. Never throws.
export async function downloadWithOneRetry(
  attempt: () => Promise<TranscriptAttempt>,
  sleep: (ms: number) => Promise<void>,
  retryMs: number = TRANSCRIPT_RETRY_MS,
): Promise<TranscriptAttempt & { tries: number }> {
  const once = () => attempt().catch((e): TranscriptAttempt => ({ ok: false, reason: e instanceof Error ? e.message.slice(0, 200) : 'download failed' }));
  const first = await once();
  if (first.ok) return { ...first, tries: 1 };
  await sleep(retryMs);
  return { ...(await once()), tries: 2 };
}
