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

export function SFFogHero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [clearings, setClearings] = useState<Clearing[]>([])
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

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
  }, [isMobile])

  if (!mounted) {
    return <div className="w-full h-screen bg-background" />
  }

  const fogLayers = isMobile ? 2 : 4

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

      {/* === CENTERED TEXT CONTENT (same layout as before) === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* Name */}
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4"
          style={{
            textShadow: '0 0 40px rgba(255,255,255,0.3), 0 4px 30px rgba(0,0,0,0.8)',
          }}
        >
          TEREZA TIZKOVA
        </h1>
        
        {/* Subtitle - What I do */}
        <p 
          className="font-mono text-sm md:text-base tracking-[0.3em] text-white/80 mb-2"
          style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}
        >
          GROWTH · AI · WRITING
        </p>
        
        {/* Locations */}
        <p 
          className="font-mono text-xs md:text-sm tracking-[0.2em] text-white/60"
          style={{
            textShadow: '0 2px 15px rgba(0,0,0,0.8)',
          }}
        >
          SAN FRANCISCO · PRAGUE
        </p>
      </div>

      {/* === FOG LAYERS with mouse tracking and click clearings === */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: fogLayers }).map((_, i) => {
          const opacity = isDark 
            ? 0.5 + (i * 0.1)
            : 0.6 + (i * 0.08)
          const speed = ['animate-fog-slow', 'animate-fog-medium', 'animate-fog-fast', 'animate-fog-wisp'][i]
          const color = isDark 
            ? `rgba(10, 10, 10, ${opacity})`
            : `rgba(250, 250, 252, ${opacity})`
          
          // Build mask with mouse position + all clearings
          const mouseMask = `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, transparent ${isMobile ? 8 : 6}%, black ${isMobile ? 15 : 12}%)`
          const clearingMasks = clearings.map(c => 
            `radial-gradient(circle at ${c.x}% ${c.y}%, transparent ${c.radius - 2}%, black ${c.radius + 5}%)`
          )
          const allMasks = [mouseMask, ...clearingMasks].join(', ')
          
          return (
            <div
              key={`fog-${i}`}
              className={`absolute inset-0 ${speed}`}
              style={{
                background: `linear-gradient(90deg, ${color} 0%, transparent 15%, ${color} 35%, transparent 55%, ${color} 75%, transparent 100%)`,
                width: '300%',
                left: '-50%',
                maskImage: allMasks,
                WebkitMaskImage: allMasks,
                maskComposite: clearings.length > 0 ? 'intersect' : undefined,
                WebkitMaskComposite: clearings.length > 0 ? 'source-in' : undefined,
              }}
            />
          )
        })}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
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
