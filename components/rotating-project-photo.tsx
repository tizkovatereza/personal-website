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
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1764774990669-DbPLsrAjHVTTlGoa9ctnSA4tZUydbH.jpeg', // DeepLearning.AI course page screenshot
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875821-jhXiJ1aeihJVlQGqEk4CSE9Qftnvx5.jpeg', // Studio photo with Andrew Ng and team
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875671-rtle4NGY7NCYZgm1GZeBZHBo4ojbJM.jpeg', // Selfie with instructors
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1761866875904-uNZZb5uRTRiBxkpcKWdVDIVjfVfYy7.jpeg', // Multi-monitor desk setup showing course
  ],
  'Awesome AI Agents': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.22.55-AgABix1IirC6crdIWCzOTnCjcavqk1.png', // README with AI Agents Landscape
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.22.32-RrZUbhosQtE9edHbTKu22rq5hV7hyT.png', // Full GitHub repo page with 27.2k stars
  ],
  'Topics': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.13.20-TxqiZX8XIXYx52bT3c5UC1JUyUde0y.png', // Paul Graham - How to Do Great Work
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.11.29-bFxrZiuhrDPQPBkIbIKGdEHfnTtZ31.png', // Aeon - How plagues really work
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.12.20-JvT6ngIhhAWKUdcEvuB1PSU8XZZoaZ.png', // Aeon - The psychology of torture
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.11.56-uFUnNmAOx10evmhwrwWF5gv0Hiddnl.png', // Not Boring - The Electric Slide
  ],
  'Developer Events & Hackathons': [
    '/images/placeholder-events.jpg', // Placeholder illustration
  ],
  'Discover Academy': [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.25.46-k9QOSnSID4Px33o0UP2KIHpWe6TS1j.png', // Homepage hero - students playing outdoors
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.26.09-57WNXsNPPij20DHyThoUNdpb9B60Qf.png', // What is DSA page with circular activity photos
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-09%20at%2014.26.23-Ac33XhoVsNxbeFj3e7smf5Wf9D42zf.png', // Tutorg Team page with group photo
  ],
  'The Growth Lab': [
    '/images/placeholder-growth-lab.jpg', // Placeholder illustration
  ],
  'Advent of Writing': [
    '/images/placeholder-advent.jpg', // Placeholder illustration
  ],
  'Substack': [
    '/images/placeholder-substack.jpg', // Placeholder illustration
  ],
  'Startup Advisory': [
    '/images/placeholder-advisory.jpg', // Placeholder illustration
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
