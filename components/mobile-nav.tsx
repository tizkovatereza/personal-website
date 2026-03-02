"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/blog", label: "LOG" },
  { href: "/advisory", label: "ADVISORY" },
]

const socialLinks = [
  { href: "https://twitter.com/tereza_tizkova", label: "X" },
  { href: "https://linkedin.com/in/tereza-tizkova", label: "LI" },
  { href: "https://github.com/tereza-org", label: "GH" },
  { href: "https://terezatizkova.substack.com", label: "SS" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/tereza-photo.jpg"
            alt="Tereza Tizkova"
            width={32}
            height={32}
            className="object-cover grayscale"
          />
          <span className="font-display text-sm font-bold tracking-wider uppercase">TEREZA</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-14">
          <nav className="p-6 h-full flex flex-col">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href))
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 font-mono text-sm tracking-widest transition-colors border ${
                        isActive 
                          ? "border-primary text-primary bg-primary/5" 
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 ${isActive ? 'bg-primary signal-dot' : 'bg-muted-foreground'}`} />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto pt-8 border-t border-border space-y-6">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 border border-border font-mono text-xs text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              
              <ThemeToggle />
              
              {/* Status */}
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-primary signal-dot" />
                <span>online</span>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-14" />
    </div>
  )
}
