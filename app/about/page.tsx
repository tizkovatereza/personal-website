import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Tereza Tizkova',
  description: 'About Tereza Tizkova',
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
  {
    year: '2017—',
    title: 'Discover Academy',
    description: 'Lecturer at non-profit summer school for talented Czech and Slovak high schoolers. Teaching graduate-level math in interactive, debate-based lessons to 400+ students annually.',
    location: 'Slovakia',
  },
]

const interests = [
  { label: 'Snowflakes', description: 'Endlessly fascinating fractals' },
  { label: 'Reading', description: 'Quality over quantity' },
  { label: 'Writing', description: 'Thinking in public' },
  { label: 'Cheese', description: 'The good kind' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <div className="px-12 md:px-16 lg:px-20 py-24 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            About
          </h1>
          <p className="font-light text-[17px] text-secondary leading-relaxed max-w-xl">
            Math graduate turned growth person. Building the future with machines.
          </p>
        </header>

        {/* Photo + Bio Section */}
        <section className="flex flex-col md:flex-row gap-12 mb-20">
          {/* Photo */}
          <div className="w-64 h-80 md:w-72 md:h-96 flex-shrink-0 relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.06)]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/terezatizkova-V4mrDoldfMzg3b62GNbHm05511hB3V.jpeg"
              alt="Tereza Tizkova"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Bio */}
          <div className="flex-1 space-y-6">
            <div className="space-y-5 text-secondary font-light text-[16px] leading-[1.8]">
              <p>
                Hi! I'm Tereza, a math graduate turned growth person. I spent 2.5 years 
                as a founding member at <span className="text-primary">E2B</span>, 
                where I built and led growth and developer relations from scratch.
              </p>
              <p>
                These days, I work on growth for developer tools, teach AI courses 
                (including a collaboration with <span className="text-foreground">DeepLearning.AI</span>), 
                and write about tech, startups, and life.
              </p>
              <p>
                I'm an <span className="text-primary">O-1 visa holder</span> based 
                between San Francisco, Prague, and Berlin. I like building things that 
                help people learn and create.
              </p>
            </div>
            
            <div className="flex items-center gap-2 pt-4">
              <span className="w-4 h-px bg-primary" />
              <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
                SF / Prague / Berlin
              </span>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-20" />

        {/* Timeline */}
        <section className="mb-20">
          <h2 className="font-serif text-[32px] tracking-[-0.02em] mb-10">Timeline</h2>
          
          <div className="relative pl-8 border-l border-[rgba(255,255,255,0.1)]">
            {timeline.map((item, index) => (
              <div key={index} className="relative pb-12 last:pb-0">
                {/* Node */}
                <div className="absolute left-0 -translate-x-[calc(50%+0.5px)] w-2 h-2 bg-primary rounded-full" />
                
                {/* Content */}
                <div className="pl-8">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-[11px] font-light text-primary tracking-[0.05em] uppercase">{item.year}</span>
                    <span className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">{item.location}</span>
                  </div>
                  <h3 className="font-serif text-[20px] tracking-[-0.01em] mb-2">{item.title}</h3>
                  <p className="text-[14px] font-light text-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-20" />

        {/* Interests */}
        <section className="mb-20">
          <h2 className="font-serif text-[32px] tracking-[-0.02em] mb-10">Interests</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {interests.map((interest) => (
              <div
                key={interest.label}
                className="p-6 bg-[#0f1420] border border-[rgba(255,255,255,0.06)] rounded-lg"
              >
                <h3 className="font-serif text-[18px] tracking-[-0.01em] mb-2">{interest.label}</h3>
                <p className="text-[13px] font-light text-muted-foreground">{interest.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.06)] mb-20" />

        {/* CTA */}
        <section className="p-10 bg-[#0f1420] border border-[rgba(255,255,255,0.06)] rounded-xl">
          <h2 className="font-serif text-[28px] tracking-[-0.02em] mb-4">Get in touch</h2>
          <p className="font-light text-[15px] text-secondary leading-relaxed mb-8 max-w-lg">
            I love meeting new people. Whether you want to collaborate, 
            ask questions, or just say hi — my inbox is open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:tereza.tizkova@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase rounded-lg hover:bg-primary/90 transition-colors"
            >
              Send email
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/advisory"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[rgba(255,255,255,0.1)] text-foreground font-mono text-[11px] font-light tracking-[0.05em] uppercase rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              Work with me
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
