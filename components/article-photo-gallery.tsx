'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'

export interface ArticlePhoto {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export function ArticlePhotoGallery({ photos, label }: { photos: ArticlePhoto[]; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(0)
  if (!photos.length) return null

  function goTo(index: number) {
    track.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <figure className="my-10" aria-label={label}>
      <div className="relative border border-border bg-card/50 overflow-hidden">
        <div ref={track} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide" onScroll={(event) => {
          const node = event.currentTarget
          setActive(Math.round(node.scrollLeft / node.clientWidth))
        }}>
          {photos.map((photo, index) => (
            <button key={photo.src} type="button" className="relative w-full shrink-0 snap-start aspect-[4/3] sm:aspect-[3/2] cursor-zoom-in" aria-label={`View ${photo.alt} full size`} onClick={() => { setExpanded(index); dialog.current?.showModal() }}>
              <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" className="w-full h-full object-contain" />
              <Expand className="absolute bottom-3 right-3 h-4 w-4 text-white drop-shadow" aria-hidden="true" />
            </button>
          ))}
        </div>
        {photos.length > 1 && <>
          <button type="button" aria-label={`Previous photo in ${label}`} disabled={active === 0} onClick={() => goTo(active - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-background/90 border border-border text-foreground disabled:opacity-20 hover:bg-background"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" aria-label={`Next photo in ${label}`} disabled={active === photos.length - 1} onClick={() => goTo(active + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-background/90 border border-border text-foreground disabled:opacity-20 hover:bg-background"><ChevronRight className="h-5 w-5" /></button>
        </>}
      </div>
      <figcaption className="flex items-start justify-between gap-4 mt-3 text-[13px] leading-relaxed text-muted-foreground">
        <span>{photos[active]?.caption ?? label}</span>
        {photos.length > 1 && <span className="font-mono whitespace-nowrap text-[11px]" aria-live="polite">{active + 1} / {photos.length}</span>}
      </figcaption>
      <dialog ref={dialog} aria-label={`${label} full-size photo`} className="m-auto bg-transparent border-0 p-0 max-w-[96vw] max-h-[94dvh] backdrop:bg-black/90 text-white" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <button type="button" aria-label="Close photo" onClick={() => dialog.current?.close()} className="fixed top-5 right-5 rounded-full bg-black/60 p-2"><X className="h-6 w-6" /></button>
        <img src={photos[expanded].src} alt={photos[expanded].alt} width={photos[expanded].width} height={photos[expanded].height} className="max-w-[94vw] max-h-[85dvh] w-auto h-auto object-contain" />
        {photos[expanded].caption && <p className="text-center text-sm mt-3">{photos[expanded].caption}</p>}
      </dialog>
    </figure>
  )
}
