"use client"

import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

// Password for accessing the changelog
const PASSWORD = "tereza123"

// Changelog data - organized by weeks
const changelog = [
  {
    day: "01",
    month: "Apr",
    title: "Week #14",
    items: [
      "New job signature",
      "New blog post",
      "New version of Topics app",
      "The Growth Lab — first 50 members",
      "Billboard campaign live in SF (online + offline)",
      "Preparations of E2B booth for HumanX conference",
    ],
  },
  {
    day: "25",
    month: "Mar",
    title: "Week #13",
    items: [
      "DeepLearning.ai course launch preparations",
      "Growth Lab community setup",
      "Billboard creative review",
    ],
  },
  {
    day: "18",
    month: "Mar",
    title: "Week #12",
    items: [
      "Filmed DeepLearning.ai course content",
      "E2B startups program updates",
      "Topics app feature iteration",
    ],
  },
  {
    day: "11",
    month: "Mar",
    title: "Week #11",
    items: [
      "Course script finalization",
      "New blog post on AI agents",
      "Community onboarding flow",
    ],
  },
  {
    day: "04",
    month: "Mar",
    title: "Week #10",
    items: [
      "Course recording prep",
      "Billboard campaign planning",
      "Growth Lab landing page",
    ],
  },
]

export default function ChangelogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [shake, setShake] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  useEffect(() => {
    const stored = localStorage.getItem('changelog_auth')
    if (stored === 'true') {
      setIsAuthenticated(true)
      setFadeIn(true)
    }
  }, [])

  const handleLogin = () => {
    if (password === PASSWORD) {
      localStorage.setItem('changelog_auth', 'true')
      setIsAuthenticated(true)
      setTimeout(() => setFadeIn(true), 50)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('changelog_auth')
    setIsAuthenticated(false)
    setFadeIn(false)
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div 
          className={`flex flex-col items-center gap-4 p-8 ${shake ? 'animate-shake' : ''}`}
          style={{ animation: shake ? 'shake 0.5s ease-in-out' : undefined }}
        >
          <div className="text-4xl mb-2">🔒</div>
          <p className="text-secondary text-sm font-light">Private changelog</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Password"
              className="px-4 py-2 border border-[rgba(255,255,255,0.1)] bg-[#0f1420] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              autoFocus
            />
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Go
            </button>
          </div>
          <style jsx>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-10px); }
              40% { transform: translateX(10px); }
              60% { transform: translateX(-10px); }
              80% { transform: translateX(10px); }
            }
            .animate-shake {
              animation: shake 0.5s ease-in-out;
            }
          `}</style>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`min-h-screen bg-background transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 p-2 text-secondary hover:text-foreground transition-colors z-10"
        title="Lock"
      >
        🔒
      </button>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <h1 className="font-serif text-[40px] sm:text-[48px] tracking-[-0.02em] text-foreground mb-12">
          Changelog
        </h1>

        {/* Entries */}
        <div className="space-y-0">
          {changelog.map((entry, index) => {
            const isExpanded = expandedIndex === index
            const isActive = index === 0

            return (
              <div key={index}>
                {/* Entry row */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center gap-4 py-4 text-left hover:opacity-80 transition-opacity group"
                >
                  {/* Chevron - only show on active/first */}
                  <div className="w-5 flex justify-center">
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-primary" />
                    )}
                  </div>

                  {/* Day */}
                  <span className={`font-mono text-[15px] w-8 ${isActive ? 'text-foreground font-medium' : 'text-secondary'}`}>
                    {entry.day}
                  </span>

                  {/* Month */}
                  <span className={`font-mono text-[15px] w-10 ${isActive ? 'text-foreground font-medium' : 'text-secondary'}`}>
                    {entry.month}
                  </span>

                  {/* Title */}
                  <span className={`text-[15px] ${isActive ? 'text-foreground font-medium' : 'text-secondary'}`}>
                    {entry.title}
                  </span>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="pl-[72px] pb-6">
                    <ul className="space-y-2">
                      {entry.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex}
                          className="text-[14px] text-secondary flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <p className="mt-16 text-[12px] text-secondary/50">
          Private changelog · Updated weekly
        </p>
      </div>
    </div>
  )
}
