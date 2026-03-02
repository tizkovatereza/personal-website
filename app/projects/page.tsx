import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I\'ve built, taught, and organized',
}

const projects = [
  {
    id: 'topics',
    title: 'Topics',
    description: 'A curated reading app that helps you discover and save the best articles on the internet. Built for thoughtful people who want to read more intentionally.',
    link: 'https://apps.apple.com/app/topics',
    tag: 'APP',
    image: '/images/project-topics.jpg',
  },
  {
    id: 'deeplearning',
    title: 'DeepLearning.AI Course',
    description: 'Collaborated on an AI course teaching developers how to build with large language models. Reached thousands of learners worldwide.',
    link: 'https://deeplearning.ai',
    tag: 'EDUCATION',
    image: '/images/project-deeplearning.jpg',
  },
  {
    id: 'awesome-agents',
    title: 'Awesome AI Agents',
    description: 'Open source repository cataloging the best AI agent frameworks and tools. Over 20,000 GitHub stars and growing.',
    link: 'https://github.com/e2b-dev/awesome-ai-agents',
    tag: 'OPEN SOURCE',
    image: '/images/project-topics.jpg',
  },
  {
    id: 'growth-talks',
    title: 'Growth Talks',
    description: 'An event series bringing together founders and growth practitioners to share real stories about building and scaling products.',
    link: '#',
    tag: 'COMMUNITY',
    image: '/images/project-growth-talks.jpg',
  },
  {
    id: 'advent',
    title: 'Advent of Writing',
    description: 'A 24-day writing challenge that helped hundreds of creators develop a consistent writing habit during the holiday season.',
    link: '#',
    tag: 'WRITING',
    image: '/images/project-advent.jpg',
  },
  {
    id: 'e2b',
    title: 'E2B',
    description: 'Founding team member. Built growth from zero, established developer relations, shaped product positioning. Zero to Series A.',
    link: 'https://e2b.dev',
    tag: 'STARTUP',
    image: '/images/project-deeplearning.jpg',
  },
  {
    id: 'events',
    title: 'Developer Events & Hackathons',
    description: 'Organized AI hackathons and developer events in San Francisco, Prague, and online through E2B. Including the first AI hackathon in Czech Republic with 50+ builders, hackathons at AGI House in SF, and community meetups across US and Europe. 100-200 attendees per event.',
    link: 'https://lu.ma/e2b',
    tag: 'EVENTS',
    image: '/images/project-growth-talks.jpg',
  },
]

export default function ProjectsPage() {
  return (
    <div className="px-6 py-12 lg:px-12 lg:py-16 max-w-5xl dot-grid">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 bg-primary signal-dot" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">WORK</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider uppercase mb-4">
          PROJECTS
        </h1>
        <p className="text-muted-foreground max-w-xl text-sm">
          Things I&apos;ve built, taught, and organized.
        </p>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.id}
            id={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-card border border-border overflow-hidden project-card-hover"
          >
            {/* Image with scanlines and noise */}
            <div className="relative h-48 bg-muted overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Noise texture overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
              
              {/* Tag */}
              <span className="absolute bottom-4 left-4 px-2 py-1 font-mono text-[10px] tracking-widest uppercase bg-primary text-primary-foreground">
                {project.tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-lg font-bold tracking-wide uppercase group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
