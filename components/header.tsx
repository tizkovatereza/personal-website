"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Archive', href: '/archive' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="font-serif text-xl font-semibold tracking-tight hover:text-accent transition-colors"
        >
          The Smart Method
        </Link>
        
        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
