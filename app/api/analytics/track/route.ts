import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

export async function POST(request: NextRequest) {
  if (!sql) {
    return NextResponse.json({ error: "Analytics database is not configured" }, { status: 503 })
  }
  try {
    const { path, referrer } = await request.json()
    
    const userAgent = request.headers.get('user-agent') || null
    
    // Get country from Vercel's geo headers
    const country = request.headers.get('x-vercel-ip-country') || null
    const city = request.headers.get('x-vercel-ip-city') || null
    
    await sql`
      INSERT INTO page_views (path, referrer, user_agent, country, city)
      VALUES (${path}, ${referrer}, ${userAgent}, ${country}, ${city})
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to track page view:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
