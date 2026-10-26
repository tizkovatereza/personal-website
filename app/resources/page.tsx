import { Metadata } from "next"
import { factoryArticles } from "@/lib/factory-articles"

export const metadata: Metadata = {
  title: "Resources | Tereza Tizkova",
  description: "A collection of pieces from Factory worth reading.",
  robots: { index: false, follow: false },
}

type Resource = {
  title: string
  description: string
  url: string
  date?: string
}

const news: Resource[] = [
  {
    title: "Factory 2.0: From coding agents to software factories",
    description:
      "The shift from coding agents to full software factories, and what autonomy across the SDLC actually looks like.",
    url: "https://factory.ai/news/software-factory",
  },
  {
    title: "Deferred Context Engine",
    description:
      "How Factory defers and compresses context to keep agents effective across long, complex tasks.",
    url: "https://factory.ai/news/deferred-context-engine",
  },
  {
    title: "Introducing Agent Effectiveness",
    description:
      "Mapping agent usage to delivery speed, work priorities, and shipped artifacts across an engineering organization.",
    url: "https://factory.ai/news/agent-effectiveness",
  },
  {
    title: "Droid Shield 2.0: learned secret detection",
    description:
      "A learned approach to detecting secrets and preventing leaks in agent-generated code.",
    url: "https://factory.ai/news/droid-shield-2-0",
  },
  {
    title: "Designing an AI-Native Enterprise Organizational Model",
    description:
      "Central governance with explicit boundaries for access, integrations, policy, spend, and data residency.",
    url: "https://factory.ai/news/enterprise-organization-model",
  },
  {
    title: "Launching the Factory Guild",
    description:
      "A community of students, builders, and researchers shaping how software gets built with Droids.",
    url: "https://factory.ai/news/factory-guild",
  },
]

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

function ResourceList({ heading, items }: { heading: string; items: Resource[] }) {
  return (
    <section className="px-6 sm:px-12 md:px-16 lg:px-20 pb-16 max-w-5xl">
      <h2 className="flex items-baseline justify-between font-serif text-[24px] sm:text-[28px] font-normal tracking-[-0.02em] text-muted-foreground pb-4">
        <span>{heading}</span>
        <span>{items.length}</span>
      </h2>
      <ul className="border-t border-border">
        {items.map((item) => (
          <li key={item.url} className="border-b border-border">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-6 sm:py-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors leading-tight text-pretty">
                  {item.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="font-mono text-[13px] text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1"
                >
                  &#8599;
                </span>
              </div>
              <p className="mt-2 text-[14px] font-light text-secondary leading-relaxed max-w-2xl">
                {item.description}
              </p>
              <span className="mt-3 inline-block font-mono uppercase text-muted-foreground/70 text-[11px] font-light tracking-[0.05em]">
                {item.date ? (
                  <time dateTime={item.date}>{dateFormatter.format(new Date(item.date))}</time>
                ) : (
                  "factory.ai"
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-12 max-w-5xl">
        <header>
          <p className="font-mono uppercase text-secondary mb-4 text-[11px] font-light tracking-[0.05em]">
            Reading list
          </p>
          <h1 className="font-serif font-normal text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            Resources for Factory
          </h1>
          <p className="font-light text-[15px] sm:text-[17px] text-secondary leading-relaxed max-w-xl">
            I now work on growth at Factory. Here are some pieces from the team worth reading.
          </p>
        </header>
      </div>

      <ResourceList heading="Articles" items={factoryArticles} />
      <div className="pb-8">
        <ResourceList heading="News" items={news} />
      </div>
    </div>
  )
}
