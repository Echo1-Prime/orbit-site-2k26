import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createResendMailer, getMailer, stubMailer } from '../lib/academy-mailer.ts';

const LINK = 'https://academy.example.test/academy?invite=abc.def';

function fakeFetch(status: number) {
  const calls: { url: string; init: RequestInit }[] = [];
  const impl = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response('{}', { status });
  }) as unknown as typeof fetch;
  return { impl, calls };
}

test('posts to Resend with bearer auth, the link, and the default sender', async () => {
  const { impl, calls } = fakeFetch(200);
  await createResendMailer({ apiKey: 'k_test', fetchImpl: impl }).sendSignInLink('rep@example.com', LINK);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  const headers = calls[0].init.headers as Record<string, string>;
  assert.equal(headers.Authorization, 'Bearer k_test');
  const body = JSON.parse(String(calls[0].init.body));
  assert.deepEqual(body.to, ['rep@example.com']);
  assert.match(body.from, /noreply@guardian\.echo1labs\.com/);
  assert.ok(body.text.includes(LINK));
  assert.ok(body.html.includes(LINK));
});

test('ACADEMY_MAIL_FROM style override is used', async () => {
  const { impl, calls } = fakeFetch(200);
  await createResendMailer({ apiKey: 'k', from: 'Academy <a@example.test>', fetchImpl: impl }).sendSignInLink('rep@example.com', LINK);
  assert.equal(JSON.parse(String(calls[0].init.body)).from, 'Academy <a@example.test>');
});

test('a non-2xx answer throws and logs the status only, never the link or address', async () => {
  const { impl } = fakeFetch(403);
  const logged: string[] = [];
  const orig = console.warn;
  console.warn = (...a: unknown[]) => void logged.push(a.join(' '));
  try {
    await assert.rejects(createResendMailer({ apiKey: 'k', fetchImpl: impl }).sendSignInLink('rep@example.com', LINK));
  } finally {
    console.warn = orig;
  }
  const out = logged.join('\n');
  assert.match(out, /403/);
  assert.ok(!out.includes('rep@example.com'));
  assert.ok(!out.includes('invite='));
});

test('getMailer falls back to the stub with no key and uses Resend with one', () => {
  const prev = process.env.RESEND_API_KEY;
  try {
    delete process.env.RESEND_API_KEY;
    assert.equal(getMailer(), stubMailer);
    process.env.RESEND_API_KEY = 'k_test';
    assert.notEqual(getMailer(), stubMailer);
  } finally {
    if (prev === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = prev;
  }
});
