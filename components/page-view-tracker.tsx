'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || null,
          }),
        })
      } catch (error) {
        // Silently fail - don't break the page if tracking fails
        console.error('Failed to track page view:', error)
      }
    }

    trackPageView()
  }, [pathname])

  return null
}
