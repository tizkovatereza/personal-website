"use client"

import { useState, useEffect } from 'react'

// Password for accessing the changelog
const PASSWORD = "tereza123"

// Shipped items for the current week (Week of Mar 30 - Apr 5, 2026)
const shippedThisWeek = [
  {
    title: "New job signature",
    description: "Updated email and social media signatures with new role description",
    tag: "branding",
  },
  {
    title: "New blog post",
    description: "Published new article on Substack",
    tag: "content",
  },
  {
    title: "New version of Topics app",
    description: "Shipped latest update with improved reading experience",
    tag: "product",
  },
  {
    title: "The Growth Lab — first 50 members",
    description: "Launched new community for growth people, reached 50 founding members",
    tag: "community",
  },
  {
    title: "Billboard campaign",
    description: "E2B billboard campaign live online and offline in San Francisco",
    tag: "marketing",
  },
  {
    title: "HumanX conference prep",
    description: "Preparations of E2B booth for HumanX conference",
    tag: "events",
  },
]

// Tag colors
const TAG_COLORS: Record<string, string> = {
  branding: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  content: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  product: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  community: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  marketing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  events: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

export default function ChangelogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [shake, setShake] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  // Check localStorage on mount
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

  // Password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div 
          className={`flex flex-col items-center gap-4 p-8 ${shake ? 'animate-shake' : ''}`}
          style={{ animation: shake ? 'shake 0.5s ease-in-out' : undefined }}
        >
          <div className="text-4xl mb-2">🔒</div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">Private changelog</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Password"
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              autoFocus
            />
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
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
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
        title="Lock"
      >
        🔒
      </button>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Shipped This Week</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">Week of Mar 30 – Apr 5, 2026</p>
        </header>

        {/* Stats */}
        <div className="flex gap-6 mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{shippedThisWeek.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">items shipped</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">🚀</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">momentum</p>
          </div>
        </div>

        {/* Shipped items */}
        <div className="space-y-3">
          {shippedThisWeek.map((item, index) => (
            <div 
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h3>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full uppercase tracking-wide ${TAG_COLORS[item.tag] || 'bg-gray-100 text-gray-600'}`}>
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          Private changelog · Updated weekly
        </p>
      </div>
    </div>
  )
}
