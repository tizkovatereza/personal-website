"use client"

import * as React from 'react'
import { PostCard } from '@/components/post-card'
import { SearchPosts } from '@/components/search-posts'
import type { Post } from '@/lib/mdx'

interface ArchiveListProps {
  postsByYear: Record<string, Post[]>
  years: string[]
}

export function ArchiveList({ postsByYear, years }: ArchiveListProps) {
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredPostsByYear = React.useMemo(() => {
    if (!searchQuery.trim()) return postsByYear

    const query = searchQuery.toLowerCase()
    const filtered: Record<string, Post[]> = {}

    years.forEach((year) => {
      const matchingPosts = postsByYear[year].filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      )
      if (matchingPosts.length > 0) {
        filtered[year] = matchingPosts
      }
    })

    return filtered
  }, [postsByYear, years, searchQuery])

  const filteredYears = Object.keys(filteredPostsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  )

  const totalPosts = Object.values(filteredPostsByYear).reduce(
    (acc, posts) => acc + posts.length,
    0
  )

  return (
    <div className="space-y-8">
      <div className="max-w-sm">
        <SearchPosts onSearch={setSearchQuery} />
      </div>

      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          {totalPosts} {totalPosts === 1 ? 'result' : 'results'} found
        </p>
      )}

      {filteredYears.length === 0 ? (
        <p className="text-muted-foreground py-8">No posts found matching your search.</p>
      ) : (
        filteredYears.map((year) => (
          <section key={year}>
            <h2 className="font-serif text-2xl font-semibold mb-4 sticky top-20 bg-background py-2">
              {year}
            </h2>
            <div>
              {filteredPostsByYear[year].map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
