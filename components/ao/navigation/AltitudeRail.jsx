import React from 'react';
import { OrbitMark } from '../core/OrbitMark';

/** 48px vertical altitude rail — one dot per level, mark at the foot. */
export function AltitudeRail({
  levels = [],
  value,
  onChange,
  accent = 'var(--ao-orbit)',
  mark = true,
  className = '',
  style,
  ...rest
}) {
  return (
    <div
      className={`ao-rail${className ? ' ' + className : ''}`}
      style={{ '--ao-accent': accent, ...style }}
      {...rest}
    >
      {levels.map((lv) => {
        const id = typeof lv === 'string' ? lv : lv.id;
        const title = typeof lv === 'string' ? lv : lv.title;
        return (
          <button
            key={id}
            type="button"
            title={title}
            aria-label={title}
            aria-pressed={id === value}
            className={`ao-rail__dot${id === value ? ' is-active' : ''}`}
            onClick={() => onChange && onChange(id)}
          />
        );
      })}
      {mark && <div className="ao-rail__foot" style={{width:24,height:24,borderRadius:6,background:'#120D18',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Space Grotesk',system-ui,sans-serif",fontWeight:700,fontSize:12,letterSpacing:'-0.04em',color:'#F0F0F5',userSelect:'none',flexShrink:0}}>E<span style={{color:'#FF7515'}}>1</span></div>}
    </div>
  );
}
