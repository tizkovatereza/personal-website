import { Metadata } from "next"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-posts"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Writing | Tereza Tizkova",
  description: "Writing about AI, growth, startups, and life",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-16 max-w-4xl">
        <header>
          <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            Writing
          </h1>
          <p className="font-light text-[15px] sm:text-[17px] text-secondary leading-relaxed max-w-xl mb-6">
            Thoughts on AI, math, growth, startups, and life. Written by human (me). I've grown a free and paid audience on Substack and Medium, but I'm slowly switching to publish here.
          </p>
          <a
            href="https://terezatizkova.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-mono font-light text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Subscribe to newsletter
          </a>
        </header>
      </div>

      {/* Posts List - solid background, no image */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pb-24 max-w-4xl">
        <div className="flex flex-col">
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8 py-6 border-b border-[rgba(255,255,255,0.06)] hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                  {post.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] font-light text-muted-foreground line-clamp-1">
                  {post.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-mono text-[10px] sm:text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
                  {post.date.replace(/-/g, '.')}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
