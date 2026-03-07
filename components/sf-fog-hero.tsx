"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'

export function SFFogHero() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Typewriter state
  const [phase, setPhase] = useState<'idle' | 'typing-static' | 'typing-dynamic' | 'complete'>('idle')
  const [staticText, setStaticText] = useState('')
  const [dynamicText, setDynamicText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isErasing, setIsErasing] = useState(false)
  
  const staticPart = "I explain "
  const phrase1 = "complicated things simply."
  const phrase2 = "simple things complicatedly."
  const [currentPhrase, setCurrentPhrase] = useState(phrase1)

  // Cursor blink effect
  useEffect(() => {
    if (phase === 'complete' && !isErasing) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 530)
      return () => clearInterval(interval)
    } else {
      setShowCursor(true)
    }
  }, [phase, isErasing])

  // Typewriter effect on mount
  useEffect(() => {
    setMounted(true)
    
    const startTyping = async () => {
      await new Promise(r => setTimeout(r, 500))
      setPhase('typing-static')
      
      // Type static part
      for (let i = 0; i <= staticPart.length; i++) {
        setStaticText(staticPart.slice(0, i))
        await new Promise(r => setTimeout(r, 80))
      }
      
      setPhase('typing-dynamic')
      
      // Type dynamic part
      for (let i = 0; i <= phrase1.length; i++) {
        setDynamicText(phrase1.slice(0, i))
        await new Promise(r => setTimeout(r, 80))
      }
      
      setPhase('complete')
    }
    
    startTyping()
  }, [])

  // Handle hover swap with typewriter effect
  const handleMouseEnter = useCallback(async () => {
    if (phase !== 'complete' || isErasing) return
    setIsHovered(true)
    setIsErasing(true)
    
    const currentText = currentPhrase
    const newPhrase = currentPhrase === phrase1 ? phrase2 : phrase1
    
    // Erase current phrase
    for (let i = currentText.length; i >= 0; i--) {
      setDynamicText(currentText.slice(0, i))
      await new Promise(r => setTimeout(r, 40))
    }
    
    // Type new phrase
    for (let i = 0; i <= newPhrase.length; i++) {
      setDynamicText(newPhrase.slice(0, i))
      await new Promise(r => setTimeout(r, 80))
    }
    
    setCurrentPhrase(newPhrase)
    setIsErasing(false)
  }, [phase, isErasing, currentPhrase])

  const handleMouseLeave = useCallback(async () => {
    if (phase !== 'complete' || isErasing) return
    setIsHovered(false)
    setIsErasing(true)
    
    const currentText = currentPhrase
    const newPhrase = currentPhrase === phrase1 ? phrase2 : phrase1
    
    // Erase current phrase
    for (let i = currentText.length; i >= 0; i--) {
      setDynamicText(currentText.slice(0, i))
      await new Promise(r => setTimeout(r, 40))
    }
    
    // Type new phrase
    for (let i = 0; i <= newPhrase.length; i++) {
      setDynamicText(newPhrase.slice(0, i))
      await new Promise(r => setTimeout(r, 80))
    }
    
    setCurrentPhrase(newPhrase)
    setIsErasing(false)
  }, [phase, isErasing, currentPhrase])

  if (!mounted) {
    return <div className="w-full min-h-screen bg-[#0a0e17]" />
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#0a0e17]"
    >
      {/* === FULL-BLEED BACKGROUND IMAGE === */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u9688764358_Wide_panoramic_detailed_comics_illustration_of_Sa_8211bc00-2534-4128-a7e5-c4f534aa9ca9_2-AefoccmOBLR3YI9bRUbEQZysd5JjYj.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          opacity: 0.2,
        }}
      />
      
      {/* === GRADIENT OVERLAY (dark at top, transparent at bottom) === */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 14, 23, 0.6) 0%, rgba(10, 14, 23, 0.6) 40%, transparent 100%)',
        }}
      />

      {/* === MAIN CONTENT === */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-24 max-w-[700px]">
        {/* Main headline */}
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] tracking-[-0.02em] text-foreground leading-[1.15] mb-6 sm:mb-8">
          Hi, I'm Tereza.
          <br />
          <span className="block sm:inline">
            <span>{staticText}</span>
            <span 
              className="text-primary italic cursor-default"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {dynamicText}
            </span>
            <span 
              className={`inline-block w-[2px] h-[0.9em] bg-primary ml-[2px] align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
            />
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-secondary font-light text-[15px] sm:text-[17px] leading-[1.7] max-w-[520px] mb-8 sm:mb-10">
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

      {/* === SCROLL INDICATOR (right side) - hidden on mobile === */}
      <div className="hidden sm:flex absolute right-6 md:right-8 bottom-8 flex-col items-center z-30">
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
      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 md:left-12 lg:left-16 xl:left-20 right-6 sm:right-20 z-30 flex items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-[5px] h-[5px] bg-primary rounded-full pulse-dot flex-shrink-0" />
          <span className="font-mono text-[10px] sm:text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
            Currently building at E2B
          </span>
        </div>
        <div className="flex-1 mx-4 sm:mx-6" />
        <span className="font-mono text-[11px] font-light text-[#4a4f5a] tracking-[0.05em] hidden md:block">
          37.7749° N, 122.4194° W
        </span>
      </div>
    </div>
  )
}
