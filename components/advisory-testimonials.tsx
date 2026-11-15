'use client'

import { useEffect, useRef, useState } from 'react'
import avatarData from '@/content/advisory-avatars.json'
const avatars = avatarData as Record<string, string>

const quotes = [
  {
    name: 'Matan Grinberg',
    context: 'Co-founder & CEO, Factory',
    quote: "A few days in and she's already crushing it -- she owned the launch of Factory Router on Tuesday. … An ambitious scope for a truly 1 of 1 individual.",
    url: 'https://x.com/matanSF/status/2062600775172280428',
  },
  {
    name: 'Erik Dunteman',
    context: 'Co-founder & CEO, Modal',
    quote: "You absolutely crushed it! Great work and best wishes with what's next.",
    url: 'https://x.com/erikdunteman/status/2032539570496245989',
  },
  {
    name: 'Andrew Ng',
    context: '',
    quote: 'New course: Building Coding Agents with Tool Execution, taught by @tereza_tizkova and @FraZuppichini from @e2b.',
    url: 'https://x.com/AndrewYNg/status/1996250415244235013',
  },
  {
    name: 'Eno Reyes',
    context: 'Co-founder & CTO, Factory',
    quote: 'Tereza is already running a million miles an hour and crushed the launch of Factory Router.',
    url: 'https://x.com/EnoReyes/status/2062650766347952529',
  },
  {
    name: 'Francesca LaBianca',
    context: 'COO, Factory',
    quote: 'She is n=1 on all things growth, and exhibits relentlessness in everything she does.',
    url: 'https://x.com/francesca_lab/status/2062639698842136692',
  },
  {
    name: "Debbie O'Brien",
    context: '',
    quote: 'This is great talk by @tereza_tizkova and well worth watching.',
    url: 'https://x.com/debs_obrien/status/2104663998566175065',
  },
  {
    name: 'Anna',
    context: '@burninganna',
    quote: 'founders and operators who are exceptionally good at GTM: … @tereza_tizkova … thoughtful long-form writing, likely influenced by her math background.',
    url: 'https://x.com/burninganna/status/2067375237625487814',
  },
]

const moreQuotes = [
  { name: 'Natalie Sportelli', context: 'Clay', quote: "you'd be missing out if you're not following these growth and marketing folks: … @ElenaVerna @tereza_tizkova.", url: 'https://x.com/N_Sportelli/status/2121250696431382631' },
  { name: 'Haroon Choudery', context: 'AI Ready podcast · Our episode on AI agents', quote: 'Just recorded a 🔥 episode with @tereza_tizkova - all about AI agents.', url: 'https://x.com/haroonc/status/1762563455750381740' },
  { name: 'meng shao', context: '', quote: 'Fragments by @e2b_dev @tereza_tizkova …', url: 'https://x.com/shao__meng/status/1842788840664404448' },
  { name: 'Nehil Jain', context: 'Anyscale · On an E2B hackathon I organized', quote: 'Thanks @tereza_tizkova for such an amazing event. Learnt a ton about @e2b_dev!', url: 'https://x.com/nehiljain/status/1842773037122453997' },
]

