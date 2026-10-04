import type { Metadata } from 'next'
import {
  ArrowUpRight,
  Factory,
  Rocket,
  GraduationCap,
  Star,
  BookOpen,
  CalendarDays,
  School,
  Users,
  PenLine,
  Mic,
  Lightbulb,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects | Tereza Tizkova',
  description: 'Things I\'ve built, taught, and organized',
  openGraph: {
    title: 'Projects',
    description: 'Things I\'ve built, taught, and organized',
    images: [{ url: 'https://www.terezatizkova.com/api/og?title=Projects&subtitle=Things%20I%27ve%20built%2C%20taught%2C%20and%20organized', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.terezatizkova.com/api/og?title=Projects&subtitle=Things%20I%27ve%20built%2C%20taught%2C%20and%20organized'],
  },
}

const projects = [
  {
    id: 'factory',
    title: 'Factory',
    description: 'First growth hire. I work on growth and own key metrics like daily sign-ups and activation rate.',
    link: 'https://factory.ai',
    tag: 'Growth',
    icon: Factory,
  },
  {
    id: 'topics',
    title: 'Topics',
    description: 'A curated reading app for writers and learners who want to read more intentionally. Live on the App Store.',
    link: 'https://apps.apple.com/us/app/topics-curated-reading/id6759892878',
    tag: 'iOS App',
    icon: BookOpen,
  },
  {
    id: 'e2b',
    title: 'E2B',
    description: 'I was the founding team member, and the person responsible for marketing, growth, events, community, and partnerships with startups from scratch to Series A+.',
    link: 'https://e2b.dev',
    tag: 'Growth of a Startup',
    icon: Rocket,
  },
  {
    id: 'deeplearning',
    title: 'Building Coding Agents with Tool Execution',
    description: 'Prepared and co-taught this coding agents course on DeepLearning.AI with Andrew Ng\'s team. Reached thousands of learners worldwide.',
    link: 'https://www.deeplearning.ai/short-courses/building-coding-agents-with-tool-execution/',
    tag: 'Course',
    icon: GraduationCap,
  },
  {
    id: 'awesome-agents',
    title: 'Awesome AI Agents',
    description: 'Open source list of AI agents. 27k+ GitHub stars, went viral across social media, newsletters, conferences, and talks.',
    link: 'https://github.com/e2b-dev/awesome-ai-agents',
    tag: 'Open Source',
    icon: Star,
  },
  {
    id: 'events',
    title: 'Developer Events & Hackathons',
    description: 'Organized AI hackathons and developer events in San Francisco, Prague, and online through E2B. Including the first AI hackathon in Czech Republic with 50+ builders.',
    link: 'https://lu.ma/e2b',
    tag: 'Events',
    icon: CalendarDays,
  },
  {
    id: 'discover',
    title: 'Discover Academy',
    description: 'Lecturer at Discover Summer Academy, a non-profit summer school for talented Czech and Slovak high school students. Taught graduate-level mathematics to teenagers.',
    link: 'https://discover.sk/en/',
    tag: 'Teaching',
    icon: School,
  },

  {
    id: 'advent',
    title: 'Advent of Writing',
    description: 'A 24-day writing challenge that helped hundreds of creators develop a consistent writing habit during the holiday season.',
    link: 'https://adventofwriting.com/',
    tag: 'Writing',
    icon: PenLine,
  },
  {
    id: 'talks',
    title: 'Talks & Podcasts',
    description: 'Conference talks, podcast appearances, and interviews on AI agents, developer tools, and growth.',
    link: '/about#talks',
    tag: 'Speaking',
    icon: Mic,
  },
  {
    id: 'advisory',
    title: 'Startup Advisory',
    description: 'I enjoy helping early-stage teams figure things out.',
    link: 'mailto:tereza.tizkova@gmail.com?subject=Advisory chat',
    tag: 'Advisory',
    icon: Lightbulb,
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
            return (
              <a
                key={project.id}
                id={project.id}
                href={project.link}
                target={project.link.startsWith('http') ? "_blank" : undefined}
                rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group block bg-card/90 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Minimal centered icon */}
                <div className="flex items-center justify-center h-40 border-b border-border bg-muted/20">
                  <project.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.25} />
                </div>
                
                <div className="p-6 sm:p-8">
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
                </div>
              </a>
            )
          })}
        </div>

      </div>
    </div>
  )
}
