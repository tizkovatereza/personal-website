import { getAllPosts } from '@/lib/mdx'
import { PostCard } from '@/components/post-card'
import { SubscribeForm } from '@/components/subscribe-form'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const posts = getAllPosts()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 4)

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      {/* Hero Section */}
      <section className="space-y-6 pb-12 border-b border-border/40">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
          Thoughts on technology, design, and the future of work
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          A personal newsletter exploring the intersection of productivity, mindful technology, 
          and building a meaningful career in the digital age.
        </p>
        <div className="max-w-md">
          <SubscribeForm variant="inline" />
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 border-b border-border/40">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-medium uppercase tracking-wider text-accent">
              Latest
            </span>
          </div>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">
              Recent Essays
            </h2>
            <Link 
              href="/archive" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div>
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Subscribe CTA */}
      <section className="pt-8">
        <SubscribeForm />
      </section>
    </div>
  )
}
