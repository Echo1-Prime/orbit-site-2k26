import React from 'react';

/** A domain at the current altitude: name, status badge, 2×2 mono meta grid. */
export function DomainPanel({
  name,
  badge,
  meta = [],
  columns = 2,
  glass = false,
  float = false,
  children,
  className = '',
  style,
  ...rest
}) {
  const cls = [
    'ao-panel',
    glass ? 'ao-panel--glass' : '',
    float ? 'ao-panel--float' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={{ '--ao-panel-cols': columns, ...style }} {...rest}>
      <div className="ao-panel__header">
        <span className="ao-panel__name">{name}</span>
        {badge}
      </div>
      {meta.length > 0 && (
        <div className="ao-panel__meta">
          {meta.map((m) => (
            <div key={m.k}>
              <div className="ao-panel__k">{m.k}</div>
              <div className="ao-panel__v">{m.v}</div>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
