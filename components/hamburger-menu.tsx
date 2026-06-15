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

export default function HamburgerMenu({ show, onGetInTouch }: { show: boolean; onGetInTouch: () => void }) {
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
        .to(socialsRef.current, { y: 16, opacity: 0, duration: 0.3, ease: 'power2.in' })
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
          <div
            className="fixed right-6 top-6 z-46 rounded-full p-px lg:right-10 lg:top-8"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, var(--border) 50%)',
              opacity: show ? 1 : 0,
              pointerEvents: show ? 'auto' : 'none',
              transition: 'opacity 600ms ease',
            }}
          >
            <TooltipTrigger asChild>
              <button
                onClick={() => setOpen(v => !v)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-background/80 backdrop-blur-md"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                <span className={`block h-px w-5 origin-center bg-foreground transition-all duration-300 ${open ? 'translate-y-1.75 rotate-45' : ''}`} />
                <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-px w-5 origin-center bg-foreground transition-all duration-300 ${open ? '-translate-y-1.75 -rotate-45' : ''}`} />
              </button>
            </TooltipTrigger>
          </div>
          <TooltipContent side="bottom">
            {open ? 'Close' : 'Menu'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-45 flex flex-col bg-background px-12 pb-8 pt-20"
      >
        <nav className="flex flex-col divide-y divide-border">
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

        <div ref={socialsRef} className="mt-auto pt-8">
          <button
            onClick={onGetInTouch}
            className="mb-5 block text-sm text-foreground/40 transition-colors duration-200 hover:text-foreground"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Get in Touch
          </button>
          <Socials show />
        </div>
      </div>
    </>
  )
}
