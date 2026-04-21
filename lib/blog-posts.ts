export interface BlogPost {
  title: string
  date: string
  subtitle: string
  image: string
  url: string
  isNew?: boolean
  isInternal?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    title: "Software is becoming marketing",
    date: "Apr 19, 2026",
    subtitle: "Four ways software products and jobs change in the age of abundance",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/83caa4dc-e50f-4434-b850-ae14234b99ea_1024x1024.jpeg",
    url: "/writing/software-abundance",
    isNew: true,
    isInternal: true
  },
  {
    title: "A guide to not wasting money on conference booths",
    date: "Apr 13, 2026",
    subtitle: "My learnings from sponsoring a conference as a dev tool startup",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-13%20at%203.08.48%E2%80%AFPM-4vf9FV47GTISQYpAital8GMf3TXlm3.png",
    url: "/writing/conference-booths",
    isInternal: true
  },
  {
    title: "Gödel's Incompleteness Theorems Explained Simply",
    date: "Jul 19, 2025",
    subtitle: "Why Math Will Always Be Broken — Part 2",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/df08e947-8758-4b7d-af33-bfb36d02b1b0_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/godels-incompleteness-theorems-explained"
  },
  {
    title: "What Is Topology And Why You Should Love It",
    date: "Jul 16, 2025",
    subtitle: "Examples of topological problems and real-life applications",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/83caa4dc-e50f-4434-b850-ae14234b99ea_1024x1024.jpeg",
    url: "https://terezatizkova.substack.com/p/what-is-topology-and-why-you-should"
  },
  {
    title: "What I Actually Do At My Job",
    date: "Dec 1, 2025",
    subtitle: "If you are interested in Growth or Marketing roles in tech — read about my experience",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/fa8e9e19-f996-42b3-a91b-f9f7d1f898e8_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/what-i-actually-do-at-my-job"
  },
  {
    title: "Agents Were LLMs All Along.",
    date: "Jun 30, 2025",
    subtitle: "How GPT-5 shows the dissolving line between LLMs and AI agents",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/725d1a33-29f1-4f06-9029-d142e882a9c5_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/agents-were-llms-all-along"
  },
  {
    title: "The Most Iconic Tech Ads & Campaigns of 2025",
    date: "Dec 11, 2025",
    subtitle: "My personal selection of billboards, ads, and creative moments in the tech scene",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/e4574ba2-237c-4e15-97f7-6218a1292bad_1536x2048.jpeg",
    url: "https://terezatizkova.substack.com/p/the-most-iconic-tech-ads-and-campaigns"
  },
  {
    title: "The State & Future of AI Agents",
    date: "Dec 5, 2024",
    subtitle: "What works in production, challenges & future predictions",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/78f8d41d-42bb-4a93-acff-3c4a0c07d79a_3375x3375.png",
    url: "https://terezatizkova.substack.com/p/the-state-and-future-of-ai-agents"
  },
  {
    title: "How to Learn AI from Scratch",
    date: "Dec 3, 2024",
    subtitle: "My selection of platforms, courses, and communities for beginners to start with AI",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/03a8ead7-89a8-4a5f-8fae-88d70146a34e_3375x3375.png",
    url: "https://terezatizkova.substack.com/p/how-to-learn-ai-from-scratch"
  },
  {
    title: "Mirrors, Sun, & Three Body Problem",
    date: "Dec 2, 2025",
    subtitle: "Reflect Orbital, capturing sunlight from space & what is realistic about interstellar communication",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/eb087c69-425d-4d39-89f6-8f46adef9c35_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/mirrors-sun-and-three-body-problem"
  },
  {
    title: "We Need More Influencers.",
    date: "Oct 25, 2025",
    subtitle: "How 'Accidental Influencers' Will Replace Internet Search",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/b6d90ce6-60b1-4f40-9d9c-00a9adfd7df3_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/we-need-more-influencers"
  },
  {
    title: "Notes on Theory of Relativity",
    date: "Jul 18, 2025",
    subtitle: "My raw notes — to be updated",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/5c253583-4212-4395-a48e-f350109e77ec_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/notes-on-theory-of-relativity"
  },
  {
    title: "Book Club: The Art of Doing Science and Engineering",
    date: "Apr 7, 2025",
    subtitle: "Why I loved this book & little tips to learn and think well :)",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/08fa285b-bb50-4ffc-bcfb-becc73f88c5a_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/book-club-the-art-of-doing-science"
  },
  {
    title: "Reflection on blogging in 2024",
    date: "Jan 2, 2025",
    subtitle: "... and my growth strategy & future plans",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/3307a67e-5d85-4445-9763-9eb7df2c954a_3375x3375.png",
    url: "https://terezatizkova.substack.com/p/reflection-on-blogging-in-2024"
  },
  {
    title: "My 2024 wrapped",
    date: "Jan 1, 2025",
    subtitle: "Using TikTok trends to reflect and plan 2025",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/9d5295da-b397-49f4-a8b8-d58e8111c408_3375x3375.png",
    url: "https://terezatizkova.substack.com/p/my-2024-wrapped"
  },
  {
    title: "Starting with AI agents",
    date: "May 20, 2024",
    subtitle: "Resources and explanations I wish I had a year ago",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/12d29c08-bf9d-4fbf-8a5f-c5b3f50cea32_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/starting-with-ai-agents"
  }
]
