"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function SFFogHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-screen bg-background" />
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* === HERO IMAGE === */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-brutalist.jpg"
          alt="Atmospheric industrial scene"
          fill
          className="object-cover grayscale opacity-60"
          priority
        />
      </div>

      {/* === NOISE/GRAIN OVERLAY === */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* === SCANLINES === */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)',
        }}
      />

      {/* === FOG LAYERS === */}
      <div 
        className="absolute inset-0 pointer-events-none animate-fog-slow"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 30%, rgba(10,10,10,0.2) 50%, transparent 70%)',
          width: '200%',
          left: '-25%',
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none animate-fog-medium"
        style={{
          background: `radial-gradient(ellipse 80% 40% at 20% 70%, rgba(20,20,20,0.7) 0%, transparent 70%),
                       radial-gradient(ellipse 60% 35% at 75% 65%, rgba(15,15,15,0.6) 0%, transparent 60%)`,
          width: '250%',
          left: '-50%',
        }}
      />

      {/* === TOP HEADER BAR === */}
      <div className="absolute top-0 left-0 right-0 z-30 border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-3">
          <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">Tereza Tizkova</span>
          <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">EST. 2024</span>
        </div>
      </div>

      {/* === CENTERED CONTENT === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {/* Striped decoration above name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-3 opacity-40" style={{
            background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 2px, transparent 2px, transparent 5px)',
          }} />
          <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase">San Francisco</span>
          <div className="w-16 h-3 opacity-40" style={{
            background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 2px, transparent 2px, transparent 5px)',
          }} />
        </div>

        {/* Main name */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[0.15em] text-white uppercase mb-4">
          TEREZA
        </h1>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[0.15em] text-white uppercase mb-6">
          TIZKOVA
        </h1>

        {/* Striped decoration below name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-3 opacity-40" style={{
            background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 2px, transparent 2px, transparent 5px)',
          }} />
          <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase">Prague</span>
          <div className="w-20 h-3 opacity-40" style={{
            background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 2px, transparent 2px, transparent 5px)',
          }} />
        </div>

        {/* Subtitle */}
        <p className="text-[10px] md:text-xs tracking-[0.4em] text-white/60 uppercase">
          Growth · AI · Writing
        </p>
      </div>

      {/* === CORNER DECORATIONS === */}
      {/* Top left */}
      <div className="absolute top-16 left-6 z-20">
        <div className="w-8 h-8 border-l border-t border-white/20" />
      </div>
      {/* Top right */}
      <div className="absolute top-16 right-6 z-20">
        <div className="w-8 h-8 border-r border-t border-white/20" />
      </div>
      {/* Bottom left */}
      <div className="absolute bottom-16 left-6 z-20">
        <div className="w-8 h-8 border-l border-b border-white/20" />
      </div>
      {/* Bottom right */}
      <div className="absolute bottom-16 right-6 z-20">
        <div className="w-8 h-8 border-r border-b border-white/20" />
      </div>

      {/* === BOTTOM INFO BAR === */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.15em] text-white/40 uppercase">Scroll</span>
            <svg className="w-3 h-3 text-white/40 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.1em] text-white/30">//////</span>
            <span className="text-[9px] tracking-[0.1em] text-white/30">//////</span>
          </div>
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, #0a0a0a, transparent)'
        }}
      />
    </div>
  )
}
