// Sample data only: synthetic Zoom payloads. Tokens are non-hex placeholders.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ingestKey, isZoomDownloadUrl, parseRecordingCompleted, parseTranscriptCompleted } from '../lib/academy-zoom.ts';

const event = (files: unknown[], extra: Record<string, unknown> = {}) => ({
  event: 'recording.transcript_completed',
  download_token: 'testtoken',
  payload: { object: { uuid: 'sample-uuid==', id: 123, recording_files: files } },
  ...extra,
});
const TX = { file_type: 'TRANSCRIPT', status: 'completed', download_url: 'https://us02web.zoom.us/rec/webhook_download/sample/tx' };

test('parseTranscriptCompleted reads the uuid, token and the TRANSCRIPT file', () => {
  const t = parseTranscriptCompleted(event([{ file_type: 'MP4', download_url: 'https://zoom.us/mp4' }, TX]));
  assert.deepEqual(t, { uuid: 'sample-uuid==', downloadToken: 'testtoken', url: TX.download_url });
});

test('the transcript key equals the recording key for the same uuid', () => {
  const t = parseTranscriptCompleted(event([TX]));
  assert.ok(t);
  assert.equal(ingestKey(t.uuid), ingestKey('sample-uuid=='));
  assert.match(ingestKey(t.uuid), /^[0-9a-f]{24}$/);
});

test('a completed transcript file is preferred over one still processing', () => {
  const t = parseTranscriptCompleted(event([{ ...TX, status: 'processing', download_url: 'https://zoom.us/early' }, TX]));
  assert.equal(t?.url, TX.download_url);
});

test('parseTranscriptCompleted refuses other events, missing parts and non-Zoom hosts', () => {
  assert.equal(parseTranscriptCompleted({ ...event([TX]), event: 'recording.completed' }), null);
  assert.equal(parseTranscriptCompleted(event([TX], { download_token: undefined })), null);
  assert.equal(parseTranscriptCompleted({ ...event([TX]), payload: { object: { recording_files: [TX] } } }), null);
  assert.equal(parseTranscriptCompleted(event([{ file_type: 'MP4', download_url: 'https://zoom.us/mp4' }])), null);
  for (const url of ['http://zoom.us/tx', 'https://evilzoom.us/tx', 'https://zoom.us.evil.com/tx', 'not a url']) {
    assert.equal(parseTranscriptCompleted(event([{ ...TX, download_url: url }])), null, url);
  }
  assert.equal(parseTranscriptCompleted(null), null);
  assert.equal(parseTranscriptCompleted('x'), null);
});

test('isZoomDownloadUrl allows only https zoom.us and its subdomains on the default port', () => {
  for (const ok of ['https://zoom.us/rec/x', 'https://us02web.zoom.us/rec/webhook_download/x', 'https://ZOOM.US/x']) {
    assert.equal(isZoomDownloadUrl(ok), true, ok);
  }
  for (const bad of [
    'http://zoom.us/x',
    'https://evilzoom.us/x',
    'https://zoom.us.evil.com/x',
    'https://zoom.us:8443/x',
    'https://user:pw@zoom.us/x',
    'https://169.254.169.254/latest',
    'file:///etc/passwd',
    'not a url',
    '',
  ]) {
    assert.equal(isZoomDownloadUrl(bad), false, bad);
  }
});

test('the MP4 parser still ignores a transcript event', () => {
  assert.equal(parseRecordingCompleted(event([TX])), null);
});
