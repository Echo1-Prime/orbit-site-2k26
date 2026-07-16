/**
 * Voice lint — runs against all LP copy decks in lib/landing/*.ts
 * Enforces VOICE-RULES.md thresholds.
 *
 * Usage: npx ts-node scripts/voice-lint.ts
 * Add to CI: "voice-lint": "ts-node scripts/voice-lint.ts"
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COPY_DIR = path.join(__dirname, '../lib/landing');
const EM_DASH = ' — ';
const WORDS_PER_UNIT = 500;
const EM_DASH_WARN = 3;
const EM_DASH_FAIL = 5;
const DESC_VAR_WARN = 40;
const DESC_VAR_FAIL = 20;

const BANNED: [string, string][] = [
  ['delve', 'sounds like every LLM demo response'],
  ['\\bleverage\\b(?! ratio| buyout| points)', '"leverage [verb]" — use "use" or "get more from"'],
  ['\\butilize\\b', 'use "use"'],
  ['\\bstreamline\\b', 'describe the actual thing that gets faster'],
  ['\\brobust\\b', 'say what specifically it handles'],
  ['\\bseamlessly\\b', 'describe the actual connection'],
  ['\\bharness\\b(?! strap| mount)', '"harness [verb]" — describe what you actually do'],
  ['\\btransformative\\b', 'name what changed and how'],
  ['\\brevolutionize\\b', 'show the before/after instead'],
  ['cutting-edge', 'overused; say what specifically is different'],
  ['state-of-the-art', 'overused; say what specifically is different'],
  ['game-chang', 'overused without evidence'],
  ['synerg', 'vague; describe the actual interaction'],
  ['\\bholistic\\b', 'describe the actual scope'],
  ['actionable insights', 'name the specific action and metric'],
  ['pain points', 'name the actual friction'],
  ['\\bAI-written\\b', 'do not describe our content output this way externally'],
  ['\\bAI-generated\\b', 'do not describe our content output this way externally'],
  ['\\bAI-powered\\b', 'describe the capability, not the tech stack'],
  ['human-supervised', 'rewrite: say who reviews it and when'],
  ['purpose-built', '"built for" or "designed for [specific context]"'],
  ['\\bmoreover\\b', 'use "and" or restructure the sentence'],
  ['\\bfurthermore\\b', 'use "and" or restructure the sentence'],
  ['in conclusion', 'just say the conclusion'],
  ["it'?s important to note", 'just say the thing'],
  ["in today'?s .{0,30} (world|landscape|environment|market)", '"today" is not a context; be specific'],
  ['a testament to', 'show the proof instead of naming it a testament'],
  ['\\bcomprehensive\\b', 'list what it covers instead'],
  ['\\bunlock\\b(?! the door| your phone)', '"unlock [metaphor]" — name what opens up'],
  ['\\bempower\\b', 'say what they can now do'],
  ['\\belevate\\b', 'say how it improves and by what measure'],
  ['not just .{0,30} — .{0,30}', 'balanced antithesis (em-dash type) — max 1 per page; check count'],
  ['\\bend-to-end\\b(?!.*workflow|.*build|.*process)', '"end-to-end" as filler — be specific about the span'],
];

interface Finding {
  file: string;
  type: 'FAIL' | 'WARN';
  message: string;
}

const findings: Finding[] = [];

function flag(file: string, type: Finding['type'], message: string) {
  findings.push({ file, type, message });
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function getStrings(text: string): string[] {
  const matches: string[] = [];
  const re = /['"`]([^'"`\n]{10,})[`'"]/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

function getDescLengths(text: string): number[] {
  const re = /desc:\s*['"`]([^'"`]+)['"`]/g;
  const lengths: number[] = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    lengths.push(m[1].length);
  }
  return lengths;
}

function checkFile(filePath: string) {
  const rel = path.relative(process.cwd(), filePath);
  const raw = fs.readFileSync(filePath, 'utf8');

  // Strip TS syntax to get prose strings only
  const strings = getStrings(raw);
  const prose = strings.join(' ');
  const words = countWords(prose);

  // --- Banned phrases ---
  for (const [pattern, reason] of BANNED) {
    const re = new RegExp(pattern, 'gi');
    const matches = prose.match(re);
    if (matches && matches.length > 0) {
      flag(rel, 'FAIL', `Banned phrase "${matches[0]}" found (${matches.length}×) — ${reason}`);
    }
  }

  // --- Em dash density ---
  const emDashes = (raw.match(/ — /g) || []).length;
  const units = Math.max(1, words / WORDS_PER_UNIT);
  const emPerUnit = emDashes / units;
  if (emPerUnit > EM_DASH_FAIL) {
    flag(rel, 'FAIL', `Em dash density too high: ${emDashes} em dashes / ~${Math.round(words)} words (${emPerUnit.toFixed(1)}/500w — limit ${EM_DASH_FAIL})`);
  } else if (emPerUnit > EM_DASH_WARN) {
    flag(rel, 'WARN', `Em dash density elevated: ${emDashes} em dashes / ~${Math.round(words)} words (${emPerUnit.toFixed(1)}/500w — warn at ${EM_DASH_WARN})`);
  }

  // --- Capability desc variance ---
  const descLengths = getDescLengths(raw);
  if (descLengths.length >= 3) {
    const variance = Math.max(...descLengths) - Math.min(...descLengths);
    if (variance < DESC_VAR_FAIL) {
      flag(rel, 'FAIL', `Capability desc lengths too uniform: variance=${variance} chars (min=${Math.min(...descLengths)}, max=${Math.max(...descLengths)}) — AI uniformity signal, fail threshold ${DESC_VAR_FAIL}`);
    } else if (variance < DESC_VAR_WARN) {
      flag(rel, 'WARN', `Capability desc lengths close: variance=${variance} chars — human writing varies more, warn threshold ${DESC_VAR_WARN}`);
    }
  }

  // --- Balanced antithesis count ---
  const antithesisPatterns = [
    /not just .{1,50} — .{1,50}/gi,
    /not only .{1,40} but .{1,40}/gi,
    /[a-z]+-supervised, [a-z]+-[a-z]+/gi,
  ];
  let antithesisCount = 0;
  for (const pat of antithesisPatterns) {
    antithesisCount += (prose.match(pat) || []).length;
  }
  if (antithesisCount > 2) {
    flag(rel, 'FAIL', `Balanced antithesis overuse: ${antithesisCount} instances — max 1 per page`);
  } else if (antithesisCount > 1) {
    flag(rel, 'WARN', `Balanced antithesis: ${antithesisCount} instances — watch limit`);
  }
}

// ── Run across all LP copy decks ──────────────────────────────

const files = fs.readdirSync(COPY_DIR)
  .filter(f => f.endsWith('.ts') && f !== 'types.ts')
  .map(f => path.join(COPY_DIR, f));

for (const f of files) {
  checkFile(f);
}

// ── Report ────────────────────────────────────────────────────

const failures = findings.filter(f => f.type === 'FAIL');
const warnings = findings.filter(f => f.type === 'WARN');

if (findings.length === 0) {
  console.log('✅  Voice lint passed — no AI signals detected.\n');
  process.exit(0);
}

if (warnings.length > 0) {
  console.log(`⚠️   ${warnings.length} warning(s):\n`);
  for (const w of warnings) {
    console.log(`  WARN  ${w.file}`);
    console.log(`        ${w.message}\n`);
  }
}

if (failures.length > 0) {
  console.log(`❌  ${failures.length} failure(s):\n`);
  for (const f of failures) {
    console.log(`  FAIL  ${f.file}`);
    console.log(`        ${f.message}\n`);
  }
  console.log('See lib/landing/VOICE-RULES.md for guidance.\n');
  process.exit(1);
}

process.exit(0);
