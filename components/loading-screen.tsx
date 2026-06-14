'use client'

import { useEffect, useState } from 'react'

const greetings = [
  'Hello',
  'नमस्ते',
  'こんにちは',
  '안녕하세요',
  'Привет',
]

const WORD_DURATION = 340
const SLIDE = 600

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [sliding, setSliding] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (index < greetings.length - 1) {
        setIndex(i => i + 1)
      } else {
        setSliding(true)
      }
    }, WORD_DURATION)
    return () => clearTimeout(t)
  }, [index])

  useEffect(() => {
    if (!sliding) return
    const t = setTimeout(onComplete, SLIDE)
    return () => clearTimeout(t)
  }, [sliding, onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={{
        transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
        transition: sliding ? `transform ${SLIDE}ms cubic-bezier(0.76, 0, 0.24, 1)` : 'none',
      }}
    >
      <span
        key={index}
        className="select-none text-4xl font-semibold tracking-[0.25em] text-foreground sm:text-5xl md:text-6xl"
        style={{
          animation: `greet ${WORD_DURATION}ms linear forwards`,
          fontFamily: 'var(--font-space-grotesk)',
        }}
      >
        {greetings[index]}
      </span>
    </div>
  )
}
