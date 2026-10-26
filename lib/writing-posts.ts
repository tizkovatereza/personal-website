import { blogPosts, type BlogPost } from './blog-posts'
import snapshots from './writing-snapshots.json'

export interface WritingPost extends BlogPost {
  excerpt: string
  source: string
  likes?: number
}

const saved = snapshots as Record<string, { excerpt: string; likes?: number }>

export async function getWritingPosts(): Promise<WritingPost[]> {
  return Promise.all(blogPosts.filter((post) => !post.draft).map(async (post) => {
    const snapshot = saved[post.url]
    const isSubstack = new URL(post.url, 'https://www.terezatizkova.com').hostname === 'terezatizkova.substack.com'
    let likes = snapshot?.likes

    if (isSubstack) {
      try {
        const url = new URL(post.url)
        const slug = url.pathname.split('/').pop()
        const response = await fetch(`${url.origin}/api/v1/posts/${slug}`, {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(5000),
        })
        if (response.ok) {
          const data = await response.json()
          const count = data.reactions?.['❤']
          if (Number.isSafeInteger(count) && count >= 0) likes = count
        }
      } catch {
        // Preserve the last verified public count if Substack is unavailable.
      }
    }

    return {
      ...post,
      excerpt: snapshot?.excerpt ?? '',
      source: post.isInternal ? 'Blog' : isSubstack ? 'Substack' : post.guestPost ?? 'Guest post',
      likes,
    }
  }))
}
