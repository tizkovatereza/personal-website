export interface BlogPost {
  title: string
  date: string
  subtitle: string
  image: string
  url: string
  isNew?: boolean
  isInternal?: boolean
  label?: string
  draft?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    title: "The AI Adoption Gap: Between the Lines",
    date: "Jul 7, 2026",
    subtitle: "Why most industries are not adopting AI yet, and why the real problem is not intelligence",
    image: "/images/blog/ai-adoption-gap/anthropic-domain-chart.jpg",
    url: "/blog/ai-adoption-gap",
    isNew: true,
    isInternal: true,
    draft: true
  },
  {
    title: "Rise of the Software Factory",
    date: "Jun 30, 2026",
    subtitle: "What a software factory actually means, and the three properties every one must have",
    image: "/images/blog/rise-of-the-software-factory/slide-01-title.png",
    url: "/blog/rise-of-the-software-factory",
    isNew: true,
    isInternal: true,
    label: "AI Engineer World's Fair talk"
  },
  {
    title: "Your \"30% AI Visibility Score\" Is Statistically Meaningless",
    date: "May 14, 2026",
    subtitle: "I did the math on agent SEO benchmarks",
    image: "/images/blog/agentic-seo.jpg",
    url: "/writing/agentic-seo-math",
    isNew: true,
    isInternal: true,
    label: "Draft done with AI during demo",
    draft: true
  },
  {
    title: "Every good date we had in San Francisco",
    date: "May 12, 2026",
    subtitle: "A curated list of date spots in SF that were actually worth it",
    image: "/images/blog/sf-dates.jpg",
    url: "/writing/sf-dates",
    isInternal: true,
    draft: true
  },
  {
    title: "Software is becoming marketing",
    date: "Apr 19, 2026",
    subtitle: "Four ways software products and jobs change in the age of abundance",
    image: "/images/blog/software-abundance.jpg",
    url: "/writing/software-abundance",
    isInternal: true
  },
  {
    title: "A guide to not wasting money on conference booths",
    date: "Apr 13, 2026",
    subtitle: "My learnings from sponsoring a conference as a dev tool startup",
    image: "/images/blog/conference-booths.jpg",
    url: "/writing/conference-booths",
    isInternal: true
  },
  {
    title: "Gödel's Incompleteness Theorems Explained Simply",
    date: "Jul 19, 2025",
    subtitle: "Why Math Will Always Be Broken — Part 2",
    image: "/images/blog/godels-theorems.jpg",
    url: "https://terezatizkova.substack.com/p/godels-incompleteness-theorems-explained"
  },
  {
    title: "What Is Topology And Why You Should Love It",
    date: "Jul 16, 2025",
    subtitle: "Examples of topological problems and real-life applications",
    image: "/images/blog/topology.jpg",
    url: "https://terezatizkova.substack.com/p/what-is-topology-and-why-you-should"
  },
  {
    title: "What I Actually Do At My Job",
    date: "Dec 1, 2025",
    subtitle: "If you are interested in Growth or Marketing roles in tech — read about my experience",
    image: "/images/blog/my-job.jpg",
    url: "https://terezatizkova.substack.com/p/what-i-actually-do-at-my-job"
  },
  {
    title: "Agents Were LLMs All Along.",
    date: "Jun 30, 2025",
    subtitle: "How GPT-5 shows the dissolving line between LLMs and AI agents",
    image: "/images/blog/agents-llms.jpg",
    url: "https://terezatizkova.substack.com/p/agents-were-llms-all-along"
  },
  {
    title: "The Most Iconic Tech Ads & Campaigns of 2025",
    date: "Dec 11, 2025",
    subtitle: "My personal selection of billboards, ads, and creative moments in the tech scene",
    image: "/images/blog/tech-ads.jpg",
    url: "https://terezatizkova.substack.com/p/the-most-iconic-tech-ads-and-campaigns"
  },
  {
    title: "The State & Future of AI Agents",
    date: "Dec 5, 2024",
    subtitle: "What works in production, challenges & future predictions",
    image: "/images/blog/state-future-agents.jpg",
    url: "https://terezatizkova.substack.com/p/the-state-and-future-of-ai-agents"
  },
  {
    title: "How to Learn AI from Scratch",
    date: "Dec 3, 2024",
    subtitle: "My selection of platforms, courses, and communities for beginners to start with AI",
    image: "/images/blog/learn-ai.jpg",
    url: "https://terezatizkova.substack.com/p/how-to-learn-ai-from-scratch"
  },
  {
    title: "Mirrors, Sun, & Three Body Problem",
    date: "Dec 2, 2025",
    subtitle: "Reflect Orbital, capturing sunlight from space & what is realistic about interstellar communication",
    image: "/images/blog/three-body.jpg",
    url: "https://terezatizkova.substack.com/p/mirrors-sun-and-three-body-problem"
  },
  {
    title: "We Need More Influencers.",
    date: "Oct 25, 2025",
    subtitle: "How 'Accidental Influencers' Will Replace Internet Search",
    image: "/images/blog/influencers.jpg",
    url: "https://terezatizkova.substack.com/p/we-need-more-influencers"
  },
  {
    title: "Notes on Theory of Relativity",
    date: "Jul 18, 2025",
    subtitle: "My raw notes — to be updated",
    image: "/images/blog/relativity.jpg",
    url: "https://terezatizkova.substack.com/p/notes-on-theory-of-relativity"
  },
  {
    title: "Book Club: The Art of Doing Science and Engineering",
    date: "Apr 7, 2025",
    subtitle: "Why I loved this book & little tips to learn and think well :)",
    image: "/images/blog/book-club.jpg",
    url: "https://terezatizkova.substack.com/p/book-club-the-art-of-doing-science"
  },
  {
    title: "Reflection on blogging in 2024",
    date: "Jan 2, 2025",
    subtitle: "... and my growth strategy & future plans",
    image: "/images/blog/blogging-2024.jpg",
    url: "https://terezatizkova.substack.com/p/reflection-on-blogging-in-2024"
  },
  {
    title: "My 2024 wrapped",
    date: "Jan 1, 2025",
    subtitle: "Using TikTok trends to reflect and plan 2025",
    image: "/images/blog/2024-wrapped.jpg",
    url: "https://terezatizkova.substack.com/p/my-2024-wrapped"
  },
  {
    title: "Starting with AI agents",
    date: "May 20, 2024",
    subtitle: "Resources and explanations I wish I had a year ago",
    image: "/images/blog/starting-agents.jpg",
    url: "https://terezatizkova.substack.com/p/starting-with-ai-agents"
  }
]
