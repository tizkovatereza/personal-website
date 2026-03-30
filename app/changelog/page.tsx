"use client"

import { useState, useEffect, useMemo } from 'react'

// Password for accessing the changelog
const PASSWORD = "tereza123"

// Tag colors - pastel variants
const TAG_COLORS: Record<string, { bg: string; dot: string }> = {
  writing: { bg: 'bg-pink-100 dark:bg-pink-900/30', dot: 'bg-pink-400' },
  code: { bg: 'bg-green-100 dark:bg-green-900/30', dot: 'bg-green-400' },
  calls: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', dot: 'bg-yellow-400' },
  design: { bg: 'bg-purple-100 dark:bg-purple-900/30', dot: 'bg-purple-400' },
  thinking: { bg: 'bg-blue-100 dark:bg-blue-900/30', dot: 'bg-blue-400' },
  admin: { bg: 'bg-gray-100 dark:bg-gray-700/30', dot: 'bg-gray-400' },
}

// Sample data - 3 weeks of realistic work logs
const workLogs = [
  // Week of Mar 24-30, 2026
  { date: "2026-03-30", hour: 10, duration: 1, task: "Blog writing", tag: "writing" },
  { date: "2026-03-30", hour: 11, duration: 1, task: "Blog writing", tag: "writing" },
  { date: "2026-03-30", hour: 12, duration: 1, task: "Customer call - Syntropy", tag: "calls" },
  { date: "2026-03-30", hour: 14, duration: 2, task: "Code review", tag: "code" },
  { date: "2026-03-28", hour: 9, duration: 3, task: "E2B docs rewrite", tag: "writing" },
  { date: "2026-03-28", hour: 13, duration: 2, task: "Partner sync - Fireworks", tag: "calls" },
  { date: "2026-03-27", hour: 10, duration: 4, task: "Hackathon planning", tag: "admin" },
  { date: "2026-03-27", hour: 15, duration: 2, task: "Landing page design", tag: "design" },
  { date: "2026-03-26", hour: 9, duration: 2, task: "Team standup", tag: "calls" },
  { date: "2026-03-26", hour: 11, duration: 3, task: "SDK examples", tag: "code" },
  { date: "2026-03-26", hour: 15, duration: 2, task: "Newsletter draft", tag: "writing" },
  { date: "2026-03-25", hour: 10, duration: 3, task: "Product roadmap", tag: "thinking" },
  { date: "2026-03-25", hour: 14, duration: 2, task: "Demo video recording", tag: "design" },
  { date: "2026-03-24", hour: 9, duration: 2, task: "Inbox zero", tag: "admin" },
  { date: "2026-03-24", hour: 11, duration: 4, task: "API integration guide", tag: "writing" },
  
  // Week of Mar 17-23, 2026
  { date: "2026-03-23", hour: 10, duration: 3, task: "Community Discord Q&A", tag: "calls" },
  { date: "2026-03-23", hour: 14, duration: 2, task: "Bug fixes", tag: "code" },
  { date: "2026-03-22", hour: 9, duration: 4, task: "Technical webinar prep", tag: "design" },
  { date: "2026-03-22", hour: 14, duration: 2, task: "Technical webinar", tag: "calls" },
  { date: "2026-03-21", hour: 10, duration: 3, task: "Substack post", tag: "writing" },
  { date: "2026-03-21", hour: 14, duration: 2, task: "Investor update", tag: "admin" },
  { date: "2026-03-20", hour: 9, duration: 2, task: "1:1 with Vasek", tag: "calls" },
  { date: "2026-03-20", hour: 11, duration: 4, task: "Cookbook examples", tag: "code" },
  { date: "2026-03-19", hour: 10, duration: 3, task: "Content calendar", tag: "thinking" },
  { date: "2026-03-19", hour: 14, duration: 3, task: "Social media batch", tag: "writing" },
  { date: "2026-03-18", hour: 9, duration: 2, task: "Email sequences", tag: "writing" },
  { date: "2026-03-18", hour: 11, duration: 3, task: "Partner call - LangChain", tag: "calls" },
  { date: "2026-03-17", hour: 10, duration: 4, task: "Website updates", tag: "code" },
  { date: "2026-03-17", hour: 15, duration: 2, task: "Metrics review", tag: "admin" },
  
  // Week of Mar 10-16, 2026
  { date: "2026-03-16", hour: 10, duration: 3, task: "Conference talk prep", tag: "design" },
  { date: "2026-03-16", hour: 14, duration: 2, task: "Conference talk", tag: "calls" },
  { date: "2026-03-15", hour: 9, duration: 4, task: "Deep work - strategy doc", tag: "thinking" },
  { date: "2026-03-14", hour: 10, duration: 3, task: "Tutorial video", tag: "design" },
  { date: "2026-03-14", hour: 14, duration: 2, task: "Customer onboarding", tag: "calls" },
  { date: "2026-03-13", hour: 9, duration: 2, task: "Weekly planning", tag: "admin" },
  { date: "2026-03-13", hour: 11, duration: 4, task: "Blog post - AI agents", tag: "writing" },
  { date: "2026-03-12", hour: 10, duration: 3, task: "Code review", tag: "code" },
  { date: "2026-03-12", hour: 14, duration: 2, task: "Team retrospective", tag: "calls" },
  { date: "2026-03-11", hour: 9, duration: 3, task: "Documentation audit", tag: "writing" },
  { date: "2026-03-11", hour: 13, duration: 3, task: "Feature spec", tag: "thinking" },
  { date: "2026-03-10", hour: 10, duration: 4, task: "Prototype sandbox UI", tag: "code" },
  { date: "2026-03-10", hour: 15, duration: 2, task: "User interviews", tag: "calls" },
]

