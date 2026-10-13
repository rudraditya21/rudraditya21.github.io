'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import LoadingScreen from '@/components/loading-screen'
import WorkExperience from '@/components/work-experience'
import OpenSource from '@/components/open-source'
import Socials from '@/components/socials'
import ThemeToggle from '@/components/theme-toggle'
import Tools from '@/components/tools'
import TopNav from '@/components/top-nav'

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

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Scroll progress bar */}
      <div
        className="fixed left-0 top-0 z-50 h-0.5 bg-foreground"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <TopNav />

      {/* Main content */}
      <main className="mx-auto w-full max-w-6xl">
        <section id="about" className="flex items-start px-12 py-20">
          <div>
            <h1
              className="mb-6 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Rudraditya Thakur
            </h1>

            <p
              className="text-base leading-relaxed text-foreground/60"
              style={{ fontFamily: 'var(--font-inter)' }}
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
              I&apos;m a systems engineer focused on building high-performance, reliable infrastructure. My work spans Linux networking, eBPF/XDP, distributed systems, reverse proxies, and observability pipelines, primarily using Rust, Go, C, and C++.
              <br /><br />
              I enjoy working close to the fundamentals — understanding how systems behave, finding performance bottlenecks, and engineering solutions that are efficient, reliable, and built to scale.
              <br /><br />
              Easy to reach at{' '}
              <a href={`mailto:${EMAIL}`} className="font-bold text-foreground transition-colors hover:text-foreground/70">
                {EMAIL}
              </a>.
            </p>
          </div>
        </section>

        <div id="experience"><WorkExperience /></div>
        <OpenSource />
        <div id="tools"><Tools /></div>
        <section id="contact" className="px-12 py-16 md:py-24">
          <h2
            className="mb-10 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Contact
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="w-full rounded-full border border-border sm:w-fit">
              <button
                onClick={copyEmail}
                className="w-full rounded-full bg-background/70 px-4 py-2.5 text-sm text-foreground backdrop-blur-md transition-colors duration-200 hover:bg-foreground/8"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Get in Touch
              </button>
            </div>
            <div className="flex w-full min-w-0 items-center justify-center rounded-full border border-border bg-background/70 px-2 py-2 backdrop-blur-md sm:w-fit sm:px-4 sm:py-2.5">
              <Socials bright compactOnMobile />
            </div>
          </div>
        </section>
      </main>

      <Toast visible={toastVisible} />
      <ThemeToggle />
    </>
  )
}
