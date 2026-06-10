'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoadingScreen from '@/components/loading-screen'
import WorkExperience from '@/components/work-experience'
import Education from '@/components/education'
import Socials from '@/components/socials'
import Interests from '@/components/interests'
import Footer from '@/components/footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [show, setShow] = useState(false)
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setShow(true), 80)
    return () => clearTimeout(t)
  }, [loaded])

  // GSAP scroll tilt — runs after loading screen completes
  useEffect(() => {
    if (!loaded || !heroContentRef.current || !heroSectionRef.current) return
    if (window.innerWidth < 768) return

    const tween = gsap.to(heroContentRef.current, {
      y: 180,
      rotateX: 10,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [loaded])

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

      <section
        ref={heroSectionRef}
        className="relative flex h-screen items-center justify-center overflow-hidden [perspective:1000px]"
      >
        <div
          ref={heroContentRef}
          className="flex flex-col items-center gap-5 px-6 text-center [transform-style:preserve-3d]"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span style={word(0)}>Rudraditya</span>
            {' '}
            <span style={word(130)}>Thakur</span>
          </h1>

          <p
            className="text-base font-light text-muted-foreground sm:text-lg"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 320ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 320ms',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Turning caffeine into products.
          </p>

          <Socials show={show} />
        </div>
      </section>

      <WorkExperience />
      <Education />
      <Interests />
      <Footer />
    </>
  )
}
