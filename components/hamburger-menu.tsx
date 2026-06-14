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
  { label: 'Areas of Interest', id: 'interests' },
  { label: 'Side Quests',       id: 'quests' },
  { label: 'Writing',           id: 'writing' },
]

export default function HamburgerMenu({ show }: { show: boolean }) {
  const [open, setOpen]  = useState(false)
  const overlayRef       = useRef<HTMLDivElement>(null)
  const itemRefs         = useRef<(HTMLAnchorElement | null)[]>([])
  const socialsRef       = useRef<HTMLDivElement>(null)
  const didMount         = useRef(false)

  useEffect(() => {
    gsap.set(overlayRef.current, { autoAlpha: 0 })
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
          socialsRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        )
    } else {
      document.body.style.overflow = ''
      gsap.timeline()
        .to(
          [...items].reverse(),
          { y: 20, opacity: 0, duration: 0.2, stagger: 0.04, ease: 'power2.in' }
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
      {/* Hamburger / close button
          - Small screens: top-right corner
          - Large screens: bottom of sidebar */}
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
        <span
          className={`block h-px w-5 origin-center bg-foreground transition-all duration-300 ${
            open ? 'translate-y-1.75 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-px w-5 bg-foreground transition-all duration-300 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-px w-5 origin-center bg-foreground transition-all duration-300 ${
            open ? '-translate-y-1.75 -rotate-45' : ''
          }`}
        />
      </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {open ? 'Close' : 'Menu'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-45 flex flex-col bg-background px-12 pb-16 pt-28"
      >
        <nav className="flex flex-col divide-y divide-border">
          {NAV.map(({ label, id }, i) => (
            <a
              key={id}
              ref={el => { itemRefs.current[i] = el }}
              href={`#${id}`}
              onClick={e => { e.preventDefault(); navigate(id) }}
              className="py-3 text-2xl leading-none text-foreground/60 transition-colors duration-200 hover:text-foreground sm:py-4 sm:text-3xl lg:py-5 lg:text-3xl"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div ref={socialsRef} className="mt-auto pt-10">
          <Socials show />
        </div>
      </div>
    </>
  )
}
