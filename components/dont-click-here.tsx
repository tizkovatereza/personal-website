"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

interface CharTarget {
  el: HTMLElement
  originalText: string
  currentIndex: number
}

export function DontClickHere() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [isActive, setIsActive] = useState(false)
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 })
  const [isPoofing, setIsPoofing] = useState(false)
  const [walkFrame, setWalkFrame] = useState(0)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [direction, setDirection] = useState(1)
  const [eatenLetters, setEatenLetters] = useState<string[]>([])
  const [isPooping, setIsPooping] = useState(false)
  const [poopPile, setPoopPile] = useState<{letter: string, x: number, y: number}[]>([])
  const [isDone, setIsDone] = useState(false)
  
  const animationRef = useRef<number | null>(null)
  const targetsRef = useRef<CharTarget[]>([])
  const currentTargetIdx = useRef(0)
  const originalTextsRef = useRef<Map<HTMLElement, string>>(new Map())

  

  // Find ALL text elements to eat - no viewport filtering
  const prepareTargets = useCallback(() => {
    const targets: CharTarget[] = []
    
    // Target the main h1 in hero AND ALL h2s and h3s on the page
    const heroH1 = document.querySelector('h1.font-serif')
    const allH2s = document.querySelectorAll('h2')
    const allH3s = document.querySelectorAll('h3')
    
    // Combine all headings
    const allHeadings: HTMLElement[] = []
    if (heroH1) allHeadings.push(heroH1 as HTMLElement)
    allH2s.forEach(el => {
      // Skip if inside a link (article titles)
      if (!el.closest('a')) {
        allHeadings.push(el as HTMLElement)
      }
    })
    allH3s.forEach(el => {
      // Include h3s that are article titles (inside links)
      if (el.closest('a')) {
        allHeadings.push(el as HTMLElement)
      }
    })
    
    // Sort by vertical position (using offsetTop for absolute position)
    allHeadings.sort((a, b) => {
      const rectA = a.getBoundingClientRect()
      const rectB = b.getBoundingClientRect()
      return (rectA.top + window.scrollY) - (rectB.top + window.scrollY)
    })
    
    // Include ALL elements, no viewport filtering
    allHeadings.forEach(htmlEl => {
      const text = htmlEl.textContent || ''
      if (text.trim()) {
        originalTextsRef.current.set(htmlEl, text)
        targets.push({
          el: htmlEl,
          originalText: text,
          currentIndex: 0
        })
      }
    })
    
    return targets
  }, [])

  const restoreText = useCallback(() => {
    originalTextsRef.current.forEach((text, el) => {
      el.textContent = text
    })
    originalTextsRef.current.clear()
    targetsRef.current = []
    currentTargetIdx.current = 0
  }, [])

  const handleClick = () => {
    if (!isHomepage) return
    
    if (isActive) {
      // Robot poops out all eaten letters from its body to the left
      if (eatenLetters.length > 0) {
        setIsPooping(true)
        const lettersToAdd = [...eatenLetters]
        setEatenLetters([])
        
        // Get current robot position for pooping from body
        const currentX = robotPos.x
        const currentY = robotPos.y
        
        let i = 0
        const poopInterval = setInterval(() => {
          if (i < lettersToAdd.length) {
            // Add letter with position relative to robot, spreading left
            const offsetX = -50 - (i % 10) * 12 - Math.random() * 20
            const offsetY = Math.floor(i / 10) * 14 + Math.random() * 10
            setPoopPile(prev => [...prev, {
              letter: lettersToAdd[i],
              x: currentX + offsetX,
              y: currentY + offsetY
            }])
            i++
          } else {
            clearInterval(poopInterval)
            setIsPooping(false)
            setIsPoofing(true)
            setTimeout(() => {
              restoreText()
              setIsActive(false)
              setIsPoofing(false)
              setIsDone(false)
            }, 300)
          }
        }, 20)
      } else {
        setIsPoofing(true)
        setTimeout(() => {
          restoreText()
          setIsActive(false)
          setIsPoofing(false)
          setIsDone(false)
        }, 300)
      }
    } else {
      const button = document.querySelector('.robot-trigger')
      const rect = button?.getBoundingClientRect()
      const startX = rect?.left || 100
      const startY = (rect?.bottom || 50) + 50
      
      // Prepare targets
      const targets = prepareTargets()
      targetsRef.current = targets
      currentTargetIdx.current = 0
      
      // Clear previous state
      setPoopPile([])
      setEatenLetters([])
      setIsDone(false)
      
      setRobotPos({ x: startX, y: startY })
      setIsActive(true)
    }
  }

  useEffect(() => {
    if (!isActive || isPoofing) return

    const speed = 250
    let lastTime = performance.now()
    let lastEatTime = 0

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000
      lastTime = time

      setWalkFrame(f => (f + 1) % 20)

      const targets = targetsRef.current
      const idx = currentTargetIdx.current
      
      // Check if we've eaten all targets - return to top right corner
      if (idx >= targets.length) {
        // Move to top right corner
        const cornerX = window.innerWidth - 100
        const cornerY = 100
        
        setRobotPos(prev => {
          const dx = cornerX - prev.x
          const dy = cornerY - prev.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dx > 2) setDirection(1)
          else if (dx < -2) setDirection(-1)
          
          // If at corner, mark as done
          if (dist < 20) {
            setIsDone(true)
            return { x: cornerX, y: cornerY }
          }
          
          // Move toward corner
          return {
            x: prev.x + (dx / dist) * speed * dt,
            y: prev.y + (dy / dist) * speed * dt
          }
        })
        
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const target = targets[idx]
      if (!target || !target.el || !target.el.isConnected) {
        currentTargetIdx.current++
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      // Check if this target is fully eaten
      const currentText = target.el.textContent || ''
      if (currentText.length === 0) {
        currentTargetIdx.current++
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Get position of the element (aim for the first character area)
      const rect = target.el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        currentTargetIdx.current++
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      // If element is off-screen, scroll to it
      if (rect.top > window.innerHeight - 100 || rect.bottom < 100) {
        target.el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      
      // Target the left edge where first char is
      const tx = rect.left + 20
      const ty = rect.top + rect.height / 2

      setRobotPos(prev => {
        const dx = tx - prev.x
        const dy = ty - prev.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dx > 2) setDirection(1)
        else if (dx < -2) setDirection(-1)

        // When close enough, eat a character
        if (dist < 40 && time - lastEatTime > 80) {
          setMouthOpen(true)
          setTimeout(() => setMouthOpen(false), 60)
          
          // Remove first character and store it
          const text = target.el.textContent || ''
          if (text.length > 0) {
            const eatenChar = text[0]
            target.el.textContent = text.substring(1)
            // Store the eaten letter (skip spaces)
            if (eatenChar.trim()) {
              setEatenLetters(prev => [...prev, eatenChar])
            }
          }
          lastEatTime = time
          return prev
        }

        // Move toward target
        if (dist > 5) {
          const newX = prev.x + (dx / dist) * speed * dt
          const newY = prev.y + (dy / dist) * speed * dt
          // Keep X within viewport, but Y can follow scroll
          return {
            x: Math.max(50, Math.min(window.innerWidth - 50, newX)),
            y: newY
          }
        }
        return prev
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => { 
      if (animationRef.current) cancelAnimationFrame(animationRef.current) 
    }
  }, [isActive, isPoofing])

  const legOffset = Math.sin(walkFrame * 0.5) * 4

  return (
    <>
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
            
            {/* Body */}
            <rect x="10" y="38" width="50" height="25" rx="3" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" />
            <rect x="18" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <rect x="31" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <rect x="44" y="44" width="8" height="8" rx="1" fill="#2a3142" />
            <circle cx="22" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            <circle cx="35" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            <circle cx="48" cy="48" r="2" fill="#8b9bb5" opacity="0.5" />
            
            {/* Legs */}
            <rect x="18" y="63" width="10" height="14" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" style={{ transform: `translateY(${legOffset}px)` }} />
            <rect x="42" y="63" width="10" height="14" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="2" style={{ transform: `translateY(${-legOffset}px)` }} />
            
            {/* Feet */}
            <rect x="15" y="75" width="16" height="5" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="1" style={{ transform: `translateY(${legOffset}px)` }} />
            <rect x="39" y="75" width="16" height="5" rx="2" fill="#1a1f2e" stroke="#2a3142" strokeWidth="1" style={{ transform: `translateY(${-legOffset}px)` }} />
          </svg>
          
          {/* Pooping animation - letters falling from robot's behind */}
          {isPooping && (
            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 text-[10px] font-mono text-amber-700 animate-bounce">
              {'💩'}
            </div>
          )}
        </div>
      )}
      
      {/* Poop pile - letters appear from robot's body to the left */}
      {poopPile.map((item, i) => (
        <div
          key={i}
          className="fixed z-[9997] text-[11px] font-mono pointer-events-none animate-in fade-in zoom-in duration-150"
          style={{
            left: item.x,
            top: item.y,
            color: `hsl(30, ${40 + Math.random() * 20}%, ${30 + Math.random() * 15}%)`,
            transform: `rotate(${Math.random() * 40 - 20}deg)`,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          {item.letter}
        </div>
      ))}
    </>
  )
}
