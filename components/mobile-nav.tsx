"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ResumeDropdownMobile } from "./resume-dropdown"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
]

const socialLinks = [
  { 
    href: "https://x.com/tereza_tizkova", 
    label: "X", 
    icon: (
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
    )
  },
  { 
    href: "https://www.linkedin.com/in/tereza-tizkova-568439174/", 
    label: "LI", 
    icon: (
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
    )
  },
  { 
    href: "https://terezatizkova.substack.com/", 
    label: "SS", 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Pen body - angled */}
        <path d="M28 4l8 8-20 20H8v-8L28 4z" />
        {/* Pen tip divider */}
        <path d="M24 8l8 8" />
        {/* Writing line underneath */}
        <path d="M12 36h20" />
      </svg>
    )
  },
  { 
    href: "https://github.com/tizkovatereza", 
    label: "GH", 
    icon: (
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
    )
  },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === "/resume") return null

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-4 h-px bg-primary" />
          <span className="font-serif text-base tracking-[-0.02em] text-foreground">Tereza Tizkova</span>
        </Link>
        <div className="flex items-center gap-1">
          {/* In the bar, not just the menu: the header is fixed above the overlay,
              so this stays reachable whether the menu is open or closed. */}
          <a
            href="https://apps.apple.com/app/topics-curated-reading/id6759892878"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-1 text-[13px] font-medium text-primary whitespace-nowrap"
          >
            Download iOS App
          </a>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16">
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
              <li>
                <ResumeDropdownMobile onClose={() => setIsOpen(false)} />
              </li>
            </ul>

            <div className="mt-auto pt-8 border-t border-border space-y-6">
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
