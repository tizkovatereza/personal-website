import { Metadata } from "next"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-posts"
import { ArrowUpRight } from "lucide-react"
import { SubscribeForm } from "@/components/subscribe-form"

export const metadata: Metadata = {
  title: "Writing | Tereza Tizkova",
  description: "Writing about AI, growth, startups, and life",
  openGraph: {
    title: 'Writing',
    description: 'Writing about AI, growth, startups, and life',
    images: [{ url: 'https://www.terezatizkova.com/api/og?title=Writing&subtitle=AI%2C%20growth%2C%20startups%2C%20and%20life', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.terezatizkova.com/api/og?title=Writing&subtitle=AI%2C%20growth%2C%20startups%2C%20and%20life'],
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-16 max-w-4xl">
        <header>
          <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            Writing
          </h1>
          <p className="font-light text-[15px] sm:text-[17px] text-secondary leading-relaxed max-w-xl mb-6">
            Roast my writing. I would be grateful for any constructive criticism, debate, or ideas you have about writing in general. Always want to{" "}
            <a 
              href="mailto:tereza.tizkova@gmail.com" 
              className="text-primary hover:underline cursor-pointer"
            >
              connect
            </a>{" "}
            with fellow writers.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <SubscribeForm variant="button" />
            <a
              href="https://terezatizkova.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-mono font-light text-muted-foreground border border-border hover:border-primary/30 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
              See my Substack
            </a>
          </div>
        </header>
      </div>

      {/* Posts List - solid background, no image */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pb-24 max-w-4xl">
        <div className="flex flex-col">
          {blogPosts.filter(post => !post.draft).map((post, index) => {
            const LinkComponent = post.isInternal ? Link : 'a'
            const linkProps = post.isInternal 
              ? { href: post.url }
              : { href: post.url, target: "_blank", rel: "noopener noreferrer" }
            
            return (
              <LinkComponent
                key={index}
                {...linkProps}
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8 py-6 border-b border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors leading-tight mb-2 flex items-center gap-2">
                    {post.title}
                    {post.isNew && (
                      <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-[9px] font-mono uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </h2>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] sm:text-[14px] font-light text-muted-foreground line-clamp-1">
                      {post.subtitle}
                    </p>
                    {post.label && (
                      <span className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[9px] font-mono uppercase tracking-wider whitespace-nowrap">
                        {post.label}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-mono text-[10px] sm:text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
                    {post.date.replace(/-/g, '.')}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                </div>
              </LinkComponent>
            )
          })}
        </div>
      </div>
    </div>
  )
}
