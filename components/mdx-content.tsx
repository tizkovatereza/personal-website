import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { Callout } from './mdx/callout'

const components = {
  Callout,
  // Add custom components here
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent prose-blockquote:not-italic prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card prose-pre:border prose-pre:border-border">
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
