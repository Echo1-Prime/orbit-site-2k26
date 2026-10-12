import React from 'react';

/** The system's only button: mono, hairline, transparent until touched. */
export function GhostButton({ accent, children, className = '', style, ...rest }) {
  return (
    <button
      type="button"
      className={`ao-btn${accent ? ' ao-btn--accent' : ''}${className ? ' ' + className : ''}`}
      style={accent ? { '--ao-accent': accent, ...style } : style}
      {...rest}
    >
      {children}
    </button>
  );
}
