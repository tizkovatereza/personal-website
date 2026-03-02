import Link from 'next/link'
import { formatDate } from '@/lib/format'
import type { PostMeta } from '@/lib/mdx'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <article className="group">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight group-hover:text-primary transition-colors text-balance">
                {post.title}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {post.description}
            </p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group py-6 border-b border-border/40 last:border-0">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="font-serif text-xl font-medium tracking-tight group-hover:text-primary transition-colors text-balance">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        </div>
      </Link>
    </article>
  )
}
