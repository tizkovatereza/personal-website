"use client"

import { useState } from 'react'
import { X, Send } from 'lucide-react'
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
      }, 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <>
      {/* Floating Bubble - Square, dark, glows pink on hover */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-card border border-border text-foreground transition-all duration-300 glow-border",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="Send me a message"
      >
        <span className="w-2 h-2 bg-primary signal-dot" />
        <span className="font-mono text-xs tracking-widest uppercase">SAY HI</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal - Square, dark, sci-fi aesthetic */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md bg-card border border-border overflow-hidden transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary signal-dot" />
            <h3 className="font-mono text-xs tracking-widest uppercase">TRANSMIT MESSAGE</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 border border-border hover:border-primary hover:text-primary transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        {status === 'sent' ? (
          <div className="p-8 text-center relative overflow-hidden">
            {/* Orbital animation on success */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 border border-primary/30 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 border border-secondary/30 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
              <div className="absolute inset-4 border border-primary/30 animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-3 h-3 bg-primary orbit-send" />
              </div>
            </div>
            <p className="font-display text-lg font-bold tracking-wider uppercase mb-2">TRANSMITTED</p>
            <p className="font-mono text-xs text-muted-foreground">Signal received</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Message */}
            <div>
              <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">
                MESSAGE
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter transmission..."
                rows={4}
                className="w-full px-3 py-2 bg-muted border border-border resize-none focus:outline-none focus:border-primary placeholder:text-muted-foreground font-mono text-sm"
                required
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAnonymous(true)}
                className={cn(
                  "flex-1 py-2 px-3 font-mono text-[10px] tracking-widest uppercase transition-colors border",
                  isAnonymous 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground"
                )}
              >
                ANONYMOUS
              </button>
              <button
                type="button"
                onClick={() => setIsAnonymous(false)}
                className={cn(
                  "flex-1 py-2 px-3 font-mono text-[10px] tracking-widest uppercase transition-colors border",
                  !isAnonymous 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground"
                )}
              >
                IDENTIFIED
              </button>
            </div>

            {/* Contact Fields */}
            {!isAnonymous && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                <div>
                  <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">
                    DESIGNATION
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 bg-muted border border-border focus:outline-none focus:border-primary placeholder:text-muted-foreground font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">
                    CONTACT FREQUENCY
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 bg-muted border border-border focus:outline-none focus:border-primary placeholder:text-muted-foreground font-mono text-sm"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending' || !message.trim()}
              className={cn(
                "w-full py-3 px-4 font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all border",
                status === 'sending' || !message.trim()
                  ? "bg-muted text-muted-foreground border-border cursor-not-allowed"
                  : "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
              )}
            >
              {status === 'sending' ? (
                <>
                  <div className="w-3 h-3 border border-current border-t-transparent animate-spin" />
                  TRANSMITTING...
                </>
              ) : status === 'error' ? (
                'TRANSMISSION FAILED'
              ) : (
                <>
                  <Send className="h-3 w-3" />
                  TRANSMIT
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </>
  )
}