type Appearance = { image: string; alt: string; source: string; title: string; url: string; description?: string }
const appearances: Appearance[] = [
  { image: '/images/advisory/keynote.jpg', alt: 'Tereza speaking at AI Engineer World’s Fair', source: 'AI Engineer World’s Fair · Keynote', title: 'Rise of the Software Factory', url: 'https://www.youtube.com/watch?v=vGCJ7diEtrw' },
  { image: '/images/advisory/technically.png', alt: 'Technically', source: 'technically.dev', title: 'How do “computer use” agents work?', description: 'How agents see a screen, decide what to do, and use a computer.', url: 'https://technically.dev/posts/how-do-computer-use-agents-work' },
  { image: '/images/advisory/launches.webp', alt: 'The secret behind viral product launches', source: 'With Kyle Jeong · Browserbase', title: 'The secret behind viral product launches', url: 'https://kylejeong.com/blog/no-such-thing-as-a-free-launch' },
  { image: '/images/advisory/fragments.png', alt: 'E2B Fragments project preview', source: 'E2B · Open-source project', title: 'Fragments', description: 'A template for building AI-generated apps with E2B sandboxes.', url: 'https://github.com/e2b-dev/fragments' },
  { image: '/images/advisory/agents.png', alt: 'Awesome AI Agents project preview', source: 'E2B · Open-source project', title: 'Awesome AI Agents', description: 'The directory of AI agents I built and maintain.', url: 'https://github.com/e2b-dev/awesome-ai-agents' },
  { image: 'https://media.licdn.com/dms/image/v2/D4E22AQFZ72duPhV7vg/feedshare-shrink_800/B4EZo3cwEjIoAg-/0/1761866875821?e=2147483647&v=beta&t=5BJmO0uXStETgHxDrrckBe8zklmREd2vKFNyb_0EUws', alt: 'Recording the course with Andrew Ng, Francesco Zuppichini and Esmaeil Gargari', source: 'DeepLearning.AI · Course launch', title: 'Building Coding Agents with Tool Execution', description: 'Co-created and taught with Francesco Zuppichini. Announced by Andrew Ng.', url: 'https://www.deeplearning.ai/short-courses/building-coding-agents-with-tool-execution/' },

]

type Item = { kind: 'quote'; value: typeof quotes[number] & { image?: string; note?: string; relatedUrl?: string } } | { kind: 'appearance'; value: typeof appearances[number] }
const items: Item[] = [
  { kind: 'quote', value: moreQuotes[0] },
  { kind: 'appearance', value: appearances[0] },
  { kind: 'quote', value: quotes[0] },
  { kind: 'quote', value: { name: 'Richard Mladek', context: 'Era Compute', quote: 'SF is all about making insanely talented friends', url: 'https://x.com/RMladek/status/2045307654629916770', image: 'https://pbs.twimg.com/media/HGJkQ6wboAASOSE.jpg' } },
  { kind: 'quote', value: quotes[4] },
  { kind: 'appearance', value: appearances[2] },
  { kind: 'quote', value: quotes[1] },
  { kind: 'appearance', value: appearances[5] },
  { kind: 'appearance', value: appearances[1] },
  { kind: 'quote', value: quotes[5] },
  { kind: 'quote', value: moreQuotes[1] },
  { kind: 'appearance', value: appearances[3] },
  { kind: 'appearance', value: appearances[4] },
  { kind: 'quote', value: moreQuotes[3] },
  { kind: 'quote', value: { name: 'Swetha Nyalam', context: 'E2B hackathon attendee', quote: 'A big thank you to Tereza Tizkova for putting together such an amazing event!', url: 'https://www.linkedin.com/posts/swetha-nyalam_i-had-the-incredible-opportunity-to-attend-activity-7248881779854467072-BZV_', image: 'https://media.licdn.com/dms/image/v2/D5622AQFsicrx3o42IQ/feedshare-image-high-res/feedshare-image-high-res/0/1728268093071?e=2147483647&v=beta&t=nEisWbZ1EYvhcOGs3sDZ385bn1lFqlS7zErn6aeP5V8' } },
  { kind: 'quote', value: { name: 'Richard Molnár', context: 'E2B hackathon attendee', quote: 'Thanks for organizing such a fun event, we had a great experience building something interesting!', url: 'https://www.linkedin.com/posts/tereza-tizkova-568439174_yes-im-posting-about-the-hackathon-again-activity-7312203593883832320-bYPD' } },
  { kind: 'quote', value: { name: 'Henry Scott-Green', context: 'Co-founder, Context.ai', note: 'On the AI agents map I created at E2B, a directory of agent projects and tools.', relatedUrl: 'https://github.com/e2b-dev/awesome-ai-agents', image: '/images/advisory/agents.png', quote: 'Great map!', url: 'https://x.com/HenrySG/status/1693575160085832015' } },
  { kind: 'quote', value: quotes[3] },
  { kind: 'quote', value: quotes[6] },
  { kind: 'quote', value: { name: 'Hank Taylor', context: 'Former VP of Marketing & RevOps, Vercel', quote: 'Tereza is great!', url: 'https://www.linkedin.com/posts/francesca-labianca-a15563158_very-excited-to-welcome-tereza-tizkova-to-activity-7468789652292915200-5229' } },
]

