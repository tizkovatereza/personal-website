"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ThemeToggle } from "./theme-toggle"

interface CharInfo {
  el: HTMLSpanElement
  x: number
  y: number
}

export function DontClickHere() {
  const [isHomepage, setIsHomepage] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 })
  const [isPoofing, setIsPoofing] = useState(false)
  const [walkFrame, setWalkFrame] = useState(0)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [direction, setDirection] = useState(1)
  
  const animationRef = useRef<number | null>(null)
  const charsRef = useRef<CharInfo[]>([])
  const targetIndexRef = useRef(0)

  useEffect(() => {
    setIsHomepage(window.location.pathname === '/')
  }, [])

  const prepareText = useCallback(() => {
    const chars: CharInfo[] = []
    
    // Find all text in home-content
    const container = document.querySelector('.home-content')
    if (!container) return chars
    
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT
        const parent = node.parentElement
        if (!parent) return NodeFilter.FILTER_REJECT
        if (parent.closest('a') || parent.closest('button') || parent.closest('nav')) return NodeFilter.FILTER_REJECT
        return NodeFilter.FILTER_ACCEPT
      }
    })
    
    const textNodes: Text[] = []
    let node
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }
    
    textNodes.forEach(textNode => {
      const text = textNode.textContent || ''
      const parent = textNode.parentNode as HTMLElement
      if (!parent) return
      
      const fragment = document.createDocumentFragment()
      
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span')
        span.textContent = text[i]
        span.className = 'robot-char'
        span.style.transition = 'opacity 0.1s'
        fragment.appendChild(span)
      }
      
      parent.replaceChild(fragment, textNode)
    })
    
    // Now collect all spans with their positions
    document.querySelectorAll('.robot-char').forEach(span => {
      const rect = span.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        chars.push({
          el: span as HTMLSpanElement,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        })
      }
    })
    
    return chars
  }, [])

  const restoreText = useCallback(() => {
    document.querySelectorAll('.robot-char').forEach(span => {
      const text = span.textContent || ''
      span.parentNode?.replaceChild(document.createTextNode(text), span)
    })
    document.querySelector('.home-content')?.normalize()
    charsRef.current = []
    targetIndexRef.current = 0
  }, [])

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') return
    
    if (isActive) {
      setIsPoofing(true)
      setTimeout(() => {
        restoreText()
        setIsActive(false)
        setIsPoofing(false)
      }, 300)
    } else {
      const button = document.querySelector('.robot-trigger')
      const rect = button?.getBoundingClientRect()
      setRobotPos({ x: rect?.left || 100, y: (rect?.bottom || 50) + 50 })
      setIsActive(true)
      
      setTimeout(() => {
        charsRef.current = prepareText()
        targetIndexRef.current = 0
      }, 50)
    }
  }

  useEffect(() => {
    if (!isActive || isPoofing) return

    const speed = 200
    let lastTime = performance.now()

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000
      lastTime = time

      setWalkFrame(f => (f + 1) % 20)

      const chars = charsRef.current
      let idx = targetIndexRef.current
      
      // Skip eaten chars
      while (idx < chars.length && chars[idx].el.style.opacity === '0') {
        idx++
        targetIndexRef.current = idx
      }

      if (idx >= chars.length) {
        // All done, wander
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const target = chars[idx]
      // Update target position in case of scroll
      const rect = target.el.getBoundingClientRect()
      const tx = rect.left + rect.width / 2
      const ty = rect.top + rect.height / 2

      setRobotPos(prev => {
        const dx = tx - prev.x
        const dy = ty - prev.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dx > 2) setDirection(1)
        else if (dx < -2) setDirection(-1)

        if (dist < 25) {
          // Eat it!
          setMouthOpen(true)
          setTimeout(() => setMouthOpen(false), 80)
          target.el.style.opacity = '0'
          targetIndexRef.current++
          return prev
        }

        return {
          x: prev.x + (dx / dist) * speed * dt,
          y: prev.y + (dy / dist) * speed * dt
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [isActive, isPoofing])

  const legOffset = Math.sin(walkFrame * 0.5) * 4

  return (
    <>
      <div className="fixed top-5 right-5 z-50 flex flex-col items-end gap-2">
        {isHomepage && (
          <button onClick={handleClick} className="robot-trigger font-mono text-[11px] text-muted-foreground hover:text-secondary transition-colors cursor-pointer bg-transparent border-none p-0">
            don&apos;t click here
          </button>
        )}
        <ThemeToggle />
      </div>

      {isActive && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: robotPos.x,
            top: robotPos.y,
            transform: `translate(-50%, -50%) scaleX(${direction}) ${isPoofing ? 'scale(1.5)' : 'scale(1)'}`,
            opacity: isPoofing ? 0 : 1,
            transition: isPoofing ? 'all 0.3s' : 'none',
          }}
        >
          <svg width="70" height="80" viewBox="0 0 70 80" fill="none">
            <line x1="35" y1="8" x2="35" y2="0" stroke="#8b9bb5" strokeWidth="2" />
            <circle cx="35" cy="0" r="4" fill="#8b9bb5" className="animate-pulse" />
            <rect x="15" y="8" width="40" height="28" rx="4" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" />
            <circle cx="25" cy="20" r="3.5" fill="#8b9bb5" className="animate-pulse" />
            <circle cx="45" cy="20" r="3.5" fill="#8b9bb5" className="animate-pulse" />
            <rect x="18" y={mouthOpen ? 25 : 30} width="34" height={mouthOpen ? 12 : 4} rx="2" fill="#0a0e17" stroke="#8b9bb5" strokeWidth="1.5" />
            {mouthOpen && (
              <>
                <rect x="20" y="26" width="4" height="3" fill="#e5e7eb" />
                <rect x="26" y="26" width="4" height="4" fill="#e5e7eb" />
                <rect x="32" y="26" width="4" height="3" fill="#e5e7eb" />
                <rect x="38" y="26" width="4" height="4" fill="#e5e7eb" />
                <rect x="44" y="26" width="4" height="3" fill="#e5e7eb" />
                <rect x="20" y="33" width="4" height="3" fill="#e5e7eb" />
                <rect x="26" y="32" width="4" height="4" fill="#e5e7eb" />
                <rect x="32" y="33" width="4" height="3" fill="#e5e7eb" />
                <rect x="38" y="32" width="4" height="4" fill="#e5e7eb" />
                <rect x="44" y="33" width="4" height="3" fill="#e5e7eb" />
              </>
            )}
            <rect x="10" y="38" width="50" height="25" rx="3" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" />
            <rect x="18" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <rect x="31" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <rect x="44" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <circle cx="22" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            <circle cx="35" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            <circle cx="48" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            <rect x="18" y="63" width="10" height="14" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" style={{ transform: `translateY(${legOffset}px)` }} />
            <rect x="42" y="63" width="10" height="14" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" style={{ transform: `translateY(${-legOffset}px)` }} />
            <rect x="15" y="75" width="16" height="5" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="1" style={{ transform: `translateY(${legOffset}px)` }} />
            <rect x="39" y="75" width="16" height="5" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="1" style={{ transform: `translateY(${-legOffset}px)` }} />
          </svg>
        </div>
      )}
    </>
  )
}
