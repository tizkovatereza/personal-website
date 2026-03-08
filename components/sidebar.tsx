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
            className="hover:text-foreground transition-colors"
            aria-label="X (Twitter)"
            title="X"
          >
            {/* Bird with Elon head */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19c2-1 5-2 7-1s3 0 5-2c1-1 2-2 2-4s-1-3-3-3c-1 0-2 1-2 2s0 2-1 2-2-1-2-2 1-4 3-5" />
              <ellipse cx="17" cy="5" rx="3" ry="2.5" />
              <circle cx="16" cy="4.5" r="0.5" fill="currentColor" />
              <path d="M19 5.5c.5.5 1 .5 1.5 0" />
              <path d="M5 16c-1 1-1 2.5 0 3s2 0 2-1" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/tereza-tizkova-568439174/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            {/* Clown head */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="13" r="8" />
              <circle cx="9" cy="11" r="1" fill="currentColor" />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
              <circle cx="12" cy="13" r="2.5" fill="currentColor" />
              <path d="M8 17c1.5 1.5 2.5 2 4 2s2.5-.5 4-2" />
              <path d="M7 5c0-1 1-2 2-2s2 1 2 2" />
              <path d="M13 5c0-1 1-2 2-2s2 1 2 2" />
              <circle cx="8" cy="5" r="1.5" fill="currentColor" />
              <circle cx="16" cy="5" r="1.5" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://terezatizkova.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="Substack"
            title="Substack"
          >
            {/* Vintage feather pen */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 2c-3 3-6 7-8 12l-6 8 1 1 8-6c5-2 9-5 12-8-2-2-5-5-7-7z" />
              <path d="M6 22l-3 1 1-3" />
              <path d="M15 5c-2 1-3 2-4 4" />
              <path d="M17 7c-1 1-2 2-3 3" />
              <path d="M12 9c2-3 4-5 8-7" />
            </svg>
          </a>
          <a
            href="https://github.com/tizkovatereza"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub"
            title="GitHub"
          >
            {/* Code brackets */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 4L2 12l6 8" />
              <path d="M16 4l6 8-6 8" />
              <path d="M14 4l-4 16" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
