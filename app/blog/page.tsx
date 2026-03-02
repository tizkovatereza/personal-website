import { Metadata } from "next"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-posts"

export const metadata: Metadata = {
  title: "Log | Tereza Tizkova",
  description: "Writing about AI, growth, startups, and life",
}

export default function BlogPage() {
  return (
    <div className="px-6 py-12 lg:px-12 lg:py-16 max-w-5xl dot-grid">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 bg-primary blink" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">ARCHIVE</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider uppercase mb-4">
          LOG
        </h1>
        <p className="text-muted-foreground max-w-xl text-sm">
          Writing about AI, growth, startups, and life.
        </p>
      </header>

      {/* Posts List */}
      <div className="space-y-0">
        {blogPosts.map((post, index) => (
          <a
            key={index}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row gap-6 py-8 border-b border-border hover:border-primary/30 transition-colors first:border-t"
          >
            {/* Thumbnail */}
            <div className="relative w-full md:w-[240px] h-[180px] md:h-[160px] flex-shrink-0 overflow-hidden bg-card border border-border project-card-hover">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 240px"
              />
              {/* Noise overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <time className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                {post.date.replace(/-/g, '.')}
              </time>
              <h2 className="font-display text-lg md:text-xl font-bold tracking-wide uppercase leading-tight mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.subtitle}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
