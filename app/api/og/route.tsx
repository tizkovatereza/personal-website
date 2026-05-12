import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Tereza Tizkova'
  const subtitle = searchParams.get('subtitle') || ''

  const fontSize = title.length > 40 ? 52 : 64

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0f1a',
          backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u9688764358_seamless_repeating_wallpaper_pattern_tiny_simple__a2a194ab-9c74-4cdd-9540-30d743eb658f_3%20%281%29-pl1n8P2WXmePIPiDK8xlbOmEi4azfe.png)',
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 15, 26, 0.92)',
            display: 'flex',
          }}
        />
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 60,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: fontSize,
              fontWeight: 500,
              color: '#ffffff',
              lineHeight: 1.2,
              maxWidth: 1000,
              display: 'flex',
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          
          {subtitle && (
            <div
              style={{
                fontSize: 28,
                color: 'rgba(255, 255, 255, 0.6)',
                marginTop: 24,
                maxWidth: 800,
                display: 'flex',
                textAlign: 'center',
                fontWeight: 300,
              }}
            >
              {subtitle}
            </div>
          )}
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 48,
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: 300,
                display: 'flex',
              }}
            >
              terezatizkova.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
