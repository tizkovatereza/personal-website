import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { formatDate } from '@/lib/format'
import { MDXContent } from '@/components/mdx-content'
import { ReadingProgress } from '@/components/reading-progress'
import { LikeButton } from '@/components/like-button'
import { ShareButtons } from '@/components/share-buttons'
import { SubscribeForm } from '@/components/subscribe-form'
import { PostCard } from '@/components/post-card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const ogImageUrl = `https://www.terezatizkova.com/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description || '')}`

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const relatedPosts = allPosts
    .filter((p, i) => i !== currentIndex)
    .slice(0, 2)

  const postUrl = `https://www.terezatizkova.com/blog/${slug}`

  return (
    <>
      <ReadingProgress />
      <article className="container mx-auto max-w-3xl px-4 py-16">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Content */}
        <div className="mb-12">
          <MDXContent source={post.content} />
        </div>

        {/* Footer Actions */}
        <footer className="border-t border-border/40 pt-8 space-y-8">
          <div className="flex items-center justify-between">
            <LikeButton slug={slug} />
            <ShareButtons url={postUrl} title={post.title} />
          </div>

          {/* Subscribe CTA */}
          <SubscribeForm />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="pt-8 border-t border-border/40">
              <h2 className="font-serif text-xl font-semibold mb-6">Keep reading</h2>
              <div>
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </footer>
      </article>
    </>
  )
}
