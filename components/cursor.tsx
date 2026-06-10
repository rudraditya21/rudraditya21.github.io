'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring || 'ontouchstart' in window) return

    gsap.set([dot, ring], { x: -100, y: -100 })

    // dot tracks instantly; ring trails behind
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX - 3)
      dotY(e.clientY - 3)
      ringX(e.clientX - 12)
      ringY(e.clientY - 12)
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        gsap.to(dot, { scale: 0, duration: 0.18, ease: 'power2.out' })
        gsap.to(ring, { scale: 1.7, duration: 0.3, ease: 'power2.out' })
      }
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        gsap.to(dot, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' })
        gsap.to(ring, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' })
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      {/* sharp dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 h-1.5 w-1.5 rounded-full bg-neutral-900"
        style={{ willChange: 'transform' }}
      />
      {/* hollow ring — trails behind */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 h-6 w-6 rounded-full border border-neutral-800/70"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
