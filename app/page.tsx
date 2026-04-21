"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Send } from "lucide-react"
import { SFFogHero } from "@/components/sf-fog-hero"
import { RotatingProjectPhoto } from "@/components/rotating-project-photo"
import { TopicsWaitlistForm } from "@/components/topics-waitlist-form"

const writingItems = [
  {
    title: "Software is becoming marketing",
    date: "Apr 2026",
    source: "New",
    href: "/writing/software-abundance",
    isNew: true,
  },
  {
    title: "A guide to not wasting money on conference booths",
    date: "Apr 2026",
    source: "Essay",
    href: "/writing/conference-booths",
  },
  {
    title: "What Is Topology And Why You Should Love It",
    date: "Jul 2025",
    source: "Substack",
    href: "https://terezatizkova.substack.com/p/what-is-topology-and-why-you-should",
  },
  {
    title: "We Need More Influencers.",
    date: "Feb 2026",
    source: "Substack",
    href: "https://terezatizkova.substack.com/p/we-need-more-influencers",
  },
  {
    title: "Gödel's Incompleteness Theorems Explained Simply — Part 1",
    date: "Jan 2026",
    source: "Substack",
    href: "https://terezatizkova.substack.com/p/godels-incompleteness-theorems-part-1",
  },
]

const promptChips = [
  "I want to collaborate on...",
  "I think what's missing on your website is...",
  "My favorite kind of cheese is...",
  "You should write about...",
]

const projects = [
  { 
    category: "Startup",
    title: "E2B", 
    description: "Founding team member. Built growth from zero, established developer relations, shaped product positioning. Zero to Series A.",
    href: "https://e2b.dev",
  },
  { 
    category: "Course",
    title: "Building Coding Agents with Tool Execution", 
    description: "Prepared and co-taught this coding agents course on DeepLearning.AI with Andrew Ng's team. Reached thousands of learners worldwide.",
    href: "https://www.deeplearning.ai/short-courses/building-coding-agents-with-tool-execution/",
  },
  { 
    category: "Open Source",
    title: "Awesome AI Agents", 
    description: "Open source list of AI agents. 27k+ GitHub stars, went viral across social media, newsletters, conferences, and talks.",
    href: "https://github.com/e2b-dev/awesome-ai-agents",
  },
  { 
    category: "Launching Soon",
    title: "Topics", 
    description: "A curated reading app for writers and learners who want to read more intentionally. Looking for beta testers!",
    href: "#",
    isWaitlist: true,
  },
  { 
    category: "Events",
    title: "Developer Events & Hackathons", 
    description: "Organized AI hackathons and developer events in San Francisco, Prague, and online through E2B. Including the first AI hackathon in Czech Republic with 50+ builders.",
    href: "https://lu.ma/e2b",
  },
  { 
    category: "Teaching",
    title: "Discover Academy", 
    description: "Lecturer at Discover Summer Academy, a non-profit summer school for talented Czech and Slovak high school students. Taught graduate-level mathematics to teenagers.",
    href: "https://discover.sk/en/",
  },
  { 
    category: "Community",
    title: "The Growth Lab", 
    description: "A curated community of growth people sharing what actually works — tactics, tools, and real talk. 50+ members from startups, dev platforms, and AI companies.",
    href: "/growth-lab",
  },
  { 
    category: "Writing",
    title: "Advent of Writing", 
    description: "A 24-day writing challenge that helped hundreds of creators develop a consistent writing habit during the holiday season.",
    href: "https://adventofwriting.com/",
  },
  { 
    category: "Speaking",
    title: "Talks & Podcasts", 
    description: "Conference talks, podcast appearances, and interviews on AI agents, developer tools, and growth.",
    href: "/about#talks",
  },
  { 
    category: "Advisory",
    title: "Startup Advisory", 
    description: "I enjoy helping early-stage teams figure things out — whether it's growth, positioning, or just being a sounding board.",
    href: "mailto:tereza.tizkova@gmail.com?subject=Advisory chat",
  },
]

