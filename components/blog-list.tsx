"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { blogPosts, type BlogCategory } from "@/lib/blog-posts"
import { trackOutbound } from "@/lib/track-outbound"

const filters: { label: string; value: BlogCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Growth", value: "growth" },
  { label: "Technology", value: "ai" },
  { label: "Math", value: "math" },
  { label: "Other", value: "other" },
]

export function BlogList() {
  const [active, setActive] = useState<BlogCategory | "all">("all")

  const visiblePosts = blogPosts
    .filter((post) => !post.draft)
    .filter((post) => active === "all" || post.category === active)

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8" role="group" aria-label="Filter articles by topic">
        {filters.map((filter) => {
          const isActive = active === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              className={`px-4 py-1.5 text-[12px] font-mono font-light uppercase tracking-[0.05em] border transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {/* Posts List */}
      <div className="flex flex-col">
        {visiblePosts.map((post, index) => {
          const LinkComponent = post.isInternal ? Link : "a"
          const linkProps = post.isInternal
            ? { href: post.url }
            : {
                href: post.url,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: () => trackOutbound(post.url, post.title),
              }

          return (
            <LinkComponent
              key={index}
              {...linkProps}
              className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8 py-6 border-b border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                  {post.title}
                </h2>
                {post.guestPost ? (
                  <p className="text-[13px] sm:text-[14px] font-light italic text-primary/80">
                    Guest post for {post.guestPost}
                  </p>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.label && (
                      <span className="font-mono text-[9px] font-light uppercase tracking-[0.1em] text-muted-foreground/70 border border-border px-1.5 py-0.5 whitespace-nowrap">
                        {post.label}
                      </span>
                    )}
                    <p className="text-[13px] sm:text-[14px] font-light text-muted-foreground line-clamp-1">
                      {post.subtitle}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-mono text-[10px] sm:text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
                  {post.date.replace(/-/g, ".")}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
              </div>
            </LinkComponent>
          )
        })}

        {visiblePosts.length === 0 && (
          <p className="py-12 text-[14px] font-light text-muted-foreground">
            No articles in this category yet.
          </p>
        )}
      </div>
    </div>
  )
}
