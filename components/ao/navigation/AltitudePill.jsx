import React from 'react';

/** One altitude step in the L5→L1 breadcrumb. Active = 15% accent fill + accent border. */
export function AltitudePill({ label, active = false, accent = 'var(--ao-orbit)', onClick, className = '', style, ...rest }) {
  return (
    <button
      type="button"
      className={`ao-altpill${active ? ' is-active' : ''}${className ? ' ' + className : ''}`}
      style={{ '--ao-accent': accent, ...style }}
      onClick={onClick}
      aria-pressed={active}
      {...rest}
    >
      {label}
    </button>
  );
}

/** The horizontal altitude breadcrumb. Order is always highest altitude first. */
export function AltitudePills({ items, value, onChange, accent = 'var(--ao-orbit)', className = '', ...rest }) {
  return (
    <div className={`ao-altpills${className ? ' ' + className : ''}`} {...rest}>
      {items.map((it) => {
        const label = typeof it === 'string' ? it : it.label;
        const id = typeof it === 'string' ? it : it.id;
        return (
          <AltitudePill
            key={id}
            label={label}
            accent={accent}
            active={id === value}
            onClick={() => onChange && onChange(id)}
          />
        );
      })}
    </div>
  );
}
