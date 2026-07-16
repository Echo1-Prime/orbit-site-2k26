import { ImageResponse } from 'next/og';

export const alt = 'Echo 1 Labs — Business Lifecycle Management';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Branded default OG card (dark, Solar accent). Applies site-wide via the
// file-based convention. Uses system fonts to avoid external font fetches.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0E',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
          <span style={{ fontSize: 44, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-1px' }}>ECHO-1</span>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#FF7515', letterSpacing: '6px' }}>LABS</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: 74, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-2px', lineHeight: 1.05, maxWidth: '900px' }}>
            Break free from business gravity.
          </div>
          <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.66)' }}>
            The Business Lifecycle Management company.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
