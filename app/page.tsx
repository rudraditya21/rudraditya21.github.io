'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import LoadingScreen from '@/components/loading-screen'
import WorkExperience from '@/components/work-experience'
import Education from '@/components/education'
import Socials from '@/components/socials'
import Interests from '@/components/interests'
import HamburgerMenu from '@/components/hamburger-menu'
import ThemeToggle from '@/components/theme-toggle'
import Projects from '@/components/projects'
import SideQuests from '@/components/side-quests'
import Writing from '@/components/writing'
import Publications from '@/components/publications'
import Tools from '@/components/tools'
import CommandPalette from '@/components/command-palette'

const navItems = [
  { label: 'About',             id: 'about' },
  { label: 'Projects',          id: 'projects' },
  { label: 'Work Experience',   id: 'experience' },
  { label: 'Education',         id: 'education' },
  { label: 'Publications',      id: 'publications' },
  { label: 'Areas of Interest', id: 'interests' },
  { label: 'Tools & Tech',      id: 'tools' },
  { label: 'Side Quests',       id: 'quests' },
  { label: 'Blogs',             id: 'writing' },
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
    <div
      className="relative aspect-square w-full rounded-full p-px"
      style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--border) 50%)' }}
    >
    <div ref={containerRef} className="relative h-full w-full overflow-hidden rounded-full bg-muted">
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
    </div>
  )
}

const EMAIL = 'mr.rudradityathakur@gmail.com'

function Toast({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 rounded-lg bg-foreground px-4 py-2.5 text-sm text-background"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 250ms ease, transform 250ms ease',
        pointerEvents: 'none',
        fontFamily: 'var(--font-inter)',
      }}
    >
      Mail copied
    </div>
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [show, setShow] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [shortcut, setShortcut] = useState('⌘K')

  useEffect(() => {
    if (!/Mac|iPhone|iPad|iPod/.test(navigator.platform)) setShortcut('Ctrl+K')
  }, [])

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL)
    setToastVisible(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000)
  }, [])

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setScrollProgress(total > 0 ? el.scrollTop / total : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        { threshold: 0, rootMargin: '0px 0px -60% 0px' }
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

      {/* Scroll progress bar */}
      <div
        className="fixed left-0 top-0 z-50 h-0.5 bg-foreground"
        style={{ width: `${scrollProgress * 100}%` }}
      />

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

      {/* Fixed top-right: Get in Touch + Socials — lg only */}
      <div className="fixed right-24 top-8 z-40 hidden items-center gap-3 lg:flex">
        <div
          className="rounded-full p-px"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, var(--border) 50%)',
            opacity: show ? 1 : 0,
            pointerEvents: show ? 'auto' : 'none',
            transition: 'opacity 600ms ease',
          }}
        >
          <button
            onClick={copyEmail}
            className="rounded-full bg-background/70 px-4 py-2.5 text-sm text-foreground/70 backdrop-blur-md transition-colors duration-200 hover:text-foreground"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Get in Touch
          </button>
        </div>
        <div
          className="rounded-full p-px"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--border) 50%)' }}
        >
          <div className="rounded-full bg-background/70 px-4 py-2.5 backdrop-blur-md">
            <Socials show={show} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-56">
        <section id="about" className="flex min-h-svh items-center px-12 py-20">
          <div>
            <div className="mb-8 w-24 sm:w-28 md:w-32 lg:hidden">
              <BlobAvatar />
            </div>
            <h1
              className="mb-6 leading-[0.88] tracking-tight text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[clamp(7rem,10vw,10rem)]"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              <span className="block" style={fadeUp(0)}>Rudraditya</span>
              <span className="block" style={fadeUp(130)}>Thakur</span>
            </h1>

            <p
              className="max-w-md text-base text-foreground/60 leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)', ...fadeUp(260) }}
            >
              Turning caffeine into products.
              <br /><br />
              I'm drawn to the hard parts of computing — the parts where you have to understand the hardware, the protocol, or the math to get it right. I work across systems programming, compiler design, blockchain internals, and security, with a published research background in deep learning.
            </p>
          </div>
        </section>

        <div id="projects"><Projects /></div>
        <div id="experience"><WorkExperience /></div>
        <div id="education"><Education /></div>
        <div id="publications"><Publications /></div>
        <div id="interests"><Interests /></div>
        <div id="tools"><Tools /></div>
        <div id="quests"><SideQuests /></div>
        <div id="writing"><Writing /></div>

        <footer className="flex items-center justify-between border-t border-border px-12 py-6" style={{ fontFamily: 'var(--font-inter)' }}>
          <span className="text-sm text-foreground/30">© 2025 Rudraditya Thakur</span>
          <button
            onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
            className="flex items-center gap-2 text-foreground/25 transition-colors duration-200 hover:text-foreground/50"
          >
            <span className="rounded border border-border px-1.5 py-0.5 font-mono text-xs">{shortcut}</span>
            <span className="text-xs">to navigate</span>
          </button>
        </footer>
      </div>

      <Toast visible={toastVisible} />
      <CommandPalette onCopyEmail={copyEmail} />
      <HamburgerMenu show={show} onGetInTouch={copyEmail} />
      <ThemeToggle show={show} />
    </>
  )
}
