import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Rudraditya Thakur — Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const unbounded = fetch(
  'https://raw.githubusercontent.com/googlefonts/unbounded/main/fonts/ttf/Unbounded-Medium.ttf'
).then(async (response) => {
  if (!response.ok) throw new Error('Unable to load Unbounded for the Open Graph image')
  return response.arrayBuffer()
})

const dmSans = fetch(
  'https://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTmf3ZGMZpg.ttf'
).then(async (response) => {
  if (!response.ok) throw new Error('Unable to load DM Sans for the Open Graph image')
  return response.arrayBuffer()
})

export default async function Image() {
  const [unboundedFont, dmSansFont] = await Promise.all([unbounded, dmSans])

  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          color: '#f5f5f5',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          padding: '72px 96px',
        }}
      >
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 72, width: 1, background: '#2a2a2a' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 72, width: 1, background: '#2a2a2a' }} />

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'DM Sans', fontSize: 18, color: '#9b9b9b' }}>Portfolio</span>
            <span style={{ fontFamily: 'DM Sans', fontSize: 18, color: '#9b9b9b' }}>rudraditya21.github.io</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 118 }}>
            <span style={{ fontFamily: 'Unbounded', fontSize: 62, fontWeight: 500, letterSpacing: '-3px', lineHeight: 1 }}>
              Rudraditya Thakur
            </span>
            <span style={{ fontFamily: 'DM Sans', fontSize: 28, color: '#b5b5b5', marginTop: 28 }}>
              Turning caffeine into products.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', alignItems: 'flex-end' }}>
            <span style={{ fontFamily: 'DM Sans', fontSize: 20, color: '#747474' }}>
              Systems · Compilers · Blockchain · Security
            </span>
            <span style={{ fontFamily: 'DM Sans', fontSize: 18, color: '#747474' }}>2026</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Unbounded', data: unboundedFont, weight: 500 },
        { name: 'DM Sans', data: dmSansFont, weight: 400 },
      ],
    }
  )
}
