import type { Metadata } from 'next'
import { getPostsByYear } from '@/lib/mdx'
import { ArchiveList } from './archive-list'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse all essays by year',
}

export default function ArchivePage() {
  const postsByYear = getPostsByYear()
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <header className="mb-12 space-y-4">
        <h1 className="font-serif text-4xl font-bold tracking-tight">Archive</h1>
        <p className="text-muted-foreground">
          All essays, organized by year
        </p>
      </header>

      <ArchiveList postsByYear={postsByYear} years={years} />
    </div>
  )
}
