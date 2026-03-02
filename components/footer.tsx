import Link from 'next/link'
import { Rss } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link 
            href="/" 
            className="font-serif text-lg font-semibold tracking-tight hover:text-accent transition-colors"
          >
            The Smart Method
          </Link>
          
          <p className="text-sm text-muted-foreground max-w-md">
            A personal newsletter on technology, design, and the future of work. 
            Thoughtful essays delivered to your inbox.
          </p>

          <div className="flex items-center gap-6">
            <Link 
              href="/archive" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Archive
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link 
              href="/feed.xml" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Rss className="h-3.5 w-3.5" />
              RSS
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            {currentYear} The Smart Method. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
