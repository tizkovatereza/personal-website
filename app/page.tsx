"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"
import { SFFogHero } from "@/components/sf-fog-hero"

const projects = [
  { title: "Topics", category: "APP", image: "/images/project-topics.jpg", href: "/projects#topics" },
  { title: "DeepLearning.AI", category: "EDUCATION", image: "/images/project-deeplearning.jpg", href: "/projects#deeplearning" },
  { title: "Awesome AI Agents", category: "OPEN SOURCE", image: "/images/project-advent.jpg", href: "/projects#awesome-agents" },
  { title: "Advent of Writing", category: "COMMUNITY", image: "/images/project-advent.jpg", href: "/projects#advent" },
  { title: "Growth Talks", category: "CONSULTING", image: "/images/project-growth-talks.jpg", href: "/projects#growth-talks" },
  { title: "E2B", category: "STARTUP", image: "/images/project-topics.jpg", href: "/projects#e2b" },
  { title: "Developer Events", category: "EVENTS", image: "/images/project-growth-talks.jpg", href: "/projects#events" },
  { title: "Discover Academy", category: "TEACHING", image: "/images/project-advent.jpg", href: "/projects#discover" },
]

export default function HomePage() {
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <SFFogHero />

      {/* Content */}
      <div className="px-6 py-16 lg:px-12 max-w-5xl">
        {/* About Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-3 opacity-40" style={{
              background: 'repeating-linear-gradient(90deg, currentColor 0px, currentColor 2px, transparent 2px, transparent 5px)',
            }} />
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">About</h2>
          </div>
          
          <div className="space-y-4 text-foreground/80 text-sm leading-relaxed max-w-3xl">
            <p>
              I&apos;m a founding member and first hire at E2B, where I&apos;ve led growth, 
              marketing, and developer relations for 2.5 years — from zero to Series A. 
              Before that, I was a management consultant at McKinsey.
            </p>
            <p>
              I have a master&apos;s in pure mathematics and two bachelor&apos;s degrees 
              from Charles University in Prague. I hold an O-1 visa and split my time 
              between San Francisco, Prague, and Berlin.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-6 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Read full bio <ArrowRight className="w-3 h-3" />
          </Link>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-[1px] bg-border" />
          <span className="text-[9px] tracking-wider text-muted-foreground">//////</span>
          <div className="flex-1 h-[1px] bg-border" />
        </div>

        {/* Projects */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 opacity-40" style={{
                background: 'repeating-linear-gradient(90deg, currentColor 0px, currentColor 2px, transparent 2px, transparent 5px)',
              }} />
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Projects</h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="horizontal-scroll scrollbar-hide -mx-6 px-6">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group w-[260px] flex-shrink-0"
              >
                <div className="h-[160px] overflow-hidden mb-2 bg-card border border-border relative card-hover">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={260}
                    height={160}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Corner brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-foreground/30 group-hover:border-foreground/60 transition-colors" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-foreground/30 group-hover:border-foreground/60 transition-colors" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-foreground/30 group-hover:border-foreground/60 transition-colors" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-foreground/30 group-hover:border-foreground/60 transition-colors" />
                </div>
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
                  {project.category}
                </span>
                <h3 className="text-xs font-medium mt-1 group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-[1px] bg-border" />
          <span className="text-[9px] tracking-wider text-muted-foreground">//////</span>
          <div className="flex-1 h-[1px] bg-border" />
        </div>

        {/* Latest Posts */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 opacity-40" style={{
                background: 'repeating-linear-gradient(90deg, currentColor 0px, currentColor 2px, transparent 2px, transparent 5px)',
              }} />
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Latest Posts</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-0">
            {recentPosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors"
              >
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-card border border-border relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-[0.15em]">
                    {post.date.replace(/-/g, '.')}
                  </span>
                  <h3 className="text-xs font-medium mt-1 group-hover:text-muted-foreground transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                    {post.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer decoration */}
        <div className="flex items-center justify-center gap-4 pt-8">
          <span className="text-[9px] tracking-wider text-muted-foreground">//////</span>
          <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase">End</span>
          <span className="text-[9px] tracking-wider text-muted-foreground">//////</span>
        </div>
      </div>
    </div>
  )
}
