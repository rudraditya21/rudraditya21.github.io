'use client'

import { useInView } from '@/hooks/use-in-view'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PythonIcon, RustIcon, CIcon, CppIcon, BunIcon, DartIcon, DockerIcon, ErlangIcon, GoIcon, JavaIcon, JavascriptIcon, MatlabIcon, ClaudeIcon, CodexIcon, LangChainIcon } from '@/components/icons'

type Tool = {
  name: string
  icon: React.ComponentType<{ size?: number }>
}

type Category = {
  name: string
  tools: Tool[]
}

const stack: Category[] = [
  {
    name: 'Languages',
    tools: [
      { name: 'Python',     icon: PythonIcon     },
      { name: 'Rust',       icon: RustIcon       },
      { name: 'C',          icon: CIcon          },
      { name: 'C++',        icon: CppIcon        },
      { name: 'Go',         icon: GoIcon         },
      { name: 'Java',       icon: JavaIcon       },
      { name: 'JavaScript', icon: JavascriptIcon },
      { name: 'MATLAB',     icon: MatlabIcon     },
      { name: 'Dart',       icon: DartIcon       },
      { name: 'Erlang',     icon: ErlangIcon     },
    ],
  },
  {
    name: 'Tools',
    tools: [
      { name: 'Bun', icon: BunIcon },
    ],
  },
  {
    name: 'Infra',
    tools: [
      { name: 'Docker', icon: DockerIcon },
    ],
  },
  {
    name: 'AI',
    tools: [
      { name: 'Claude',    icon: ClaudeIcon    },
      { name: 'Codex',     icon: CodexIcon     },
      { name: 'LangChain', icon: LangChainIcon },
    ],
  },
]

function ToolIcon({ tool }: { tool: Tool }) {
  const Icon = tool.icon
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex cursor-default items-center justify-center rounded-lg border border-border p-2 text-foreground/60 transition-colors duration-200 hover:border-foreground/30 hover:text-foreground">
            <Icon size={22} />
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">{tool.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function CategoryRow({ category, index }: { category: Category; index: number }) {
  const { ref, inView } = useInView(0.1)

  if (category.tools.length === 0) return null

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col gap-4 py-8 lg:flex-row lg:gap-10 lg:py-10"
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
          {category.name}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 lg:pt-0.5">
        {category.tools.map(tool => (
          <ToolIcon key={tool.name} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export default function Tools() {
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
        Tools & Technologies
      </h2>

      <div className="divide-y divide-border">
        {stack.map((category, i) => (
          <CategoryRow key={category.name} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
