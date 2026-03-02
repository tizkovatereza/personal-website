import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SubscribeForm } from '@/components/subscribe-form'
import { ArrowRight, MapPin, Snowflake, BookOpen, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'The coordinates of Tereza Tizkova',
}

const timeline = [
  {
    year: '2024',
    title: 'O-1 Visa Holder',
    description: 'Recognized for extraordinary ability in technology and business.',
    location: 'USA',
  },
  {
    year: '2021',
    title: 'E2B - Growth & DevRel',
    description: 'Founding team member. Built growth from zero, established developer relations, shaped product positioning.',
    location: 'SF / Prague',
  },
  {
    year: '2023',
    title: 'DeepLearning.AI',
    description: 'Co-created AI course reaching thousands of developers worldwide.',
    location: 'Remote',
  },
  {
    year: '2020',
    title: 'McKinsey & Company',
    description: 'Management consultant advising on growth strategy in banking, energy, and telecom.',
    location: 'Prague',
  },
  {
    year: '2019',
    title: 'Math Graduate',
    description: 'Master\'s in pure mathematics. Bachelor\'s in marketing & economics.',
    location: 'Prague',
  },
]

const interests = [
  { icon: Snowflake, label: 'SNOWFLAKES', description: 'Endlessly fascinating fractals' },
  { icon: BookOpen, label: 'READING', description: 'Quality over quantity' },
  { icon: Sparkles, label: 'WRITING', description: 'Thinking in public' },
]

export default function AboutPage() {
  return (
    <div className="px-6 py-12 lg:px-12 lg:py-16 max-w-5xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 bg-secondary signal-dot" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">PERSONNEL FILE</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider uppercase mb-4">
          ABOUT
        </h1>
      </header>

      {/* Photo + Bio Section */}
      <section className="flex flex-col md:flex-row gap-12 mb-16">
        {/* Photo with film grain */}
        <div className="w-64 h-64 md:w-72 md:h-72 flex-shrink-0 relative film-grain">
          <div className="absolute inset-0 border border-border" />
          <Image
            src="/images/tereza-about.jpg"
            alt="Tereza Tizkova"
            fill
            className="object-cover grayscale"
            priority
          />
        </div>

        {/* Bio */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Hi! I&apos;m Tereza, a math graduate turned growth person. I spent 2.5 years 
              as a founding member at <strong className="text-primary">E2B</strong>, 
              where I built and led growth and developer relations from scratch.
            </p>
            <p>
              These days, I work on growth for developer tools, teach AI courses 
              (including a collaboration with <strong className="text-secondary">DeepLearning.AI</strong>), 
              and write about tech, startups, and life.
            </p>
            <p>
              I&apos;m an <strong className="text-primary">O-1 visa holder</strong> based 
              between San Francisco, Prague, and Berlin. I like building things that 
              help people learn and create.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-widest">
            <MapPin className="h-3 w-3" />
            <span>SF / PRAGUE / BERLIN</span>
          </div>
        </div>
      </section>

      {/* Dashed Divider */}
      <div className="dashed-divider mb-16" />

      {/* Timeline - Vertical constellation style */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-primary signal-dot" />
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">TRAJECTORY</h2>
        </div>
        
        <div className="relative pl-8 timeline-line">
          {timeline.map((item, index) => (
            <div key={index} className="relative pb-10 last:pb-0">
              {/* Node */}
              <div className="absolute left-0 -translate-x-1/2 w-3 h-3 border-2 border-primary bg-background" />
              
              {/* Content */}
              <div className="pl-8">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">{item.year}</span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{item.location}</span>
                </div>
                <h3 className="font-display text-lg font-bold tracking-wide uppercase mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashed Divider */}
      <div className="dashed-divider mb-16" />

      {/* Interests */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-secondary signal-dot" />
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">INTERESTS</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {interests.map((interest) => (
            <div
              key={interest.label}
              className="p-6 bg-card border border-border glow-border"
            >
              <interest.icon className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-mono text-xs tracking-widest uppercase mb-2">{interest.label}</h3>
              <p className="text-sm text-muted-foreground">{interest.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashed Divider */}
      <div className="dashed-divider mb-16" />

      {/* CTA */}
      <section className="mb-16 p-8 bg-card border border-border">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 bg-primary blink" />
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">OPEN CHANNEL</h2>
        </div>
        <p className="text-muted-foreground mb-6 max-w-lg">
          I love meeting new people. Whether you want to collaborate, 
          ask questions, or just say hi — my inbox is open.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="mailto:tereza.tizkova@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            SEND EMAIL
            <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href="/advisory"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground font-mono text-xs tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
          >
            WORK WITH ME
          </Link>
        </div>
      </section>

      {/* Subscribe */}
      <section>
        <SubscribeForm />
      </section>
    </div>
  )
}
