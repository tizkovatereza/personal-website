"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface Particle {
  id: number
  x: number
  y: number
  opacity: number
  vx: number
  vy: number
}

interface CharSpan {
  span: HTMLSpanElement
  originalParent: Node
}

export function DontClickHere() {
  const [isActive, setIsActive] = useState(false)
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [isPoofing, setIsPoofing] = useState(false)
  const [walkFrame, setWalkFrame] = useState(0)
  const [mouthOpen, setMouthOpen] = useState(false)
  const mouthCounterRef = useRef(0)
  
  const animationRef = useRef<number | null>(null)
  const hiddenSpansRef = useRef<CharSpan[]>([])
  const charQueueRef = useRef<HTMLSpanElement[]>([])
  const currentTargetRef = useRef<number>(0)
  const lastEatTimeRef = useRef<number>(0)
  const particleIdRef = useRef(0)

  // Wrap text nodes in character spans for eating
  const prepareTextForEating = useCallback(() => {
    const selector = 'main h1, main h2, main h3, main p, main span:not(.robot-ignore), main a:not(.robot-ignore), article h1, article h2, article p, section h1, section h2, section p, .font-serif, [class*="text-foreground"]'
    const elements = document.querySelectorAll(selector)
    const chars: HTMLSpanElement[] = []

    elements.forEach(el => {
      // Skip nav, footer, button itself
      if (el.closest('nav') || el.closest('footer') || el.closest('.sidebar') || el.closest('button') || el.closest('[aria-hidden="true"]')) return
      
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null)
      const textNodes: Text[] = []
      
      let node
      while (node = walker.nextNode()) {
        if (node.textContent && node.textContent.trim()) {
          textNodes.push(node as Text)
        }
      }

      textNodes.forEach(textNode => {
        const text = textNode.textContent || ''
        const parent = textNode.parentNode
        if (!parent) return

        const fragment = document.createDocumentFragment()
        for (let i = 0; i < text.length; i++) {
          const span = document.createElement('span')
          span.textContent = text[i]
          span.className = 'robot-char'
          span.style.transition = 'opacity 0.05s'
          fragment.appendChild(span)
          chars.push(span)
        }
        parent.replaceChild(fragment, textNode)
      })
    })

    return chars
  }, [])

  // Restore all eaten text
  const restoreText = useCallback(() => {
    hiddenSpansRef.current.forEach(({ span }) => {
      span.style.opacity = '1'
      span.style.visibility = 'visible'
    })
    hiddenSpansRef.current = []
    charQueueRef.current = []
    currentTargetRef.current = 0
  }, [])

  // Add particle effect
  const addParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: x + Math.random() * 10 - 5,
        y: y + Math.random() * 10 - 5,
        opacity: 1,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 3 - 1,
      })
    }
    setParticles(prev => [...prev, ...newParticles])
  }, [])

  const handleClick = () => {
    if (isActive) {
      // Dismiss - poof and restore
      setIsPoofing(true)
      setTimeout(() => {
        restoreText()
        setIsActive(false)
        setIsPoofing(false)
        setParticles([])
      }, 300)
    } else {
      // Activate robot
      const buttonRect = document.querySelector('button.robot-trigger')?.getBoundingClientRect()
      const startX = buttonRect ? buttonRect.left : window.innerWidth - 100
      const startY = buttonRect ? buttonRect.bottom + 20 : 80
      
      setRobotPos({ x: startX, y: startY })
      setIsActive(true)
      charQueueRef.current = prepareTextForEating()
      currentTargetRef.current = 0
    }
  }

  // Animation loop
  useEffect(() => {
    if (!isActive || isPoofing) return

    const speed = 120 // pixels per second
    let lastTime = performance.now()

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000
      lastTime = time

      // Walk frame animation
      setWalkFrame(prev => (prev + 1) % 20)
      
      // Mouth open/close animation - slower, every 8 frames
      mouthCounterRef.current++
      if (mouthCounterRef.current >= 8) {
        mouthCounterRef.current = 0
        setMouthOpen(prev => !prev)
      }

      // Move robot toward next character
      const chars = charQueueRef.current
      const targetIdx = currentTargetRef.current

      if (targetIdx < chars.length) {
        const targetChar = chars[targetIdx]
        const rect = targetChar.getBoundingClientRect()
        const targetX = rect.left + rect.width / 2
        const targetY = rect.top + rect.height / 2

        setRobotPos(prev => {
          const dx = targetX - prev.x
          const dy = targetY - prev.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 20) {
            // Eat the character
            const now = performance.now()
            if (now - lastEatTimeRef.current > 40) {
              targetChar.style.opacity = '0'
              targetChar.style.visibility = 'hidden'
              hiddenSpansRef.current.push({ span: targetChar, originalParent: targetChar.parentNode! })
              currentTargetRef.current++
              lastEatTimeRef.current = now
              addParticles(prev.x + 30, prev.y + 20)
            }
            return prev
          }

          const moveX = (dx / dist) * speed * deltaTime
          const moveY = (dy / dist) * speed * deltaTime

          return {
            x: prev.x + moveX,
            y: prev.y + moveY,
          }
        })
      }

      // Update particles
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.05,
          }))
          .filter(p => p.opacity > 0)
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, isPoofing, addParticles])

  const legOffset = Math.sin(walkFrame * 0.5) * 4

  return (
    <>
      {/* The button */}
      <button
        onClick={handleClick}
        className="robot-trigger fixed top-5 right-5 z-50 font-mono text-[11px] text-muted-foreground hover:text-secondary transition-colors cursor-pointer bg-transparent border-none p-0"
      >
        don't click here
      </button>

      {/* Robot */}
      {isActive && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: robotPos.x,
            top: robotPos.y,
            transform: `translate(-50%, -50%) ${isPoofing ? 'scale(1.5)' : 'scale(1)'}`,
            opacity: isPoofing ? 0 : 1,
            transition: isPoofing ? 'transform 0.3s ease-out, opacity 0.3s ease-out' : 'none',
          }}
        >
          <svg width="70" height="80" viewBox="0 0 70 80" fill="none">
            {/* Antenna */}
            <line x1="35" y1="8" x2="35" y2="0" stroke="#8b9bb5" strokeWidth="2" />
            <circle cx="35" cy="0" r="4" fill="#8b9bb5" className="animate-pulse" />
            
            {/* Head */}
            <rect x="15" y="8" width="40" height="28" rx="4" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" />
            
            {/* Eyes - smaller */}
            <circle cx="25" cy="20" r="3.5" fill="#8b9bb5" className="animate-pulse" />
            <circle cx="45" cy="20" r="3.5" fill="#8b9bb5" className="animate-pulse" />
            
            {/* Mouth - animates open/closed with teeth */}
            <rect 
              x="18" 
              y={mouthOpen ? 25 : 30} 
              width="34" 
              height={mouthOpen ? 12 : 4} 
              rx="2" 
              fill="#0a0e17" 
              stroke="#8b9bb5" 
              strokeWidth="1.5" 
            />
            {/* Top teeth - always visible when open */}
            {mouthOpen && (
              <>
                <path d="M20 25 L20 29 L24 29 L24 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M25 25 L25 30 L29 30 L29 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M30 25 L30 29 L34 29 L34 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M35 25 L35 30 L39 30 L39 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M40 25 L40 29 L44 29 L44 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M45 25 L45 30 L50 30 L50 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                {/* Bottom teeth */}
                <path d="M20 37 L20 33 L24 33 L24 37" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M25 37 L25 32 L29 32 L29 37" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M30 37 L30 33 L34 33 L34 37" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M35 37 L35 32 L39 32 L39 37" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M40 37 L40 33 L44 33 L44 37" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M45 37 L45 32 L50 32 L50 37" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
              </>
            )}
            
            {/* Body */}
            <rect x="10" y="38" width="50" height="25" rx="3" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" />
            
            {/* Body details */}
            <rect x="18" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <rect x="31" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <rect x="44" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <circle cx="22" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            <circle cx="35" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            <circle cx="48" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            
            {/* Left leg */}
            <rect 
              x="18" 
              y="63" 
              width="10" 
              height="14" 
              rx="2" 
              fill="#1a1f2e" 
              stroke="#2a3142" 
              strokeWidth="2"
              style={{ transform: `translateY(${legOffset}px)`, transformOrigin: '23px 63px' }}
            />
            
            {/* Right leg */}
            <rect 
              x="42" 
              y="63" 
              width="10" 
              height="14" 
              rx="2" 
              fill="#1a1f2e" 
              stroke="#2a3142" 
              strokeWidth="2"
              style={{ transform: `translateY(${-legOffset}px)`, transformOrigin: '47px 63px' }}
            />
            
            {/* Feet */}
            <rect x="15" y="75" width="16" height="5" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="1" style={{ transform: `translateY(${legOffset}px)` }} />
            <rect x="39" y="75" width="16" height="5" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="1" style={{ transform: `translateY(${-legOffset}px)` }} />
          </svg>
        </div>
      )}

      {/* Crumb particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="fixed w-2 h-2 rounded-full bg-secondary pointer-events-none z-[9998]"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.opacity,
          }}
        />
      ))}
    </>
  )
}
