'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  href: string
  label: string
  strength?: number
  children: React.ReactNode
  className?: string
}

export default function MagneticIcon({ href, label, strength = 0.35, children, className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const dx = e.clientX - (left + width / 2)
    const dy = e.clientY - (top + height / 2)
    gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.25, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`text-muted-foreground transition-colors duration-200 hover:text-foreground ${className}`}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            {children}
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
