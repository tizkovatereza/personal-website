'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, Globe, Calendar, Link2 } from 'lucide-react'

interface AnalyticsData {
  totalViews: number
  todayViews: number
  viewsByPage: { path: string; views: number }[]
  last7Days: { date: string; views: number }[]
  viewsByCountry: { country: string; views: number }[]
  topReferrers: { referrer: string; views: number }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics/stats')
        if (!response.ok) throw new Error('Failed to fetch analytics')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError('Failed to load analytics')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">{error || 'Failed to load'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {/* Back link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-mono text-[11px] uppercase tracking-wider">Back</span>
        </Link>

        {/* Header */}
        <h1 className="font-serif text-[32px] sm:text-[40px] tracking-[-0.02em] mb-2">
          Analytics
        </h1>
        <p className="text-muted-foreground text-[14px] mb-12">
          Page views and visitor statistics
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Total Views</span>
            </div>
            <div className="font-serif text-[28px]">{Number(data.totalViews).toLocaleString()}</div>
          </div>
          
          <div className="bg-card border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Today</span>
            </div>
            <div className="font-serif text-[28px]">{Number(data.todayViews).toLocaleString()}</div>
          </div>

          <div className="bg-card border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Countries</span>
            </div>
            <div className="font-serif text-[28px]">{data.viewsByCountry.length}</div>
          </div>

          <div className="bg-card border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="h-4 w-4 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Referrers</span>
            </div>
            <div className="font-serif text-[28px]">{data.topReferrers.length}</div>
          </div>
        </div>

        {/* Views by Page */}
        <div className="mb-12">
          <h2 className="font-serif text-[20px] mb-6">Views by Page</h2>
          <div className="bg-card border border-border">
            {data.viewsByPage.length === 0 ? (
              <div className="p-6 text-muted-foreground text-[14px]">No page views yet</div>
            ) : (
              data.viewsByPage.map((page, index) => (
                <div 
                  key={page.path}
                  className={`flex items-center justify-between p-4 ${
                    index !== data.viewsByPage.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="font-mono text-[13px] text-foreground truncate max-w-[70%]">
                    {page.path}
                  </span>
                  <span className="font-mono text-[13px] text-muted-foreground">
                    {Number(page.views).toLocaleString()} views
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Last 7 Days */}
        <div className="mb-12">
          <h2 className="font-serif text-[20px] mb-6">Last 7 Days</h2>
          <div className="bg-card border border-border">
            {data.last7Days.length === 0 ? (
              <div className="p-6 text-muted-foreground text-[14px]">No data yet</div>
            ) : (
              data.last7Days.map((day, index) => (
                <div 
                  key={day.date}
                  className={`flex items-center justify-between p-4 ${
                    index !== data.last7Days.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="font-mono text-[13px] text-foreground">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="font-mono text-[13px] text-muted-foreground">
                    {Number(day.views).toLocaleString()} views
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Countries */}
          <div>
            <h2 className="font-serif text-[20px] mb-6">Top Countries</h2>
            <div className="bg-card border border-border">
              {data.viewsByCountry.length === 0 ? (
                <div className="p-6 text-muted-foreground text-[14px]">No data yet</div>
              ) : (
                data.viewsByCountry.map((country, index) => (
                  <div 
                    key={country.country}
                    className={`flex items-center justify-between p-4 ${
                      index !== data.viewsByCountry.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <span className="font-mono text-[13px] text-foreground">
                      {country.country}
                    </span>
                    <span className="font-mono text-[13px] text-muted-foreground">
                      {Number(country.views).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Referrers */}
          <div>
            <h2 className="font-serif text-[20px] mb-6">Top Referrers</h2>
            <div className="bg-card border border-border">
              {data.topReferrers.length === 0 ? (
                <div className="p-6 text-muted-foreground text-[14px]">No referrers yet</div>
              ) : (
                data.topReferrers.map((ref, index) => (
                  <div 
                    key={ref.referrer}
                    className={`flex items-center justify-between p-4 ${
                      index !== data.topReferrers.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <span className="font-mono text-[13px] text-foreground truncate max-w-[70%]">
                      {ref.referrer}
                    </span>
                    <span className="font-mono text-[13px] text-muted-foreground">
                      {Number(ref.views).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
