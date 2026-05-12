import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageTracker } from '@/components/page-tracker'

export const metadata: Metadata = {
  title: 'A guide to not wasting money on conference booths | Tereza Tizkova',
  description: 'My learnings from sponsoring a conference as a dev tool startup',
}

// Reusable components for article content
function ArticleImage({ src, alt, caption, sourceUrl }: { src: string; alt: string; caption?: string; sourceUrl?: string }) {
  return (
    <figure className="my-8">
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={900}
          className="w-full h-auto"
          unoptimized
        />
      </div>
      {(caption || sourceUrl) && (
        <figcaption className="text-center mt-3 text-sm text-muted-foreground">
          {caption}
          {sourceUrl && (
            <a 
              href={sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary ml-1"
            >
              Source
            </a>
          )}
        </figcaption>
      )}
    </figure>
  )
}

function SecretTip({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <div className="my-8 pl-4 border-l-4 border-primary bg-card/50 py-4 pr-4">
      <p className="text-[15px] leading-relaxed">
        <strong className="text-primary">Secret tip {number}:</strong> {children}
      </p>
    </div>
  )
}

function SectionHeader({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.02em] mt-16 mb-6 pt-8 border-t border-border">
      {number}. {children}
    </h2>
  )
}

export default function ConferenceBoothsArticle() {
  return (
    <div className="min-h-screen overflow-x-hidden">
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
            A guide to not wasting money on conference booths
          </h1>
          <p className="text-[18px] sm:text-[20px] text-muted-foreground mb-6">
            My learnings from sponsoring a conference as a dev tool startup
          </p>
          <time className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
            April 2026
          </time>
        </header>

        {/* Content */}
        <div className="text-[16px] sm:text-[17px] leading-[1.75] text-foreground/90 break-words">
          <p className="mb-6">
            You can just do things. But you can&apos;t just spawn at a conference with your company and expect good results.
          </p>

          <p className="mb-6">
            TL;DR conferences are all about how to attract relevant people to your booth and get leads from that. But it all starts months before the conference, which is bad news for us startups. You can&apos;t just vibe-organize a conference, like you do with hackathons or meetups. There will be a long checklist, and a lot of strict deadlines. You just can&apos;t approve a booth design late, or decide to order something last minute.
          </p>

          <p className="mb-6">
            Here are some thoughts about how to sponsor conferences such that it&apos;s meaningful, and observations from my first-ever conference I attended with a dev tool company. This one was HumanX in San Francisco, focused a lot on AI and tech.
          </p>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fed483b9-95a3-45a1-82bf-5d5d29e42075-MWXCNfj3n9dpOdU1QivffpYlKzrxVz.webp"
            alt="HumanX conference badge - Tereza Tizkova, E2B, Growth"
          />

          <p className="mb-6 text-center text-sm text-muted-foreground italic">
            One thing I heard about too late: some conferences sell badge or lanyard sponsorships. Your logo on every single attendee. Worth asking about early.
          </p>

          <SectionHeader number={1}>Plan activities and attractions outside the booth</SectionHeader>

          <p className="mb-6">
            You should use the outside the booth as the beginning of your funnel. We had an idea for distributing flyers for an ongoing competition or raffle that would happen at our booth, and have a special prize. We didn&apos;t deliver this, but I would love to still try.
          </p>

          <p className="mb-6">
            Some people also had various hardware for the outside-the-booth promo. I am not sure whether it is the next closest thing to AGI or a trash bin, but I am a big fan, and people took selfies with it:
          </p>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd8c2a9b-ba19-46c2-927d-9d4e7b4a9fe6-bne3hcUIgVVtkG4PEvFnpEHkwqpKDI.webp"
            alt="Oracle/NVIDIA delivery robot at conference"
          />

          <SecretTip number={1}>
            Find your go-to person at the organizing team. There will be an official platform, app, and tons of emails, but you want one real human you can reach out to with out-of-the-box requests. There will be chaos, and it&apos;s good to have someone on your side. For example, with organizers, I was able to do a behind-the-scenes tour across the conference venue before it ever started.
          </SecretTip>

          <SecretTip number={2}>
            Don&apos;t pick a booth that&apos;s not facing people/entrance/an area where people are. My biggest beginner mistake was choosing a booth facing an empty corner.
          </SecretTip>

          <SectionHeader number={2}>Make the booth feel fresh &amp; healthy &amp; warm</SectionHeader>

          <p className="mb-6">
            The challenge of conference booths is not to let them drain your soul out of you. Like this:
          </p>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d6475354-177e-4889-bbf2-41821c174706_2560x1920-2mruNzsh5EzVzfYu23M9cuuh4fbs3a.webp"
            alt="Generic corporate booth - Flight Display Systems"
          />

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/be43ace8-d627-4a12-89be-ef0d8f624095_600x562-EmTrk4KQSV7Bbk8bQUkkrqyZrCzhvn.webp"
            alt="Boring corporate booth with banners"
          />

          <p className="mb-6">
            I would definitely bring items that are either alive or at least feel fresh and friendly. Think flowers, smoothies, fruit, vegetables. The conference will surprise you with MANY exhausting elements like lack of oxygen, corporate lighting, soulless slogans, dull colors on the booths, anti-nutritious snacks, or lack of proper hydration... Your benchmark should be, If Bryan Johnson visits the conference, he should head to your booth to not die.
          </p>

          <p className="mb-6">Adding some examples of booths that feel alive and warm:</p>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9febc983-b8c5-4374-a054-c54650177556-M7xCMxOo3ya13nQq8eoqlJs3H6rDqt.webp"
            alt="Impala.ai booth with safari theme, real tree and antelope"
          />

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b9d103d7-d76f-4da8-ae49-e7741ccc9d58-AMwGyIVuNcGSPbgvbiK6gxY10FlElw.webp"
            alt="Obviously NYC bodega booth"
          />

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8268f9fa-2ef0-450f-b581-7d29fbf8999e-hez6fWTijbUwjv18ihmjr4YYs5U0s2.webp"
            alt="Alice.io Wonderland-themed tea time booth"
          />

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0687518b-de3f-4d82-9dc0-d4deb3f9e6fb_1280x848-veC1Td6ycFRU2rvRL4xYvEInmcMYvj.webp"
            alt="Instacart Caper green checkered grocery store booth"
          />

          <SecretTip number={3}>
            Don&apos;t use black color as a background on designs. From my experience with at least four different vendors and design types (cardboard, fabric, conference wall, paper), it often goes not as planned and the lighter print isn&apos;t bright enough on the black. If you do use black as the background, make the rest big enough to still be visible.
          </SecretTip>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6abf09ce-e7d1-4868-8436-64c1795ed711_2048x1536-aKMuZrA3z8zxaTr3oCCR3WyY1LKKYa.webp"
            alt="E2B booth - Agents are Humans Too"
          />

          <SecretTip number={4}>
            When we were booking, there were only small booths left, but organizers let us connect two small booths into one bigger. It&apos;s always worth asking these things.
          </SecretTip>

          <SectionHeader number={3}>Prepare interactive activities</SectionHeader>

          <p className="mb-6">
            This one is obvious advice, so I am rather sharing specific ideas for interactive activities:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>Live challenge on a big screen with a timer so other people can watch other visitors trying to complete it.</li>
            <li>Whatever activity you plan, have an ongoing leaderboard shown such that people can even come back to see how they stand or try again.</li>
            <li>A &quot;guess the output&quot; game related to your product. People like quizzes.</li>
            <li>Spin a fortune wheel, but every prize requires something product-related, like watching a demo or testing a product.</li>
            <li>A wall where people write or pin something. E.g. &quot;my most and least favorite developer tool&quot; or &quot;what I want to ship this month&quot; or just something funny and absurd. Think about what makes people post the wall online.</li>
            <li>Pair with a visitor for 5 minutes and build something together that&apos;s useful for them.</li>
          </ul>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/610279d6-747a-4aec-a09d-5cb4c71d5723_1452x822-kQtTwtWHxC8HzzsMtIldig5O1S4ttT.webp"
            alt="Symplr booth with interactive game and leaderboard"
          />

          <SecretTip number={5}>
            Bring your own extension cords and power strips. The conferences often charge absurd prices for extra power in the booth, and you don&apos;t even know if it would be needed in the end. On the other hand, depending on your demo, you might need extra hotspot or to prepare an offline version.
          </SecretTip>

          <SecretTip number={6}>
            Research your booth neighbors before you buy the booth. If you are next to boring exhibitors, people will not be attracted to go to your aisle. This is really crucial.
          </SecretTip>

          <SectionHeader number={4}>Prepare something creative and memorable</SectionHeader>

          <p className="mb-6">
            You need one thing that makes someone stop walking. A few ways to get there:
          </p>

          <p className="mb-6">
            <strong>Be literal.</strong> This cheap trick always works. Building cloud sandboxes? Bring a real sandbox. Selling a fast product? Bring a plush cheetah and call it your mascot. I&apos;ve seen one of my favorite companies bring a plush goat and say something about hiring a G.O.A.T. I don&apos;t even know what the connection was, but my phone gallery contains way too many photos of people riding that goat and having fun.
          </p>

          <p className="mb-6">
            <strong>Add something random and create an excuse for it.</strong> Especially if your product is some SaaS and you think you can&apos;t make it creative... there are no rules. The excuse doesn&apos;t even have to be good. People remember the weird booth, not the correct one.
          </p>

          <p className="mb-6">
            <strong>Imagine your booth is a real space, not a display.</strong> The best booths I saw felt like walking into a small room, not standing in front of a wall. A rug, some lighting, a couch... it changes how long people stay.
          </p>

          <p className="mb-6">
            On the other hand, I still have no idea what the product of some of the most creative booths was. But I remember them. And that&apos;s the point.
          </p>

          <p className="mb-6">
            Another great example is <a href="https://smallest.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Smallest AI</a> with their &quot;Small Language Model Club&quot; swag - a clever play on the ubiquitous &quot;Large Language Model&quot; terminology. The booth also featured a fun Windows-style warning dialog: &quot;You are about to get too free and have loads of time to help your business.&quot;
          </p>

          <ArticleImage
            src="/images/smallest-ai-booth.jpeg"
            alt="Smallest AI booth with team members and creative Windows warning dialog display"
            sourceUrl="https://x.com/lilyyang169/status/2033769248108253539?s=20"
          />

          <ArticleImage
            src="/images/smallest-ai-swag.jpeg"
            alt="Smallest AI tote bags with Small Language Model Club branding"
            sourceUrl="https://x.com/lilyyang169/status/2033769248108253539?s=20"
          />

          <ArticleImage
            src="/images/smallest-ai-neon.jpeg"
            alt="Smallest AI neon sign with Small Language Model Club tote bags hanging below"
            sourceUrl="https://x.com/lilyyang169/status/2033638390646903090?s=20"
          />

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cede5072-5fc5-46c8-b629-3defb0e77cae_1200x1069-wXWSF8i3MVNgFutW83pjfBIqYjvJ9d.webp"
            alt="JupiterOne booth with green alien mascot"
          />

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b4ac665f-3477-4022-b458-c5a18ec99d04-ANGcblU3bR9IvwAw7kykF4hhMxiuP3.webp"
            alt="Obviously NYC bodega booth full view"
          />

          <SecretTip number={7}>
            Ship your stuff to the venue well in advance, because later = more expensive. But also, don&apos;t forget that you will need to deliver the things after the conference back to your office. For that, you might need to have packaging and labeling prepared. I forgot about this part completely and then moved a lot of things on my own on the last day.
          </SecretTip>

          <SecretTip number={8}>
            Co-host side events with other companies. The conference itself is just the anchor, and a lot of the real networking happens at dinners, rooftop drinks, or small panels that companies organize around it. Find 2-3 non-competing companies with a similar audience and split the cost.
          </SecretTip>

          <SecretTip number={9}>
            Badge swapping is a thing. I&apos;ve seen companies rotate people by just exchanging badges because nobody was checking. If you have a big team but limited booth passes, apparently this works. I&apos;m not saying it&apos;s the official advice. I&apos;m saying I saw it happen a lot.
          </SecretTip>

          <SectionHeader number={5}>Focus on attracting relevant people</SectionHeader>

          <p className="mb-6">
            A coffee stand and bunch of merch doesn&apos;t mean people are interested in your company. I recently learned a new German term: &quot;Der Hamsterkauf&quot;. It describes what I have seen happening at the conference. I heard stories about men wandering around with a suitcase ready to be packed with companies&apos; swag.
          </p>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/838c57b6-46bd-468a-b4b3-55e21c3e2e9a_940x788-KWfAdKHD2NPLlK0dVHCs8ZjIBMfVxl.webp"
            alt="Der Hamsterkauf - German word for panic buying"
          />

          <p className="mb-6">
            The real work of attracting relevant people starts before the conference even opens. Reach out to your existing users and prospects weeks ahead. &quot;We&apos;ll be at booth 42, come say hi&quot; is a weak email. &quot;We&apos;re launching X at the conference, book a 10-minute slot and see it first&quot; is a reason to show up.
          </p>

          <p className="mb-6">
            You can also buy visibility at the conference itself... outside spots, digital screens, sponsored emails to attendees, spots in the official app.
          </p>

          <p className="mb-6">
            There&apos;s a lot available, and the rule of thumb is: anything extra costs extra. Extra monitors, catering, power, a better WiFi connection... none of it is free, and most of it has a deadline weeks before the event. Ask for the full sponsorship menu early so you know what&apos;s possible and what&apos;s already taken.
          </p>

          <p className="mb-6">You can also invest in external ads:</p>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8eb5527a-2fe7-4427-a686-4d68c069d25b-ijUL1LA0i2n5dxFzD99unmtx2gnPXW.webp"
            alt="Kong mobile billboard ad truck outside conference"
          />

          <SectionHeader number={6}>Be strategic about getting your leads</SectionHeader>

          <p className="mb-6">
            The honest truth is that most conference leads are low quality. People let you scan a QR code on their badge (=you getting their contact) because they want your tote bag, not your product. I have been there and at my lowest I let people scan my code at a &quot;beer garden&quot; to get a nonalcoholic beer.
          </p>

          <p className="mb-6">
            The question should be how to filter the leads. The simplest thing that works would be something related to your product, like &quot;get early access&quot; or &quot;try it free for 3 months.&quot; An action that the visitor would really only take if they are at least interested to try it out. I have seen some companies giving discount codes for their product.
          </p>

          <p className="mb-6">
            Another thing that worked for people I talked to: booking short demos on the spot. Not &quot;let me show you everything for your use case.&quot; More like &quot;give me 5 minutes, I&apos;ll show you the one thing that matters.&quot;
          </p>

          <p className="mb-6">
            If you run any sort of competition or interactive activity, ask at least one qualifying question. &quot;What&apos;s your team size?&quot; or &quot;What tools do you use today?&quot; Now your lead list has context, and you can actually follow-up with something relevant instead of a generic &quot;great meeting you at the conference&quot; email.
          </p>

          <p className="mb-6">
            Send the follow-up within 48 hours, and reference something specific. (If you can&apos;t then the lead probably isn&apos;t a real lead.)
          </p>

          <SectionHeader number={7}>Final checklist</SectionHeader>

          <p className="mb-6">
            Conferences are an expensive beast. The booth with everything around can easily cost you over $50,000, and most booths blend into one gray blur one day after it&apos;s over. I would say the bar is low, and I experienced how difficult it is to get it right at the first try, and hopefully learned a lot for the next one! Hope you enjoyed my post. P.S. Here is everything I put together for to-dos:
          </p>

          <h3 className="font-serif text-[20px] tracking-[-0.01em] mt-8 mb-4">Very urgent</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Booking the best spot</li>
            <li>Booking additional spots for ads, online/offline marketing</li>
            <li>Design of the booth</li>
            <li>Design and production of merch and any other fun stuff</li>
            <li>Ordering of catering, extra power, monitors, any technical equipment. You usually can&apos;t bring almost anything extra that hasn&apos;t been approved before.</li>
            <li>Preparing your lead capture setup. iPads, forms, badge scanners, whatever you pick. Test it before you go.</li>
            <li>Briefing your booth team. Everyone should know the 30-second pitch, who your ideal visitor is, and what to do when someone relevant shows up vs. someone just grabbing stickers.</li>
            <li>Find your go-to person at the organizing team early. You&apos;ll need them when things go sideways.</li>
            <li>Plan your interactive activity and test it. If it needs WiFi, screens, or power, confirm it actually works at the booth.</li>
            <li>Research your booth neighbors before buying.</li>
            <li>Reach out to other companies about co-hosting side events.</li>
          </ul>

          <h3 className="font-serif text-[20px] tracking-[-0.01em] mt-8 mb-4">Not that urgent</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Program for the booth</li>
            <li>Outreach before the conference</li>
            <li>Online campaign before the conference. You can probably pay for things like special group email or online posts</li>
            <li>Buying food and drinks for the booth</li>
            <li>Labels and packaging for delivering your things back from the booth to your office</li>
            <li>Comfortable shoes for the whole team</li>
            <li>Plan team rotation and shifts at your booth</li>
            <li>Nice-to-have but probably not necessary equipment like premium carpet or extra hotspot from Amazon.</li>
            <li>Preparing a follow-up email template so you&apos;re not writing it exhausted on the flight home.</li>
            <li>Making a shared doc or spreadsheet where the booth team logs notes about conversations in real time. You will forget everything by day two.</li>
            <li>Packing a small emergency kit: tape, scissors, markers, extension cords, phone chargers, painkillers. Something will break or be missing. And a lot of coffee!</li>
            <li>Fresh and alive things for the booth: flowers, fruit, plants. Whatever makes it feel human.</li>
            <li>Something shareable: branded cups, good stickers, a photo spot. Things that walk around the conference floor for you.</li>
          </ul>

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2980f703-b2f4-4efd-8821-9c8545acacdd-mWuSGPowzCKNFK5RiyLeZFWut2QnGv.webp"
            alt="E2B booth in action - team talking to visitors"
          />

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/504a4b01-3327-4b27-b41b-60b2fa979f3b-IIWOvVSphw4idAKfHI0CJMtKCZj00h.webp"
            alt="HumanX conference entrance with floral displays"
          />

          <ArticleImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cd2b31ac-6b0c-4664-a520-3725f2ad505a-A5ApxACpzS4VeY4ADxaVdlhYORXBld.webp"
            alt="HumanX main stage"
          />

          <SectionHeader number={8}>Bonus: My friend&apos;s favorite booths</SectionHeader>

          <p className="mb-6">
            These are two favorite conference booths of my friend{' '}
            <a 
              href="https://www.linkedin.com/in/jonas-scholz-490274163/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Jonas Scholz
            </a>
            . The first one (Patchstack) even offered free tattoos at their booth:
          </p>

          <ArticleImage
            src="/images/jonas-booth-1.jpeg"
            alt="Patchstack booth with Painless Security slogan and free tattoo station"
          />

          <ArticleImage
            src="/images/jonas-booth-2.jpeg"
            alt="Fuago booth with graffiti wall and vintage setup"
          />
        </div>
      </article>

      {/* Footer */}
      <footer className="px-6 sm:px-8 pb-12 max-w-[680px] mx-auto border-t border-border pt-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to home
        </Link>
      </footer>
    </div>
  )
}
