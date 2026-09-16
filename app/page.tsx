'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
        <nav className="my-auto flex flex-col gap-5 px-8">
          {navItems.map(({ label, id }) => {
            const active = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-3 text-lg transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-unbounded)',
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
            <h1
              className="mb-6 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              <span style={fadeUp(0)}>Rudraditya</span>{' '}
              <span style={fadeUp(130)}>Thakur</span>
            </h1>

            <p
              className="max-w-md text-base leading-relaxed text-foreground/60 lg:max-w-[34rem]"
              style={{ fontFamily: 'var(--font-inter)', ...fadeUp(260) }}
            >
              Turning <span className="relative inline-block">caffeine
                <svg className="pointer-events-none absolute -bottom-[0.55em] -left-[4%] h-[0.52em] w-[110%] text-foreground/75" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 6C20 2 34 8 51 4s29 1 46-2" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M7 15c18-4 33 1 48-2s27 1 40-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span> into <span className="relative inline-block">products
                <svg className="pointer-events-none absolute -inset-y-[28%] -left-[14%] h-[156%] w-[128%] text-foreground/75" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M15 20C29 5 70 3 86 20c13 15 7 51-7 65-20 17-57 9-70-11C0 52 3 34 15 20Z" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
              </span>.
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
