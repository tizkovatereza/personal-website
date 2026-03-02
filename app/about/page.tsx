import type { Metadata } from 'next'
import { SubscribeForm } from '@/components/subscribe-form'

export const metadata: Metadata = {
  title: 'About',
  description: 'About The Smart Method newsletter',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-accent">
        <header className="not-prose mb-12 space-y-4">
          <h1 className="font-serif text-4xl font-bold tracking-tight">About</h1>
          <p className="text-xl text-muted-foreground">
            The story behind The Smart Method
          </p>
        </header>

        <p>
          Hi, I'm Alex Chen. I'm a designer and writer exploring the intersection of 
          technology, productivity, and human flourishing.
        </p>

        <p>
          The Smart Method started as a personal experiment: could I build a sustainable 
          writing practice while working full-time in tech? What began as private notes 
          eventually became this newsletter—a space to think through ideas about how we 
          work, create, and live in an increasingly digital world.
        </p>

        <h2>What I Write About</h2>

        <p>
          My essays tend to orbit a few core themes:
        </p>

        <ul>
          <li>
            <strong>Deep work and focus</strong> — How to cultivate meaningful, concentrated 
            work in an age of distraction
          </li>
          <li>
            <strong>Thoughtful technology</strong> — Building and using tools that enhance 
            rather than diminish our lives
          </li>
          <li>
            <strong>Remote work and rituals</strong> — The practices and systems that make 
            flexible work sustainable
          </li>
          <li>
            <strong>Design philosophy</strong> — How the things we make shape the people 
            who use them
          </li>
        </ul>

        <h2>Why "The Smart Method"?</h2>

        <p>
          The name is a bit tongue-in-cheek. There's no single "smart method" for navigating 
          work and life—anyone who tells you otherwise is probably selling something. But there 
          is value in thinking methodically about our choices, in being intentional rather than 
          reactive.
        </p>

        <p>
          This newsletter is my attempt to think out loud about those choices. Sometimes I'll 
          share practical strategies; other times, it's more about asking better questions.
        </p>

        <h2>Get in Touch</h2>

        <p>
          I love hearing from readers. Whether you want to share your own experiences, push 
          back on something I've written, or just say hello, my inbox is always open.
        </p>

        <p>
          The best way to reach me is via email at{' '}
          <a href="mailto:hello@thesmartmethod.com">hello@thesmartmethod.com</a>. I read 
          everything, though I can't always respond to everything.
        </p>

        <p>
          You can also find me on{' '}
          <a href="https://twitter.com/thesmartmethod" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{' '}
          where I occasionally share shorter thoughts and links.
        </p>

        <div className="not-prose mt-12">
          <SubscribeForm />
        </div>
      </article>
    </div>
  )
}
