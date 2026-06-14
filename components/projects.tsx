'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInView } from '@/hooks/use-in-view'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const TABS = ['Projects', 'Experiments', 'For Fun'] as const
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
      name: 'Remnant DB',
      description: 'Open-source labs for ethical hacking — spin up realistic environments with Docker or Podman, learn by doing, and tear them down when you are done.',
      stack: ['Docker', 'Podman'],
      github: 'https://github.com/Remnant-DB',
    },
  ],
  Experiments: [
    {
      name: 'Lattice',
      description: 'Small scientific computing language with reproducible numerics, a REPL, strict typing, a full numeric tower, and GPU backends (OpenCL, CUDA, HIP, Metal).',
      stack: ['C++', 'Objective-C++', 'CMake', 'OpenCL', 'CUDA', 'HIP', 'Metal'],
      github: 'https://github.com/rudraditya21/lattice',
    },
    {
      name: '8051',
      description: 'Full MCS-51/8051 microcontroller implementation with CPU core, internal RAM/SFRs, timers, serial port, interrupt controller, and a Verilator testbench.',
      stack: ['SystemVerilog', 'Verilator'],
      github: 'https://github.com/rudraditya21/8051',
    },
    {
      name: 'Moonlight',
      description: 'Modular security framework with a deterministic control plane for running modules, managing sessions, tracking campaigns, and generating advisory plans.',
      stack: ['Rust'],
      github: 'https://github.com/rudraditya21/moonlight',
    },
    {
      name: 'Aegis',
      description: 'High-performance firewall and IDS workspace with persistent configuration under /etc/aegis.',
      stack: ['Rust'],
      github: 'https://github.com/rudraditya21/aegis',
    },
    {
      name: 'minAlphaFold2',
      description: 'Minimal re-implementation of AlphaFold2\'s model and training pipeline.',
      stack: ['Python', 'PyTorch'],
      github: 'https://github.com/rudraditya21/minAlphaFold2',
    },
    {
      name: 'Rust Chain',
      description: 'Production-style minimal blockchain node.',
      stack: ['Rust'],
      github: 'https://github.com/rudraditya21/rustchain',
    },
    {
      name: '16bit.cpu',
      description: 'Custom 16-bit CPU emulator with a tiny assembler.',
      stack: ['C', 'Makefile'],
      github: 'https://github.com/rudraditya21/16bit.cpu',
    },
    {
      name: 'Alexnet.cpp',
      description: 'AlexNet implemented from scratch.',
      stack: ['C++', 'Makefile'],
      github: 'https://github.com/rudraditya21/alexnet.cpp',
    },
    {
      name: 'JAX CNN Examples',
      description: 'CNN model zoo with 60+ architectures and training sanity checks across 25+ datasets.',
      stack: ['Python', 'JAX'],
      github: 'https://github.com/rudraditya21/jax-cnn-examples',
    },
    {
      name: 'Texedo',
      description: 'Local, open-source LaTeX editor inspired by Overleaf.',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'MinIO'],
      github: 'https://github.com/rudraditya21/texedo',
    },
    {
      name: 'Devops.Scripts',
      description: 'Production-grade DevOps automation library organized by domain, with strict standards for script quality, safety, and documentation.',
      stack: ['Bash', 'Shell'],
      github: 'https://github.com/rudraditya21/devops.scripts',
      live: 'https://rudraditya21.github.io/devops.scripts/',
    },
  ],
  'For Fun': [
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
          className="text-lg leading-snug text-foreground"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          {project.name}
        </p>
        <div className="mt-2 flex items-center gap-3 text-muted-foreground">
          {project.github && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-0.5 text-xs font-medium uppercase tracking-wider underline underline-offset-2 transition-colors duration-200 hover:text-foreground"
                    style={{ fontFamily: 'var(--font-instrument-serif)' }}
                  >
                    GitHub<ArrowUpRight size={10} />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Source Code
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {project.live && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-0.5 text-xs font-medium uppercase tracking-wider underline underline-offset-2 transition-colors duration-200 hover:text-foreground"
                    style={{ fontFamily: 'var(--font-instrument-serif)' }}
                  >
                    Visit<ArrowUpRight size={10} />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  View Website
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 lg:pt-0.5">
        <p
          className="text-sm leading-relaxed text-foreground/50"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {project.description}
        </p>
        <p
          className="text-xs text-foreground/30"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {project.stack.join(', ')}
        </p>
      </div>
    </div>
  )
}

const PER_PAGE = 4

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>('Projects')
  const [page, setPage] = useState(0)
  const tabRefs      = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
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

  const items      = data[activeTab]
  const totalPages = Math.ceil(items.length / PER_PAGE)
  const paged      = items.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  return (
    <section className="min-h-[90svh] px-12 py-16 md:py-24">
      <h2
        ref={headingRef as React.RefObject<HTMLHeadingElement>}
        className="mb-10 text-5xl tracking-tight"
        style={{
          fontFamily: 'var(--font-instrument-serif)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Projects
      </h2>

      {/* Tab bar */}
      <div className="relative mb-2 flex gap-8 border-b border-border">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            ref={el => { tabRefs.current[i] = el }}
            onClick={() => switchTab(tab)}
            className="pb-3 text-sm transition-colors duration-200"
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

      {/* Content + Pagination pinned together */}
      <div className="flex min-h-[32rem] flex-col">
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
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
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
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            Next →
          </button>
        </div>
        )}
      </div>
    </section>
  )
}
