import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { path, referrer } = await request.json()
    
    const userAgent = request.headers.get('user-agent') || null
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               null
    
    // Get country from Vercel's geo headers
    const country = request.headers.get('x-vercel-ip-country') || null
    const city = request.headers.get('x-vercel-ip-city') || null
    
    await sql`
      INSERT INTO page_views (path, referrer, user_agent, ip_address, country, city)
      VALUES (${path}, ${referrer}, ${userAgent}, ${ip}, ${country}, ${city})
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to track page view:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
