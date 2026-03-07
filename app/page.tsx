"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"
import { SFFogHero } from "@/components/sf-fog-hero"

const writingItems = [
  {
    title: "AI Agents Are Eating Software First — Everything Else Is Next",
    date: "Mar 2026",
    source: "E2B Blog",
    href: "https://e2b.dev/blog",
  },
  {
    title: "Where AI Agents Are Heading: What We Learned from Recent YC Startups",
    date: "Mar 2026",
    source: "E2B Blog",
    href: "https://e2b.dev/blog",
  },
  {
    title: "Let Your Company Stop Growing",
    date: "Feb 2026",
    source: "Substack",
    href: "https://terezatizkova.substack.com",
  },
  {
    title: "Distribution Is the Only Moat Left",
    date: "Jan 2026",
    source: "Substack",
    href: "https://terezatizkova.substack.com",
  },
]

const projects = [
  { 
    category: "Infrastructure",
    title: "E2B", 
    description: "Open-source cloud infrastructure for AI agents. Secure sandboxes that spin up in milliseconds.",
    href: "https://e2b.dev",
  },
  { 
    category: "Writing",
    title: "Substack", 
    description: "Notes on growth, AI, and building things that matter. No marketing fluff.",
    href: "https://terezatizkova.substack.com",
  },
  { 
    category: "Program",
    title: "Startup Advisory", 
    description: "Helping early-stage founders with growth strategy, positioning, and go-to-market.",
    href: "/advisory",
  },
  { 
    category: "Community",
    title: "E2B Startup Program", 
    description: "Credits and support for startups building on AI agents. YC, a16z speedrun, and more.",
    href: "https://e2b.dev/startup-program",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Hero */}
      <SFFogHero />

      {/* Content sections */}
      <div className="px-12 md:px-16 lg:px-20 py-24 max-w-4xl">
        
        {/* === WRITING SECTION === */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-[32px] tracking-[-0.02em]">Writing</h2>
            <Link
              href="/blog"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Editorial list with gaps showing through */}
          <div className="flex flex-col gap-px bg-[rgba(255,255,255,0.03)]">
            {writingItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline justify-between py-5 px-4 bg-[#0a0e17] editorial-item group"
              >
                <h3 className="font-serif text-[18px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors pr-8">
                  {item.title}
                </h3>
                <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase flex-shrink-0">
                  {item.date} · {item.source}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mb-24" />

        {/* === PROJECTS SECTION === */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-[32px] tracking-[-0.02em]">Projects</h2>
            <Link
              href="/projects"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                target={project.href.startsWith('http') ? "_blank" : undefined}
                rel={project.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group block p-9 bg-[#0f1420] border border-[rgba(255,255,255,0.06)] rounded-xl card-hover"
              >
                {/* Category with diamond */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                  <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-serif text-[22px] tracking-[-0.01em] mb-3">
                  {project.title}
                </h3>
                <p className="font-light text-[14px] text-secondary leading-relaxed">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mb-24" />

        {/* === FOOTER === */}
        <footer className="flex items-center justify-between py-12 border-t border-[rgba(255,255,255,0.06)]">
          <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
            © 2026 Tereza Tizkova
          </span>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/tereza_tizkova"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
            >
              X/Twitter
            </a>
            <a
              href="https://linkedin.com/in/tereza-tizkova"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/tereza-org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://terezatizkova.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
            >
              Substack
            </a>
          </div>
        </footer>

      </div>

      {/* Binary watermark - decorative */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 hidden xl:block">
        <div 
          className="font-mono text-[10px] text-[#4a4f5a] opacity-15"
          style={{ writingMode: 'vertical-rl' }}
        >
          01001000 01100101
        </div>
      </div>
    </div>
  )
}
