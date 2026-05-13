import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageTracker } from '@/components/page-tracker'

export const metadata: Metadata = {
  title: 'Every good date we had in San Francisco | Tereza Tizkova',
  description: 'A curated list of date spots in SF that were actually worth it',
  openGraph: {
    title: 'Every good date we had in San Francisco',
    description: 'A curated list of date spots in SF that were actually worth it',
    images: [
      {
        url: 'https://www.terezatizkova.com/api/og?title=Every%20good%20date%20we%20had%20in%20San%20Francisco&subtitle=A%20curated%20list%20of%20date%20spots%20in%20SF%20that%20were%20actually%20worth%20it',
        width: 1200,
        height: 630,
        alt: 'Every good date we had in San Francisco',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Every good date we had in San Francisco',
    description: 'A curated list of date spots in SF that were actually worth it',
    images: ['https://www.terezatizkova.com/api/og?title=Every%20good%20date%20we%20had%20in%20San%20Francisco&subtitle=A%20curated%20list%20of%20date%20spots%20in%20SF%20that%20were%20actually%20worth%20it'],
  },
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.02em] mt-16 mb-6 pt-8 border-t border-border">
      {children}
    </h2>
  )
}

function Venue({ name, url, children }: { name: string; url?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="font-serif text-[18px] tracking-[-0.01em] mb-2">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            {name}
          </a>
        ) : (
          name
        )}
      </h3>
      <p className="text-[17px] leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  )
}

