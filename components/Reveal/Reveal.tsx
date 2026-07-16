'use client';

import React, { type CSSProperties, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type RevealVariant = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}

const VARIANTS: Record<RevealVariant, { from: CSSProperties; to: CSSProperties }> = {
  'fade-up': {
    from: { opacity: 0, transform: 'translateY(28px)' },
    to:   { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-in': {
    from: { opacity: 0 },
    to:   { opacity: 1 },
  },
  'fade-left': {
    from: { opacity: 0, transform: 'translateX(-24px)' },
    to:   { opacity: 1, transform: 'translateX(0)' },
  },
  'fade-right': {
    from: { opacity: 0, transform: 'translateX(24px)' },
    to:   { opacity: 1, transform: 'translateX(0)' },
  },
  'scale-up': {
    from: { opacity: 0, transform: 'scale(0.94)' },
    to:   { opacity: 1, transform: 'scale(1)' },
  },
};

export default function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 540,
  threshold = 0.15,
  className,
  style,
  as: Tag = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const { from, to } = VARIANTS[variant];

  const motionStyle: CSSProperties = reduced
    ? {}
    : {
        ...from,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...(inView ? to : {}),
      };

  return (
    // @ts-expect-error — dynamic tag, types are fine at runtime
    <Tag ref={ref} className={className} style={{ ...motionStyle, ...style }}>
      {children}
    </Tag>
  );
}
