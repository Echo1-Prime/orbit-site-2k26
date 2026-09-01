import { ImageResponse } from 'next/og';

// Shared social/link-preview card (Open Graph + Twitter). 1200x630.
// Link previews render a STATIC image, so we render a crisp still frame of the
// Agent Orbit mark (Solar Orange) as the card's hero visual.
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_ALT = 'Echo 1 Labs: Break free from business gravity.';
export const OG_CONTENT_TYPE = 'image/png';

function OrbitGlyph() {
  return (
    <div
      style={{
        display: 'flex',
        width: 460,
        height: 460,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 460,
          height: 460,
          display: 'flex',
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,117,21,0.22), rgba(255,117,21,0) 62%)',
        }}
      />
      <svg width="460" height="460" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#FF7515" strokeWidth="0.5" strokeOpacity="0.14" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#FF7515" strokeWidth="0.8" strokeOpacity="0.24" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#FF7515" strokeWidth="0.7" strokeOpacity="0.16" />
        <circle cx="50" cy="50" r="17" fill="none" stroke="#FF7515" strokeWidth="0.7" strokeOpacity="0.18" />
        <path d="M 50 8 A 42 42 0 0 1 89 64" fill="none" stroke="#FF7515" strokeWidth="1.1" strokeOpacity="0.55" strokeLinecap="round" />
        <path d="M 50 80 A 30 30 0 0 1 22 57" fill="none" stroke="#FF7515" strokeWidth="0.9" strokeOpacity="0.3" strokeLinecap="round" />
        <circle cx="82" cy="23" r="3.6" fill="#FF7515" />
        <circle cx="24" cy="63" r="2.8" fill="#FF7515" fillOpacity="0.85" />
        <circle cx="64" cy="59" r="2.1" fill="#FF7515" fillOpacity="0.6" />
        <circle cx="50" cy="50" r="3.4" fill="#FF7515" />
      </svg>
    </div>
  );
}

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0A0A0E',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            background:
              'radial-gradient(circle at 80% 50%, rgba(255,117,21,0.14), rgba(255,117,21,0) 58%)',
          }}
        />

        {/* left text column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 22,
            padding: '0 24px 0 72px',
            width: 660,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
            <span style={{ color: '#EEEEF5' }}>ECHO</span>
            <span style={{ color: '#FF7515' }}>1</span>
            <span style={{ color: '#EEEEF5' }}>LABS</span>
          </div>

          <div style={{ fontSize: 15, letterSpacing: 4, color: '#FF7515' }}>
            BUSINESS &amp; MINISTRY LIFECYCLE MANAGEMENT
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 62, fontWeight: 800, color: '#EEEEF5', letterSpacing: -2, lineHeight: 1.04 }}>
              Break free from
            </div>
            <div style={{ fontSize: 62, fontWeight: 800, color: '#FF7515', letterSpacing: -2, lineHeight: 1.04 }}>
              business gravity.
            </div>
          </div>

          <div style={{ fontSize: 23, color: 'rgba(238,238,245,0.74)', lineHeight: 1.5, maxWidth: 560 }}>
            Seven integrated apps. One operating system, run by agents, supervised by you.
          </div>

          <div style={{ fontSize: 18, color: 'rgba(238,238,245,0.5)', letterSpacing: 1 }}>echo1labs.com</div>
        </div>

        {/* right: Agent Orbit mark */}
        <div
          style={{
            position: 'absolute',
            right: -40,
            top: 0,
            height: '100%',
            width: 520,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <OrbitGlyph />
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
