'use client'

import { useInView } from '@/hooks/use-in-view'

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

type Job = {
  company: string
  abbr: string
  role: string
  start: Date
  end: Date | null
  location: string
}

const jobs: Job[] = [
  {
    company: 'Supernova Labs',
    abbr: 'SL',
    role: 'Maintainer & Core Developer',
    start: new Date(2025, 8),
    end: null,
    location: 'Remote',
  },
  {
    company: 'Udyansh',
    abbr: 'U',
    role: 'Software Engineer',
    start: new Date(2024, 2),
    end: null,
    location: 'India · Remote',
  },
]

function JobEntry({ job, index }: { job: Job; index: number }) {
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
          {job.company}
        </p>
        <p className="text-sm text-foreground/70" style={{ fontFamily: 'var(--font-inter)' }}>
          {job.role}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
          {job.location}&nbsp;&nbsp;·&nbsp;&nbsp;{period(job.start, job.end)}
        </p>

      </div>
    </div>
  )
}

export default function WorkExperience() {
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
        Work Experience
      </h2>

      <div className="divide-y divide-border">
        {jobs.map((job, i) => (
          <JobEntry key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
