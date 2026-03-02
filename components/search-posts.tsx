"use client"

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchPostsProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchPosts({ onSearch, placeholder = "Search posts..." }: SearchPostsProps) {
  const [query, setQuery] = React.useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="pl-10 bg-secondary"
      />
    </div>
  )
}
