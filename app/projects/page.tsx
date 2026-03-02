import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I\'ve built and worked on',
}

const projects = [
  {
    title: 'Topics',
    description: 'A curated reading app that helps you discover and save the best articles on the internet. Built for thoughtful people who want to read more intentionally.',
    link: 'https://apps.apple.com/app/topics',
    tag: 'App',
    image: '/images/project-topics.jpg',
  },
  {
    title: 'DeepLearning.ai Course',
    description: 'Collaborated on an AI course teaching developers how to build with large language models. Reached thousands of learners worldwide.',
    link: 'https://deeplearning.ai',
    tag: 'Education',
    image: '/images/project-deeplearning.jpg',
  },
  {
    title: 'Growth Talks',
    description: 'An event series bringing together founders and growth practitioners to share real stories about building and scaling products.',
    link: '#',
    tag: 'Community',
    image: '/images/project-growth-talks.jpg',
  },
  {
    title: 'Advent of Writing',
    description: 'A 24-day writing challenge that helped hundreds of creators develop a consistent writing habit during the holiday season.',
    link: '#',
    tag: 'Writing',
    image: '/images/project-advent.jpg',
  },
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A collection of things I've built, taught, and organized. 
          Each one started as an experiment and grew into something I'm proud of.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ 
  project, 
  index 
}: { 
  project: typeof projects[number]
  index: number 
}) {
  const rotations = ['-rotate-1', 'rotate-1', 'rotate-0.5', '-rotate-0.5']
  const rotation = rotations[index % rotations.length]

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${rotation} hover:rotate-0`}
    >
      {/* Image */}
      <div className="relative h-48 bg-secondary overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
          {project.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h2>
          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
    </a>
  )
}
