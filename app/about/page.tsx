import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { RotatingProfilePhoto } from '@/components/rotating-profile-photo'

export const metadata: Metadata = {
  title: 'About | Tereza Tizkova',
  description: 'About Tereza Tizkova - Founding team member at E2B, leading marketing and growth',
}

const e2bAchievements = [
  'Built and maintain Awesome AI Agents — the most popular open-source list of AI agents (26K+ GitHub stars)',
  'Co-created and taught "Building Coding Agents with Tool Execution" course on DeepLearning.AI with Andrew Ng\'s team',
  'Organized multiple AI hackathons including the first E2B hackathon in Prague (50+ hackers) and Code Interpreting hackathons in SF with partners like Fireworks AI',
  'Grew E2B from pre-seed to Series A — shaped product positioning, ran partnerships with Groq, Mistral, LangChain, managed launches, billboard campaigns, and got E2B into AWS Marketplace',
  'Built developer community across X, LinkedIn, Discord, and newsletter. Organized offline events in San Francisco and Prague (100-200 attendees). Ran workshops and ambassador programs',
]

const jobs = [
  {
    role: 'Founding Member',
    company: 'E2B',
    location: 'San Francisco',
    date: 'Jun 2023 – Present',
    description: 'First hire at an AI infrastructure startup. Leading marketing and growth activities. Built content, developer relations, and community from zero.',
    achievements: e2bAchievements,
  },
  {
    role: 'Management Consultant',
    company: 'McKinsey & Company',
    location: 'Prague',
    date: '2022 – 2023',
    description: 'Strategy and operations consulting. Worked on AI in early-stage pharma R&D and drug discovery.',
  },
  {
    role: 'President & Founder',
    company: 'IAESTE Czech Republic (local branch)',
    location: '',
    date: '~2020 – 2022',
    description: 'Founded a local IAESTE branch during COVID. Organized international student technical internships.',
  },
]

const education = [
  {
    degree: 'MSc Mathematical Structures',
    school: 'Charles University, Prague',
    description: 'Faculty of Mathematics and Physics.',
  },
  {
    degree: 'Economics & Finance + Marketing Communications & PR',
    school: 'Charles University, Prague',
    description: 'Studied simultaneously at Institute of Economic Studies and Faculty of Social Sciences.',
  },
]

