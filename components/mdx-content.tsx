import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { Callout } from './mdx/callout'
import { LightboxImage } from './mdx/lightbox-image'

const components = {
  Callout,
  img: LightboxImage,
  // Add custom components here
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose text-[16px] sm:text-[17px] leading-[1.75] max-w-none prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-[1.75] prose-li:leading-[1.75] prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent prose-blockquote:not-italic prose-code:bg-muted prose-code:text-foreground prose-code:font-medium prose-code:border prose-code:border-border prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card prose-pre:border prose-pre:border-border">
      <MDXRemote 
        source={source} 
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              rehypeHighlight,
            ],
          },
        }}
      />
    </div>
  )
}
