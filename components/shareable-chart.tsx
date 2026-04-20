"use client"

import { useState } from 'react'
import { X, Twitter, Linkedin, Link2, Check } from 'lucide-react'

interface ShareableChartProps {
  src: string
  alt: string
  caption?: string
  articleUrl?: string
  articleTitle?: string
}

export function ShareableChart({ 
  src, 
  alt, 
  caption,
  articleUrl = "https://terezatizkova.com/writing/software-abundance",
  articleTitle = "Software is becoming marketing"
}: ShareableChartProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareText = caption || alt
  const fullUrl = articleUrl
  
  // Get full image URL for sharing
  const imageUrl = src.startsWith('http') ? src : `https://terezatizkova.com${src}`

  const shareOnTwitter = () => {
    // Twitter will automatically show image preview from the URL's og:image
    const text = encodeURIComponent(`"${shareText}"\n\nFrom "${articleTitle}" by @tereza_tizkova`)
    const url = encodeURIComponent(fullUrl)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    // LinkedIn sharing with proper parameters
    const url = encodeURIComponent(fullUrl)
    const title = encodeURIComponent(articleTitle)
    const summary = encodeURIComponent(`"${shareText}"`)
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank')
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Chart with click to expand */}
      <figure className="my-10 group">
        <div 
          className="cursor-zoom-in relative"
          onClick={() => setIsOpen(true)}
        >
          <img 
            src={src}
            alt={alt}
            width={1000}
            style={{ maxWidth: '100%', height: 'auto' }}
            className="rounded transition-transform group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono bg-black/70 text-white px-3 py-1.5 rounded">
              Click to expand
            </span>
          </div>
        </div>
        
        {/* Share buttons below chart */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wide">Share</span>
          <button
            onClick={shareOnTwitter}
            className="p-2 rounded hover:bg-[rgba(255,255,255,0.06)] transition-colors group/btn"
            title="Share on X/Twitter"
          >
            <Twitter className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="p-2 rounded hover:bg-[rgba(255,255,255,0.06)] transition-colors group/btn"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
          </button>
          <button
            onClick={copyLink}
            className="p-2 rounded hover:bg-[rgba(255,255,255,0.06)] transition-colors group/btn"
            title="Copy link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Link2 className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
            )}
          </button>
        </div>
      </figure>

      {/* Lightbox modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="max-w-[95vw] max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={src}
              alt={alt}
              width={1000}
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain' }}
              className="rounded-lg"
            />
            
            {/* Share buttons in lightbox */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={shareOnTwitter}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors text-white text-sm"
              >
                <Twitter className="w-4 h-4" />
                Share on X
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors text-white text-sm"
              >
                <Linkedin className="w-4 h-4" />
                Share on LinkedIn
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors text-white text-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
