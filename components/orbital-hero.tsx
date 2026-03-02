"use client"

import { useEffect, useRef, useState } from 'react'

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

export function OrbitalHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
      
      // Draw stars with twinkle
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()
      })
      
      // Draw orbits
      orbits.forEach((orbit, i) => {
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
        
        // Glow effect
        const color = dot.color === 'pink' ? pink : blue
        const glow = ctx.createRadialGradient(x, y, 0, x, y, dot.size * 4)
        glow.addColorStop(0, color)
        glow.addColorStop(0.3, color.replace(')', ', 0.5)').replace('rgb', 'rgba'))
        glow.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.arc(x, y, dot.size * 4, 0, Math.PI * 2)
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
  }, [isMobile])
  
  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-foreground mb-4 text-center">
          TEREZA TIZKOVA
        </h1>
        <p className="font-mono text-xs sm:text-sm tracking-widest text-muted-foreground uppercase">
          growth · AI · writing · interstellar curiosity
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </div>
  )
}
