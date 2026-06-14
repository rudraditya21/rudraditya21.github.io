'use client'

import { useInView } from '@/hooks/use-in-view'
import { ArrowUpRight } from '@phosphor-icons/react'

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
  description: string
  href?: string
}

const jobs: Job[] = [
  {
    company: 'Supernova Labs',
    abbr: 'SL',
    role: 'Maintainer & Core Developer',
    start: new Date(2025, 8),
    end: null,
    location: 'Remote',
    description: 'Short description of what you worked on, technologies used, and impact you had in this role.',
    href: 'https://supernova-labs.com/',
  },
  {
    company: 'Udyansh',
    abbr: 'U',
    role: 'Software Engineer',
    start: new Date(2024, 2),
    end: null,
    location: 'India · Remote',
    description: 'Short description of what you worked on, technologies used, and impact you had in this role.',
  },
]

function JobEntry({ job, index }: { job: Job; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col gap-2 py-8 lg:flex-row lg:gap-10 lg:py-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
      }}
    >
      <div className="lg:w-52 lg:shrink-0">
        <p className="text-lg leading-snug text-foreground" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          {job.company}
        </p>
        <p className="mt-0.5 text-sm text-foreground/70" style={{ fontFamily: 'var(--font-inter)' }}>
          {job.role}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
          {job.location}
        </p>
        <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
          {period(job.start, job.end)}
        </p>
        {job.href && (
          <div className="mt-2">
            <a
              href={job.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-xs font-medium uppercase tracking-wider underline underline-offset-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              Visit<ArrowUpRight size={10} />
            </a>
          </div>
        )}
      </div>

      <p className="text-sm leading-relaxed text-foreground/50 lg:pt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>
        {job.description}
      </p>
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
