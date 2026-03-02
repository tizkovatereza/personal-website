import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { getAllPosts } from '@/lib/mdx'
import { PostCard } from '@/components/post-card'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Photo */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <div className="absolute inset-0 bg-primary/20 rounded-full transform rotate-6" />
            <div className="relative w-full h-full rounded-full overflow-hidden bg-secondary border-4 border-background shadow-lg">
              <Image
                src="/images/tereza-photo.jpg"
                alt="Tereza Tizkova"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Intro */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Hi, I'm Tereza
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              I work on growth for developer tools, teach AI courses, and write about 
              tech, startups, and life. Currently based between San Francisco, Prague, and Berlin.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://twitter.com/tereza_tizkova"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                aria-label="Twitter/X"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/terezatizkova"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/terezatizkova"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:tereza.tizkova@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Working On */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
              What I'm Working On
            </h2>
            <Link 
              href="/projects" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
            >
              See all
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProjectCardSmall
              title="Topics"
              description="A curated reading app for thoughtful people"
              link="https://apps.apple.com/app/topics"
              tag="App"
            />
            <ProjectCardSmall
              title="DeepLearning.ai Course"
              description="Teaching AI to developers around the world"
              link="https://deeplearning.ai"
              tag="Education"
            />
          </div>
        </div>
      </section>

      {/* Recent Writing */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
            Recent Writing
          </h2>
          <Link 
            href="/blog" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
          >
            Read all
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="space-y-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Work Together CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Want to work together?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            I advise startups on growth, developer tools, and go-to-market strategy.
          </p>
          <Link
            href="/advisory"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105"
          >
            Learn more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

function ProjectCardSmall({ 
  title, 
  description, 
  link, 
  tag 
}: { 
  title: string
  description: string
  link: string
  tag: string
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
        {tag}
      </span>
      <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </a>
  )
}
