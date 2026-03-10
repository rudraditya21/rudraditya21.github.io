import Link from "next/link";

const areasOfInterest = [
  {
    domain: "Blockchain & Distributed Systems",
    focus:
      "Layer-1 architecture, Ethereum & EVM internals, execution layer mechanics, consensus design (PoS), mempool architecture, Merkle trees, state transition systems, P2P networking, transaction propagation, smart contracts (Solidity), cryptographic primitives, high-performance blockchain clients in Rust",
  },
  {
    domain: "Systems Engineering",
    focus:
      "Systems programming in Rust and C, memory-safe architectures, lock-free and concurrent system design, performance engineering, Linux internals, networking stack optimization, high-performance dataplanes (XDP, AF_XDP, DPDK), zero-copy systems, kernel-userspace boundaries",
  },
  {
    domain: "Compilers & Language Design",
    focus:
      "Parser and lexer implementation, IR design, static analysis, deterministic execution models, reproducible numerics, language tooling, bytecode & VM design, ahead-of-time (AOT) and JIT compilation strategies",
  },
  {
    domain: "Cybersecurity",
    focus:
      "Exploit development fundamentals, reverse engineering, secure systems design, network security engineering (firewalls, IDS/IPS), deep packet inspection (DPI), protocol analysis (TCP/IP, TLS), adversarial simulation, defensive infrastructure architecture",
  },
  {
    domain: "Artificial Intelligence & Machine Learning",
    focus:
      "ML systems engineering, statistical computing infrastructure, reproducible ML pipelines, security-oriented AI systems, performance-aware model deployment, distributed training systems, applied AI in threat detection & anomaly detection",
  },
];

const projects = [
  { name: "Aegis", description: "High-performance Rust firewall and IDS" },
  {
    name: "Lattice Programming Language",
    description: "Reproducible scientific computing language",
  },
  {
    name: "Moonlight",
    description: "Modular Rust security orchestration framework",
  },
  {
    name: "DevOps Scripts Library",
    description: "Production-grade infrastructure automation toolkit",
  },
];

const connectLinks = [
  { label: "Portfolio", href: "https://rudraditya21.github.io" },
  { label: "GitHub", href: "https://github.com/rudraditya21" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rudraditya-thakur/" },
  { label: "X", href: "https://x.com/rudraditya21" },
];

export default function Home() {
  return (
    <main className="profile-root">
      <div className="profile-frame">
        <header className="profile-header">
          <p className="profile-kicker">Hi, I&apos;m</p>
          <h1>Rudraditya Thakur</h1>
          <p className="profile-subtitle">
            Systems & Compilers · Cybersecurity · Artificial Intelligence &
            Machine Learning · Blockchain & Distributed Systems
          </p>
        </header>

        <div className="profile-grid">
          <article className="profile-block">
            <h2>Nova Signal (Blog)</h2>
            <p>
              <Link
                href="https://www.nova-signal.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.nova-signal.com
              </Link>
            </p>
            <p className="profile-muted">
              Breaking down papers into 9 essential points: Context, Problem,
              Importance, Why Existing Approaches Fall Short, Key Insight,
              Approach, Why It Works, Limitations, and Impact.
            </p>
          </article>

          <article className="profile-block">
            <h2>Projects</h2>
            <ul className="table-list project-table">
              {projects.map((project) => (
                <li key={project.name} className="table-row">
                  <p className="table-key">{project.name}</p>
                  <p className="table-value">{project.description}</p>
                </li>
              ))}
            </ul>
          </article>

          <section className="profile-block">
            <h2>Areas of Interest</h2>
            <ul className="table-list area-table">
              {areasOfInterest.map((area) => (
                <li key={area.domain} className="table-row">
                  <p className="table-key">{area.domain}</p>
                  <p className="table-value">{area.focus}</p>
                </li>
              ))}
            </ul>
          </section>

          <article className="profile-block">
            <h2>Connect</h2>
            <ul className="table-list connect-table">
              {connectLinks.map((item) => (
                <li key={item.href} className="table-row">
                  <p className="table-key">{item.label}</p>
                  <p className="table-value">
                    <Link href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.href}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </main>
  );
}