export default function SFDatesArticle() {
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
            Every good date we had in San Francisco
          </h1>
          <p className="text-[18px] sm:text-[20px] text-muted-foreground mb-6">
            A curated list of date spots in SF that were actually worth it
          </p>
          <div className="flex items-center gap-4 text-[13px] font-mono text-muted-foreground">
            <span>May 2026</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose-custom">
          <p className="text-[17px] leading-relaxed mb-6">
            We spent a few months in San Francisco and went on a lot of dates... not all of them were great, but I kept notes on the ones that were actually worth it, and this is the list. If you&apos;re planning dates in SF or just moved there with a partner, this might save you some googling.
          </p>

          <SectionHeader>Dinner</SectionHeader>

          <Venue name="Spruce" url="https://www.sprucesf.com/">
            In the Presidio Heights area is proper fine dining with a wonderful atmosphere... we ended up making friends with an elegant couple from Santa Barbara at the bar. That kind of place.
          </Venue>

          <Venue name="Indigo" url="https://www.indigoinsf.com/">
            A solid dinner that won&apos;t destroy your wallet, and you can walk along the Marina after. Good combo.
          </Venue>

          <Venue name="Serafina" url="https://www.serafinasf.com/">
            A cute Italian restaurant in Marina run by actual Italians.
          </Venue>

          <SectionHeader>Night out</SectionHeader>

          <Venue name="Lakehouse Jazz" url="https://themellowsf.com/events/lakehouse-jazz/">
            A hidden boathouse in the middle of Golden Gate Park where they do live jazz nights. When you drive there after dark it honestly looks like they&apos;re about to sink you in the lake... the road narrows, there&apos;s water on both sides, no lights. Great jazz bands, you can get drinks, very cute atmosphere. Wear warm clothes.
          </Venue>

          <Venue name="NightLife at the California Academy of Sciences" url="https://www.calacademy.org/nightlife">
            One of those things that sounds touristy but is actually great. Cocktails, exhibitions, a fair, dancing... the ticket includes the planetarium. We missed Shroom Night because my partner had to ship some infra, which is a very San Francisco sentence. I love the academy.
          </Venue>

          <Venue name="Alcatraz Night Tour" url="https://www.cityexperiences.com/san-francisco/city-cruises/alcatraz/tour-options/night/">
            Do the night tour, not the day one. Wear warm clothes, the ship gets windy. The audio tour is really well done, and I&apos;d recommend watching Shawshank Redemption or Green Mile after... the escape was partially inspired by Alcatraz and it hits different when you just walked through those cells.
          </Venue>

          <Venue name="Harper & Rye" url="https://www.harperandrye.com/">
            A good cocktail bar, worth a stop.
          </Venue>

          <Venue name="Alamo Drafthouse" url="https://drafthouse.com/sf">
            Cinema where they bring food and drinks to your little tables during the movie. Bar Arcana is right next to it, and they&apos;re working on a newer dinner concept too. Three reasons to go to one spot.
          </Venue>

          <SectionHeader>Sport & active</SectionHeader>

          <Venue name="Tennis in Golden Gate Park">
            You can book courts and rent all equipment. Reserve well in advance though, especially for weekends and prime time slots... they go fast.
          </Venue>

          <Venue name="Rent a bike and ride to Sausalito via the Golden Gate Bridge">
            Probably the most San Francisco date you can do. Any rental shop around Fisherman&apos;s Wharf works.
          </Venue>

          <Venue name="Working out together at a Crunch gym">
            An underrated date. They&apos;re colorful and fun, and the locations are always near good food... the one on Polk Street is close to Harris, the Marina ones have solid dumpling places and Roam Burgers nearby. Gym plus food, easy date.
          </Venue>

          <Venue name="Twin Peaks">
            For a run or stargazing... except the fog is just fogging. We went up there to stargaze and it was honestly impossible because of the fog, but the atmosphere is something else. You try, you fail, you still had a great time up there.
          </Venue>

          <SectionHeader>Classes & activities</SectionHeader>

          <Venue name="Dance lesson in the Mission">
            We did a dance lesson once, then went for ramen at <a href="https://www.tanikusf.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Taniku Izakaya</a> where we stood in line for about 30 minutes and it was completely worth it. The dance lesson itself was cute but they got way too salesy at the end trying to sign us up for packages... if you want the lesson without the sales pitch, friends recommended <a href="https://www.citydancesf.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">City Dance</a> as a better option.
          </Venue>

          <SectionHeader>Walking around & daytime</SectionHeader>

          <Venue name="Zgo Perfumery" url="https://www.zgoperfumery.com/">
            In Castro has really unique perfumes. My boyfriend got me a selection of samples for my birthday that he personally chose, which was already a great gift on its own. You can go there together and pick out a few samples or buy a full bottle... it&apos;s a surprisingly fun experience. When you&apos;ve sniffed too many scents, they have coffee beans so you can reset your nose. Combine it with <a href="https://www.theinfatuation.com/san-francisco/reviews/neighbors-corner" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Neighbor&apos;s Corner Cafe</a> or <a href="https://poesiasf.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Poesia</a> nearby.
          </Venue>

          <Venue name="Haight Street secondhand shopping">
            A must-do. It can get overwhelming so pace yourself.
          </Venue>

          <Venue name="Tartine Manufactory" url="https://www.tartinemanufactory.com/">
            Great bakery, but go on weekdays. Weekends are too busy. There&apos;s a cute stationery/gift/decorations store right next to it, worth browsing.
          </Venue>

          <Venue name="Fume in Marina">
            A cute cafe, good for a low-key afternoon.
          </Venue>

          <SectionHeader>Other</SectionHeader>

          <Venue name="Vivarium" url="https://vivarium.sh/">
            A membership-based shared space for creative engineers and artists. ~7,000 sq ft, open 8am-2am, hardware workshop, desks, monitors. Not a date venue in the traditional sense, but we visited and it has a very specific energy... the kind of place where people are building things at midnight and nobody thinks that&apos;s weird. If you and your partner are both into making stuff, this is worth knowing about.
          </Venue>

          <Venue name="Apartment touring together">
            This one is specific to SF. The housing market here is so competitive that any decent apartment (and by decent I don&apos;t mean cheap, we gave up on that long ago) disappears within hours. Everyone runs bots monitoring Zillow and Craigslist, it&apos;s a whole thing. So when you actually manage to book a tour, you show up dressed like you&apos;re going to a Michelin restaurant, with a motivational letter and a gift for the landlord or agent, and you just try your best to make them like you. It&apos;s a surprisingly good date because it&apos;s fancy, a bit absurd, and it tests how well you plan and strategize together. If you can survive SF apartment hunting as a couple, you can survive anything.
          </Venue>

          <SectionHeader>What other people recommend</SectionHeader>

          <p className="text-[17px] leading-relaxed mb-8">
            I haven&apos;t tried these, but they kept coming up in conversations and online recommendations, and some of them are too good not to mention.
          </p>

          <Venue name="Church of 8 Wheels" url="http://www.churchof8wheels.com/">
            A roller disco inside a 120-year-old abandoned church near the Painted Ladies. Stained glass windows, disco lights, roller skating... I am not sure if this is the most San Francisco thing I&apos;ve ever heard or the most absurd, but I want to go.
          </Venue>

          <Venue name="Dear San Francisco at Club Fugazi" url="https://www.clubfugazisf.com/">
            Apparently an acrobatic love letter to the city... circus acts, theater, music, poetry about SF history from the Gold Rush to the Beat generation. I&apos;m from the Czech Republic, where we take our theater very seriously, and even I think this sounds like something special.
          </Venue>

          <Venue name="The Jury Experience" url="https://thejuryexperience.com/">
            A date where you sit in a courtroom, listen to a case, and decide the verdict together. I can already see this turning into a three-hour argument about reasonable doubt over dinner. Sounds perfect.
          </Venue>

          <Venue name="Exploratorium After Dark" url="https://www.exploratorium.edu/visit/calendar/after-dark">
            Adult-only Thursday nights at the science museum on Pier 15. All the interactive exhibits without kids running around. If you liked the California Academy of Sciences NightLife, this is the same energy at a different museum.
          </Venue>

          <Venue name="Japantown" url="https://www.sfjapantown.org/">
            Keeps coming up... vintage samurai outfits on display, great ramen and sushi, a Hello Kitty store. Someone on X described it as &quot;so much fun,&quot; which is not the most detailed review, but the photos looked genuinely good.
          </Venue>

          <Venue name="The three-restaurant fries comparison date">
            Someone on X described taking their date to three different restaurants in one night just to compare who had the best fries. The entire date was rating texture, crispiness, and seasoning. I have no idea where they went, but I love this as a concept. You could do this in the Marina or along Polk Street and walk between spots.
          </Venue>

          <Venue name="Candlelight Concerts" url="https://feverup.com/en/san-francisco/candlelight">
            Classical music in historic venues lit by hundreds of candles. They do Vivaldi, Hans Zimmer tributes, and a bunch of others. I&apos;d probably go for one of the weirder programs over straight classical, but the setting alone seems worth it.
          </Venue>

          <p className="text-[17px] leading-relaxed my-8">
            A thread on r/AskSF with almost 200 upvotes and 100+ comments had a few more that I hadn&apos;t seen anywhere else...
          </p>

          <Venue name="Bonfire at Ocean Beach" url="https://www.parksconservancy.org/parks/ocean-beach-sf-bonfire-fire-pit-san-francisco">
            Bring your own wood and blankets, sit on the sand, watch the sun go down. Multiple people in the thread called this the most San Francisco evening you can have, and honestly it sounds like it... low effort, high payoff, and you don&apos;t need a reservation or a credit card.
          </Venue>

          <Venue name="Sandbox VR" url="https://sandboxvr.com/sanfrancisco">
            On Market Street... full haptic suits, zombie-shooting VR experience, apparently way more intense than it sounds. Multiple Redditors independently said &quot;trust me on this one,&quot; which is either a great sign or a cult. One person specifically noted it&apos;s not a first date idea but perfect for a second date, which I appreciate as a data point.
          </Venue>

          <Venue name="Urban Putt" url="https://urbanputt.com/">
            Indoor mini golf bar (note: may have closed, check before going). This kept getting mentioned alongside Church of 8 Wheels as part of the classic non-dinner date rotation in SF... drinks, mini golf, no pressure to make conversation for two straight hours because you&apos;re doing something.
          </Venue>

          <Venue name="Glen Canyon Park" url="https://sfrecpark.org/511/Glen-Canyon-Park">
            One Redditor called it their &quot;personal fave urban oasis,&quot; which is the kind of thing people say when they actually go there regularly and not just once for Instagram. It&apos;s a peaceful little walk that&apos;s not the typical tourist hike... no crowds, no parking drama, just a quiet canyon in the middle of the city.
          </Venue>

          <Venue name="Giants game at Oracle Park" url="https://www.mlb.com/giants/tickets">
            Someone pointed out that baseball games are actually great dates because it&apos;s quiet enough to talk, and if it&apos;s cold you can cuddle. Cheap tickets exist if you don&apos;t care about the seats, and the ballpark food is solid. I like this one because it&apos;s three hours of built-in activity where you don&apos;t have to plan anything.
          </Venue>
        </div>
      </article>
    </div>
  )
}
