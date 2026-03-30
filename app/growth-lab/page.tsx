"use client"

import { useState, useEffect, useRef } from 'react'

// ============================================
// EDITABLE CONTENT
// ============================================

const TOPICS = [
  "Making launches go viral",
  "Agent automations for marketing workflows",
  "Writing with AI without losing your voice",
  "Growth tactics — what actually worked and what didn't",
  "Developer marketing and DevRel",
  "The real recs: vendors, venues, creators, tools",
  "Cold outreach, content strategy, social listening",
  "Intros, collabs, finding your people",
]

const QUOTES = [
  "Give away value to the right 5 people instead of marketing to 500.",
  "I built a CLI agent to review podcast transcripts and pull out growth tactics.",
  "I scaled revenue from 100CR to 200CR ARR in a year on quick commerce channels.",
  "I designed the entire studio infrastructure with Claude Code — 100+ custom AI skills, zero dev background.",
  "Scraping competitor's Twitter followers helps find bottom-of-funnel qualified leads.",
  "My best growth hack is calling customers and understanding their grievances.",
  "How far can two people scale using AI as a multiplier rather than a shortcut?",
  "Built a sneaker customisation business purely on X — no paid marketing — scaled to $150k.",
  "Feature gating: users unlock features by referring friends. They can't even pay for it.",
  "I use Wispr Flow to dump all my thoughts into Claude and ask it to summarize into pointers.",
  "Networking on Twitter and a few cold DMs.",
  "I sent free leads to a nonprofit — one person connected me to a referral partner within days.",
]

const APPLY_LINK = "https://forms.gle/fMU4a2UUffHdFt9H9"

// ============================================

// Lab Flask Component with bubbling and explosion animation
function LabFlask() {
  const [isExploding, setIsExploding] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; angle: number; distance: number }>>([])

  const handleClick = () => {
    if (isExploding) return
    setIsExploding(true)
    
    // Generate explosion particles
    const colors = ['#b85c38', '#d4a574', '#8b7355', '#c9b896', '#a04d2e']
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 40,
      y: 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
      angle: (Math.PI * 2 * i) / 20 + Math.random() * 0.5,
      distance: 60 + Math.random() * 40,
    }))
    setParticles(newParticles)
    
    // Reset after animation
    setTimeout(() => {
      setIsExploding(false)
      setParticles([])
    }, 2000)
  }

  return (
    <div className="relative w-20 h-24 cursor-pointer" onClick={handleClick}>
      {/* Flask SVG */}
      <svg
        viewBox="0 0 80 100"
        className={`w-full h-full transition-all duration-300 ${isExploding ? 'opacity-0 scale-110' : 'opacity-100'}`}
      >
        {/* Flask body */}
        <path
          d="M25 35 L25 10 L55 10 L55 35 L70 85 Q72 95 60 95 L20 95 Q8 95 10 85 Z"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2"
        />
        {/* Flask neck */}
        <rect x="25" y="5" width="30" height="8" rx="1" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        
        {/* Liquid */}
        <path
          d="M15 75 Q20 70 30 72 Q40 74 50 70 Q60 66 65 75 L65 85 Q67 93 58 93 L22 93 Q13 93 15 85 Z"
          fill="#b85c38"
          opacity="0.7"
        >
          <animate
            attributeName="d"
            values="M15 75 Q20 70 30 72 Q40 74 50 70 Q60 66 65 75 L65 85 Q67 93 58 93 L22 93 Q13 93 15 85 Z;
                    M15 75 Q20 78 30 70 Q40 66 50 74 Q60 72 65 75 L65 85 Q67 93 58 93 L22 93 Q13 93 15 85 Z;
                    M15 75 Q20 70 30 72 Q40 74 50 70 Q60 66 65 75 L65 85 Q67 93 58 93 L22 93 Q13 93 15 85 Z"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Bubbles */}
        <circle cx="30" cy="82" r="3" fill="#d4a574" opacity="0.6">
          <animate attributeName="cy" values="85;70;85" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="45" cy="80" r="2" fill="#d4a574" opacity="0.5">
          <animate attributeName="cy" values="88;65;88" dur="2s" repeatCount="indefinite" begin="0.3s" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        <circle cx="38" cy="78" r="2.5" fill="#d4a574" opacity="0.5">
          <animate attributeName="cy" values="86;68;86" dur="1.8s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" begin="0.6s" />
        </circle>
        <circle cx="52" cy="84" r="1.5" fill="#d4a574" opacity="0.4">
          <animate attributeName="cy" values="84;72;84" dur="1.3s" repeatCount="indefinite" begin="0.9s" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.3s" repeatCount="indefinite" begin="0.9s" />
        </circle>
      </svg>

      {/* Explosion particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animation: isExploding ? `explode-${p.id} 0.8s ease-out forwards` : 'none',
          }}
        />
      ))}

      {/* Crack overlay during explosion */}
      {isExploding && (
        <svg viewBox="0 0 80 100" className="absolute inset-0 w-full h-full animate-crack">
          <path d="M30 20 L35 50 L25 70 L40 95" stroke="#1a1a1a" strokeWidth="2" fill="none" />
          <path d="M50 15 L45 45 L55 75 L45 90" stroke="#1a1a1a" strokeWidth="2" fill="none" />
          <path d="M35 50 L55 55" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        </svg>
      )}

      {/* Inline keyframes for particles */}
      <style jsx>{`
        ${particles.map((p) => `
          @keyframes explode-${p.id} {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50% + ${Math.cos(p.angle) * p.distance}px),
                calc(-50% + ${Math.sin(p.angle) * p.distance}px)
              ) scale(0.3);
              opacity: 0;
            }
          }
        `).join('\n')}
        @keyframes crack {
          0% { opacity: 0; }
          10% { opacity: 1; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-crack {
          animation: crack 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

// Floating Quote Component
function FloatingQuote({ quote, index, totalQuotes }: { quote: string; index: number; totalQuotes: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const baseRotation = (Math.random() - 0.5) * 6 // -3 to 3 degrees
  
  // Calculate position in a grid-like scattered pattern
  const cols = 3
  const row = Math.floor(index / cols)
  const col = index % cols
  const baseX = (col / cols) * 80 + 10 + (Math.random() - 0.5) * 15
  const baseY = (row / Math.ceil(totalQuotes / cols)) * 80 + 10 + (Math.random() - 0.5) * 10
  
  // Random animation parameters for floating
  const duration = 15 + Math.random() * 10
  const delay = Math.random() * -20

  return (
    <div
      className={`absolute text-sm text-[#4a4a4a] bg-[#faf9f7]/80 px-3 py-2 max-w-[280px] transition-all duration-300 cursor-default select-none ${
        isHovered ? 'z-10 scale-110 shadow-lg' : 'z-0'
      }`}
      style={{
        left: `${baseX}%`,
        top: `${baseY}%`,
        transform: `rotate(${baseRotation}deg)`,
        animation: isHovered ? 'none' : `float-${index} ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      &ldquo;{quote}&rdquo;
      <style jsx>{`
        @keyframes float-${index} {
          0%, 100% {
            transform: rotate(${baseRotation}deg) translate(0, 0);
          }
          25% {
            transform: rotate(${baseRotation + 1}deg) translate(${5 + Math.random() * 10}px, ${-5 - Math.random() * 10}px);
          }
          50% {
            transform: rotate(${baseRotation - 1}deg) translate(${-5 - Math.random() * 5}px, ${5 + Math.random() * 5}px);
          }
          75% {
            transform: rotate(${baseRotation + 0.5}deg) translate(${-3 - Math.random() * 8}px, ${-3 - Math.random() * 8}px);
          }
        }
      `}</style>
    </div>
  )
}

