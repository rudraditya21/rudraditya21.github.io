'use client'

import { useInView } from '@/hooks/use-in-view'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
  description: string[]
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
    href: 'https://supernova-labs.com/',
    description: [
      'Contributed to the architecture and development of a Rust-based HTTP/3 edge runtime focused on reliability and operational resilience.',
      'Implemented protocol-aware routing, backend load balancing, and traffic management mechanisms for efficient request handling.',
      'Developed resilience features including admission control, circuit breakers, retry-budget enforcement, and graceful degradation systems.',
      'Built health monitoring and backend orchestration capabilities to improve service availability during failures and degraded network conditions.',
      'Integrated observability tooling using Prometheus and OpenTelemetry for metrics collection, tracing, and operational visibility.',
      'Participated in performance analysis, failure testing, and runtime optimization to improve system stability, fault tolerance, and reliability.',
    ],
  },
  {
    company: 'Udyansh',
    abbr: 'U',
    role: 'Software Engineer',
    start: new Date(2024, 2),
    end: null,
    location: 'India · Remote',
    description: [
      'Built a high-performance Perl XS wrapper over the MongoDB C driver, replacing an end-of-life client library in production environments.',
      'Developed scalable event ingestion and ETL pipelines in Go, consolidating data from multiple external sources into PostgreSQL with validation, transformation, and fault-tolerance mechanisms.',
      'Built distributed ETL workflows processing data from Ticketmaster, AllSportsDB, and SeatGeek using source-specific transformers and concurrent execution patterns.',
      'Designed and maintained data synchronization pipelines, improving reliability and consistency across external data providers and internal systems.',
      'Worked on backend services, database integrations, and production data processing systems with a focus on performance, maintainability, and operational stability.',
    ],
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs font-medium uppercase tracking-wider underline underline-offset-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    style={{ fontFamily: 'var(--font-instrument-serif)' }}
                  >
                    Visit<ArrowUpRight size={10} />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Visit Website
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      <ul className="flex flex-col gap-2 lg:pt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>
        {job.description.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/50">
            <span className="mt-2.25 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function WorkExperience() {
  const { ref, inView } = useInView(0.15)

  return (
    <section className="min-h-svh px-12 py-16 md:py-24">
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
