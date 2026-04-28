"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

interface CharTarget {
  el: HTMLElement
  originalHtml: string
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
  const [poopPile, setPoopPile] = useState<{letter: string, x: number, y: number, rotation: number, scale: number, hue: number, sat: number, light: number, fontSize: number}[]>([])
  const [isDone, setIsDone] = useState(false)
  const [poopFading, setPoopFading] = useState(false)
  
  const animationRef = useRef<number | null>(null)
  const targetsRef = useRef<CharTarget[]>([])
  const currentTargetIdx = useRef(0)
  const originalHtmlRef = useRef<Map<HTMLElement, string>>(new Map())

  

  // Find ALL text elements to eat - targets everything with text
  const prepareTargets = useCallback(() => {
    const targets: CharTarget[] = []
    const processedElements = new Set<HTMLElement>()
    
    // Target ALL text-containing elements on the page
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',  // All headings
      'p',                                   // Paragraphs
      'span',                                // Spans
      'a',                                   // Links
      'li',                                  // List items
      'time',                                // Dates
      'label',                               // Labels
      'td', 'th',                            // Table cells
      'figcaption',                          // Captions
      'blockquote',                          // Quotes
      'cite',                                // Citations
    ]
    
    const allElements: HTMLElement[] = []
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        const htmlEl = el as HTMLElement
        // Skip navigation, hero section (has React state animations), buttons, and already processed
        // The hero section contains typewriter animation that can't be restored via innerHTML
        if (htmlEl.closest('nav') || 
            htmlEl.closest('button') || 
            htmlEl.closest('.robot-trigger') ||
            htmlEl.closest('[role="navigation"]') ||
            htmlEl.closest('.sf-fog-hero') ||  // Skip hero section (has React state animations)
            processedElements.has(htmlEl)) return
        
        // Skip if parent is already in list (avoid duplicates)
        let hasParentInList = false
        allElements.forEach(existing => {
          if (existing.contains(htmlEl) && existing !== htmlEl) {
            hasParentInList = true
          }
        })
        if (hasParentInList) return
        
        // Remove children that are now contained by this element
        const toRemove: HTMLElement[] = []
        allElements.forEach(existing => {
          if (htmlEl.contains(existing) && htmlEl !== existing) {
            toRemove.push(existing)
          }
        })
        toRemove.forEach(el => {
          const idx = allElements.indexOf(el)
          if (idx > -1) allElements.splice(idx, 1)
        })
        
        allElements.push(htmlEl)
        processedElements.add(htmlEl)
      })
    })
    
    // Sort by vertical position top-to-bottom
    allElements.sort((a, b) => {
      const rectA = a.getBoundingClientRect()
      const rectB = b.getBoundingClientRect()
      return (rectA.top + window.scrollY) - (rectB.top + window.scrollY)
    })
    
    // Add all elements with text - store innerHTML to preserve structure
    allElements.forEach(htmlEl => {
      const text = htmlEl.textContent || ''
      if (text.trim() && text.length > 0) {
        originalHtmlRef.current.set(htmlEl, htmlEl.innerHTML)
        targets.push({
          el: htmlEl,
          originalHtml: htmlEl.innerHTML,
          currentIndex: 0
        })
      }
    })
    
    return targets
  }, [])

  

  // Handle clicking the "don't click here" button - starts or resets the robot
  const handleButtonClick = () => {
    if (!isHomepage) return
    
    // If robot is active, do a full reset
    if (isActive) {
      // Stop animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      
      // Restore all original HTML (preserves structure, line breaks, etc.)
      originalHtmlRef.current.forEach((html, el) => {
        if (el && el.isConnected) {
          el.innerHTML = html
        }
      })
      originalHtmlRef.current.clear()
      targetsRef.current = []
      currentTargetIdx.current = 0
      
      // Reset all state
      setIsActive(false)
      setIsPoofing(false)
      setIsPooping(false)
      setPoopPile([])
      setPoopFading(false)
      setEatenLetters([])
      setIsDone(false)
      setMouthOpen(false)
      setWalkFrame(0)
      setDirection(1)
      setRobotPos({ x: 0, y: 0 })
      
      // Scroll back to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
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
    setPoopFading(false)
    setEatenLetters([])
    setIsDone(false)
    
    setRobotPos({ x: startX, y: startY })
    setIsActive(true)
  }

  // Handle clicking on the robot - makes it poop out eaten letters
  const handleRobotClick = () => {
    if (!isActive || isPooping) return
    
    // Robot poops out all eaten letters from its body to the left
    if (eatenLetters.length > 0) {
      setIsPooping(true)
      setPoopFading(false)
      const lettersToAdd = [...eatenLetters]
      setEatenLetters([])
      
      // Get current robot position for pooping from body
      const currentX = robotPos.x
      const currentY = robotPos.y
      
      let i = 0
      const poopInterval = setInterval(() => {
        if (i < lettersToAdd.length) {
          // Add letter with position relative to robot, spreading left
          // Pre-calculate all random values so they don't change on re-render
          const offsetX = -50 - (i % 10) * 12 - Math.random() * 20
          const offsetY = Math.floor(i / 10) * 14 + Math.random() * 10
          setPoopPile(prev => [...prev, {
            letter: lettersToAdd[i],
            x: currentX + offsetX,
            y: currentY + offsetY,
            rotation: Math.random() * 60 - 30,
            scale: 0.7 + Math.random() * 0.5,
            hue: 25 + Math.random() * 15,
            sat: 35 + Math.random() * 25,
            light: 35 + Math.random() * 20,
            fontSize: 10 + Math.random() * 6
          }])
          i++
        } else {
          clearInterval(poopInterval)
          setIsPooping(false)
          
          // Start fade out after 1 second
          setTimeout(() => {
            setPoopFading(true)
            // Remove pile after fade animation completes
            setTimeout(() => {
              setPoopPile([])
              setPoopFading(false)
            }, 1000)
          }, 1000)
        }
      }, 50) // Slower animation - 50ms between letters
    }
    // If no letters eaten yet, do nothing - robot keeps eating
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
            onClick={handleButtonClick} 
            className="robot-trigger font-mono text-[11px] text-muted-foreground hover:text-secondary transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            don&apos;t click here
          </button>
        )}
        <ThemeToggle />
      </div>

      {isActive && (
        <div
          onClick={handleRobotClick}
          className="fixed z-[9999] cursor-pointer"
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
          
          
        </div>
      )}
      
      {/* Poop pile - messy jumbled letters like a mud pile */}
      {poopPile.length > 0 && (
        <div 
          className="fixed z-[9997] pointer-events-none transition-opacity duration-[1000ms] ease-out"
          style={{
            left: poopPile[0]?.x - 30,
            top: poopPile[0]?.y - 20,
            opacity: poopFading ? 0 : 1,
          }}
        >
          {poopPile.map((item, i) => {
            // Create organic pile shape - letters cluster together
            const angle = (i * 137.5) % 360 // Golden angle for natural spread
            const radius = Math.sqrt(i) * 8 // Spiral outward
            const offsetX = Math.cos(angle * Math.PI / 180) * radius
            const offsetY = Math.sin(angle * Math.PI / 180) * radius * 0.6
            
            return (
              <span
                key={i}
                className="absolute font-serif font-bold"
                style={{
                  left: offsetX + 50,
                  top: offsetY + 40,
                  color: `hsl(${item.hue}, ${item.sat}%, ${item.light}%)`,
                  transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
                  fontSize: `${item.fontSize}px`,
                  textShadow: '1px 1px 0 rgba(139,90,43,0.4), -1px -1px 0 rgba(210,180,140,0.3)',
                  zIndex: 9997 + i,
                }}
              >
                {item.letter}
              </span>
            )
          })}
        </div>
      )}
    </>
  )
}
