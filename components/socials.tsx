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

export default function Socials({ show }: { show: boolean }) {
  return (
    <div
      className="flex items-center gap-5"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 480ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 480ms',
      }}
    >
      {links.map(({ icon: Icon, href, label }) => (
        <MagneticIcon key={label} href={href} label={label}>
          <Icon size={18} />
        </MagneticIcon>
      ))}
      <MagneticIcon href={socials.substack} label="Substack">
        <SubstackIcon size={18} />
      </MagneticIcon>
    </div>
  )
}
