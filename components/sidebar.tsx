"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ResumeDropdown } from "./resume-dropdown"

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
          <li>
            <ResumeDropdown />
          </li>
        </ul>
      </nav>

      {/* Social Links at bottom */}
      <div className="px-8 pb-10">
        <span className="font-mono text-[10px] font-light text-muted-foreground tracking-[0.1em] uppercase mb-3 block">Links</span>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a
            href="https://x.com/tereza_tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="X (Twitter)"
            title="X"
          >
            {/* Bird - robin style */}
            <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="18" cy="24" rx="10" ry="8" />
              <circle cx="28" cy="16" r="6" />
              <circle cx="30" cy="15" r="1.5" fill="currentColor" />
              <path d="M34 16l4-1.5-4-1.5" />
              <ellipse cx="16" cy="22" rx="6" ry="4" />
              <path d="M8 24l-5-3" />
              <path d="M8 26l-6-1" />
              <path d="M8 28l-5 2" />
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
            {/* Clown face - smiling */}
            <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="20" cy="22" r="12" />
              <path d="M12 12l8-10 8 10" />
              <circle cx="20" cy="2" r="2.5" fill="currentColor" />
              <circle cx="14" cy="19" r="1.5" fill="currentColor" />
              <circle cx="26" cy="19" r="1.5" fill="currentColor" />
              <circle cx="20" cy="24" r="3" />
              {/* Big happy smile */}
              <path d="M13 29c2 3 4 4 7 4s5-1 7-4" />
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
            {/* Pen writing - angled with line */}
            <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Pen body - angled */}
              <path d="M28 4l8 8-20 20H8v-8L28 4z" />
              {/* Pen tip divider */}
              <path d="M24 8l8 8" />
              {/* Writing line underneath */}
              <path d="M12 36h20" />
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
            {/* Terminal window */}
            <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="36" height="32" rx="3" />
              <path d="M2 12h36" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <circle cx="14" cy="8" r="1.5" fill="currentColor" />
              <circle cx="20" cy="8" r="1.5" fill="currentColor" />
              <path d="M10 20l-4 4 4 4" />
              <path d="M30 20l4 4-4 4" />
              <path d="M22 18l-4 12" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
