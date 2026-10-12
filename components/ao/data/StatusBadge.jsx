import React from 'react';

const TONES = {
  ok: 'var(--ao-system)',
  action: 'var(--ao-orbit)',
  progress: 'var(--ao-agent)',
  info: 'var(--ao-stellar)',
  error: 'var(--ao-alert)',
  neutral: 'var(--ao-t1)',
};

/** Pill status marker — mono 9px, tinted fill, matching hairline border. */
export function StatusBadge({ tone = 'ok', bare = false, children, className = '', style, ...rest }) {
  return (
    <span
      className={`ao-badge${bare ? ' ao-badge--bare' : ''}${className ? ' ' + className : ''}`}
      style={{ '--ao-accent': TONES[tone] || tone, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}