type WorkLog = typeof workLogs[number]

// Helper to get week number and date range
function getWeekInfo(dateStr: string) {
  const date = new Date(dateStr)
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
  const weekNum = Math.ceil((days + startOfYear.getDay() + 1) / 7)
  
  // Get Monday of this week
  const dayOfWeek = date.getDay()
  const monday = new Date(date)
  monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  
  const formatShort = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  
  return {
    weekNum,
    weekKey: `${date.getFullYear()}-W${weekNum}`,
    label: `Week ${weekNum} · ${formatShort(monday)}–${formatShort(sunday)}`,
    monday,
    sunday,
  }
}

// Get day of week (0 = Monday, 6 = Sunday)
function getDayIndex(dateStr: string) {
  const date = new Date(dateStr)
  const day = date.getDay()
  return day === 0 ? 6 : day - 1
}

export default function ChangelogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [shake, setShake] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null)
  const [expandedDay, setExpandedDay] = useState<string | null>(null)

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

  // Process data into weeks
  const weeklyData = useMemo(() => {
    const weeks: Record<string, {
      info: ReturnType<typeof getWeekInfo>
      logs: WorkLog[]
      totalHours: number
      tasks: Set<string>
      daysWorked: boolean[]
      dailyLogs: Record<string, WorkLog[]>
    }> = {}

    workLogs.forEach(log => {
      const info = getWeekInfo(log.date)
      if (!weeks[info.weekKey]) {
        weeks[info.weekKey] = {
          info,
          logs: [],
          totalHours: 0,
          tasks: new Set(),
          daysWorked: [false, false, false, false, false, false, false],
          dailyLogs: {},
        }
      }
      weeks[info.weekKey].logs.push(log)
      weeks[info.weekKey].totalHours += log.duration
      weeks[info.weekKey].tasks.add(log.task)
      weeks[info.weekKey].daysWorked[getDayIndex(log.date)] = true
      
      if (!weeks[info.weekKey].dailyLogs[log.date]) {
        weeks[info.weekKey].dailyLogs[log.date] = []
      }
      weeks[info.weekKey].dailyLogs[log.date].push(log)
    })

    // Sort by week (newest first)
    return Object.values(weeks).sort((a, b) => b.info.weekNum - a.info.weekNum)
  }, [])

  // Stats for current week
  const currentWeekStats = useMemo(() => {
    if (weeklyData.length === 0) return null
    const week = weeklyData[0]
    const daysWorkedCount = week.daysWorked.filter(Boolean).length
    const avgHours = daysWorkedCount > 0 ? (week.totalHours / daysWorkedCount).toFixed(1) : '0'
    
    // Most common activity
    const taskCounts: Record<string, number> = {}
    week.logs.forEach(log => {
      taskCounts[log.tag] = (taskCounts[log.tag] || 0) + log.duration
    })
    const mostCommon = Object.entries(taskCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'none'
    
    return {
      totalHours: week.totalHours,
      avgHours,
      mostCommon,
    }
  }, [weeklyData])

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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Work Changelog</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">Private time tracking & weekly summaries</p>
        </header>

        {/* Stats bar */}
        {currentWeekStats && (
          <div className="flex gap-6 mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{currentWeekStats.totalHours}h</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">this week</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{currentWeekStats.avgHours}h</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">avg/day</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 capitalize">{currentWeekStats.mostCommon}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">top activity</p>
            </div>
          </div>
        )}

        {/* Weekly cards */}
        <div className="space-y-4">
          {weeklyData.map((week) => (
            <div 
              key={week.info.weekKey}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Week header */}
              <button
                onClick={() => setExpandedWeek(expandedWeek === week.info.weekKey ? null : week.info.weekKey)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-medium text-gray-900 dark:text-gray-100">{week.info.label}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{week.totalHours} hours</p>
                  </div>
                  <span className="text-gray-400 text-sm">{expandedWeek === week.info.weekKey ? '−' : '+'}</span>
                </div>
                
                {/* Task bullets */}
                <ul className="mb-3 space-y-1">
                  {Array.from(week.tasks).slice(0, 4).map((task) => (
                    <li key={task} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      {task}
                    </li>
                  ))}
                  {week.tasks.size > 4 && (
                    <li className="text-sm text-gray-400">+{week.tasks.size - 4} more</li>
                  )}
                </ul>
                
                {/* Day dots */}
                <div className="flex gap-1.5">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div 
                      key={i} 
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
                        week.daysWorked[i] 
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}
                      title={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </button>

              {/* Expanded daily breakdown */}
              {expandedWeek === week.info.weekKey && (
                <div className="border-t border-gray-100 dark:border-gray-700">
                  {Object.entries(week.dailyLogs)
                    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                    .map(([date, logs]) => {
                      const dayTotal = logs.reduce((sum, l) => sum + l.duration, 0)
                      const dateObj = new Date(date)
                      const dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                      const dayKey = `${week.info.weekKey}-${date}`
                      
                      return (
                        <div key={date} className="border-b border-gray-50 dark:border-gray-700/50 last:border-b-0">
                          <button
                            onClick={() => setExpandedDay(expandedDay === dayKey ? null : dayKey)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                          >
                            <span className="text-sm text-gray-700 dark:text-gray-300">{dayLabel}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">{dayTotal}h</span>
                              <span className="text-gray-400 text-xs">{expandedDay === dayKey ? '−' : '+'}</span>
                            </div>
                          </button>
                          
                          {/* Hourly breakdown */}
                          {expandedDay === dayKey && (
                            <div className="px-4 pb-3 space-y-1">
                              {logs
                                .sort((a, b) => a.hour - b.hour)
                                .map((log, i) => (
                                  <div 
                                    key={i}
                                    className={`flex items-center gap-3 px-3 py-1.5 rounded-lg ${TAG_COLORS[log.tag]?.bg || 'bg-gray-100'}`}
                                  >
                                    <span className={`w-2 h-2 rounded-full ${TAG_COLORS[log.tag]?.dot || 'bg-gray-400'}`} />
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono w-12">
                                      {log.hour.toString().padStart(2, '0')}:00
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{log.task}</span>
                                    <span className="text-xs text-gray-400">({log.duration}h)</span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
