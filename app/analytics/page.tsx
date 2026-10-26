'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, Globe, Calendar, Link2, FileText, TrendingUp, MapPin, Clock } from 'lucide-react'

interface AnalyticsData {
  totalViews: number
  todayViews: number
  viewsByPage: { path: string; views: number }[]
  last7Days: { date: string; views: number }[]
  viewsByCountry: { country: string; views: number }[]
  topReferrers: { referrer: string; views: number }[]
}

interface ArticleAnalytics {
  articles: {
    path: string
    total_views: number
    days_with_views: number
    first_view: string
    last_view: string
  }[]
  topReferrersAllArticles: { source: string; views: number }[]
  referrersByArticle: { path: string; source: string; views: number }[]
}

interface ArticleDetail {
  path: string
  totalViews: number
  viewsByDay: { date: string; views: number }[]
  referrers: { source: string; views: number }[]
  countries: { country: string; views: number }[]
  cities: { city: string; country: string; views: number }[]
  hourlyDistribution: { hour: number; views: number }[]
}

const articleTitles: Record<string, string> = {
  '/writing/software-abundance': 'Software is becoming marketing',
  '/writing/conference-booths': 'A guide to not wasting money on conference booths',
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [articleData, setArticleData] = useState<ArticleAnalytics | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'articles'>('articles')

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [generalRes, articlesRes] = await Promise.all([
          fetch('/api/analytics/stats'),
          fetch('/api/analytics/article')
        ])
        
        if (!generalRes.ok) throw new Error('Failed to fetch general analytics')
        if (!articlesRes.ok) throw new Error('Failed to fetch article analytics')
        
        const [generalData, articlesData] = await Promise.all([
          generalRes.json(),
          articlesRes.json()
        ])
        
        setData(generalData)
        setArticleData(articlesData)
      } catch (err) {
        setError('Failed to load analytics')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  useEffect(() => {
    if (selectedArticle) {
      const fetchArticleDetail = async () => {
        try {
          const res = await fetch(`/api/analytics/article?path=${encodeURIComponent(selectedArticle)}`)
          if (!res.ok) throw new Error('Failed to fetch article detail')
          const data = await res.json()
          setArticleDetail(data)
        } catch (err) {
          console.error(err)
        }
      }
      fetchArticleDetail()
    }
  }, [selectedArticle])

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

  // Group referrers by article for display
  const getReferrersForArticle = (path: string) => {
    if (!articleData) return []
    return articleData.referrersByArticle
      .filter(r => r.path === path)
      .sort((a, b) => Number(b.views) - Number(a.views))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl px-6 sm:px-12 md:px-16 lg:px-20 py-12 sm:py-16">
        {/* Back link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-mono uppercase text-[11px] font-light tracking-[0.05em]">Back</span>
        </Link>

        {/* Header */}
        <h1 className="font-serif font-normal text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
          Analytics
        </h1>
        <p className="text-secondary text-[14px] mb-8">
          Detailed traffic analysis for blog articles
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-card/90 backdrop-blur-sm border border-border p-1 w-fit">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 font-mono text-[11px] font-light uppercase tracking-[0.05em] transition-colors ${
              activeTab === 'articles' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-mono text-[11px] font-light uppercase tracking-[0.05em] transition-colors ${
              activeTab === 'overview' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
          </button>
        </div>

        {activeTab === 'articles' && (
          <>
            {/* Articles Traffic Sources */}
            <div className="mb-12">
              <h2 className="font-serif text-[24px] mb-6 flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                Article Traffic Sources
              </h2>
              
              {/* Overall referrer breakdown */}
              {articleData && articleData.topReferrersAllArticles.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-mono uppercase text-muted-foreground mb-4 text-[11px] font-light tracking-[0.05em]">
                    All Articles Combined
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {articleData.topReferrersAllArticles.map((ref) => (
                      <div key={ref.source} className="bg-card/90 backdrop-blur-sm border border-border p-4">
                        <div className="font-mono uppercase text-muted-foreground mb-1 text-[11px] font-light tracking-[0.05em]">
                          {ref.source}
                        </div>
                        <div className="font-serif text-[20px]">
                          {Number(ref.views).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Per-article breakdown */}
              <div className="space-y-6">
                {articleData?.articles.map((article) => {
                  const referrers = getReferrersForArticle(article.path)
                  const totalViews = Number(article.total_views)
                  const isExpanded = selectedArticle === article.path
                  
                  return (
                    <div key={article.path} className="bg-card/90 backdrop-blur-sm border border-border">
                      {/* Article header */}
                      <button
                        onClick={() => setSelectedArticle(isExpanded ? null : article.path)}
                        className="w-full p-6 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-[18px] mb-1 truncate">
                              {articleTitles[article.path] || article.path.split('/').pop()}
                            </h3>
                            <p className="font-mono text-[11px] text-secondary truncate">
                              {article.path}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-serif text-[24px]">{totalViews.toLocaleString()}</div>
                            <div className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">
                              total views
                            </div>
                          </div>
                        </div>
                        
                        {/* Referrer mini-bars */}
                        <div className="mt-4 flex gap-1 h-2">
                          {referrers.slice(0, 6).map((ref) => {
                            const width = Math.max((Number(ref.views) / totalViews) * 100, 5)
                            return (
                              <div
                                key={ref.source}
                                className="h-full bg-primary/60 hover:bg-primary transition-colors"
                                style={{ width: `${width}%` }}
                                title={`${ref.source}: ${ref.views} views`}
                              />
                            )
                          })}
                        </div>
                        
                        {/* Referrer labels */}
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                          {referrers.slice(0, 6).map((ref) => (
                            <span key={ref.source} className="font-mono text-[11px] text-muted-foreground font-light tracking-[0.05em] uppercase">
                              {ref.source}: {Number(ref.views).toLocaleString()}
                            </span>
                          ))}
                        </div>
                      </button>

                      {/* Expanded detail */}
                      {isExpanded && articleDetail && (
                        <div className="border-t border-border p-6 space-y-8">
                          {/* Stats row */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Eye className="h-3 w-3 text-primary" />
                                <span className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">Total Views</span>
                              </div>
                              <div className="font-serif text-[20px]">{Number(articleDetail.totalViews).toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="h-3 w-3 text-primary" />
                                <span className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">Days Active</span>
                              </div>
                              <div className="font-serif text-[20px]">{article.days_with_views}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Globe className="h-3 w-3 text-primary" />
                                <span className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">Countries</span>
                              </div>
                              <div className="font-serif text-[20px]">{articleDetail.countries.length}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Link2 className="h-3 w-3 text-primary" />
                                <span className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">Sources</span>
                              </div>
                              <div className="font-serif text-[20px]">{articleDetail.referrers.length}</div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Traffic Sources */}
                            <div>
                              <h4 className="font-mono uppercase text-muted-foreground mb-3 flex items-center gap-2 text-[11px] font-light tracking-[0.05em]">
                                <TrendingUp className="h-3 w-3" />
                                Traffic Sources
                              </h4>
                              <div className="space-y-2">
                                {articleDetail.referrers.map((ref) => {
                                  const pct = (Number(ref.views) / Number(articleDetail.totalViews)) * 100
                                  return (
                                    <div key={ref.source} className="flex items-center gap-3">
                                      <div className="w-24 font-mono text-[11px] truncate">{ref.source}</div>
                                      <div className="flex-1 h-4 bg-muted/30 overflow-hidden">
                                        <div 
                                          className="h-full bg-primary/70"
                                          style={{ width: `${pct}%` }}
                                        />
                                      </div>
                                      <div className="w-16 font-mono text-[11px] text-right text-muted-foreground">
                                        {Number(ref.views).toLocaleString()}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>

                            {/* Top Countries */}
                            <div>
                              <h4 className="font-mono uppercase text-muted-foreground mb-3 flex items-center gap-2 text-[11px] font-light tracking-[0.05em]">
                                <MapPin className="h-3 w-3" />
                                Top Countries
                              </h4>
                              <div className="space-y-2">
                                {articleDetail.countries.slice(0, 8).map((c) => {
                                  const pct = (Number(c.views) / Number(articleDetail.totalViews)) * 100
                                  return (
                                    <div key={c.country} className="flex items-center gap-3">
                                      <div className="w-24 font-mono text-[11px] truncate">{c.country}</div>
                                      <div className="flex-1 h-4 bg-muted/30 overflow-hidden">
                                        <div 
                                          className="h-full bg-secondary/70"
                                          style={{ width: `${pct}%` }}
                                        />
                                      </div>
                                      <div className="w-16 font-mono text-[11px] text-right text-muted-foreground">
                                        {Number(c.views).toLocaleString()}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Views over time */}
                          {articleDetail.viewsByDay.length > 0 && (
                            <div>
                              <h4 className="font-mono uppercase text-muted-foreground mb-3 flex items-center gap-2 text-[11px] font-light tracking-[0.05em]">
                                <Calendar className="h-3 w-3" />
                                Recent Activity
                              </h4>
                              <div className="flex items-end gap-1 h-16">
                                {articleDetail.viewsByDay.slice(0, 14).reverse().map((day) => {
                                  const maxViews = Math.max(...articleDetail.viewsByDay.map(d => Number(d.views)))
                                  const height = maxViews > 0 ? (Number(day.views) / maxViews) * 100 : 0
                                  return (
                                    <div 
                                      key={day.date}
                                      className="flex-1 bg-primary/50 hover:bg-primary transition-colors"
                                      style={{ height: `${Math.max(height, 5)}%` }}
                                      title={`${new Date(day.date).toLocaleDateString()}: ${day.views} views`}
                                    />
                                  )
                                })}
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="font-mono text-[11px] text-muted-foreground font-light tracking-[0.05em] uppercase">14 days ago</span>
                                <span className="font-mono text-[11px] text-muted-foreground font-light tracking-[0.05em] uppercase">Today</span>
                              </div>
                            </div>
                          )}

                          {/* Top Cities */}
                          {articleDetail.cities.length > 0 && (
                            <div>
                              <h4 className="font-mono uppercase text-muted-foreground mb-3 flex items-center gap-2 text-[11px] font-light tracking-[0.05em]">
                                <MapPin className="h-3 w-3" />
                                Top Cities
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {articleDetail.cities.slice(0, 10).map((c) => (
                                  <span 
                                    key={`${c.city}-${c.country}`}
                                    className="font-mono text-[11px] px-2 py-1 bg-muted/30 text-muted-foreground font-light tracking-[0.05em] uppercase"
                                  >
                                    {c.city}{c.country ? `, ${c.country}` : ''} ({c.views})
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Hourly distribution */}
                          {articleDetail.hourlyDistribution.length > 0 && (
                            <div>
                              <h4 className="font-mono uppercase text-muted-foreground mb-3 flex items-center gap-2 text-[11px] font-light tracking-[0.05em]">
                                <Clock className="h-3 w-3" />
                                Traffic by Hour (UTC)
                              </h4>
                              <div className="flex items-end gap-[2px] h-12">
                                {Array.from({ length: 24 }, (_, hour) => {
                                  const hourData = articleDetail.hourlyDistribution.find(h => Number(h.hour) === hour)
                                  const views = hourData ? Number(hourData.views) : 0
                                  const maxViews = Math.max(...articleDetail.hourlyDistribution.map(h => Number(h.views)))
                                  const height = maxViews > 0 ? (views / maxViews) * 100 : 0
                                  return (
                                    <div 
                                      key={hour}
                                      className="flex-1 bg-muted/50 hover:bg-primary/50 transition-colors"
                                      style={{ height: `${Math.max(height, 5)}%` }}
                                      title={`${hour}:00 UTC: ${views} views`}
                                    />
                                  )
                                })}
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="font-mono text-[11px] text-muted-foreground font-light tracking-[0.05em] uppercase">0:00</span>
                                <span className="font-mono text-[11px] text-muted-foreground font-light tracking-[0.05em] uppercase">12:00</span>
                                <span className="font-mono text-[11px] text-muted-foreground font-light tracking-[0.05em] uppercase">23:00</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}

                {(!articleData || articleData.articles.length === 0) && (
                  <div className="bg-card/90 backdrop-blur-sm border border-border p-8 text-center">
                    <p className="text-secondary">No article views tracked yet</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-card/90 backdrop-blur-sm border border-border p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">Total Views</span>
                </div>
                <div className="font-serif text-[28px]">{Number(data.totalViews).toLocaleString()}</div>
              </div>
              
              <div className="bg-card/90 backdrop-blur-sm border border-border p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">Today</span>
                </div>
                <div className="font-serif text-[28px]">{Number(data.todayViews).toLocaleString()}</div>
              </div>

              <div className="bg-card/90 backdrop-blur-sm border border-border p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">Countries</span>
                </div>
                <div className="font-serif text-[28px]">{data.viewsByCountry.length}</div>
              </div>

              <div className="bg-card/90 backdrop-blur-sm border border-border p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  <span className="font-mono uppercase text-muted-foreground text-[11px] font-light tracking-[0.05em]">Referrers</span>
                </div>
                <div className="font-serif text-[28px]">{data.topReferrers.length}</div>
              </div>
            </div>

            {/* Views by Page */}
            <div className="mb-12">
              <h2 className="font-serif text-[20px] mb-6">Views by Page</h2>
              <div className="bg-card/90 backdrop-blur-sm border border-border">
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
              <div className="bg-card/90 backdrop-blur-sm border border-border">
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
                <div className="bg-card/90 backdrop-blur-sm border border-border">
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
                <div className="bg-card/90 backdrop-blur-sm border border-border">
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
          </>
        )}
      </div>
    </div>
  )
}
