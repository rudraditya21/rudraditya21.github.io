'use client'

import { useEffect, useRef, useState } from 'react'

const interests = [
  {
    domain: 'Blockchain & Distributed Systems',
    areas: [
      'Layer-1 architecture', 'Ethereum & EVM internals', 'execution layer mechanics',
      'consensus design (PoS)', 'mempool architecture', 'Merkle trees',
      'state transition systems', 'P2P networking', 'transaction propagation',
      'smart contracts (Solidity)', 'cryptographic primitives',
      'high-performance blockchain clients in Rust',
    ],
  },
  {
    domain: 'Systems Engineering',
    areas: [
      'Systems programming in Rust and C', 'memory-safe architectures',
      'lock-free & concurrent system design', 'performance engineering',
      'Linux internals', 'networking stack optimization',
      'high-performance dataplanes (XDP, AF_XDP, DPDK)',
      'zero-copy systems', 'kernel–userspace boundaries',
    ],
  },
  {
    domain: 'Compilers & Language Design',
    areas: [
      'Parser & lexer implementation', 'IR design', 'static analysis',
      'deterministic execution models', 'reproducible numerics', 'language tooling',
      'bytecode & VM design', 'AOT and JIT compilation strategies',
    ],
  },
  {
    domain: 'Cybersecurity',
    areas: [
      'Exploit development fundamentals', 'reverse engineering', 'secure systems design',
      'network security engineering', 'deep packet inspection (DPI)',
      'protocol analysis (TCP/IP, TLS)', 'adversarial simulation',
      'defensive infrastructure architecture',
    ],
  },
  {
    domain: 'AI & Machine Learning',
    areas: [
      'ML systems engineering', 'statistical computing infrastructure',
      'reproducible ML pipelines', 'security-oriented AI systems',
      'performance-aware model deployment', 'distributed training systems',
      'applied AI in threat detection & anomaly detection',
    ],
  },
]

function useInView(threshold = 0.1) {
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

function InterestRow({ item, index }: { item: typeof interests[0]; index: number }) {
  const { ref, inView } = useInView(0.08)

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[220px_1fr]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
      }}
    >
      <p
        className="text-sm font-semibold leading-snug"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        {item.domain}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.areas.map((area) => (
          <span
            key={area}
            className="rounded-md border border-border px-2.5 py-1 text-xs text-foreground/55 transition-colors duration-200 hover:border-foreground/25 hover:text-foreground/80"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {area}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Interests() {
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
          Areas of Interest
        </span>
      </div>

      <div className="border-t border-border" />

      <div className="divide-y divide-border">
        {interests.map((item, i) => (
          <InterestRow key={item.domain} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
