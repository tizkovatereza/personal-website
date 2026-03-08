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
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 24c4-1 8 0 12-1s8-2 14-1" />
        <path d="M22 22c1 1 2 1.5 3 1" />
        <ellipse cx="14" cy="16" rx="6" ry="5" />
        <circle cx="19" cy="12" r="3.5" />
        <circle cx="20" cy="11.5" r="0.8" fill="currentColor" />
        <path d="M22.5 12.5l3 0.5-2.5 1" />
        <path d="M8 15c-2-1-4-0.5-5 1" />
        <path d="M8 17c-2 0-4 1-5 2" />
        <path d="M8 16c-3 0-5 0.5-6 1" />
        <path d="M11 14c1-1 3-1 4 0" />
        <path d="M12 21v3" />
        <path d="M15 21v2.5" />
      </svg>
    )
  },
  { 
    href: "https://www.linkedin.com/in/tereza-tizkova-568439174/", 
    label: "LI", 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 17c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10" />
        <path d="M10 8l6-6 6 6" />
        <path d="M12 6l4-3" />
        <path d="M16 3c0.5-1 1-1.5 1.5-1" />
        <circle cx="12" cy="15" r="2" />
        <circle cx="20" cy="15" r="1.5" />
        <circle cx="12.5" cy="14.5" r="0.5" fill="currentColor" />
        <circle cx="20.2" cy="14.5" r="0.5" fill="currentColor" />
        <circle cx="16" cy="18" r="2.5" />
        <path d="M10 22c2 3 4 4 6 4s4-1 6-4" />
        <circle cx="8" cy="18" r="1.5" />
        <circle cx="24" cy="18" r="1.5" />
      </svg>
    )
  },
  { 
    href: "https://terezatizkova.substack.com/", 
    label: "SS", 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 28l6-14" />
        <path d="M14 14c2-4 6-8 12-12" />
        <path d="M14 14c4-2 10-4 12-12" />
        <path d="M15 12c-1-1-1.5-0.5-2 0" />
        <path d="M17 9c-1.5-1-2 0-2.5 0.5" />
        <path d="M19 6c-1-1-2-0.5-2.5 0" />
        <path d="M21 4c-1-0.5-1.5 0-2 0.5" />
        <path d="M16 13c0.5-1.5 1.5-1.5 2-1" />
        <path d="M18 10c1-1.5 2-1 2.5-0.5" />
        <path d="M20 7c1-1 2-0.5 2.5 0" />
        <path d="M23 4c0.5-0.5 1.5-0.5 2 0" />
        <path d="M8 28l-1 2" />
        <path d="M10 26l1 0.5" />
        <circle cx="6" cy="30" r="1" fill="currentColor" />
      </svg>
    )
  },
  { 
    href: "https://github.com/tizkovatereza", 
    label: "GH", 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6c0-1 1-2 2-2h20c1 0 2 1 2 2v20c0 1-1 2-2 2H6c-1 0-2-1-2-2V6z" />
        <path d="M4 10h24" />
        <circle cx="8" cy="8" r="1" />
        <circle cx="12" cy="8" r="1" />
        <circle cx="16" cy="8" r="1" />
        <path d="M9 16l-2 3 2 3" />
        <path d="M23 16l2 3-2 3" />
        <path d="M17 15l-3 8" />
        <path d="M19 22v2" />
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
