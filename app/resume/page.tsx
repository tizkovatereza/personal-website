import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { ResumeDownloadButton } from '@/components/resume-download-button'

export const metadata: Metadata = {
  title: 'Resume | Tereza Tizkova',
  description: 'Resume of Tereza Tizkova - Growth leader and founding team member at E2B',
}

const experience = [
  {
    role: 'Founding Member',
    company: 'E2B',
    location: 'San Francisco, CA',
    date: 'Jun 2023 – Present',
    bullets: [
      'First hire at an AI infrastructure startup building open-source cloud sandboxes for AI agents',
      'Built and maintain Awesome AI Agents — the most popular open-source list of AI agents (26K+ GitHub stars)',
      'Co-created and taught "Building Coding Agents with Tool Execution" course on DeepLearning.AI with Andrew Ng\'s team',
      'Grew E2B from pre-seed to Series A — shaped product positioning, partnerships (Groq, Mistral, LangChain), launches, billboard campaigns, AWS Marketplace',
      'Organized AI hackathons in SF and Prague (50-200 attendees), built developer community across X, LinkedIn, Discord, newsletter',
    ],
  },
  {
    role: 'Management Consultant',
    company: 'McKinsey & Company',
    location: 'Prague, Czech Republic',
    date: '2022 – 2023',
    bullets: [
      'Strategy and operations consulting',
      'Worked on AI in early-stage pharma R&D and drug discovery',
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
  },
  {
    degree: 'Economics & Finance',
    school: 'Charles University, Prague',
    detail: 'Institute of Economic Studies',
  },
  {
    degree: 'Marketing Communications & PR',
    school: 'Undergraduate studies',
    detail: '',
  },
]

const projects = [
  { name: 'DeepLearning.AI Course', desc: 'Co-created AI course reaching thousands of learners worldwide' },
  { name: 'Awesome AI Agents', desc: 'Open-source repo, 26K+ GitHub stars' },
  { name: 'Developer Events', desc: 'Organized hackathons in SF, Prague, and online; first AI hackathon in Czech Republic' },
  { name: 'Discover Academy', desc: 'Lecturer teaching graduate-level math to talented high school students' },
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

const links = [
  { label: 'terezatizkova.com', href: 'https://terezatizkova.com' },
  { label: 'x.com/tereza_tizkova', href: 'https://x.com/tereza_tizkova' },
  { label: 'linkedin.com/in/tereza-tizkova', href: 'https://www.linkedin.com/in/tereza-tizkova-568439174/' },
  { label: 'github.com/tizkovatereza', href: 'https://github.com/tizkovatereza' },
]

export default function ResumePage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20 px-6 sm:px-8 md:px-12 max-w-4xl mx-auto print:py-8 print:px-4 print:max-w-none">
      {/* Print/Download Button */}
      <div className="flex justify-end mb-8 print:hidden">
        <ResumeDownloadButton />
      </div>

      {/* Header */}
      <header className="mb-10 print:mb-6">
        <h1 className="font-serif text-[36px] sm:text-[44px] tracking-[-0.02em] text-foreground mb-3 print:text-[28px]">
          Tereza Tizkova
        </h1>
        <p className="font-light text-[14px] sm:text-[15px] text-secondary leading-relaxed max-w-2xl mb-4 print:text-[11px]">
          Growth leader & founding team member building AI infrastructure. Background in math, consulting, and developer communities.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] sm:text-[13px] font-light text-muted-foreground print:text-[10px]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            San Francisco / Prague / Berlin
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            tereza.tizkova@gmail.com
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] sm:text-[12px] font-mono text-primary print:text-[9px]">
          {links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline print:no-underline">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      {/* Experience */}
      <section className="mb-10 print:mb-6">
        <h2 className="font-mono text-[11px] font-light text-primary tracking-[0.1em] uppercase mb-4 print:text-[9px] print:mb-2">
          Experience
        </h2>
        <div className="space-y-6 print:space-y-4">
          {experience.map((job, i) => (
            <div key={i} className="border-l border-[rgba(255,255,255,0.08)] pl-4 print:border-gray-300 print:pl-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2 print:flex-row print:mb-1">
                <h3 className="font-serif text-[16px] sm:text-[17px] tracking-[-0.01em] print:text-[12px]">
                  {job.role} — <span className="text-primary">{job.company}</span>
                </h3>
                <span className="font-mono text-[11px] text-muted-foreground print:text-[9px]">{job.date}</span>
              </div>
              {job.location && (
                <p className="font-light text-[12px] text-muted-foreground mb-2 print:text-[9px] print:mb-1">{job.location}</p>
              )}
              <ul className="space-y-1 print:space-y-0.5">
                {job.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-[13px] font-light text-secondary print:text-[10px]">
                    <span className="text-primary mt-1.5 print:mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-10 print:mb-6">
        <h2 className="font-mono text-[11px] font-light text-primary tracking-[0.1em] uppercase mb-4 print:text-[9px] print:mb-2">
          Education
        </h2>
        <div className="space-y-3 print:space-y-2">
          {education.map((edu, i) => (
            <div key={i} className="border-l border-[rgba(255,255,255,0.08)] pl-4 print:border-gray-300 print:pl-3">
              <h3 className="font-serif text-[15px] sm:text-[16px] tracking-[-0.01em] print:text-[11px]">
                {edu.degree}
              </h3>
              <p className="font-light text-[13px] text-muted-foreground print:text-[10px]">
                {edu.school}{edu.detail && ` — ${edu.detail}`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column: Projects & Talks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 print:gap-4 print:mb-6">
        {/* Projects */}
        <section>
          <h2 className="font-mono text-[11px] font-light text-primary tracking-[0.1em] uppercase mb-4 print:text-[9px] print:mb-2">
            Notable Projects
          </h2>
          <ul className="space-y-2 print:space-y-1">
            {projects.map((project, i) => (
              <li key={i} className="text-[13px] font-light print:text-[10px]">
                <span className="text-foreground">{project.name}</span>
                <span className="text-muted-foreground"> — {project.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Talks */}
        <section>
          <h2 className="font-mono text-[11px] font-light text-primary tracking-[0.1em] uppercase mb-4 print:text-[9px] print:mb-2">
            Talks & Podcasts
          </h2>
          <ul className="space-y-1.5 print:space-y-1">
            {talks.map((talk, i) => (
              <li key={i} className="text-[12px] sm:text-[13px] font-light text-secondary print:text-[9px]">
                {talk}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Audience */}
      <section className="mb-10 print:mb-6">
        <h2 className="font-mono text-[11px] font-light text-primary tracking-[0.1em] uppercase mb-4 print:text-[9px] print:mb-2">
          Audience & Reach
        </h2>
        <div className="flex flex-wrap gap-6 print:gap-4">
          {audience.map((item, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-[20px] sm:text-[24px] text-foreground print:text-[14px]">{item.value}</div>
              <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider print:text-[8px]">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="print:hidden pt-8 border-t border-[rgba(255,255,255,0.06)]">
        <Link href="/" className="font-mono text-[12px] text-muted-foreground hover:text-primary transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
