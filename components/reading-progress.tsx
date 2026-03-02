"use client"

import * as React from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-0.5 bg-border/40">
      <div
        className="h-full bg-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  )
}
