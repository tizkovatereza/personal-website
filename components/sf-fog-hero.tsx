"use client"

import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'

export function SFFogHero() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate random particles on mount
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${30 + Math.random() * 50}%`,
      delay: Math.random() * 8,
    }))
  }, [])

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
    return <div className="w-full h-screen bg-[#0a0e17]" />
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0e17]"
    >
      {/* Blue glow - positioned top-right area */}
      <div 
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* === SVG SF SKYLINE === */}
      <svg 
        className="absolute bottom-0 left-0 right-0 w-full h-[45%] opacity-60"
        viewBox="0 0 1400 400"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translateX(${(mousePos.x - 0.5) * -15}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        {/* Golden Gate Bridge */}
        <g stroke="rgba(59,130,246,0.12)" fill="none">
          {/* Main cables - quadratic curves */}
          <path 
            d="M50 320 Q200 180 350 320" 
            strokeWidth="1.5"
          />
          <path 
            d="M350 320 Q500 180 650 320" 
            strokeWidth="1.5"
          />
          {/* Towers */}
          <line x1="200" y1="180" x2="200" y2="400" strokeWidth="2" />
          <line x1="500" y1="180" x2="500" y2="400" strokeWidth="2" />
          {/* Tower cross beams */}
          <line x1="195" y1="200" x2="205" y2="200" strokeWidth="1.5" />
          <line x1="195" y1="240" x2="205" y2="240" strokeWidth="1.5" />
          <line x1="195" y1="280" x2="205" y2="280" strokeWidth="1.5" />
          <line x1="495" y1="200" x2="505" y2="200" strokeWidth="1.5" />
          <line x1="495" y1="240" x2="505" y2="240" strokeWidth="1.5" />
          <line x1="495" y1="280" x2="505" y2="280" strokeWidth="1.5" />
          {/* Suspender cables */}
          {[80, 120, 160, 240, 280, 320, 380, 420, 460, 540, 580, 620].map((x, i) => (
            <line 
              key={i} 
              x1={x} 
              y1={200 + Math.abs(350 - x) * 0.2} 
              x2={x} 
              y2="400" 
              strokeWidth="0.5" 
              opacity="0.6"
            />
          ))}
          {/* Road deck */}
          <line x1="50" y1="315" x2="650" y2="315" strokeWidth="1" opacity="0.8" />
        </g>

        {/* Downtown Skyline */}
        <g stroke="rgba(59,130,246,0.12)" fill="none">
          {/* Transamerica Pyramid */}
          <path d="M750 400 L780 120 L810 400" strokeWidth="1" />
          
          {/* Salesforce Tower - rounded top */}
          <path d="M860 400 L860 150 Q877 130 894 150 L894 400" strokeWidth="1" />
          
          {/* Various rectangular buildings */}
          <rect x="920" y="200" width="30" height="200" strokeWidth="0.8" />
          <rect x="960" y="240" width="25" height="160" strokeWidth="0.8" />
          <rect x="995" y="180" width="35" height="220" strokeWidth="0.8" />
          <rect x="1040" y="260" width="28" height="140" strokeWidth="0.8" />
          <rect x="1080" y="220" width="32" height="180" strokeWidth="0.8" />
          <rect x="1125" y="280" width="24" height="120" strokeWidth="0.8" />
          <rect x="1160" y="250" width="30" height="150" strokeWidth="0.8" />
          <rect x="1200" y="290" width="22" height="110" strokeWidth="0.8" />
          <rect x="1235" y="310" width="35" height="90" strokeWidth="0.8" />
          <rect x="1285" y="330" width="28" height="70" strokeWidth="0.8" />
          <rect x="1330" y="350" width="24" height="50" strokeWidth="0.8" />
          
          {/* Window dots on buildings */}
          {[925, 935, 945].map((x) => 
            [220, 240, 260, 280, 300, 320, 340, 360, 380].map((y, i) => (
              <circle key={`w1-${x}-${i}`} cx={x} cy={y} r="1" fill="rgba(59,130,246,0.08)" />
            ))
          )}
          {[1000, 1010, 1020].map((x) => 
            [200, 220, 240, 260, 280, 300, 320, 340, 360, 380].map((y, i) => (
              <circle key={`w2-${x}-${i}`} cx={x} cy={y} r="1" fill="rgba(59,130,246,0.08)" />
            ))
          )}
        </g>

        {/* Water line and reflections */}
        <g stroke="rgba(59,130,246,0.08)" fill="none">
          <line x1="0" y1="390" x2="1400" y2="390" strokeWidth="0.5" />
          <line x1="100" y1="398" x2="200" y2="398" strokeWidth="0.3" strokeDasharray="10 20" />
          <line x1="400" y1="396" x2="550" y2="396" strokeWidth="0.3" strokeDasharray="15 30" />
          <line x1="800" y1="398" x2="950" y2="398" strokeWidth="0.3" strokeDasharray="8 25" />
          <line x1="1100" y1="396" x2="1300" y2="396" strokeWidth="0.3" strokeDasharray="12 35" />
        </g>

        {/* Fog gradient at bottom */}
        <defs>
          <linearGradient id="fogFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0e17" stopOpacity="0" />
            <stop offset="100%" stopColor="#0a0e17" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="360" width="1400" height="40" fill="url(#fogFade)" />
      </svg>

      {/* === MAIN CONTENT === */}
      <div className="absolute inset-0 flex flex-col justify-center z-20 px-12 md:px-16 lg:px-20 max-w-[700px]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        {/* Location label with line */}
        <div className="flex items-center gap-4 mb-8">
          <span className="w-6 h-px bg-primary" />
          <span className="relative inline-block group cursor-default">
            <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-1">
              San Francisco
            </span>
            <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase absolute left-0 top-0 opacity-0 -translate-y-1 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap">
              sometimes Prague
            </span>
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-serif text-[44px] md:text-[56px] lg:text-[64px] tracking-[-0.02em] text-foreground leading-[1.1] mb-8">
          Hi, I'm Tereza.
          <br />
          <span className="whitespace-nowrap">
            I like explaining{' '}
            <span className="relative inline-block group cursor-default">
              <span 
                className="text-primary italic transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-2"
                style={{ display: 'inline-block' }}
              >
                complicated things simply.
              </span>
              <span 
                className="text-primary italic absolute left-0 top-0 opacity-0 -translate-y-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap"
              >
                simple things complicatedly.
              </span>
            </span>
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-secondary font-light text-[17px] leading-[1.7] max-w-[520px] mb-10">
          Growth at E2B — the open-source cloud infrastructure for AI agents. I write about what happens when you let autonomous software loose on real problems.
        </p>

        {/* CTA Link */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.05em] uppercase text-foreground group w-fit"
        >
          <span className="link-underline pb-1">Read my writing</span>
          <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* === SCROLL INDICATOR (right side) === */}
      <div className="absolute right-8 bottom-8 flex flex-col items-center z-30">
        <span 
          className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase mb-3"
          style={{ writingMode: 'vertical-rl' }}
        >
          scroll
        </span>
        <div 
          className="w-px h-12"
          style={{
            background: 'linear-gradient(to bottom, rgba(59,130,246,0.6), transparent)',
          }}
        />
      </div>

      {/* === STATUS BAR (bottom) === */}
      <div className="absolute bottom-8 left-12 md:left-16 lg:left-20 right-24 z-30 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-[5px] h-[5px] bg-primary rounded-full pulse-dot" />
          <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
            Currently building at E2B
          </span>
        </div>
        <div className="flex-1 mx-6">
          {/* Spacer line could go here */}
        </div>
        <span className="font-mono text-[11px] font-light text-[#4a4f5a] tracking-[0.05em] hidden md:block">
          37.7749° N, 122.4194° W
        </span>
      </div>
    </div>
  )
}
