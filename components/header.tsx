"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Advisory', href: '/advisory' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="font-serif text-xl font-semibold tracking-tight hover:text-primary transition-colors"
        >
          Tereza
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative",
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {(pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <ul className="container mx-auto max-w-5xl px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 text-base font-medium transition-colors hover:text-primary",
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
