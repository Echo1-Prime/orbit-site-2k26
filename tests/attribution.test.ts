import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanAttr } from '../lib/attribution.ts';
import { leadText } from '../lib/slack.ts';

test('cleanAttr strips control characters and angle brackets, trims and caps', () => {
  assert.equal(cleanAttr('use-case-oil-and-gas'), 'use-case-oil-and-gas');
  assert.equal(cleanAttr('a\u0000b\nc\td<script>'), 'a b c d script');
  assert.equal(cleanAttr('x'.repeat(500), 60).length, 60);
  assert.equal(cleanAttr(undefined), '');
  assert.equal(cleanAttr(42), '');
});

test('leadText names the button, the previous page, the first page and the referrer', () => {
  const t = leadText(
    {
      name: 'A',
      email: 'a@b.co',
      attribution: { src: 'use-case-oil-and-gas', cta: 'hero', from: '/use-cases/oil-and-gas', landing: '/', ref: 'www.google.com/', utm: 'utm_source=g&utm_campaign=x' },
    },
    1760000000,
  );
  assert.match(t, /Came from: use-case-oil-and-gas \(hero\)/);
  assert.match(t, /Previous page: \/use-cases\/oil-and-gas/);
  assert.match(t, /First page this visit: \//);
  assert.match(t, /Sent here by: www\.google\.com\//);
  assert.match(t, /Campaign tags: utm_source=g&amp;utm_campaign=x/);
});

test('leadText says so when nothing is known, and still works without attribution', () => {
  const t = leadText({ name: 'A', email: 'a@b.co', attribution: { src: '', cta: '', from: '', landing: '/contact', ref: '', utm: '' } }, 1760000000);
  assert.match(t, /Came from: no campaign tag/);
  assert.match(t, /Previous page: none \(opened the contact page directly\)/);
  assert.match(t, /Sent here by: no outside referrer/);
  assert.doesNotMatch(leadText({ name: 'A', email: 'a@b.co' }, 1760000000), /Came from/);
});

test('leadText escapes Slack markup in attribution text', () => {
  const t = leadText({ name: 'A', email: 'a@b.co', attribution: { src: '<!channel>', cta: '', from: '', landing: '', ref: '', utm: '' } }, 1760000000);
  assert.doesNotMatch(t, /<!channel>/);
});

// The module keeps one in-memory state per page load, so each case imports a fresh copy.
async function fresh(win: { pathname: string; host: string; search: string }, referrer: string) {
  Object.assign(globalThis, { window: { location: win }, document: { referrer } });
  return import(`../lib/attribution.ts?case=${Math.random()}`);
}

test('an outside referrer is kept as host and path only, never the query string', async () => {
  const a = await fresh({ pathname: '/', host: 'www.echo1labs.com', search: '?utm_source=google&utm_medium=cpc' }, 'https://www.google.com/search?q=secret');
  a.initAttribution();
  Object.assign(globalThis, { window: { location: { pathname: '/contact', host: 'www.echo1labs.com', search: '?src=nav' } } });
  a.trackPath('/contact');
  const r = a.readAttribution();
  assert.equal(r.ref, 'www.google.com/search');
  assert.equal(r.landing, '/');
  assert.equal(r.from, '/');
  assert.equal(r.src, 'nav');
  assert.equal(r.utm, 'utm_source=google&utm_medium=cpc');
});

test('a same-site referrer (a link opened in a new tab) becomes the previous page, not an outside referrer', async () => {
  const a = await fresh({ pathname: '/contact', host: 'www.echo1labs.com', search: '?src=use-case-trucking&cta=closing' }, 'https://www.echo1labs.com/use-cases/trucking');
  const r = a.readAttribution();
  assert.equal(r.ref, '');
  assert.equal(r.from, '/use-cases/trucking');
  assert.equal(r.landing, '/contact');
  assert.equal(r.src, 'use-case-trucking');
  assert.equal(r.cta, 'closing');
});

test('opening the contact page directly records nothing but the landing page', async () => {
  const a = await fresh({ pathname: '/contact', host: 'www.echo1labs.com', search: '' }, '');
  const r = a.readAttribution();
  assert.deepEqual(r, { src: '', cta: '', from: '', landing: '/contact', ref: '', utm: '' });
});

test('route changes move the previous page along and ignore repeats', async () => {
  const a = await fresh({ pathname: '/', host: 'www.echo1labs.com', search: '' }, '');
  a.trackPath('/case-studies');
  a.trackPath('/case-studies');
  a.trackPath('/contact');
  Object.assign(globalThis, { window: { location: { pathname: '/contact', host: 'www.echo1labs.com', search: '' } } });
  assert.equal(a.readAttribution().from, '/case-studies');
  assert.equal(a.readAttribution().landing, '/');
});
