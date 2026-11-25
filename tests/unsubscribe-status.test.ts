import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ALL_UNSUBSCRIBE_STATUSES,
  resolveUnsubscribeStatus,
  unsubscribeCopy,
} from '../lib/unsubscribe-status.ts';

test('handler statuses map to their own copy', () => {
  assert.equal(resolveUnsubscribeStatus('already'), 'already');
  assert.equal(resolveUnsubscribeStatus('invalid'), 'invalid');
  assert.equal(resolveUnsubscribeStatus('notfound'), 'notfound');
});

test('no status (handler success redirect) and unknown values read as success', () => {
  assert.equal(resolveUnsubscribeStatus(undefined), 'success');
  assert.equal(resolveUnsubscribeStatus(''), 'success');
  assert.equal(resolveUnsubscribeStatus('<script>'), 'success');
  assert.equal(resolveUnsubscribeStatus(['notfound', 'already']), 'notfound');
});

test('failure states offer the manual fallback, success states do not', () => {
  assert.equal(unsubscribeCopy('success').showManual, false);
  assert.equal(unsubscribeCopy('already').showManual, false);
  assert.equal(unsubscribeCopy('invalid').showManual, true);
  assert.equal(unsubscribeCopy('notfound').showManual, true);
});

test('copy passes the brand lint: no em dashes, no retired brand name', () => {
  for (const s of ALL_UNSUBSCRIBE_STATUSES) {
    const { heading, body } = unsubscribeCopy(s);
    for (const text of [heading, body]) {
      assert.ok(!text.includes(String.fromCharCode(0x2014)), `em dash in ${s}: ${text}`);
      assert.ok(!/mingma/i.test(text), `retired brand in ${s}: ${text}`);
    }
  }
});
