"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface RevealCircle {
  x: number
  y: number
  radius: number
  maxRadius: number
  phase: number
}

interface HiddenElement {
  id: string
  x: number // percentage
  y: number // percentage
  type: 'landmark' | 'text' | 'name' | 'easter'
  label: string
  discovered: boolean
  hitRadius: number // percentage
}

const HIDDEN_ELEMENTS: HiddenElement[] = [
  // Landmarks (pink glow when revealed)
  { id: 'ggb', x: 15, y: 55, type: 'landmark', label: 'Golden Gate Bridge', discovered: false, hitRadius: 8 },
  { id: 'twin', x: 75, y: 65, type: 'landmark', label: 'Twin Peaks', discovered: false, hitRadius: 7 },
  { id: 'sutro', x: 55, y: 45, type: 'landmark', label: 'Sutro Tower', discovered: false, hitRadius: 6 },
  { id: 'pyramid', x: 85, y: 60, type: 'landmark', label: 'Transamerica', discovered: false, hitRadius: 5 },
  
  // Project names (blue glow when revealed)
  { id: 'topics', x: 25, y: 40, type: 'text', label: 'Topics', discovered: false, hitRadius: 5 },
  { id: 'e2b', x: 70, y: 35, type: 'text', label: 'E2B', discovered: false, hitRadius: 4 },
  { id: 'dlai', x: 45, y: 70, type: 'text', label: 'DeepLearning.AI', discovered: false, hitRadius: 6 },
  { id: 'agents', x: 88, y: 45, type: 'text', label: 'Awesome AI Agents', discovered: false, hitRadius: 6 },
  
  // My name (special - centered)
  { id: 'name', x: 50, y: 50, type: 'name', label: 'TEREZA TIZKOVA', discovered: false, hitRadius: 10 },
  
  // Easter eggs
  { id: 'cities', x: 30, y: 75, type: 'easter', label: 'SF / PRAGUE / BERLIN', discovered: false, hitRadius: 6 },
  { id: 'tagline', x: 65, y: 25, type: 'easter', label: 'growth · AI · writing', discovered: false, hitRadius: 5 },
  { id: 'sayhi', x: 10, y: 30, type: 'easter', label: 'say hi', discovered: false, hitRadius: 4 },
  { id: 'hack', x: 82, y: 28, type: 'easter', label: '{hack}', discovered: false, hitRadius: 4 },
]

