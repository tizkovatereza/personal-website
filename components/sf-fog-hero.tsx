"use client"

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export function SFFogHero() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
            <span className="whitespace-nowrap">I explain </span>
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
        <p className="text-secondary font-light text-[15px] sm:text-[17px] leading-[1.7] max-w-[520px] mb-8 sm:mb-10">
          I like math, my content has grown a <Link href="/projects" className="text-primary hover:underline">company</Link> from scratch and defined new market category, and I like cheese because<Link href="/about" className="text-primary hover:underline">...</Link>
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
        <div className="flex-1 mx-4 sm:mx-6">
          {/* Spacer line could go here */}
        </div>
        <span className="font-mono text-[11px] font-light text-[#4a4f5a] tracking-[0.05em] hidden md:block">
          37.7749° N, 122.4194° W
        </span>
      </div>
    </div>
  )
}
