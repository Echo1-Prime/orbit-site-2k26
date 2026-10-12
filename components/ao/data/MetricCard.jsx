import React from 'react';

/** One instrument readout: mono label, mono value + unit, sparkline, 2px accent rule. */
export function MetricCard({
  label,
  value,
  unit,
  series = [],
  accent = 'var(--ao-orbit)',
  onClick,
  className = '',
  style,
  ...rest
}) {
  const max = Math.max(1, ...series);
  return (
    <div
      className={`ao-metric${className ? ' ' + className : ''}`}
      style={{ '--ao-accent': accent, ...style }}
      onClick={onClick}
      {...rest}
    >
      <div className="ao-metric__label">{label}</div>
      <div className="ao-metric__value">
        {value}
        {unit && <span className="ao-metric__unit">{unit}</span>}
      </div>
      {series.length > 0 && (
        <div className="ao-metric__spark">
          {series.map((v, i) => (
            <div key={i} className="ao-metric__bar" style={{ height: `${Math.round((v / max) * 100)}%` }} />
          ))}
        </div>
      )}
      <div className="ao-metric__rule" />
    </div>
  );
}

/** The 4-column metric row. Hairline gaps read as one instrument cluster, not four cards. */
export function MetricRow({ columns = 4, className = '', style, children, ...rest }) {
  return (
    <div className={`ao-metrics${className ? ' ' + className : ''}`} style={{ '--ao-metric-cols': columns, ...style }} {...rest}>
      {children}
    </div>
  );
}
