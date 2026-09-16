'use client'

const stack = [
  {
    category: 'Languages',
    tools: [
      'Python', 'Rust', 'C', 'C++', 'Go', 'Java', 'JavaScript', 'TypeScript',
      'Perl', 'SQL', 'Bash', 'MATLAB', 'Dart', 'Erlang', 'Assembly',
    ],
  },
  {
    category: 'Applications & Runtime',
    tools: ['Next.js', 'React', 'Flutter', 'Bun', 'Tokio', 'LLVM', 'WASM', 'HTML', 'CSS'],
  },
  {
    category: 'Systems & Networking',
    tools: ['QUIC', 'HTTP/3', 'GraphQL', 'Linux', 'eBPF', 'nftables', 'XDP', 'netfilter', 'tc', 'perf', 'ftrace', 'bpftrace', 'kprobes'],
  },
  {
    category: 'Data, Infra & Observability',
    tools: ['NATS', 'Kafka', 'Redis', 'ZeroMQ', 'PostgreSQL', 'ClickHouse', 'MongoDB', 'MinIO', 'Docker', 'Podman', 'Kubernetes', 'Cilium', 'AWS', 'SearxNG', 'Prometheus', 'Grafana', 'OpenTelemetry'],
  },
  {
    category: 'AI & Research',
    tools: ['PyTorch', 'TensorFlow', 'JAX', 'LangChain', 'LangGraph', 'Claude', 'Codex'],
  },
]

function StackRow({ item }: { item: typeof stack[0] }) {
  return (
    <div className="flex flex-col gap-2 py-5 lg:grid lg:h-full lg:grid-cols-[3fr_7fr] lg:items-center lg:gap-10 lg:py-6">
      <div>
        <p
          className="text-xl leading-snug text-foreground lg:text-2xl"
          style={{ fontFamily: 'var(--font-unbounded)' }}
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
  return (
    <section className="px-12 py-16 md:py-24">
      <h2
        className="mb-10 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        Stack
      </h2>

      <div className="divide-y divide-border lg:grid lg:grid-cols-1 lg:auto-rows-fr">
        {stack.map((item) => (
          <StackRow key={item.category} item={item} />
        ))}
      </div>
    </section>
  )
}
