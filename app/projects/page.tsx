import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { TopicsWaitlistForm } from '@/components/topics-waitlist-form'

export const metadata: Metadata = {
  title: 'Projects | Tereza Tizkova',
  description: 'Things I\'ve built, taught, and organized',
}

const projects = [
  {
    id: 'e2b',
    title: 'E2B',
    description: 'Founding team member. Built growth from zero, established developer relations, shaped product positioning. Zero to Series A.',
    link: 'https://e2b.dev',
    tag: 'Startup',
    image: '/images/project-deeplearning.jpg',
  },
  {
    id: 'deeplearning',
    title: 'Building Coding Agents with Tool Execution',
    description: 'Prepared and co-taught this coding agents course on DeepLearning.AI with Andrew Ng\'s team. Reached thousands of learners worldwide.',
    link: 'https://www.deeplearning.ai/short-courses/building-coding-agents-with-tool-execution/',
    tag: 'Course',
    image: '/images/project-deeplearning.jpg',
  },
  {
    id: 'awesome-agents',
    title: 'Awesome AI Agents',
    description: 'Open source repository cataloging the best AI agent frameworks and tools. Over 20,000 GitHub stars and growing.',
    link: 'https://github.com/e2b-dev/awesome-ai-agents',
    tag: 'Open Source',
    image: '/images/project-topics.jpg',
  },
  {
    id: 'topics',
    title: 'Topics',
    description: 'A curated reading app for writers and learners who want to read more intentionally. Looking for beta testers!',
    link: '#',
    tag: 'Launching Soon',
    image: '/images/project-topics.jpg',
    isWaitlist: true,
  },
  {
    id: 'events',
    title: 'Developer Events & Hackathons',
    description: 'Organized AI hackathons and developer events in San Francisco, Prague, and online through E2B. Including the first AI hackathon in Czech Republic with 50+ builders.',
    link: 'https://lu.ma/e2b',
    tag: 'Events',
    image: '/images/project-growth-talks.jpg',
  },
  {
    id: 'discover',
    title: 'Discover Academy',
    description: 'Lecturer at Discover Summer Academy, a non-profit summer school for talented Czech and Slovak high school students. Taught graduate-level mathematics to teenagers.',
    link: 'https://discover.sk/en/',
    tag: 'Teaching',
    image: '/images/project-advent.jpg',
  },
  {
    id: 'growth-lab',
    title: 'The Growth Lab',
    description: 'A curated community of growth people sharing what actually works — tactics, tools, and real talk. 50+ members from startups, dev platforms, and AI companies.',
    link: '/growth-lab',
    tag: 'Community',
    image: '/images/project-growth-talks.jpg',
  },
  {
    id: 'advent',
    title: 'Advent of Writing',
    description: 'A 24-day writing challenge that helped hundreds of creators develop a consistent writing habit during the holiday season.',
    link: 'https://adventofwriting.com/',
    tag: 'Writing',
    image: '/images/project-advent.jpg',
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen relative">
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24 max-w-5xl">
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            Projects
          </h1>
          <p className="font-light text-[15px] sm:text-[17px] text-secondary leading-relaxed max-w-xl mb-6">
            Things I've built, taught, and organized.
          </p>
          <a
            href="mailto:tereza@e2b.dev?subject=Thoughts on your website&body=Hey Tereza, I wanted to share my thoughts on your website..."
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-mono font-light text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            What do you think about my website?
          </a>
        </header>

        {/* Projects Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project) => {
            // Special handling for waitlist projects
            if (project.isWaitlist) {
              return (
                <div
                  key={project.id}
                  id={project.id}
                  className="group block p-6 sm:p-8 bg-[#0f1420]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)] transition-all duration-300"
                >
                  {/* Category with diamond */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                    <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">
                      {project.tag}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="font-serif text-[20px] sm:text-[22px] tracking-[-0.01em]">
                      {project.title}
                    </h2>
                  </div>
                  
                  {/* Waitlist Form */}
                  <TopicsWaitlistForm />
                </div>
              )
            }

            return (
              <a
                key={project.id}
                id={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 sm:p-8 bg-[#0f1420]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)] hover:border-primary/30 transition-all duration-300"
              >
                {/* Category with diamond */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                  <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">
                    {project.tag}
                  </span>
                </div>
                
                {/* Title */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-serif text-[20px] sm:text-[22px] tracking-[-0.01em] group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Description */}
                <p className="font-light text-[13px] sm:text-[14px] text-secondary leading-relaxed">
                  {project.description}
                </p>
              </a>
            )
          })}
        </div>

      </div>
    </div>
  )
}
