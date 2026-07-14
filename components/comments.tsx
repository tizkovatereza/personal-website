"use client"

import * as React from 'react'
import { Button } from '@/components/ui/button'

interface Comment {
  id: number
  name: string
  body: string
  created_at: string
}

interface CommentsProps {
  slug: string
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = React.useState<Comment[]>([])
  const [loading, setLoading] = React.useState(true)
  const [name, setName] = React.useState('')
  const [body, setBody] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.comments)) setComments(data.comments)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    if (body.trim().length === 0) {
      setError('Please write something first.')
      return
    }
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, body }),
      })
      const data = await res.json()
      if (res.ok && data.comment) {
        setComments((prev) => [data.comment, ...prev])
        setBody('')
        setName('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="font-mono text-[11px] font-light tracking-[0.1em] uppercase text-muted-foreground mb-6">
        {comments.length > 0 ? `Comments (${comments.length})` : 'Comments'}
      </h2>

      <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          maxLength={80}
          className="w-full max-w-sm bg-background border border-border px-3 py-2 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a comment…"
          rows={3}
          maxLength={2000}
          className="w-full bg-background border border-border px-3 py-2 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-y"
        />
        {error && <p className="text-[13px] text-red-500">{error}</p>}
        <div>
          <Button type="submit" size="sm" disabled={submitting}>
            {submitting ? 'Posting…' : 'Post comment'}
          </Button>
        </div>
      </form>

      {loading ? (
        <p className="text-[14px] text-muted-foreground">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-[14px] text-muted-foreground">No comments yet. Be the first to share your thoughts.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {comments.map((c) => (
            <li key={c.id} className="border-b border-border/40 pb-6 last:border-0">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[15px] font-medium text-foreground">{c.name}</span>
                <time className="font-mono text-[10px] font-light tracking-[0.05em] uppercase text-muted-foreground">
                  {formatDate(c.created_at)}
                </time>
              </div>
              <p className="text-[15px] leading-relaxed text-foreground/90 whitespace-pre-wrap">{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
