import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Basic email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Add to database
    const sql = neon(process.env.DATABASE_URL!)
    
    // Check if already subscribed
    const existing = await sql`
      SELECT email, unsubscribed FROM writing_subscribers WHERE email = ${email.toLowerCase()}
    `
    
    if (existing.length > 0) {
      if (existing[0].unsubscribed) {
        // Re-subscribe
        await sql`
          UPDATE writing_subscribers 
          SET unsubscribed = false, confirmed = true 
          WHERE email = ${email.toLowerCase()}
        `
        return NextResponse.json(
          { message: 'Welcome back! You are now re-subscribed.' },
          { status: 200 }
        )
      }
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 200 }
      )
    }
    
    // Insert new subscriber
    await sql`
      INSERT INTO writing_subscribers (email, confirmed) 
      VALUES (${email.toLowerCase()}, true)
    `

    return NextResponse.json(
      { message: 'You are now subscribed to new articles!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
