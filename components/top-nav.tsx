import Link from 'next/link'

const links = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Open Source', href: '/#open-source' },
  { label: 'Projects', href: '/projects' },
  { label: 'Publications', href: '/#publications' },
  { label: 'Stack', href: '/#tools' },
  { label: 'Education', href: '/#education' },
  { label: 'Contact', href: '/#contact' },
]

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <nav aria-label="Primary navigation" className="mx-auto flex h-16 w-full max-w-6xl items-center gap-7 overflow-x-auto px-12">
        <Link
          href="/"
          className="shrink-0 text-sm tracking-tight text-foreground"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          RT
        </Link>
        <div className="flex min-w-max items-center gap-5">
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
      </nav>
    </header>
  )
}
