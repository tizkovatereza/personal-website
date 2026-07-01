"use client"

import * as React from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
  slug: string
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [liked, setLiked] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)
  const [pending, setPending] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}')
    if (likedPosts[slug]) {
      setLiked(true)
    }
    // Get the real like count from the server
    fetch(`/api/likes?slug=${encodeURIComponent(slug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.count === 'number') setCount(data.count)
      })
      .catch(() => {})
  }, [slug])

  async function handleLike() {
    if (pending) return
    setPending(true)

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}')
    const action = liked ? 'unlike' : 'like'

    // Optimistic update
    setLiked(!liked)
    setCount((prev) => Math.max(0, prev + (liked ? -1 : 1)))

    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, action }),
      })
      if (res.ok) {
        const data = await res.json()
        if (typeof data.count === 'number') setCount(data.count)
        if (action === 'like') {
          likedPosts[slug] = true
        } else {
          delete likedPosts[slug]
        }
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
      } else {
        // Revert on failure
        setLiked(liked)
        setCount((prev) => Math.max(0, prev + (liked ? 1 : -1)))
      }
    } catch {
      setLiked(liked)
      setCount((prev) => Math.max(0, prev + (liked ? 1 : -1)))
    } finally {
      setPending(false)
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-2">
        <Heart className="h-4 w-4" />
        <span className="text-sm tabular-nums">--</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className={cn(
        "gap-2 transition-colors",
        liked && "text-red-500 hover:text-red-600"
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all",
          liked && "fill-current scale-110"
        )}
      />
      <span className="text-sm tabular-nums">{count}</span>
    </Button>
  )
}
