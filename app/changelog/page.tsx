"use client"

import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

const PASSWORD = "tereza123"

// Changelog grouped by year, each entry is a week with date range
const changelog: Record<string, { range: string; items: string[] }[]> = {
  '2026': [
    {
      range: "30 Mar – 05 Apr",
      items: [
        "Signed new job",
        "Sent Topics app for approval to App Store",
        "Pushed SF billboard campaign live with 19 customers",
        "Prepared everything for E2B booth at HumanX (our first conference!)",
      ],
    },
  ],
}

export default function ChangelogPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [open, setOpen] = useState<string | null>("2026-0")

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
        <h1 className="font-serif text-4xl mb-12">Changelog</h1>

        {Object.entries(changelog).map(([year, weeks]) => (
          <div key={year} className="mb-10">
            <h2 className="font-mono text-xs text-primary tracking-wider mb-4">{year}</h2>
            
            {weeks.map((entry, i) => {
              const key = `${year}-${i}`
              return (
                <div key={key} className="border-b border-[rgba(255,255,255,0.06)] last:border-0">
                  <button
                    onClick={() => setOpen(open === key ? null : key)}
                    className="w-full flex items-center gap-3 py-3 text-left"
                  >
                    <ChevronRight 
                      className={`w-4 h-4 text-primary transition-transform ${open === key ? 'rotate-90' : ''}`} 
                    />
                    <span className="text-sm">{entry.range}</span>
                  </button>

                  {open === key && (
                    <ul className="pl-7 pb-4 space-y-1">
                      {entry.items.map((item, j) => (
                        <li key={j} className="text-sm text-secondary">— {item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
