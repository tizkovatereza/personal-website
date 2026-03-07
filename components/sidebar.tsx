"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Log" },
  { href: "/advisory", label: "Advisory" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[200px] bg-background z-50">
      {/* Header with name */}
      <div className="px-6 pt-8 pb-6">
        <Link href="/" className="block">
          <h1 className="font-serif text-lg font-bold text-foreground">
            Tereza Tizkova
          </h1>
          <p className="font-mono text-[11px] text-muted-foreground tracking-wide mt-1">
            Growth · E2B · SF
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 pt-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-1.5 text-sm transition-colors ${
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
      <div className="px-6 pb-8">
        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href="https://twitter.com/tereza_tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] hover:text-foreground transition-colors"
          >
            X
          </a>
          <a
            href="https://linkedin.com/in/tereza-tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] hover:text-foreground transition-colors"
          >
            LI
          </a>
          <a
            href="https://github.com/tereza-org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] hover:text-foreground transition-colors"
          >
            GH
          </a>
          <a
            href="https://terezatizkova.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] hover:text-foreground transition-colors"
          >
            SS
          </a>
        </div>
      </div>
    </aside>
  )
}
