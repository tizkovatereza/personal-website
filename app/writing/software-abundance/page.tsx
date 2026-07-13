import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ShareableChart } from '@/components/shareable-chart'
import { PageTracker } from '@/components/page-tracker'
import { ReadMore } from '@/components/read-more'

export const metadata: Metadata = {
  title: 'Software is becoming marketing | Tereza Tizkova',
  description: 'Four ways software products and jobs change in the age of abundance',
  openGraph: {
    title: 'Software is becoming marketing',
    description: 'Four ways software products and jobs change in the age of abundance',
    images: [
      {
        url: 'https://www.terezatizkova.com/api/og?title=Software%20is%20becoming%20marketing&subtitle=Four%20ways%20software%20products%20and%20jobs%20change%20in%20the%20age%20of%20abundance',
        width: 1200,
        height: 630,
        alt: 'Software is becoming marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software is becoming marketing',
    description: 'Four ways software products and jobs change in the age of abundance',
    images: ['https://www.terezatizkova.com/api/og?title=Software%20is%20becoming%20marketing&subtitle=Four%20ways%20software%20products%20and%20jobs%20change%20in%20the%20age%20of%20abundance'],
  },
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.02em] mt-16 mb-6 pt-8 border-t border-border">
      {children}
    </h2>
  )
}

function SubSection({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-serif text-[20px] tracking-[-0.01em] mt-10 mb-4 font-semibold">
      {children}
    </h3>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 pl-4 border-l-4 border-primary bg-card/50 py-4 pr-4">
      <p className="text-[15px] leading-relaxed italic text-primary/90">
        {children}
      </p>
    </div>
  )
}

