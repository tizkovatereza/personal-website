import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Users, Megaphone, Target, MessageSquare, BarChart3, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advisory',
  description: 'Let\'s build something together',
}

const services = [
  {
    icon: Target,
    title: 'GROWTH STRATEGY',
    description: 'Figure out what channels work for your product and how to scale them.',
  },
  {
    icon: Megaphone,
    title: 'DEVTOOLS POSITIONING',
    description: 'Craft messaging that resonates with developers without feeling salesy.',
  },
  {
    icon: Users,
    title: 'COMMUNITY BUILDING',
    description: 'Build authentic communities around your product that drive growth.',
  },
  {
    icon: BarChart3,
    title: 'GO-TO-MARKET',
    description: 'Plan and execute launches that get attention and convert users.',
  },
  {
    icon: MessageSquare,
    title: 'DEVELOPER RELATIONS',
    description: 'Set up DevRel programs that build trust and drive adoption.',
  },
  {
    icon: Lightbulb,
    title: 'CONTENT STRATEGY',
    description: 'Create content that educates, builds authority, and generates leads.',
  },
]

const stats = [
  { value: '40K+', label: 'NEWSLETTER' },
  { value: '11K+', label: 'X/TWITTER' },
  { value: '8K+', label: 'LINKEDIN' },
  { value: '20K+', label: 'GITHUB STARS' },
]

export default function AdvisoryPage() {
  return (
    <div className="px-6 py-12 lg:px-12 lg:py-16 max-w-5xl dot-grid">
      {/* Header */}
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider uppercase mb-4">
          ADVISORY
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm mb-8">
          Let&apos;s build something together. I help startups figure out growth, developer tools positioning, and go-to-market strategy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="mailto:tereza.tizkova@gmail.com?subject=Advisory%20Inquiry"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            GET IN TOUCH
            <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground font-mono text-xs tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
          >
            ABOUT ME
          </Link>
        </div>
      </header>

      {/* Dashed Divider */}
      <div className="dashed-divider mb-12" />

      {/* Services Grid */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-secondary signal-dot" />
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">SERVICES</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 bg-card border border-border project-card-hover"
            >
              <service.icon className="h-5 w-5 text-primary mb-4" />
              <h3 className="font-mono text-xs tracking-widest uppercase mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashed Divider */}
      <div className="dashed-divider mb-12" />

      {/* Stats - Dashboard readouts */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-primary signal-dot" />
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">AUDIENCE</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 border border-border bg-card text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashed Divider */}
      <div className="dashed-divider mb-12" />

      {/* How it works + Location */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-secondary" />
            <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">HOW IT WORKS</h3>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              I typically work on a project basis. We start with a discovery call 
              to understand your challenges, then I put together a proposal.
            </p>
            <p>
              <span className="text-primary font-mono text-xs">PACKAGES START AT $500</span> for 
              focused consulting sessions. Longer engagements available for ongoing advisory work.
            </p>
          </div>
        </div>
        
        <div className="p-6 bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-primary" />
            <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">LOCATION</h3>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              I split my time between <span className="text-foreground">San Francisco</span>, 
              <span className="text-foreground"> Prague</span>, and 
              <span className="text-foreground"> Berlin</span>. Happy to meet 
              in person or work async.
            </p>
            <p>
              Most clients are US or EU-based tech companies building developer tools, 
              AI products, or technical B2B SaaS.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-8 bg-card border border-border">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 bg-primary blink" />
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">READY TO CONNECT?</h2>
        </div>
        <p className="text-muted-foreground mb-6 max-w-lg">
          Drop me a message with a bit about what you&apos;re working on. 
          No formal pitch deck needed — just tell me what&apos;s on your mind.
        </p>
        <Link
          href="mailto:tereza.tizkova@gmail.com?subject=Advisory%20Inquiry"
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
        >
          SEND MESSAGE
          <ArrowRight className="h-3 w-3" />
        </Link>
      </section>
    </div>
  )
}
