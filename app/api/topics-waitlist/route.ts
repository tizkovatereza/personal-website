import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Insert email, ignore if already exists
    await sql`
      INSERT INTO topics_waitlist (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    )
  }
}
