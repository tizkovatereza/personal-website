import type { Metadata } from 'next'
import { AdvisoryForm } from '@/components/advisory-form'
import { AdvisoryTestimonials } from '@/components/advisory-testimonials'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Growth advisory', description: 'Growth advisory for AI and developer tool companies. Experience at Factory, E2B, and McKinsey.', alternates: { canonical: 'https://www.terezatizkova.com/growth-advisory' } }

export default function GrowthAdvisoryPreview() {
  return (
    <article className="max-w-[1020px] px-6 sm:px-12 lg:px-20 py-16 sm:py-24 pb-24 mx-auto">
      <header className="max-w-[700px] mb-14">
        <h1 className="font-serif font-normal text-[42px] sm:text-[60px] leading-[1.15] tracking-[-0.025em] mb-8">Growth advisory</h1>
        <div className="text-[16px] sm:text-[18px] text-secondary leading-[1.85] space-y-5">
          <p>I work on growth at Factory. Before that, I was a founding member at E2B, where I led growth and built the marketing, developer relations, and ecosystem partnerships functions from scratch, through Series A and beyond. Before joining startups, I worked as a strategy and management consultant at McKinsey.</p>
          <p>I also work with founders on their marketing and growth. This can mean figuring out how to explain your product, preparing a launch, reviewing what you’re spending money on, or deciding what to try next.</p>
        </div>
        <a href="#consultation" className="inline-flex items-center gap-8 mt-8 border-b border-foreground pb-2 text-[14px] hover:text-secondary">Request a consultation <span aria-hidden="true">↗</span></a>
      </header>

      <section className="border-t border-border pt-10 pb-4" aria-labelledby="companies-heading">
        <h2 id="companies-heading" className="font-serif text-[28px] sm:text-[32px] mb-6">Companies I’ve helped grow</h2>
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <a href="https://factory.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-10 hover:opacity-70"><img src="/images/companies/factory.svg" alt="Factory" width="140" height="27" className="w-[140px] h-auto dark:invert" /></a>
            <p className="text-[15px] text-secondary leading-[1.85] mt-4">I work on AEO strategy, ecosystem growth, paid ads, out-of-home advertising, campaigns, and growth engineering.</p>
          </div>
          <div>
            <a href="https://e2b.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-10 hover:opacity-70"><img src="/images/companies/e2b.svg" alt="E2B" width="90" height="26" className="w-[90px] h-auto dark:invert" /></a>
            <p className="text-[15px] text-secondary leading-[1.85] mt-4">As a founding member, I led growth and owned the marketing, developer relations, and ecosystem partnerships functions from scratch, through Series A and beyond.</p>
          </div>
        </div>
      </section>

      <AdvisoryTestimonials />

      <section className="py-12 sm:py-16 border-b border-border max-w-[700px] text-[15px] sm:text-[16px] leading-[1.85]">
        <h2 className="font-serif text-[28px] sm:text-[32px] mb-6">What I can help with</h2>
        <div className="space-y-5 text-secondary">
          <p>Most of my experience is with AI products and developer tools. I’ve worked on positioning, go-to-market strategy, launches, answer engine optimization (AEO), digital ads, out-of-home advertising, influencer programs, startup and partner programs, ecosystem development, and community building. I also work on marketing operations, measurement, and using AI to reduce manual work.</p>
          <p>We can work through a specific question in a consultation, work together on a project, or meet regularly while you try things and build your team. Tell me what you need help with and we can work out whether it makes sense.</p>
        </div>
      </section>

      <section id="consultation" className="scroll-mt-24 border-t border-border pt-12 sm:pt-16 max-w-[700px]">
        <h2 className="font-serif text-[28px] sm:text-[32px] mb-5">Request a consultation</h2>
        <p className="text-[15px] sm:text-[16px] text-secondary leading-[1.85] mb-8">Tell me what you’re building and what you’d like to discuss. I’ll get back to you by email so we can find a time.</p>
        <AdvisoryForm />
      </section>
    </article>
  )
}
