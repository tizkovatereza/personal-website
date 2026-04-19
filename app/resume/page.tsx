"use client"

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, MapPin, Globe, Linkedin } from 'lucide-react'
import Link from 'next/link'

const experience = [
  {
    role: 'Founding Member — Growth & DevRel',
    company: 'E2B',
    location: 'San Francisco, CA',
    date: 'Jun 2023 – Present',
    bullets: [
      'First hire at AI infrastructure startup; led growth from pre-seed to Series A',
      'Built Awesome AI Agents repo (26K+ GitHub stars), co-taught DeepLearning.AI course with Andrew Ng',
      'Drove product launches, partnerships (Groq, Mistral, LangChain), developer community, and events',
    ],
  },
  {
    role: 'Management Consultant',
    company: 'McKinsey & Company',
    location: 'Prague',
    date: '2022 – 2023',
    bullets: [
      'Strategy consulting in energy, finance, and sustainable transition',
    ],
  },
  {
    role: 'President & Founder',
    company: 'IAESTE Czech Republic',
    location: '',
    date: '2020 – 2022',
    bullets: [
      'Founded local branch; organized international technical internships',
    ],
  },
]

const education = [
  {
    degree: 'MSc Mathematical Structures',
    school: 'Charles University — Faculty of Mathematics and Physics',
    years: '2019 – 2022',
  },
  {
    degree: 'Economics & Finance + Marketing Communications',
    school: 'Charles University — studied simultaneously',
    years: '2016 – 2019',
  },
]

const highlights = [
  'Co-taught "Building Coding Agents" course on DeepLearning.AI with Andrew Ng\'s team',
  'Built Awesome AI Agents — most popular open-source list of AI agents (26K+ stars)',
  'Organized AI hackathons in San Francisco and Prague with 1000+ attendees total',
  'Lecturer at Discover Academy teaching graduate-level math to high schoolers',
]

const audience = [
  { label: 'Newsletter', value: '40K+' },
  { label: 'Twitter', value: '7K+' },
  { label: 'LinkedIn', value: '8K+' },
  { label: 'GitHub', value: '26K+' },
]

const awards = [
  'AI Awards 2025 & Kristalova Lupa 2025 — E2B recognized for brand, content, and achievements (Czech Republic\'s most prestigious tech awards)',
  '4th Place, Rotman European Trading Challenge 2021 — Algorithmic trading competition',
  'DevRel Collective Member — Exclusive global community of 1,800+ developer relations professionals',
]

function ResumeContent() {
  const searchParams = useSearchParams()
  const isPrintMode = searchParams.get('print') === 'true'

  useEffect(() => {
    if (isPrintMode) {
      const timer = setTimeout(() => {
        window.print()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isPrintMode])

  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white">
      {/* Header bar - hidden when printing */}
      <div className="bg-[#0a0f1a] px-6 py-4 flex items-center justify-between print:hidden sticky top-0 z-10">
        <Link href="/" className="font-mono text-[12px] text-gray-400 hover:text-white transition-colors">
          ← Back
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </button>
      </div>

      {/* Resume - optimized for one page */}
      <div className="w-[8.5in] mx-auto bg-white px-[0.6in] py-[0.5in] print:px-[0.5in] print:py-[0.4in] print:w-full">
        {/* Header */}
        <header className="mb-4 print:mb-3">
          <h1 className="text-[22px] font-bold text-gray-900 mb-0.5">
            Tereza Tizkova
          </h1>
          <p className="text-[11px] text-gray-600 mb-2">
            Growth & DevRel leader. First hire at E2B (AI infrastructure, Series A). Background in math, consulting, and developer communities.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              San Francisco / Prague
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              tereza.tizkova@gmail.com
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              terezatizkova.com
            </span>
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              linkedin.com/in/tereza-tizkova
            </span>
          </div>
        </header>

        {/* Experience */}
        <section className="mb-3">
          <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">
            Experience
          </h2>
          <div className="space-y-2.5">
            {experience.map((job, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[11px] font-semibold text-gray-900">
                    {job.role} <span className="font-normal text-gray-600">at {job.company}</span>
                  </h3>
                  <span className="text-[9px] text-gray-500 whitespace-nowrap ml-2">{job.date}</span>
                </div>
                <ul className="mt-0.5 space-y-0">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="text-[10px] text-gray-700 pl-2.5 relative leading-relaxed">
                      <span className="absolute left-0 text-gray-400">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Two columns: Education + Highlights */}
        <div className="grid grid-cols-2 gap-6 mb-3">
          {/* Education */}
          <section>
            <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[10px] font-semibold text-gray-900">{edu.degree}</h3>
                    <span className="text-[9px] text-gray-500 ml-2">{edu.years}</span>
                  </div>
                  <p className="text-[9px] text-gray-600">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">
              Highlights
            </h2>
            <ul className="space-y-0.5">
              {highlights.map((item, i) => (
                <li key={i} className="text-[9px] text-gray-700 pl-2.5 relative leading-relaxed">
                  <span className="absolute left-0 text-gray-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Two columns: Audience + Awards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Audience - compact row */}
          <section>
            <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">
              Audience
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {audience.map((item, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="text-[12px] font-bold text-gray-900">{item.value}</span>
                  <span className="text-[8px] text-gray-500 uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Awards & Memberships */}
          <section>
            <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">
              Awards & Memberships
            </h2>
            <ul className="space-y-0.5">
              {awards.map((item, i) => (
                <li key={i} className="text-[9px] text-gray-700 pl-2.5 relative leading-relaxed">
                  <span className="absolute left-0 text-gray-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      </div>
  )
}

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ResumeContent />
    </Suspense>
  )
}
