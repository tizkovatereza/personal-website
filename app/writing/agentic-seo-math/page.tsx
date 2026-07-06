import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageTracker } from '@/components/page-tracker'

export const metadata: Metadata = {
  title: 'Your 30% AI Visibility Score Is Statistically Meaningless | Tereza Tizkova',
  description: 'I did the math on agent SEO benchmarks. Most visibility scores are based on sample sizes so small the numbers are basically random.',
  openGraph: {
    title: 'Your 30% AI Visibility Score Is Statistically Meaningless',
    description: 'I did the math on agent SEO benchmarks. Most visibility scores are based on sample sizes so small the numbers are basically random.',
    images: [
      {
        url: 'https://www.terezatizkova.com/api/og?title=Your%2030%25%20AI%20Visibility%20Score%20Is%20Statistically%20Meaningless&subtitle=I%20did%20the%20math%20on%20agent%20SEO%20benchmarks',
        width: 1200,
        height: 630,
        alt: 'Your 30% AI Visibility Score Is Statistically Meaningless',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your 30% AI Visibility Score Is Statistically Meaningless',
    description: 'I did the math on agent SEO benchmarks. Most visibility scores are based on sample sizes so small the numbers are basically random.',
    images: ['https://www.terezatizkova.com/api/og?title=Your%2030%25%20AI%20Visibility%20Score%20Is%20Statistically%20Meaningless&subtitle=I%20did%20the%20math%20on%20agent%20SEO%20benchmarks'],
  },
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.02em] mt-16 mb-6 pt-8 border-t border-border">
      {children}
    </h2>
  )
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 py-4 px-6 bg-card/50 border border-border rounded-md font-mono text-[14px] sm:text-[15px] text-primary/90 text-center">
      {children}
    </div>
  )
}

