"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"
import { SFFogHero } from "@/components/sf-fog-hero"

const projects = [
  { 
    title: "E2B", 
    description: "Code interpreters for AI apps. Founding team member, first hire.",
    category: "Startup", 
    href: "https://e2b.dev",
    external: true,
  },
  { 
    title: "Topics", 
    description: "Curated reading app for focused learning.",
    category: "Product", 
    href: "/projects#topics",
    external: false,
  },
  { 
    title: "DeepLearning.AI", 
    description: "Short courses on AI development.",
    category: "Education", 
    href: "/projects#deeplearning",
    external: false,
  },
  { 
    title: "Awesome AI Agents", 
    description: "Open source list of AI agent frameworks.",
    category: "Open Source", 
    href: "/projects#awesome-agents",
    external: false,
  },
]

export default function HomePage() {
  const recentPosts = blogPosts.slice(0, 5)

  return (
    <div className="min-h-screen bg-background noise-texture">
      {/* Hero */}
      <SFFogHero />

      {/* Content */}
      <div className="px-6 py-16 lg:px-12 max-w-4xl">
        
        {/* === PROJECTS SECTION === */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl">Projects</h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                className="group block p-5 border border-border bg-card card-hover"
              >
                <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-serif text-lg mt-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-border mb-20" />

        {/* === WRITING SECTION === */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl">Writing</h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Editorial list */}
          <div className="space-y-0 border-t border-border">
            {recentPosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between py-4 border-b border-border editorial-item px-2 -mx-2"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="font-serif text-base group-hover:text-primary transition-colors truncate">
                    {post.title}
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted-foreground flex-shrink-0">
                  {post.date.replace(/-/g, '.')}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-border mb-20" />

        {/* === ABOUT PREVIEW === */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl mb-6">About</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a founding member and first hire at{' '}
              <a href="https://e2b.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                E2B
              </a>, where I&apos;ve led growth, marketing, and developer relations 
              for 2.5 years — from zero to Series A.
            </p>
            <p>
              Before that, I was a management consultant at McKinsey. I have a master&apos;s 
              in pure mathematics from Charles University in Prague.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-6 text-sm text-primary hover:underline"
          >
            Read full bio <ArrowRight className="w-3 h-3" />
          </Link>
        </section>

      </div>
    </div>
  )
}
