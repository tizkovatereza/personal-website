import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume | Tereza Tizkova',
  description: 'Professional experience and background of Tereza Tizkova',
}

const experience = [
  {
    period: '2021 — Present',
    title: 'Growth & Developer Relations Lead',
    company: 'E2B',
    companyUrl: 'https://e2b.dev',
    location: 'San Francisco / Prague',
    description: 'Founding team member. Built and led growth and developer relations from zero. Defined product positioning and market category for open-source cloud infrastructure for AI agents.',
    highlights: [
      'Grew developer community from 0 to 10,000+ active users',
      'Led content strategy reaching 1M+ impressions monthly',
      'Established partnerships with major AI companies',
      'Shaped product-market fit through developer feedback loops',
    ],
  },
  {
    period: '2023',
    title: 'Course Co-Creator',
    company: 'DeepLearning.AI',
    companyUrl: 'https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/',
    location: 'Remote',
    description: 'Co-created AI course on building with LangChain, reaching thousands of developers worldwide.',
    highlights: [
      'Collaborated with Andrew Ng\'s team',
      'Course taken by 50,000+ learners',
      'Taught practical AI agent development',
    ],
  },
  {
    period: '2020 — 2021',
    title: 'Management Consultant',
    company: 'McKinsey & Company',
    companyUrl: 'https://mckinsey.com',
    location: 'Prague',
    description: 'Advised Fortune 500 clients on growth strategy in banking, energy, and telecommunications sectors.',
    highlights: [
      'Led workstreams on digital transformation initiatives',
      'Developed go-to-market strategies for new products',
      'Conducted market sizing and competitive analysis',
    ],
  },
]

const education = [
  {
    period: '2017 — 2019',
    degree: 'Master\'s in Pure Mathematics',
    school: 'Charles University',
    location: 'Prague',
  },
  {
    period: '2014 — 2017',
    degree: 'Bachelor\'s in Marketing & Economics',
    school: 'University of Economics',
    location: 'Prague',
  },
]

const skills = [
  { category: 'Growth', items: ['Content Strategy', 'Developer Marketing', 'Community Building', 'Product-Led Growth'] },
  { category: 'Technical', items: ['AI/ML Concepts', 'Developer Tools', 'Technical Writing', 'API Documentation'] },
  { category: 'Languages', items: ['English (Fluent)', 'Czech (Native)', 'German (Conversational)'] },
]

const recognition = [
  { year: '2024', title: 'O-1 Visa Holder', description: 'Recognized for extraordinary ability in technology' },
  { year: '2023', title: 'Top Voice', description: 'LinkedIn AI & Technology community' },
]

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-24 max-w-4xl">
        
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground">
              Resume
            </h1>
            <Link
              href="/Tereza_Tizkova_Resume.pdf"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.05em] uppercase text-primary hover:underline w-fit"
              target="_blank"
            >
              Download PDF
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <p className="font-light text-[17px] text-secondary leading-relaxed max-w-xl">
            Growth and developer relations leader with a background in mathematics and management consulting.
          </p>
        </header>

        {/* Experience */}
        <section className="mb-16 sm:mb-20">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-8 sm:mb-10">Experience</h2>
          
          <div className="space-y-10 sm:space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-6 sm:pl-8 border-l border-[rgba(255,255,255,0.1)]">
                {/* Node */}
                <div className="absolute left-0 top-1 -translate-x-[calc(50%+0.5px)] w-2 h-2 bg-primary rounded-full" />
                
                {/* Content */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                    <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">{job.period}</span>
                    <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">{job.location}</span>
                  </div>
                  <h3 className="font-serif text-[20px] sm:text-[22px] tracking-[-0.01em] mb-1">{job.title}</h3>
                  <Link 
                    href={job.companyUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-primary hover:underline text-[15px] mb-3"
                  >
                    {job.company}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                  <p className="text-[14px] sm:text-[15px] font-light text-secondary leading-relaxed mb-4">{job.description}</p>
                  <ul className="space-y-2">
                    {job.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] sm:text-[14px] font-light text-muted-foreground">
                        <span className="text-primary mt-1.5">◆</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-16 sm:mb-20" />

        {/* Education */}
        <section className="mb-16 sm:mb-20">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-8 sm:mb-10">Education</h2>
          
          <div className="space-y-6 sm:space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8">
                <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase sm:w-32 flex-shrink-0">{edu.period}</span>
                <div>
                  <h3 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] mb-1">{edu.degree}</h3>
                  <p className="text-[14px] font-light text-secondary">{edu.school}, {edu.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-16 sm:mb-20" />

        {/* Skills */}
        <section className="mb-16 sm:mb-20">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-8 sm:mb-10">Skills</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-[14px] font-light text-secondary">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-16 sm:mb-20" />

        {/* Recognition */}
        <section className="mb-16 sm:mb-20">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-8 sm:mb-10">Recognition</h2>
          
          <div className="space-y-4 sm:space-y-6">
            {recognition.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8">
                <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase sm:w-32 flex-shrink-0">{item.year}</span>
                <div>
                  <h3 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] mb-1">{item.title}</h3>
                  <p className="text-[14px] font-light text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 sm:p-10 bg-[#0f1420] border border-[rgba(255,255,255,0.06)] rounded-xl">
          <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.02em] mb-4">Let's work together</h2>
          <p className="font-light text-[14px] sm:text-[15px] text-secondary leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Interested in collaboration? I'm available for advisory roles, speaking engagements, and select consulting projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:tereza.tizkova@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get in touch
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/advisory"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[rgba(255,255,255,0.1)] text-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              Advisory services
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
