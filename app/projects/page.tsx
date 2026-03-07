import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

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
    title: 'DeepLearning.AI Course',
    description: 'Collaborated on an AI course teaching developers how to build with large language models. Reached thousands of learners worldwide.',
    link: 'https://deeplearning.ai',
    tag: 'Education',
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
    description: 'A curated reading app that helps you discover and save the best articles on the internet. Built for thoughtful people who want to read more intentionally.',
    link: 'https://apps.apple.com/app/topics',
    tag: 'App',
    image: '/images/project-topics.jpg',
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
    id: 'growth-talks',
    title: 'Growth Talks',
    description: 'An event series bringing together founders and growth practitioners to share real stories about building and scaling products.',
    link: '#',
    tag: 'Community',
    image: '/images/project-growth-talks.jpg',
  },
  {
    id: 'advent',
    title: 'Advent of Writing',
    description: 'A 24-day writing challenge that helped hundreds of creators develop a consistent writing habit during the holiday season.',
    link: '#',
    tag: 'Writing',
    image: '/images/project-advent.jpg',
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <div className="px-12 md:px-16 lg:px-20 py-24 max-w-5xl">
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            Projects
          </h1>
          <p className="font-light text-[17px] text-secondary leading-relaxed max-w-xl">
            Things I've built, taught, and organized.
          </p>
        </header>

        {/* Projects Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              id={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-[#0f1420] border border-[rgba(255,255,255,0.06)] rounded-xl hover:border-primary/30 transition-all duration-300"
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
                <h2 className="font-serif text-[22px] tracking-[-0.01em] group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Description */}
              <p className="font-light text-[14px] text-secondary leading-relaxed">
                {project.description}
              </p>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
