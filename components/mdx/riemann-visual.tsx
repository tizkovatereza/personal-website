'use client'

import { useEffect, useRef, useState } from 'react'

export function RiemannVisual({ name, title }: { name: string, title: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(580)
  useEffect(() => {
    const resize = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.data?.type !== 'riemann-height') return
      const value = Number(event.data.height)
      if (Number.isFinite(value)) setHeight(Math.max(100, Math.min(1200, value + 8)))
    }
    window.addEventListener('message', resize)
    return () => window.removeEventListener('message', resize)
  }, [])
  return <figure className="not-prose my-10"><iframe ref={frame} title={title} src={`/visuals/riemann/${name}.html`} sandbox="allow-scripts" loading="lazy" style={{ width: '100%', height, border: 0, display: 'block', colorScheme: 'inherit' }} /></figure>
}

export function Equation({ children }: { children: React.ReactNode }) {
  return <div className="my-7 overflow-x-auto py-3 text-center font-serif text-lg sm:text-xl leading-relaxed" role="math">{children}</div>
}
