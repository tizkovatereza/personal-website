import RSS from 'rss'
import { getAllPosts } from '@/lib/mdx'

const siteUrl = process.env.SITE_URL || 'https://thesmartmethod.com'

export async function GET() {
  const posts = getAllPosts()

  const feed = new RSS({
    title: 'The Smart Method',
    description: 'A personal newsletter on technology, design, and the future of work.',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    language: 'en',
    pubDate: posts[0]?.date ? new Date(posts[0].date) : new Date(),
    copyright: `${new Date().getFullYear()} The Smart Method`,
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteUrl}/posts/${post.slug}`,
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
