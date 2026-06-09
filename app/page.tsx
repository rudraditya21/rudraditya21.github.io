'use client'

import { useState, useEffect, useRef } from 'react'
import LoadingScreen from '@/components/loading-screen'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [show, setShow] = useState(false)
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setShow(true), 80)
    return () => clearTimeout(t)
  }, [loaded])

  useEffect(() => {
    const onScroll = () => {
      if (heroContentRef.current) {
        heroContentRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const word = (delay: number): React.CSSProperties => ({
    display: 'inline-block',
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    fontFamily: 'var(--font-space-grotesk)',
  })

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div ref={heroContentRef} className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-7xl font-bold tracking-tight">
            <span style={word(0)}>Rudraditya</span>
            {' '}
            <span style={word(130)}>Thakur</span>
          </h1>

          <p
            className="text-lg font-light text-muted-foreground"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 320ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 320ms',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Turning caffeine into products.
          </p>
        </div>

        {/* scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{
            opacity: show ? 1 : 0,
            transition: 'opacity 1000ms ease 900ms',
          }}
        >
          <span
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            scroll
          </span>
          <div className="h-10 w-px origin-top animate-[grow_1.6s_ease-in-out_infinite] bg-foreground/25" />
        </div>
      </section>

      {/* empty section — content TBD */}
      <section className="min-h-screen" />
    </>
  )
}
