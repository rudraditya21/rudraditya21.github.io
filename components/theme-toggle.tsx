'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Sun, Moon } from '@phosphor-icons/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function ThemeToggle({ show }: { show: boolean }) {
  const [dark, setDark] = useState(false)
  const sunRef  = useRef<HTMLDivElement>(null)
  const moonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored      = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark      = stored ? stored === 'dark' : prefersDark

    setDark(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    gsap.set(sunRef.current,  isDark ? { opacity: 0, rotate: 180, scale: 0 } : { opacity: 1, rotate: 0, scale: 1 })
    gsap.set(moonRef.current, isDark ? { opacity: 1, rotate: 0,   scale: 1 } : { opacity: 0, rotate: -180, scale: 0 })
  }, [])

  function toggle() {
    const next     = !dark
    const outgoing = next ? sunRef.current  : moonRef.current
    const incoming = next ? moonRef.current : sunRef.current

    setDark(next)
    const html = document.documentElement
    html.setAttribute('data-theme-transition', '')
    void html.offsetHeight  // force reflow so transition registers before class change
    if (next) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('theme', next ? 'dark' : 'light')
    window.setTimeout(() => html.removeAttribute('data-theme-transition'), 420)

    gsap.timeline()
      .to(outgoing, {
        opacity: 0, rotate: next ? 180 : -180, scale: 0,
        duration: 0.28, ease: 'power2.in',
      })
      .fromTo(incoming,
        { opacity: 0, rotate: next ? -180 : 180, scale: 0 },
        { opacity: 1, rotate: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
        '-=0.05'
      )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <div
          className="fixed bottom-8 right-6 z-40 rounded-full p-px"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, var(--border) 50%)',
            opacity:       show ? 1 : 0,
            pointerEvents: show ? 'auto' : 'none',
            transition:    'opacity 600ms ease',
          }}
        >
          <TooltipTrigger asChild>
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-md"
              aria-label="Toggle theme"
            >
              <div ref={sunRef}  className="absolute"><Sun  size={18} /></div>
              <div ref={moonRef} className="absolute"><Moon size={18} /></div>
            </button>
          </TooltipTrigger>
        </div>
        <TooltipContent side="left">
          {dark ? 'Light mode' : 'Dark mode'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
