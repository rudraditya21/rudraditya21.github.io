'use client'

import { useEffect, useState } from 'react'

const FADE_DURATION = 320
const CURTAIN_DURATION = 700
const LOAD_DURATION = 2000
const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const UNIT_STEPS = Array.from({ length: 101 }, (_, index) => (100 - index) % 10)
const TENS_STEPS = Array.from({ length: 11 }, (_, index) => 10 - index)

function NumberWheel({ children, offset, smooth = false }: { children: React.ReactNode; offset: number; smooth?: boolean }) {
  return (
    <div className="h-5 overflow-hidden">
      <div
        style={{
          transform: `translateY(-${offset * 20}px)`,
          transition: smooth ? 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(1)
  const [phase, setPhase] = useState<'loading' | 'fading' | 'curtains'>('loading')
  const unitOffset = 100 - progress
  const tensOffset = 10 - Math.floor(progress / 10)

  useEffect(() => {
    if (phase !== 'loading') return
    const start = performance.now()
    let frame = 0

    function tick(now: number) {
      const next = Math.min(100, 1 + ((now - start) / LOAD_DURATION) * 99)
      setProgress(next)
      if (next < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setPhase('fading')
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [phase])

  useEffect(() => {
    if (phase !== 'fading') return
    const timer = window.setTimeout(() => setPhase('curtains'), FADE_DURATION)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'curtains') return
    const timer = window.setTimeout(onComplete, CURTAIN_DURATION)
    return () => window.clearTimeout(timer)
  }, [phase, onComplete])

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-background"
        style={{
          transform: phase === 'curtains' ? 'translateY(-100%)' : 'translateY(0)',
          transition: `transform ${CURTAIN_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
        style={{
          transform: phase === 'curtains' ? 'translateY(100%)' : 'translateY(0)',
          transition: `transform ${CURTAIN_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div
          className="relative flex h-32 w-32 items-center justify-center"
          style={{
            opacity: phase === 'loading' ? 1 : 0,
            transform: phase === 'loading' ? 'scale(1)' : 'scale(0.92)',
            transition: `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease`,
          }}
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128" aria-hidden="true">
            <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="var(--border)" strokeWidth="2" />
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            />
          </svg>
          <div className="flex h-5 items-start text-sm font-medium tabular-nums text-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
            <NumberWheel offset={tensOffset} smooth>
              {TENS_STEPS.map(value => (
                <span key={value} className="block h-5 min-w-2 text-right leading-5">{value}</span>
              ))}
            </NumberWheel>
            <NumberWheel offset={unitOffset}>
              {UNIT_STEPS.map((value, index) => (
                <span key={index} className="block h-5 leading-5">{value}</span>
              ))}
            </NumberWheel>
            <span className="h-5 leading-5">%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
