"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

// All the fun photos that rotate on hover
const rotatingPhotos = [
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0572b94e500c4fa0b09e970ab8979be0-BZLxrq7N5EFh3rKcn4ZEfzWsoey3Wb.jpg', // SF professional - default
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2824%29-Pv23LBYnDxYm0A01HN4GHyw1yPvpNX.jpeg', // burgundy fleece side profile
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2823%29-m4DLiRHqtxjsEqDXxqcM9045yrQNne.jpeg', // plane selfie
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/135881365-Hp8yE9pwcA9sbXzYNnOqnTGQR1P7zL.jpeg', // rock climbing
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2825%29-AZcQw72crZ6vdAc77cjF8CRli1DRDF.jpeg', // World of AI Agents thumbnail
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Nov%207%2C%202025%2C%2004_36_51%20PM-bO1BRz2J864WgIlFaIsOETAeyp9Lmf.png', // cartoon cat
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ab6772ab000015bef5193906e1cb8c8e8e1349cd%20%281%29-rzi9p9yA6dVxk44TTsic0h5dHAeXWO.jpeg', // podcast
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d0dc39e3-7be5-410c-b2a5-cec72688f2d4-ke15zBopCMgzjH22kBH0HL3sGcfmTx.jpeg', // restaurant dinner
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1714058502119-4Pb8nqR87TZLIGhMr8B3Hrg0vaonzI.jpeg', // video interview green wall
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03a0d8c531e94a3eb562cf978ef1e3d8-lwF1bKm02tBxxupq0qruBUDNo7sLWq.jpg', // SF professional smiling
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e9adb116-0350-4793-b648-729f9aa43eba-eEhKVJEGPEoN2PYqaujDec9oLG6qiv.jpeg', // this is fine dog
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1712150060654-p0r9wbxohe3O23CIodQ15dt7LOqz8t.jpeg', // crossed arms professional
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maxresdefault-hBX2bwSgTyBbKelAqHgPeXk27On9wb.jpg', // creating safe playgrounds thumbnail
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2826%29-13TbJ99ToDaAC8QikHPwLTel0KhcJB.jpeg', // Data Talk thumbnail
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c0bdaa24-591a-45cc-a36b-3c5942a9ef9f-4gRdi3CIRka25jFRuiU6qmhJcUqk5A.jpeg', // flowers selfie
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zSjtnkEP_400x400-LHYV4ZxIX8F3BYlwVeoqEyqnzIMgEA.jpg', // AI awards mirror
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/252e96bc6613207ee425b8cdf5c2d2e9-3kqUvxhonnNnT2CtCn0A6ASw6LmLAb.jpg', // cat on scooter
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/terezatizkova-LQBYVeUzTqQaf5BU7elPy0QgYPmM6S.jpeg', // pearl necklace selfie
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1087-flv7wjvgGNVYSsmszJRCcQ78IoJgjQ.jpg', // team photo on steps
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0116%20%282%29-IAaznP4p0SURXDb6suLlN6MvNJvvt7.jpg', // office desk working
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3b199472eaf808d5%20%281%29-T6u1IezTQwmqERzSBHWOgV4kHQzwyR.png', // sunglasses side profile
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3fc7bc11-54d4-4753-b7b7-a2fc69f6024a-nb9LRKmXVvK7odqD8ZR3OX57BYiBmU.jpeg', // Philz Coffee selfie
]

const DEFAULT_PHOTO = rotatingPhotos[0]

export function RotatingProfilePhoto() {
  const [currentPhoto, setCurrentPhoto] = useState(DEFAULT_PHOTO)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const usedIndicesRef = useRef<Set<number>>(new Set())

  const getRandomPhoto = useCallback(() => {
    // If we've used all photos, reset
    if (usedIndicesRef.current.size >= rotatingPhotos.length - 1) {
      usedIndicesRef.current.clear()
    }
    
    // Get a random index that we haven't used yet (excluding default at index 0)
    let randomIndex: number
    do {
      randomIndex = Math.floor(Math.random() * (rotatingPhotos.length - 1)) + 1
    } while (usedIndicesRef.current.has(randomIndex))
    
    usedIndicesRef.current.add(randomIndex)
    return rotatingPhotos[randomIndex]
  }, [])

  useEffect(() => {
    if (isHovering) {
      // Immediately show a random photo
      setCurrentPhoto(getRandomPhoto())
      
      // Then rotate every 1 second
      intervalRef.current = setInterval(() => {
        setCurrentPhoto(getRandomPhoto())
      }, 1000)
    } else {
      // Stop rotating and go back to default
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setCurrentPhoto(DEFAULT_PHOTO)
      usedIndicesRef.current.clear()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, getRandomPhoto])

  return (
    <div 
      className="relative w-40 h-40 sm:w-48 sm:h-48 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={currentPhoto}
        alt="Tereza Tizkova"
        fill
        className={`object-cover transition-all duration-300 ${
          isHovering ? '' : 'grayscale'
        }`}
        style={{
          filter: isHovering ? 'none' : 'contrast(1.1) brightness(0.95)',
        }}
        priority
        unoptimized
      />
      {/* Subtle border overlay */}
      <div className="absolute inset-0 border border-[rgba(255,255,255,0.1)]" />
    </div>
  )
}
