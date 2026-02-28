"use client"
import Link from "next/link"
import { LinkedinLogoIcon, XLogoIcon, GithubLogoIcon } from "@phosphor-icons/react"
import { buildYearGrid, getGithubOverview } from "@/lib/github"
import HeroSvg from "@/components/hero-svg"

const githubUsername = "rudraditya21"

export default async function Home() {
  const now = new Date()
  const currentYear = now.getUTCFullYear()
  const overview = await getGithubOverview(githubUsername, currentYear)
  const contributions = overview?.contributions ?? new Map()
  const weeks = buildYearGrid(contributions, currentYear)
  const repos = overview?.repos ?? []

  const domains = [
    {
      title: "Systems Engineering",
      icon: "⚙️",
      focus: ["Rust & C", "Memory-safe architectures", "Linux internals", "High-performance dataplanes", "Zero-copy systems"]
    },
    {
      title: "Compilers & Languages",
      icon: "◇",
      focus: ["Parser & lexer design", "IR & static analysis", "JIT/AOT compilation", "Bytecode & VM design", "Language tooling"]
    },
    {
      title: "Cybersecurity",
      icon: "🔐",
      focus: ["Exploit development", "Reverse engineering", "Network security", "Protocol analysis (TLS/TCP)", "Defensive architecture"]
    },
    {
      title: "AI & Machine Learning",
      icon: "∑",
      focus: ["ML systems engineering", "Distributed training", "Anomaly detection", "Security-aware AI", "Model deployment"]
    }
  ]

  const projects = [
    {
      name: "Aegis",
      description: "High-performance Rust firewall and IDS",
      tags: ["Rust", "Security", "Networking"]
    },
    {
      name: "Lattice",
      description: "Reproducible scientific computing language",
      tags: ["Language Design", "Compilers", "Numerics"]
    },
    {
      name: "Moonlight",
      description: "Modular Rust security orchestration framework",
      tags: ["Rust", "Security", "Architecture"]
    },
    {
      name: "DevOps Scripts",
      description: "Production-grade infrastructure automation toolkit",
      tags: ["Infrastructure", "Automation", "Python"]
    }
  ]

  return (
    <main className="relative w-full overflow-hidden">
      <HeroSvg />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            RUDRADITYA
          </h1>
          <p className="text-lg md:text-xl tracking-widest mb-8" style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--accent)" }}>
            SYSTEMS · COMPILERS · SECURITY · AI
          </p>
          <p className="text-sm md:text-base max-w-2xl mx-auto text-white/70 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Engineering solutions that hold up under scale, complexity, and real-world constraints.
          </p>
        </div>
        <div className="absolute bottom-10 z-10 animate-pulse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-6">— ABOUT</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Reasoning from First Principles
            </h2>
          </div>
          <div className="space-y-6 text-white/70" style={{ fontFamily: "var(--font-inter)" }}>
            <p className="text-base md:text-lg leading-relaxed">
              I’m not an average engineer. I work by understanding problems at their core, reasoning from first principles, and designing solutions that hold up under scale and complexity. I care about clarity, correctness, and long-term reliability over quick wins.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              My focus spans systems programming, compiler design, cybersecurity architecture, and AI systems engineering. I believe in writing code that is both performant and secure—not one at the expense of the other.
            </p>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section id="domains" className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-16">
            <p className="section-label mb-6">— EXPERTISE</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Areas of Interest
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {domains.map((domain, idx) => (
              <div
                key={idx}
                className="p-8 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{domain.icon}</div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {domain.title}
                </h3>
                <ul className="space-y-2">
                  {domain.focus.map((item, i) => (
                    <li key={i} className="text-sm text-white/60 flex items-center" style={{ fontFamily: "var(--font-inter)" }}>
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-16">
            <p className="section-label mb-6">— WORK</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Featured Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="p-8 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {project.name}
                </h3>
                <p className="text-white/70 mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded border border-white/20 text-white/70"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section id="github" className="relative min-h-screen w-full flex flex-col items-center justify-start px-6 py-32">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12">
            <p className="section-label mb-6">— CONTRIBUTIONS</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              GitHub Activity
            </h2>
          </div>

          {/* Heatmap */}
          <div className="mb-16 p-8 border border-white/10 rounded-lg bg-white/[0.01]">
            <div className="heatmap-legend mb-6">
              <span className="heatmap-legend-dots">
                <span className="heatmap-cell heatmap-level-0" />
                <span className="heatmap-cell heatmap-level-1" />
                <span className="heatmap-cell heatmap-level-2" />
                <span className="heatmap-cell heatmap-level-3" />
                <span className="heatmap-cell heatmap-level-4" />
              </span>
            </div>
            <div className="heatmap-grid" aria-hidden="true">
              {weeks.map((week, weekIndex) => (
                <div className="heatmap-week" key={weekIndex}>
                  {week.map((cell, dayIndex) => (
                    <span
                      key={`${weekIndex}-${dayIndex}`}
                      className={`heatmap-cell heatmap-level-${cell.level}${cell.isEmpty ? " heatmap-empty" : ""}${cell.isFuture ? " heatmap-future" : ""}`}
                      title={
                        cell.isEmpty
                          ? undefined
                          : `${cell.date} · ${cell.count} contributions`
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Repos */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Pinned Repositories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo) => (
                <Link
                  key={repo.url}
                  href={repo.url}
                  className="p-6 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {repo.name}
                    </h4>
                    <GithubLogoIcon size={18} className="text-white/40 group-hover:text-white/60 transition-colors" />
                  </div>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {repo.description ?? "No description provided."}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={`https://github.com/${githubUsername}`}
            className="inline-block px-6 py-3 border border-white/10 rounded hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300"
          >
            <span className="text-sm" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              View all repositories →
            </span>
          </Link>
        </div>
      </section>

      {/* Nova Signal Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-12">
            <p className="section-label mb-6">— WRITING</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Nova Signal
            </h2>
            <p className="text-white/60 text-lg" style={{ fontFamily: "var(--font-inter)" }}>
              A blog breaking down research papers into 9 essential points
            </p>
          </div>

          <Link
            href="https://www.nova-signal.com/"
            className="group p-8 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 block"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Breaking Down Papers
              </h3>
              <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-white/70" style={{ fontFamily: "var(--font-inter)" }}>
              Context, Problem, Importance, Why Existing Approaches Fall Short, Key Insight, Approach, Why It Works, Limitations, Impact.
            </p>
          </Link>
        </div>
      </section>

      {/* Connect Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto w-full text-center">
          <div className="mb-12">
            <p className="section-label mb-6">— CONNECT</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Get in Touch
            </h2>
            <p className="text-white/60 text-lg" style={{ fontFamily: "var(--font-inter)" }}>
              Interested in systems engineering, security, or compiler design? Let’s collaborate.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 mb-16">
            <Link
              href="https://github.com/rudraditya21"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
            >
              <GithubLogoIcon size={24} />
            </Link>
            <Link
              href="https://linkedin.com/in/rudraditya-thakur"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
            >
              <LinkedinLogoIcon size={24} />
            </Link>
            <Link
              href="https://x.com/rudraditya21"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
            >
              <XLogoIcon size={24} />
            </Link>
          </div>

          <div className="p-6 border border-white/10 rounded-lg bg-white/[0.01]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            <p className="text-sm text-white/60">
              Based on my research and projects, I’m interested in security-aware systems, high-performance computing, and the intersection of language design and security.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/40" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
          <p>© {currentYear} Rudraditya Thakur. Engineered with precision.</p>
        </div>
      </footer>
    </main>
  )
}
