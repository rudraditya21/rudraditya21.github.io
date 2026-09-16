'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import LoadingScreen from '@/components/loading-screen'
import WorkExperience from '@/components/work-experience'
import Education from '@/components/education'
import Socials from '@/components/socials'
import ThemeToggle from '@/components/theme-toggle'
import Projects from '@/components/projects'
import Writing from '@/components/writing'
import Publications from '@/components/publications'
import Tools from '@/components/tools'

const EMAIL = 'mr.rudradityathakur@gmail.com'
const INTEREST_LAYERS = [
  'AI & Machine Learning',
  'Cybersecurity',
  'Compilers & Language Design',
  'Systems Engineering',
  'Blockchain & Distributed Systems',
]

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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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

      {/* Main content */}
      <main className="mx-auto w-full max-w-6xl">
        <section id="about" className="flex items-start px-12 py-20">
          <div>
            <h1
              className="mb-6 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              <span style={fadeUp(0)}>Rudraditya</span>{' '}
              <span style={fadeUp(130)}>Thakur</span>
            </h1>

            <p
              className="text-base leading-relaxed text-foreground/60"
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
            <div className="mt-6" style={fadeUp(390)}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-fit rounded-full border border-border">
                  <button
                    onClick={copyEmail}
                    className="rounded-full bg-background/70 px-4 py-2.5 text-sm text-foreground backdrop-blur-md transition-colors duration-200 hover:bg-foreground/8"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Get in Touch
                  </button>
                </div>
                <div className="rounded-full border border-border bg-background/70 px-4 py-2.5 backdrop-blur-md">
                <Socials show={show} bright />
              </div>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-4" style={fadeUp(480)}>
              <section className="rounded-2xl bg-foreground p-6 text-background sm:p-8">
                <h2 className="text-xl tracking-tight sm:text-2xl" style={{ fontFamily: 'var(--font-unbounded)' }}>
                  Beyond the code
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5" style={{ fontFamily: 'var(--font-inter)' }}>
                  {['Chess', 'Language learning', 'Open source', 'Guitar & piano'].map((interest) => (
                    <span key={interest} className="rounded-full border border-background/30 px-3 py-1.5 text-sm text-background/80">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
              <section className="rounded-2xl bg-foreground p-6 text-background sm:p-8">
                <h2 className="text-xl tracking-tight sm:text-2xl" style={{ fontFamily: 'var(--font-unbounded)' }}>
                  Areas of interest
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5" style={{ fontFamily: 'var(--font-inter)' }}>
                  {INTEREST_LAYERS.map((interest) => (
                    <span key={interest} className="rounded-full border border-background/30 px-3 py-1.5 text-sm text-background/80">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
          </div>
        </section>

        <div id="experience"><WorkExperience /></div>
        <div id="projects"><Projects /></div>
        <div id="publications"><Publications /></div>
        <div id="tools"><Tools /></div>
        <div id="education"><Education /></div>
        <div id="writing"><Writing /></div>
      </main>

      <Toast visible={toastVisible} />
      <ThemeToggle show={show} />
    </>
  )
}
