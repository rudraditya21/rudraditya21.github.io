'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Socials from './socials'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const NAV = [
  { label: 'About',             id: 'about' },
  { label: 'Projects',          id: 'projects' },
  { label: 'Work Experience',   id: 'experience' },
  { label: 'Education',         id: 'education' },
  { label: 'Publications',      id: 'publications' },
  { label: 'Areas of Interest', id: 'interests' },
  { label: 'Tools & Tech',      id: 'tools' },
  { label: 'Side Quests',       id: 'quests' },
  { label: 'Writing',           id: 'writing' },
]

const BLOB_COUNT = 20
const BLOB_SIZE  = 10.5

function BlobRectangle() {
  const containerRef = useRef<HTMLDivElement>(null)
  const blobRefs     = useRef<(HTMLDivElement | null)[]>([])
  const initialized  = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function init() {
      if (initialized.current) return
      const w = container!.offsetWidth
      const h = container!.offsetHeight
      if (w === 0 || h === 0) return

      initialized.current = true

      const blobPx  = w * BLOB_SIZE / 100
      const centerX = w / 2 - blobPx / 2
      const centerY = h / 2 - blobPx / 2
      const rangeX  = Math.max(0, centerX - 4)
      const rangeY  = Math.max(0, centerY - 4)

      function randomPos() {
        return {
          x: centerX + (Math.random() * 2 - 1) * rangeX,
          y: centerY + (Math.random() * 2 - 1) * rangeY,
        }
      }

      function wander(el: HTMLDivElement) {
        const pos = randomPos()
        gsap.to(el, {
          x: pos.x, y: pos.y,
          duration: 1.2 + Math.random() * 1.2,
          ease: 'power1.inOut',
          onComplete: () => wander(el),
        })
      }

      blobRefs.current.forEach((el, i) => {
        if (!el) return
        const pos = randomPos()
        gsap.set(el, { x: pos.x, y: pos.y })
        setTimeout(() => wander(el), i * 80)
      })
    }

    // Try immediately, then watch for when the container gains size
    // (it may be inside a hidden overlay at mount time)
    init()
    const observer = new ResizeObserver(() => init())
    observer.observe(container)

    return () => {
      observer.disconnect()
      blobRefs.current.forEach(el => el && gsap.killTweensOf(el))
      initialized.current = false
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted" style={{ height: '100%' }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo-menu">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ filter: 'url(#goo-menu)' }}>
        {Array.from({ length: BLOB_COUNT }, (_, i) => (
          <div
            key={i}
            ref={el => { blobRefs.current[i] = el }}
            className="absolute aspect-square rounded-full bg-foreground"
            style={{ width: `${BLOB_SIZE}%`, top: 0, left: 0 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function HamburgerMenu({ show }: { show: boolean }) {
  const [open, setOpen]  = useState(false)
  const overlayRef       = useRef<HTMLDivElement>(null)
  const itemRefs         = useRef<(HTMLAnchorElement | null)[]>([])
  const socialsRef       = useRef<HTMLDivElement>(null)
  const blobColRef       = useRef<HTMLDivElement>(null)
  const didMount         = useRef(false)

  useEffect(() => {
    gsap.set(overlayRef.current, { autoAlpha: 0 })
    gsap.set(blobColRef.current, { opacity: 0 })
  }, [])

  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return }

    const items = itemRefs.current.filter((el): el is HTMLAnchorElement => el !== null)

    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.timeline()
        .to(overlayRef.current, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
        .fromTo(
          items,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.09, ease: 'power3.out' },
          '-=0.1'
        )
        .fromTo(
          [socialsRef.current, blobColRef.current].filter(Boolean),
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        )
    } else {
      document.body.style.overflow = ''
      gsap.timeline()
        .to(
          [socialsRef.current, blobColRef.current].filter(Boolean),
          { y: 16, opacity: 0, duration: 0.3, ease: 'power2.in' }
        )
        .to(
          [...items].reverse(),
          { y: 20, opacity: 0, duration: 0.2, stagger: 0.04, ease: 'power2.in' },
          '-=0.1'
        )
        .to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, '-=0.05')
    }
  }, [open])

  useEffect(() => () => { document.body.style.overflow = '' }, [])

  function navigate(id: string) {
    setOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 600)
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen(v => !v)}
              className="fixed right-6 top-6 z-46 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-background/80 shadow-md backdrop-blur-md lg:right-10 lg:top-8"
              style={{
                opacity: show ? 1 : 0,
                pointerEvents: show ? 'auto' : 'none',
                transition: 'opacity 600ms ease',
              }}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className={`block h-px w-5 origin-center bg-foreground transition-all duration-300 ${open ? 'translate-y-1.75 rotate-45' : ''}`} />
              <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 origin-center bg-foreground transition-all duration-300 ${open ? '-translate-y-1.75 -rotate-45' : ''}`} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {open ? 'Close' : 'Menu'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Full-screen overlay — outer flex-col keeps socials at the bottom */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-45 flex flex-col bg-background px-12 pb-8 pt-20"
      >
        {/* Inner row: nav + blob rectangle, height = nav's natural height only */}
        <div className="flex flex-col md:flex-row md:gap-8">

          <nav className="flex flex-col divide-y divide-border md:flex-1">
            {NAV.map(({ label, id }, i) => (
              <a
                key={id}
                ref={el => { itemRefs.current[i] = el }}
                href={`#${id}`}
                onClick={e => { e.preventDefault(); navigate(id) }}
                className="py-2 text-xl leading-none text-foreground/60 transition-colors duration-200 hover:text-foreground sm:py-2.5 sm:text-2xl lg:py-3 lg:text-2xl"
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Blob rectangle — hidden on mobile, stretches to nav height on md+ */}
          <div ref={blobColRef} className="hidden md:block md:flex-1">
            <BlobRectangle />
          </div>

        </div>

        <div ref={socialsRef} className="mt-auto pt-4">
          <Socials show />
        </div>
      </div>
    </>
  )
}
