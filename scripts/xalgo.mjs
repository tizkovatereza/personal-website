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

console.log('\n=== SOCIAL SOURCES (last 24h, shows 0 too) ===')
const soc = await sql`
  SELECT
    COUNT(*) FILTER (WHERE referrer ILIKE '%t.co%' OR referrer ILIKE '%twitter.com%' OR referrer ILIKE '%//x.com%') AS twitter,
    COUNT(*) FILTER (WHERE referrer ILIKE '%linkedin%' OR referrer ILIKE '%lnkd.in%') AS linkedin,
    COUNT(*) FILTER (WHERE referrer ILIKE '%reddit%') AS reddit,
    COUNT(*) FILTER (WHERE referrer ILIKE '%bsky%') AS bluesky,
    COUNT(*) FILTER (WHERE referrer ILIKE '%threads%') AS threads,
    COUNT(*) FILTER (WHERE referrer ILIKE '%facebook%') AS facebook,
    COUNT(*) FILTER (WHERE referrer ILIKE '%ycombinator%') AS hacker_news,
    COUNT(*) FILTER (WHERE referrer ILIKE '%google%') AS google
  FROM page_views
  WHERE path = ${path} AND created_at >= NOW() - INTERVAL '24 hours'
`
const s = soc[0]
console.log(`${String(s.twitter).padStart(4)}  Twitter/X`)
console.log(`${String(s.linkedin).padStart(4)}  LinkedIn`)
console.log(`${String(s.reddit).padStart(4)}  Reddit`)
console.log(`${String(s.bluesky).padStart(4)}  Bluesky`)
console.log(`${String(s.threads).padStart(4)}  Threads`)
console.log(`${String(s.facebook).padStart(4)}  Facebook`)
console.log(`${String(s.hacker_news).padStart(4)}  Hacker News`)
console.log(`${String(s.google).padStart(4)}  Google`)

console.log('\n=== ALL REFERRERS (last 24h) ===')
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
