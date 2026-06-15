import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Rudraditya Thakur'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 108, color: '#fff', lineHeight: 0.88, letterSpacing: '-2px' }}>
            Rudraditya
          </span>
          <span style={{ fontSize: 108, color: '#fff', lineHeight: 0.88, letterSpacing: '-2px' }}>
            Thakur
          </span>
        </div>

        <span style={{ fontSize: 26, color: 'rgba(255,255,255,0.4)', marginTop: '40px' }}>
          Turning caffeine into products.
        </span>

        <span style={{ fontSize: 17, color: 'rgba(255,255,255,0.18)', marginTop: 'auto' }}>
          rudraditya21.github.io
        </span>
      </div>
    ),
    size
  )
}
