"use client"

import * as React from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

interface SubscribeFormProps {
  variant?: 'default' | 'inline'
}

export function SubscribeForm({ variant = 'default' }: SubscribeFormProps) {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!email) return

    setStatus('loading')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Signal received. You are now subscribed.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Transmission failed. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Transmission failed. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={variant === 'inline' ? '' : 'border border-border bg-card p-6'}>
        <div className="flex items-center gap-3 text-primary">
          <CheckCircle className="h-5 w-5" />
          <p className="font-mono text-sm">{message}</p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-3 py-2 bg-muted border border-border font-mono text-sm focus:outline-none focus:border-primary"
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="px-4 py-2 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'SUBSCRIBE'
          )}
        </button>
        {status === 'error' && (
          <p className="text-sm text-destructive mt-2">{message}</p>
        )}
      </form>
    )
  }

  return (
    <div className="border border-border bg-card p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 bg-secondary signal-dot" />
          <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">SUBSCRIBE</h3>
        </div>
        <h3 className="font-display text-xl font-bold tracking-wide uppercase">JOIN THE SIGNAL</h3>
        <p className="text-sm text-muted-foreground">
          Get new transmissions delivered to your inbox. No spam, unsubscribe anytime.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-3 bg-muted border border-border font-mono text-sm focus:outline-none focus:border-primary"
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          className="w-full py-3 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase disabled:opacity-50 hover:bg-primary/90 transition-colors"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              TRANSMITTING...
            </span>
          ) : (
            'SUBSCRIBE'
          )}
        </button>
        {status === 'error' && (
          <p className="text-sm text-destructive font-mono">{message}</p>
        )}
      </form>
    </div>
  )
}
