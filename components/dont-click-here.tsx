"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface FogBlob {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  velocityX: number
  velocityY: number
  growthRate: number
}

export function DontClickHere() {
  const [isActive, setIsActive] = useState(false)
  const [fogBlobs, setFogBlobs] = useState<FogBlob[]>([])
  const [isDispersing, setIsDispersing] = useState(false)
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const createFogBlobs = useCallback(() => {
    const blobs: FogBlob[] = []
    for (let i = 0; i < 6; i++) {
      blobs.push({
        id: i,
        x: window.innerWidth - 60,
        y: 40,
        size: 50 + Math.random() * 50,
        opacity: 0,
        velocityX: -2 - Math.random() * 3,
        velocityY: 1 + Math.random() * 2,
        growthRate: 8 + Math.random() * 4,
      })
    }
    return blobs
  }, [])

  const handleClick = () => {
    if (isActive) return
    setIsActive(true)
    setIsDispersing(false)
    setFogBlobs(createFogBlobs())
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
    if (isActive && !isDispersing) {
      setIsDispersing(true)
    }
  }, [isActive, isDispersing])

  useEffect(() => {
    if (isActive) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isActive, handleMouseMove])

  useEffect(() => {
    if (!isActive || fogBlobs.length === 0) return

    const animate = () => {
      setFogBlobs(prevBlobs => {
        const newBlobs = prevBlobs.map(blob => {
          let newX = blob.x + blob.velocityX
          let newY = blob.y + blob.velocityY
          let newSize = blob.size + blob.growthRate
          let newOpacity = blob.opacity

          if (!isDispersing) {
            // Expanding phase - fade in
            newOpacity = Math.min(blob.opacity + 0.02, 0.35)
          } else {
            // Dispersing phase - push away from mouse and fade out
            const dx = blob.x - mouseRef.current.x
            const dy = blob.y - mouseRef.current.y
            const dist = Math.sqrt(dx * dx + dy * dy) || 1
            const pushForce = 15
            newX += (dx / dist) * pushForce
            newY += (dy / dist) * pushForce
            newOpacity = Math.max(blob.opacity - 0.015, 0)
          }

          return {
            ...blob,
            x: newX,
            y: newY,
            size: newSize,
            opacity: newOpacity,
          }
        })

        // Check if all blobs have faded out
        if (isDispersing && newBlobs.every(b => b.opacity <= 0)) {
          setIsActive(false)
          setIsDispersing(false)
          return []
        }

        return newBlobs
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, isDispersing, fogBlobs.length])

  return (
    <>
      {/* The button */}
      <button
        onClick={handleClick}
        className="fixed top-5 right-5 z-50 font-mono text-[11px] text-[#555] hover:underline hover:decoration-dotted hover:decoration-[#555] transition-all cursor-pointer bg-transparent border-none p-0"
        style={{ textUnderlineOffset: "3px" }}
      >
        don't click here
      </button>

      {/* Fog layer */}
      {isActive && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          {fogBlobs.map(blob => (
            <div
              key={blob.id}
              className="absolute rounded-full"
              style={{
                left: blob.x,
                top: blob.y,
                width: blob.size,
                height: blob.size,
                backgroundColor: "rgba(212, 160, 176, 0.4)",
                filter: "blur(100px)",
                opacity: blob.opacity,
                transform: "translate(-50%, -50%)",
                transition: isDispersing ? "opacity 0.3s ease-out" : "none",
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
