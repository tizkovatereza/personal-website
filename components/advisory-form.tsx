'use client'

import { useEffect, useState, type FormEvent } from 'react'

type Challenge = { token: string }
export function AdvisoryForm() {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [error, setError] = useState('')

  async function refresh() {
    setChallenge(null)
    try {
      const response = await fetch('/api/advisory', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setChallenge(data)
      setError('')
    } catch { setError('Could not load verification. Please try again.') }
  }
  useEffect(() => { void refresh() }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!challenge) return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/advisory', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, token: challenge.token }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Please try again.')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Your request could not be sent. Please try again.')
    }
  }
  if (status === 'success') return <p role="status" className="border-l-2 border-foreground pl-5 py-2 text-[16px] leading-relaxed">Your request has been received. Thank you.</p>
  const input = 'mt-2 block w-full border border-foreground/30 bg-foreground/[0.06] px-3 py-3 text-[15px] text-foreground focus:outline-none focus:border-foreground/70 focus:ring-1 focus:ring-foreground/50 rounded-none'
  return (
    <form onSubmit={submit} className="space-y-6 text-[14px]" aria-label="Consultation request">
      <div className="grid sm:grid-cols-2 gap-6">
        <label htmlFor="advisory-name">Name<input id="advisory-name" name="name" autoComplete="name" required maxLength={120} className={input} /></label>
        <label htmlFor="advisory-email">Email<input id="advisory-email" name="email" type="email" autoComplete="email" required maxLength={254} className={input} /></label>
      </div>
      <label htmlFor="advisory-company" className="block">Company or product <span className="text-secondary">(optional)</span><input id="advisory-company" name="company" autoComplete="organization" maxLength={200} className={input} /></label>
      <label htmlFor="advisory-message" className="block">What would you like to discuss?<textarea id="advisory-message" name="message" required minLength={20} maxLength={5000} rows={5} className={input} /></label>
      <label htmlFor="advisory-availability" className="block">Preferred times and time zone <span className="text-secondary">(optional)</span><input id="advisory-availability" name="availability" maxLength={500} className={input} /></label>
      <div className="absolute -left-[10000px]" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {error && <div role="alert" className="text-[14px] leading-relaxed text-red-600 dark:text-red-400"><p>{error}</p>{!challenge && <button type="button" onClick={refresh} className="underline underline-offset-4 mt-2">Try again</button>}</div>}
      <button type="submit" disabled={status === 'sending' || !challenge} className="px-6 py-3 bg-foreground text-background text-[14px] hover:opacity-80 disabled:opacity-40">{status === 'sending' ? 'Sending…' : 'Send request'}</button>
      <p className="text-[12px] leading-relaxed text-secondary">Your details will only be used to respond to this request.</p>
    </form>
  )
}
