import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { blogPosts, type BlogPost } from "@/lib/blog-posts"

function parseDate(date: string): number {
  const t = new Date(date).getTime()
  return Number.isNaN(t) ? 0 : t
}

export function ReadMore({ currentUrl }: { currentUrl: string }) {
  // Everything except the current article and hidden drafts
  const pool = blogPosts.filter((p) => p.url !== currentUrl && !p.draft)

  // Two latest by date
  const latest = [...pool].sort((a, b) => parseDate(b.date) - parseDate(a.date)).slice(0, 2)

  // One random from the math section (not already picked)
  const latestUrls = new Set(latest.map((p) => p.url))
  const mathPool = pool.filter((p) => p.category === "math" && !latestUrls.has(p.url))
  const randomMath = mathPool.length > 0 ? mathPool[Math.floor(Math.random() * mathPool.length)] : undefined

  const picks: BlogPost[] = randomMath ? [...latest, randomMath] : latest

  if (picks.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.1em] uppercase mb-6">
        Read more
      </h2>
      <div className="flex flex-col">
        {picks.map((post) => {
          const isInternal = post.isInternal
          const LinkComponent = isInternal ? Link : "a"
          const linkProps = isInternal
            ? { href: post.url }
            : { href: post.url, target: "_blank", rel: "noopener noreferrer" }

          return (
            <LinkComponent
              key={post.url}
              {...linkProps}
              className="group flex items-baseline justify-between gap-4 py-4 border-b border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-[17px] sm:text-[18px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-[13px] font-light text-muted-foreground line-clamp-1 mt-1">
                  {post.subtitle}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </LinkComponent>
          )
        })}
      </div>
    </section>
  )
}
