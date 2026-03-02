"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export function SFFogHero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* === DAY SCENE: Real Photo === */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src="/images/sf-day.jpg"
          alt="San Francisco skyline during the day"
          fill
          className="object-cover grayscale"
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
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* === REALISTIC FOG LAYERS === */}
      {/* Layer 1: Ground-hugging thick fog at bottom */}
      <div 
        className="absolute inset-0 pointer-events-none animate-fog-slow"
        style={{
          background: isDark 
            ? 'linear-gradient(to top, rgba(30,30,35,0.95) 0%, rgba(30,30,35,0.7) 20%, rgba(30,30,35,0.3) 40%, transparent 60%)'
            : 'linear-gradient(to top, rgba(245,245,250,0.98) 0%, rgba(245,245,250,0.75) 25%, rgba(245,245,250,0.4) 45%, transparent 65%)',
          width: '200%',
          left: '-25%',
        }}
      />
      
      {/* Layer 2: Mid-level wispy fog */}
      <div 
        className="absolute inset-0 pointer-events-none animate-fog-medium"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 80% 40% at 20% 60%, rgba(40,40,50,0.6) 0%, transparent 70%),
               radial-gradient(ellipse 60% 35% at 70% 55%, rgba(35,35,45,0.5) 0%, transparent 60%),
               radial-gradient(ellipse 90% 30% at 50% 70%, rgba(30,30,40,0.55) 0%, transparent 65%)`
            : `radial-gradient(ellipse 80% 40% at 20% 60%, rgba(255,255,255,0.7) 0%, transparent 70%),
               radial-gradient(ellipse 60% 35% at 70% 55%, rgba(250,250,255,0.6) 0%, transparent 60%),
               radial-gradient(ellipse 90% 30% at 50% 70%, rgba(255,255,255,0.65) 0%, transparent 65%)`,
          width: '250%',
          left: '-50%',
        }}
      />
      
      {/* Layer 3: High wisps - thin streaks */}
      {!isMobile && (
        <div 
          className="absolute inset-0 pointer-events-none animate-fog-fast"
          style={{
            background: isDark
              ? `radial-gradient(ellipse 120% 15% at 30% 35%, rgba(50,50,60,0.35) 0%, transparent 70%),
                 radial-gradient(ellipse 100% 12% at 80% 25%, rgba(45,45,55,0.3) 0%, transparent 65%),
                 radial-gradient(ellipse 80% 10% at 50% 45%, rgba(40,40,50,0.25) 0%, transparent 60%)`
              : `radial-gradient(ellipse 120% 15% at 30% 35%, rgba(255,255,255,0.5) 0%, transparent 70%),
                 radial-gradient(ellipse 100% 12% at 80% 25%, rgba(250,250,255,0.45) 0%, transparent 65%),
                 radial-gradient(ellipse 80% 10% at 50% 45%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            width: '300%',
            left: '-75%',
          }}
        />
      )}
      
      {/* Layer 4: Subtle rolling patches */}
      {!isMobile && (
        <div 
          className="absolute inset-0 pointer-events-none animate-fog-wisp"
          style={{
            background: isDark
              ? `radial-gradient(ellipse 50% 50% at 15% 50%, rgba(35,35,45,0.4) 0%, transparent 60%),
                 radial-gradient(ellipse 40% 40% at 85% 40%, rgba(40,40,50,0.35) 0%, transparent 55%),
                 radial-gradient(ellipse 60% 35% at 50% 65%, rgba(30,30,40,0.45) 0%, transparent 65%)`
              : `radial-gradient(ellipse 50% 50% at 15% 50%, rgba(255,255,255,0.55) 0%, transparent 60%),
                 radial-gradient(ellipse 40% 40% at 85% 40%, rgba(250,250,255,0.5) 0%, transparent 55%),
                 radial-gradient(ellipse 60% 35% at 50% 65%, rgba(255,255,255,0.6) 0%, transparent 65%)`,
            width: '200%',
            left: '-25%',
          }}
        />
      )}
      
      {/* Layer 5: Very subtle overall haze */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(25,25,30,0.5) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,255,255,0.45) 0%, transparent 70%)',
        }}
      />

      {/* === CENTERED TEXT CONTENT (always visible) === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        {/* Name */}
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4"
          style={{
            textShadow: '0 0 60px rgba(0,0,0,0.5), 0 0 120px rgba(0,0,0,0.3), 0 4px 30px rgba(0,0,0,0.9)',
          }}
        >
          TEREZA TIZKOVA
        </h1>
        
        {/* Subtitle - What I do */}
        <p 
          className="font-mono text-sm md:text-base tracking-[0.3em] text-white/90 mb-2"
          style={{
            textShadow: '0 0 30px rgba(0,0,0,0.6), 0 2px 20px rgba(0,0,0,0.9)',
          }}
        >
          GROWTH · AI · WRITING
        </p>
        
        {/* Locations */}
        <p 
          className="font-mono text-xs md:text-sm tracking-[0.2em] text-white/70"
          style={{
            textShadow: '0 0 20px rgba(0,0,0,0.6), 0 2px 15px rgba(0,0,0,0.9)',
          }}
        >
          SAN FRANCISCO · PRAGUE
        </p>
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
