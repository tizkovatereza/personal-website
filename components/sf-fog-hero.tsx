"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'

interface HiddenElement {
  id: string
  x: number
  y: number
  label: string
  type: 'project' | 'name' | 'easter'
  discovered: boolean
}

export function SFFogHero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovering, setIsHovering] = useState(false)
  const [clearings, setClearings] = useState<{ x: number; y: number; id: number }[]>([])
  const [hiddenElements, setHiddenElements] = useState<HiddenElement[]>([
    // Projects as landmarks
    { id: 'topics', x: 20, y: 45, label: 'Topics', type: 'project', discovered: false },
    { id: 'e2b', x: 75, y: 40, label: 'E2B', type: 'project', discovered: false },
    { id: 'deeplearning', x: 35, y: 55, label: 'DeepLearning.AI', type: 'project', discovered: false },
    { id: 'growth', x: 60, y: 50, label: 'Growth Talks', type: 'project', discovered: false },
    { id: 'events', x: 85, y: 60, label: 'Hackathons', type: 'project', discovered: false },
    { id: 'discover', x: 15, y: 65, label: 'Discover', type: 'project', discovered: false },
    // Name in center
    { id: 'name', x: 50, y: 50, label: 'TEREZA TIZKOVA', type: 'name', discovered: false },
    // Easter eggs
    { id: 'location', x: 25, y: 75, label: 'SF / PRAGUE / BERLIN', type: 'easter', discovered: false },
    { id: 'hack', x: 82, y: 28, label: '{hack}', type: 'easter', discovered: false },
    { id: 'subtitle', x: 50, y: 58, label: 'growth · AI · writing', type: 'easter', discovered: false },
    { id: 'fog', x: 70, y: 72, label: 'the fog knows', type: 'easter', discovered: false },
    { id: 'build', x: 40, y: 35, label: 'build things', type: 'easter', discovered: false },
  ])
  const [fogIntensity, setFogIntensity] = useState(1) // 1 = full fog, 0 = no fog
  const [transitioning, setTransitioning] = useState(false)
  const clearingIdRef = useRef(0)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset hidden elements when theme changes
  useEffect(() => {
    if (!mounted) return
    setTransitioning(true)
    setFogIntensity(1)
    setClearings([])
    setHiddenElements(prev => prev.map(el => ({ ...el, discovered: false })))
    setTimeout(() => setTransitioning(false), 1000)
  }, [isDark, mounted])

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setMousePos({ x: -1000, y: -1000 })
  }, [])

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? (e as React.TouchEvent).changedTouches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? (e as React.TouchEvent).changedTouches[0].clientY : (e as React.MouseEvent).clientY
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    
    // Add permanent clearing
    setClearings(prev => [...prev, { x, y, id: clearingIdRef.current++ }])
    
    // Check for discovered elements (within 12% radius)
    setHiddenElements(prev => prev.map(el => {
      const distance = Math.sqrt(Math.pow(el.x - x, 2) + Math.pow(el.y - y, 2))
      if (distance < 12 && !el.discovered) {
        return { ...el, discovered: true }
      }
      return el
    }))
  }, [])

  const handleSoBack = () => {
    setFogIntensity(1)
    setClearings([])
    setHiddenElements(prev => prev.map(el => ({ ...el, discovered: false })))
  }

  const handleSoOver = () => {
    setFogIntensity(0)
    setHiddenElements(prev => prev.map(el => ({ ...el, discovered: true })))
  }

  const discoveredCount = hiddenElements.filter(el => el.discovered).length
  const totalCount = hiddenElements.length

  if (!mounted) {
    return <div className="w-full h-screen bg-background" />
  }

  const fogLayers = isMobile ? 2 : 4

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden cursor-crosshair select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchMove={handleMouseMove}
      onTouchStart={handleClick}
    >
      {/* === DAY SCENE: Twin Peaks View === */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-100'}`}
        style={{ pointerEvents: isDark ? 'none' : 'auto' }}
      >
        {/* Sky - pale overcast with pink/blue tint */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #c9d4e3 0%, #d8dce6 30%, #e8dde4 60%, #f0e8ec 100%)'
          }}
        />
        
        {/* Distant hills and bay - very faint */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="distantHills" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a8b5c4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#b8c4d2" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Far distant hills */}
          <path d="M0,500 Q200,450 400,480 T800,460 T1200,490 T1600,470 L1600,600 L0,600 Z" fill="url(#distantHills)" />
        </svg>
        
        {/* City skyline silhouette - detailed buildings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3a4a5c" />
              <stop offset="100%" stopColor="#2a3644" />
            </linearGradient>
          </defs>
          
          {/* Sutro Tower - left side */}
          <g transform="translate(200, 280)">
            <path d="M0,200 L15,200 L20,50 L25,50 L30,0 L35,50 L40,50 L45,200 L60,200 L55,210 L5,210 Z" fill="#4a5a6a" />
            <rect x="27" y="0" width="6" height="15" fill="#5a6a7a" />
            <line x1="30" y1="50" x2="10" y2="150" stroke="#4a5a6a" strokeWidth="2" />
            <line x1="30" y1="50" x2="50" y2="150" stroke="#4a5a6a" strokeWidth="2" />
            <line x1="30" y1="100" x2="5" y2="180" stroke="#4a5a6a" strokeWidth="2" />
            <line x1="30" y1="100" x2="55" y2="180" stroke="#4a5a6a" strokeWidth="2" />
          </g>
          
          {/* Downtown skyline */}
          {/* Transamerica Pyramid */}
          <path d="M700,520 L720,280 L740,520 Z" fill="url(#buildingGrad)" />
          
          {/* Salesforce Tower */}
          <rect x="780" y="300" width="50" height="220" fill="url(#buildingGrad)" rx="0" />
          <ellipse cx="805" cy="300" rx="25" ry="8" fill="#3a4a5c" />
          
          {/* Various downtown buildings */}
          <rect x="600" y="400" width="40" height="120" fill="#3d4d5d" />
          <rect x="650" y="380" width="35" height="140" fill="#455565" />
          <rect x="840" y="420" width="45" height="100" fill="#3d4d5d" />
          <rect x="890" y="390" width="35" height="130" fill="#4a5a6a" />
          <rect x="930" y="440" width="40" height="80" fill="#3d4d5d" />
          <rect x="980" y="410" width="50" height="110" fill="#455565" />
          <rect x="1040" y="450" width="35" height="70" fill="#4a5a6a" />
          <rect x="550" y="430" width="40" height="90" fill="#455565" />
          <rect x="500" y="450" width="35" height="70" fill="#3d4d5d" />
          
          {/* More buildings spreading out */}
          <rect x="1100" y="470" width="30" height="50" fill="#4a5a6a" />
          <rect x="1140" y="480" width="40" height="40" fill="#3d4d5d" />
          <rect x="450" y="470" width="35" height="50" fill="#455565" />
          <rect x="400" y="480" width="30" height="40" fill="#3d4d5d" />
        </svg>
        
        {/* Foreground - Twin Peaks hillside */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7a8a72" />
              <stop offset="50%" stopColor="#6a7a62" />
              <stop offset="100%" stopColor="#5a6a52" />
            </linearGradient>
            <pattern id="grassTexture" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#8a9a82" opacity="0.3" />
              <circle cx="6" cy="5" r="1" fill="#6a7a62" opacity="0.4" />
            </pattern>
          </defs>
          
          {/* Main hill shape */}
          <path 
            d="M-100,900 L-100,650 Q100,600 300,620 Q500,640 700,680 Q900,720 1100,700 Q1300,680 1500,720 Q1700,760 1700,900 Z" 
            fill="url(#hillGrad)" 
          />
          <path 
            d="M-100,900 L-100,650 Q100,600 300,620 Q500,640 700,680 Q900,720 1100,700 Q1300,680 1500,720 Q1700,760 1700,900 Z" 
            fill="url(#grassTexture)" 
          />
          
          {/* Scrubby grass texture lines */}
          {Array.from({ length: 30 }).map((_, i) => (
            <line 
              key={`grass-${i}`}
              x1={50 + i * 50 + Math.random() * 20} 
              y1={700 + Math.random() * 100}
              x2={55 + i * 50 + Math.random() * 20}
              y2={680 + Math.random() * 100}
              stroke="#5a6a52"
              strokeWidth="2"
              opacity="0.5"
            />
          ))}
        </svg>
      </div>

      {/* === NIGHT SCENE: Golden Gate Bridge === */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        style={{ pointerEvents: isDark ? 'auto' : 'none' }}
      >
        {/* Night sky */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0a0a12 0%, #0d1020 40%, #121830 70%, #1a2040 100%)'
          }}
        />
        
        {/* Stars */}
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 80 }).map((_, i) => (
            <circle
              key={`star-${i}`}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 50}%`}
              r={Math.random() * 1.5 + 0.5}
              fill="#ffffff"
              opacity={Math.random() * 0.5 + 0.2}
              className={i % 3 === 0 ? 'twinkle' : ''}
              style={{ animationDelay: `${Math.random() * 3}s` }}
            />
          ))}
        </svg>
        
        {/* Marin Headlands - background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <path d="M0,450 Q200,380 400,400 Q600,420 800,380 Q1000,340 1200,370 Q1400,400 1600,360 L1600,900 L0,900 Z" fill="#0d1525" />
        </svg>
        
        {/* Water with subtle shimmer */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a1525" />
              <stop offset="100%" stopColor="#050a15" />
            </linearGradient>
          </defs>
          <rect x="0" y="550" width="1600" height="350" fill="url(#waterGrad)" />
          
          {/* Water shimmer lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`shimmer-${i}`}
              x1={i * 80 + Math.random() * 40}
              y1={600 + Math.random() * 200}
              x2={i * 80 + 30 + Math.random() * 40}
              y2={600 + Math.random() * 200}
              stroke="#2a4060"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
        </svg>
        
        {/* Golden Gate Bridge */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bridgeRed" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b3a3a" />
              <stop offset="100%" stopColor="#6a2a2a" />
            </linearGradient>
          </defs>
          
          {/* Bridge towers */}
          <rect x="450" y="280" width="30" height="270" fill="url(#bridgeRed)" />
          <rect x="455" y="260" width="20" height="30" fill="#7a3535" />
          <rect x="1050" y="320" width="30" height="230" fill="url(#bridgeRed)" />
          <rect x="1055" y="300" width="20" height="30" fill="#7a3535" />
          
          {/* Main cables - catenary curve */}
          <path 
            d="M100,350 Q450,550 465,290" 
            stroke="#5a2525" 
            strokeWidth="6" 
            fill="none"
          />
          <path 
            d="M465,290 Q750,520 1065,330" 
            stroke="#5a2525" 
            strokeWidth="6" 
            fill="none"
          />
          <path 
            d="M1065,330 Q1350,500 1500,380" 
            stroke="#5a2525" 
            strokeWidth="6" 
            fill="none"
          />
          
          {/* Vertical suspender cables */}
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 480 + i * 50
            const cableY = 290 + Math.sin((i / 11) * Math.PI) * 180
            return (
              <line
                key={`cable-${i}`}
                x1={x}
                y1={cableY}
                x2={x}
                y2={540}
                stroke="#4a2020"
                strokeWidth="1"
              />
            )
          })}
          
          {/* Bridge deck */}
          <rect x="100" y="540" width="1400" height="15" fill="#5a2a2a" />
          
          {/* Bridge lights */}
          {Array.from({ length: 25 }).map((_, i) => (
            <circle
              key={`light-${i}`}
              cx={150 + i * 56}
              cy={545}
              r="2"
              fill="#ffcc66"
              opacity="0.9"
            >
              <animate
                attributeName="opacity"
                values="0.9;0.6;0.9"
                dur={`${2 + Math.random()}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Tower top lights */}
          <circle cx="465" cy="260" r="4" fill="#ff6666" opacity="0.8" />
          <circle cx="1065" cy="300" r="4" fill="#ff6666" opacity="0.8" />
        </svg>
        
        {/* Bridge reflection in water */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" opacity="0.2">
          <rect x="450" y="560" width="30" height="100" fill="#5a2525" />
          <rect x="1050" y="560" width="30" height="80" fill="#5a2525" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={`reflect-${i}`}
              cx={200 + i * 150}
              cy={580 + Math.random() * 50}
              r="3"
              fill="#ffcc66"
              opacity="0.3"
            />
          ))}
        </svg>
      </div>

      {/* === FOG LAYERS === */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ 
          opacity: fogIntensity,
          maskImage: isHovering && fogIntensity > 0 
            ? `radial-gradient(circle ${isMobile ? '100px' : '150px'} at ${mousePos.x}% ${mousePos.y}%, transparent 0%, transparent 50%, black 100%)`
            : 'none',
          WebkitMaskImage: isHovering && fogIntensity > 0
            ? `radial-gradient(circle ${isMobile ? '100px' : '150px'} at ${mousePos.x}% ${mousePos.y}%, transparent 0%, transparent 50%, black 100%)`
            : 'none',
        }}
      >
        {Array.from({ length: fogLayers }).map((_, i) => {
          const opacity = isDark 
            ? 0.4 + (i * 0.15) // darker fog for night
            : 0.5 + (i * 0.12) // lighter fog for day
          const speed = ['animate-fog-slow', 'animate-fog-medium', 'animate-fog-fast', 'animate-fog-wisp'][i]
          const color = isDark 
            ? `rgba(15, 20, 35, ${opacity})` // dark blue-gray for night
            : `rgba(220, 225, 235, ${opacity})` // light gray for day
          
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

      {/* Permanent clearings with pulsing edges */}
      {clearings.map(clearing => (
        <div
          key={clearing.id}
          className="absolute pointer-events-none"
          style={{
            left: `${clearing.x}%`,
            top: `${clearing.y}%`,
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '150px' : '200px',
            height: isMobile ? '150px' : '200px',
            background: `radial-gradient(circle, transparent 0%, transparent 60%, ${isDark ? 'rgba(255, 194, 211, 0.1)' : 'rgba(232, 90, 126, 0.1)'} 80%, transparent 100%)`,
            borderRadius: '50%',
            animation: 'gentle-pulse 3s ease-in-out infinite',
          }}
        />
      ))}

      {/* Hidden elements */}
      {hiddenElements.map(el => {
        const isVisible = el.discovered || fogIntensity < 0.5 || clearings.some(c => {
          const distance = Math.sqrt(Math.pow(c.x - el.x, 2) + Math.pow(c.y - el.y, 2))
          return distance < 15
        })
        
        const isNearMouse = isHovering && Math.sqrt(Math.pow(mousePos.x - el.x, 2) + Math.pow(mousePos.y - el.y, 2)) < 15
        
        return (
          <div
            key={el.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none ${
              isVisible || isNearMouse ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              textShadow: el.discovered 
                ? `0 0 20px ${el.type === 'name' ? 'rgba(255, 194, 211, 0.8)' : el.type === 'project' ? 'rgba(194, 224, 255, 0.8)' : 'rgba(255, 194, 211, 0.5)'}`
                : 'none',
            }}
          >
            <span className={`font-mono text-xs md:text-sm whitespace-nowrap ${
              el.type === 'name' 
                ? 'font-display text-xl md:text-3xl font-bold text-primary' 
                : el.type === 'project'
                ? 'text-secondary font-medium'
                : 'text-muted-foreground'
            }`}>
              {el.label}
            </span>
          </div>
        )
      })}

      {/* Discovery counter */}
      <div className="absolute top-6 right-6 z-30">
        <div className={`px-3 py-2 border ${isDark ? 'bg-black/50 border-white/20' : 'bg-white/50 border-black/10'} backdrop-blur-sm`}>
          <span className="font-mono text-xs tracking-wider text-muted-foreground">
            {discoveredCount}/{totalCount} discovered
          </span>
        </div>
      </div>

      {/* Control buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); handleSoBack(); }}
          className={`px-4 py-2 font-mono text-xs tracking-wider border transition-all ${
            isDark 
              ? 'bg-black/50 border-white/20 text-white/70 hover:bg-white/10 hover:text-white' 
              : 'bg-white/50 border-black/10 text-black/70 hover:bg-black/10 hover:text-black'
          } backdrop-blur-sm`}
        >
          {"we're so back"}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleSoOver(); }}
          className={`px-4 py-2 font-mono text-xs tracking-wider border transition-all ${
            isDark 
              ? 'bg-black/50 border-white/20 text-white/70 hover:bg-white/10 hover:text-white' 
              : 'bg-white/50 border-black/10 text-black/70 hover:bg-black/10 hover:text-black'
          } backdrop-blur-sm`}
        >
          {"it's so over"}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className={`font-mono text-[10px] tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          scroll
        </span>
        <svg 
          className={`w-5 h-5 animate-bounce ${isDark ? 'text-white/40' : 'text-black/40'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Theme transition overlay */}
      {transitioning && (
        <div className="absolute inset-0 bg-background z-50 animate-pulse" />
      )}
    </div>
  )
}
