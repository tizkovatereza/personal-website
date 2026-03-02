import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"

const projects = [
  {
    title: "Topics",
    category: "APP",
    image: "/images/project-topics.jpg",
    href: "/projects#topics",
  },
  {
    title: "DeepLearning.AI Course",
    category: "EDUCATION",
    image: "/images/project-deeplearning.jpg",
    href: "/projects#deeplearning",
  },
  {
    title: "Awesome AI Agents",
    category: "OPEN SOURCE",
    image: "/images/project-advent.jpg",
    href: "/projects#awesome-agents",
  },
  {
    title: "Advent of Writing",
    category: "COMMUNITY",
    image: "/images/project-advent.jpg",
    href: "/projects#advent",
  },
  {
    title: "Growth Talks",
    category: "CONSULTING",
    image: "/images/project-growth-talks.jpg",
    href: "/projects#growth-talks",
  },
  {
    title: "E2B",
    category: "STARTUP",
    image: "/images/project-topics.jpg",
    href: "/projects#e2b",
  },
]

const socialLinks = [
  { href: "https://twitter.com/tereza_tizkova", label: "X (Twitter)" },
  { href: "https://linkedin.com/in/tereza-tizkova", label: "LinkedIn" },
  { href: "https://github.com/tereza-org", label: "GitHub" },
  { href: "https://terezatizkova.substack.com", label: "Substack" },
]

export default function HomePage() {
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <div className="px-6 py-12 lg:px-12 lg:py-16 max-w-4xl">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)]">
          Hey, I&apos;m <span className="text-primary">TEREZA</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Growth Lead | Math Grad | Content Creator | Community Builder
        </p>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <p>
            I&apos;m a founding member and first hire at E2B, where I&apos;ve led growth, 
            marketing, and developer relations for 2.5 years — from zero to Series A. 
            Before that, I was a management consultant at McKinsey, advising on growth 
            strategy in banking, energy, and telecom.
          </p>
          <p>
            I have a master&apos;s in pure mathematics and two bachelor&apos;s degrees 
            (marketing & economics) from Charles University in Prague. I hold an O-1 visa 
            and split my time between San Francisco, Prague, and Berlin.
          </p>
          <p>
            I care deeply about building community and creating meaningful content. I have 
            40,000 newsletter subscribers, 11,000 Twitter followers, and have organized 
            events with 100-200 people across the US and Europe. I recorded a coding course 
            with Andrew Ng&apos;s DeepLearning.AI and created the Awesome AI Agents GitHub 
            repo (20,000+ stars).
          </p>
          <p>
            If I can be helpful or you&apos;d like to chat, please reach out!{" "}
            <a 
              href="mailto:tereza.tizkova@gmail.com" 
              className="text-primary hover:underline"
            >
              tereza.tizkova@gmail.com
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 mt-8 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          More about Me <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Dotted Divider */}
      <div className="dotted-divider mb-12" />

      {/* Recent Projects */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading text-xl font-[family-name:var(--font-space-grotesk)]">RECENT PROJECTS</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group w-[200px] flex-shrink-0"
              >
                <div className="aspect-square overflow-hidden mb-3 bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  {project.category}
                </span>
                <h3 className="text-sm font-medium mt-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dotted Divider */}
      <div className="dotted-divider mb-12" />

      {/* Latest Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading text-xl font-[family-name:var(--font-space-grotesk)]">LATEST POSTS</h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {recentPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <article className="flex gap-6">
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {post.date}
                  </p>
                  <p className="text-sm text-muted-foreground italic line-clamp-2">
                    {post.subtitle}
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
