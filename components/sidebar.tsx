"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/advisory", label: "Advisory" },
]

const socialLinks = [
  { href: "https://twitter.com/tereza_tizkova", label: "Twitter" },
  { href: "https://linkedin.com/in/tereza-tizkova", label: "LinkedIn" },
  { href: "https://github.com/tereza-org", label: "GitHub" },
  { href: "https://terezatizkova.substack.com", label: "Substack" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[260px] bg-background border-r border-border">
      {/* Header with name */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="block group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
              <Image
                src="/images/tereza-photo.jpg"
                alt="Tereza Tizkova"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div>
              <h1 className="font-serif text-lg font-medium group-hover:text-primary transition-colors">
                Tereza Tizkova
              </h1>
              <p className="font-mono text-[10px] text-muted-foreground tracking-wide">
                Growth · E2B · SF
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 text-sm transition-colors ${
                    isActive 
                      ? "text-primary bg-primary/5 border-l-2 border-primary -ml-[2px] pl-[14px]" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
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
        <div className="space-y-1">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label} →
            </a>
          ))}
        </div>
        
        <div className="pt-2 border-t border-border">
          <ThemeToggle />
        </div>
        
        {/* Status */}
        <div className="flex items-center gap-2 px-3">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full pulse-dot" />
          <span className="font-mono text-[10px] text-muted-foreground">
            Available for advisory
          </span>
        </div>
      </div>
    </aside>
  )
}