export function AdvisoryTestimonials() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [orderedItems, setOrderedItems] = useState<Item[]>([])
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const interactionUntil = useRef(0)

  useEffect(() => {
    const shuffle = (values: Item[]) => {
      for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[values[i], values[j]] = [values[j], values[i]]
      }
      return values
    }
    const quoteCards = shuffle(items.filter(item => item.kind === 'quote'))
    const workCards = shuffle(items.filter(item => item.kind === 'appearance'))
    const next: Item[] = []
    while (quoteCards.length || workCards.length) {
      if (quoteCards.length) next.push(quoteCards.pop()!)
      if (workCards.length) next.push(workCards.pop()!)
      if (quoteCards.length) next.push(quoteCards.pop()!)
    }
    try {
      const previous = sessionStorage.getItem('advisory-first-card')
      if (next[0].value.url === previous) next.push(next.shift()!)
      sessionStorage.setItem('advisory-first-card', next[0].value.url)
    } catch { /* Shuffling also works when storage is unavailable. */ }
    setOrderedItems(next)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    const visibility = () => setHidden(document.hidden)
    update(); visibility()
    media.addEventListener('change', update)
    document.addEventListener('visibilitychange', visibility)
    return () => { media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility) }
  }, [])

  function move(offset: number) {
    const node = track.current
    if (!node) return
    interactionUntil.current = performance.now() + 1500
    const max = node.scrollWidth - node.clientWidth
    const width = (node.firstElementChild as HTMLElement)?.offsetWidth || node.clientWidth
    const destination = offset > 0 && node.scrollLeft >= max - 2 ? 0 : offset < 0 && node.scrollLeft <= 2 ? max : node.scrollLeft + offset * (width + 20)
    node.scrollTo({ left: destination, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  useEffect(() => {
    const node = track.current
    if (!node || paused || reducedMotion || hidden || focused || dragging) return
    let frame = 0
    let previous = performance.now()
    let position = node.scrollLeft
    let lastWritten = position
    const animate = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05)
      previous = now
      const first = node.children[0] as HTMLElement | undefined
      const repeat = node.children[items.length] as HTMLElement | undefined
      const period = first && repeat ? repeat.offsetLeft - first.offsetLeft : 0
      if (now < interactionUntil.current) {
        position = node.scrollLeft
        lastWritten = position
      } else if (period > 0) {
        if (Math.abs(node.scrollLeft - lastWritten) > 2) position = node.scrollLeft
        position += dt * 28
        if (position >= period) position -= period
        node.scrollLeft = position
        lastWritten = node.scrollLeft
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [paused, reducedMotion, hidden, focused, dragging])

  return (
    <section aria-label="Posts, talks and writing" aria-roledescription="carousel" className="py-8 mb-4" onFocusCapture={event => { if ((event.target as HTMLElement).matches(':focus-visible')) setFocused(true) }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false) }}>
      <h2 className="font-serif text-[28px] sm:text-[32px] mb-6">My humble bragging:</h2>
      <div ref={track} className="flex flex-nowrap gap-5 overflow-x-auto scrollbar-hide pb-2" tabIndex={0} aria-label="Scroll through posts, talks and articles" onPointerDown={() => setDragging(true)} onPointerUp={() => { setDragging(false); interactionUntil.current = performance.now() + 1500 }} onPointerCancel={() => setDragging(false)} onPointerLeave={() => setDragging(false)} onWheel={() => { interactionUntil.current = performance.now() + 1800 }} onScroll={event => {
        const node = event.currentTarget
        const width = (node.firstElementChild as HTMLElement)?.offsetWidth || node.clientWidth
        setActive(Math.floor(node.scrollLeft / (width + 20)) % items.length)
      }}>
        {[...orderedItems, ...orderedItems].map((item, index) => (
          <div key={`${item.value.url}-${index}`} role="group" aria-hidden={index >= items.length} aria-roledescription="slide" aria-label={`${index % items.length + 1} of ${items.length}`} className="w-[86%] sm:w-[340px] shrink-0 border border-border flex flex-col min-h-[330px]">
            {item.kind === 'quote' ? (
              <figure className="p-6 flex flex-col justify-between gap-6 h-full">
                {item.value.image && <img src={item.value.image} alt={item.value.name === 'Richard Mladek' ? 'Tereza with Richard Mladek and Ted Bibr' : item.value.name === 'Henry Scott-Green' ? 'The AI agents directory I created at E2B' : 'Photo from the E2B hackathon'} width="2048" height="1536" loading="lazy" className="w-full aspect-[1.9/1] object-cover" />}
                {item.value.note && <p className="text-[14px] text-secondary leading-[1.75]">{item.value.relatedUrl ? <a href={item.value.relatedUrl} tabIndex={index >= items.length ? -1 : undefined} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">{item.value.note} ↗</a> : item.value.note}</p>}
                <blockquote className="text-[16px] leading-[1.85]"><p>“{item.value.quote}”</p></blockquote>
                <figcaption className="flex items-center gap-3 text-[13px] leading-relaxed">
                  <div className="relative shrink-0 w-9 h-9 rounded-full overflow-hidden bg-foreground/10 flex items-center justify-center text-[11px]" aria-hidden="true">
                    <span>{item.value.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span>
                    {avatars[new URL(item.value.url).pathname.split('/')[1]] && <img src={avatars[new URL(item.value.url).pathname.split('/')[1]]} alt="" width="36" height="36" loading="lazy" className="absolute inset-0 w-full h-full object-cover" onError={event => { event.currentTarget.hidden = true }} />}
                  </div>
                  <div><a tabIndex={index >= items.length ? -1 : undefined} href={item.value.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4" aria-label={`Read ${item.value.name}’s original post`}>{item.value.name} ↗</a>{item.value.context && <p className="text-secondary mt-1">{item.value.context}</p>}</div>
                </figcaption>
              </figure>
            ) : (
              <a tabIndex={index >= items.length ? -1 : undefined} href={item.value.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col h-full">
                {item.value.source === 'technically.dev' ? <div className="aspect-[1.9/1] bg-white text-black p-5 flex flex-col justify-between"><img src={item.value.image} alt="Technically" width="1200" height="630" loading="lazy" className="w-28 h-12 object-contain object-left" /><div className="space-y-2" aria-hidden="true"><div className="h-px bg-neutral-200 w-full" /><div className="h-px bg-neutral-200 w-5/6" /><div className="h-px bg-neutral-200 w-2/3" /></div><p className="text-[10px] text-neutral-600 mt-2">By Tereza Tizkova</p></div> : <div className="aspect-[1.9/1] overflow-hidden bg-black"><img src={item.value.image} alt={item.value.alt} width="640" height="360" loading="lazy" className="w-full h-full object-cover" /></div>}
                <div className="p-6"><p className="text-[12px] text-secondary mb-3">{item.value.source}</p><h3 className="font-serif text-[23px] leading-snug group-hover:underline underline-offset-4">{item.value.title} ↗</h3>{item.value.description && <p className="text-[14px] text-secondary leading-[1.75] mt-3">{item.value.description}</p>}</div>
              </a>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-1 mt-3 text-secondary">
        <span className="text-[12px] mr-3 tabular-nums">{Math.min(active + 1, items.length)} / {items.length}</span>
        <button type="button" aria-label="Previous card" onClick={() => move(-1)} className="w-10 h-10 hover:text-foreground">←</button>
        {!reducedMotion && <button type="button" aria-label={paused ? 'Play carousel' : 'Pause carousel'} onClick={() => { setPaused(value => !value); setFocused(false) }} className="w-10 h-10 text-[13px] hover:text-foreground">{paused ? '▶' : 'Ⅱ'}</button>}
        <button type="button" aria-label="Next card" onClick={() => move(1)} className="w-10 h-10 hover:text-foreground">→</button>
      </div>
    </section>
  )
}
