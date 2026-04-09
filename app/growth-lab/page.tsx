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
  "Do not let AI write your prose unless you have some kind of wizardly skill file that makes it not sound like AI at all — this is a grail.",
  "Her trick is to do simple content but totally overthink the titles of the content.",
  "Good .COM domains — LLMs, like humans, value them a lot. I don't have proof, but I don't have doubt either.",
  "My one substack post from December is still being read now.",
  "I sold my last company and now I'm building my own agent harness for GTM and growth using Claude Agent SDK and virtual sandboxes.",
  "Spent few hours writing a personal article and just had 6 views and 0 likes — you publish in the void for a while but at least it exists.",
  "Focus on who can deliver specific pain points and what you can control.",
]

const RESOURCES = {
  "Content & Writing": [
    { label: "Deep South Ventures Essays", url: "https://www.deepsouthventures.com/essays/" },
    { label: "Reddit: Job Search Advice", url: "https://www.reddit.com/r/jobs/comments/7y8k6p/" },
    { label: "MIT OpenCourseWare Playlist", url: "https://youtube.com/playlist?list=PLUl4u3cNGP63EUNfnwrkgO2xxwYxNwRdI" },
    { label: "All About Growth YouTube", url: "https://youtube.com/@allaboutgrowth1" },
  ],
  "Growth & Strategy": [
    { label: "@zachlloydtweets thread", url: "https://x.com/zachlloydtweets/status/2037539902448161067" },
    { label: "@searchbound", url: "https://x.com/searchbound" },
    { label: "Old North Whale: Chinese AI", url: "https://www.oldnorthwhale.com/p/the-chinese-are-enthroning-themselves" },
  ],
  "Communities": [
    { label: "Join The Eden", url: "https://jointheden.co" },
  ],
}

const TOOLS = [
  "Claude Code + Factory AI",
  "Claude Agent SDK",
  "Gumloop",
  "Wispr Flow",
  "n8n",
  "Cursor",
  "Nano Banana",
]

const BOOKS = [
  { title: "Zero to One", author: "Peter Thiel" },
  { title: "Fall in Love with the Problem", author: "Uri Levine" },
  { title: "Product Marketing Simplified", author: "Srini Potluri" },
]

const APPLY_LINK = "https://forms.gle/fMU4a2UUffHdFt9H9"

// ============================================

