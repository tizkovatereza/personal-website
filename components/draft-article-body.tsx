import { ArticlePhotoGallery, type ArticlePhoto } from '@/components/article-photo-gallery'

export interface DraftGallery {
  label: string
  afterText: string
  photos: ArticlePhoto[]
}

export function DraftArticleBody({ html, galleries = [] }: { html: string; galleries?: DraftGallery[] }) {
  const blocks: { html: string; gallery?: DraftGallery }[] = []
  let rest = html
  for (const gallery of galleries) {
    const anchor = rest.indexOf(gallery.afterText)
    if (anchor === -1) continue
    const end = rest.indexOf('</p>', anchor)
    if (end === -1) continue
    blocks.push({ html: rest.slice(0, end + 4), gallery })
    rest = rest.slice(end + 4)
  }
  if (rest) blocks.push({ html: rest })
  return blocks.map((block, index) => (
    <div key={block.gallery?.label ?? index}>
      <div className="prose text-[16px] sm:text-[17px] leading-[1.75] max-w-none prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-[1.75] prose-li:leading-[1.75] prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent prose-blockquote:not-italic prose-img:mx-auto prose-img:h-auto prose-figcaption:text-center prose-figcaption:text-muted-foreground" dangerouslySetInnerHTML={{ __html: block.html }} />
      {block.gallery && <ArticlePhotoGallery label={block.gallery.label} photos={block.gallery.photos} />}
    </div>
  ))
}
