import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url, title, sourcePath, referrer } = await request.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 })
    }

    const userAgent = request.headers.get('user-agent') || null
    const country = request.headers.get('x-vercel-ip-country') || null
    const city = request.headers.get('x-vercel-ip-city') || null

    const sql = neon(process.env.DATABASE_URL!)
    await sql`
      INSERT INTO outbound_clicks (url, title, source_path, referrer, user_agent, country, city)
      VALUES (${url}, ${title ?? null}, ${sourcePath ?? null}, ${referrer ?? null}, ${userAgent}, ${country}, ${city})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to track outbound click:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
