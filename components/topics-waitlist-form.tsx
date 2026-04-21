'use client'

import { useState } from 'react'

export function TopicsWaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/topics-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="font-light text-[13px] sm:text-[14px] text-primary leading-relaxed">
        You're on the list! We'll notify you when Topics launches.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="font-light text-[13px] sm:text-[14px] text-secondary leading-relaxed">
        A curated reading app for thoughtful people. Coming soon.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 bg-background border border-border text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-[12px] font-mono uppercase tracking-wider hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Notify me'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-[12px] text-red-400">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
