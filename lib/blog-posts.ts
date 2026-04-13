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
    title: "A guide to not wasting money on conference booths",
    date: "Apr 13, 2026",
    subtitle: "My learnings from sponsoring a conference as a dev tool startup",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-13%20at%203.08.48%E2%80%AFPM-4vf9FV47GTISQYpAital8GMf3TXlm3.png",
    url: "/writing/conference-booths",
    isNew: true,
    isInternal: true
  },
  {
    title: "What Is Topology And Why You Should Love It",
    date: "Jul 16, 2025",
    subtitle: "Examples of topological problems and real-life applications",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/83caa4dc-e50f-4434-b850-ae14234b99ea_1024x1024.jpeg",
    url: "https://terezatizkova.substack.com/p/what-is-topology-and-why-you-should"
  },
  {
    title: "Self-Fulfilling Prophecies, Recursion in Technology & How to Actually Change",
    date: "Feb 1, 2026",
    subtitle: "Thoughts and topics from January 2026",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/93015246-7b75-4537-9ba3-4cf02d70cb8d_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/self-fulfilling-prophecies-recursion"
  },
  {
    title: "How to Become a Better Writer",
    date: "Jan 4, 2026",
    subtitle: "Core problems I identified in my writing & how to be better",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/f10342c2-919c-42d6-ad09-595a87a0bc93_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/how-to-become-a-better-writer"
  },
  {
    title: "My 2025 Wrapped",
    date: "Jan 4, 2026",
    subtitle: "Reflections on 2025, looking at my mistakes, and what's coming in 2026",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/d39bc203-5d59-431d-a670-ae983225a5b9_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/my-2025-wrapped"
  },
  {
    title: "The Most Iconic Tech Ads & Campaigns of 2025",
    date: "Dec 11, 2025",
    subtitle: "My personal selection of billboards, ads, and creative moments in the tech scene",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/e4574ba2-237c-4e15-97f7-6218a1292bad_1536x2048.jpeg",
    url: "https://terezatizkova.substack.com/p/the-most-iconic-tech-ads-and-campaigns"
  },
  {
    title: "Can't Code? Read This.",
    date: "Dec 7, 2025",
    subtitle: "Easy guide to your own website in one hour without a line of code",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/fdba47a8-3e3c-4d28-a1d0-69c87f14a22a_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/cant-code-read-this"
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
    title: "What I Actually Do At My Job",
    date: "Dec 1, 2025",
    subtitle: "If you are interested in Growth or Marketing roles in tech — read about my experience",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/fa8e9e19-f996-42b3-a91b-f9f7d1f898e8_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/what-i-actually-do-at-my-job"
  },
  {
    title: "We Need More Influencers.",
    date: "Oct 25, 2025",
    subtitle: "How 'Accidental Influencers' Will Replace Internet Search",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/b6d90ce6-60b1-4f40-9d9c-00a9adfd7df3_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/we-need-more-influencers"
  },
  {
    title: "Answering anonymous questions; where I think AI agents are going & our $21M round",
    date: "Sep 2, 2025",
    subtitle: "life and work update no.002",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/3a1208b3-afed-49a9-949b-a9cb5ad55668_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/answering-anonymous-questions"
  },
  {
    title: "No. 001 of my not-a-newsletter",
    date: "Jul 3, 2025",
    subtitle: "tereza is typing...001",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/8a645c5a-1c9c-4a5d-8732-730108203b0f_572x423.jpeg",
    url: "https://terezatizkova.substack.com/p/tereza-is-typing"
  },
  {
    title: "Agents Were LLMs All Along.",
    date: "Jun 30, 2025",
    subtitle: "How GPT-5 shows the dissolving line between LLMs and AI agents",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/725d1a33-29f1-4f06-9029-d142e882a9c5_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/agents-were-llms-all-along"
  },
  {
    title: "Gödel's Incompleteness Theorems Explained Simply",
    date: "Jul 19, 2025",
    subtitle: "Why Math Will Always Be Broken — Part 2",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/df08e947-8758-4b7d-af33-bfb36d02b1b0_1024x1024.png",
    url: "https://terezatizkova.substack.com/p/godels-incompleteness-theorems-explained"
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
