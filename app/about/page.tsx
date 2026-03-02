import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SubscribeForm } from '@/components/subscribe-form'
import { ArrowRight, MapPin, Sparkles, BookOpen, Snowflake } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Tereza Tizkova',
}

const timeline = [
  {
    year: '2024',
    title: 'O-1 Visa Holder',
    description: 'Recognized for extraordinary ability in technology and business.',
  },
  {
    year: '2021-2024',
    title: 'E2B - Growth & DevRel',
    description: 'Founding team member. Built growth from zero, established developer relations, shaped product positioning.',
  },
  {
    year: '2023',
    title: 'DeepLearning.ai Collaboration',
    description: 'Co-created AI course reaching thousands of developers worldwide.',
  },
  {
    year: '2020',
    title: 'Math Graduate',
    description: 'Studied mathematics with a focus on logic and abstract thinking.',
  },
]

const interests = [
  { icon: Snowflake, label: 'Snowflakes', description: 'I find them endlessly fascinating' },
  { icon: BookOpen, label: 'Curated reading', description: 'Quality over quantity' },
  { icon: Sparkles, label: 'Writing', description: 'Thinking in public' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Photo */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 mx-auto md:mx-0">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl transform rotate-3" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-secondary border-4 border-background shadow-xl">
              <Image
                src="/images/tereza-about.jpg"
                alt="Tereza Tizkova"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              About me
            </h1>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Hi! I'm Tereza, a math graduate turned growth person. I spent 2.5 years 
                as a founding member at <strong className="text-foreground">E2B</strong>, 
                where I built and led growth and developer relations from scratch.
              </p>
              <p>
                These days, I work on growth for developer tools, teach AI courses 
                (including a collaboration with DeepLearning.ai), and write about 
                tech, startups, and life.
              </p>
              <p>
                I'm an <strong className="text-foreground">O-1 visa holder</strong> based 
                between San Francisco, Prague, and Berlin. I like building things that 
                help people learn and create.
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">San Francisco / Prague / Berlin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            Journey so far
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {item.year.slice(2)}
                  </div>
                  {index !== timeline.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-sm text-muted-foreground mb-1">{item.year}</p>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal touches */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Things I like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {interests.map((interest) => (
            <div
              key={interest.label}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors"
            >
              <interest.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-1">{interest.label}</h3>
              <p className="text-sm text-muted-foreground">{interest.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Want to chat?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            I love meeting new people. Whether you want to collaborate, 
            ask questions, or just say hi - my inbox is open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:tereza.tizkova@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105"
            >
              Send me an email
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/advisory"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
            >
              Work with me
            </Link>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="container mx-auto max-w-3xl px-4 py-16">
        <SubscribeForm />
      </section>
    </div>
  )
}
