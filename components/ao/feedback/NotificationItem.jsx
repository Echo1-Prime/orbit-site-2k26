import React from 'react';

const PRIORITY = {
  action: { color: 'var(--ao-orbit)', label: 'Action Needed' },
  progress: { color: 'var(--ao-agent)', label: 'In Progress' },
  ok: { color: 'var(--ao-system)', label: 'On Track' },
  error: { color: 'var(--ao-alert)', label: 'Threshold Breach' },
};

/** One live signal in the notification drawer. 3px left border carries the priority. */
export function NotificationItem({
  priority = 'action',
  label,
  text,
  actions = [],
  impact = false,
  onClick,
  className = '',
  style,
  ...rest
}) {
  const meta = PRIORITY[priority] || PRIORITY.action;
  return (
    <div
      className={`ao-notif${impact ? ' ao-notif--impact' : ''}${className ? ' ' + className : ''}`}
      style={{ '--ao-accent': meta.color, ...style }}
      onClick={onClick}
      {...rest}
    >
      <div className="ao-notif__label">{label || meta.label}</div>
      <div className="ao-notif__text">{text}</div>
      {actions.length > 0 && (
        <div className="ao-notif__actions">
          {actions.map((a) => (
            <button
              key={typeof a === 'string' ? a : a.label}
              type="button"
              className="ao-btn"
              onClick={(e) => { e.stopPropagation(); if (a.onClick) a.onClick(e); }}
            >
              {typeof a === 'string' ? a : a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** The drawer wrapper — mono header plus a stacked list of signals. */
export function NotificationList({ header = 'Live Signals', children, className = '', ...rest }) {
  return (
    <div className={`ao-notif-list${className ? ' ' + className : ''}`} {...rest}>
      {header && <div className="ao-notif-list__header">{header}</div>}
      {children}
    </div>
  );
}
