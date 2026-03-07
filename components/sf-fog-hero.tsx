"use client"

import { useEffect, useState, useRef } from 'react'

// Floating particle component
function Particle({ delay, duration, x }: { delay: number; duration: number; x: number }) {
  return (
    <div
      className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
      style={{
        left: `${x}%`,
        bottom: '20%',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  )
}

export function SFFogHero() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
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

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 4,
    x: Math.random() * 100,
  }))

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0c10]"
    >
      {/* Binary code watermark - scrolling */}
      <div className="absolute right-4 top-0 bottom-0 w-20 overflow-hidden opacity-[0.03] pointer-events-none">
        <div className="animate-binary font-mono text-[8px] text-foreground leading-tight whitespace-pre">
          {Array.from({ length: 100 }, () => 
            Array.from({ length: 8 }, () => Math.round(Math.random())).join('')
          ).join('\n')}
          {Array.from({ length: 100 }, () => 
            Array.from({ length: 8 }, () => Math.round(Math.random())).join('')
          ).join('\n')}
        </div>
      </div>

      {/* Blue glow behind skyline */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)',
          transform: `translate(-50%, ${mousePos.y * 10}px)`,
        }}
      />

      {/* === SVG SF SKYLINE === */}
      <svg 
        className="absolute bottom-0 left-0 right-0 w-full h-[45%]"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Golden Gate Bridge */}
        <g className="text-primary/30" style={{ transform: `translateX(${mousePos.x * -10}px)` }}>
          {/* Main cables */}
          <path 
            d="M50 280 Q150 180 250 280 Q350 180 450 280" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          {/* Towers */}
          <rect x="145" y="180" width="10" height="220" fill="currentColor" />
          <rect x="345" y="180" width="10" height="220" fill="currentColor" />
          {/* Tower tops */}
          <rect x="140" y="175" width="20" height="10" fill="currentColor" />
          <rect x="340" y="175" width="20" height="10" fill="currentColor" />
          {/* Vertical cables */}
          {[80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 410].map((x, i) => (
            <line key={i} x1={x} y1={200 + Math.abs(200 - x) * 0.3} x2={x} y2="400" stroke="currentColor" strokeWidth="0.5" />
          ))}
          {/* Road deck */}
          <rect x="50" y="275" width="400" height="8" fill="currentColor" opacity="0.5" />
        </g>

        {/* Downtown Skyline */}
        <g className="text-primary/20" style={{ transform: `translateX(${mousePos.x * -5}px)` }}>
          {/* Transamerica Pyramid */}
          <polygon points="580,280 600,100 620,280" fill="currentColor" />
          
          {/* Salesforce Tower */}
          <rect x="660" y="120" width="40" height="280" fill="currentColor" />
          <ellipse cx="680" cy="120" rx="20" ry="8" fill="currentColor" />
          
          {/* Various buildings */}
          <rect x="720" y="180" width="30" height="220" fill="currentColor" />
          <rect x="760" y="200" width="25" height="200" fill="currentColor" />
          <rect x="800" y="160" width="35" height="240" fill="currentColor" />
          <rect x="850" y="220" width="28" height="180" fill="currentColor" />
          <rect x="890" y="190" width="32" height="210" fill="currentColor" />
          <rect x="940" y="240" width="25" height="160" fill="currentColor" />
          <rect x="980" y="210" width="30" height="190" fill="currentColor" />
          <rect x="1020" y="250" width="22" height="150" fill="currentColor" />
          <rect x="1060" y="230" width="28" height="170" fill="currentColor" />
          <rect x="1100" y="260" width="35" height="140" fill="currentColor" />
          <rect x="1150" y="280" width="30" height="120" fill="currentColor" />
          
          {/* Sutro Tower */}
          <g transform="translate(520, 200)">
            <line x1="15" y1="0" x2="15" y2="80" stroke="currentColor" strokeWidth="2" />
            <line x1="0" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="5" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="60" x2="20" y2="60" stroke="currentColor" strokeWidth="1.5" />
          </g>
        </g>

        {/* Water/Bay reflection lines */}
        <g className="text-primary/10">
          <line x1="0" y1="380" x2="1200" y2="380" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="390" x2="1200" y2="390" stroke="currentColor" strokeWidth="0.5" strokeDasharray="20 40" />
        </g>
      </svg>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.03) 3px, rgba(0, 0, 0, 0.03) 4px)',
        }}
      />

      {/* === CENTERED TEXT === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center text-foreground tracking-tight mb-4">
          Building the future
          <br />
          with <em className="text-primary not-italic">machines</em>
        </h1>
        
        <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wide mt-2">
          Growth · E2B · SF
        </p>
      </div>

      {/* === STATUS BAR (bottom) === */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full pulse-dot" />
            <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
              Currently building at E2B
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted-foreground/50">
              37.7749° N, 122.4194° W
            </span>
          </div>
        </div>
      </div>

      {/* Gradient fade at very bottom */}
      <div 
        className="absolute bottom-12 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, var(--background), transparent)'
        }}
      />
    </div>
  )
}
