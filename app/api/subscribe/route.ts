import { NextResponse } from 'next/server'

// This is a stub implementation. In production, you would:
// 1. Validate the email
// 2. Store it in a database (Neon)
// 3. Send a confirmation email (Resend, SendGrid, etc.)

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

    // Log the subscription (for development)
    console.log('New subscriber:', email)

    // TODO: Add to database
    // const sql = neon(process.env.DATABASE_URL!)
    // await sql`INSERT INTO subscribers (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING`

    // TODO: Send confirmation email via Resend/SendGrid

    return NextResponse.json(
      { message: 'Thanks for subscribing! You\'ll receive a confirmation email shortly.' },
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
