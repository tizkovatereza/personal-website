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
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-10 max-w-6xl">
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

        </header>
      </div>

      {/* Posts List with category filters */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pb-24 max-w-6xl">
        <BlogList posts={posts} sidebar={
          <div className="flex flex-col items-stretch gap-4">
            <SubscribeForm variant="button" layout="vertical" />
            <a
              href="https://terezatizkova.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 text-[12px] leading-relaxed font-mono font-light text-muted-foreground hover:text-primary transition-colors"
            >
              <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
              Substack archive
            </a>
          </div>
        } />
      </div>
    </div>
  )
}
