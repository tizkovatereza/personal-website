"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/advisory", label: "Advisory" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[220px] bg-background border-r border-[rgba(255,255,255,0.04)] z-50">
      {/* Header with name */}
      <div className="px-8 pt-10 pb-8">
        <Link href="/" className="block">
          <h1 className="font-serif text-xl tracking-[-0.02em] text-foreground">
            Tereza Tizkova
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="w-4 h-px bg-primary" />
            <span className="relative inline-block group cursor-default">
              <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-1">
                San Francisco
              </span>
              <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase absolute left-0 top-0 opacity-0 -translate-y-1 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap">
                Sometimes Prague
              </span>
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-8 pt-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2 text-[15px] font-light transition-colors ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Social Links at bottom */}
      <div className="px-8 pb-10">
        <span className="font-mono text-[10px] font-light text-muted-foreground tracking-[0.1em] uppercase mb-3 block">Links</span>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href="https://x.com/tereza_tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="X (Twitter)"
            title="X"
          >
            {/* Bird - simple side profile sparrow */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Body - round */}
              <ellipse cx="14" cy="18" rx="8" ry="6" />
              {/* Head - overlapping circle */}
              <circle cx="22" cy="14" r="5" />
              {/* Eye */}
              <circle cx="24" cy="13" r="1" fill="currentColor" />
              {/* Beak - pointed triangle */}
              <path d="M27 14l4-1-4-1" />
              {/* Wing bump on top */}
              <path d="M10 14c2-3 6-3 8 0" />
              {/* Tail feathers - left side */}
              <path d="M6 17l-4-2" />
              <path d="M6 19l-5 0" />
              <path d="M6 21l-4 2" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/tereza-tizkova-568439174/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            {/* Clown face - clear round head, big nose, smile, party hat */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Face - round */}
              <circle cx="16" cy="18" r="10" />
              {/* Party hat triangle on top */}
              <path d="M10 10l6-8 6 8" />
              {/* Pom pom on hat */}
              <circle cx="16" cy="2" r="2" fill="currentColor" />
              {/* Eyes - dots */}
              <circle cx="12" cy="16" r="1.5" fill="currentColor" />
              <circle cx="20" cy="16" r="1.5" fill="currentColor" />
              {/* Big round nose - the key feature */}
              <circle cx="16" cy="20" r="3" />
              {/* Wide smile curve */}
              <path d="M10 24c2 2 4 3 6 3s4-1 6-3" />
            </svg>
          </a>
          <a
            href="https://terezatizkova.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Substack"
            title="Substack"
          >
            {/* Feather quill - prominent feather shape */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Shaft - diagonal line */}
              <path d="M6 30l10-20" />
              {/* Feather shape - large teardrop/leaf tilted */}
              <path d="M16 10c4-6 10-8 12-8-2 4-4 10-12 12-4-1-4-1 0-4" />
              {/* Barb lines inside feather */}
              <path d="M18 8c2-2 4-3 6-3" />
              <path d="M17 11c2-1 4-2 5-2" />
              {/* Nib at bottom */}
              <path d="M6 30l-2 1" />
            </svg>
          </a>
          <a
            href="https://github.com/tizkovatereza"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="GitHub"
            title="GitHub"
          >
            {/* Code brackets - bold and clear */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Left bracket < */}
              <path d="M10 8L2 16l8 8" />
              {/* Right bracket > */}
              <path d="M22 8l8 8-8 8" />
              {/* Forward slash / in middle */}
              <path d="M19 6l-6 20" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
