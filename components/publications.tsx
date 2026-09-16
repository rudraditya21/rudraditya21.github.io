'use client'

import { useInView } from '@/hooks/use-in-view'
import { ArrowUpRight } from '@phosphor-icons/react'

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

function FeaturedPublication({ pub }: { pub: Publication }) {
  const { ref, inView } = useInView(0.1)

  return (
    <article
      ref={ref as React.RefObject<HTMLDivElement>}
      className="rounded-2xl border border-border p-6 sm:p-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <h3 className="text-lg leading-snug text-foreground sm:text-xl" style={{ fontFamily: 'var(--font-unbounded)' }}>
        {pub.title}
      </h3>
      <p className="mt-3 text-sm text-foreground/60" style={{ fontFamily: 'var(--font-inter)' }}>
        {pub.conference} · {pub.publisher}
      </p>
      <p className="mt-5 text-sm leading-relaxed text-foreground/60" style={{ fontFamily: 'var(--font-inter)' }}>
        {pub.abstract}
      </p>
      {pub.href && (
        <a
          href={pub.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1 text-sm text-foreground underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          View paper<ArrowUpRight size={14} />
        </a>
      )}
    </article>
  )
}

function PublicationIndexRow({ pub }: { pub: Publication }) {
  return (
    <article className="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div>
        <h3 className="text-base leading-snug text-foreground sm:text-lg" style={{ fontFamily: 'var(--font-unbounded)' }}>{pub.title}</h3>
        <p className="mt-2 text-sm text-foreground/60" style={{ fontFamily: 'var(--font-inter)' }}>
          {pub.conference} · {pub.publisher}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-4 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
        <span className="text-foreground/50">{pub.year}</span>
        {pub.href && (
          <a href={pub.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-foreground underline underline-offset-4">
            Paper<ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </article>
  )
}

export default function Publications() {
  const { ref, inView } = useInView(0.15)
  const [featured, ...index] = publications

  return (
    <section className="px-12 py-16 md:py-24">
      <h2
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className="mb-10 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
        style={{
          fontFamily: 'var(--font-unbounded)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Publications
      </h2>

      {featured && <FeaturedPublication pub={featured} />}

      {index.length > 0 && (
        <div className="mt-12">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/45" style={{ fontFamily: 'var(--font-inter)' }}>
            Research index
          </p>
          <div className="mt-4 divide-y divide-border">
            {index.map((pub) => <PublicationIndexRow key={pub.title} pub={pub} />)}
          </div>
        </div>
      )}
    </section>
  )
}
