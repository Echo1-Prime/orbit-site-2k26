# S3 inventory: the ten handoff subpages

Produced 2026-10-12 with `dc_inventory.py` (skill `design-handoff-to-nextjs-generator`, draft PR 127) on the ten `*.dc.html` files. Copy for each band is in `copy.json`.

## What the inventory shows

- Eight product pages (Engine, RevOps, Broadcast, Signal, Ledger, Titan, Prime, AI Readiness) have four or five `section[data-band]` bands, three or four distinct bindings, no `sc-if` or `sc-for`, and the same three design system components (StatusBadge, GhostButton, NotificationItem). Info Management and Voice Agents are a single hero band with one component.
- Bindings: `vid` (hero clip, five pages), `badgeFill` and `start` (shared shape, identical on every page), `act` (the notification action labels, different on each page). Nothing else, so the page generator needs none of the home generator's responsive variable table.
- The handoff footer is nested inside the last band of the eight product pages. The two hero-only pages have no footer.
- Hex literals in the page markup are only `#FF7515`, `#0E0B1A` and `#FFFFFF`, all mapped to tokens. The flagged old-palette values and the crossed orange `#FF6A00` live in the `<helmet>` block, which is not carried over.
- `[STAT:*]` placeholders: none. Em dashes in the source: none.
- Media: engine, broadcast, info-management and voice-agents have a clip each; Titan uses the home clip `/videos/home/hero-titan.mp4`. The other five pages have no clip. All four handoff clips carry an audio track and two are over 8 MB.
- Fictional company names appear in the illustrative rows (Josh, 2026-10-12: fictional, so they stay).

Generator: `scripts/subpages-from-handoff/build_page.py`. Raw tool output follows.

## Echo 1 Labs Engine.dc.html (36879 bytes)

### Bands (5)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | Engine | Find the accounts worth chasing. | - | 5 |
| 2 | - | dark | - | Inside Engine | - | - | 19 |
| 3 | - | light | light | What Engine does | - | - | 10 |
| 4 | - | dark | - | How it runs | Every agent starts at Shadow. It earns the next rung. | - | 15 |
| 5 | - | dark | - | Next | - | - | 11 |

### Bindings
unique: 4; total uses: 9
names: badgeFill x5, start x2, vid x1, act x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x2, StatusBadge x5, NotificationItem x1
hover: 9, focus: 0

### Media
files: media/subpages/engine-hero.mp4
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": "media/subpages/engine-hero.mp4"}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs RevOps.dc.html (35865 bytes)

### Bands (4)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | RevOps | Every deal moving. Every follow-up sent. | - | 22 |
| 2 | - | light | light | What RevOps does | - | - | 10 |
| 3 | - | dark | - | How it runs | Every agent starts at Shadow. It earns the next rung. | - | 15 |
| 4 | - | dark | - | Next | - | - | 12 |

### Bindings
unique: 3; total uses: 8
names: badgeFill x5, start x2, act x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x2, StatusBadge x5, NotificationItem x1
hover: 9, focus: 0

### Media
files: none
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": ""}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs Broadcast.dc.html (36989 bytes)

### Bands (5)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | Broadcast | Content that sounds like you. | - | 5 |
| 2 | - | dark | - | Inside Broadcast | - | - | 19 |
| 3 | - | light | light | What Broadcast does | - | - | 10 |
| 4 | - | dark | - | How it runs | Every agent starts at Shadow. It earns the next rung. | - | 15 |
| 5 | - | dark | - | Next | - | - | 12 |

### Bindings
unique: 4; total uses: 9
names: badgeFill x5, start x2, vid x1, act x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x2, StatusBadge x5, NotificationItem x1
hover: 9, focus: 0

### Media
files: media/subpages/broadcast-hero.mp4
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": "media/subpages/broadcast-hero.mp4"}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs Signal.dc.html (37216 bytes)

### Bands (4)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | Signal | Find the business worth buying. | - | 22 |
| 2 | - | light | light | What Signal does | M&A deal sourcing, from thesis to first call. | - | 15 |
| 3 | - | dark | - | How it runs | Every agent starts at Shadow. It earns the next rung. | - | 15 |
| 4 | - | dark | - | Next | - | - | 12 |

### Bindings
unique: 3; total uses: 8
names: badgeFill x5, start x2, act x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x2, StatusBadge x5, NotificationItem x1
hover: 9, focus: 0

### Media
files: none
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": ""}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs Ledger.dc.html (35822 bytes)

