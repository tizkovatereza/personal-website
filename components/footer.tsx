import Link from 'next/link'
import { Rss } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-12 mt-auto">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link 
              href="/" 
              className="font-serif text-lg font-semibold tracking-tight hover:text-primary transition-colors"
            >
              Tereza Tizkova
            </Link>
            <p className="text-sm text-muted-foreground">
              San Francisco / Prague / Berlin
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/blog" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/projects" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/advisory" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Advisory
            </Link>
            <Link 
              href="/feed.xml" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Rss className="h-3.5 w-3.5" />
              RSS
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            {currentYear} Tereza Tizkova. Made with care.
          </p>
        </div>
      </div>
    </footer>
  )
}