// Lab Flask Component with bubbling and EXPLOSIVE animation
function LabFlask() {
  const [isExploding, setIsExploding] = useState(false)
  const [shakeIntensity, setShakeIntensity] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; color: string; size: number; angle: number; distance: number; delay: number; type: 'circle' | 'shard' | 'droplet' }>>([])
  const [glassShards, setGlassShards] = useState<Array<{ id: number; rotation: number; x: number; y: number }>>([])

  const handleClick = () => {
    if (isExploding) return
    
    // Pre-explosion shake buildup
    setShakeIntensity(1)
    setTimeout(() => setShakeIntensity(2), 150)
    setTimeout(() => setShakeIntensity(3), 300)
    setTimeout(() => setShakeIntensity(5), 400)
    
    // BOOM!
    setTimeout(() => {
      setIsExploding(true)
      setShakeIntensity(0)
      
      // Generate lots of explosion particles
      const colors = ['#b85c38', '#d4a574', '#ff6b35', '#f7931e', '#ffd700', '#ff4444', '#8b7355']
      const newParticles: typeof particles = []
      
      // Main explosion burst - 40 particles
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          id: i,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 20,
          angle: (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.3,
          distance: 150 + Math.random() * 200,
          delay: Math.random() * 100,
          type: 'circle',
        })
      }
      
      // Liquid droplets - 20 more
      for (let i = 40; i < 60; i++) {
        newParticles.push({
          id: i,
          color: colors[Math.floor(Math.random() * 3)], // Mostly orange/brown
          size: 8 + Math.random() * 15,
          angle: Math.random() * Math.PI * 2,
          distance: 80 + Math.random() * 150,
          delay: Math.random() * 50,
          type: 'droplet',
        })
      }
      
      // Glass shards - 15
      for (let i = 60; i < 75; i++) {
        newParticles.push({
          id: i,
          color: 'rgba(200, 200, 200, 0.8)',
          size: 10 + Math.random() * 20,
          angle: Math.random() * Math.PI * 2,
          distance: 100 + Math.random() * 180,
          delay: Math.random() * 30,
          type: 'shard',
        })
      }
      
      setParticles(newParticles)
      
      // Glass shards flying
      setGlassShards(Array.from({ length: 8 }, (_, i) => ({
        id: i,
        rotation: Math.random() * 360,
        x: (Math.random() - 0.5) * 300,
        y: -50 - Math.random() * 150,
      })))
    }, 500)
    
    // Reset after animation
    setTimeout(() => {
      setIsExploding(false)
      setParticles([])
      setGlassShards([])
    }, 3000)
  }

  return (
    <div 
      className="relative w-20 h-24 cursor-pointer overflow-visible" 
      onClick={handleClick}
      style={{
        animation: shakeIntensity > 0 ? `shake ${0.1 - shakeIntensity * 0.01}s infinite` : 'none',
      }}
    >
      {/* Flash effect on explosion */}
      {isExploding && (
        <div 
          className="absolute -inset-20 bg-orange-400 rounded-full pointer-events-none"
          style={{
            animation: 'flash 0.3s ease-out forwards',
          }}
        />
      )}

      {/* Flask SVG */}
      <svg
        viewBox="0 0 80 100"
        className={`w-full h-full transition-all duration-100 ${isExploding ? 'opacity-0 scale-150' : 'opacity-100'}`}
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
        
        {/* Liquid - glowing when about to explode */}
        <path
          d="M15 75 Q20 70 30 72 Q40 74 50 70 Q60 66 65 75 L65 85 Q67 93 58 93 L22 93 Q13 93 15 85 Z"
          fill={shakeIntensity > 3 ? '#ff6b35' : '#b85c38'}
          opacity={shakeIntensity > 0 ? 0.9 : 0.7}
          style={{
            filter: shakeIntensity > 2 ? 'drop-shadow(0 0 8px #ff6b35)' : 'none',
          }}
        >
          <animate
            attributeName="d"
            values="M15 75 Q20 70 30 72 Q40 74 50 70 Q60 66 65 75 L65 85 Q67 93 58 93 L22 93 Q13 93 15 85 Z;
                    M15 75 Q20 78 30 70 Q40 66 50 74 Q60 72 65 75 L65 85 Q67 93 58 93 L22 93 Q13 93 15 85 Z;
                    M15 75 Q20 70 30 72 Q40 74 50 70 Q60 66 65 75 L65 85 Q67 93 58 93 L22 93 Q13 93 15 85 Z"
            dur={shakeIntensity > 0 ? '0.3s' : '2s'}
            repeatCount="indefinite"
          />
        </path>
        
        {/* Bubbles - more aggressive when shaking */}
        <circle cx="30" cy="82" r="3" fill="#d4a574" opacity="0.6">
          <animate attributeName="cy" values="85;70;85" dur={shakeIntensity > 0 ? '0.3s' : '1.5s'} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur={shakeIntensity > 0 ? '0.3s' : '1.5s'} repeatCount="indefinite" />
        </circle>
        <circle cx="45" cy="80" r="2" fill="#d4a574" opacity="0.5">
          <animate attributeName="cy" values="88;65;88" dur={shakeIntensity > 0 ? '0.25s' : '2s'} repeatCount="indefinite" begin="0.1s" />
        </circle>
        <circle cx="38" cy="78" r="2.5" fill="#d4a574" opacity="0.5">
          <animate attributeName="cy" values="86;68;86" dur={shakeIntensity > 0 ? '0.2s' : '1.8s'} repeatCount="indefinite" begin="0.2s" />
        </circle>
        <circle cx="52" cy="84" r="1.5" fill="#d4a574" opacity="0.4">
          <animate attributeName="cy" values="84;72;84" dur={shakeIntensity > 0 ? '0.15s' : '1.3s'} repeatCount="indefinite" begin="0.15s" />
        </circle>
      </svg>

      {/* Explosion particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute pointer-events-none ${p.type === 'shard' ? 'bg-gradient-to-br from-gray-200 to-gray-400' : ''}`}
          style={{
            width: p.size,
            height: p.type === 'shard' ? p.size * 0.4 : p.size,
            backgroundColor: p.type !== 'shard' ? p.color : undefined,
            borderRadius: p.type === 'circle' ? '50%' : p.type === 'droplet' ? '50% 50% 50% 0' : '2px',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${p.type === 'droplet' ? p.angle * 57.3 + 135 : 0}deg)`,
            boxShadow: p.type !== 'shard' ? `0 0 ${p.size / 2}px ${p.color}` : 'none',
            animation: `explode-particle 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            animationDelay: `${p.delay}ms`,
            ['--angle' as string]: `${p.angle}rad`,
            ['--distance' as string]: `${p.distance}px`,
          }}
        />
      ))}

      {/* Flying glass shards */}
      {glassShards.map((shard) => (
        <div
          key={`shard-${shard.id}`}
          className="absolute w-6 h-3 bg-gradient-to-br from-gray-100 to-gray-300 pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            clipPath: 'polygon(0% 50%, 30% 0%, 100% 20%, 70% 100%, 20% 80%)',
            animation: `fly-shard 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            ['--x' as string]: `${shard.x}px`,
            ['--y' as string]: `${shard.y}px`,
            ['--rot' as string]: `${shard.rotation}deg`,
          }}
        />
      ))}

      {/* Smoke puffs */}
      {isExploding && (
        <>
          <div className="absolute left-1/2 top-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400/30 pointer-events-none" style={{ animation: 'smoke 1.5s ease-out forwards' }} />
          <div className="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500/20 pointer-events-none" style={{ animation: 'smoke 1.2s ease-out forwards', animationDelay: '0.1s' }} />
        </>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px) rotate(-1deg); }
          75% { transform: translateX(3px) rotate(1deg); }
        }
        @keyframes flash {
          0% { opacity: 0.8; transform: scale(0.5); }
          50% { opacity: 0.6; }
          100% { opacity: 0; transform: scale(3); }
        }
        @keyframes explode-particle {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance)),
              calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(0.2);
            opacity: 0;
          }
        }
        @keyframes fly-shard {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + var(--x)),
              calc(-50% + var(--y))
            ) rotate(var(--rot)) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes smoke {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -70%) scale(3);
            opacity: 0;
          }
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

      {/* Resources Section */}
      <section className="px-6 py-20 md:py-24 max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#888] uppercase mb-10">
          Resources from the Community
        </p>
        
        <div className="space-y-10">
          {Object.entries(RESOURCES).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-[#2a2a2a] mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b85c38] hover:underline text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Tools */}
          <div>
            <h3 className="text-sm font-medium text-[#2a2a2a] mb-4">Tools Members Use</h3>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs text-[#4a4a4a] border border-[#e5e3df] bg-white"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          
          {/* Books */}
          <div>
            <h3 className="text-sm font-medium text-[#2a2a2a] mb-4">Books</h3>
            <ul className="space-y-2">
              {BOOKS.map((book, i) => (
                <li key={i} className="text-sm text-[#4a4a4a]">
                  <span className="italic">&ldquo;{book.title}&rdquo;</span>
                  <span className="text-[#888]"> — {book.author}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <p className="mt-12 text-xs text-[#aaa]">
          Dedicated website coming soon.
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