export default function SoftwareAbundanceArticle() {
  return (
    <div className="min-h-screen">
      <PageTracker />
      {/* Navigation */}
      <nav className="px-6 sm:px-12 md:px-16 lg:px-20 py-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>
      </nav>

      {/* Article */}
      <article className="px-6 sm:px-8 pb-24 max-w-[680px] mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] tracking-[-0.02em] leading-[1.1] mb-4">
            Software is becoming marketing
          </h1>
          <p className="text-[18px] sm:text-[20px] text-muted-foreground mb-6">
            Four ways software products and jobs change in the age of abundance
          </p>
          <time className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
            April 2026
          </time>
        </header>

        {/* Content */}
        <div className="text-[16px] sm:text-[17px] leading-[1.75] text-foreground/90">
          <p className="mb-6">
            Block fired almost half the company (4,000 people) because of AI. Atlassian laid off 1,600. Salesforce replaced 4,000 support roles with AI. Snapchat cut 1,000...
          </p>

          <p className="mb-6">
            And even in the Czech Republic, a small country in Europe where I&apos;m from, a local insurance group called Direct announced it is firing a third of its 1,200 employees. Their CEO commented: &quot;The time of playing around with AI is over.&quot;
          </p>

          <p className="mb-6">
            Software being mostly written by AI changes the job market, but also the software products landscape. This is how:
          </p>

          <ol className="list-decimal pl-6 mb-6 space-y-2 font-semibold">
            <li>Lower entry barrier makes software lower-respect field</li>
            <li>Optionality changes the commitment to software products</li>
            <li>The middle class of software products will disappear</li>
            <li>Software companies will sell services, not products</li>
          </ol>

          <SectionHeader>Implication 1: Lower entry barrier makes software lower-respect field</SectionHeader>

          <p className="mb-6">
            First, a little personal story.
          </p>

          <p className="mb-6">
            I hold a university degree in two totally unrelated fields: &quot;Mathematical Structures&quot; and &quot;Marketing Communications &amp; PR.&quot; I consider myself a very poor mathematician, but a very decent marketer. However, usually when first encountering me, people show insanely more respect for the former much than the latter.
          </p>

          <p className="mb-6">
            No-one will argue with you about how you are proving Yoneda lemma, but everyone will have opinion on what colors you put on your landing page.
          </p>

          <ShareableChart 
            src="/images/charts/chart-evaluability.png"
            alt="Barrier to entry vs. evaluability - comparing Yoneda Lemma proof with SaaS landing page"
            caption="No-one argues about Yoneda lemma proofs, but everyone has opinions on landing page colors"
          />

          <p className="mb-6">
            A non-mathematician can&apos;t even speak the language of mathematics. But in a lot of fields, people can evaluate your work with their own senses. They don&apos;t need any other apparatus.
          </p>

          <p className="mb-6">
            I see how software is turning more from what I experience with math to what I experience with marketing. It is now possible to vibecode your own SaaS instead of paying someone $50/month for theirs. And once anyone can build software, software becomes something everyone feels qualified to judge.
          </p>

          <p className="mb-6">
            This is where two variables interact: how hard it is to enter a field, and how easily outsiders can evaluate the work. When both shift — barrier drops, visibility rises — respect collapses.
          </p>

          <p className="mb-6">
            I see it like this. There are two variables:
          </p>

          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>How high/low is barrier to entry in your field</li>
            <li>How much people can externally judge your work</li>
          </ol>

          <ShareableChart 
            src="/images/charts/chart-quadrant-map.png"
            alt="How the general public judges your profession - quadrant map"
            caption="Software is moving from high-barrier/low-evaluability toward low-barrier/high-evaluability"
          />

          <p className="mb-6">
            Lower respect means lower pay. As software moves into &quot;everyone&apos;s a critic&quot; territory, pay will compress toward what other creative fields already look like. Writers, designers, and marketers all have wider pay distributions because the barrier to entry is low and the work is visible: anyone can try, everyone has an opinion, and only the proven best command a premium.
          </p>

          <p className="mb-6">
            To stand out, you need something beyond &quot;software engineer&quot; on your resume: a specialization, a track record, a reputation. The bullshitters will multiply, but so will the premium on genuinely excellent work.
          </p>

          <ShareableChart 
            src="/images/charts/chart-wage-ratio.png"
            alt="Software has the tightest pay distribution of any creative field"
            caption="Software has the tightest pay distribution of any creative field — 90/10 wage ratio comparison"
          />

          <p className="mb-6">
            Good enough marketers in San Francisco really get paid A LOT. When you look at any job portal or public data, marketing always shows less paid. But me and my friends from growth/marketing fields in top companies have different experience.
          </p>

          <p className="mb-6">
            I am not saying I am that good, I still have tons of things to learn. What I&apos;m just saying is that my offers have grown like crazy in months. I would never guess what numbers I can get to.
          </p>

          <SectionHeader>Implication 2: Optionality changes the commitment to software products</SectionHeader>

          <p className="mb-6">
            Optionality does specific things to markets, and that is, it makes people stop settling. And there is one example we all hear way too much about: dating market.
          </p>

          <p className="mb-6">
            When dating apps appeared, people swiping around quickly realized how many options they had. I hear people saying they swiped through thousands of people on the apps but haven&apos;t found anyone they would like. Or anyone who would like them. Why would you settle for something good enough if you know there are thousands of other options, and one might be the perfect match?
          </p>

          <p className="mb-6">
            The same psychology applies to software. When there were three project management tools, you picked one and committed. When there are three hundred, and you can vibecode your own in an afternoon, commitment evaporates.
          </p>

          <Callout>
            Treat software like water: essential, abundant, and not a differentiator.
          </Callout>

          <p className="mb-6">
            Barry Schwartz called this the paradox of choice. It&apos;s human nature that more options lead to less satisfaction. I believe there is an ideal range of number of software alternatives that makes you commit the most. If there&apos;s only one solution, you might find it suspicious or it can be because the market is too early and the solution might not be good yet. A few alternatives are ideal, but if there are too many, you may start looking for something that is &quot;just for you&quot; and have more difficulty finding it.
          </p>

          <ShareableChart 
            src="/images/charts/chart-paradox-of-choice.png"
            alt="The Paradox of Choice in Software"
            caption="Barry Schwartz's paradox of choice: more options, less satisfaction."
          />

          <SectionHeader>Implication 3: The middle class of software products will disappear</SectionHeader>

          <p className="mb-6">
            The previous leads to something interesting. SaaS is about to get the App Store treatment and it will start to resemble a power law system.
          </p>

          <ShareableChart 
            src="/images/charts/chart-app-store-revenue.png"
            alt="App Store Revenue Distribution"
            caption="Top 1% of apps capture 95% of all App Store revenue. Vibecoding does to all software what the App Store already did to mobile apps."
          />

          <SubSection>3.1) The death of the &quot;good enough&quot; vendor</SubSection>

          <p className="mb-6">
            When software was hard to build, companies survived by being the only ones who could do X. When anyone can vibecode an alternative over a weekend, the mid-sized company charging $50/month for a simple tool has no moat left. The product becomes a commodity. The companies in the middle — those with high overhead but no unique aggregator power — get squeezed from both sides. They are too expensive to compete with a free AI-generated tool and too small to compete with the network effects of a giant.
          </p>

          <SubSection>3.2) The rise of the long tail</SubSection>

          <p className="mb-6">
            Since the cost of creation is near zero, we will see a Cambrian explosion of hyper-niche, disposable software. A freelancer vibecodes their own invoicing app. A teacher vibecodes their own grading tool. These are not businesses — they are personal utilities. There will be millions of them.
          </p>

          <SubSection>3.3) The power of the aggregators</SubSection>

          <p className="mb-6">
            In a sea of infinite vibecoded apps, the only things that matter are trust, distribution, and identity. Users will flock to a few mega-aggregators because these platforms provide the infrastructure and the verified ecosystem that individual apps lack. You might vibecode your own note-taking app, but you still need it to run on someone&apos;s cloud, authenticate through someone&apos;s identity layer, and be discoverable through someone&apos;s ecosystem.
          </p>

          <SectionHeader>Implication 4: If you want to win, sell services, not products</SectionHeader>

          <Callout>
            &quot;The next $1T company will be a software company masquerading as a services firm&quot; — Sequoia
          </Callout>

          <p className="mb-6">
            Right now, for every $1 companies spend on software, they spend about $6 on services. The entire SaaS playbook was about capturing that software dollar. But when AI can do the work itself, the real opportunity is capturing the services dollar… at software margins.
          </p>

          <p className="mb-6">
            Think about it this way. A company might spend $10k a year on accounting software and $120k on an accountant to close the books. The next big company won&apos;t sell better accounting software. It will just close the books.
          </p>

          <p className="mb-6">
            This changes what it means to be an expert too. A brilliant tax specialist doesn&apos;t need to be &quot;hired&quot; by one company anymore. They can sell their specific expertise to 200 clients, because AI handles everything except the judgment calls. You don&apos;t need to do the junior tasks. You don&apos;t need to be in an office. You just need to be the best at one specific thing and package that as an outcome.
          </p>

          <p className="mb-6">
            The job as we know it… a salary, a desk, a mix of important and mundane tasks… that structure exists because companies needed warm bodies for the mundane parts. When AI handles the mundane, what&apos;s left is the judgment, brand, proven track record, experience, and network. And judgment doesn&apos;t need to be full-time. It doesn&apos;t even need to be employed. It can be an agency of one.
          </p>

          <SectionHeader>…So what do you do?</SectionHeader>

          <p className="mb-6">
            The evolution of software is now following the same path that other low-barrier fields have followed for decades.
          </p>

          <p className="mb-6">
            <strong>If you are a software engineer:</strong> welcome to what non-technical people have been experiencing for years. Get ready for less experienced people giving you advice, evaluating your work, and second-guessing your decisions. Your options are: be the absolute best (the far right of the power law), or combine strong technical skill with something else… design, distribution, brand, domain expertise. The worst position is being merely competent at software and nothing else.
          </p>

          <p className="mb-6">
            <strong>If you are not a software engineer:</strong> you can build things now. But code was never the hard part. The hard part is taste, distribution, and making something people actually want. That hasn&apos;t changed.
          </p>

          <p className="mb-6">
            <strong>If you&apos;re building a company:</strong> stop thinking about software as the product. Think about what outcome your customer actually pays for, and sell that. The tool is a commodity. The work is the moat.
          </p>

          <p className="mb-8">
            The barrier to entry for software has fallen. It&apos;s not coming back up. The question isn&apos;t whether this changes everything. It&apos;s whether you&apos;ll be the one doing the changing, or the one being changed.
          </p>

          <p className="mt-12 pt-8 border-t border-border text-muted-foreground">
            Update: someone posted this on Hacker News and it turned into a really good debate, with plenty of people agreeing, disagreeing, and pushing on the details. If you want to jump in or tell me where I got it wrong, that&apos;s the best place to do it:{' '}
            <a
              href="https://news.ycombinator.com/item?id=48694563"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              the discussion on Hacker News
            </a>
            .
          </p>

          <ReadMore currentUrl="/writing/software-abundance" />
        </div>
      </article>
    </div>
  )
}
