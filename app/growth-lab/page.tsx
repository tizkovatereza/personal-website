import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Growth Lab',
  description: 'A curated group of people who do growth every day — sharing tactics, tools, and real talk.',
}

// ============================================
// EDITABLE CONTENT
// ============================================

const TOPICS = [
  "Making launches go viral",
  "Agent automations for marketing workflows",
  "Writing with AI without losing your voice",
  "Growth tactics — what actually worked and what didn't",
  "Developer marketing and DevRel",
  "The real recs: vendors, venues, creators, tools",
  "Cold outreach, content strategy, social listening",
  "Intros, collabs, finding your people",
]

const QUOTES = [
  "Give away value to the right 5 people instead of marketing to 500.",
  "I built a CLI agent to review podcast transcripts and pull out growth tactics.",
  "I scaled revenue from 100CR to 200CR ARR in a year on quick commerce channels.",
  "I designed the entire studio infrastructure with Claude Code — 100+ custom AI skills, zero dev background.",
  "Scraping competitor's Twitter followers helps find bottom-of-funnel qualified leads to send outreach to.",
  "My best growth hack is calling customers and understanding their grievances.",
]

const ACTIVITIES = [
  "IRL meetups",
  "Knowledge sharing",
  "Warm intros and collabs",
]

const APPLY_LINK = "https://forms.gle/fMU4a2UUffHdFt9H9"

// ============================================

export default function GrowthLabPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a]">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-[#1a1a1a] mb-8">
          The Growth Lab
        </h1>
        <p className="text-lg md:text-xl text-[#4a4a4a] mb-12 max-w-xl leading-relaxed">
          A curated group of people who do growth every day — sharing tactics, tools, and real talk.
        </p>
        <a
          href={APPLY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-[#b85c38] hover:bg-[#a04d2e] text-white text-base tracking-wide transition-colors duration-200"
        >
          Apply to Join
        </a>
        <p className="mt-5 text-xs tracking-wide text-[#888] uppercase">
          Curated. Applications reviewed manually.
        </p>
      </section>

      {/* Thin accent line */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-[#b85c38]/30" />
      </div>

      {/* Topics Section */}
      <section className="px-6 py-20 md:py-24 max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#888] uppercase mb-10">
          What We Talk About
        </p>
        <ol className="space-y-0">
          {TOPICS.map((topic, i) => (
            <li key={i} className="flex items-baseline py-4 border-b border-[#e5e3df]">
              <span className="font-mono text-xs text-[#aaa] w-8 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-base md:text-lg text-[#2a2a2a]">
                {topic}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Quotes Section */}
      <section className="px-6 py-20 md:py-24 max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#888] uppercase mb-16">
          From The Inside
        </p>
        <div className="space-y-12">
          {QUOTES.map((quote, i) => (
            <blockquote key={i} className="relative">
              <div className="h-px bg-[#ddd] mb-8" />
              <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-[#2a2a2a] leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
          ))}
        </div>
        <p className="mt-16 text-sm text-[#666]">
          50+ members across 12 countries.
        </p>
      </section>

      {/* Activities Section */}
      <section className="px-6 py-20 md:py-24 max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#888] uppercase mb-10">
          What Happens Here
        </p>
        <ul className="space-y-3">
          {ACTIVITIES.map((activity, i) => (
            <li key={i} className="text-base md:text-lg text-[#2a2a2a]">
              {activity}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto">
        <div className="h-px bg-[#b85c38]/30 mb-16" />
        <a
          href={APPLY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-[#b85c38] hover:bg-[#a04d2e] text-white text-base tracking-wide transition-colors duration-200"
        >
          Apply to Join
        </a>
        <p className="mt-8 text-sm text-[#666]">
          DM{' '}
          <a
            href="https://x.com/tereza_tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b85c38] hover:underline"
          >
            @terezatizkova
          </a>
          {' '}on X
        </p>
      </section>
    </div>
  )
}
