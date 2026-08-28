"use client"

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, MapPin, Globe, Linkedin } from 'lucide-react'
import Link from 'next/link'

const experience = [
  {
    role: 'Growth',
    company: 'Factory',
    location: 'San Francisco, CA',
    date: '2026 – Present',
    bullets: [
      'Own key growth metrics: new sign-ups and newly activated users',
      'Lead initiatives that improve SEO and AI SEO strategy, driving double-digit % growth in organic traffic',
      'Scale paid ads across channels',
      'Run a global OOH campaign (billboards and ads)',
      'Build the influencer and creator network',
      'Grow and nurture the developer community',
      'Drive earned media & public relations strategy',
      'Design onboarding, user feedback, and activation flows',
      'Own email campaign strategy and execution',
      'Set social media strategy',
      'Shape brand and positioning',
    ],
  },
  {
    role: 'Founding Member — Growth & DevRel',
    company: 'E2B',
    location: 'San Francisco, CA',
    date: 'Jun 2023 – 2026',
    bullets: [
      'First hire; owned growth end-to-end from pre-seed through Series A',
      'Grew the developer audience to 40K+ newsletter subscribers and 31K+ GitHub stars (Awesome AI Agents)',
      'Co-taught a DeepLearning.AI course with Andrew Ng',
      'Led product launches and launch campaigns',
      'Built co-marketing partnerships (Groq, Mistral, LangChain)',
      'Ran developer community and events (1000+ hackathon attendees)',
      'Owned content strategy across blog, docs, and social',
      'Established brand and positioning for the developer audience',
    ],
  },
  {
    role: 'Management Consultant',
    company: 'McKinsey & Company',
    location: 'Prague',
    date: '2022 – 2023',
    bullets: [
      'Due diligence and sustainable energy transformation engagements',
      'Optimizing operations, strategy, and growth for clients',
      'Led two recruiting initiatives within the Prague office',
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
  'Keynote speaker at AI Engineer, San Francisco 2026',
  'Co-taught "Building Coding Agents" course on DeepLearning.AI with Andrew Ng\'s team',
  'Built Awesome AI Agents — most popular open-source list of AI agents (31K+ stars)',
  'Organized AI hackathons in San Francisco and Prague with 1000+ attendees total',
  'Lecturer at Discover Academy teaching graduate-level math to high schoolers',
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
      <div className="bg-background px-6 py-4 flex items-center justify-between print:hidden sticky top-0 z-10">
        <Link href="/" className="font-mono text-[12px] text-gray-400 hover:text-white transition-colors">
          ← Back
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 text-[12px] font-mono font-light tracking-wide text-gray-300 border border-white/20 hover:border-white/40 hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
            Growth leader for developer products. Currently growth at Factory; first hire at E2B, where I owned marketing, growth, startup programs, and developer relations from zero to Series A+. Math degree, ex-McKinsey.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              San Francisco
            </span>
            <a href="mailto:tereza.tizkova@gmail.com" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Mail className="w-3 h-3" />
              tereza.tizkova@gmail.com
            </a>
            <a href="https://terezatizkova.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Globe className="w-3 h-3" />
              terezatizkova.com <span className="text-gray-400">· 5K readers/mo</span>
            </a>
            <a href="https://linkedin.com/in/tereza-tizkova" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Linkedin className="w-3 h-3" />
              linkedin.com/in/tereza-tizkova <span className="text-gray-400">· 10K</span>
            </a>
            <a href="https://x.com/tereza_tizkova" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
              x.com/tereza_tizkova <span className="text-gray-400">· 9K</span>
            </a>
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

        {/* Education */}
        <section className="mb-3">
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

        {/* Achievements */}
        <section>
          <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">
            Achievements
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5">
            {highlights.map((item, i) => (
              <li key={i} className="text-[9px] text-gray-700 pl-2.5 relative leading-relaxed">
                <span className="absolute left-0 text-gray-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
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
