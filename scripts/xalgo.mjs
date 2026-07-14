import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)
const path = '/writing/x-algorithm'

// Total + today, excluding obvious bot/localhost noise
const totals = await sql`
  SELECT
    COUNT(*) AS raw_total,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 hour') AS last_hour,
    COUNT(*) FILTER (WHERE (created_at AT TIME ZONE 'America/Los_Angeles')::date = (NOW() AT TIME ZONE 'America/Los_Angeles')::date) AS today,
    COUNT(*) FILTER (WHERE referrer LIKE '%youtube.com%' AND referrer NOT LIKE '%watch%') AS youtube_junk
  FROM page_views WHERE path = ${path}
`
console.log('=== X ALGORITHM ARTICLE ===')
console.log(totals[0])

console.log('\n=== SOURCES (last 24h) ===')
const refs = await sql`
  SELECT COALESCE(NULLIF(referrer,''),'(direct)') AS ref, COUNT(*) AS n
  FROM page_views
  WHERE path = ${path} AND created_at >= NOW() - INTERVAL '24 hours'
  GROUP BY ref ORDER BY n DESC LIMIT 25
`
for (const r of refs) console.log(`${String(r.n).padStart(4)}  ${r.ref}`)

console.log('\n=== BY HOUR (last 12h, PT) ===')
const hourly = await sql`
  SELECT to_char(created_at AT TIME ZONE 'America/Los_Angeles', 'MM-DD HH24:00') AS hour, COUNT(*) AS n
  FROM page_views
  WHERE path = ${path} AND created_at >= NOW() - INTERVAL '12 hours'
  GROUP BY hour ORDER BY hour
`
for (const h of hourly) console.log(`${h.hour}  ${'#'.repeat(Math.min(Number(h.n),50))} ${h.n}`)
