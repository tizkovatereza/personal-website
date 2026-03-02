"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

interface Clearing {
  id: number
  x: number
  y: number
  radius: number
}

interface HiddenElement {
  id: string
  x: number
  y: number
  label: string
  discovered: boolean
}

export function SFFogHero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [clearings, setClearings] = useState<Clearing[]>([])
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [hiddenElements, setHiddenElements] = useState<HiddenElement[]>([
    // Name
    { id: 'name', x: 50, y: 45, label: 'TEREZA TIZKOVA', discovered: false },
    // What I do
    { id: 'growth', x: 25, y: 35, label: 'GROWTH', discovered: false },
    { id: 'ai', x: 50, y: 60, label: 'AI', discovered: false },
    { id: 'writing', x: 75, y: 35, label: 'WRITING', discovered: false },
    // Locations
    { id: 'sf', x: 20, y: 70, label: 'SAN FRANCISCO', discovered: false },
    { id: 'prague', x: 80, y: 70, label: 'PRAGUE', discovered: false },
  ])

  const clearingIdRef = useRef(0)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }, [])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    // Add permanent clearing
    const newClearing: Clearing = {
      id: clearingIdRef.current++,
      x,
      y,
      radius: isMobile ? 12 : 10,
    }
    setClearings(prev => [...prev, newClearing])

    // Check for discoveries
    setHiddenElements(prev => prev.map(el => {
      if (el.discovered) return el
      const distance = Math.sqrt(Math.pow(el.x - x, 2) + Math.pow(el.y - y, 2))
      if (distance < 15) {
        return { ...el, discovered: true }
      }
      return el
    }))
  }, [isMobile])

  const discoveredCount = hiddenElements.filter(e => e.discovered).length
  const totalCount = hiddenElements.length

  if (!mounted) {
    return <div className="w-full h-screen bg-background" />
  }

  const fogLayers = isMobile ? 2 : 4

  // Generate SVG mask for fog clearings
  const generateMask = () => {
    const allClearings = [
      ...clearings,
      { id: -1, x: mousePos.x, y: mousePos.y, radius: isMobile ? 10 : 8 }
    ]
    
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <mask id="fog-mask">
            <rect width="100%" height="100%" fill="white"/>
            ${allClearings.map(c => `
              <circle cx="${c.x}%" cy="${c.y}%" r="${c.radius}%" fill="black">
                <animate attributeName="r" from="${c.radius * 0.8}%" to="${c.radius}%" dur="0.3s" fill="freeze"/>
              </circle>
            `).join('')}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="currentColor" mask="url(#fog-mask)"/>
      </svg>
    `
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none cursor-crosshair"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* === DAY SCENE: Real Photo === */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src="/images/sf-day.jpg"
          alt="San Francisco skyline during the day"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* === NIGHT SCENE: Real Photo === */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image
          src="/images/sf-night.jpg"
          alt="Golden Gate Bridge at night"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* === HIDDEN ELEMENTS (revealed when fog clears) === */}
      <div className="absolute inset-0 pointer-events-none">
        {hiddenElements.map(el => {
          // Check if this element is near mouse or any clearing
          const isNearMouse = Math.sqrt(Math.pow(el.x - mousePos.x, 2) + Math.pow(el.y - mousePos.y, 2)) < 12
          const isNearClearing = clearings.some(c => 
            Math.sqrt(Math.pow(el.x - c.x, 2) + Math.pow(el.y - c.y, 2)) < c.radius + 5
          )
          const isVisible = isNearMouse || isNearClearing || el.discovered

          const isName = el.id === 'name'
          const isLocation = el.id === 'sf' || el.id === 'prague'
          
          return (
            <div
              key={el.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
              }}
            >
              <span 
                className={`
                  font-display tracking-tight whitespace-nowrap
                  ${isName 
                    ? 'text-4xl md:text-6xl lg:text-7xl font-bold' 
                    : isLocation
                      ? 'text-lg md:text-xl font-mono tracking-[0.2em]'
                      : 'text-2xl md:text-3xl lg:text-4xl font-semibold'
                  }
                  ${el.discovered ? 'text-white' : 'text-white/90'}
                `}
                style={{
                  textShadow: el.discovered 
                    ? '0 0 30px rgba(255,255,255,0.5), 0 2px 20px rgba(0,0,0,0.8)'
                    : '0 2px 20px rgba(0,0,0,0.8)',
                }}
              >
                {el.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* === FOG LAYERS with mask === */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: fogLayers }).map((_, i) => {
          const opacity = isDark 
            ? 0.5 + (i * 0.1)
            : 0.6 + (i * 0.08)
          const speed = ['animate-fog-slow', 'animate-fog-medium', 'animate-fog-fast', 'animate-fog-wisp'][i]
          const color = isDark 
            ? `rgba(10, 10, 10, ${opacity})`
            : `rgba(250, 250, 252, ${opacity})`
          
          return (
            <div
              key={`fog-${i}`}
              className={`absolute inset-0 ${speed}`}
              style={{
                background: `linear-gradient(90deg, ${color} 0%, transparent 15%, ${color} 35%, transparent 55%, ${color} 75%, transparent 100%)`,
                width: '300%',
                left: '-50%',
                maskImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, transparent ${isMobile ? 8 : 6}%, black ${isMobile ? 15 : 12}%)`,
                WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, transparent ${isMobile ? 8 : 6}%, black ${isMobile ? 15 : 12}%)`,
              }}
            />
          )
        })}
        
        {/* Additional mask layer for permanent clearings */}
        {clearings.length > 0 && (
          <div 
            className="absolute inset-0"
            style={{
              background: isDark ? 'rgba(10,10,10,0.7)' : 'rgba(250,250,252,0.7)',
              maskImage: clearings.map(c => 
                `radial-gradient(circle at ${c.x}% ${c.y}%, transparent ${c.radius - 2}%, black ${c.radius + 3}%)`
              ).join(', '),
              WebkitMaskImage: clearings.map(c => 
                `radial-gradient(circle at ${c.x}% ${c.y}%, transparent ${c.radius - 2}%, black ${c.radius + 3}%)`
              ).join(', '),
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
        )}
      </div>

      {/* Discovery counter */}
      <div className="absolute top-6 right-6 z-20">
        <div 
          className="px-4 py-2 backdrop-blur-md border border-white/20 font-mono text-sm text-white/80"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <span className="text-white">{discoveredCount}</span>
          <span className="text-white/50">/{totalCount}</span>
          <span className="ml-2 text-white/50">discovered</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
        <p 
          className="font-mono text-xs tracking-wider text-white/60 text-center"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          {discoveredCount === 0 
            ? 'CLICK TO UNCOVER'
            : discoveredCount < totalCount 
              ? 'KEEP EXPLORING'
              : 'ALL FOUND'
          }
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="font-mono text-xs tracking-wider">SCROLL</span>
          <svg 
            className="w-5 h-5 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Gradient overlay at bottom for transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: isDark 
            ? 'linear-gradient(to top, hsl(var(--background)), transparent)'
            : 'linear-gradient(to top, hsl(var(--background)), transparent)'
        }}
      />
    </div>
  )
}
