import { LikeButton } from '@/components/like-button'
import { ShareButtons } from '@/components/share-buttons'
import { Comments } from '@/components/comments'

interface ArticleEngagementProps {
  slug: string
  title: string
  /** Absolute URL of the article, used for share links */
  url: string
}

/**
 * Shared end-of-article engagement block: like button + share buttons on one
 * row, followed by the comments section. Used across all published articles
 * so the experience is consistent.
 */
export function ArticleEngagement({ slug, title, url }: ArticleEngagementProps) {
  return (
    <>
      <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-light tracking-[0.1em] uppercase text-muted-foreground">
            Enjoyed this?
          </span>
          <LikeButton slug={slug} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-light tracking-[0.1em] uppercase text-muted-foreground">
            Share
          </span>
          <ShareButtons url={url} title={title} />
        </div>
      </div>

      <Comments slug={slug} />
    </>
  )
}
