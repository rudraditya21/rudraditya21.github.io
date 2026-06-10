'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

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

// vary speed slightly per row so they don't loop in lockstep
const durations = [32, 24, 28, 22, 26]

function MarqueeRow({ item, index }: { item: typeof interests[0]; index: number }) {
  const [paused, setPaused] = useState(false)
  const direction = index % 2 === 0 ? 'marquee-left' : 'marquee-right'
  const doubled = [...item.areas, ...item.areas]

  return (
    <div
      className="flex items-center gap-6 border-b border-border py-6 md:py-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* domain name — fixed left */}
      <div className="w-40 shrink-0 md:w-52">
        <p
          className="text-xs font-medium leading-snug text-foreground/80 md:text-sm"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {item.domain}
        </p>
      </div>

      {/* marquee track */}
      <div className="relative min-w-0 flex-1 overflow-hidden">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-background to-transparent" />

        <div
          className="flex w-max gap-2"
          style={{
            animation: `${direction} ${durations[index]}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {doubled.map((area, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-md border border-border px-2.5 py-1 text-xs text-foreground/55"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Interests() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const rows = rowsRef.current
    if (!section || !rows) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        gsap.fromTo(
          rows.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }
        )
        observer.disconnect()
      },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="mx-auto max-w-5xl px-6 pb-16 md:px-12 md:pb-24">
      <div className="mb-5">
        <span
          className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Areas of Interest
        </span>
      </div>

      <div className="border-t border-border" />

      <div ref={rowsRef}>
        {interests.map((item, i) => (
          <MarqueeRow key={item.domain} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
