"use client"

import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

const PASSWORD = "tereza123"

// Simple changelog - just week titles and bullet points
const changelog = [
  {
    date: "01 Apr",
    week: "Week #14",
    items: [
      "New job signature",
      "New blog post", 
      "New version of Topics app",
      "The Growth Lab — first 50 members",
      "Billboard campaign live in SF",
      "E2B booth prep for HumanX",
    ],
  },
  {
    date: "25 Mar",
    week: "Week #13",
    items: [
      "DeepLearning.ai course launch prep",
      "Growth Lab community setup",
    ],
  },
  {
    date: "18 Mar",
    week: "Week #12",
    items: [
      "Filmed DeepLearning.ai course",
      "E2B startups program updates",
    ],
  },
]

export default function ChangelogPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [open, setOpen] = useState<number | null>(0)

  useEffect(() => {
    if (localStorage.getItem('cl_auth') === '1') setAuthed(true)
  }, [])

  const login = () => {
    if (pw === PASSWORD) {
      localStorage.setItem('cl_auth', '1')
      setAuthed(true)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex gap-2">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Password"
            className="px-3 py-2 border border-[rgba(255,255,255,0.1)] bg-[#0f1420] text-sm"
            autoFocus
          />
          <button onClick={login} className="px-3 py-2 bg-foreground text-background text-sm">
            Go
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl mb-10">Changelog</h1>

        {changelog.map((entry, i) => (
          <div key={i} className="border-b border-[rgba(255,255,255,0.06)] last:border-0">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-3 py-4 text-left"
            >
              <ChevronRight 
                className={`w-4 h-4 text-primary transition-transform ${open === i ? 'rotate-90' : ''}`} 
              />
              <span className="font-mono text-sm text-secondary w-16">{entry.date}</span>
              <span className="text-sm">{entry.week}</span>
            </button>

            {open === i && (
              <ul className="pl-7 pb-4 space-y-1">
                {entry.items.map((item, j) => (
                  <li key={j} className="text-sm text-secondary">— {item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
