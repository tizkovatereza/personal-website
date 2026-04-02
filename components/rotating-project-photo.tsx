"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

// Photo sets for each project - keyed by project title
const projectPhotos: Record<string, string[]> = {
  'E2B': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e2b%20yc%20deal-L0nLWrAjjzB075xTiE4wcOLtOCioiC.png', // YC Deal promo
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6898%20%281%29.png-IGKMhzXiTINCJ5HaN4WePVWetjD7IZ.jpeg', // Tusk billboard thumbs up
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HEiF_lqbYAAYtPZ-RNbvrSLcaxY2TNQSoJ6B56TCAIra9Q.jpeg', // Rivet billboard with team
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/357625215_253184054016006_930143009688287961_n-siXqihaLouNl1lKwtdc930t3RcdfVH.jpg', // Czech passport at airport
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6735-UvsfBrzmmRlOpO3YzNntGjbEZaP746.jpg', // Team at Golden Gate Park with medals
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI_crunch_group_photo-g9MSmPTpreqg1vIz2PeB5ljeMFq93u.jpg', // Golden Gate Bridge team selfie
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Discord_format-9z34q3e16p6aItAFrwjVAE0CCegwMM.png', // Community Townhall promo
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Changelog-2023-12-01-q7tDcXCmvaMcu5jhem2UH9pehLHVuA.png', // Changelog screenshot
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1714405276619-NBmAYs5aJ5hFxA46RVNmWutH1pSsBA.jpeg', // E2B swag - stickers, socks, t-shirts
  ],
  'Building Coding Agents with Tool Execution': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2831%29-eos1Z0bmYjzWuq9NvAsQcnTrNWgJJx.jpeg', // Video thumbnail with Andrew Ng intro
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1764774990669-DbPLsrAjHVTTlGoa9ctnSA4tZUydbH.jpeg', // DeepLearning.AI course page screenshot
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875821-jhXiJ1aeihJVlQGqEk4CSE9Qftnvx5.jpeg', // Studio photo with Andrew Ng and team
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875671-rtle4NGY7NCYZgm1GZeBZHBo4ojbJM.jpeg', // Selfie with instructors
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875904-uNZZb5uRTRiBxkpcKWdVDIVjfVfYy7.jpeg', // Multi-monitor desk setup showing course
  ],
  'Awesome AI Agents': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e2b%20yc%20deal-L0nLWrAjjzB075xTiE4wcOLtOCioiC.png', // E2B promo - reuse
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Discord_format-9z34q3e16p6aItAFrwjVAE0CCegwMM.png', // Community Townhall
  ],
  'Topics': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/terezatizkova-LQBYVeUzTqQaf5BU7elPy0QgYPmM6S.jpeg', // Pearl necklace selfie - creative work
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3fc7bc11-54d4-4753-b7b7-a2fc69f6024a-nb9LRKmXVvK7odqD8ZR3OX57BYiBmU.jpeg', // Philz coffee
  ],
  'Developer Events & Hackathons': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1087-flv7wjvgGNVYSsmszJRCcQ78IoJgjQ.jpg', // Team photo on steps
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6735-UvsfBrzmmRlOpO3YzNntGjbEZaP746.jpg', // Team at Golden Gate Park
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI_crunch_group_photo-g9MSmPTpreqg1vIz2PeB5ljeMFq93u.jpg', // Golden Gate Bridge selfie
  ],
  'Discover Academy': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1712150060654-p0r9wbxohe3O23CIodQ15dt7LOqz8t.jpeg', // Crossed arms professional
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0572b94e500c4fa0b09e970ab8979be0-BZLxrq7N5EFh3rKcn4ZEfzWsoey3Wb.jpg', // SF professional
  ],
  'The Growth Lab': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0116%20%282%29-IAaznP4p0SURXDb6suLlN6MvNJvvt7.jpg', // Office desk working
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d0dc39e3-7be5-410c-b2a5-cec72688f2d4-ke15zBopCMgzjH22kBH0HL3sGcfmTx.jpeg', // Restaurant dinner
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24a85868-41b7-4d2d-8acb-a2fdefe849a1-W3isYUAxdbMpGZTTZwfh0bWvcCJbYC.jpeg', // Laptop "Sandbox Company"
  ],
  'Advent of Writing': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c0bdaa24-591a-45cc-a36b-3c5942a9ef9f-4gRdi3CIRka25jFRuiU6qmhJcUqk5A.jpeg', // Flowers selfie
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/terezatizkova-LQBYVeUzTqQaf5BU7elPy0QgYPmM6S.jpeg', // Pearl necklace selfie
  ],
  'Substack': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2824%29-Pv23LBYnDxYm0A01HN4GHyw1yPvpNX.jpeg', // Burgundy fleece
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c0bdaa24-591a-45cc-a36b-3c5942a9ef9f-4gRdi3CIRka25jFRuiU6qmhJcUqk5A.jpeg', // Flowers selfie
  ],
  'Startup Advisory': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03a0d8c531e94a3eb562cf978ef1e3d8-lwF1bKm02tBxxupq0qruBUDNo7sLWq.jpg', // SF professional smiling
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1712150060654-p0r9wbxohe3O23CIodQ15dt7LOqz8t.jpeg', // Crossed arms professional
  ],
  'DeepLearning.ai': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2831%29-eos1Z0bmYjzWuq9NvAsQcnTrNWgJJx.jpeg', // Video thumbnail with Andrew Ng intro
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1764774990669-DbPLsrAjHVTTlGoa9ctnSA4tZUydbH.jpeg', // DeepLearning.AI course page screenshot
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875821-jhXiJ1aeihJVlQGqEk4CSE9Qftnvx5.jpeg', // Studio photo with Andrew Ng and team
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875671-rtle4NGY7NCYZgm1GZeBZHBo4ojbJM.jpeg', // Selfie with instructors
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875904-uNZZb5uRTRiBxkpcKWdVDIVjfVfYy7.jpeg', // Multi-monitor desk setup showing course
  ],
}

