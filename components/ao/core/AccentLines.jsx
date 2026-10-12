import React from 'react';

/**
 * Running background accent lines for both themes: inclined orbit hairlines in the mark's three
 * colours, comets with fading trails, and slow satellite streaks. Motion is satellite-slow — a lap
 * takes 4–6 min, each orbit plane turns once every 25–35 min. Fills its positioned parent.
 * Engine: assets/accent-lines.js (window.AOAccentLines). One still frame under reduced motion.
 */
export function AccentLines({ mode = 'both', speed = 0.9, strength = 1, className = '', style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.AOAccentLines) return;
    return window.AOAccentLines(ref.current, { mode, speed, dim: strength });
  }, [mode, speed, strength]);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`ao-accentlines${className ? ' ' + className : ''}`}
      style={style}
    />
  );
}
