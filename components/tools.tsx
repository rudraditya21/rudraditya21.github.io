'use client'

import { useInView } from '@/hooks/use-in-view'

const stack = [
  {
    category: 'Languages',
    tools: [
      'Python', 'Rust', 'C', 'C++', 'Go', 'Java', 'JavaScript', 'TypeScript',
      'Perl', 'SQL', 'Bash', 'MATLAB', 'Dart', 'Erlang', 'Assembly',
    ],
  },
  {
    category: 'Frameworks',
    tools: ['Next.js', 'React', 'Bun', 'Tokio', 'LLVM', 'WASM', 'HTML', 'CSS'],
  },
  {
    category: 'Messaging',
    tools: ['NATS', 'Kafka', 'Redis', 'ZeroMQ'],
  },
  {
    category: 'Databases',
    tools: ['PostgreSQL', 'ClickHouse', 'MongoDB', 'MinIO'],
  },
  {
    category: 'Protocols',
    tools: ['QUIC', 'HTTP/3', 'GraphQL'],
  },
  {
    category: 'Infra',
    tools: ['Docker', 'Podman', 'Kubernetes', 'Cilium', 'AWS', 'Linux', 'eBPF', 'nftables', 'SearxNG', 'Prometheus', 'Grafana', 'OpenTelemetry'],
  },
  {
    category: 'AI / ML',
    tools: ['PyTorch', 'TensorFlow', 'JAX', 'LangChain', 'LangGraph', 'Claude', 'Codex'],
  },
]

function StackRow({ item, index }: { item: typeof stack[0]; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col gap-2 py-5 lg:flex-row lg:gap-10 lg:py-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
      }}
    >
      <div className="lg:w-52 lg:shrink-0">
        <p
          className="text-lg leading-snug text-foreground"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          {item.category}
        </p>
      </div>

      <p
        className="text-sm leading-relaxed text-foreground/50 lg:pt-0.5"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {item.tools.join(', ')}
      </p>
    </div>
  )
}

export default function Tools() {
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
        Tools & Technologies
      </h2>

      <div className="divide-y divide-border">
        {stack.map((item, i) => (
          <StackRow key={item.category} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
