"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export function SFFogHero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) {
    return <div className="w-full h-screen bg-background" />
  }

  const fogLayers = isMobile ? 2 : 4

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
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

      {/* === FOG LAYERS === */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: fogLayers }).map((_, i) => {
          const opacity = isDark 
            ? 0.3 + (i * 0.12)
            : 0.4 + (i * 0.1)
          const speed = ['animate-fog-slow', 'animate-fog-medium', 'animate-fog-fast', 'animate-fog-wisp'][i]
          const color = isDark 
            ? `rgba(15, 20, 35, ${opacity})`
            : `rgba(235, 235, 240, ${opacity})`
          
          return (
            <div
              key={`fog-${i}`}
              className={`absolute inset-0 ${speed}`}
              style={{
                background: `linear-gradient(90deg, ${color} 0%, transparent 20%, ${color} 40%, transparent 60%, ${color} 80%, transparent 100%)`,
                width: '300%',
                left: '-50%',
              }}
            />
          )
        })}
      </div>

      {/* Name centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1 
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 60px rgba(0,0,0,0.3)',
          }}
        >
          TEREZA TIZKOVA
        </h1>
        <p 
          className="mt-4 font-mono text-sm md:text-base tracking-[0.3em] text-white/80"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          GROWTH · AI · WRITING
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
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: isDark 
            ? 'linear-gradient(to top, hsl(var(--background)), transparent)'
            : 'linear-gradient(to top, hsl(var(--background)), transparent)'
        }}
      />
    </div>
  )
}
