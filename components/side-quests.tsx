'use client'

import { useInView } from '@/hooks/use-in-view'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Link = { name?: string; label: string; href: string }

type Quest = {
  name: string
  items?: string[]
  links?: Link[]
}

const quests: Quest[] = [
  {
    name: 'Chess',
    links: [
      { name: 'Lichess',   label: 'Profile', href: 'https://lichess.org/@/rudradityathakur' },
      { name: 'Chess.com', label: 'Profile', href: 'https://www.chess.com/member/rudradityathakur' },
    ],
  },
  {
    name: 'Languages',
    items: ['French (Français)', 'Russian (Русский)', 'Spanish (Español)', 'German (Deutsch)'],
  },
  {
    name: 'Open Source',
    links: [
      { name: 'Metasploit Framework', label: 'Github', href: 'https://github.com/rapid7/metasploit-framework' },
    ],
  },
  {
    name: 'Music',
    items: ['Guitar', 'Piano'],
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

      <div className="lg:pt-0.5">
        {quest.links && (
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-12">
            {quest.links.map(link => (
              <div key={link.href} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                <span className="text-sm text-foreground/50" style={{ fontFamily: 'var(--font-inter)' }}>
                  {link.name && <>{link.name} (</>}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 font-medium underline underline-offset-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                          {link.label}<ArrowUpRight size={10} />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        {link.name ? `${link.name} ${link.label}` : link.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {link.name && <>)</>}
                </span>
              </div>
            ))}
          </div>
        )}

        {quest.items && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-3">
            {quest.items.map(item => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                <span
                  className="text-sm text-foreground/50"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SideQuests() {
  const { ref, inView } = useInView(0.15)

  return (
    <section className="min-h-svh px-12 py-16 md:py-24">
      <h2
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className="mb-10 text-6xl tracking-tight"
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
