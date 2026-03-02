import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Users, Megaphone, Target, MessageSquare, BarChart3, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advisory',
  description: 'Work with me on growth, developer tools, and go-to-market strategy',
}

const services = [
  {
    icon: Target,
    title: 'Growth Strategy',
    description: 'Figure out what channels work for your product and how to scale them.',
  },
  {
    icon: Megaphone,
    title: 'Developer Tools Positioning',
    description: 'Craft messaging that resonates with developers without feeling salesy.',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Build authentic communities around your product that drive growth.',
  },
  {
    icon: BarChart3,
    title: 'Go-to-Market',
    description: 'Plan and execute launches that get attention and convert users.',
  },
  {
    icon: MessageSquare,
    title: 'Developer Relations',
    description: 'Set up DevRel programs that build trust and drive adoption.',
  },
  {
    icon: Lightbulb,
    title: 'Content Strategy',
    description: 'Create content that educates, builds authority, and generates leads.',
  },
]

const stats = [
  { value: '20K+', label: 'Newsletter subscribers' },
  { value: '15K+', label: 'Twitter/X followers' },
  { value: '8K+', label: 'LinkedIn connections' },
]

export default function AdvisoryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-6">
            Advisory & Consulting
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
            Let's figure out your growth together
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            I've spent 2.5 years building growth and DevRel at E2B, helped launch 
            AI courses with DeepLearning.ai, and grown my own audience to 20,000+ 
            across platforms. Now I help startups do the same.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:tereza.tizkova@gmail.com?subject=Advisory%20Inquiry"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
            >
              Learn more about me
            </Link>
          </div>
        </div>
      </section>

      {/* What I Help With */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            What I help with
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors"
              >
                <service.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Stats */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-8 text-center">
            My audience reach
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Location */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight mb-4">
                How it works
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I typically work on a project basis. We start with a discovery call 
                  to understand your challenges, then I put together a proposal.
                </p>
                <p>
                  <span className="text-foreground font-medium">Packages start at $500</span> for 
                  focused consulting sessions. Longer engagements available for ongoing advisory work.
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight mb-4">
                Where I'm based
              </h2>
              <p className="text-muted-foreground mb-4">
                I split my time between <span className="text-foreground font-medium">San Francisco</span>, 
                <span className="text-foreground font-medium"> Prague</span>, and 
                <span className="text-foreground font-medium"> Berlin</span>. Happy to meet 
                in person if we're in the same city, or work async.
              </p>
              <p className="text-muted-foreground">
                Most of my clients are US or EU-based tech companies building developer tools, 
                AI products, or technical B2B SaaS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Sounds like a fit?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Drop me a message with a bit about what you're working on. 
          No formal pitch deck needed - just tell me what's on your mind.
        </p>
        <Link
          href="mailto:tereza.tizkova@gmail.com?subject=Advisory%20Inquiry"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105"
        >
          Send me an email
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
