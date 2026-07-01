'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

type LightboxImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export function LightboxImage({ className, alt, ...props }: LightboxImageProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const baseClassName = className ?? 'my-8 rounded-xl border border-zinc-700'

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <img
        {...props}
        alt={alt}
        onClick={() => setOpen(true)}
        className={`${baseClassName} cursor-zoom-in`}
      />
      {open && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            {...props}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[95vw] w-auto h-auto rounded-lg object-contain"
          />
        </div>,
        document.body
      )}
    </>
  )
}
