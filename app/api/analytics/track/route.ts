import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_T8wOCM4fVHcY@ep-lucky-shape-aip8rknx-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'
const sql = neon(DATABASE_URL)

export async function POST(request: NextRequest) {
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