export default function AgenticSeoMathArticle() {
  return (
    <div className="min-h-screen">
      <PageTracker />
      <nav className="px-6 sm:px-12 md:px-16 lg:px-20 py-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>
      </nav>

      <article className="px-6 sm:px-8 pb-24 max-w-[680px] mx-auto">
        <header className="mb-12">
          <div className="mb-4">
            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider border border-primary/20 rounded-sm">
              Draft done with AI during demo
            </span>
          </div>
          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] tracking-[-0.02em] leading-[1.1] mb-4">
            Your &ldquo;30% AI Visibility Score&rdquo; Is Statistically Meaningless
          </h1>
          <p className="text-[18px] sm:text-[20px] text-muted-foreground mb-6">
            I did the math on agent SEO benchmarks
          </p>
          <time className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
            May 2026
          </time>
        </header>

        <div className="text-[16px] sm:text-[17px] leading-[1.75] text-foreground/90">
          <p className="mb-6">
            A bunch of companies are pitching &ldquo;agent SEO&rdquo; and benchmarking tools right now. Profound, Peec AI, AIclicks, Adobe&apos;s LLM Optimizer, LLMrefs, Semrush... the list keeps growing. They all promise to tell you how often Claude, ChatGPT, Perplexity, or Gemini recommend your dev tool instead of a competitor.
          </p>

          <p className="mb-6">
            They give you a percentage. A &ldquo;visibility score.&rdquo; A &ldquo;brand mention rate.&rdquo;
          </p>

          <p className="mb-6">
            And I keep seeing founders and marketers treat that number like gospel, making strategy decisions off it, shifting budgets, panicking because they went from 28% to 19% between two reports.
          </p>

          <p className="mb-6">
            So I sat down and did the math. And the math says: most of these numbers are noise.
          </p>

          <SectionHeader>How the benchmarking works</SectionHeader>

          <p className="mb-6">
            The idea is simple. You pick a set of prompts that a potential user might ask an LLM... &ldquo;what&apos;s the best serverless database,&rdquo; &ldquo;recommend a tool for X,&rdquo; that kind of thing. You run each prompt some number of times, count how often your product gets mentioned, and calculate a percentage.
          </p>

          <p className="mb-6">
            If you test a prompt 10 times and see your tool mentioned 3 times, the intuition says 30% coverage. Your tool shows up in roughly a third of AI answers. Sounds reasonable.
          </p>

          <p className="mb-6">
            The problem is, 3 out of 10 is just one roll of the dice... the error margin is enormous and almost nobody talks about it.
          </p>

          <SectionHeader>The binomial distribution tells you why</SectionHeader>

          <p className="mb-6">
            This is a classic binomial probability setup. You have n trials (the number of times you run the prompt), each trial has two outcomes (your tool is mentioned or it isn&apos;t), and you want to know how likely a specific result is given some &ldquo;true&rdquo; underlying probability p.
          </p>

          <p className="mb-6">The formula:</p>

          <Formula>P(k) = C(n,k) &middot; p<sup>k</sup> &middot; (1&minus;p)<sup>n&minus;k</sup></Formula>

          <p className="mb-6">
            Where C(n,k) is &ldquo;n choose k,&rdquo; the number of ways to pick k successes from n trials.
          </p>

          <p className="mb-6">
            Let&apos;s plug in the numbers. If the real coverage is exactly 30% (p = 0.3), and you run 10 trials (n = 10), what&apos;s the probability of seeing exactly 3 mentions (k = 3)?
          </p>

          <Formula>P(3) = C(10,3) &middot; 0.3<sup>3</sup> &middot; 0.7<sup>7</sup> = 120 &middot; 0.027 &middot; 0.0824 = 0.267</Formula>

          <p className="mb-6">
            About 26.7%. So even if your tool truly is a &ldquo;30% tool,&rdquo; you&apos;ll only see that exact result roughly one in four times. The other three times out of four, you&apos;ll see 2 mentions, or 4, or 1, or 5... and each of those gives you a wildly different &ldquo;visibility score.&rdquo;
          </p>

          <SectionHeader>The confidence interval is where it gets ugly</SectionHeader>

          <p className="mb-6">
            Let&apos;s calculate a 95% confidence interval for our 3/10 result.
          </p>

          <p className="mb-6">The formula for a 95% confidence interval of a proportion is:</p>

          <Formula>p &plusmn; 1.96 &middot; &radic;(p &middot; (1&minus;p) / n)</Formula>

          <p className="mb-6">Plugging in p = 0.3 and n = 10:</p>

          <Formula>0.3 &plusmn; 1.96 &middot; &radic;(0.3 &middot; 0.7 / 10) = 0.3 &plusmn; 0.284</Formula>

          <p className="mb-6">
            The real range is anywhere from <strong className="text-primary">about 2% to 58%</strong>.
          </p>

          <p className="mb-6">
            You ran 10 tests, got 30%, and the actual coverage could be anywhere from nearly zero to nearly sixty percent. A sample size of 10 tells you almost nothing.
          </p>

          <SectionHeader>What this means in plain English</SectionHeader>

          <p className="mb-6">
            A confidence interval is not &ldquo;the range where the answer probably is.&rdquo; It means: if you repeated this entire experiment 100 times, about 95 of those experiments would produce an interval that contains the true value. It&apos;s a statement about the reliability of the method, not a prediction about where the truth sits.
          </p>

          <p className="mb-6">
            But practically, what it means for your agent SEO report is this: the number they gave you is compatible with a huge range of actual values. You cannot tell the difference between a tool that gets recommended 5% of the time and one that gets recommended 55% of the time... not from 10 samples.
          </p>

          <SectionHeader>How many samples do you actually need?</SectionHeader>

          <p className="mb-6">
            This is the question nobody asks the vendor. Let&apos;s figure it out.
          </p>

          <p className="mb-6">
            If you want a confidence interval that&apos;s +/- 5 percentage points (so if the true value is 30%, your interval would be 25-35%), you can rearrange the formula:
          </p>

          <Formula>n = (1.96<sup>2</sup> &middot; p &middot; (1&minus;p)) / margin<sup>2</sup></Formula>

          <p className="mb-6">For p = 0.3 and a 5% margin:</p>

          <Formula>n = (3.84 &middot; 0.21) / 0.0025 = 323 samples</Formula>

          <p className="mb-6">
            You need about <strong>323 runs</strong> of each prompt to get a confidence interval of +/- 5%. For +/- 3% precision, you need around 897 samples. Per prompt.
          </p>

          <p className="mb-6">
            Now think about what that costs. Each API call to Claude or GPT-4 costs money. If you&apos;re testing 50 prompts at 323 runs each, that&apos;s 16,150 API calls per benchmark round. At, say, $0.03 per call on average, that&apos;s about $485 per report. Not insane, but not cheap either, especially if you&apos;re running weekly benchmarks.
          </p>

          <p className="mb-6">
            Most tools I&apos;ve seen run somewhere between 5 and 20 repetitions per prompt. At 10 reps, your margin of error is +/- 28 percentage points. The number on the dashboard might as well be random.
          </p>

          <SectionHeader>The intuition</SectionHeader>

          <p className="mb-6">
            Think of it like polling. When Gallup runs a presidential poll, they don&apos;t ask 10 people. They ask 1,000+ people and still report a margin of error of +/- 3%. That&apos;s because statistical precision doesn&apos;t come cheap... you need a lot of data points to narrow the range.
          </p>

          <p className="mb-6">
            Agent SEO benchmarks are doing the polling equivalent of asking your family of four who they&apos;re voting for and then publishing the results as a national forecast.
          </p>

          <SectionHeader>Who&apos;s building these tools</SectionHeader>

          <p className="mb-6">
            The space is growing fast. Here&apos;s who I&apos;ve seen so far:
          </p>

          <ul className="mb-6 space-y-3">
            <li className="pl-4 border-l-2 border-border">
              <strong>Profound</strong> (tryprofound.com)... probably the most visible one, focused on &ldquo;AI search optimization.&rdquo; They track brand mentions across ChatGPT, Perplexity, Claude, and Gemini.
            </li>
            <li className="pl-4 border-l-2 border-border">
              <strong>AIclicks</strong> (aiclicks.io)... prompt analytics and LLM visibility tracking.
            </li>
            <li className="pl-4 border-l-2 border-border">
              <strong>Peec AI</strong>... similar positioning, benchmarking your brand against competitors in AI answers.
            </li>
            <li className="pl-4 border-l-2 border-border">
              <strong>Adobe LLM Optimizer</strong>... Adobe entered the game with an enterprise-grade tool. That tells you the market is real, even if the methodology needs work.
            </li>
            <li className="pl-4 border-l-2 border-border">
              <strong>LLMrefs</strong> (llmrefs.com)... tracks citations and rank across generative search engines.
            </li>
            <li className="pl-4 border-l-2 border-border">
              <strong>Semrush</strong>... added AI visibility features to their existing SEO suite.
            </li>
            <li className="pl-4 border-l-2 border-border">
              <strong>Otterly</strong>, <strong>Scrunch AI</strong>, and several others I keep seeing at conferences.
            </li>
          </ul>

          <p className="mb-6">
            The tools and the market are real, and visibility tracking for AI answers is a genuinely important thing to measure... the problem is that most of these tools present results with sample sizes that make the data unreliable, and almost none of them show you the confidence interval alongside the score.
          </p>

          <SectionHeader>What should you actually do</SectionHeader>

          <p className="mb-6">
            I&apos;m not saying ignore agent SEO. If LLMs are becoming a discovery channel for your product (and for dev tools, they definitely are), you should care about how you show up. But:
          </p>

          <ol className="list-decimal pl-6 mb-6 space-y-4">
            <li>
              <strong>Ask your vendor about sample sizes.</strong> If they can&apos;t tell you how many times they run each prompt, that&apos;s a red flag. If the answer is less than 100, treat the results as directional at best.
            </li>
            <li>
              <strong>Look at trends over time, not point estimates.</strong> A single report saying &ldquo;32% visibility&rdquo; is meaningless. Twenty reports over five months showing a steady climb from the low 20s to the high 30s... that&apos;s a signal, even with noisy individual data points.
            </li>
            <li>
              <strong>Don&apos;t panic over week-to-week changes.</strong> If your score drops from 30% to 22%, that might just be sampling noise. The confidence interval at small sample sizes means those two numbers are statistically indistinguishable.
            </li>
            <li>
              <strong>Do the math yourself.</strong> The binomial distribution isn&apos;t hard. If someone gives you a visibility score, ask for n (sample size) and k (mentions), then calculate the confidence interval. If it&apos;s wider than +/- 10 percentage points, the score is decoration.
            </li>
            <li>
              <strong>Focus on what you can control.</strong> Good documentation, clear product positioning, active presence in conversations where LLMs scrape training data... these things compound over time regardless of what any benchmark says right now.
            </li>
          </ol>

          <p className="mb-8">
            The agent SEO category is going to mature. The tools will get better, sample sizes will increase, and we&apos;ll eventually have reliable benchmarks. But right now, in mid-2026, most of these numbers deserve a squint, not a strategy pivot.
          </p>
        </div>
      </article>
    </div>
  )
}
