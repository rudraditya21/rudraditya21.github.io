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

function getQuestCardClassName(index: number) {
  switch (index) {
    case 0:
      return 'lg:col-span-3 lg:row-span-2'
    case 1:
      return 'lg:col-span-3 lg:row-span-1'
    case 2:
      return 'lg:col-span-2 lg:row-span-1'
    default:
      return 'lg:col-span-1 lg:row-span-1'
  }
}

function QuestRow({ quest, index }: { quest: Quest; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`rounded-[2rem] border border-border bg-background/70 p-6 backdrop-blur-sm sm:p-7 lg:p-8 ${getQuestCardClassName(index)}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
      }}
    >
      <div className="flex h-full flex-col gap-6">
        <p
          className="text-2xl leading-snug text-foreground lg:text-3xl"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {quest.name}
        </p>

        {quest.links && (
          <div className="flex flex-col gap-2 text-sm text-foreground/50 lg:flex-row lg:flex-wrap lg:items-center lg:gap-y-2" style={{ fontFamily: 'var(--font-inter)' }}>
            {quest.links.map((link, index) => (
              <div key={link.href} className="inline-flex items-center">
                {index > 0 && <span className="hidden px-2 text-foreground/25 lg:inline">|</span>}
                {link.name && <span className="mr-1">{link.name}</span>}
                {link.name && <span className="mr-1 text-foreground/30">/</span>}
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
              </div>
            ))}
          </div>
        )}

        {quest.items && (
          <div
            className="flex flex-col gap-2 text-sm text-foreground/50 lg:flex-row lg:flex-wrap lg:items-center lg:gap-y-2"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {quest.items.map((item, index) => (
              <div key={item} className="inline-flex items-center">
                {index > 0 && <span className="hidden px-2 text-foreground/25 lg:inline">|</span>}
                <span>{item}</span>
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
          fontFamily: 'var(--font-unbounded)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Side Quests
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:auto-rows-[minmax(12rem,auto)] lg:grid-cols-6">
        {quests.map((quest, i) => (
          <QuestRow key={quest.name} quest={quest} index={i} />
        ))}
      </div>
    </section>
  )
}
