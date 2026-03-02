"use client"

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface OrbitingDot {
  orbitIndex: number
  angle: number
  speed: number
  size: number
  color: 'pink' | 'blue'
  glowIntensity: number
}

interface OrbitalHeroProps {
  fogActive?: boolean
}

export function OrbitalHero({ fogActive = false }: OrbitalHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationId: number
    let width = container.clientWidth
    let height = container.clientHeight
    
    // High DPI support
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)
    
    const centerX = width / 2
    const centerY = height / 2
    
    // Colors
    const pink = '#ffc2d3'
    const blue = '#c2e0ff'
    const orbitColor = 'rgba(255, 255, 255, 0.08)'
    
    // Orbits configuration - elliptical, tilted in 3D perspective
    const numOrbits = isMobile ? 4 : 6
    const baseRadius = Math.min(width, height) * (isMobile ? 0.15 : 0.1)
    const orbits = Array.from({ length: numOrbits }, (_, i) => ({
      a: baseRadius + (i + 1) * (isMobile ? 35 : 50), // semi-major axis
      b: (baseRadius + (i + 1) * (isMobile ? 35 : 50)) * 0.4, // semi-minor axis (perspective)
      rotation: Math.PI * 0.1 + (i * 0.05), // slight rotation for each orbit
    }))
    
    // Stars in background
    const numStars = isMobile ? 30 : 80
    const stars: Star[] = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))
    
    // Orbiting dots
    const numDots = isMobile ? 8 : 15
    const dots: OrbitingDot[] = Array.from({ length: numDots }, () => ({
      orbitIndex: Math.floor(Math.random() * numOrbits),
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 3 + 2,
      color: Math.random() > 0.5 ? 'pink' : 'blue',
      glowIntensity: Math.random() * 0.5 + 0.5,
    }))
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left - width / 2) / (width / 2),
        y: (e.clientY - rect.top - height / 2) / (height / 2),
      }
    }
    
    container.addEventListener('mousemove', handleMouseMove)
    
    let time = 0
    
    function draw() {
      if (!ctx) return
      
      // Clear canvas
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, width, height)
      
      time += 0.016
      
      // Mouse influence on perspective
      const mouseInfluence = isMobile ? 0 : 0.15
      const tiltX = mouseRef.current.y * mouseInfluence
      const tiltY = mouseRef.current.x * mouseInfluence
      
      // Fog glow multiplier
      const glowMultiplier = fogActive ? 1.8 : 1
      
      // Draw stars with twinkle
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle * glowMultiplier})`
        ctx.fill()
      })
      
      // Draw orbits
      orbits.forEach((orbit) => {
        ctx.beginPath()
        ctx.strokeStyle = orbitColor
        ctx.lineWidth = 1
        
        // Draw ellipse with perspective tilt
        const perspectiveA = orbit.a * (1 + tiltY * 0.1)
        const perspectiveB = orbit.b * (1 + tiltX * 0.2)
        
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(orbit.rotation + tiltY * 0.1)
        ctx.beginPath()
        ctx.ellipse(0, 0, perspectiveA, perspectiveB, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      })
      
      // Draw orbiting dots
      dots.forEach(dot => {
        dot.angle += dot.speed
        
        const orbit = orbits[dot.orbitIndex]
        const perspectiveA = orbit.a * (1 + tiltY * 0.1)
        const perspectiveB = orbit.b * (1 + tiltX * 0.2)
        
        // Calculate position on tilted ellipse
        const cosAngle = Math.cos(dot.angle)
        const sinAngle = Math.sin(dot.angle)
        const cosRot = Math.cos(orbit.rotation + tiltY * 0.1)
        const sinRot = Math.sin(orbit.rotation + tiltY * 0.1)
        
        const x = centerX + (perspectiveA * cosAngle * cosRot - perspectiveB * sinAngle * sinRot)
        const y = centerY + (perspectiveA * cosAngle * sinRot + perspectiveB * sinAngle * cosRot)
        
        // Glow effect - enhanced when fog is active
        const color = dot.color === 'pink' ? pink : blue
        const glowSize = dot.size * 4 * glowMultiplier
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
        glow.addColorStop(0, color)
        glow.addColorStop(0.3, color.replace(')', ', 0.5)').replace('rgb', 'rgba'))
        glow.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.arc(x, y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        
        // Core dot
        ctx.beginPath()
        ctx.arc(x, y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      })
      
      animationId = requestAnimationFrame(draw)
    }
    
    draw()
    
    // Resize handler
    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobile, fogActive])
  
  // Calculate text scale and opacity based on scroll
  const maxScroll = 300
  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  const textScale = 1 - (scrollProgress * 0.4) // Scale from 1 to 0.6
  const textOpacity = 1 - (scrollProgress * 0.7) // Fade from 1 to 0.3
  
  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      {/* Center content - smaller and fades on scroll */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-transform duration-100"
        style={{
          transform: `scale(${textScale})`,
          opacity: textOpacity,
        }}
      >
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-foreground mb-3 text-center">
          TEREZA TIZKOVA
        </h1>
        <p className="font-mono text-[10px] sm:text-xs tracking-widest text-muted-foreground uppercase">
          growth · AI · writing
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </div>
  )
}
