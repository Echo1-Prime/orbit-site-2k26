# Debug report: Agent Orbit launcher mark off-centre (2026-10-13)

**Symptom (Josh, screenshot 2026-10-13 09:11):** the Agent Orbit mark inside the "AGENT ORBIT · TAP TO ASK" launcher ring sat low and to the right of the ring's centre.

**Root cause:** two launcher stylesheets stacked. `styles/ao/navigation.css` (design system) centres the mark with `position:absolute; left:50%; top:50%; transform:translate(-50%,-50%)`. `styles/ao/site.css` (the S1 handoff patch, loaded later, from #31 `37744f6`) set `.ao-launcher__mark { position: relative }` and centred it with grid on the button. The DS `left/top: 50%` and the translate still applied, now as relative offsets, so the mark moved by half the button's inner width minus half the mark: 43 − 27.5 = 15.5 px on desktop (88 px launcher), 35 − 22.5 = 12.5 px on phones (72 px).

**Fix:** `styles/ao/site.css`, `.ao-launcher__mark`: `position: relative` to `position: absolute` (one word). The DS centring then applies as designed; the ring was already centred.

## Evidence before (production `dpl_5or5zVLod5WzqkH8KwMmmz84wSqX`, 2026-10-13)
| Viewport | Button centre | Ring centre | Mark centre | Offset |
|---|---|---|---|---|
| 1517 x 820 | (755, 762) | (755, 762) | (770.5, 777.5) | +15.5, +15.5 |
| 390 x 844 phone | (195, 794) | (195, 794) | (207.5, 806.5) | +12.5, +12.5 |

Mark wrapper computed: `position: relative; left: 43px; top: 43px; transform: matrix(1,0,0,1,-27.5,-27.5)`.

## Evidence after (local production build of this branch)
| Page, viewport | At rest | Hover / drag rule (scale 1.06) | Other band theme |
|---|---|---|---|
| `/`, 1517 x 820 | 0.00, 0.00 | 0.00, 0.00 | 0.00, 0.00 |
| `/`, 390 x 844 phone | 0.00, 0.00 | 0.00, 0.00 | 0.00, 0.00 |
| `/automated-lead-generation`, 1440 x 900 | 0.00, 0.00 | 0.00, 0.00 | 0.00, 0.00 |

## Regression surfaces
| Surface | Result |
|---|---|
| Launcher centring, desktop and phone, home and a product page | PASS (table above) |
| Hover scale keeps centre | PASS |
| Light and dark band themes | PASS |
| Concierge opens from the launcher, Escape closes it | PASS |
| Minimize hides the launcher (`aria-hidden="true"`), restore shows it | PASS |
| axe `label-content-name-mismatch`, `button-name`, `color-contrast` on the launcher | PASS (0 violations) |
| `/use-cases/trucking` | NOT APPLICABLE: that route uses the older concierge, no launcher, unchanged |
| `next build` | PASS |
| Production after merge | verified after the merge (deployment and the same measurement on www.echo1labs.com) |
| Safari, a real phone | NOT TESTED here |

## Rollback
`git revert -m 1 <merge sha>` through a PR to `main`, or roll production back to `dpl_5or5zVLod5WzqkH8KwMmmz84wSqX` in Vercel.

## Open loops
- The launcher has two overlapping style layers (DS `navigation.css` and the handoff patch in `site.css`); other properties may still collide. Consolidating them is a separate task.
