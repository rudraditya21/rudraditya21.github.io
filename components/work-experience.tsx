'use client'

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
    company: 'CloudArmour',
    abbr: 'CA',
    role: 'Kernel Developer',
    start: new Date(2025, 6),
    end: new Date(2026, 6),
    location: 'India · Remote',
    href: 'https://cloudarmour.io/',
    description: [
      'Led kernel-space architecture efforts for networking and security infrastructure deployed across Linux environments.',
      'Drove performance optimization initiatives for kernel-level networking components through profiling, tracing, and low-level system analysis.',
      'Improved system throughput, latency, and resource efficiency by identifying and resolving bottlenecks in kernel-integrated networking workloads.',
      'Maintained compatibility across multiple Linux kernel releases by adapting to kernel API, subsystem, and behavioral changes.',
      'Diagnosed and resolved complex kernel-level issues involving networking, concurrency, and system performance in production environments.',
      'Collaborated with systems and platform teams to deliver reliable, scalable, and production-ready kernel infrastructure.',
      'Contributed to the design and evolution of network security infrastructure with a focus on performance, reliability, and maintainability.',
    ],
  },
  {
    company: 'Udyansh',
    abbr: 'U',
    role: 'Software Engineer',
    start: new Date(2024, 2),
    end: new Date(2025, 5),
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

function JobEntry({ job }: { job: Job }) {
  return (
    <div className="py-8 lg:py-10">
      <div className="flex items-center justify-between gap-6">
        <p className="text-xl leading-snug text-foreground lg:text-2xl" style={{ fontFamily: 'var(--font-unbounded)' }}>
          {job.company}
        </p>
        {job.href && (
          <a
            href={job.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-0.5 text-xs font-medium uppercase tracking-wider text-foreground/60 underline underline-offset-2 transition-colors duration-200 hover:text-foreground"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Website<ArrowUpRight size={10} />
          </a>
        )}
      </div>

      <div className="mt-3" style={{ fontFamily: 'var(--font-inter)' }}>
        <p className="text-sm text-foreground/75">
          {job.role} <span className="text-foreground/40">— {period(job.start, job.end)}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{job.location}</p>
      </div>

      <ul className="mt-6 flex flex-col gap-2" style={{ fontFamily: 'var(--font-inter)' }}>
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
  return (
    <section className="px-12 py-16 md:py-24">
      <h2
        className="mb-10 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        Work Experience
      </h2>

      <div className="divide-y divide-border">
        {jobs.map((job) => (
          <JobEntry key={job.company} job={job} />
        ))}
      </div>
    </section>
  )
}