### Bands (4)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | Ledger | Books closed before month end. | - | 22 |
| 2 | - | light | light | What Ledger does | - | - | 10 |
| 3 | - | dark | - | How it runs | Every agent starts at Shadow. It earns the next rung. | - | 15 |
| 4 | - | dark | - | Next | - | - | 12 |

### Bindings
unique: 3; total uses: 8
names: badgeFill x5, start x2, act x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x2, StatusBadge x5, NotificationItem x1
hover: 9, focus: 0

### Media
files: none
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": ""}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs Titan.dc.html (36989 bytes)

### Bands (5)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | Titan | Plan set in. Priced bid out. | - | 5 |
| 2 | - | dark | - | Inside Titan | - | - | 19 |
| 3 | - | light | light | What Titan does | - | - | 10 |
| 4 | - | dark | - | How it runs | Every agent starts at Shadow. It earns the next rung. | - | 15 |
| 5 | - | dark | - | Next | - | - | 12 |

### Bindings
unique: 4; total uses: 9
names: badgeFill x5, start x2, vid x1, act x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x2, StatusBadge x5, NotificationItem x1
hover: 9, focus: 0

### Media
files: media/home/hero-titan.mp4
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": "media/home/hero-titan.mp4"}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs Prime.dc.html (35939 bytes)

### Bands (4)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | Prime | Every agent starts supervised. | - | 22 |
| 2 | - | light | light | What Prime does | - | - | 10 |
| 3 | - | dark | - | How it runs | Every agent starts at Shadow. It earns the next rung. | - | 15 |
| 4 | - | dark | - | Next | - | - | 12 |

### Bindings
unique: 3; total uses: 8
names: badgeFill x5, start x2, act x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x2, StatusBadge x5, NotificationItem x1
hover: 9, focus: 0

### Media
files: none
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": ""}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs AI Readiness.dc.html (35724 bytes)

### Bands (4)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | AI Readiness | Process first. Agents second. | - | 22 |
| 2 | - | light | light | What AI Readiness does | - | - | 10 |
| 3 | - | dark | - | How it runs | Every agent starts at Shadow. It earns the next rung. | - | 15 |
| 4 | - | dark | - | Next | - | - | 11 |

### Bindings
unique: 3; total uses: 8
names: badgeFill x5, start x2, act x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x2, StatusBadge x5, NotificationItem x1
hover: 9, focus: 0

### Media
files: none
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": ""}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs Info Management.dc.html (20775 bytes)

### Bands (1)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | Information · Info management | Paperwork in. Records out. | - | 5 |

### Bindings
unique: 2; total uses: 2
names: start x1, vid x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x1
hover: 1, focus: 0

### Media
files: media/subpages/info-management-hero.mp4
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": "media/subpages/info-management-hero.mp4"}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

## Echo 1 Labs Voice Agents.dc.html (20761 bytes)

### Bands (1)
| # | id | band | theme | label | headline | video | text lines |
|---|---|---|---|---|---|---|---|
| 1 | - | dark | - | Voice · AI voice agents | Every call answered. | - | 5 |

### Bindings
unique: 2; total uses: 2
names: start x1, vid x1
used inside style="...": none
loop variables (sc-for): none
responsive layout bindings (script branches on width and the value feeds style=): none
responsive show/hide flags (script branches on width and the name is an sc-if): none
page script reads viewport width or matchMedia: True

### Control flow
sc-if: none
sc-for: none

### Components
GhostButton x1
hover: 1, focus: 0

### Media
files: media/subpages/voice-agents-hero.mp4
<video> tags in markup: 0; script builds a video element: True
editable props (defaults): {"clip": "media/subpages/voice-agents-hero.mp4"}

### Colour and copy flags
hex literals: 12 distinct; flagged: #0E0B1A old-v1.1-palette x2, #F4F1FA old-v1.1-palette x2, #FF6A00 crossed-orange x1, #120E20 old-v1.1-palette x1, #14101F old-v1.1-palette x1, #07070F old-v1.1-palette x1
helmet colour variables: --ao-orbit=#FF7515, --e1-orbit-deep=#FF6A00, --ao-deep=#0E0B1A, --ao-charcoal=#120E20, --ao-t1=#9A92AE, --ao-tdata=#CFC3FF, --ao-halo-orbit=0 0 10px #FF7515, --ao-t0=#14101F, --ao-t2=#6B6580, --ao-text-on-accent=#07070F
[STAT:*] placeholders: none
em dashes in source: 0

