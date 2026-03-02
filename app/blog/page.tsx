import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { PostCard } from '@/components/post-card'
import { SubscribeForm } from '@/components/subscribe-form'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on tech, startups, and life',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on technology, startups, growth, and figuring things out as I go.
        </p>
      </header>

      <div className="space-y-2 mb-12">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <SubscribeForm />
    </div>
  )
}
