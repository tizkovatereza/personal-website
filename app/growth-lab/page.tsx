"use client"

import { useState } from 'react'

// ============================================
// EDITABLE CONTENT - Update these as needed
// ============================================

const MEMBER_COUNT = 50

const TOPICS = [
  { emoji: "🚀", label: "Making launches go viral" },
  { emoji: "🤖", label: "Agent automations for marketing" },
  { emoji: "✍️", label: "Writing with AI while keeping it authentic" },
  { emoji: "📊", label: "Growth tactics that actually worked (and didn't)" },
  { emoji: "🎯", label: "Developer marketing & DevRel" },
  { emoji: "🎪", label: "Events, venues, merch vendors — the real recs" },
  { emoji: "💬", label: "Cold DMs, content strategy, social listening" },
  { emoji: "🤝", label: "Intros, collabs, and finding your people" },
]

const QUOTES = [
  { text: "Just moved to SF two weeks ago, excited to meet growth people IRL", color: "bg-pink-100" },
  { text: "I built a CLI agent to review podcast transcripts and pull out growth tactics", color: "bg-purple-100" },
  { text: "I wake up every day wishing I were in SF", color: "bg-sky-100" },
  { text: "Would love to compare notes on what's working in content", color: "bg-orange-100" },
]

const ACTIVITIES = [
  { emoji: "🍕", label: "IRL hangs in SF" },
  { emoji: "💡", label: "Knowledge sharing & tips" },
  { emoji: "🔗", label: "Warm intros & collabs" },
]

const APPLY_LINK = "https://forms.gle/fMU4a2UUffHdFt9H9"

// ============================================

export default function GrowthLabPage() {
  const [hoveredTopic, setHoveredTopic] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          The Growth Lab
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
          A curated community of growth people sharing what actually works — tactics, tools, and real talk.
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Founded by Tereza Tizkova. A safe, fun space for people who do growth every day to swap tips, resources, and questions — from making launches go viral to the best agent automations for marketing workflows.
        </p>
        <a
          href={APPLY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          Apply to Join
        </a>
        <p className="mt-4 text-sm text-gray-400">
          We keep it curated so it stays useful. Applications reviewed manually.
        </p>
      </section>

      {/* What we talk about */}
      <section className="px-6 py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            What we talk about
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((topic, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredTopic(i)}
                onMouseLeave={() => setHoveredTopic(null)}
                className={`p-5 bg-white rounded-2xl border border-gray-100 transition-all duration-200 cursor-default ${
                  hoveredTopic === i ? 'shadow-md scale-[1.02] border-orange-200' : 'shadow-sm'
                }`}
              >
                <span className="text-2xl mb-3 block">{topic.emoji}</span>
                <span className="text-sm text-gray-700 leading-snug">{topic.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who's inside */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            Who&apos;s inside
          </h2>
          
          {/* Speech bubbles */}
          <div className="relative flex flex-wrap justify-center gap-4 mb-12">
            {QUOTES.map((quote, i) => (
              <div
                key={i}
                className={`${quote.color} px-5 py-4 rounded-2xl max-w-xs transform transition-transform duration-300 hover:-translate-y-1`}
                style={{
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + i * 0.5)}deg)`,
                }}
              >
                <p className="text-sm text-gray-700 leading-relaxed">"{quote.text}"</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500">
            {MEMBER_COUNT}+ members from startups, dev platforms, AI companies, and everything in between.
          </p>
        </div>
      </section>

      {/* What happens here */}
      <section className="px-6 py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            What happens here
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {ACTIVITIES.map((activity, i) => (
              <div
                key={i}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <span className="text-4xl mb-4 block">{activity.emoji}</span>
                <span className="text-base text-gray-700 font-medium">{activity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-20 md:py-28 text-center">
        <a
          href={APPLY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          Apply to Join
        </a>
        <p className="mt-6 text-sm text-gray-400">
          Questions? DM{' '}
          <a
            href="https://x.com/tereza_tizkova"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            @terezatizkova
          </a>
          {' '}on X
        </p>
      </section>
    </div>
  )
}
