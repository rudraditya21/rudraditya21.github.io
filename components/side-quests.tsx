'use client'

import { useInView } from '@/hooks/use-in-view'

type Quest = {
  name: string
  description: string
}

const quests: Quest[] = [
  {
    name: 'Quest 1',
    description: 'Short description of this side quest, hobby, or thing you do outside of work.',
  },
  {
    name: 'Quest 2',
    description: 'Short description of this side quest, hobby, or thing you do outside of work.',
  },
]

function QuestRow({ quest, index }: { quest: Quest; index: number }) {
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
        <p
          className="text-lg leading-snug text-foreground"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          {quest.name}
        </p>
      </div>
      <p
        className="text-sm leading-relaxed text-foreground/50 lg:pt-0.5"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {quest.description}
      </p>
    </div>
  )
}

export default function SideQuests() {
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
        Side Quests
      </h2>

      <div className="divide-y divide-border">
        {quests.map((quest, i) => (
          <QuestRow key={quest.name} quest={quest} index={i} />
        ))}
      </div>
    </section>
  )
}
