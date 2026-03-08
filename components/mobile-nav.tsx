"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/work-with-me", label: "Work With Me" },
]

const socialLinks = [
  { 
    href: "https://x.com/tereza_tizkova", 
    label: "X", 
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="18" cy="24" rx="10" ry="8" />
        <circle cx="28" cy="16" r="6" />
        <circle cx="30" cy="15" r="1.2" fill="currentColor" />
        <path d="M34 16l4-1.5-4-1.5" />
        <ellipse cx="16" cy="22" rx="6" ry="4" />
        <path d="M12 20c2-1 4-1 6 0" />
        <path d="M12 22c2-0.5 4-0.5 6 0" />
        <path d="M13 24c1.5 0 3 0 4.5 0" />
        <path d="M8 24l-5-3" />
        <path d="M8 26l-6-1" />
        <path d="M8 28l-5 2" />
        <path d="M16 32v5" />
        <path d="M14 37h4" />
        <path d="M21 32v4" />
        <path d="M19 36h4" />
      </svg>
    )
  },
  { 
    href: "https://www.linkedin.com/in/tereza-tizkova-568439174/", 
    label: "LI", 
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="22" r="12" />
        <path d="M12 12l8-10 8 10" />
        <path d="M14 10l6-6" />
        <path d="M18 11l4-5" />
        <circle cx="20" cy="2" r="2.5" fill="currentColor" />
        <ellipse cx="14" cy="20" rx="2.5" ry="3" />
        <circle cx="14.5" cy="20" r="1" fill="currentColor" />
        <ellipse cx="26" cy="20" rx="2.5" ry="3" />
        <circle cx="26.5" cy="20" r="1" fill="currentColor" />
        <circle cx="20" cy="25" r="3.5" />
        <circle cx="20" cy="25" r="2" fill="currentColor" />
        <path d="M12 30c3 4 5 5 8 5s5-1 8-5" />
        <path d="M8 18c-2-1-3 0-3 2s1 3 2 2" />
        <path d="M7 22c-2 0-3 1-2 3s2 2 3 1" />
        <path d="M32 18c2-1 3 0 3 2s-1 3-2 2" />
        <path d="M33 22c2 0 3 1 2 3s-2 2-3 1" />
      </svg>
    )
  },
  { 
    href: "https://terezatizkova.substack.com/", 
    label: "SS", 
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 38l12-24" />
        <path d="M20 14c2-4 6-8 10-10 2-1 4-1 5 0 0 2-1 4-3 7-3 5-8 9-14 10" />
        <path d="M20 14l10-10" />
        <path d="M21 12c-1-1-2-1-3 0" />
        <path d="M23 9c-1-1-2.5-0.5-3 0" />
        <path d="M25 6c-1-1-2-0.5-2.5 0.5" />
        <path d="M28 4c-1-0.5-1.5 0-2 1" />
        <path d="M22 13c1-1 2-1.5 3-1" />
        <path d="M24 10c1-1 2.5-1.5 3.5-1" />
        <path d="M27 7c1-1 2-1 3-0.5" />
        <path d="M30 5c0.5-0.5 1.5-0.5 2 0" />
        <path d="M8 38l-2 1.5" />
        <path d="M6 39.5l3 0" />
        <circle cx="5" cy="38" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  { 
    href: "https://github.com/tizkovatereza", 
    label: "GH", 
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="36" height="32" rx="3" />
        <path d="M2 12h36" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="14" cy="8" r="1.5" fill="currentColor" />
        <circle cx="20" cy="8" r="1.5" fill="currentColor" />
        <path d="M10 20l-4 4 4 4" />
        <path d="M30 20l4 4-4 4" />
        <path d="M22 18l-4 12" />
        <path d="M24 30h4" />
      </svg>
    )
  },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17]/95 backdrop-blur-sm border-b border-[rgba(255,255,255,0.06)] px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-4 h-px bg-primary" />
          <span className="font-serif text-base tracking-[-0.02em] text-foreground">Tereza Tizkova</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0e17] pt-16">
          <nav className="p-6 h-full flex flex-col">
            {/* Location */}
            <div className="flex items-center gap-2 mb-8">
              <span className="w-4 h-px bg-primary" />
              <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">
                San Francisco / Prague
              </span>
            </div>
            
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href))
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 text-[17px] font-light transition-colors ${
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

            <div className="mt-auto pt-8 border-t border-[rgba(255,255,255,0.06)] space-y-6">
              {/* Social Links */}
              <div className="flex items-center gap-5">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </div>
  )
}