export default function GrowthLabPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a]">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <LabFlask />
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-[#1a1a1a]">
            The Growth Lab
          </h1>
        </div>
        <p className="text-lg md:text-xl text-[#4a4a4a] mb-12 max-w-xl leading-relaxed">
          A curated group of people who do growth every day — sharing tactics, tools, and real talk.
        </p>
        <a
          href={APPLY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-[#b85c38] hover:bg-[#a04d2e] text-white text-base tracking-wide transition-colors duration-200"
        >
          Apply to Join
        </a>
        <p className="mt-5 text-xs tracking-wide text-[#888] uppercase">
          Curated. Applications reviewed manually.
        </p>
      </section>

      {/* Thin accent line */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-[#b85c38]/30" />
      </div>

      {/* Topics Section */}
      <section className="px-6 py-20 md:py-24 max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#888] uppercase mb-10">
          What We Talk About
        </p>
        <ol className="space-y-0">
          {TOPICS.map((topic, i) => (
            <li key={i} className="flex items-baseline py-4 border-b border-[#e5e3df]">
              <span className="font-mono text-xs text-[#aaa] w-8 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-base md:text-lg text-[#2a2a2a]">
                {topic}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Quotes Section - Floating Cloud */}
      <section className="px-6 py-20 md:py-24 max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#888] uppercase mb-10">
          From The Inside
        </p>
        <div className="relative h-[500px] md:h-[600px] border border-[#e5e3df] bg-[#faf9f7] overflow-hidden">
          {QUOTES.map((quote, i) => (
            <FloatingQuote key={i} quote={quote} index={i} totalQuotes={QUOTES.length} />
          ))}
        </div>
        <p className="mt-8 text-sm text-[#666]">
          50+ members across 12 countries.
        </p>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto">
        <div className="h-px bg-[#b85c38]/30 mb-16" />
        <a
          href={APPLY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-[#b85c38] hover:bg-[#a04d2e] text-white text-base tracking-wide transition-colors duration-200"
        >
          Apply to Join
        </a>
        <p className="mt-8 text-sm text-[#666]">
          DM{' '}
          <a
            href="https://x.com/tereza_tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b85c38] hover:underline"
          >
            @terezatizkova
          </a>
          {' '}on X
        </p>
      </section>
    </div>
  )
}
