import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    // Get total views
    const totalViews = await sql`SELECT COUNT(*) as count FROM page_views`
    
    // Get views by page
    const viewsByPage = await sql`
      SELECT path, COUNT(*) as views 
      FROM page_views 
      GROUP BY path 
      ORDER BY views DESC
      LIMIT 20
    `
    
    // Get views today
    const todayViews = await sql`
      SELECT COUNT(*) as count 
      FROM page_views 
      WHERE created_at >= CURRENT_DATE
    `
    
    // Get views last 7 days by day
    const last7Days = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as views
      FROM page_views
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `
    
    // Get views by country
    const viewsByCountry = await sql`
      SELECT country, COUNT(*) as views
      FROM page_views
      WHERE country IS NOT NULL
      GROUP BY country
      ORDER BY views DESC
      LIMIT 10
    `
    
    // Get top referrers
    const topReferrers = await sql`
      SELECT referrer, COUNT(*) as views
      FROM page_views
      WHERE referrer IS NOT NULL AND referrer != ''
      GROUP BY referrer
      ORDER BY views DESC
      LIMIT 10
    `
    
    return NextResponse.json({
      totalViews: totalViews[0]?.count || 0,
      todayViews: todayViews[0]?.count || 0,
      viewsByPage,
      last7Days,
      viewsByCountry,
      topReferrers,
    })
  } catch (error) {
    console.error('Failed to get analytics:', error)
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
  }
}