interface RotatingProjectPhotoProps {
  projectName: string
  className?: string
}

export function RotatingProjectPhoto({ projectName, className = '' }: RotatingProjectPhotoProps) {
  const photos = projectPhotos[projectName] || []
  const defaultPhoto = photos[0] || ''
  
  const [currentPhoto, setCurrentPhoto] = useState(defaultPhoto)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const usedIndicesRef = useRef<Set<number>>(new Set())

  const getNextRandomPhoto = useCallback(() => {
    if (photos.length <= 1) return defaultPhoto
    
    // If we've used all photos, reset
    if (usedIndicesRef.current.size >= photos.length - 1) {
      usedIndicesRef.current.clear()
    }
    
    // Get a random index that we haven't used yet (excluding default at index 0)
    let randomIndex: number
    do {
      randomIndex = Math.floor(Math.random() * (photos.length - 1)) + 1
    } while (usedIndicesRef.current.has(randomIndex))
    
    usedIndicesRef.current.add(randomIndex)
    return photos[randomIndex]
  }, [photos, defaultPhoto])

  useEffect(() => {
    if (isHovering && photos.length > 1) {
      // Immediately show a random photo
      setCurrentPhoto(getNextRandomPhoto())
      
      // Start rotating
      intervalRef.current = setInterval(() => {
        setCurrentPhoto(getNextRandomPhoto())
      }, 1000)
    } else {
      // Return to default
      setCurrentPhoto(defaultPhoto)
      usedIndicesRef.current.clear()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, photos.length, defaultPhoto, getNextRandomPhoto])

  if (!defaultPhoto) {
    return null
  }

  return (
    <div 
      className={`relative aspect-square overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={currentPhoto}
        alt={projectName}
        fill
        className="object-cover transition-opacity duration-300"
        unoptimized
      />
      {/* Subtle overlay on default state */}
      <div 
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}
