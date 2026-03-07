"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[280px] bg-background border-r border-border">
      {/* Profile Photo */}
      <Link href="/" className="block relative">
        <div className="aspect-square w-full overflow-hidden relative">
          <Image
            src="/images/tereza-photo.jpg"
            alt="Tereza Tizkova"
            width={280}
            height={280}
            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            priority
          />
          {/* Scanlines overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.2) 2px, rgba(0, 0, 0, 0.2) 4px)',
            }}
          />
        </div>
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-foreground/30" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-foreground/30" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-foreground/30" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-foreground/30" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-4 flex items-center gap-2">
          <div className="w-8 h-[1px] bg-border" />
          <span className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase">Navigation</span>
          <div className="flex-1 h-[1px] bg-border" />
        </div>
        <ul className="space-y-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-[11px] tracking-[0.2em] transition-colors border-l-2 ${
                    isActive 
                      ? "border-foreground text-foreground bg-muted" 
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="opacity-40">{'>'}</span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-4">
        {/* Social Links */}
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 border border-border text-[10px] tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground uppercase tracking-[0.15em]">
            <span className="w-1 h-1 bg-foreground" />
            <span>Online</span>
          </div>
          <span className="text-[9px] text-muted-foreground tracking-wider">//////</span>
        </div>
      </div>
    </aside>
  )
}
