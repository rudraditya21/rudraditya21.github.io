'use client'

import { useEffect, useRef, useState } from 'react'

const schools = [
  {
    institution: 'Vellore Institute of Technology',
    degree: 'Bachelor of Technology – Computer Science',
    period: 'Sep 2022 – Aug 2026',
  },
  {
    institution: 'Amity International School, Sec 46 Gurugram',
    degree: 'High School Education',
    period: 'Apr 2009 – Apr 2022',
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function SchoolEntry({ school, index }: { school: typeof schools[0]; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:gap-6 sm:py-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
      }}
    >
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {school.institution}
        </p>
        <p className="text-sm text-foreground/70" style={{ fontFamily: 'var(--font-inter)' }}>
          {school.degree}
        </p>
      </div>

      <div className="shrink-0 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
        {school.period}
      </div>
    </div>
  )
}

export default function Education() {
  const { ref, inView } = useInView(0.2)

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 md:px-12 md:pb-24">
      <div className="mb-5">
        <span
          ref={ref as React.RefObject<HTMLSpanElement>}
          className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
          style={{
            display: 'block',
            fontFamily: 'var(--font-inter)',
            clipPath: inView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            transition: 'clip-path 700ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Education
        </span>
      </div>

      <div className="border-t border-border" />

      <div className="divide-y divide-border">
        {schools.map((school, i) => (
          <SchoolEntry key={school.institution} school={school} index={i} />
        ))}
      </div>
    </section>
  )
}
