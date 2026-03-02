import { Metadata } from "next"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-posts"

export const metadata: Metadata = {
  title: "Blog | Tereza Tizkova",
  description: "Writing about AI, growth, startups, and life",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4">
          BLOG
        </h1>
        <p className="text-lg text-muted-foreground">
          writing about AI, growth, startups, and life
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
            className="group flex flex-col md:flex-row gap-6 py-8 border-b border-border/50 hover:border-primary/30 transition-colors first:pt-0"
          >
            {/* Thumbnail */}
            <div className="relative w-full md:w-[280px] h-[200px] md:h-[180px] flex-shrink-0 overflow-hidden bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 280px"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <time className="text-sm text-muted-foreground mb-2">
                {post.date}
              </time>
              <h2 className="text-xl md:text-2xl font-serif font-medium leading-tight mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground line-clamp-2">
                {post.subtitle}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
