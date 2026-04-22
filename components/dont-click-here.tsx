"use client"

import { useState, useEffect, useRef } from "react"
import { ThemeToggle } from "./theme-toggle"

export function DontClickHere() {
  const [isHomepage, setIsHomepage] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 })
  const [isPoofing, setIsPoofing] = useState(false)
  const [walkFrame, setWalkFrame] = useState(0)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  
  const animationRef = useRef<number | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const mouthCounterRef = useRef(0)

  // Check if on homepage
  useEffect(() => {
    setIsHomepage(window.location.pathname === '/')
  }, [])

  // Pick a random target on the visible page
  const pickNewTarget = () => {
    const padding = 100
    const x = padding + Math.random() * (window.innerWidth - padding * 2)
    const y = padding + Math.random() * (window.innerHeight - padding * 2)
    targetRef.current = { x, y }
  }

  const handleClick = () => {
    // Only allow robot on homepage
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      return
    }
    
    if (isActive) {
      // Dismiss - poof
      setIsPoofing(true)
      setTimeout(() => {
        setIsActive(false)
        setIsPoofing(false)
      }, 300)
    } else {
      // Get the button position to start the robot from there
      const button = document.querySelector('.robot-trigger')
      const buttonRect = button?.getBoundingClientRect()
      
      // Start robot from the button position
      const startX = buttonRect ? buttonRect.left : window.innerWidth - 100
      const startY = buttonRect ? buttonRect.bottom + 40 : 80
      
      setRobotPos({ x: startX, y: startY })
      pickNewTarget()
      setIsActive(true)
    }
  }

  // Animation loop - robot wanders around
  useEffect(() => {
    if (!isActive || isPoofing) return

    const speed = 80 // pixels per second
    let lastTime = performance.now()

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000
      lastTime = time

      // Walk frame animation
      setWalkFrame(prev => (prev + 1) % 20)
      
      // Mouth animation
      mouthCounterRef.current++
      if (mouthCounterRef.current >= 15) {
        mouthCounterRef.current = 0
        setMouthOpen(prev => !prev)
      }

      setRobotPos(prev => {
        const dx = targetRef.current.x - prev.x
        const dy = targetRef.current.y - prev.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Update direction based on movement
        if (dx > 0) setDirection(1)
        else if (dx < 0) setDirection(-1)

        // If close to target, pick a new one
        if (dist < 30) {
          pickNewTarget()
          return prev
        }

        const moveX = (dx / dist) * speed * deltaTime
        const moveY = (dy / dist) * speed * deltaTime

        return {
          x: prev.x + moveX,
          y: prev.y + moveY,
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, isPoofing])

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
    </>
  )
}
