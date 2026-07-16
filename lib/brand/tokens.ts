export const COLORS = {
  neutrals: [
    { name: 'Void',      hex: '#0A0A0E', token: '--void',      note: 'Page background' },
    { name: 'Void Card', hex: '#111118', token: '--void-card',  note: 'Card / section background' },
    { name: 'Surface',   hex: '#1A1A24', token: '--surface',    note: 'Elevated surface' },
    { name: 'Border',    hex: 'rgba(255,255,255,0.10)', token: '--border', note: 'Separator' },
    { name: 'Muted',     hex: 'rgba(255,255,255,0.50)', token: '--muted',  note: 'Secondary text' },
    { name: 'Text',      hex: '#FFFFFF', token: '--text',       note: 'Primary text' },
  ],
  primaries: [
    { name: 'Solar',      hex: '#FF7515', token: '--solar',      note: 'Primary accent — CTA, highlights' },
    { name: 'Blue',       hex: '#274578', token: '--blue',        note: 'Brand blue — deep background use' },
    { name: 'Violet',     hex: '#8B5CF6', token: '--violet',     note: 'Secondary accent — badges, decorative' },
    { name: 'Violet Deep', hex: '#7C3AED', token: '--violet-deep', note: 'Small-text violet for AA contrast' },
  ],
  semantic: [
    { name: 'Success', hex: '#22C55E', token: '--success', note: 'Positive / confirmed states' },
    { name: 'Warning', hex: '#E9A84C', token: '--warning', note: 'Caution states' },
    { name: 'Info',    hex: '#274578', token: '--info',    note: 'Informational (aliases --blue)' },
  ],
  markOnly: [
    { name: 'Purple', hex: '#655596', token: '--purple', note: 'MARK-ONLY — Orbit agentic ring only. Never use in UI.' },
    { name: 'Sage',   hex: '#6B7E8B', token: '--sage',   note: 'MARK-ONLY — do not use in UI.' },
  ],
} as const;

export const TYPE_SCALE = [
  { name: 'Display XL',  class: 'display-xl',  size: 'clamp(3rem, 6vw, 5.5rem)', weight: 800, use: 'Hero headlines' },
  { name: 'Display LG',  class: 'display-lg',  size: 'clamp(2.25rem, 4vw, 3.75rem)', weight: 800, use: 'Page titles, H1s' },
  { name: 'Display MD',  class: 'display-md',  size: 'clamp(1.75rem, 3vw, 2.5rem)', weight: 700, use: 'Section headlines, H2s' },
  { name: 'Body LG',     class: 'body-lg',     size: '1.25rem (20px)', weight: 400, use: 'Intro paragraphs, subheads' },
  { name: 'Body MD',     class: 'body-md',     size: '1rem (16px)',    weight: 400, use: 'Default body copy' },
  { name: 'Label',       class: 'label',       size: '0.7rem (11.2px)', weight: 600, use: 'Section eyebrows, overlines' },
] as const;

export const RADIUS = [
  { name: 'xs',   token: '--radius-xs',   value: '4px' },
  { name: 'sm',   token: '--radius-sm',   value: '6px' },
  { name: 'md',   token: '--radius-md',   value: '10px' },
  { name: 'lg',   token: '--radius-lg',   value: '12px' },
  { name: 'xl',   token: '--radius-xl',   value: '16px' },
  { name: '2xl',  token: '--radius-2xl',  value: '20px' },
  { name: 'full', token: '--radius-full', value: '999px' },
] as const;

export const SPACING = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128] as const;

export const LOGO_FILES = [
  { file: '/echo1-e1-mark.svg',    label: 'E¹ mark (transparent bg)',  use: 'Headers, components' },
  { file: '/echo1-favicon.svg',    label: 'E¹ favicon mark',           use: 'Browser tab, dark bg' },
  { file: '/brand/e1-logo-orbitwhite.png', label: 'Full wordmark — orbit white', use: 'OG image, dark bg' },
  { file: '/brand/e1-logo-deepblue.png',   label: 'Full wordmark — deep blue',   use: 'Blue background' },
  { file: '/brand/e1-logo-voidblack.png',  label: 'Full wordmark — void black',  use: 'Light background' },
  { file: '/brand/dark-agi-orbit.png',     label: 'AGI orbit — dark',            use: 'Dark hero/cover use' },
  { file: '/brand/lite-agi-orbit.png',     label: 'AGI orbit — light',           use: 'Light hero/cover use' },
] as const;
