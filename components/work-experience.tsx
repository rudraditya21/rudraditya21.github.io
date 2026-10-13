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

export type Job = {
  company: string
  role: string
  start: Date
  end: Date | null
  location: string
  description: string[]
  href?: string
}

const jobs: Job[] = [
  {
    company: 'CloudArmour',
    role: 'Kernel Developer (Contract)',
    start: new Date(2025, 6),
    end: new Date(2026, 6),
    location: 'India · Remote',
    href: 'https://cloudarmour.io/',
    description: [
      'Built a zero-copy Rust eBPF metrics ingestion pipeline using NATS JetStream and ClickHouse, processing 50K+ records/sec on 8 GB RAM.',
      'Developed eBPF-based Kubernetes runtime monitoring and CIS compliance tooling in Go, improving container visibility and runtime security.',
      'Built Go REST APIs for dynamic firewall configuration and rule management, and integrated Prometheus and Grafana for infrastructure observability.',
      'Automated ClickHouse and PostgreSQL backup workflows to support data persistence and recovery.',
      'Audited eBPF programs for integer overflows, memory leaks, and potential kernel data-leak vulnerabilities.',
    ],
  },
  {
    company: 'Udyansh',
    role: 'Software Engineer (Contract)',
    start: new Date(2024, 2),
    end: new Date(2025, 5),
    location: 'India · Remote',
    description: [
      'Built a high-performance Perl XS wrapper over the MongoDB C driver, replacing an end-of-life client library.',
      'Developed concurrent Go ingestion and ETL pipelines integrating Ticketmaster, AllSportsDB, and SeatGeek into PostgreSQL.',
      'Implemented source-specific data transformations, validation, and fault-tolerant synchronization across external providers.',
      'Maintained backend services, database integrations, and production data processing workflows with a focus on reliability and performance.',
    ],
  },
]

export function JobEntry({ job }: { job: Job }) {
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
