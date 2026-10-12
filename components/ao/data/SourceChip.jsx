import React from 'react';

const TONES = {
  orbit: 'var(--ao-orbit)',
  agent: 'var(--ao-agent)',
  system: 'var(--ao-system)',
  stellar: 'var(--ao-stellar)',
  alert: 'var(--ao-alert)',
};

/** Connected data-source chip — `Provider · Feed`. One per live connector. */
export function SourceChip({ tone = 'neutral', children, className = '', style, ...rest }) {
  const color = TONES[tone];
  return (
    <span
      className={`ao-chip${color ? '' : ' ao-chip--neutral'}${className ? ' ' + className : ''}`}
      style={color ? { '--ao-accent': color, ...style } : style}
      {...rest}
    >
      {children}
    </span>
  );
}

export function SourceChips({ className = '', children, ...rest }) {
  return <div className={`ao-chips${className ? ' ' + className : ''}`} {...rest}>{children}</div>;
}
