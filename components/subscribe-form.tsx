"use client"

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
        setMessage(data.message || 'Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={variant === 'inline' ? '' : 'rounded-lg border border-border bg-card p-6'}>
        <div className="flex items-center gap-3 text-accent">
          <CheckCircle className="h-5 w-5" />
          <p className="font-medium">{message}</p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-secondary"
          disabled={status === 'loading'}
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Subscribe'
          )}
        </Button>
        {status === 'error' && (
          <p className="text-sm text-destructive mt-2">{message}</p>
        )}
      </form>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="font-serif text-xl font-semibold">Subscribe to the newsletter</h3>
        <p className="text-sm text-muted-foreground">
          Get new essays delivered to your inbox. No spam, unsubscribe anytime.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-secondary"
          disabled={status === 'loading'}
        />
        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
        {status === 'error' && (
          <p className="text-sm text-destructive">{message}</p>
        )}
      </form>
    </div>
  )
}
