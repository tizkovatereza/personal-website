import { Metadata } from "next"
import { getWritingPosts } from "@/lib/writing-posts"
import { BlogList } from "@/components/blog-list"
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

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getWritingPosts()
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-16 max-w-5xl">
        <header>
          <h1 className="font-serif font-normal text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
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
              Substack — older, inactive
            </a>
          </div>
        </header>
      </div>

      {/* Posts List with category filters */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pb-24 max-w-5xl">
        <BlogList posts={posts} />
      </div>
    </div>
  )
}
