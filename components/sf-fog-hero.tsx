"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function SFFogHero() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
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
      </div>
      
      {/* Name centered on the image */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1 
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide"
          style={{
            textShadow: '0 0 40px rgba(255, 194, 211, 0.8), 0 0 80px rgba(255, 194, 211, 0.4), 0 2px 20px rgba(0,0,0,0.8)'
          }}
        >
          TEREZA TIZKOVA
        </h1>
      </div>
      
      {/* Subtitle below name */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <p 
          className="font-mono text-xs md:text-sm tracking-widest text-white/80 mt-32 md:mt-40"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}
        >
          GROWTH · AI · WRITING
        </p>
      </div>
      
      {/* Realistic Fog layers - purely decorative, drifting animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          {/* Realistic fog gradients - natural grays */}
          <linearGradient id="fog-gradient-realistic-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d8dce3" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#c5cbd5" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#b8bfcc" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#cfd5de" stopOpacity="0.84" />
          </linearGradient>
          
          <linearGradient id="fog-gradient-realistic-2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#e0e4ea" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#d0d6df" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#bcc3cf" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="fog-gradient-realistic-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c8ced8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#dfe3e9" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Fog texture filter for more realistic look */}
          <filter id="fog-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        
        {/* Base fog layer - thickest, slowest */}
        <rect 
          width="300%" 
          height="100%" 
          fill="url(#fog-gradient-realistic-1)"
          className="animate-fog-slow"
          style={{ filter: 'url(#fog-blur)' }}
        />
        
        {/* Middle fog layer */}
        <rect 
          width="300%" 
          height="100%" 
          fill="url(#fog-gradient-realistic-2)"
          className="animate-fog-medium"
        />
        
        {/* Wispy fog layer - faster */}
        {!isMobile && (
          <rect 
            width="300%" 
            height="100%" 
            fill="url(#fog-gradient-realistic-3)"
            className="animate-fog-fast"
          />
        )}
        
        {/* Top wisp layer - fastest, most transparent */}
        {!isMobile && (
          <rect 
            width="300%" 
            height="100%" 
            fill="#e8ebf0"
            fillOpacity="0.3"
            className="animate-fog-wisp"
          />
        )}
      </svg>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-widest text-white/60">scroll</span>
        <svg 
          className="w-5 h-5 text-white/60 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}
