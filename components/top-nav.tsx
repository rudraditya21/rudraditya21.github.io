'use client'

import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import Link from 'next/link'

const links = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Open Source', href: '/#open-source' },
  { label: 'Projects', href: '/projects' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/#contact' },
]

export default function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <nav aria-label="Primary navigation" className="mx-auto w-full max-w-6xl px-12">
        <div className="flex h-16 items-center justify-between gap-7">
          <Link
            href="/"
            className="shrink-0 text-sm tracking-tight text-foreground"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            RT
          </Link>

          <div className="hidden min-w-max items-center gap-5 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/8 md:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>

        {open && (
          <div
            className="fixed inset-x-0 bottom-0 top-16 bg-background/65 backdrop-blur-md md:hidden"
            onClick={() => setOpen(false)}
          >
            <div className="border-y border-border bg-background/95 px-12 py-3" onClick={(event) => event.stopPropagation()}>
              <div className="mx-auto flex w-full max-w-6xl flex-col">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-1 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
