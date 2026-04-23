"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ThemeToggle } from "./theme-toggle"

interface Particle {
  id: number
  x: number
  y: number
  char: string
  vx: number
  vy: number
  life: number
}

export function DontClickHere() {
  const [isHomepage, setIsHomepage] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 })
  const [isPoofing, setIsPoofing] = useState(false)
  const [walkFrame, setWalkFrame] = useState(0)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  const [particles, setParticles] = useState<Particle[]>([])
  
  const animationRef = useRef<number | null>(null)
  const charQueueRef = useRef<HTMLSpanElement[]>([])
  const currentTargetRef = useRef(0)
  const lastEatTimeRef = useRef(0)
  const hiddenSpansRef = useRef<{span: HTMLSpanElement, originalText: string, parent: Node}[]>([])
  const particleIdRef = useRef(0)

  // Check if on homepage
  useEffect(() => {
    setIsHomepage(window.location.pathname === '/')
  }, [])

  // Prepare text for eating - ONLY target mono/code text which has no letter-spacing issues
  const prepareTextForEating = useCallback(() => {
    // Only target mono text and specific safe elements
    const selector = '.home-content .font-mono:not(button):not(a), .home-content time, .home-content .tracking-\\[0\\.05em\\]'
    const elements = document.querySelectorAll(selector)
    const chars: HTMLSpanElement[] = []

    elements.forEach(el => {
      // Skip nav, footer, buttons
      if (el.closest('nav') || el.closest('footer') || el.closest('button') || el.closest('a')) return
      if (el.querySelector('.robot-char')) return // Already processed
      
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
        if (!parent || !(parent instanceof HTMLElement)) return

        // Get computed styles to preserve exact appearance
        const computedStyle = window.getComputedStyle(parent)
        
        const fragment = document.createDocumentFragment()
        
        for (let i = 0; i < text.length; i++) {
          const span = document.createElement('span')
          span.textContent = text[i]
          span.className = 'robot-char'
          // Copy essential styles to prevent layout shift
          span.style.cssText = `
            font-family: ${computedStyle.fontFamily};
            font-size: ${computedStyle.fontSize};
            font-weight: ${computedStyle.fontWeight};
            letter-spacing: ${computedStyle.letterSpacing};
            line-height: ${computedStyle.lineHeight};
            transition: opacity 0.05s;
          `
          fragment.appendChild(span)
          chars.push(span)
        }
        parent.replaceChild(fragment, textNode)
      })
    })

    return chars
  }, [])

  // Restore text when robot is dismissed
  const restoreText = useCallback(() => {
    // Remove all robot-char spans and restore original text
    document.querySelectorAll('.robot-char').forEach(span => {
      const text = span.textContent || ''
      const textNode = document.createTextNode(text)
      span.parentNode?.replaceChild(textNode, span)
    })
    // Normalize to merge adjacent text nodes
    document.querySelectorAll('.home-content')?.forEach(el => {
      (el as HTMLElement).normalize()
    })
    hiddenSpansRef.current = []
    charQueueRef.current = []
    currentTargetRef.current = 0
  }, [])

  // Add particles when eating
  const addParticles = useCallback((x: number, y: number, char: string) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        char,
        vx: (Math.random() - 0.5) * 100,
        vy: -Math.random() * 80 - 20,
        life: 1,
      })
    }
    setParticles(prev => [...prev, ...newParticles])
  }, [])

  const handleClick = () => {
    // Only allow robot on homepage
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      return
    }
    
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
      // Get the button position to start the robot from there
      const button = document.querySelector('.robot-trigger')
      const buttonRect = button?.getBoundingClientRect()
      
      // Start robot from the button position
      const startX = buttonRect ? buttonRect.left : window.innerWidth - 100
      const startY = buttonRect ? buttonRect.bottom + 40 : 80
      
      setRobotPos({ x: startX, y: startY })
      setIsActive(true)
      
      // Prepare text after a short delay to ensure DOM is ready
      setTimeout(() => {
        const chars = prepareTextForEating()
        charQueueRef.current = chars
        currentTargetRef.current = 0
      }, 100)
    }
  }

  // Animation loop - robot moves toward characters and eats them
  useEffect(() => {
    if (!isActive || isPoofing) return

    const speed = 150 // pixels per second
    let lastTime = performance.now()

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000
      lastTime = time

      // Walk frame animation
      setWalkFrame(prev => (prev + 1) % 20)

      // Update particles
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx * deltaTime,
            y: p.y + p.vy * deltaTime,
            vy: p.vy + 200 * deltaTime, // gravity
            life: p.life - deltaTime * 2,
          }))
          .filter(p => p.life > 0)
      )

      // Move robot toward next character
      const chars = charQueueRef.current
      const targetIdx = currentTargetRef.current

      if (chars.length > 0 && targetIdx < chars.length) {
        const targetChar = chars[targetIdx]
        
        // Skip if element is no longer in DOM
        if (!targetChar || !targetChar.isConnected || targetChar.style.opacity === '0') {
          currentTargetRef.current++
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        
        const rect = targetChar.getBoundingClientRect()
        
        // Skip characters with zero dimensions
        if (rect.width === 0 && rect.height === 0) {
          currentTargetRef.current++
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        
        const targetX = rect.left + rect.width / 2
        const targetY = rect.top + rect.height / 2

        setRobotPos(prev => {
          const dx = targetX - prev.x
          const dy = targetY - prev.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Update direction based on movement
          if (dx > 5) setDirection(1)
          else if (dx < -5) setDirection(-1)

          if (dist < 30) {
            // Eat the character!
            const now = performance.now()
            if (now - lastEatTimeRef.current > 50) {
              setMouthOpen(true)
              setTimeout(() => setMouthOpen(false), 100)
              
              const charText = targetChar.textContent || '•'
              targetChar.style.opacity = '0'
              targetChar.style.visibility = 'hidden'
              currentTargetRef.current++
              lastEatTimeRef.current = now
              addParticles(prev.x + 30, prev.y + 20, charText)
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
      {/* The button and theme toggle */}
      <div className="fixed top-5 right-5 z-50 flex flex-col items-end gap-2">
        {isHomepage && (
          <button
            onClick={handleClick}
            className="robot-trigger font-mono text-[11px] text-muted-foreground hover:text-secondary transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            don&apos;t click here
          </button>
        )}
        <ThemeToggle />
      </div>

      {/* Robot */}
      {isActive && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: robotPos.x,
            top: robotPos.y,
            transform: `translate(-50%, -50%) scaleX(${direction}) ${isPoofing ? 'scale(1.5)' : 'scale(1)'}`,
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
            
            {/* Eyes */}
            <circle cx="25" cy="20" r="3.5" fill="#8b9bb5" className="animate-pulse" />
            <circle cx="45" cy="20" r="3.5" fill="#8b9bb5" className="animate-pulse" />
            
            {/* Mouth */}
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
            {mouthOpen && (
              <>
                <path d="M20 25 L20 29 L24 29 L24 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M25 25 L25 30 L29 30 L29 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M30 25 L30 29 L34 29 L34 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M35 25 L35 30 L39 30 L39 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M40 25 L40 29 L44 29 L44 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
                <path d="M45 25 L45 30 L50 30 L50 25" fill="#e5e7eb" stroke="#8b9bb5" strokeWidth="0.5" />
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
            
            {/* Legs */}
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

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="fixed z-[9998] pointer-events-none font-mono text-xs text-primary"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.life,
            transform: `scale(${0.5 + p.life * 0.5})`,
          }}
        >
          {p.char}
        </div>
      ))}
    </>
  )
}
