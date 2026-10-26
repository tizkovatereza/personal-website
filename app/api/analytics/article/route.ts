import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

// Invalid production configuration must not prevent the site from building.
const sql = (() => {
  if (!process.env.DATABASE_URL) return null
  try {
    return neon(process.env.DATABASE_URL)
  } catch {
    return null
  }
})()

export async function GET(request: NextRequest) {
  if (!sql) {
    return NextResponse.json({ error: "Analytics database is not configured" }, { status: 503 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')

    if (path) {
      // Get detailed analytics for a specific article
      const totalViews = await sql`
        SELECT COUNT(*) as count FROM page_views WHERE path = ${path}
      `

      const viewsByDay = await sql`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as views
        FROM page_views
        WHERE path = ${path}
        GROUP BY DATE(created_at)
        ORDER BY date DESC
        LIMIT 30
      `

      const referrers = await sql`
        SELECT 
          CASE 
            WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
            WHEN referrer LIKE '%google.%' THEN 'Google'
            WHEN referrer LIKE '%twitter.%' OR referrer LIKE '%x.com%' OR referrer LIKE '%t.co%' THEN 'Twitter/X'
            WHEN referrer LIKE '%linkedin.%' THEN 'LinkedIn'
            WHEN referrer LIKE '%facebook.%' OR referrer LIKE '%fb.%' THEN 'Facebook'
            WHEN referrer LIKE '%reddit.%' THEN 'Reddit'
            WHEN referrer LIKE '%hackernews%' OR referrer LIKE '%ycombinator%' OR referrer LIKE '%news.ycombinator%' THEN 'Hacker News'
            WHEN referrer LIKE '%substack.%' THEN 'Substack'
            WHEN referrer LIKE '%github.%' THEN 'GitHub'
            WHEN referrer LIKE '%discord.%' THEN 'Discord'
            WHEN referrer LIKE '%slack.%' THEN 'Slack'
            ELSE referrer
          END as source,
          COUNT(*) as views
        FROM page_views
        WHERE path = ${path}
        GROUP BY source
        ORDER BY views DESC
        LIMIT 20
      `

      const countries = await sql`
        SELECT 
          COALESCE(country, 'Unknown') as country,
          COUNT(*) as views
        FROM page_views
        WHERE path = ${path}
        GROUP BY country
        ORDER BY views DESC
        LIMIT 15
      `

      const cities = await sql`
        SELECT 
          COALESCE(city, 'Unknown') as city,
          COALESCE(country, '') as country,
          COUNT(*) as views
        FROM page_views
        WHERE path = ${path}
        GROUP BY city, country
        ORDER BY views DESC
        LIMIT 15
      `

      const hourlyDistribution = await sql`
        SELECT 
          EXTRACT(HOUR FROM created_at) as hour,
          COUNT(*) as views
        FROM page_views
        WHERE path = ${path}
        GROUP BY hour
        ORDER BY hour
      `

      return NextResponse.json({
        path,
        totalViews: totalViews[0]?.count || 0,
        viewsByDay,
        referrers,
        countries,
        cities,
        hourlyDistribution,
      })
    }

    // Get overview for all articles (paths starting with /writing/)
    const articles = await sql`
      SELECT 
        path,
        COUNT(*) as total_views,
        COUNT(DISTINCT DATE(created_at)) as days_with_views,
        MIN(created_at) as first_view,
        MAX(created_at) as last_view
      FROM page_views
      WHERE path LIKE '/writing/%'
      GROUP BY path
      ORDER BY total_views DESC
    `

    // Get top referrers for all articles combined
    const topReferrersAllArticles = await sql`
      SELECT 
        CASE 
          WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
          WHEN referrer LIKE '%google.%' THEN 'Google'
          WHEN referrer LIKE '%twitter.%' OR referrer LIKE '%x.com%' OR referrer LIKE '%t.co%' THEN 'Twitter/X'
          WHEN referrer LIKE '%linkedin.%' THEN 'LinkedIn'
          WHEN referrer LIKE '%facebook.%' OR referrer LIKE '%fb.%' THEN 'Facebook'
          WHEN referrer LIKE '%reddit.%' THEN 'Reddit'
          WHEN referrer LIKE '%hackernews%' OR referrer LIKE '%ycombinator%' OR referrer LIKE '%news.ycombinator%' THEN 'Hacker News'
          WHEN referrer LIKE '%substack.%' THEN 'Substack'
          WHEN referrer LIKE '%github.%' THEN 'GitHub'
          ELSE 'Other'
        END as source,
        COUNT(*) as views
      FROM page_views
      WHERE path LIKE '/writing/%'
      GROUP BY source
      ORDER BY views DESC
    `

    // Per-article breakdown of referrers
    const referrersByArticle = await sql`
      SELECT 
        path,
        CASE 
          WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
          WHEN referrer LIKE '%google.%' THEN 'Google'
          WHEN referrer LIKE '%twitter.%' OR referrer LIKE '%x.com%' OR referrer LIKE '%t.co%' THEN 'Twitter/X'
          WHEN referrer LIKE '%linkedin.%' THEN 'LinkedIn'
          WHEN referrer LIKE '%facebook.%' OR referrer LIKE '%fb.%' THEN 'Facebook'
          WHEN referrer LIKE '%reddit.%' THEN 'Reddit'
          WHEN referrer LIKE '%hackernews%' OR referrer LIKE '%ycombinator%' OR referrer LIKE '%news.ycombinator%' THEN 'Hacker News'
          WHEN referrer LIKE '%substack.%' THEN 'Substack'
          WHEN referrer LIKE '%github.%' THEN 'GitHub'
          ELSE 'Other'
        END as source,
        COUNT(*) as views
      FROM page_views
      WHERE path LIKE '/writing/%'
      GROUP BY path, source
      ORDER BY path, views DESC
    `

    return NextResponse.json({
      articles,
      topReferrersAllArticles,
      referrersByArticle,
    })
  } catch (error) {
    console.error('Failed to get article analytics:', error)
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
  }
}
