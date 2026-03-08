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
  { href: "/advisory", label: "Advisory" },
]

const socialLinks = [
  { 
    href: "https://x.com/tereza_tizkova", 
    label: "X", 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="14" cy="18" rx="8" ry="6" />
        <circle cx="22" cy="14" r="5" />
        <circle cx="24" cy="13" r="1" fill="currentColor" />
        <path d="M27 14l4-1-4-1" />
        <path d="M10 14c2-3 6-3 8 0" />
        <path d="M6 17l-4-2" />
        <path d="M6 19l-5 0" />
        <path d="M6 21l-4 2" />
      </svg>
    )
  },
  { 
    href: "https://www.linkedin.com/in/tereza-tizkova-568439174/", 
    label: "LI", 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="18" r="10" />
        <path d="M10 10l6-8 6 8" />
        <circle cx="16" cy="2" r="2" fill="currentColor" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
        <circle cx="20" cy="16" r="1.5" fill="currentColor" />
        <circle cx="16" cy="20" r="3" />
        <path d="M10 24c2 2 4 3 6 3s4-1 6-3" />
      </svg>
    )
  },
  { 
    href: "https://terezatizkova.substack.com/", 
    label: "SS", 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 30l10-20" />
        <path d="M16 10c4-6 10-8 12-8-2 4-4 10-12 12-4-1-4-1 0-4" />
        <path d="M18 8c2-2 4-3 6-3" />
        <path d="M17 11c2-1 4-2 5-2" />
        <path d="M6 30l-2 1" />
      </svg>
    )
  },
  { 
    href: "https://github.com/tizkovatereza", 
    label: "GH", 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 8L2 16l8 8" />
        <path d="M22 8l8 8-8 8" />
        <path d="M19 6l-6 20" />
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