export function SFFogHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [reveals, setReveals] = useState<RevealCircle[]>([])
  const [elements, setElements] = useState<HiddenElement[]>(HIDDEN_ELEMENTS)
  const [discoveredCount, setDiscoveredCount] = useState(0)
  const [fogCleared, setFogCleared] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const animationRef = useRef<number>()
  
  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Animate reveal circles (breathing effect)
  useEffect(() => {
    let lastTime = 0
    
    const animate = (time: number) => {
      if (time - lastTime > 50) {
        setReveals(prev => prev.map(r => ({
          ...r,
          radius: Math.min(r.radius + (r.maxRadius - r.radius) * 0.1, r.maxRadius),
          phase: r.phase + 0.03
        })))
        lastTime = time
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])
  
  // Handle click/tap to reveal
  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (fogCleared) return
    
    const container = containerRef.current
    if (!container) return
    
    const rect = container.getBoundingClientRect()
    let clientX: number, clientY: number
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    
    const x = clientX - rect.left
    const y = clientY - rect.top
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100
    
    // Add reveal circle
    const revealRadius = isMobile ? 80 : 120
    setReveals(prev => [...prev, {
      x,
      y,
      radius: 0,
      maxRadius: revealRadius,
      phase: 0
    }])
    
    // Check for element discoveries
    setElements(prev => {
      const updated = prev.map(el => {
        if (el.discovered) return el
        
        const dist = Math.sqrt(
          Math.pow(xPercent - el.x, 2) + 
          Math.pow(yPercent - el.y, 2)
        )
        
        if (dist < el.hitRadius + 5) {
          return { ...el, discovered: true }
        }
        return el
      })
      
      const newCount = updated.filter(el => el.discovered).length
      setDiscoveredCount(newCount)
      
      return updated
    })
  }, [fogCleared, isMobile])
  
  // "we're so back" - fog rolls back in
  const rollFogBack = useCallback(() => {
    setFogCleared(false)
    setReveals([])
    setElements(HIDDEN_ELEMENTS)
    setDiscoveredCount(0)
  }, [])
  
  // "it's so over" - clear all fog dramatically
  const clearAllFog = useCallback(() => {
    setFogCleared(true)
    setElements(prev => prev.map(el => ({ ...el, discovered: true })))
    setDiscoveredCount(HIDDEN_ELEMENTS.length)
  }, [])
  
  // Generate SVG mask for reveal circles
  const maskId = "fog-reveal-mask"
  const breathingRadius = (r: RevealCircle) => {
    const breathing = Math.sin(r.phase) * 5
    return r.radius + breathing
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden cursor-crosshair"
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {/* Realistic SF Skyline Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/sf-skyline.jpg"
          alt="San Francisco skyline at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Slight dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Hidden text elements overlaid on the image */}
        {elements.filter(e => e.type === 'text' || e.type === 'easter' || e.type === 'name').map(el => (
          <div
            key={el.id}
            className={`absolute transition-all duration-700 ${el.discovered || fogCleared ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <span 
              className={`
                font-mono tracking-widest whitespace-nowrap
                ${el.type === 'name' ? 'text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white' : ''}
                ${el.type === 'text' ? 'text-sm md:text-base text-white/90' : ''}
                ${el.type === 'easter' ? 'text-white/70 text-[10px] md:text-xs' : ''}
              `}
              style={{
                textShadow: el.discovered || fogCleared 
                  ? el.type === 'name' 
                    ? '0 0 40px rgba(255, 194, 211, 0.8), 0 0 80px rgba(255, 194, 211, 0.4), 0 2px 20px rgba(0,0,0,0.8)' 
                    : el.type === 'landmark'
                    ? '0 0 30px rgba(255, 194, 211, 0.6), 0 2px 10px rgba(0,0,0,0.8)'
                    : '0 0 20px rgba(194, 224, 255, 0.6), 0 2px 10px rgba(0,0,0,0.8)'
                  : 'none'
              }}
            >
              {el.label}
            </span>
          </div>
        ))}
        
        {/* Landmark labels that appear when discovered */}
        {elements.filter(e => e.type === 'landmark').map(el => (
          <div
            key={`label-${el.id}`}
            className={`absolute transition-all duration-700 ${el.discovered || fogCleared ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <span 
              className="font-mono text-[10px] md:text-xs tracking-widest text-white/80 whitespace-nowrap"
              style={{
                textShadow: '0 0 20px rgba(255, 194, 211, 0.6), 0 2px 10px rgba(0,0,0,0.9)'
              }}
            >
              {el.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Realistic Fog layers - with mask cutouts */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: fogCleared ? -1 : 10 }}>
        <defs>
          <mask id={maskId}>
            {/* White = visible (fog shows), Black = hidden (fog cut out) */}
            <rect width="100%" height="100%" fill="white" />
            {reveals.map((r, i) => (
              <circle 
                key={i}
                cx={r.x}
                cy={r.y}
                r={breathingRadius(r)}
                fill="black"
              />
            ))}
          </mask>
          
          {/* Realistic fog gradients - more natural grays */}
          <linearGradient id="fog-gradient-realistic-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d8dce3" stopOpacity="0.92" />
            <stop offset="30%" stopColor="#c5cbd5" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#b8bfcc" stopOpacity="0.93" />
            <stop offset="100%" stopColor="#cfd5de" stopOpacity="0.91" />
          </linearGradient>
          
          <linearGradient id="fog-gradient-realistic-2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#e0e4ea" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#d0d6df" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#bcc3cf" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id="fog-gradient-realistic-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c8ced8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#dfe3e9" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Fog texture filter for more realistic look */}
          <filter id="fog-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        
        {/* Base fog layer - thickest, slowest */}
        <g mask={`url(#${maskId})`} className={fogCleared ? 'opacity-0 transition-opacity duration-1000' : 'opacity-100'}>
          <rect 
            width="300%" 
            height="100%" 
            fill="url(#fog-gradient-realistic-1)"
            className="animate-fog-slow"
            style={{ filter: 'url(#fog-blur)' }}
          />
        </g>
        
        {/* Middle fog layer */}
        <g mask={`url(#${maskId})`} className={fogCleared ? 'opacity-0 transition-opacity duration-700' : 'opacity-100'}>
          <rect 
            width="300%" 
            height="100%" 
            fill="url(#fog-gradient-realistic-2)"
            className="animate-fog-medium"
          />
        </g>
        
        {/* Wispy fog layer - faster */}
        {!isMobile && (
          <g mask={`url(#${maskId})`} className={fogCleared ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'}>
            <rect 
              width="300%" 
              height="100%" 
              fill="url(#fog-gradient-realistic-3)"
              className="animate-fog-fast"
            />
          </g>
        )}
        
        {/* Top wisp layer - fastest, most transparent */}
        {!isMobile && (
          <g mask={`url(#${maskId})`} className={fogCleared ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'}>
            <rect 
              width="300%" 
              height="100%" 
              fill="#e8ebf0"
              fillOpacity="0.4"
              className="animate-fog-wisp"
            />
          </g>
        )}
      </svg>
      
      {/* Discovery counter - positioned for visibility against fog */}
      <div className="absolute top-6 right-6 z-20 font-mono text-[10px] tracking-widest text-gray-700 bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {discoveredCount}/{HIDDEN_ELEMENTS.length} discovered
      </div>
      
      {/* Instruction hint */}
      {discoveredCount === 0 && !fogCleared && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] tracking-widest text-gray-600 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse">
          click to explore through the fog
        </div>
      )}
      
      {/* Control buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 bg-white/30 backdrop-blur-sm px-5 py-2 rounded-full">
        <button
          onClick={(e) => { e.stopPropagation(); rollFogBack(); }}
          className="font-mono text-[10px] text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-widest"
        >
          we&apos;re so back
        </button>
        <span className="text-gray-400">·</span>
        <button
          onClick={(e) => { e.stopPropagation(); clearAllFog(); }}
          className="font-mono text-[10px] text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-widest"
        >
          it&apos;s so over
        </button>
      </div>
    </div>
  )
}
