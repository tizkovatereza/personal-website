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
                sometimes Prague
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
            {/* Hand-drawn bird on branch */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Branch */}
              <path d="M2 24c4-1 8 0 12-1s8-2 14-1" />
              <path d="M22 22c1 1 2 1.5 3 1" />
              {/* Bird body - round, sketchy */}
              <ellipse cx="14" cy="16" rx="6" ry="5" />
              {/* Bird head */}
              <circle cx="19" cy="12" r="3.5" />
              {/* Eye */}
              <circle cx="20" cy="11.5" r="0.8" fill="currentColor" />
              {/* Beak */}
              <path d="M22.5 12.5l3 0.5-2.5 1" />
              {/* Tail feathers */}
              <path d="M8 15c-2-1-4-0.5-5 1" />
              <path d="M8 17c-2 0-4 1-5 2" />
              <path d="M8 16c-3 0-5 0.5-6 1" />
              {/* Wing detail */}
              <path d="M11 14c1-1 3-1 4 0" />
              <path d="M12 16c1 0 2 0 3 0" />
              {/* Legs */}
              <path d="M12 21v3" />
              <path d="M15 21v2.5" />
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
            {/* Hand-drawn clown face */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Face outline - slightly wobbly */}
              <path d="M6 17c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10" />
              {/* Party hat */}
              <path d="M10 8l6-6 6 6" />
              <path d="M12 6l4-3" />
              <path d="M16 3c0.5-1 1-1.5 1.5-1" />
              {/* Eyes - different sizes for silliness */}
              <circle cx="12" cy="15" r="2" />
              <circle cx="20" cy="15" r="1.5" />
              <circle cx="12.5" cy="14.5" r="0.5" fill="currentColor" />
              <circle cx="20.2" cy="14.5" r="0.5" fill="currentColor" />
              {/* Big round nose */}
              <circle cx="16" cy="18" r="2.5" />
              {/* Big smile */}
              <path d="M10 22c2 3 4 4 6 4s4-1 6-4" />
              {/* Rosy cheeks */}
              <circle cx="8" cy="18" r="1.5" />
              <circle cx="24" cy="18" r="1.5" />
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
            {/* Hand-drawn feather quill */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Quill shaft */}
              <path d="M8 28l6-14" />
              {/* Feather outline */}
              <path d="M14 14c2-4 6-8 12-12" />
              <path d="M14 14c4-2 10-4 12-12" />
              {/* Feather barbs - left side */}
              <path d="M15 12c-1-1-1.5-0.5-2 0" />
              <path d="M17 9c-1.5-1-2 0-2.5 0.5" />
              <path d="M19 6c-1-1-2-0.5-2.5 0" />
              <path d="M21 4c-1-0.5-1.5 0-2 0.5" />
              {/* Feather barbs - right side */}
              <path d="M16 13c0.5-1.5 1.5-1.5 2-1" />
              <path d="M18 10c1-1.5 2-1 2.5-0.5" />
              <path d="M20 7c1-1 2-0.5 2.5 0" />
              <path d="M23 4c0.5-0.5 1.5-0.5 2 0" />
              {/* Nib detail */}
              <path d="M8 28l-1 2" />
              <path d="M10 26l1 0.5" />
              {/* Ink drop */}
              <circle cx="6" cy="30" r="1" fill="currentColor" />
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
            {/* Hand-drawn terminal/code window */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Window frame - slightly wobbly */}
              <path d="M4 6c0-1 1-2 2-2h20c1 0 2 1 2 2v20c0 1-1 2-2 2H6c-1 0-2-1-2-2V6z" />
              {/* Title bar */}
              <path d="M4 10h24" />
              {/* Window buttons */}
              <circle cx="8" cy="8" r="1" />
              <circle cx="12" cy="8" r="1" />
              <circle cx="16" cy="8" r="1" />
              {/* Code brackets */}
              <path d="M9 16l-2 3 2 3" />
              <path d="M23 16l2 3-2 3" />
              {/* Slash in middle */}
              <path d="M17 15l-3 8" />
              {/* Cursor blink */}
              <path d="M19 22v2" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
