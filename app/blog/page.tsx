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
    <div className="mx-auto min-h-screen max-w-[56rem] px-6 pb-24 pt-12 sm:px-10 sm:pt-16 lg:pt-20">
      <header className="mb-9 space-y-5">
        <div>
          <h1 className="mb-3 text-[44px] leading-none sm:text-[52px] lg:text-[60px]">Writing</h1>
          <p className="max-w-[51ch] text-[18px] leading-[1.55] text-secondary sm:text-[20px]">
            Roast my writing. I would be grateful for any constructive criticism, debate, or ideas you have about writing in general. Always want to{" "}
            <a href="mailto:tereza.tizkova@gmail.com" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              connect
            </a>{" "}
            with fellow writers.
          </p>
        </div>
        <aside aria-label="Writing subscriptions" className="flex flex-wrap items-center gap-x-5 gap-y-3 [&>form]:w-full sm:[&>form]:w-auto">
          <SubscribeForm variant="button" layout="vertical" />
          <a
            href="https://terezatizkova.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-secondary underline decoration-border underline-offset-4 hover:text-foreground"
          >
            Substack archive
          </a>
        </aside>
      </header>
      <BlogList posts={posts} />
    </div>
  )
}
