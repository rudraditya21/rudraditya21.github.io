'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import LoadingScreen from '@/components/loading-screen'
import WorkExperience from '@/components/work-experience'
import Education from '@/components/education'
import Socials from '@/components/socials'
import Interests from '@/components/interests'
import HamburgerMenu from '@/components/hamburger-menu'

const navItems = [
  { label: 'About',             id: 'about' },
  { label: 'Work Experience',   id: 'experience' },
  { label: 'Education',         id: 'education' },
  { label: 'Areas of Interest', id: 'interests' },
]

const BLOB_COUNT = 9
const BLOB_SIZE  = 20 // % of container

function randomInCircle(maxR: number) {
  const angle = Math.random() * Math.PI * 2
  const r = Math.sqrt(Math.random()) * maxR
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r }
}

function BlobAvatar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const blobRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const size   = container.offsetWidth
    const blobPx = size * BLOB_SIZE / 100
    const maxR   = size / 2 - blobPx / 2 - 4

    function wander(el: HTMLDivElement) {
      const { x, y } = randomInCircle(maxR)
      gsap.to(el, {
        x, y,
        duration: 0.5 + Math.random() * 0.9,
        ease: 'power1.inOut',
        onComplete: () => wander(el),
      })
    }

    blobRefs.current.forEach((el, i) => {
      if (!el) return
      const start = randomInCircle(maxR)
      gsap.set(el, { x: start.x, y: start.y })
      setTimeout(() => wander(el), i * 80)
    })

    return () => { blobRefs.current.forEach(el => el && gsap.killTweensOf(el)) }
  }, [])

  return (
    <div ref={containerRef} className="relative aspect-square w-full overflow-hidden rounded-full border border-border bg-muted shadow-md">
      {/* Gooey filter: blur → alpha threshold → blobs merge when touching */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>

      {/* Filter wrapper — does not include the circle border/bg */}
      <div className="absolute inset-0" style={{ filter: 'url(#goo)' }}>
        {Array.from({ length: BLOB_COUNT }, (_, i) => (
          <div
            key={i}
            ref={el => { blobRefs.current[i] = el }}
            className="absolute rounded-full bg-foreground"
            style={{
              width:  `${BLOB_SIZE}%`,
              height: `${BLOB_SIZE}%`,
              top:  `${50 - BLOB_SIZE / 2}%`,
              left: `${50 - BLOB_SIZE / 2}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [show, setShow] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setShow(true), 80)
    return () => clearTimeout(t)
  }, [loaded])

  useEffect(() => {
    if (!loaded) return
    const observers = navItems.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0, rootMargin: '0px 0px -70% 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [loaded])

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  })

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Fixed left sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col lg:flex">
        <div className="px-9 pt-5">
          <BlobAvatar />
        </div>

        <nav className="my-auto flex flex-col gap-5 px-8">
          {navItems.map(({ label, id }) => {
            const active = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-3 text-lg transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-instrument-serif)',
                  color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
                  fontWeight: 400,
                }}
              >
                <span
                  className="h-px shrink-0 bg-current transition-all duration-300"
                  style={{ width: active ? 28 : 14 }}
                />
                {label}
              </a>
            )
          })}
        </nav>
      </aside>

      {/* Fixed top-right socials */}
      <div className="fixed right-10 top-8 z-40 hidden rounded-full bg-background/70 px-4 py-2.5 shadow-md backdrop-blur-md lg:block">
        <Socials show={show} />
      </div>

      {/* Main content */}
      <div className="lg:ml-56">
        <section id="about" className="flex min-h-[90svh] items-center px-12 py-20">
          <div>
            <h1
              className="mb-6 leading-[0.88] tracking-tight"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(5.5rem, 10vw, 10rem)',
              }}
            >
              <span className="block" style={fadeUp(0)}>Rudraditya</span>
              <span className="block" style={fadeUp(130)}>Thakur</span>
            </h1>

            <p
              className="max-w-sm text-base text-foreground/60 leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)', ...fadeUp(260) }}
            >
              Turning caffeine into products.
            </p>
          </div>
        </section>

        <div id="experience"><WorkExperience /></div>
        <div id="education"><Education /></div>
        <div id="interests"><Interests /></div>
      </div>

      <HamburgerMenu show={show} />
    </>
  )
}
