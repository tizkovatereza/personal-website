"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"
import { SFFogHero } from "@/components/sf-fog-hero"

const projects = [
  {
    title: "Topics",
    category: "APP",
    image: "/images/project-topics.jpg",
    href: "/projects#topics",
  },
  {
    title: "DeepLearning.AI",
    category: "EDUCATION",
    image: "/images/project-deeplearning.jpg",
    href: "/projects#deeplearning",
  },
  {
    title: "Awesome AI Agents",
    category: "OPEN SOURCE",
    image: "/images/project-advent.jpg",
    href: "/projects#awesome-agents",
  },
  {
    title: "Advent of Writing",
    category: "COMMUNITY",
    image: "/images/project-advent.jpg",
    href: "/projects#advent",
  },
  {
    title: "Growth Talks",
    category: "CONSULTING",
    image: "/images/project-growth-talks.jpg",
    href: "/projects#growth-talks",
  },
  {
    title: "E2B",
    category: "STARTUP",
    image: "/images/project-topics.jpg",
    href: "/projects#e2b",
  },
  {
    title: "Developer Events",
    category: "EVENTS",
    image: "/images/project-growth-talks.jpg",
    href: "/projects#events",
  },
  {
    title: "Discover Academy",
    category: "TEACHING",
    image: "/images/project-advent.jpg",
    href: "/projects#discover",
  },
]

export default function HomePage() {
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* SF Fog Hero - Full viewport interactive experience */}
      <SFFogHero />

      {/* Content below the fold */}
      <div className="px-6 py-16 lg:px-12 max-w-5xl dot-grid">
        {/* About Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-primary signal-dot" />
            <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">ABOUT</h2>
          </div>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed max-w-3xl">
            <p>
              I&apos;m a founding member and first hire at E2B, where I&apos;ve led growth, 
              marketing, and developer relations for 2.5 years — from zero to Series A. 
              Before that, I was a management consultant at McKinsey, advising on growth 
              strategy in banking, energy, and telecom.
            </p>
            <p>
              I have a master&apos;s in pure mathematics and two bachelor&apos;s degrees 
              (marketing & economics) from Charles University in Prague. I hold an O-1 visa 
              and split my time between San Francisco, Prague, and Berlin.
            </p>
            <p>
              I care deeply about building community and creating meaningful content. I have 
              40,000 newsletter subscribers, 11,000 Twitter followers, and have organized 
              events with 100-200 people across the US and Europe.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-8 font-mono text-xs tracking-widest uppercase text-primary hover:text-secondary transition-colors"
          >
            READ FULL BIO <ArrowRight className="w-3 h-3" />
          </Link>
        </section>

        {/* Dashed Divider */}
        <div className="dashed-divider mb-16" />

        {/* Recent Projects - Horizontal scroll with SMALL cards */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-secondary signal-dot" />
              <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">PROJECTS</h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              VIEW ALL <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <p className="text-muted-foreground text-sm mb-6 max-w-xl">
            Things I&apos;ve built, taught, and organized.
          </p>

          <div className="horizontal-scroll scrollbar-hide -mx-6 px-6">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group w-[280px] flex-shrink-0"
              >
                <div className="h-[180px] overflow-hidden mb-3 bg-card border border-border relative project-card-hover">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={280}
                    height={180}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Noise overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
                </div>
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="text-sm font-medium mt-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Dashed Divider */}
        <div className="dashed-divider mb-16" />

        {/* Latest Posts (Blog) */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-primary blink" />
              <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">LATEST POSTS</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              VIEW ALL <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <p className="text-muted-foreground text-sm mb-6 max-w-xl">
            Writing about AI, growth, startups, and life.
          </p>

          <div className="space-y-0">
            {recentPosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-6 py-6 border-b border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-card border border-border relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    {post.date.replace(/-/g, '.')}
                  </span>
                  <h3 className="font-medium mt-1 group-hover:text-primary transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {post.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
