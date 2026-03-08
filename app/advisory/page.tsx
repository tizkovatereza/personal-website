import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advisory | Tereza Tizkova',
  description: 'Let\'s build something together',
}

const services = [
  {
    title: 'Growth Strategy',
    description: 'Figure out what channels work for your product and how to scale them.',
  },
  {
    title: 'DevTools Positioning',
    description: 'Craft messaging that resonates with developers without feeling salesy.',
  },
  {
    title: 'Community Building',
    description: 'Build authentic communities around your product that drive growth.',
  },
  {
    title: 'Go-to-Market',
    description: 'Plan and execute launches that get attention and convert users.',
  },
  {
    title: 'Developer Relations',
    description: 'Set up DevRel programs that build trust and drive adoption.',
  },
  {
    title: 'Content Strategy',
    description: 'Create content that educates, builds authority, and generates leads.',
  },
]

const stats = [
  { value: '40K+', label: 'Newsletter' },
  { value: '11K+', label: 'X/Twitter' },
  { value: '8K+', label: 'LinkedIn' },
  { value: '20K+', label: 'GitHub Stars' },
]

export default function AdvisoryPage() {
  return (
    <div className="min-h-screen relative">
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            Advisory
          </h1>
          <p className="font-light text-[15px] sm:text-[17px] text-secondary leading-relaxed max-w-xl mb-10">
            I help startups figure out growth, developer tools positioning, and go-to-market strategy. Let's build something together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:tereza.tizkova@gmail.com?subject=Advisory%20Inquiry"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:bg-primary/90 transition-colors"
            >
              Get in touch
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[rgba(255,255,255,0.1)] text-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:border-primary hover:text-primary transition-colors"
            >
              About me
            </Link>
          </div>
        </header>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-16" />

        {/* Services Grid */}
        <section className="mb-20">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-10">Services</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-[#0f1420]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                  <h3 className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">{service.title}</h3>
                </div>
                <p className="text-[13px] sm:text-[14px] font-light text-secondary leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-16" />

        {/* Stats */}
        <section className="mb-20">
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.02em] mb-10">Audience</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 bg-[#0f1420]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)] text-center">
                <p className="font-serif text-[28px] sm:text-[36px] tracking-[-0.02em] text-primary mb-1">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-16" />

        {/* How it works + Location */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="p-6 sm:p-8 bg-[#0f1420]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)]">
            <h3 className="font-serif text-[20px] sm:text-[22px] tracking-[-0.01em] mb-4">How it works</h3>
            <div className="space-y-4 text-[13px] sm:text-[14px] font-light text-secondary leading-relaxed">
              <p>
                I typically work on a project basis. We start with a discovery call 
                to understand your challenges, then I put together a proposal.
              </p>
              <p>
                <span className="text-primary">Packages start at $500</span> for 
                focused consulting sessions. Longer engagements available for ongoing advisory work.
              </p>
            </div>
          </div>
          
          <div className="p-6 sm:p-8 bg-[#0f1420]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)]">
            <h3 className="font-serif text-[20px] sm:text-[22px] tracking-[-0.01em] mb-4">Location</h3>
            <div className="space-y-4 text-[13px] sm:text-[14px] font-light text-secondary leading-relaxed">
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
        <section className="p-8 sm:p-10 bg-[#0f1420]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.06)]">
          <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.02em] mb-4">Ready to connect?</h2>
          <p className="font-light text-[14px] sm:text-[15px] text-secondary leading-relaxed mb-8 max-w-lg">
            Drop me a message with a bit about what you're working on. 
            No formal pitch deck needed — just tell me what's on your mind.
          </p>
          <Link
            href="mailto:tereza.tizkova@gmail.com?subject=Advisory%20Inquiry"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase hover:bg-primary/90 transition-colors"
          >
            Send message
            <ArrowRight className="h-3 w-3" />
          </Link>
        </section>

      </div>
    </div>
  )
}
