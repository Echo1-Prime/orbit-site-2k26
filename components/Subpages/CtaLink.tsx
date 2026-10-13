import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

/** The handoff's call to action rendered as a real link. The design system button is a <button>, which a
 *  crawler cannot follow, so the generated subpages use this with the same classes and accent. */
export default function CtaLink({
  accent,
  href,
  style,
  className = '',
  children,
}: {
  accent?: string;
  href: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`ao-btn${accent ? ' ao-btn--accent' : ''}${className ? ' ' + className : ''}`}
      style={{
        ...(accent ? ({ '--ao-accent': accent } as CSSProperties) : null),
        textDecoration: 'none',
        ...style,
      }}
    >
      {children}
    </Link>
  );
}
