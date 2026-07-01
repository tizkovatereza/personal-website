import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

function getSql() {
  return neon(process.env.DATABASE_URL!)
}

async function ensureTable(sql: ReturnType<typeof getSql>) {
  await sql`
    CREATE TABLE IF NOT EXISTS post_likes (
      slug TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `
}

export async function GET(request: Request) {
  try {
    const slug = new URL(request.url).searchParams.get('slug')
    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }

    const sql = getSql()
    await ensureTable(sql)

    const rows = await sql`SELECT count FROM post_likes WHERE slug = ${slug}`
    const count = rows.length > 0 ? Number(rows[0].count) : 0

    return NextResponse.json({ count }, { status: 200 })
  } catch (error) {
    console.error('Likes GET error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { slug, action } = await request.json()

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }
    if (action !== 'like' && action !== 'unlike') {
      return NextResponse.json({ error: 'invalid action' }, { status: 400 })
    }

    const sql = getSql()
    await ensureTable(sql)

    if (action === 'like') {
      const rows = await sql`
        INSERT INTO post_likes (slug, count) VALUES (${slug}, 1)
        ON CONFLICT (slug) DO UPDATE SET count = post_likes.count + 1
        RETURNING count
      `
      return NextResponse.json({ count: Number(rows[0].count) }, { status: 200 })
    }

    const rows = await sql`
      UPDATE post_likes SET count = GREATEST(0, count - 1) WHERE slug = ${slug}
      RETURNING count
    `
    const count = rows.length > 0 ? Number(rows[0].count) : 0
    return NextResponse.json({ count }, { status: 200 })
  } catch (error) {
    console.error('Likes POST error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
