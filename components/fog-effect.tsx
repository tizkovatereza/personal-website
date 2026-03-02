"use client"

import { useEffect, useState } from 'react'

interface FogEffectProps {
  active: boolean
}

export function FogEffect({ active }: FogEffectProps) {
  const [mounted, setMounted] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!active && mounted) {
      setIsClearing(true)
      const timer = setTimeout(() => setIsClearing(false), 500)
      return () => clearTimeout(timer)
    }
  }, [active, mounted])
  
  if (!mounted) return null
  if (!active && !isClearing) return null
  
  return (
    <div 
      className={`fixed inset-0 z-40 pointer-events-none transition-opacity ${
        active ? 'opacity-100' : 'opacity-0'
      } ${isClearing ? 'duration-500' : 'duration-1000'}`}
    >
      {/* Layer 1 - Closest, fastest */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-white/20 via-white/10 to-transparent 
          blur-3xl transform transition-transform duration-[3000ms] ease-out
          ${active ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ transitionDelay: '0ms' }}
      />
      
      {/* Layer 2 - Middle */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent 
          blur-2xl transform transition-transform duration-[4000ms] ease-out
          ${active ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ transitionDelay: '200ms' }}
      />
      
      {/* Layer 3 - Furthest, slowest */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-white/15 via-transparent to-transparent 
          blur-xl transform transition-transform duration-[5000ms] ease-out
          ${active ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ transitionDelay: '400ms' }}
      />
      
      {/* Wispy overlay */}
      <div 
        className={`absolute inset-0 opacity-30 transition-opacity duration-[2000ms]
          ${active ? 'opacity-30' : 'opacity-0'}`}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(255,194,211,0.2) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 90%, rgba(194,224,255,0.15) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(255,255,255,0.1) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  )
}
