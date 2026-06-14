'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInView } from '@/hooks/use-in-view'
import { ArrowUpRight } from '@phosphor-icons/react'

const TABS = ['Medium', 'Substack'] as const
type Tab = (typeof TABS)[number]

type Post = {
  title: string
  description: string
  href: string
}

const data: Record<Tab, Post[]> = {
  Medium: [
    {
      title: 'Blog 1',
      description: 'Short description of what this blog post is about and what the reader will learn.',
      href: '#',
    },
    {
      title: 'Blog 2',
      description: 'Short description of what this blog post is about and what the reader will learn.',
      href: '#',
    },
  ],
  Substack: [
    {
      title: 'Blog 1',
      description: 'Short description of what this newsletter post is about and what the reader will learn.',
      href: '#',
    },
    {
      title: 'Blog 2',
      description: 'Short description of what this newsletter post is about and what the reader will learn.',
      href: '#',
    },
  ],
}

function PostRow({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-2 py-8 lg:flex-row lg:gap-10 lg:py-10">
      <div className="lg:w-52 lg:shrink-0">
        <p
          className="text-lg leading-snug text-foreground"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          {post.title}
        </p>
        <div className="mt-2 text-muted-foreground">
          <a
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-0.5 text-xs font-medium uppercase tracking-wider underline underline-offset-2 transition-colors duration-200 hover:text-foreground"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            Visit<ArrowUpRight size={10} />
          </a>
        </div>
      </div>

      <p
        className="text-sm leading-relaxed text-foreground/50 lg:pt-0.5"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {post.description}
      </p>
    </div>
  )
}

export default function Writing() {
  const [activeTab, setActiveTab] = useState<Tab>('Medium')
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
        Writing
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

      {/* Content */}
      <div ref={contentRef} className="divide-y divide-border">
        {data[activeTab].map(post => (
          <PostRow key={post.title} post={post} />
        ))}
      </div>
    </section>
  )
}
