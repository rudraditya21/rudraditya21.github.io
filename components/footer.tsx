'use client'

import { GithubLogo, LinkedinLogo, TwitterLogo, YoutubeLogo, MediumLogo } from '@phosphor-icons/react'
import { socials } from '@/lib/data'
import MagneticIcon from '@/components/magnetic-icon'

function SubstackIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  )
}

const links = [
  { icon: GithubLogo,   href: socials.github,   label: 'GitHub' },
  { icon: LinkedinLogo, href: socials.linkedin,  label: 'LinkedIn' },
  { icon: TwitterLogo,  href: socials.twitter,   label: 'Twitter' },
  { icon: YoutubeLogo,  href: socials.youtube,   label: 'YouTube' },
  { icon: MediumLogo,   href: socials.medium,    label: 'Medium' },
]

export default function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 md:px-12">
      <div className="border-t border-border py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Rudraditya Thakur
            </span>
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Turning caffeine into products.
            </span>
          </div>

          <div className="flex items-center gap-4">
            {links.map(({ icon: Icon, href, label }) => (
              <MagneticIcon key={label} href={href} label={label} strength={0.3}>
                <Icon size={18} />
              </MagneticIcon>
            ))}
            <MagneticIcon href={socials.substack} label="Substack" strength={0.3}>
              <SubstackIcon />
            </MagneticIcon>
          </div>
        </div>
      </div>
    </footer>
  )
}
