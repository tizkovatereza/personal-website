"use client"

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

const experience = [
  {
    role: 'Founding Member',
    company: 'E2B',
    location: 'San Francisco, CA',
    date: 'Jun 2023 – Present',
    bullets: [
      'First hire at an AI infrastructure startup building open-source cloud sandboxes for AI agents',
      'Responsible for product launches, campaigns, events (online & offline), growth hacks, merch, content and social media strategy, blog, positioning & branding, developer relations, partner program (startup program, YC deal)',
      'Created demo videos, technical webinars, and educational content for developers',
      'Built and maintain Awesome AI Agents — the most popular open-source list of AI agents (26K+ GitHub stars)',
      'Co-created and taught "Building Coding Agents with Tool Execution" course on DeepLearning.AI with Andrew Ng\'s team',
      'Grew E2B from pre-seed to Series A — shaped product positioning, partnerships (Groq, Mistral, LangChain), launches, billboard campaigns',
      'Organized multiple hackathons and meetups in SF and Prague with thousands of attendees in total',
      'Built developer community across X, LinkedIn, Discord, newsletter',
    ],
  },
  {
    role: 'Management Consultant',
    company: 'McKinsey & Company',
    location: 'Prague, Czech Republic',
    date: '2022 – 2023',
    bullets: [
      'Strategy and operations consulting in energy, sustainable transition, banking and finance sectors',
      'Member of the startup club; contributed to partnerships and hiring initiatives',
    ],
  },
  {
    role: 'President & Founder',
    company: 'IAESTE Czech Republic (local branch)',
    location: '',
    date: '~2020 – 2022',
    bullets: [
      'Founded local branch during COVID',
      'Organized international student technical internships',
    ],
  },
]

const education = [
  {
    degree: 'MSc Mathematical Structures',
    school: 'Charles University, Prague',
    detail: 'Faculty of Mathematics and Physics',
    years: '2020 – 2022',
  },
  {
    degree: 'Double Undergraduate Degree (studied simultaneously)',
    school: '',
    detail: '',
    years: '2016 – 2020',
    sub: [
      { degree: 'Economics & Finance', school: 'Charles University — Institute of Economic Studies' },
      { degree: 'Marketing Communications & PR', school: 'University of Finance and Administration' },
    ],
  },
]

const projects = [
  { name: 'DeepLearning.AI Course', desc: 'Co-created coding agents course reaching thousands of learners' },
  { name: 'Awesome AI Agents', desc: 'Open-source repo, 26K+ GitHub stars' },
  { name: 'Developer Events', desc: 'Hackathons and meetups in SF and Prague, thousands of attendees' },
  { name: 'Discover Academy', desc: 'Lecturer teaching graduate-level math to high school students' },
]

const talks = [
  'DeepLearning.AI: "Building Coding Agents with Tool Execution"',
  'Building with AI Podcast: "Creating Safe Playgrounds for AI Agents"',
  'Agents at Work Podcast: "Running AI Generated Code"',
  'AI Tinkerers Prague: "Giving LLMs Their Own Computers"',
  'Days of AI Prague: Panel on AI and developer tools',
]

const audience = [
  { label: 'Newsletter', value: '40K+' },
  { label: 'X/Twitter', value: '7K+' },
  { label: 'LinkedIn', value: '8K+' },
  { label: 'GitHub Stars', value: '26K+' },
]

function ResumeContent() {
  const searchParams = useSearchParams()
  const isPrintMode = searchParams.get('print') === 'true'

  useEffect(() => {
    if (isPrintMode) {
      // Auto-trigger print after page loads
      const timer = setTimeout(() => {
        window.print()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isPrintMode])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header bar with buttons - hidden when printing */}
      <div className="bg-[#0a0f1a] px-6 py-4 flex items-center justify-between print:hidden">
        <Link href="/" className="font-mono text-[12px] text-gray-400 hover:text-white transition-colors">
          ← Back
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 text-[13px] font-mono font-light text-blue-400 border border-blue-400/30 hover:bg-blue-400/10 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Save as PDF
        </button>
      </div>

      {/* Resume content - white background */}
      <div className="px-8 py-10 max-w-[850px] mx-auto print:px-12 print:py-8 print:max-w-none">
        {/* Header */}
        <header className="mb-6 print:mb-4">
          <h1 className="text-[28px] font-bold text-gray-900 mb-1 print:text-[24px]">
            Tereza Tizkova
          </h1>
          <p className="text-[12px] text-gray-600 mb-2 print:text-[10px]">
            Growth leader & founding team member building AI infrastructure. Background in math, consulting, and developer communities.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500 print:text-[9px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              San Francisco / Prague
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              tereza.tizkova@gmail.com
            </span>
            <span>terezatizkova.com</span>
            <span>linkedin.com/in/tereza-tizkova</span>
          </div>
        </header>

        {/* Experience */}
        <section className="mb-5 print:mb-4">
          <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 print:text-[9px] print:mb-2">
            Experience
          </h2>
          <div className="space-y-4 print:space-y-3">
            {experience.map((job, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[13px] font-semibold text-gray-900 print:text-[11px]">
                    {job.role} — {job.company}
                  </h3>
                  <span className="text-[10px] text-gray-500 print:text-[9px]">{job.date}</span>
                </div>
                {job.location && (
                  <p className="text-[10px] text-gray-500 mb-1 print:text-[9px]">{job.location}</p>
                )}
                <ul className="space-y-0.5">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="text-[11px] text-gray-700 pl-3 relative print:text-[9px]">
                      <span className="absolute left-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-5 print:mb-4">
          <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 print:text-[9px] print:mb-2">
            Education
          </h2>
          <div className="space-y-2 print:space-y-1">
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[12px] font-semibold text-gray-900 print:text-[10px]">
                    {edu.degree}
                  </h3>
                  {edu.years && <span className="text-[10px] text-gray-500 print:text-[9px]">{edu.years}</span>}
                </div>
                {edu.school && (
                  <p className="text-[11px] text-gray-600 print:text-[9px]">
                    {edu.school}{edu.detail && ` — ${edu.detail}`}
                  </p>
                )}
                {edu.sub && (
                  <div className="pl-3 mt-1 space-y-0.5">
                    {edu.sub.map((s, j) => (
                      <div key={j} className="text-[11px] text-gray-600 print:text-[9px]">
                        <span className="font-medium">{s.degree}</span> — {s.school}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Two Column: Projects & Talks */}
        <div className="grid grid-cols-2 gap-6 mb-5 print:gap-4 print:mb-4">
          {/* Projects */}
          <section>
            <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 print:text-[9px]">
              Notable Projects
            </h2>
            <ul className="space-y-1">
              {projects.map((project, i) => (
                <li key={i} className="text-[10px] print:text-[9px]">
                  <span className="font-medium text-gray-900">{project.name}</span>
                  <span className="text-gray-600"> — {project.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Talks */}
          <section>
            <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 print:text-[9px]">
              Talks & Podcasts
            </h2>
            <ul className="space-y-0.5">
              {talks.map((talk, i) => (
                <li key={i} className="text-[10px] text-gray-600 print:text-[9px]">
                  {talk}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Audience */}
        <section>
          <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 print:text-[9px]">
            Audience & Reach
          </h2>
          <div className="flex gap-8 print:gap-6">
            {audience.map((item, i) => (
              <div key={i}>
                <div className="text-[16px] font-bold text-gray-900 print:text-[12px]">{item.value}</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-wider print:text-[8px]">{item.label}</div>
              </div>
            ))}
          </div>
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
