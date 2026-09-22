"use client"

'use client'

import { useState } from 'react'
import { GithubLogoIcon, BrowserIcon } from '@phosphor-icons/react'
import Link from 'next/link'

type Project = {
  name: string
  description: string
  stack: string[]
  github?: string
  live?: string
}

const data: Record<string, Project[]> = {
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

const filters = ['All', ...Object.keys(data)]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex min-h-56 flex-col rounded-2xl border border-border p-6 transition-colors duration-300 hover:bg-foreground sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <p
          className="text-lg leading-snug text-foreground transition-colors duration-300 group-hover:text-background sm:text-xl"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {project.name}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {project.github && (
            <Link
              className="text-foreground/60 transition-colors duration-300 hover:text-foreground group-hover:text-background/75 group-hover:hover:text-background"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
            >
              <GithubLogoIcon size={20} />
            </Link>
          )}
          {project.live && (
            <Link
              className="text-foreground/60 transition-colors duration-300 hover:text-foreground group-hover:text-background/75 group-hover:hover:text-background"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name}`}
            >
              <BrowserIcon size={20} />
            </Link>
          )}
        </div>
      </div>

      <p className="mt-6 flex-1 text-sm leading-relaxed text-foreground/60 transition-colors duration-300 group-hover:text-background/75" style={{ fontFamily: 'var(--font-inter)' }}>
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2" style={{ fontFamily: 'var(--font-inter)' }}>
        {project.stack.map((tech) => (
          <span key={tech} className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground/65 transition-colors duration-300 group-hover:border-background/30 group-hover:text-background/80">
            {tech}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const projects = activeFilter === 'All' ? Object.values(data).flat() : data[activeFilter]

  return (
    <section className="px-12 py-16 md:py-24">
      <h2
        className="mb-10 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        Projects
      </h2>

      <div className="mb-8 flex flex-wrap gap-x-5 gap-y-3" style={{ fontFamily: 'var(--font-inter)' }}>
        {filters.map((filter) => {
          const active = filter === activeFilter
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className="border-b pb-1 text-sm transition-colors"
              style={{
                borderColor: active ? 'var(--foreground)' : 'transparent',
                color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
              }}
            >
              {filter}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
