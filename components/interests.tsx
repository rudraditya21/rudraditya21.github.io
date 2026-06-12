'use client'

import { useEffect, useRef, useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'

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

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
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

function AccordionRow({ item, index, open, onToggle }: { item: typeof interests[0]; index: number; open: boolean; onToggle: () => void }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span
          className="text-sm font-medium text-foreground"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {item.domain}
        </span>
        <CaretDown
          size={14}
          className="shrink-0 text-muted-foreground"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </button>

      {/* CSS grid trick: animates height without JS measurement */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2 pb-6">
            {item.areas.map(area => (
              <span
                key={area}
                className="rounded-md border border-border px-2.5 py-1 text-xs text-foreground/55"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Interests() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [labelInView, setLabelInView] = useState(false)

  useEffect(() => {
    const el = labelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLabelInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 md:px-12 md:pb-24">
      <div className="mb-5">
        <span
          ref={labelRef}
          className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
          style={{
            display: 'block',
            fontFamily: 'var(--font-inter)',
            clipPath: labelInView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            transition: 'clip-path 700ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Areas of Interest
        </span>
      </div>

      <div className="border-t border-border" />

      <div className="divide-y divide-border">
        {interests.map((item, i) => (
          <AccordionRow
            key={item.domain}
            item={item}
            index={i}
            open={activeIndex === i}
            onToggle={() => setActiveIndex(activeIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}
