"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/work-with-me", label: "Work With Me" },
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
            {/* Detailed bird - robin style */}
            <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Body - round plump shape */}
              <ellipse cx="18" cy="24" rx="10" ry="8" />
              {/* Head - overlapping circle */}
              <circle cx="28" cy="16" r="6" />
              {/* Eye */}
              <circle cx="30" cy="15" r="1.2" fill="currentColor" />
              {/* Beak - pointed */}
              <path d="M34 16l4-1.5-4-1.5" />
              {/* Wing on body with feather lines */}
              <ellipse cx="16" cy="22" rx="6" ry="4" />
              <path d="M12 20c2-1 4-1 6 0" />
              <path d="M12 22c2-0.5 4-0.5 6 0" />
              <path d="M13 24c1.5 0 3 0 4.5 0" />
              {/* Tail feathers fanning out */}
              <path d="M8 24l-5-3" />
              <path d="M8 26l-6-1" />
              <path d="M8 28l-5 2" />
              {/* Legs - two stick legs */}
              <path d="M16 32v5" />
              <path d="M14 37h4" />
              <path d="M21 32v4" />
              <path d="M19 36h4" />
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
            {/* Detailed clown face */}
            <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Face - round */}
              <circle cx="20" cy="22" r="12" />
              {/* Pointy party hat */}
              <path d="M12 12l8-10 8 10" />
              {/* Hat stripes */}
              <path d="M14 10l6-6" />
              <path d="M18 11l4-5" />
              {/* Pompom at tip */}
              <circle cx="20" cy="2" r="2.5" fill="currentColor" />
              {/* Eyes - ovals with pupils */}
              <ellipse cx="14" cy="20" rx="2.5" ry="3" />
              <circle cx="14.5" cy="20" r="1" fill="currentColor" />
              <ellipse cx="26" cy="20" rx="2.5" ry="3" />
              <circle cx="26.5" cy="20" r="1" fill="currentColor" />
              {/* Big round nose - double circle */}
              <circle cx="20" cy="25" r="3.5" />
              <circle cx="20" cy="25" r="2" fill="currentColor" />
              {/* Wide curved smile */}
              <path d="M12 30c3 4 5 5 8 5s5-1 8-5" />
              {/* Curly hair puffs - left side */}
              <path d="M8 18c-2-1-3 0-3 2s1 3 2 2" />
              <path d="M7 22c-2 0-3 1-2 3s2 2 3 1" />
              {/* Curly hair puffs - right side */}
              <path d="M32 18c2-1 3 0 3 2s-1 3-2 2" />
              <path d="M33 22c2 0 3 1 2 3s-2 2-3 1" />
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
            {/* Detailed feather quill pen */}
            <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Long shaft */}
              <path d="M8 38l12-24" />
              {/* Feather shape - elongated leaf */}
              <path d="M20 14c2-4 6-8 10-10 2-1 4-1 5 0 0 2-1 4-3 7-3 5-8 9-14 10" />
              {/* Central vein */}
              <path d="M20 14l10-10" />
              {/* Barb lines - left side of feather */}
              <path d="M21 12c-1-1-2-1-3 0" />
              <path d="M23 9c-1-1-2.5-0.5-3 0" />
              <path d="M25 6c-1-1-2-0.5-2.5 0.5" />
              <path d="M28 4c-1-0.5-1.5 0-2 1" />
              {/* Barb lines - right side of feather */}
              <path d="M22 13c1-1 2-1.5 3-1" />
              <path d="M24 10c1-1 2.5-1.5 3.5-1" />
              <path d="M27 7c1-1 2-1 3-0.5" />
              <path d="M30 5c0.5-0.5 1.5-0.5 2 0" />
              {/* Nib detail */}
              <path d="M8 38l-2 1.5" />
              <path d="M6 39.5l3 0" />
              {/* Ink drop */}
              <circle cx="5" cy="38" r="1.5" fill="currentColor" />
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
            {/* Detailed terminal window */}
            <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Window frame */}
              <rect x="2" y="4" width="36" height="32" rx="3" />
              {/* Title bar separator */}
              <path d="M2 12h36" />
              {/* Three window dots */}
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <circle cx="14" cy="8" r="1.5" fill="currentColor" />
              <circle cx="20" cy="8" r="1.5" fill="currentColor" />
              {/* Code content: </> */}
              <path d="M10 20l-4 4 4 4" />
              <path d="M30 20l4 4-4 4" />
              <path d="M22 18l-4 12" />
              {/* Cursor blink line */}
              <path d="M24 30h4" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
