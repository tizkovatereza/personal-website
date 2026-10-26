import RSS from 'rss'
import { blogPosts } from '@/lib/blog-posts'
import { getAllPosts } from '@/lib/mdx'

const siteUrl = process.env.SITE_URL || 'https://www.terezatizkova.com'

export async function GET() {
  const drafts = new Set(blogPosts.filter((post) => post.draft).map((post) => post.url))
  const posts = getAllPosts().filter((post) => !drafts.has(`/blog/${post.slug}`))

  const feed = new RSS({
    title: 'Tereza Tizkova',
    description: 'Thoughts on tech, startups, and life.',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    language: 'en',
    pubDate: posts[0]?.date ? new Date(posts[0].date) : new Date(),
    copyright: `${new Date().getFullYear()} Tereza Tizkova`,
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      date: new Date(post.date),
      author: post.author,
      categories: post.tags,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
