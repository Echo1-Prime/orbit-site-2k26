// Sample data only: every transcript below is synthetic.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  compactLines,
  cueStarts,
  downloadWithOneRetry,
  isVtt,
  judgeTranscriptResponse,
  MAX_VTT_CHARS,
  mmss,
  parseVtt,
  speakerLabels,
  splitSpeaker,
  type TranscriptAttempt,
} from '../lib/academy-vtt.ts';

const SAMPLE = [
  'WEBVTT',
  '',
  '1',
  '00:00:01.000 --> 00:00:04.500',
  'Sample Rep: Thanks for making the time today.',
  '',
  '2',
  '00:00:04.500 --> 00:00:09.000',
  'Sample Guest: Happy to. Here is the problem:',
  'our close takes nine days.',
  '',
  'NOTE this block has no timing and is skipped',
  '',
  '3',
  '00:00:09.000 --> 00:00:12.250',
  'Unknown Speaker: Can you hear me?',
  '',
  '4',
  '00:00:12.250 --> 00:00:15.000',
  'And this cue has no speaker at all',
  '',
  '5',
  '01:02:03.000 --> 01:02:05.000',
  'Sample Rep: Wrapping up.',
  '',
].join('\n');

test('isVtt accepts a WEBVTT header (with or without BOM) and refuses HTML', () => {
  assert.equal(isVtt(SAMPLE), true);
  assert.equal(isVtt('﻿' + SAMPLE), true);
  assert.equal(isVtt('<!DOCTYPE html><html>not ready</html>'), false);
  assert.equal(isVtt(''), false);
});

test('parseVtt reads cues, multi-line text, speakers and the end time', () => {
  const v = parseVtt(SAMPLE.replace(/\n/g, '\r\n'));
  assert.ok(v);
  assert.equal(v.cues.length, 5);
  assert.deepEqual(v.cues[0], { startSec: 1, endSec: 4.5, speaker: 'Sample Rep', text: 'Thanks for making the time today.' });
  assert.equal(v.cues[1].speaker, 'Sample Guest');
  assert.equal(v.cues[1].text, 'Happy to. Here is the problem: our close takes nine days.');
  assert.equal(v.cues[2].speaker, 'Unknown Speaker');
  assert.equal(v.cues[3].speaker, null);
  assert.equal(v.cues[4].startSec, 3723);
  assert.equal(v.endSec, 3725);
});

test('parseVtt refuses non-VTT and oversize input, and drops empty or backwards cues', () => {
  assert.equal(parseVtt('<html></html>'), null);
  assert.equal(parseVtt('WEBVTT\n\n' + 'x'.repeat(MAX_VTT_CHARS)), null);
  const v = parseVtt('WEBVTT\n\n00:00:05.000 --> 00:00:02.000\nSample Rep: backwards\n\n00:00:06.000 --> 00:00:07.000\n\n00:00:08.000 --> 00:00:09.000\nSample Rep: ok');
  assert.ok(v);
  assert.equal(v.cues.length, 1);
  assert.equal(v.cues[0].text, 'ok');
});

test('parseVtt accepts short MM:SS.mmm timings', () => {
  const v = parseVtt('WEBVTT\n\n01:05.000 --> 01:07.500\nSample Rep: short form');
  assert.ok(v);
  assert.equal(v.cues[0].startSec, 65);
  assert.equal(v.cues[0].endSec, 67.5);
});

test('splitSpeaker fails closed on text that only looks like a label', () => {
  assert.deepEqual(splitSpeaker('Sample Rep: hello'), { speaker: 'Sample Rep', text: 'hello' });
  assert.deepEqual(splitSpeaker('Sample Rep (Sample Co): hello'), { speaker: 'Sample Rep (Sample Co)', text: 'hello' });
  // more than 6 words before the colon is a sentence, not a name
  assert.equal(splitSpeaker('So the one thing I want to say is: this').speaker, null);
  // a question is not a name
  assert.equal(splitSpeaker('Why now? Because: reasons').speaker, null);
  // a clock time has no space after the colon
  assert.equal(splitSpeaker('At 10:30 we start').speaker, null);
  assert.equal(splitSpeaker('no colon here').speaker, null);
});

test('speakerLabels lists distinct labels in first-seen order and counts unlabeled cues', () => {
  const v = parseVtt(SAMPLE);
  assert.ok(v);
  assert.deepEqual(speakerLabels(v), { labels: ['Sample Rep', 'Sample Guest', 'Unknown Speaker'], unlabeledCues: 1 });
});

test('cueStarts is sorted; mmss and compactLines format past an hour', () => {
  const v = parseVtt(SAMPLE);
  assert.ok(v);
  assert.deepEqual(cueStarts(v), [1, 4.5, 9, 12.25, 3723]);
  assert.equal(mmss(0), '00:00');
  assert.equal(mmss(3723.9), '62:03');
  assert.equal(mmss(-5), '00:00');
  const lines = compactLines(v.cues).split('\n');
  assert.equal(lines[0], '[00:01] Sample Rep: Thanks for making the time today.');
  assert.equal(lines[3], '[00:12] And this cue has no speaker at all');
  assert.equal(lines[4], '[62:03] Sample Rep: Wrapping up.');
});

test('judgeTranscriptResponse: only a 2xx WEBVTT body is accepted', () => {
  assert.deepEqual(judgeTranscriptResponse(200, SAMPLE), { ok: true, text: SAMPLE });
  assert.equal(judgeTranscriptResponse(200, '<html>processing</html>').ok, false);
  assert.equal(judgeTranscriptResponse(404, SAMPLE).ok, false);
  assert.equal(judgeTranscriptResponse(401, '').ok, false);
  assert.equal(judgeTranscriptResponse(200, 'WEBVTT' + 'x'.repeat(MAX_VTT_CHARS)).ok, false);
});

test('downloadWithOneRetry: success first time does not wait', async () => {
  const waits: number[] = [];
  const r = await downloadWithOneRetry(async () => ({ ok: true, text: SAMPLE }), async (ms) => void waits.push(ms));
  assert.equal(r.ok, true);
  assert.equal(r.tries, 1);
  assert.deepEqual(waits, []);
});

test('downloadWithOneRetry: not ready, then ready after one 60 s wait', async () => {
  const waits: number[] = [];
  const answers: TranscriptAttempt[] = [{ ok: false, reason: 'not a WEBVTT file yet' }, { ok: true, text: SAMPLE }];
  const r = await downloadWithOneRetry(async () => answers.shift()!, async (ms) => void waits.push(ms));
  assert.equal(r.ok, true);
  assert.equal(r.tries, 2);
  assert.deepEqual(waits, [60_000]);
});

test('downloadWithOneRetry: tries exactly twice, and a thrown error counts as a failed try', async () => {
  let calls = 0;
  const r = await downloadWithOneRetry(
    async () => {
      calls++;
      throw new Error('socket hang up');
    },
    async () => {},
  );
  assert.equal(calls, 2);
  assert.equal(r.tries, 2);
  assert.deepEqual(r, { ok: false, reason: 'socket hang up', tries: 2 });
});
