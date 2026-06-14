'use client'

import { useInView } from '@/hooks/use-in-view'

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

function InterestRow({ item, index }: { item: typeof interests[0]; index: number }) {
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
      {/* Domain name */}
      <div className="lg:w-52 lg:shrink-0">
        <p
          className="text-lg leading-snug text-foreground"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          {item.domain}
        </p>
      </div>

      {/* Comma-separated areas */}
      <p
        className="text-sm leading-relaxed text-foreground/50 lg:pt-0.5"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {item.areas.join(', ')}
      </p>
    </div>
  )
}

export default function Interests() {
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
        Areas of Interest
      </h2>

      <div className="divide-y divide-border">
        {interests.map((item, i) => (
          <InterestRow key={item.domain} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
