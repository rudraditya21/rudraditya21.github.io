'use client'

import { useEffect, useState } from 'react'

const greetings = [
  'Hello',
  'Bonjour',
  'Hola',
  'Ciao',
  'नमस्ते',
  'こんにちは',
  '안녕하세요',
  'Привет',
]

const FADE_IN = 450
const HOLD = 280
const FADE_OUT = 270
const SLIDE = 950

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [sliding, setSliding] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 40)
    const t2 = setTimeout(() => setVisible(false), 40 + FADE_IN + HOLD)
    const t3 = setTimeout(() => {
      if (index < greetings.length - 1) {
        setIndex(i => i + 1)
      } else {
        setSliding(true)
      }
    }, 40 + FADE_IN + HOLD + FADE_OUT)

    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [index])

  useEffect(() => {
    if (!sliding) return
    const t = setTimeout(onComplete, SLIDE)
    return () => clearTimeout(t)
  }, [sliding, onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
        transition: sliding ? `transform ${SLIDE}ms cubic-bezier(0.76, 0, 0.24, 1)` : 'none',
      }}
    >
      <span
        className="select-none text-4xl font-semibold tracking-[0.25em] text-white sm:text-5xl md:text-6xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: `opacity ${visible ? FADE_IN : FADE_OUT}ms ease, transform ${visible ? FADE_IN : FADE_OUT}ms ease`,
          fontFamily: 'var(--font-space-grotesk)',
        }}
      >
        {greetings[index]}
      </span>
    </div>
  )
}
