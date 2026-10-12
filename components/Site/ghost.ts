import type { CSSProperties } from 'react';

type Kind = 'primary' | 'primary-ink' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

/** Props for the DS GhostButton, as the handoff's btn() helper builds them.
 *  Primary is an orange-tinted ghost: orange label on dark, ink label on light. */
export function ghostProps(kind: Kind, size: Size, extra?: CSSProperties) {
  const sm = size === 'sm';
  const lg = size === 'lg';
  const style: CSSProperties = {
    fontSize: sm ? 10 : 12,
    fontWeight: 400,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    padding: sm ? '9px 14px' : lg ? '18px 28px' : '15px 22px',
    minHeight: sm ? 34 : 50,
    borderRadius: 'var(--ao-r-pill)',
    justifyContent: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
  };
  if (kind === 'primary') style.background = 'var(--ao-orbit-15)';
  if (kind === 'primary-ink') {
    style.background = 'var(--ao-orbit-15)';
    style.color = 'var(--ao-t0)';
  }
  if (kind === 'secondary') style.color = 'var(--ao-t1)';
  return {
    accent: kind.startsWith('primary') ? 'var(--ao-orbit)' : undefined,
    style: { ...style, ...extra },
  };
}
