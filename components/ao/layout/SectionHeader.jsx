import React from 'react';

/** Centred section header: mono kicker over a light display title. */
export function SectionHeader({ label, title, align = 'center', className = '', children, ...rest }) {
  return (
    <div className={`ao-section${align === 'left' ? ' ao-section--left' : ''}${className ? ' ' + className : ''}`} {...rest}>
      {label && <p className="ao-section__label">{label}</p>}
      {title && <h2 className="ao-section__title">{title}</h2>}
      {children}
    </div>
  );
}

/** Page header: orange eyebrow, fading rule, right-hand meta, then the page title. */
export function PageHeader({ eyebrow, meta, title, className = '', ...rest }) {
  return (
    <div className={`ao-pagehead${className ? ' ' + className : ''}`} {...rest}>
      <div className="ao-pagehead__row">
        {eyebrow && <div className="ao-pagehead__eyebrow">{eyebrow}</div>}
        <div className="ao-pagehead__rule" />
        {meta && <div className="ao-pagehead__eyebrow ao-pagehead__eyebrow--muted">{meta}</div>}
      </div>
      {title && <h1 className="ao-pagehead__title">{title}</h1>}
    </div>
  );
}
