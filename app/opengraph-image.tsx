import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import path from 'path';

export const alt = 'Echo 1 Labs — Business Lifecycle Management';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const logoPath = path.join(process.cwd(), 'public/brand/e1-logo-orbitwhite.png');
  const logoData = readFileSync(logoPath);
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

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
        <img src={logoSrc} width={280} height={64} style={{ objectFit: 'contain', objectPosition: 'left' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-2px',
              lineHeight: 1.05,
              maxWidth: '900px',
            }}
          >
            Break free from business gravity.
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '4px', height: '28px', background: '#FF7515', borderRadius: '2px' }} />
            <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.66)' }}>
              Process engineered systems for startups, SMBs, and portfolios.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
