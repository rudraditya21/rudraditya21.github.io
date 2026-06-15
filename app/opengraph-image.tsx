import { ImageResponse } from 'next/og'

export const alt = 'Rudraditya Thakur'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    }
  ).then(r => r.text())

  const url = css.match(/url\(([^)]+)\)/)?.[1]?.replace(/"/g, '')
  if (!url) throw new Error(`Failed to resolve font URL for ${family}`)
  return fetch(url).then(r => r.arrayBuffer())
}

export default async function Image() {
  const [serifData, interData] = await Promise.all([
    loadFont('Instrument+Serif', 400),
    loadFont('Inter', 300),
  ])

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
          <span
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: 112,
              color: '#fff',
              lineHeight: 0.88,
              letterSpacing: '-2px',
            }}
          >
            Rudraditya
          </span>
          <span
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: 112,
              color: '#fff',
              lineHeight: 0.88,
              letterSpacing: '-2px',
            }}
          >
            Thakur
          </span>
        </div>

        <span
          style={{
            fontFamily: 'Inter',
            fontSize: 26,
            color: 'rgba(255,255,255,0.4)',
            marginTop: '40px',
            letterSpacing: '0px',
          }}
        >
          Turning caffeine into products.
        </span>

        <span
          style={{
            fontFamily: 'Inter',
            fontSize: 17,
            color: 'rgba(255,255,255,0.18)',
            marginTop: 'auto',
          }}
        >
          rudraditya21.github.io
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Instrument Serif', data: serifData,  style: 'normal' },
        { name: 'Inter',            data: interData,   style: 'normal' },
      ],
    }
  )
}
