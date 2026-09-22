'use client'

import { JobEntry, type Job } from '@/components/work-experience'

const contributions: Job[] = [
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
]

export default function OpenSource() {
  return (
    <section id="open-source" className="px-12 py-16 md:py-24">
      <h2
        className="mb-10 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        Open Source
      </h2>

      <div className="divide-y divide-border">
        {contributions.map((contribution) => (
          <JobEntry key={contribution.company} job={contribution} />
        ))}
      </div>
    </section>
  )
}
