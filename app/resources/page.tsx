import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources | Tereza Tizkova",
  description: "A small collection of links worth reading.",
  robots: { index: false, follow: false },
}

const resources = [
  {
    title: "What is a software factory? A 2026 guide to agent-native delivery",
    description:
      "A managed model for producing software with repeatable inputs, standardized tooling, and measurable output.",
    url: "https://factory.ai/articles/what-is-a-software-factory",
  },
  {
    title: "Best software factory platforms in 2026: a comparison guide",
    description:
      "A reference comparison of platforms implementing the software factory model — delivery, audit, model flexibility, and deployment.",
    url: "https://factory.ai/articles/best-software-factory-platforms-2026",
  },
  {
    title: "How enterprise engineering teams automate software development (2026)",
    description:
      "How large enterprises automate software development in 2026, with concrete examples drawn from published case studies.",
    url: "https://factory.ai/articles/how-enterprises-automate-software-development",
  },
  {
    title: "What is a software factory? The architecture behind autonomous software delivery",
    description:
      "A reference architecture: the components that move a unit of intent through specification, execution, review, and deployment.",
    url: "https://factory.ai/articles/what-is-a-software-factory-architecture",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-12 max-w-4xl">
        <header>
          <p className="font-mono text-[11px] font-light tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Reading list
          </p>
          <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.02em] text-foreground mb-6">
            Resources
          </h1>
          <p className="font-light text-[15px] sm:text-[17px] text-secondary leading-relaxed max-w-xl">
            A small, unlisted collection of links worth reading.
          </p>
        </header>
      </div>

      {/* Links */}
      <div className="px-6 sm:px-12 md:px-16 lg:px-20 pb-24 max-w-4xl">
        <ul className="border-t border-border">
          {resources.map((item) => (
            <li key={item.url} className="border-b border-border">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-6 sm:py-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[13px] text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1"
                  >
                    &#8599;
                  </span>
                </div>
                <p className="mt-2 text-[13px] sm:text-[14px] font-light text-muted-foreground leading-relaxed max-w-2xl">
                  {item.description}
                </p>
                <span className="mt-3 inline-block font-mono text-[11px] font-light tracking-[0.1em] uppercase text-muted-foreground/70">
                  factory.ai
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
