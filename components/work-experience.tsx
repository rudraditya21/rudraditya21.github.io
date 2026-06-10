'use client'

import { useEffect, useRef, useState } from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function fmt(d: Date) {
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function duration(start: Date, end: Date) {
  const total = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
  const yrs = Math.floor(total / 12)
  const mos = total % 12
  if (yrs === 0) return `${mos} mo${mos !== 1 ? 's' : ''}`
  if (mos === 0) return `${yrs} yr${yrs !== 1 ? 's' : ''}`
  return `${yrs} yr${yrs !== 1 ? 's' : ''} ${mos} mo${mos !== 1 ? 's' : ''}`
}

function period(start: Date, end: Date | null) {
  const to = end ?? new Date()
  return `${fmt(start)} – ${end ? fmt(end) : 'Present'} · ${duration(start, to)}`
}

const jobs = [
  {
    company: 'Supernova Labs',
    role: 'Maintainer & Core Developer',
    start: new Date(2025, 8),
    end: null,
    location: 'Remote',
  },
  {
    company: 'Udyansh',
    role: 'Software Engineer',
    start: new Date(2024, 2),
    end: null,
    location: 'India · Remote',
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

function JobEntry({ job, index }: { job: typeof jobs[0]; index: number }) {
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
          {job.company}
        </p>
        <p className="text-sm text-foreground/70" style={{ fontFamily: 'var(--font-inter)' }}>
          {job.role}
        </p>
      </div>

      <div className="flex flex-col items-start gap-0.5 text-xs text-muted-foreground sm:items-end" style={{ fontFamily: 'var(--font-inter)' }}>
        <span>{period(job.start, job.end)}</span>
        <span>{job.location}</span>
      </div>
    </div>
  )
}

export default function WorkExperience() {
  const { ref, inView } = useInView(0.2)

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:px-12 md:py-24">
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
