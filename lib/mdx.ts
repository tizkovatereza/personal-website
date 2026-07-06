import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image?: string
  readingTime: string
}

export interface Post extends PostMeta {
  content: string
}

export function getPostSlugs(): string[] {
  try {
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'))
  } catch {
    return []
  }
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    // Strip JSX/HTML tags, link URLs, and markdown symbols so the estimate
    // counts real prose, not image attributes and hrefs.
    const prose = content
      .replace(/<[^>]+>/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[#>*`_~|-]/g, ' ')
    const stats = readingTime(prose)

    return {
      slug: realSlug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      image: data.image,
      readingTime: stats.text,
      content,
    }
  } catch {
    return null
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx$/, '')))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostsByYear(): Record<string, Post[]> {
  const posts = getAllPosts()
  const postsByYear: Record<string, Post[]> = {}

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!postsByYear[year]) {
      postsByYear[year] = []
    }
    postsByYear[year].push(post)
  })

  return postsByYear
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts()
  return posts.filter((post) => 
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function searchPosts(query: string): Post[] {
  const posts = getAllPosts()
  const searchTerm = query.toLowerCase()

  return posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  )
}
