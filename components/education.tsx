'use client'

import { useEffect, useRef, useState } from 'react'

type School = {
  institution: string
  abbr: string
  degree: string
  period: string
  description: string[]
}

const schools: School[] = [
  {
    institution: 'Vellore Institute of Technology',
    abbr: 'VIT',
    degree: 'Bachelor of Technology – Computer Science',
    period: 'Sep 2022 – Aug 2026',
    description: [],
  },
  {
    institution: 'Amity International School, Sec 46 Gurugram',
    abbr: 'AIS',
    degree: 'High School Education',
    period: 'Apr 2009 – Apr 2022',
    description: [],
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

function SchoolEntry({ school, index }: { school: School; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
      }}
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {school.institution}
        </p>
        <p className="text-sm text-foreground/70" style={{ fontFamily: 'var(--font-inter)' }}>
          {school.degree}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
          {school.period}
        </p>

        {school.description.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2.5">
            {school.description.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/60"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <span className="mt-1.75 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function Education() {
  const { ref, inView } = useInView(0.15)

  return (
    <section className="min-h-[90svh] px-12 py-16 md:py-24">
      <h2
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className="mb-10 text-5xl tracking-tight"
        style={{
          fontFamily: 'var(--font-instrument-serif)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Education
      </h2>

      <div className="divide-y divide-border">
        {schools.map((school, i) => (
          <SchoolEntry key={school.institution} school={school} index={i} />
        ))}
      </div>
    </section>
  )
}
