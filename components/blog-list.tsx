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
      <div className="flex flex-wrap items-center gap-2 mb-8" role="group" aria-label="Filter articles by topic">
        {filters.map((filter) => {
          const isActive = active === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              className={`px-4 py-1.5 text-[11px] font-mono font-light uppercase tracking-[0.05em] border transition-colors ${
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

      <div className="flex flex-col">
        {visiblePosts.map((post) => {
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
              key={post.url}
              {...linkProps}
              className="group flex items-start gap-4 sm:gap-6 py-6 border-b border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                  {post.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] font-light text-secondary line-clamp-2 leading-relaxed mb-3">
                  {post.subtitle}
                </p>
                <div className="flex items-center gap-x-3 gap-y-2 flex-wrap font-mono text-[11px] font-light tracking-[0.05em] uppercase text-muted-foreground">
                  <span>{post.date}</span>
                  {post.guestPost && <span className="text-primary border border-border px-1.5 py-0.5">Guest post for {post.guestPost}</span>}
                  {post.label && <span className="border border-border px-1.5 py-0.5">{post.label}</span>}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 mt-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
            </LinkComponent>
          )
        })}
        {visiblePosts.length === 0 && (
          <p className="py-12 text-[14px] font-light text-secondary">No articles in this category yet.</p>
        )}
      </div>
    </div>
  )
}
