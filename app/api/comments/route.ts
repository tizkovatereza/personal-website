import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

function getSql() {
  return neon(process.env.DATABASE_URL!)
}

async function ensureTable(sql: ReturnType<typeof getSql>) {
  await sql`
    CREATE TABLE IF NOT EXISTS post_comments (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT 'Anonymous',
      body TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_post_comments_slug ON post_comments (slug, created_at)`
}

export async function GET(request: Request) {
  try {
    const slug = new URL(request.url).searchParams.get('slug')
    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }

    const sql = getSql()
    await ensureTable(sql)

    const comments = await sql`
      SELECT id, name, body, created_at
      FROM post_comments
      WHERE slug = ${slug}
      ORDER BY created_at DESC
      LIMIT 200
    `

    return NextResponse.json({ comments }, { status: 200 })
  } catch (error) {
    console.error('Comments GET error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { slug, name, body } = await request.json()

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }
    if (!body || typeof body !== 'string' || body.trim().length === 0) {
      return NextResponse.json({ error: 'Comment cannot be empty.' }, { status: 400 })
    }
    if (body.trim().length > 2000) {
      return NextResponse.json({ error: 'Comment is too long (2000 char max).' }, { status: 400 })
    }

    const cleanName =
      typeof name === 'string' && name.trim().length > 0
        ? name.trim().slice(0, 80)
        : 'Anonymous'
    const cleanBody = body.trim().slice(0, 2000)

    const sql = getSql()
    await ensureTable(sql)

    const rows = await sql`
      INSERT INTO post_comments (slug, name, body)
      VALUES (${slug}, ${cleanName}, ${cleanBody})
      RETURNING id, name, body, created_at
    `

    return NextResponse.json({ comment: rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Comments POST error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
