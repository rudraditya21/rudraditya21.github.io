'use client'

import { useEffect, useRef, useState } from 'react'

const jobs = [
  {
    company: 'Supernova Labs',
    initials: 'SL',
    role: 'Maintainer & Core Developer',
    period: 'Sep 2025 – Present · 10 mos',
    location: 'Remote',
  },
  {
    company: 'Udyansh',
    initials: 'U',
    role: 'Software Engineer',
    period: 'Mar 2024 – Present · 2 yrs 4 mos',
    location: 'India · Remote',
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

function JobEntry({ job, index }: { job: typeof jobs[0]; index: number }) {
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
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-xs font-semibold tracking-wide"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        {job.initials}
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {job.company}
        </p>
        <p className="text-sm text-foreground/70" style={{ fontFamily: 'var(--font-inter)' }}>
          {job.role}
        </p>
      </div>

      <div className="flex flex-col items-end gap-0.5 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
        <span>{job.period}</span>
        <span>{job.location}</span>
      </div>
    </div>
  )
}

export default function WorkExperience() {
  const { ref, inView } = useInView(0.2)

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
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
          Experience
        </span>
      </div>

      <div className="border-t border-border" />

      <div className="divide-y divide-border">
        {jobs.map((job, i) => (
          <JobEntry key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
