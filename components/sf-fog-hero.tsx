"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

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
    const revealRadius = isMobile ? 60 : 80
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
    const breathing = Math.sin(r.phase) * 3
    return r.radius + breathing
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0f] cursor-crosshair"
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {/* SF Skyline Background - Always visible under fog */}
      <div className="absolute inset-0">
        {/* Sky gradient - very dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a0f]" />
        
        {/* Distant hills silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 h-[60%]" viewBox="0 0 1200 400" preserveAspectRatio="none">
          {/* Far hills */}
          <path 
            d="M0 400 L0 280 Q100 200 200 250 Q350 180 500 220 Q650 180 750 200 Q900 150 1000 180 Q1100 160 1200 200 L1200 400 Z"
            fill="#0d0d12"
          />
          {/* Twin Peaks silhouette */}
          <path 
            d="M700 400 L650 300 Q700 240 750 300 Q800 250 850 320 L900 400 Z"
            fill="#101018"
            className={elements.find(e => e.id === 'twin')?.discovered ? 'opacity-100' : 'opacity-50'}
          />
        </svg>
        
        {/* Golden Gate Bridge silhouette */}
        <svg className="absolute bottom-[25%] left-[5%] w-[25%] h-[30%]" viewBox="0 0 300 200">
          <g className={elements.find(e => e.id === 'ggb')?.discovered ? 'opacity-100' : 'opacity-30'}>
            {/* Main cables */}
            <path 
              d="M20 60 Q75 20 150 10 Q225 20 280 60"
              stroke={elements.find(e => e.id === 'ggb')?.discovered ? '#cc4466' : '#1a1a24'}
              strokeWidth="4"
              fill="none"
            />
            {/* Towers */}
            <rect x="65" y="10" width="10" height="150" fill={elements.find(e => e.id === 'ggb')?.discovered ? '#993344' : '#121218'} />
            <rect x="225" y="10" width="10" height="150" fill={elements.find(e => e.id === 'ggb')?.discovered ? '#993344' : '#121218'} />
            {/* Road deck */}
            <rect x="0" y="150" width="300" height="6" fill={elements.find(e => e.id === 'ggb')?.discovered ? '#662233' : '#0f0f14'} />
            {/* Vertical cables */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line 
                key={i} 
                x1={40 + i * 25} 
                y1={150} 
                x2={40 + i * 25} 
                y2={60 - Math.abs(4 - i) * 5}
                stroke={elements.find(e => e.id === 'ggb')?.discovered ? '#883355' : '#14141c'}
                strokeWidth="1"
              />
            ))}
          </g>
        </svg>
        
        {/* Sutro Tower silhouette */}
        <svg className="absolute bottom-[35%] left-[52%] w-[8%] h-[25%]" viewBox="0 0 80 200">
          <g className={elements.find(e => e.id === 'sutro')?.discovered ? 'opacity-100' : 'opacity-30'}>
            {/* Main structure */}
            <polygon 
              points="40,0 35,60 20,60 25,150 10,200 30,200 35,150 45,150 50,200 70,200 55,150 60,60 45,60"
              fill={elements.find(e => e.id === 'sutro')?.discovered ? '#cc6688' : '#101018'}
            />
            {/* Cross beams */}
            <line x1="25" y1="80" x2="55" y2="80" stroke={elements.find(e => e.id === 'sutro')?.discovered ? '#aa5577' : '#0d0d14'} strokeWidth="2" />
            <line x1="20" y1="120" x2="60" y2="120" stroke={elements.find(e => e.id === 'sutro')?.discovered ? '#aa5577' : '#0d0d14'} strokeWidth="2" />
          </g>
        </svg>
        
        {/* Transamerica Pyramid silhouette */}
        <svg className="absolute bottom-[20%] right-[10%] w-[6%] h-[35%]" viewBox="0 0 60 200">
          <polygon 
            points="30,0 10,200 50,200"
            fill={elements.find(e => e.id === 'pyramid')?.discovered ? '#cc88aa' : '#101018'}
            className={elements.find(e => e.id === 'pyramid')?.discovered ? 'opacity-100' : 'opacity-30'}
          />
        </svg>
        
        {/* City buildings silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 h-[30%]" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <rect x="100" y="80" width="40" height="120" fill="#0c0c12" />
          <rect x="150" y="100" width="30" height="100" fill="#0e0e14" />
          <rect x="200" y="60" width="50" height="140" fill="#0b0b10" />
          <rect x="280" y="90" width="35" height="110" fill="#0d0d13" />
          <rect x="350" y="70" width="45" height="130" fill="#0c0c11" />
          <rect x="450" y="110" width="30" height="90" fill="#0e0e15" />
          <rect x="550" y="50" width="60" height="150" fill="#0a0a0f" />
          <rect x="650" y="80" width="40" height="120" fill="#0c0c12" />
          <rect x="750" y="100" width="35" height="100" fill="#0d0d14" />
          <rect x="850" y="65" width="55" height="135" fill="#0b0b11" />
          <rect x="950" y="90" width="45" height="110" fill="#0c0c13" />
          <rect x="1050" y="75" width="50" height="125" fill="#0d0d12" />
        </svg>
        
        {/* Hidden text elements */}
        {elements.filter(e => e.type === 'text' || e.type === 'easter' || e.type === 'name').map(el => (
          <div
            key={el.id}
            className={`absolute transition-opacity duration-500 ${el.discovered || fogCleared ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <span 
              className={`
                font-mono text-xs tracking-widest whitespace-nowrap
                ${el.type === 'name' ? 'text-2xl md:text-4xl font-display font-bold text-foreground' : ''}
                ${el.type === 'text' ? 'text-secondary' : ''}
                ${el.type === 'easter' ? 'text-primary/80 text-[10px]' : ''}
              `}
              style={{
                textShadow: el.discovered || fogCleared 
                  ? el.type === 'landmark' || el.type === 'name' 
                    ? '0 0 20px rgba(255, 194, 211, 0.5)' 
                    : '0 0 15px rgba(194, 224, 255, 0.5)'
                  : 'none'
              }}
            >
              {el.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Fog layers - with mask cutouts */}
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
          
          {/* Fog gradient */}
          <linearGradient id="fog-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a1a24" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#181822" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#1c1c28" stopOpacity="0.95" />
          </linearGradient>
          
          <linearGradient id="fog-gradient-2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#141420" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0a12" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        
        {/* Fog layer 1 - slowest, thickest */}
        <g mask={`url(#${maskId})`} className={fogCleared ? 'opacity-0 transition-opacity duration-1000' : 'opacity-100'}>
          <rect 
            width="200%" 
            height="100%" 
            fill="url(#fog-gradient-1)"
            className="animate-fog-slow"
          />
        </g>
        
        {/* Fog layer 2 */}
        <g mask={`url(#${maskId})`} className={fogCleared ? 'opacity-0 transition-opacity duration-700' : 'opacity-100'}>
          <rect 
            width="200%" 
            height="100%" 
            fill="#16161e"
            fillOpacity="0.8"
            className="animate-fog-medium"
          />
        </g>
        
        {/* Fog layer 3 - faster, lighter */}
        {!isMobile && (
          <g mask={`url(#${maskId})`} className={fogCleared ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'}>
            <rect 
              width="200%" 
              height="100%" 
              fill="#1e1e28"
              fillOpacity="0.6"
              className="animate-fog-fast"
            />
          </g>
        )}
        
        {/* Fog layer 4 - fastest wisps */}
        {!isMobile && (
          <g mask={`url(#${maskId})`} className={fogCleared ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'}>
            <rect 
              width="200%" 
              height="100%" 
              fill="url(#fog-gradient-2)"
              fillOpacity="0.4"
              className="animate-fog-wisp"
            />
          </g>
        )}
      </svg>
      
      {/* Discovery counter */}
      <div className="absolute top-6 right-6 z-20 font-mono text-[10px] tracking-widest text-muted-foreground">
        {discoveredCount}/{HIDDEN_ELEMENTS.length} discovered
      </div>
      
      {/* Instruction hint */}
      {discoveredCount === 0 && !fogCleared && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] tracking-widest text-muted-foreground/50 animate-pulse">
          click to explore
        </div>
      )}
      
      {/* Control buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        <button
          onClick={(e) => { e.stopPropagation(); rollFogBack(); }}
          className="font-mono text-[10px] text-muted-foreground/50 hover:text-primary transition-colors uppercase tracking-widest"
        >
          we&apos;re so back
        </button>
        <span className="text-muted-foreground/20">·</span>
        <button
          onClick={(e) => { e.stopPropagation(); clearAllFog(); }}
          className="font-mono text-[10px] text-muted-foreground/50 hover:text-secondary transition-colors uppercase tracking-widest"
        >
          it&apos;s so over
        </button>
      </div>
    </div>
  )
}