const talks = [
  {
    title: 'Building Coding Agents with Tool Execution',
    platform: 'DeepLearning.AI',
    description: "Co-taught a course on building agents that write and execute code, on Andrew Ng's platform.",
    link: 'https://learn.deeplearning.ai/courses/building-coding-agents-with-tool-execution',
  },
  {
    title: 'Creating Safe Playgrounds for AI Agents',
    platform: 'Building with AI Podcast',
    description: 'On the journey from McKinsey to E2B and how sandboxed code execution works.',
    link: 'https://buildingwith.ai/episode/creating-safe-playgrounds-for-ai-agents-tereza-tizkova-founding-member-head-of-growth-at-e2b',
  },
  {
    title: 'Running AI Generated Code',
    platform: 'Agents at Work Podcast (Ep. 11)',
    description: 'On challenges around executing AI-generated code safely and efficiently.',
    link: 'https://podcasts.apple.com/us/podcast/agents-at-work-11-running-ai-generated-code-w-tereza-from-e2b/id1799165303?i=1000704023233',
  },
  {
    title: 'Giving LLMs Their Own Computers',
    platform: 'AI Tinkerers Prague',
    description: "Talk on E2B's open-source runtime that gives LLMs sandboxed cloud computers.",
    link: 'https://prague.aitinkerers.org/talks/rsvp_SynbeA_no1s',
  },
  {
    title: 'Budoucnost nepráce #8',
    platform: 'Czech podcast (Future of Work)',
    description: 'On building secure sandbox environments for AI agents and startup life in Silicon Valley.',
    link: 'https://www.aidatabaze.cz/podcast-budoucnost-neprace-8-tereza-tizkova-v-silicon-valley-se-neresi-jestli-to-pujde-ale-jak-to-udelat-10x-vetsi/',
  },
  {
    title: 'Data Talk #107',
    platform: 'Data Talk Podcast (Czech)',
    description: 'On AI agents, open-source startups, and building from San Francisco.',
    link: 'https://open.spotify.com/episode/2iT3fLa7s4A3bmTrbQO3fq',
  },
  {
    title: 'Days of AI Prague',
    platform: 'Panel Discussion',
    description: 'Panel on AI and developer tools at the Days of AI conference in Prague.',
    link: 'https://www.youtube.com/watch?v=NKrbCbjLyqA',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-8">
            About
          </h1>
          
          {/* Profile Photo - hover to see random photos */}
          <div className="mb-10">
            <RotatingProfilePhoto />
          </div>
          
          {/* Intro paragraph */}
          <p className="font-light text-[15px] sm:text-[17px] text-secondary leading-[1.8] max-w-2xl">
            I'm Tereza — founding team member at{' '}
            <a href="https://e2b.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">E2B</a>, 
            leading marketing and growth activities since day one. Originally from Prague, now based in San Francisco 
            as an O-1 visa holder. I studied mathematics at Charles University and somehow ended up 
            in AI infrastructure. I do a lot of writing, talks, courses, and developer content that has helped define a new market category around AI sandboxes. I love to learn from others, and try to fail at something new occasionally.
          </p>
        </header>

        {/* Section divider */}
        <div className="h-px w-full bg-border mb-16" />

        {/* Experience Section */}
        <section className="mb-20">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-10">Experience</h2>
          
          <div className="relative pl-6 sm:pl-8 border-l border-border">
            {jobs.map((job, index) => (
              <div key={index} className="relative pb-10 last:pb-0">
                {/* Node */}
                <div className="absolute left-0 -translate-x-[calc(50%+0.5px)] w-2 h-2 bg-primary rounded-full" />
                
                {/* Content */}
                <div className="pl-6 sm:pl-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">{job.date}</span>
                    {job.location && (
                      <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">{job.location}</span>
                    )}
                  </div>
                  <h3 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] mb-1">
                    <span className="font-semibold">{job.role}</span>
                    <span className="text-secondary"> — {job.company}</span>
                  </h3>
                  <p className="text-[13px] sm:text-[14px] font-light text-secondary leading-relaxed">{job.description}</p>
                  {job.achievements && (
                    <ul className="mt-4 space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3 text-[13px] sm:text-[14px] font-light text-secondary leading-relaxed">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-border mb-16" />

        {/* Education Section */}
        <section className="mb-20">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-10">Education</h2>
          
          <div className="relative pl-6 sm:pl-8 border-l border-border">
            {education.map((edu, index) => (
              <div key={index} className="relative pb-8 last:pb-0">
                {/* Node */}
                <div className="absolute left-0 -translate-x-[calc(50%+0.5px)] w-2 h-2 bg-primary rounded-full" />
                
                {/* Content */}
                <div className="pl-6 sm:pl-8">
                  <h3 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] mb-1">
                    <span className="font-semibold">{edu.degree}</span>
                    {edu.school && <span className="text-secondary"> — {edu.school}</span>}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] font-light text-muted-foreground">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-border mb-16" />

        {/* Talks & Podcasts Section */}
        <section id="talks" className="mb-20 scroll-mt-8">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-10">Talks & Podcasts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {talks.map((talk, index) => (
              talk.link ? (
                <a
                  key={index}
                  href={talk.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-card/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)] hover:border-primary/30 transition-all duration-300"
                >
                  {/* Platform with diamond */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                    <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">
                      {talk.platform}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif text-[17px] sm:text-[18px] tracking-[-0.01em] group-hover:text-primary transition-colors">
                      {talk.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Description */}
                  <p className="font-light text-[13px] text-secondary leading-relaxed">
                    {talk.description}
                  </p>
                </a>
              ) : (
                <div
                  key={index}
                  className="p-6 bg-card/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)]"
                >
                  {/* Platform with diamond */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                    <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">
                      {talk.platform}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-serif text-[17px] sm:text-[18px] tracking-[-0.01em] mb-2">
                    {talk.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-light text-[13px] text-secondary leading-relaxed">
                    {talk.description}
                  </p>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-border mb-16" />

        {/* CTA */}
        <section className="p-8 sm:p-10 bg-card/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)]">
          <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.02em] mb-4">Get in touch</h2>
          <p className="font-light text-[14px] sm:text-[15px] text-secondary leading-relaxed mb-8 max-w-lg">
            I love meeting new people. Whether you want to collaborate, 
            ask questions, or just say hi — my inbox is open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:tereza.tizkova@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:bg-primary/90 transition-colors"
            >
              Send email
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/work-with-me"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:border-primary hover:text-primary transition-colors"
            >
              Work with me
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
