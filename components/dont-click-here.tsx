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
      
      // Get current robot position for pooping below the robot
      const currentX = robotPos.x
      const currentY = robotPos.y + 60 // Below the robot
      
      let i = 0
      const poopInterval = setInterval(() => {
        if (i < lettersToAdd.length) {
          // Add letter below robot, piling up
          // Pre-calculate all random values so they don't change on re-render
          const col = i % 8
          const row = Math.floor(i / 8)
          const offsetX = (col - 4) * 14 + (Math.random() - 0.5) * 6
          const offsetY = row * 16 + (Math.random() - 0.5) * 4
          setPoopPile(prev => [...prev, {
            letter: lettersToAdd[i],
            x: currentX + offsetX,
            y: currentY + offsetY,
            rotation: Math.random() * 30 - 15,
            scale: 0.9 + Math.random() * 0.3,
            hue: 25 + Math.random() * 15,
            sat: 40 + Math.random() * 20,
            light: 35 + Math.random() * 15,
            fontSize: 12 + Math.random() * 4
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
          <svg width="90" height="80" viewBox="0 0 90 80" fill="none" role="img" aria-label="A playful robotic dog">
            {/* Curled tail and the far pair of articulated legs. */}
            <path d="M20 43 Q3 40 9 26 Q13 19 17 27" stroke="#8b9bb5" strokeWidth="5" strokeLinecap="round" />
            <g stroke="#53647e" strokeWidth="6" strokeLinecap="round">
              <path d={`M29 49 L${27 - legOffset} 64 L${32 - legOffset} 72`} />
              <path d={`M57 49 L${59 + legOffset} 64 L${64 + legOffset} 72`} />
            </g>
            <rect x="18" y="33" width="49" height="26" rx="13" fill="#c5d0df" stroke="#53647e" strokeWidth="2" />
            <rect x="30" y="38" width="20" height="12" rx="6" fill="#243248" />
            <circle cx="36" cy="44" r="2" fill="#a3e8d2" />
            <path d="M42 44 H46" stroke="#8b9bb5" strokeWidth="2" strokeLinecap="round" />
            {/* Floppy ears, a rounded face screen, and a little antenna. */}
            <path d="M59 23 L57 12" stroke="#8b9bb5" strokeWidth="2" />
            <circle cx="57" cy="10" r="3" fill="#a3e8d2" className="animate-pulse" />
            <path d="M52 23 Q40 17 45 39 Q48 44 53 34" fill="#8b9bb5" stroke="#53647e" strokeWidth="2" />
            <rect x="50" y="20" width="31" height="29" rx="12" fill="#c5d0df" stroke="#53647e" strokeWidth="2" />
            <rect x="56" y="26" width="21" height="13" rx="6" fill="#172335" />
            <circle cx="63" cy="32" r="2.5" fill="#a3e8d2" />
            <circle cx="72" cy="32" r="2.5" fill="#a3e8d2" />
            <ellipse cx="77" cy="42" rx="9" ry="6" fill="#e3e9f1" stroke="#53647e" strokeWidth="1.5" />
            <ellipse cx="82" cy="39" rx="3" ry="2.5" fill="#243248" />
            <path d={mouthOpen ? "M70 44 Q77 56 84 44 Z" : "M71 44 Q77 48 82 44"} fill={mouthOpen ? "#172335" : "none"} stroke="#53647e" strokeWidth="1.5" />
            {mouthOpen && <path d="M76 47 V51 Q79 54 80 49" stroke="#f1a8b8" strokeWidth="3" strokeLinecap="round" />}
            {/* Near legs alternate with the far legs using the existing walk cycle. */}
            <g stroke="#8b9bb5" strokeWidth="7" strokeLinecap="round">
              <path d={`M26 54 L${28 + legOffset} 65 L${23 + legOffset} 73`} />
              <path d={`M58 54 L${56 - legOffset} 65 L${61 - legOffset} 73`} />
            </g>
            <circle cx="26" cy="55" r="4" fill="#243248" />
            <circle cx="58" cy="55" r="4" fill="#243248" />
          </svg>
          
          
        </div>
      )}
      
      {/* Poop pile - letters appearing below robot */}
      {poopPile.length > 0 && (
        <div 
          className="fixed z-[9997] pointer-events-none transition-opacity duration-[1000ms] ease-out"
          style={{
            opacity: poopFading ? 0 : 1,
          }}
        >
          {poopPile.map((item, i) => (
            <span
              key={i}
              className="absolute font-serif font-bold"
              style={{
                left: item.x,
                top: item.y,
                color: `hsl(${item.hue}, ${item.sat}%, ${item.light}%)`,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
                fontSize: `${item.fontSize}px`,
                textShadow: '1px 1px 0 rgba(139,90,43,0.5), -1px -1px 0 rgba(210,180,140,0.4)',
                zIndex: 9997 + i,
              }}
            >
              {item.letter}
            </span>
          ))}
        </div>
      )}
    </>
  )
}
