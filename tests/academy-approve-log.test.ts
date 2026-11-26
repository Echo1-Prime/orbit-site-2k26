import { test } from 'node:test';
import assert from 'node:assert/strict';
import { logApproval } from '../lib/academy-ingest-store.ts';

function capture(level: 'warn' | 'error', fn: () => void): string[] {
  const lines: string[] = [];
  const orig = console[level];
  console[level] = (msg: unknown) => void lines.push(String(msg));
  try {
    fn();
  } finally {
    console[level] = orig;
  }
  return lines;
}

test('an approval failure logs the step, the key and the error class and message on one line', () => {
  const err = new Error('Access denied\nsecond line');
  err.name = 'BlobAccessError';
  const lines = capture('error', () => logApproval('error', 'copy', 'testkey', err));
  assert.deepEqual(lines, ['[academy-approve] step=copy key=testkey err="BlobAccessError: Access denied\\nsecond line"']);
});

test('a refusal reason is logged as text and a step with no error has no err field', () => {
  assert.deepEqual(capture('error', () => logApproval('error', 'plan', 'abc', 'Choose a person on the member list.')), [
    '[academy-approve] step=plan key=abc err="Choose a person on the member list."',
  ]);
  assert.deepEqual(capture('warn', () => logApproval('warn', 'approved:P01', 'abc')), ['[academy-approve] step=approved:P01 key=abc']);
});

test('a long error message is cut to 300 characters', () => {
  const [line] = capture('error', () => logApproval('error', 'manifest', 'abc', 'x'.repeat(1000)));
  assert.equal(line, `[academy-approve] step=manifest key=abc err="${'x'.repeat(300)}"`);
});
