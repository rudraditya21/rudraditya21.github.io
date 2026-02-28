"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-black/30 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="text-xs font-bold tracking-widest hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
          [RUDRADITYA]
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-xs tracking-widest text-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            ABOUT
          </Link>
          <Link href="#domains" className="text-xs tracking-widest text-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            DOMAINS
          </Link>
          <Link href="#projects" className="text-xs tracking-widest text-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            PROJECTS
          </Link>
          <Link href="#github" className="text-xs tracking-widest text-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            GITHUB
          </Link>
        </nav>
      </div>
    </header>
  )
}