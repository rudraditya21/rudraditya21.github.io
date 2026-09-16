'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInView } from '@/hooks/use-in-view'
import { GithubLogoIcon, BrowserIcon } from '@phosphor-icons/react'
import Link from 'next/link'

const TABS = ['Projects', 'Products', 'Experiments', 'Machine Learning', 'For Fun'] as const
type Tab = (typeof TABS)[number]

type Project = {
  name: string
  description: string
  stack: string[]
  github?: string
  live?: string
}

const data: Record<Tab, Project[]> = {
  Projects: [
    {
      name: 'DockUI',
      description: 'Terminal dashboard for day-to-day Docker management, including container inspection, logs, compose projects, and resource cleanup from a TUI.',
      stack: ['Rust', 'Docker', 'TUI'],
      github: 'https://github.com/rudraditya21/dockui',
    },
    {
      name: 'Devops.Scripts',
      description: 'Production-grade DevOps automation library organized by domain with strict standards for script quality, safety, and documentation.',
      stack: ['DevOps', 'Automation'],
      github: 'https://github.com/rudraditya21/devops.scripts',
    },
  ],
  Products: [
    {
      name: 'Gymm',
      description: 'Workout tracking app for logging sessions, managing exercises and routines, reviewing history, and backing up data.',
      stack: ['Flutter', 'Dart', 'Riverpod', 'Hive'],
      github: 'https://github.com/rudraditya21/gymm',
    },
    {
      name: 'Grind',
      description: 'Social accountability app for tracking daily tasks and routines, building streaks, and reviewing progress with analytics.',
      stack: ['Flutter', 'Dart', 'Hive', 'fl_chart'],
      github: 'https://github.com/rudraditya21/grind',
    },
    {
      name: 'Glyph',
      description: 'Open-source visual workflow and diagram editor with a canvas-based node system, searchable catalog, history, and extensible architecture.',
      stack: ['Next.js', 'Canvas'],
      github: 'https://github.com/rudraditya21/glyph',
    },
    {
      name: 'Texedo',
      description: 'Local open-source LaTeX editor inspired by Overleaf, built with Next.js, Postgres, and MinIO.',
      stack: ['Next.js', 'Postgres', 'MinIO'],
      github: 'https://github.com/rudraditya21/texedo',
    },
  ],
  Experiments: [
    {
      name: '16bit.cpu',
      description: 'Small C project that emulates a custom 16-bit CPU and includes a tiny assembler.',
      stack: ['C'],
      github: 'https://github.com/rudraditya21/16bit.cpu',
    },
    {
      name: 'rustchain',
      description: 'Production-style minimal blockchain node in Rust with deterministic primitives, signed transactions, persistent storage, TCP P2P sync, JSON-RPC, and a CLI.',
      stack: ['Rust', 'Tokio', 'Axum', 'sled'],
      github: 'https://github.com/rudraditya21/rustchain',
    },
    {
      name: 'Aegis',
      description: 'High-performance Rust firewall and IDS workspace with persistent system configuration.',
      stack: ['Rust'],
      github: 'https://github.com/rudraditya21/aegis',
    },
    {
      name: '8051',
      description: 'Full MCS-51/8051 microcontroller implementation in SystemVerilog with CPU core, peripherals, interrupt controller, and a Verilator testbench.',
      stack: ['SystemVerilog', 'Verilator'],
      github: 'https://github.com/rudraditya21/8051',
    },
    {
      name: 'Lattice',
      description: 'Small scientific computing language for reproducible numerics and statistical workflows with strict typing, tensors, a REPL, and optional GPU backends.',
      stack: ['C', 'OpenCL', 'CUDA', 'Metal'],
      github: 'https://github.com/rudraditya21/lattice',
    },
    {
      name: 'Moonlight',
      description: 'Rust-based modular security framework with a deterministic control plane for modules, sessions, campaigns, objectives, and advisory plans.',
      stack: ['Rust'],
      github: 'https://github.com/rudraditya21/moonlight',
    },
  ],
  'Machine Learning': [
    {
      name: 'ViT-PyTorch',
      description: 'Complete Vision Transformer implementation from scratch in PyTorch with CIFAR-10 training, schedulers, checkpointing, and unit tests.',
      stack: ['PyTorch', 'Python'],
      github: 'https://github.com/rudraditya21/vit-pytorch',
    },
    {
      name: 'AlexNet.CPP',
      description: 'From-scratch C++17 AlexNet inference engine with custom tensor operations and layer implementations including Conv2D, ReLU, LRN, pooling, and softmax.',
      stack: ['C++', 'OpenMP'],
      github: 'https://github.com/rudraditya21/alexnet.cpp',
    },
    {
      name: 'minAlphaFold2',
      description: 'Compact educational AlphaFold2-style implementation with a minimal Evoformer, structure module, AF2 losses, and a PDB-based training pipeline.',
      stack: ['Python', 'PyTorch'],
      github: 'https://github.com/rudraditya21/minAlphaFold2',
    },
    {
      name: 'JAX-CNN-Examples',
      description: 'Minimal JAX CNN model zoo with dozens of vision architectures, broad dataset support, and a quick training sanity-check CLI.',
      stack: ['JAX', 'Python'],
      github: 'https://github.com/rudraditya21/jax-cnn-examples',
    },
  ],
  'For Fun': [
    {
      name: 'Sudoku',
      description: 'Enter a puzzle and let the solver find the solution instantly.',
      stack: ['Next.js', 'TypeScript', 'TailwindCSS'],
      github: 'https://github.com/rudraditya21/sudoku',
      live: 'https://rudraditya21.github.io/sudoku/',
    },
    {
      name: 'Typy',
      description: 'Mechanical keyboard with sound. Desktop only.',
      stack: ['Next.js', 'TypeScript', 'TailwindCSS'],
      github: 'https://github.com/rudraditya21/typy',
      live: 'https://rudraditya21.github.io/typy/',
    },
    {
      name: 'Tipsy Type',
      description: 'Minimal typing speed test with live stats, timer presets, and an animated keyboard UI. Desktop only.',
      stack: ['Next.js', 'TypeScript', 'TailwindCSS'],
      github: 'https://github.com/rudraditya21/tipsy-type',
      live: 'https://rudraditya21.github.io/tipsy-type/',
    },
  ],
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2 py-8 lg:flex-row lg:gap-10 lg:py-10">
      <div className="lg:w-52 lg:shrink-0">
        <p
          className="text-xl leading-snug text-foreground lg:text-2xl"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {project.name}
        </p>
        <div className="mt-2 flex items-center gap-3 text-muted-foreground">
          {project.github && (
            <Link className="text-md border border-border py-1 px-1 rounded-2xl bg-foreground text-background" href={project.github} target='_blank'><GithubLogoIcon /></Link>
          )}
          {project.live && (
            <Link className="text-md border border-border py-1 px-1 rounded-2xl bg-foreground text-background" href={project.live} target='_blank'><BrowserIcon /></Link>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 lg:pt-0.5">
        <p className="text-sm leading-relaxed text-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
          {project.description}
        </p>
        <p className="text-xs text-foreground/60 space-x-4" style={{ fontFamily: 'var(--font-inter)' }}>
          {project.stack.map((tech) => (
            <span key={tech}>{`#${tech}`}</span>
          ))}
        </p>
      </div>
    </div >
  )
}

const PER_PAGE = 4

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>('Projects')
  const [page, setPage] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { ref: headingRef, inView } = useInView(0.15)

  useEffect(() => {
    const first = tabRefs.current[0]
    if (!first || !indicatorRef.current) return
    gsap.set(indicatorRef.current, {
      x: first.offsetLeft,
      width: first.offsetWidth,
      opacity: 1,
    })
  }, [])

  function switchTab(tab: Tab) {
    if (tab === activeTab) return

    const idx = TABS.indexOf(tab)
    const btn = tabRefs.current[idx]
    if (btn) {
      gsap.to(indicatorRef.current, {
        x: btn.offsetLeft,
        width: btn.offsetWidth,
        duration: 0.35,
        ease: 'power3.out',
      })
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab)
        setPage(0)
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        })
      },
    })
  }

  function changePage(next: number) {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setPage(next)
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        })
      },
    })
  }

  const items = data[activeTab]
  const totalPages = Math.ceil(items.length / PER_PAGE)
  const paged = items.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  return (
    <section className="px-12 py-16 md:py-24">
      <h2
        ref={headingRef as React.RefObject<HTMLHeadingElement>}
        className="mb-10 text-5xl tracking-tight"
        style={{
          fontFamily: 'var(--font-unbounded)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Projects
      </h2>

      {/* Tab bar */}
      <div className="mb-2 overflow-x-auto">
        <div className="relative inline-flex min-w-max gap-8 border-b border-border pr-4">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              ref={el => { tabRefs.current[i] = el }}
              onClick={() => switchTab(tab)}
              className="shrink-0 pb-3 text-sm transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                color: activeTab === tab ? 'var(--foreground)' : 'var(--muted-foreground)',
              }}
            >
              {tab}
            </button>
          ))}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-px bg-foreground"
            style={{ opacity: 0, width: 0 }}
          />
        </div>
      </div>

      {/* Content + Pagination pinned together */}
      <div className="flex min-h-128 flex-col">
        <div ref={contentRef} className="divide-y divide-border">
          {paged.map(project => (
            <ProjectRow key={project.name} project={project} />
          ))}
        </div>

        {/* Pagination always at bottom of the fixed-height area */}
        {totalPages > 1 && (
          <div className="mt-auto pt-8 flex items-center gap-6">
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 0}
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              ← Prev
            </button>
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages - 1}
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
