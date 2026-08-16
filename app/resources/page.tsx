import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources | Tereza Tizkova",
  description: "A collection of pieces from Factory worth reading.",
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
    title: "Factory 2.0: From coding agents to software factories",
    description:
      "The shift from coding agents to full software factories, and what autonomy across the SDLC actually looks like.",
    url: "https://factory.ai/news/software-factory",
  },
  {
    title: "Making your codebase AI-agent ready",
    description:
      "The practices that make a repository legible to coding agents — clear structure, tests to verify against, and written-down conventions.",
    url: "https://factory.ai/articles/codebase-ai-agent-readiness",
  },
  {
    title: "Deferred Context Engine",
    description:
      "How Factory defers and compresses context to keep agents effective across long, complex tasks.",
    url: "https://factory.ai/news/deferred-context-engine",
  },
  {
    title: "How enterprise engineering teams automate software development (2026)",
    description:
      "How large enterprises automate software development in 2026, with concrete examples drawn from published case studies.",
    url: "https://factory.ai/articles/how-enterprises-automate-software-development",
  },
  {
    title: "How to use DeepSeek V4 in Factory",
    description:
      "Running the open-weight DeepSeek V4 model natively inside a Droid — selection, reasoning levels, and cost.",
    url: "https://factory.ai/articles/deepseek-on-factory",
  },
  {
    title: "Introducing Agent Effectiveness",
    description:
      "Mapping agent usage to delivery speed, work priorities, and shipped artifacts across an engineering organization.",
    url: "https://factory.ai/news/agent-effectiveness",
  },
  {
    title: "What is a software factory? The architecture behind autonomous software delivery",
    description:
      "A reference architecture: the components that move a unit of intent through specification, execution, review, and deployment.",
    url: "https://factory.ai/articles/what-is-a-software-factory-architecture",
  },
  {
    title: "How to use GLM-5.2 in Factory",
    description:
      "Running Zhipu AI's open-weight GLM models in a Droid at a low credit multiplier for high-volume work.",
    url: "https://factory.ai/articles/glm-on-factory",
  },
  {
    title: "Droid Shield 2.0: learned secret detection",
    description:
      "A learned approach to detecting secrets and preventing leaks in agent-generated code.",
    url: "https://factory.ai/news/droid-shield-2-0",
  },
  {
    title: "How to measure agent readiness",
    description:
      "Turning codebase quality into a score you can track — the CLI report, dashboard, and API behind agent readiness.",
    url: "https://factory.ai/articles/measuring-agent-readiness",
  },
  {
    title: "Designing an AI-Native Enterprise Organizational Model",
    description:
      "Central governance with explicit boundaries for access, integrations, policy, spend, and data residency.",
    url: "https://factory.ai/news/enterprise-organization-model",
  },
  {
    title: "How to use Kimi K2 in Factory",
    description:
      "Using Moonshot AI's Kimi K2 family for scoped coding tasks with open weights and a low credit multiplier.",
    url: "https://factory.ai/articles/kimi-k2-on-factory",
  },
  {
    title: "Best software factory platforms in 2026: a comparison guide",
    description:
      "A reference comparison of platforms implementing the software factory model — delivery, audit, model flexibility, and deployment.",
    url: "https://factory.ai/articles/best-software-factory-platforms-2026",
  },
  {
    title: "Launching the Factory Guild",
    description:
      "A community of students, builders, and researchers shaping how software gets built with Droids.",
    url: "https://factory.ai/news/factory-guild",
  },
  {
    title: "Why your AI agents should be model-agnostic",
    description:
      "The case against coupling your workflow to a single model provider, and what switching models per task buys you.",
    url: "https://factory.ai/articles/model-agnostic-ai-agents",
  },
  {
    title: "How to use MiniMax in Factory",
    description:
      "Running MiniMax, the lowest-multiplier models in the catalog, for cost-sensitive batches and cleanup passes.",
    url: "https://factory.ai/articles/minimax-on-factory",
  },
  {
    title: "A guide to Factory Router",
    description:
      "How Factory Router picks the right model for each step automatically instead of pinning a run to one.",
    url: "https://factory.ai/articles/factory-router-guide",
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
            Resources for Factory
          </h1>
          <p className="font-light text-[15px] sm:text-[17px] text-secondary leading-relaxed max-w-xl">
            I now work on growth at Factory. Here are some pieces from the team worth reading.
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
