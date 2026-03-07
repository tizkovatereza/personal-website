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
  { href: "https://x.com/tereza_tizkova", label: "X" },
  { href: "https://www.linkedin.com/in/tereza-tizkova-568439174/", label: "LI" },
  { href: "https://github.com/tizkovatereza", label: "GH" },
  { href: "https://terezatizkova.substack.com/", label: "SS" },
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
                    className="font-mono text-[11px] font-light tracking-[0.05em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              
              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="w-[5px] h-[5px] bg-primary rounded-full pulse-dot" />
                <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
                  Currently building at E2B
                </span>
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
