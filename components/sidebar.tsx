"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/advisory", label: "Advisory" },
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
                sometimes Prague
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
        </ul>
      </nav>

      {/* Social Links at bottom */}
      <div className="px-8 pb-10">
        <div className="flex items-center gap-5 text-muted-foreground">
          <a
            href="https://twitter.com/tereza_tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:text-foreground transition-colors"
          >
            X
          </a>
          <a
            href="https://linkedin.com/in/tereza-tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:text-foreground transition-colors"
          >
            LI
          </a>
          <a
            href="https://github.com/tereza-org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:text-foreground transition-colors"
          >
            GH
          </a>
          <a
            href="https://terezatizkova.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:text-foreground transition-colors"
          >
            SS
          </a>
        </div>
      </div>
    </aside>
  )
}
