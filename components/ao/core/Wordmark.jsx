import React from 'react';
import { OrbitMark } from './OrbitMark';

/* E1 mark — the favicon/icon shape used in the nav lockup. */
function E1Mark({ size = 28, className = '', style }) {
  const r = Math.round(size * 0.22);
  return (
    <div
      className={className}
      aria-label="Echo 1 Labs"
      style={{
        width: size, height: size, borderRadius: r,
        background: '#120D18', border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 700, fontSize: Math.round(size * 0.5),
        letterSpacing: '-0.04em', color: '#F0F0F5', flexShrink: 0,
        userSelect: 'none',
        ...style,
      }}
    >
      E<span style={{ color: '#FF7515' }}>1</span>
    </div>
  );
}

/** AGENT ORBIT set in type — AGENT at 200, ORBIT at 500 in orbit orange. Never re-letter it. */
export function Wordmark({
  size = 36,
  subtitle = 'Agent Intelligence Platform',
  align = 'center',
  lockup = false,
  markSize = 22,
  className = '',
  ...rest
}) {
  const cls = [
    'ao-wordmark',
    lockup ? 'ao-wordmark--lockup' : '',
    align === 'left' ? 'ao-wordmark--left' : '',
    className,
  ].filter(Boolean).join(' ');

  const type = (
    <div
      className="ao-wordmark__type"
      style={{ fontSize: size, letterSpacing: lockup ? undefined : 'var(--ao-ls-wordmark)' }}
    >
      Agent&nbsp;<em>Orbit</em>
    </div>
  );

  if (lockup) {
    return (
      <div className={cls} {...rest}>
        <E1Mark size={markSize} />
        {type}
      </div>
    );
  }

  return (
    <div className={cls} {...rest}>
      {type}
      {subtitle && <div className="ao-wordmark__sub">{subtitle}</div>}
    </div>
  );
}
