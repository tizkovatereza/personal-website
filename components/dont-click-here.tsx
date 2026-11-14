"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

type Target = { node: Text; original: string }
type Pose = { x: number; y: number; direction: number; chewing: boolean; step: number }
const resting: Pose = { x: 0, y: 0, direction: 1, chewing: false, step: 0 }

export function DontClickHere() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const [pose, setPose] = useState(resting)
  const [letters, setLetters] = useState<string[]>([])
  const targets = useRef<Target[]>([])
  const eaten = useRef<string[]>([])
  const position = useRef(resting)
  const frame = useRef(0)
  const scatterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const restore = useCallback(() => {
    cancelAnimationFrame(frame.current)
    for (const target of targets.current) {
      if (target.node.isConnected) target.node.nodeValue = target.original
    }
    targets.current = []
    eaten.current = []
    if (scatterTimer.current) clearTimeout(scatterTimer.current)
  }, [])

  useEffect(() => {
    restore()
    setActive(false)
    setLetters([])
    return restore
  }, [pathname, restore])

  function toggle() {
    if (active) {
      restore()
      setActive(false)
      setLetters([])
      return
    }
    const root = document.querySelector('main') ?? document.body
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement
        if (!node.textContent?.trim() || !parent || parent.closest('nav, aside, button, textarea, input, script, style, [data-dog-skip], [aria-hidden="true"]')) return NodeFilter.FILTER_REJECT
        const rect = parent.getBoundingClientRect()
        return rect.width && rect.height ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      },
    })
    const next: Target[] = []
    while (walker.nextNode()) {
      const node = walker.currentNode as Text
      next.push({ node, original: node.nodeValue ?? '' })
    }
    targets.current = next
    eaten.current = []
    position.current = { ...resting, x: window.innerWidth - 80, y: 90 }
    setPose(position.current)
    setActive(true)
  }

  useEffect(() => {
    if (!active) return
    let index = 0
    let previous = performance.now()
    let lastBite = 0
    let scrolledTarget: Text | null = null
    const range = document.createRange()

    function animate(now: number) {
      const dt = Math.min((now - previous) / 1000, 0.04)
      previous = now
      while (index < targets.current.length && (!targets.current[index].node.isConnected || !targets.current[index].node.nodeValue?.trim())) index++
      const target = targets.current[index]
      if (!target) {
        setPose(p => ({ ...p, chewing: false }))
        return
      }
      const text = target.node.nodeValue ?? ''
      const start = text.search(/\S/)
      range.setStart(target.node, Math.max(0, start))
      range.setEnd(target.node, Math.min(text.length, Math.max(0, start) + 1))
      const rect = range.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        index++
        frame.current = requestAnimationFrame(animate)
        return
      }
      if ((rect.top < 80 || rect.bottom > window.innerHeight - 60) && scrolledTarget !== target.node) {
        target.node.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        scrolledTarget = target.node
      }
      const prev = position.current
      const tx = Math.max(42, Math.min(window.innerWidth - 42, rect.left - 32))
      const ty = Math.max(42, Math.min(window.innerHeight - 42, rect.top + rect.height / 2))
      const dx = tx - prev.x
      const dy = ty - prev.y
      const distance = Math.hypot(dx, dy)
      const step = Math.min(distance, 1050 * dt)
      const near = distance < 24
      const next = {
        x: distance ? prev.x + dx / distance * step : tx,
        y: distance ? prev.y + dy / distance * step : ty,
        direction: near ? 1 : dx < -4 ? -1 : dx > 4 ? 1 : prev.direction,
        chewing: near && Math.floor(now / 65) % 2 === 0,
        step: near ? 0 : Math.sin(now / 65) * 5,
      }
      if (near && now - lastBite >= 32) {
        // Keep the original text nodes and links intact so reset is exact.
        const bite = text.slice(0, Math.max(0, start) + 3)
        target.node.nodeValue = text.slice(bite.length)
        eaten.current.push(...Array.from(bite).filter(char => char.trim()))
        lastBite = now
      }
      position.current = next
      setPose(next)
      frame.current = requestAnimationFrame(animate)
    }
    frame.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame.current)
  }, [active])

  function scatterLetters() {
    setLetters(eaten.current.splice(-32))
    if (scatterTimer.current) clearTimeout(scatterTimer.current)
    scatterTimer.current = setTimeout(() => setLetters([]), 1600)
  }

  return (
    <>
      <div className="fixed top-5 right-5 z-50 flex flex-col items-end gap-2">
        {pathname === '/' && <button onClick={toggle} aria-pressed={active} className="robot-trigger font-mono text-[11px] text-muted-foreground hover:text-secondary transition-colors cursor-pointer bg-transparent border-none p-0">don&apos;t click here</button>}
        <ThemeToggle />
      </div>
      {active && <>
        <button data-dog-skip type="button" aria-label="Let the dog drop its letters" onClick={scatterLetters} className="fixed z-[9999] bg-transparent border-0 p-0 cursor-pointer" style={{ left: pose.x, top: pose.y, transform: `translate(-50%, -50%) scaleX(${pose.direction})` }}>
          <svg width="88" height="72" viewBox="0 0 88 72" fill="none" role="img" aria-label="A playful letter-eating dog">
            <g stroke="#503e32" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 38 Q5 32 9 23" stroke="#ba885a" strokeWidth="7" />
              <path d={`M28 45 L${26 - pose.step} 62 L${32 - pose.step} 62 M55 45 L${57 + pose.step} 62 L${63 + pose.step} 62`} stroke="#96704d" strokeWidth="7" />
              <path d="M18 36 Q20 29 33 30 L57 31 Q66 34 64 46 Q61 53 48 52 L29 51 Q17 50 18 36Z" fill="#d9ae79" />
              <path d="M51 34 Q45 17 57 13 Q74 9 76 27 L81 31 Q87 33 82 39 L65 42 Q55 43 51 34Z" fill="#e9c795" />
              <path d="M57 15 Q43 12 48 34 Q52 42 58 31Z" fill="#91613e" />
              <path d="M51 38 L63 42" stroke="#b64e43" strokeWidth="5" />
              <path d={`M26 47 L${26 + pose.step} 65 L${33 + pose.step} 65 M55 48 L${55 - pose.step} 65 L${62 - pose.step} 65`} stroke="#d9ae79" strokeWidth="7" />
              <circle cx="70" cy="25" r="2.4" fill="#302820" stroke="none" />
              <circle cx="70.7" cy="24.2" r="0.7" fill="white" stroke="none" />
              <path d="M80 30 Q87 29 84 34 Q80 36 79 32Z" fill="#302820" />
              <path d={pose.chewing ? 'M69 37 Q76 49 82 36Z' : 'M70 37 Q76 41 81 36'} fill={pose.chewing ? '#503e32' : 'none'} />
              {pose.chewing && <path d="M74 41 Q77 47 79 41" stroke="#e79896" strokeWidth="3" />}
            </g>
          </svg>
        </button>
        {letters.length > 0 && <div data-dog-skip aria-hidden="true" className="fixed z-[9998] pointer-events-none" style={{ left: pose.x - 25, top: pose.y + 32 }}>{letters.map((letter, i) => <span key={i} className="absolute text-sm font-serif text-amber-800" style={{ left: (i % 8) * 13 - 40, top: Math.floor(i / 8) * 15, transform: `rotate(${(i % 5 - 2) * 12}deg)` }}>{letter}</span>)}</div>}
      </>}
    </>
  )
}
