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
  const ref = useRef<HTMLDivElement>(null)
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
      ref={ref}
      className="flex items-center gap-6 py-10"
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

      <div className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
        {school.period}
      </div>
    </div>
  )
}

export default function Education() {
  const { ref, inView } = useInView(0.2)

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 md:px-12">
      <div
        ref={ref}
        className="mb-5"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 600ms ease, transform 600ms ease',
        }}
      >
        <span
          className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
          style={{ fontFamily: 'var(--font-inter)' }}
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
