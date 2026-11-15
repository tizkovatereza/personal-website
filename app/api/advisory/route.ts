import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import { Resolver } from 'node:dns/promises'
import { domainToASCII } from 'node:url'
import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function signingKey() {
  const key = process.env.ADVISORY_FORM_SECRET || process.env.DATABASE_URL
  if (!key) throw new Error('Advisory form is not configured')
  return key
}
function sign(value: string) {
  return createHmac('sha256', signingKey()).update(`advisory-form:${value}`).digest('hex')
}
export async function GET() {
  try {
    const payload = Buffer.from(JSON.stringify({ issued: Date.now(), nonce: randomUUID() })).toString('base64url')
    return NextResponse.json({ token: `${payload}.${sign(payload)}` }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'The form is temporarily unavailable. Please try again later.' }, { status: 503 })
  }
}
export async function POST(request: Request) {
  const fail = (error: string, status = 400) => NextResponse.json({ error }, { status })
  try {
    const origin = request.headers.get('origin')
    if (origin && new URL(origin).host !== request.headers.get('host')) return fail('Please submit the form from this website.', 403)
    if (Number(request.headers.get('content-length') || 0) > 16000) return fail('Your message is too long.', 413)
    const raw = await request.text()
    if (raw.length > 16000) return fail('Your message is too long.', 413)
    let body
    try { body = JSON.parse(raw) } catch { return fail('Please check the form and try again.') }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return fail('Please check the form and try again.')
    const field = (key: string) => typeof body[key] === 'string' ? body[key].trim() : ''
    if (field('website')) return fail('Unable to verify this submission.')
    const name = field('name'), email = field('email').toLowerCase(), company = field('company'), message = field('message'), availability = field('availability')
    if (!name || name.length > 120) return fail('Please enter your name (up to 120 characters).')
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Please enter a valid email address.')
    if (company.length > 200 || availability.length > 500 || message.length < 20 || message.length > 5000) return fail('Please describe what you’d like to discuss in 20–5,000 characters.')
    const token = field('token')
    if (token.length > 1000) return fail('Please reload the form and try again.')
    const [payload, signature] = token.split('.')
    if (!payload || !signature || !/^[a-f0-9]{64}$/.test(signature)) return fail('Please reload the form and try again.')
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(sign(payload)))) return fail('Please reload the form and try again.')
    let challenge
    try { challenge = JSON.parse(Buffer.from(payload, 'base64url').toString()) } catch { return fail('Please reload the form and try again.') }
    const age = Date.now() - challenge.issued
    if (!Number.isFinite(age) || age < 2000 || age > 60 * 60 * 1000 || !/^[a-f0-9-]{36}$/.test(challenge.nonce)) return fail('Please reload the form and try again.')
    if (!process.env.DATABASE_URL) return fail('The form is temporarily unavailable.', 503)
    const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'local'
    const fingerprint = sign(`rate:${ip}`)
    const sql = neon(process.env.DATABASE_URL)
    const emailFingerprint = sign(`email-rate:${email}`)
    const rate = await sql`
      INSERT INTO advisory_rate_limits (fingerprint, bucket, attempts)
      VALUES (${fingerprint}, date_trunc('hour', NOW()), 1), (${emailFingerprint}, date_trunc('hour', NOW()), 1)
      ON CONFLICT (fingerprint, bucket) DO UPDATE SET attempts = advisory_rate_limits.attempts + 1
      RETURNING attempts
    `
    if (rate.some(row => Number(row.attempts) > 3)) return fail('You’ve reached the submission limit. Please try again later.', 429)
    const domain = domainToASCII(email.slice(email.lastIndexOf('@') + 1))
    if (!domain || domain.length > 253 || !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain)) return fail('Please enter an email address with a valid domain.')
    try {
      const resolver = new Resolver({ timeout: 3000, tries: 1 })
      const records = await resolver.resolveMx(domain)
      if (!records.some(record => record.exchange && record.exchange !== '.')) return fail('That email domain does not appear to accept mail. Please check your email address.')
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      if (code === 'ENOTFOUND' || code === 'ENODATA') return fail('That email domain does not appear to accept mail. Please check your email address.')
      return fail('We couldn’t check your email domain right now. Please try again shortly.', 503)
    }
    const id = randomUUID()
    const rows = await sql`
      INSERT INTO advisory_requests (id, challenge_nonce, name, email, company, message, availability)
      VALUES (${id}::uuid, ${challenge.nonce}::uuid, ${name}, ${email}, ${company}, ${message}, ${availability})
      ON CONFLICT (challenge_nonce) DO NOTHING
      RETURNING id
    `
    if (!rows.length) return fail('This request was already sent, or you’ve reached the limit. Please try again later.', 429)
    return NextResponse.json({ success: true, reference: rows[0].id }, { status: 201 })
  } catch {
    return fail('Your request could not be saved. Please try again.', 503)
  }
}
