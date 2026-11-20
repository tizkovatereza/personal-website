import type { Metadata } from 'next'
import Link from 'next/link'
import article from '@/content/posts/hawaii.json'
import { DraftArticleBody } from '@/components/draft-article-body'
import { ReadingProgress } from '@/components/reading-progress'
import { ArticleEngagement } from '@/components/article-engagement'
import { ReadMore } from '@/components/read-more'

const url = 'https://www.terezatizkova.com/blog/hawaii'
const image = 'https://www.terezatizkova.com/images/hawaii/hawaii-050.jpg'

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: { canonical: url },
  openGraph: { title: article.title, description: article.description, type: 'article', url, publishedTime: article.date, authors: ['Tereza Tizkova'], images: [{ url: image, width: 1350, height: 1800, alt: 'The Big Island coastline' }] },
  twitter: { card: 'summary_large_image', title: article.title, description: article.description, images: [image] },
}

export default function HawaiiArticle() {
  return (
    <>
      <ReadingProgress />
      <article className="max-w-5xl px-6 sm:px-12 md:px-16 lg:px-20 py-16 mx-auto">
        <Link href="/blog" className="inline-block font-mono text-[11px] uppercase tracking-wide text-muted-foreground hover:text-foreground mb-8">← Back to writing</Link>
        <header className="mb-12 space-y-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"><time dateTime={article.date}>November 14, 2026</time> · Life · {Math.ceil(article.text.split(/\s+/).length / 200)} min read</p>
          <h1 className="font-serif font-normal text-[36px] sm:text-[48px] md:text-[56px] leading-[1.12] tracking-[-0.02em] text-foreground">{article.title}</h1>
          <p className="text-[18px] sm:text-[20px] leading-relaxed text-secondary max-w-2xl">{article.description}</p>
        </header>
        <DraftArticleBody html={article.bodyHtml} galleries={article.galleries} />
        <footer className="mt-16">
          <ArticleEngagement slug="hawaii" title={article.title} url={url} />
          <ReadMore currentUrl="/blog/hawaii" />
        </footer>
      </article>
    </>
  )
}
