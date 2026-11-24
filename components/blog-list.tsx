"use client"

import { useState } from "react"
import Link from "next/link"
import { type BlogCategory } from "@/lib/blog-posts"
import { type WritingPost } from "@/lib/writing-posts"
import { WritingLikeCount } from "@/components/writing-like-count"
import { trackOutbound } from "@/lib/track-outbound"

const filters: { label: string; value: BlogCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Growth", value: "growth" },
  { label: "Technology", value: "ai" },
  { label: "Math", value: "math" },
  { label: "Life", value: "life" },
  { label: "Other", value: "other" },
]

export function BlogList({ posts }: { posts: WritingPost[] }) {
  const [active, setActive] = useState<BlogCategory | "all">("all")
  const visiblePosts = posts
    .filter((post) => !post.draft && !post.unlisted)
    .filter((post) => active === "all" || post.category === active)

  return (
    <div>
      <div className="flex flex-wrap gap-x-4 border-y border-border sm:gap-x-6" role="group" aria-label="Filter articles by topic">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActive(filter.value)}
            aria-pressed={active === filter.value}
            className="min-h-11 border-b-2 border-transparent px-0.5 font-mono text-[13px] text-secondary transition-colors hover:text-foreground aria-pressed:border-primary aria-pressed:text-foreground"
          >
            {filter.label}
          </button>
        ))}
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
              className="group block min-w-0 border-b border-border py-6 transition-colors hover:border-primary/40 sm:py-7"
            >
              <h2 className="text-[23px] leading-tight text-foreground group-hover:text-primary sm:text-[28px]">
                {post.title}
              </h2>
              <p className="mt-2 max-w-[67ch] text-[17px] leading-relaxed text-secondary sm:text-[18px]">
                {post.excerpt}
              </p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-xs leading-relaxed text-secondary [&>*+*]:before:mr-2 [&>*+*]:before:content-['·']">
                <span>{post.date}</span>
                <span>{post.source}</span>
                <WritingLikeCount source={post.source} slug={post.isInternal ? post.url.split("/").pop() : undefined} count={post.likes} />
                {post.label && <span className="text-primary">{post.label}</span>}
              </div>
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
