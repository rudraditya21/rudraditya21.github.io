'use client'

import { useInView } from '@/hooks/use-in-view'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Publication = {
  title: string
  conference: string
  abstract: string
  publisher: string
  year: number
  href?: string
}

const publications: Publication[] = [
  {
    title: 'Enhancing Deep Learning Performance Through Parallel Processing: A Comprehensive Research Study',
    conference: '2023 6th International Conference on Recent Trends in Advance Computing (ICRTAC)',
    abstract: 'Explores the multifaceted dimensions of enhancing deep learning performance through parallel processing — covering theoretical underpinnings, parallelization strategies, hardware and software infrastructures, and application-specific impact.',
    publisher: 'IEEE',
    year: 2023,
    href: 'https://doi.org/10.1109/ICRTAC59277.2023.10480769',
  },
]

function PublicationRow({ pub, index }: { pub: Publication; index: number }) {
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
      <div className="lg:w-52 lg:shrink-0">
        <p className="text-sm text-foreground" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          {pub.publisher} – {pub.year}
        </p>
        {pub.href && (
          <div className="mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs font-medium uppercase tracking-wider underline underline-offset-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    style={{ fontFamily: 'var(--font-instrument-serif)' }}
                  >
                    View Paper<ArrowUpRight size={10} />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Read Publication
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      <div className="lg:pt-0.5">
        <p
          className="text-lg leading-snug text-foreground"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          {pub.title}
        </p>
        <p
          className="mt-1 text-xs text-muted-foreground"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {pub.conference}
        </p>
        <p
          className="mt-3 text-sm leading-relaxed text-foreground/50"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {pub.abstract}
        </p>
      </div>
    </div>
  )
}

export default function Publications() {
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
        Publications
      </h2>

      <div className="divide-y divide-border">
        {publications.map((pub, i) => (
          <PublicationRow key={pub.title} pub={pub} index={i} />
        ))}
      </div>
    </section>
  )
}
