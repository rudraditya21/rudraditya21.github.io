'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const SECTIONS = [
  { label: 'About',             id: 'about'        },
  { label: 'Projects',          id: 'projects'      },
  { label: 'Work Experience',   id: 'experience'    },
  { label: 'Education',         id: 'education'     },
  { label: 'Publications',      id: 'publications'  },
  { label: 'Areas of Interest', id: 'interests'     },
  { label: 'Tools & Tech',      id: 'tools'         },
  { label: 'Side Quests',       id: 'quests'        },
  { label: 'Blogs',             id: 'writing'       },
]

type NavItem    = { kind: 'nav';    label: string; id: string }
type ActionItem = { kind: 'action'; label: string; onRun: () => void }
type Item = NavItem | ActionItem

export default function CommandPalette({ onCopyEmail }: { onCopyEmail: () => void }) {
  const [open, setOpen]         = useState(false)
  const [query, setQuery]       = useState('')
  const [selected, setSelected] = useState(0)
  const [shortcut, setShortcut] = useState('⌘K')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!/Mac|iPhone|iPad|iPod/.test(navigator.platform)) setShortcut('Ctrl+K')
  }, [])

  const allItems: Item[] = [
    ...SECTIONS.map(s => ({ kind: 'nav' as const, label: s.label, id: s.id })),
    { kind: 'action', label: 'Copy email', onRun: onCopyEmail },
  ]

  const filtered = query
    ? allItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    : allItems

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelected(0)
  }, [])

  const execute = useCallback((item: Item) => {
    if (item.kind === 'nav') {
      close()
      setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      item.onRun()
      close()
    }
  }, [close])

  // Cmd+K / Ctrl+K toggle + custom open event (for footer button)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => {
          if (!v) { setQuery(''); setSelected(0) }
          return !v
        })
      }
    }
    function onOpen() { setOpen(true); setQuery(''); setSelected(0) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen)
    }
  }, [])

  // Arrow / Enter / Escape when open
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')    { e.preventDefault(); close() }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter')     { e.preventDefault(); if (filtered[selected]) execute(filtered[selected]) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, selected, close, execute])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30)
  }, [open])

  // Reset selection on query change
  useEffect(() => { setSelected(0) }, [query])

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[selected] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={close} />

      <div className="fixed inset-x-0 top-[20vh] z-50 mx-auto w-full max-w-lg px-4">
        <div
          className="overflow-hidden rounded-xl border border-border bg-background"
          onClick={e => e.stopPropagation()}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sections or actions..."
            className="w-full border-b border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/30"
            style={{ fontFamily: 'var(--font-inter)' }}
          />

          <div ref={listRef} className="max-h-72 overflow-y-auto">
            {filtered.length === 0 ? (
              <p
                className="px-4 py-8 text-center text-sm text-foreground/30"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                No results
              </p>
            ) : (
              filtered.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => execute(item)}
                  onMouseEnter={() => setSelected(i)}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors duration-75 ${
                    i === selected ? 'bg-foreground/6 text-foreground' : 'text-foreground/50'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span>{item.label}</span>
                  {item.kind === 'action' && (
                    <span className="text-xs text-foreground/25">action</span>
                  )}
                </button>
              ))
            )}
          </div>

          <div
            className="flex items-center gap-4 border-t border-border px-4 py-2 text-xs text-foreground/25"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> select</span>
            <span><kbd className="font-mono">esc</kbd> close</span>
            <span className="ml-auto"><kbd className="font-mono">{shortcut}</kbd> toggle</span>
          </div>
        </div>
      </div>
    </>
  )
}
