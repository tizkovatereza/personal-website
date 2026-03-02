import { NextResponse } from 'next/server'

interface MessagePayload {
  message: string
  name?: string
  email?: string
  anonymous: boolean
}

export async function POST(request: Request) {
  try {
    const body: MessagePayload = await request.json()
    const { message, name, email, anonymous } = body

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Log the message (in production, this would send an email via Resend, SendGrid, etc.)
    console.log('=== New Message Received ===')
    console.log('Anonymous:', anonymous)
    console.log('Message:', message)
    if (!anonymous) {
      console.log('Name:', name || 'Not provided')
      console.log('Email:', email || 'Not provided')
    }
    console.log('Timestamp:', new Date().toISOString())
    console.log('============================')

    // TODO: In production, send email to tereza.tizkova@gmail.com
    // Example with Resend:
    // 
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // 
    // await resend.emails.send({
    //   from: 'website@tereza.dev',
    //   to: 'tereza.tizkova@gmail.com',
    //   subject: anonymous ? 'Anonymous message from your website' : `Message from ${name || 'someone'}`,
    //   text: `
    //     ${anonymous ? 'Anonymous message' : `From: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}`}
    //     
    //     Message:
    //     ${message}
    //   `,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
