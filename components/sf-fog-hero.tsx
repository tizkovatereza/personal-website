"use client"

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export function SFFogHero() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) {
    return <div className="w-full h-screen bg-background" />
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0c10]"
    >
      {/* Blue glow behind skyline */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)',
        }}
      />

      {/* === SVG SF SKYLINE === */}
      <svg 
        className="absolute bottom-0 left-0 right-0 w-full h-[50%]"
        viewBox="0 0 1400 400"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translateX(${(mousePos.x - 0.5) * -20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Golden Gate Bridge */}
        <g className="text-primary/25">
          {/* Main cables */}
          <path 
            d="M100 300 Q250 180 400 300 Q550 180 700 300" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none"
          />
          {/* Towers */}
          <line x1="250" y1="180" x2="250" y2="400" stroke="currentColor" strokeWidth="2" />
          <line x1="550" y1="180" x2="550" y2="400" stroke="currentColor" strokeWidth="2" />
          {/* Tower cross beams */}
          <line x1="245" y1="200" x2="255" y2="200" stroke="currentColor" strokeWidth="1.5" />
          <line x1="245" y1="240" x2="255" y2="240" stroke="currentColor" strokeWidth="1.5" />
          <line x1="545" y1="200" x2="555" y2="200" stroke="currentColor" strokeWidth="1.5" />
          <line x1="545" y1="240" x2="555" y2="240" stroke="currentColor" strokeWidth="1.5" />
          {/* Vertical cables */}
          {[130, 170, 210, 290, 330, 370, 430, 470, 510, 590, 630, 670].map((x, i) => (
            <line 
              key={i} 
              x1={x} 
              y1={220 + Math.abs(400 - x) * 0.15} 
              x2={x} 
              y2="400" 
              stroke="currentColor" 
              strokeWidth="0.3" 
              opacity="0.5"
            />
          ))}
          {/* Road deck */}
          <line x1="100" y1="295" x2="700" y2="295" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Downtown Skyline */}
        <g className="text-primary/20">
          {/* Transamerica Pyramid */}
          <path d="M800 400 L800 400 L830 140 L860 400 Z" stroke="currentColor" strokeWidth="1" fill="none" />
          
          {/* Salesforce Tower */}
          <rect x="900" y="160" width="35" height="240" stroke="currentColor" strokeWidth="1" fill="none" />
          <ellipse cx="917" cy="160" rx="17" ry="5" stroke="currentColor" strokeWidth="0.5" fill="none" />
          
          {/* Various buildings */}
          <rect x="950" y="220" width="25" height="180" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="985" y="250" width="20" height="150" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1015" y="200" width="30" height="200" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1055" y="270" width="22" height="130" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1085" y="240" width="28" height="160" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1125" y="280" width="20" height="120" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1155" y="260" width="25" height="140" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1190" y="290" width="18" height="110" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1220" y="300" width="30" height="100" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1260" y="320" width="22" height="80" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1295" y="330" width="28" height="70" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="1335" y="340" width="20" height="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </g>

        {/* Water/Bay reflection lines */}
        <g className="text-primary/10">
          <line x1="0" y1="385" x2="1400" y2="385" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="395" x2="1400" y2="395" stroke="currentColor" strokeWidth="0.3" strokeDasharray="30 60" />
        </g>
      </svg>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)',
        }}
      />

      {/* === MAIN CONTENT === */}
      <div className="absolute inset-0 flex flex-col justify-center z-20 px-8 md:px-16 lg:px-24 max-w-3xl">
        {/* Location tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-primary" />
          <span className="font-mono text-xs text-primary tracking-[0.2em]">
            SAN FRANCISCO
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6">
          Building the future
          <br />
          with <em className="text-primary">machines</em>
        </h1>
        
        {/* Description */}
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mb-8">
          Growth at E2B — the open-source cloud infrastructure for AI agents. I write about what happens when you let autonomous software loose on real problems.
        </p>

        {/* CTA Link */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm text-foreground group"
        >
          <span className="border-b border-primary pb-1">Read my writing</span>
          <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* === SCROLL INDICATOR (right side) === */}
      <div className="absolute right-6 bottom-8 top-8 flex flex-col items-center justify-end z-30">
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
          scroll
        </span>
        <div className="w-px h-16 bg-primary/50 mt-3" />
      </div>

      {/* === STATUS BAR (bottom) === */}
      <div className="absolute bottom-6 left-8 md:left-16 lg:left-24 right-24 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full pulse-dot" />
          <span className="font-mono text-[11px] text-muted-foreground tracking-wide">
            Currently building at E2B
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground/50 hidden md:block">
          37.7749° N, 122.4194° W
        </span>
      </div>
    </div>
  )
}
