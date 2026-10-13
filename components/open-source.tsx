'use client'

import { JobEntry, type Job } from '@/components/work-experience'

const contributions: Job[] = [
  {
    company: 'Impulse Proxy',
    role: 'Maintainer & Core Developer',
    start: new Date(2025, 8),
    end: null,
    location: 'Remote',
    href: 'https://impulse-proxy.github.io/',
    description: [
      'Contributed to the architecture and development of a Rust-based HTTP/3 edge runtime supporting HTTP/1.1, HTTP/2, HTTP/3, and QUIC.',
      'Implemented protocol-aware routing, backend load balancing, and traffic management for efficient request handling.',
      'Developed resilience mechanisms including admission control, circuit breakers, retry budgets, and graceful degradation.',
      'Built backend health monitoring and orchestration capabilities to improve availability during failures and degraded network conditions.',
      'Integrated Prometheus and OpenTelemetry for metrics and tracing, and contributed to performance analysis, failure testing, and runtime optimization.',
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
