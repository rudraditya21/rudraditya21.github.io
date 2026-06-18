'use client'

import { useInView } from '@/hooks/use-in-view'
import { ArrowUpRight } from '@phosphor-icons/react'
import { posts } from '@/lib/posts'

function PostRow({ post, index }: { post: typeof posts[0]; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col gap-2 py-5 lg:flex-row lg:items-center lg:gap-10 lg:py-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
      }}
    >
      <p
        className="flex-1 text-lg leading-snug text-foreground"
        style={{ fontFamily: 'var(--font-instrument-serif)' }}
      >
        {post.title}
      </p>

      <a
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 text-xs font-medium uppercase tracking-wider text-foreground/40 underline underline-offset-2 transition-colors duration-200 hover:text-foreground lg:shrink-0"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Read on Medium<ArrowUpRight size={10} />
      </a>
    </div>
  )
}

export default function Writing() {
  const { ref, inView } = useInView(0.15)

  return (
    <section className="min-h-svh px-12 py-16 md:py-24">
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
        Blogs
      </h2>

      <div className="divide-y divide-border">
        {posts.map((post, i) => (
          <PostRow key={post.title} post={post} index={i} />
        ))}
      </div>
    </section>
  )
}
