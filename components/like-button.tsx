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

  React.useEffect(() => {
    setMounted(true)
    // Check if user has already liked this post
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}')
    if (likedPosts[slug]) {
      setLiked(true)
    }
    // Get like count from localStorage (simulated)
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}')
    setCount(likeCounts[slug] || Math.floor(Math.random() * 50) + 10)
  }, [slug])

  function handleLike() {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}')
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}')
    
    if (liked) {
      // Unlike
      delete likedPosts[slug]
      likeCounts[slug] = Math.max(0, (likeCounts[slug] || count) - 1)
      setLiked(false)
      setCount((prev) => Math.max(0, prev - 1))
    } else {
      // Like
      likedPosts[slug] = true
      likeCounts[slug] = (likeCounts[slug] || count) + 1
      setLiked(true)
      setCount((prev) => prev + 1)
    }

    localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts))
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
