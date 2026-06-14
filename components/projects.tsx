'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInView } from '@/hooks/use-in-view'
import { GithubLogo, ArrowSquareOut } from '@phosphor-icons/react'

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
      name: 'Project 1',
      description: 'Short description of what this project does and the problem it solves.',
      stack: ['Rust', 'WebAssembly'],
      github: '#',
      live: '#',
    },
    {
      name: 'Project 2',
      description: 'Short description of what this project does and the problem it solves.',
      stack: ['Next.js', 'TypeScript'],
      github: '#',
      live: '#',
    },
  ],
  Experiments: [
    {
      name: 'Project 3',
      description: 'Short description of what this project does and the problem it solves.',
      stack: ['Solidity', 'Ethereum'],
      github: '#',
    },
  ],
  'For Fun': [
    {
      name: 'Project 4',
      description: 'Short description of what this project does and the problem it solves.',
      stack: ['C', 'Linux'],
      github: '#',
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
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors duration-200 hover:text-foreground"
            >
              <GithubLogo size={14} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="transition-colors duration-200 hover:text-foreground"
            >
              <ArrowSquareOut size={14} />
            </a>
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

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>('Projects')
  const tabRefs    = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const { ref: headingRef, inView } = useInView(0.15)

  // Set indicator to first tab once mounted
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

    // Slide indicator immediately
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

    // Fade out content → swap → fade in
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab)
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        })
      },
    })
  }

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
        {/* GSAP-animated sliding indicator */}
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-px bg-foreground"
          style={{ opacity: 0, width: 0 }}
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="divide-y divide-border">
        {data[activeTab].map(project => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
