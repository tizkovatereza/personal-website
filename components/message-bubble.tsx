"use client"

import { useState } from 'react'
import { Mail, X, Send, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MessageBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setStatus('sending')

    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          name: isAnonymous ? undefined : name,
          email: isAnonymous ? undefined : email,
          anonymous: isAnonymous,
        }),
      })

      if (!res.ok) throw new Error('Failed to send')

      setStatus('sent')
      setTimeout(() => {
        setIsOpen(false)
        setStatus('idle')
        setMessage('')
        setName('')
        setEmail('')
      }, 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <>
      {/* Floating Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="Send me a message"
      >
        <Mail className="h-5 w-5" />
        <span className="font-medium text-sm">say hi</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md bg-card rounded-3xl shadow-2xl border border-border overflow-hidden transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-serif text-lg font-semibold">Send me something</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full hover:bg-secondary transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        {status === 'sent' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <p className="font-serif text-xl font-semibold mb-2">sent!</p>
            <p className="text-sm text-muted-foreground">Thanks for reaching out</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Message */}
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-secondary border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAnonymous(true)}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors",
                  isAnonymous 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                Send anonymously
              </button>
              <button
                type="button"
                onClick={() => setIsAnonymous(false)}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors",
                  !isAnonymous 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                Include my info
              </button>
            </div>

            {/* Contact Fields (shown when not anonymous) */}
            {!isAnonymous && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending' || !message.trim()}
              className={cn(
                "w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all",
                status === 'sending' || !message.trim()
                  ? "bg-secondary text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              )}
            >
              {status === 'sending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : status === 'error' ? (
                'Failed to send. Try again?'
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </>
  )
}
