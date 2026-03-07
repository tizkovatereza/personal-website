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
    <div className="min-h-screen bg-[#0a0e17]">
      <div className="px-12 md:px-16 lg:px-20 py-24 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            Writing
          </h1>
          <p className="font-light text-[17px] text-secondary leading-relaxed max-w-xl">
            Notes on AI, growth, startups, and life. No marketing fluff.
          </p>
        </header>

        {/* Posts List - Editorial style */}
        <div className="flex flex-col">
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-8 py-6 border-b border-[rgba(255,255,255,0.06)] hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[20px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                  {post.title}
                </h2>
                <p className="text-[14px] font-light text-muted-foreground line-clamp-1">
                  {post.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
                  {post.date.replace(/-/g, '.')}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
