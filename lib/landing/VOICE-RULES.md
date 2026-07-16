# Echo 1 Labs — Copy Voice Rules (Anti-Detection)

**Enforced by:** `scripts/voice-lint.ts` (run in CI and on every LP copy edit)  
**Applies to:** `lib/landing/*.ts`, product page copy, any client-facing prose  
**Last updated:** 2026-07-16

---

## How AI Content Gets Detected

Detection tools (GPTZero, Originality.ai, Turnitin, Copyleaks, Winston AI, Content at Scale)
measure three core signals. Google's Helpful Content system uses the same signals for ranking.

### 1. Perplexity — word-choice predictability
AI selects the statistically most likely next word. Low-perplexity text reads as AI-generated.
**Fix:** Use specific, concrete, unexpected word choices. "The deal sat in a queue for nine days"
beats "deals experience processing delays."

### 2. Burstiness — sentence length variance
Human writing mixes very short and very long sentences naturally. AI produces sentences of
near-identical length per paragraph.
**Fix:** Every block of copy must contain at least one sentence under 8 words AND at least one
over 25 words. Fragment sentences are a feature, not a bug.

### 3. Vocabulary distribution — the "AI word list"
Certain words are statistically overrepresented in LLM output. Detectors pattern-match these.
Google's spam classifiers are trained on the same lists.

### 4. Structural uniformity — parallel structures
AI generates parallel bullet structures with near-identical grammatical form and character count.
Capability cards with ≤20-char variance in description length will score as AI-generated.

### 5. Named-entity density
AI uses generic descriptors ("companies," "teams," "operators") rather than specific proper nouns,
real tools, and role names. Low named-entity density is a strong detection signal.

### 6. Balanced antithesis overuse
AI loves `not just X — also Y`, `not only A but B`, `X-supervised, Y-typed` constructions.
One per page maximum.

---

## Hard Rules (lint FAILS on these)

### Banned phrases
These terms appear in every major AI detection blocklist. Their presence increases AI-detection
score regardless of surrounding context.

```
delve / delving / delved
leverage (as a verb: "leverage your team")
utilize / utilization
streamline / streamlined
robust
seamlessly / seamless
harness (as a verb: "harness the power")
transformative
revolutionize / revolutionary
cutting-edge
state-of-the-art
game-changer / game-changing
synergy / synergies / synergistic
holistic
innovative / innovation (as empty descriptors)
actionable insights
pain points
end-to-end (when used as filler, not describing a literal workflow span)
AI-written (never describe our content output this way externally)
AI-generated
AI-powered (externally facing)
human-supervised (obvious machine-process framing)
purpose-built
moreover
furthermore
in conclusion
"it's important to note"
"in today's [X] landscape / environment / world"
"a testament to"
"comprehensive solution"
unlock (as a metaphor: "unlock growth")
empower / empowering
elevate (as marketing verb: "elevate your sales")
```

### Structural rules
- **Em dash budget:** Max 3 em dashes per 500 words of copy. revops/titan/signal LPs had 14–15 — 5× over.
- **Capability desc variance:** Min 40-char difference between shortest and longest description in a set.
- **Sentence pattern repeat:** No more than 2 consecutive sentences with the same opening word or grammatical form.
- **Balanced antithesis:** Max 1 per page. ("not just X — also Y" / "X-supervised, Y-typed")
- **Three-item parallel lists:** No more than 2 per page. AI defaults to threes.

---

## What to Do Instead

### Replace AI vocabulary with operator language

| Don't write | Write instead |
|-------------|---------------|
| leverage your stack | use your stack / get more out of your stack |
| seamlessly integrates | connects to / works with / plugs into |
| purpose-built for | built for / designed for teams that |
| human-supervised | reviewed by your team / your ops lead approves |
| AI-written sequences | sequences the system builds and runs |
| actionable insights | the numbers that tell you what to fix |
| end-to-end workflow | the full job, start to finish |
| holistic approach | the whole motion, not just one piece |
| pain points | the thing that's eating your team's time |
| transformative | the word that changed things was [specific thing] |

### Add human signals that defeat perplexity scoring

1. **Name the real tool.** "Your Salesforce instance" beats "your CRM." "The Outreach sequence" beats "the outbound tool."
2. **Use specific numbers with context.** "40% of their week" is human. "significant portion of their time" is AI.
3. **Write one-sentence paragraphs for emphasis.** Detectors expect paragraphs.
4. **Include a contrarian clause.** "This won't work if your pipeline is under 50 leads/mo." Specificity and limitation = human.
5. **Direct address fragments.** "You know this story." "That's the job." No AI writes that way naturally.
6. **Vary sentence openers.** Never start more than 2 consecutive sentences with a noun phrase or gerund.

---

## Voice Lint — Thresholds

Run `npx ts-node scripts/voice-lint.ts` before any LP ships.

| Check | Warn | Fail |
|-------|------|------|
| Banned phrases | any | any |
| Em dashes per 500 words | >3 | >5 |
| Capability desc length variance | <40 chars | <20 chars |
| Consecutive same-opening sentences | 2 | 3+ |
| Balanced antithesis patterns | >1 | >2 |

---

## Why This Matters Beyond Detection

Detected AI content → Google Helpful Content downgrade → organic traffic loss.  
Detected AI content in sales sequences → Outreach/Apollo/HubSpot spam scoring → deliverability drop.  
Detected AI content by a prospect → instant trust kill. Operators buying $8–50K/mo services read carefully.

The goal is not to hide AI involvement. The goal is to write the way a real operator would write —
because that's who Echo 1 Labs is.
