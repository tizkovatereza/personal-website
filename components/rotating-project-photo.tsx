"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

// Photo sets for each project
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
  ],
  'The Growth Lab': [
    // Will add photos later
  ],
  'Substack': [
    // Will add photos later
  ],
  'Startup Advisory': [
    // Will add photos later
  ],
  'DeepLearning.ai': [
    // Will add photos later
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
  const [shownIndices, setShownIndices] = useState<Set<number>>(new Set())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const getNextRandomPhoto = useCallback(() => {
    if (photos.length <= 1) return defaultPhoto
    
    let availableIndices = photos
      .map((_, i) => i)
      .filter(i => i !== 0 && !shownIndices.has(i))
    
    // If all photos shown, reset
    if (availableIndices.length === 0) {
      setShownIndices(new Set())
      availableIndices = photos.map((_, i) => i).filter(i => i !== 0)
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
    setShownIndices(prev => new Set([...prev, randomIndex]))
    return photos[randomIndex]
  }, [photos, defaultPhoto, shownIndices])

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
      setShownIndices(new Set())
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
