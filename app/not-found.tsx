import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-12 text-center">
      <h1
        className="mb-4 text-[10rem] leading-none tracking-tight text-foreground"
        style={{ fontFamily: 'var(--font-instrument-serif)' }}
      >
        404
      </h1>
      <p
        className="mb-8 text-base text-foreground/40"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        This page doesn't exist.
      </p>
      <Link
        href="/"
        className="text-sm text-foreground/40 underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Back home
      </Link>
    </div>
  )
}