export default function HomePage() {
  const [message, setMessage] = useState("")
  const [contact, setContact] = useState("")
  const [isSent, setIsSent] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleChipClick = (prompt: string) => {
    setMessage(prompt)
  }

  const handleSend = async () => {
    if (!message.trim()) return
    setIsSending(true)
    
    try {
      const fullMessage = contact.trim() 
        ? `${message.trim()}\n\n---\nContact: ${contact.trim()}`
        : message.trim()
      
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: fullMessage }),
      })
      
      if (response.ok) {
        setIsSent(true)
        setTimeout(() => {
          setIsSent(false)
          setMessage("")
          setContact("")
        }, 3000)
      }
    } catch (error) {
      console.error('Failed to send feedback:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SFFogHero />

      {/* Content sections */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 py-24 max-w-5xl">
        
        {/* === WRITING SECTION === */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em]">Writing</h2>
            <Link
              href="/blog"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Editorial list */}
          <div className="flex flex-col gap-px bg-border/30">
            {writingItems.map((item, index) => {
              const isExternal = item.href.startsWith('http')
              const LinkComponent = isExternal ? 'a' : Link
              const linkProps = isExternal 
                ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                : { href: item.href }
              
              return (
                <LinkComponent
                  key={index}
                  {...linkProps}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between py-5 px-4 bg-transparent editorial-item group gap-2"
                >
                  <h3 className="font-serif text-[16px] sm:text-[18px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {item.title}
                    {'isNew' in item && item.isNew && (
                      <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-[9px] font-mono uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-[10px] sm:text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase flex-shrink-0">
                    {item.date} · {item.source}
                  </span>
                </LinkComponent>
              )
            })}
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mb-24" />

        {/* === PROJECTS SECTION === */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em]">Projects</h2>
            <Link
              href="/projects"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* 3-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {projects.map((project) => {
              // Special handling for waitlist projects
              if ('isWaitlist' in project && project.isWaitlist) {
                return (
                  <div
                    key={project.title}
                    className="group block bg-card border border-border overflow-hidden"
                  >
                    {/* Rotating Photo Preview - smaller */}
                    <RotatingProjectPhoto projectName={project.title} className="w-full h-32" />
                    
                    <div className="p-4 sm:p-5">
                      {/* Category with diamond */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1 h-1 bg-primary rotate-45" />
                        <span className="font-mono text-[9px] sm:text-[10px] font-light text-primary tracking-[0.05em] uppercase">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-[15px] sm:text-[16px] tracking-[-0.01em] mb-2">
                        {project.title}
                      </h3>
                      {/* Waitlist Form */}
                      <TopicsWaitlistForm />
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={project.title}
                  href={project.href}
                  target={project.href.startsWith('http') || project.href.startsWith('mailto') ? "_blank" : undefined}
                  rel={project.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="group block bg-card border border-border card-hover overflow-hidden"
                >
                  {/* Rotating Photo Preview - smaller */}
                  <RotatingProjectPhoto projectName={project.title} className="w-full h-32" />
                  
                  <div className="p-4 sm:p-5">
                    {/* Category with diamond */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1 h-1 bg-primary rotate-45" />
                      <span className="font-mono text-[9px] sm:text-[10px] font-light text-primary tracking-[0.05em] uppercase">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-[15px] sm:text-[16px] tracking-[-0.01em] mb-1.5">
                      {project.title}
                    </h3>
                    <p className="font-light text-[11px] sm:text-[12px] text-secondary leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mb-24" />

        {/* === WRITE ME SOMETHING SECTION === */}
        <section className="mb-24">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-8">Write me something</h2>
          
          <div className="p-6 sm:p-8 bg-card border border-border">
            {isSent ? (
              <div className="text-center py-8">
                <p className="font-serif text-[18px] text-primary">Sent! Thanks.</p>
              </div>
            ) : (
              <>
                {/* Prompt chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {promptChips.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleChipClick(prompt)}
                      className={`px-3 py-1.5 font-mono text-[10px] sm:text-[11px] font-light tracking-[0.05em] uppercase border transition-colors ${
                        message === prompt
                          ? 'border-primary text-primary bg-primary/10'
                          : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Text area */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something..."
                  rows={3}
                  className="w-full bg-transparent border border-border px-4 py-3 font-light text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none mb-4"
                />

                {/* Contact and send row */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Leave your contact (optional)"
                    className="flex-1 bg-transparent border border-border px-4 py-2 font-mono text-[12px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim() || isSending}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-primary text-primary-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'Sending...' : 'Send'}
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mb-24" />

        {/* === FOOTER === */}
        <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-12 border-t border-border">
          <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
            © 2026 Tereza Tizkova
          </span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://x.com/tereza_tizkova"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
            >
              X/Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/tereza-tizkova-568439174/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/tizkovatereza"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://terezatizkova.substack.com/"
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
