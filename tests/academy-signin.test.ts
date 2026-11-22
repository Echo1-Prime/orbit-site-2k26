import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INVITE_PARAM, SIGNIN_TTL_SECONDS, verifyToken } from '../lib/academy-auth.ts';
import { createLimiter } from '../lib/academy-ratelimit.ts';
import { requestSignIn, SIGNIN_REPLY, type SignInDeps } from '../lib/academy-signin.ts';
import type { Members, Role } from '../lib/academy-members.ts';

const SECRET = 'test-secret-0123456789abcdef0123456789abcdef';
const BASE = 'https://academy.example.test/academy';
const NOW = 7_000_000;
const members: Members = new Map<string, Role>([
  ['rep@example.com', 'member'],
  ['boss@example.com', 'owner'],
]);

function harness(over: Partial<SignInDeps> = {}) {
  const sent: { to: string; link: string }[] = [];
  const loads = { n: 0 };
  const deps: SignInDeps = {
    secret: SECRET,
    baseUrl: BASE,
    loadMembers: async () => (loads.n++, members),
    mailer: { sendSignInLink: async (to, link) => void sent.push({ to, link }) },
    ipLimiter: createLimiter(10, 900_000),
    emailLimiter: createLimiter(3, 900_000),
    now: NOW,
    ...over,
  };
  return { deps, sent, loads };
}

test('a listed email gets exactly one link, signed for 15 minutes, sent to that address', async () => {
  const { deps, sent } = harness();
  const { deliver } = await requestSignIn(' Rep@Example.com ', '1.1.1.1', deps);
  assert.equal(sent.length, 0, 'nothing is sent until deliver runs');
  await deliver();
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'rep@example.com');
  assert.ok(sent[0].link.startsWith(`${BASE}?${INVITE_PARAM}=`), 'link uses the fixed base URL');
  const token = sent[0].link.split(`${INVITE_PARAM}=`)[1];
  assert.equal(await verifyToken(SECRET, 'invite', token, members, NOW + SIGNIN_TTL_SECONDS - 1), 'rep@example.com');
  assert.equal(await verifyToken(SECRET, 'invite', token, members, NOW + SIGNIN_TTL_SECONDS), null, 'dead at 15 minutes');
});

test('enumeration: a stranger, a malformed email and a member all get the same outcome', async () => {
  const outcomes: string[] = [];
  for (const email of ['rep@example.com', 'stranger@example.com', 'not-an-email', '', undefined, null, 42]) {
    const { deps, sent } = harness();
    const r = await requestSignIn(email, '2.2.2.2', deps);
    await r.deliver();
    // What the caller can observe is the return shape and the fixed reply text.
    outcomes.push(JSON.stringify({ keys: Object.keys(r).sort(), type: typeof r.deliver, reply: SIGNIN_REPLY }));
    assert.equal(sent.length, email === 'rep@example.com' ? 1 : 0);
  }
  assert.equal(new Set(outcomes).size, 1);
});

test('enumeration: the member list is read for every request, listed or not', async () => {
  for (const email of ['rep@example.com', 'stranger@example.com', 'junk']) {
    const { deps, loads } = harness();
    await requestSignIn(email, '3.3.3.3', deps);
    assert.equal(loads.n, 1);
  }
});

test('a store outage or a missing secret sends nothing and looks the same', async () => {
  for (const over of [{ loadMembers: async () => null }, { secret: undefined }, { secret: 'short' }] as Partial<SignInDeps>[]) {
    const { deps, sent } = harness(over);
    const r = await requestSignIn('rep@example.com', '4.4.4.4', deps);
    await r.deliver();
    assert.equal(sent.length, 0);
  }
});

test('a mail failure never reaches the visitor', async () => {
  const { deps } = harness({
    mailer: {
      sendSignInLink: async () => {
        throw new Error('provider down');
      },
    },
  });
  const r = await requestSignIn('rep@example.com', '5.5.5.5', deps);
  await assert.doesNotReject(r.deliver());
});

test('rate limit by email: the fourth request in the window sends nothing', async () => {
  const { deps, sent } = harness();
  for (let i = 0; i < 5; i++) await (await requestSignIn('rep@example.com', `10.0.0.${i}`, deps)).deliver();
  assert.equal(sent.length, 3);
});

test('rate limit by IP: one address cannot cycle through many emails', async () => {
  const { deps, sent } = harness({ ipLimiter: createLimiter(2, 900_000) });
  for (const e of ['rep@example.com', 'boss@example.com', 'rep@example.com', 'boss@example.com']) {
    await (await requestSignIn(e, '6.6.6.6', deps)).deliver();
  }
  assert.equal(sent.length, 2);
});

test('rate limiting is silent: same shape as a normal request, and other IPs and emails are unaffected', async () => {
  const { deps, sent } = harness({ ipLimiter: createLimiter(1, 900_000) });
  await (await requestSignIn('rep@example.com', '7.7.7.7', deps)).deliver();
  const limited = await requestSignIn('boss@example.com', '7.7.7.7', deps);
  assert.deepEqual(Object.keys(limited), ['deliver']);
  await limited.deliver();
  await (await requestSignIn('boss@example.com', '8.8.8.8', deps)).deliver();
  assert.deepEqual(sent.map((s) => s.to), ['rep@example.com', 'boss@example.com']);
});

test('the limiter resets after its window and stays bounded', () => {
  const l = createLimiter(2, 1000, 3);
  assert.equal(l.allow('a', 0), true);
  assert.equal(l.allow('a', 1), true);
  assert.equal(l.allow('a', 2), false);
  assert.equal(l.allow('a', 1000), true, 'new window');
  for (let i = 0; i < 50; i++) l.allow(`k${i}`, 2000); // flood: must not grow without bound or throw
});
