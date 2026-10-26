"use client"

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

interface WritingLikeCountProps {
  source: string
  slug?: string
  count?: number
}

export function WritingLikeCount({ source, slug, count }: WritingLikeCountProps) {
  const [nativeCount, setNativeCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(Boolean(slug))

  useEffect(() => {
    if (!slug) return
    const controller = new AbortController()
    setLoading(true)
    setNativeCount(null)
    fetch(`/api/likes?slug=${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(async (response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!controller.signal.aborted && Number.isSafeInteger(data?.count) && data.count >= 0) {
          setNativeCount(data.count)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [slug])

  const value = slug ? nativeCount : count
  if (!slug && count === undefined) return null
  const label = loading ? 'Loading likes' : value == null ? 'Likes unavailable' : `${value} ${value === 1 ? 'like' : 'likes'}`

  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`${label} on ${source}`}>
      <Heart className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}
