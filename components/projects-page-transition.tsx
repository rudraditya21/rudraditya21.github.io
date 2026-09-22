'use client'

import { useEffect, useState } from 'react'
import LoadingScreen from '@/components/loading-screen'

const CURTAIN_DURATION = 700
const VISIT_KEY = 'has-visited-projects'

function Curtains({ open, onComplete }: { open: boolean; onComplete?: () => void }) {
  useEffect(() => {
    if (!open || !onComplete) return
    const timer = window.setTimeout(onComplete, CURTAIN_DURATION)
    return () => window.clearTimeout(timer)
  }, [onComplete, open])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-background"
        style={{
          transform: open ? 'translateY(-100%)' : 'translateY(0)',
          transition: `transform ${CURTAIN_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
        style={{
          transform: open ? 'translateY(100%)' : 'translateY(0)',
          transition: `transform ${CURTAIN_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />
    </div>
  )
}

export default function ProjectsPageTransition() {
  const [stage, setStage] = useState<'checking' | 'preloader' | 'curtains' | 'complete'>('checking')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hasVisited = window.sessionStorage.getItem(VISIT_KEY) === 'true'
    window.sessionStorage.setItem(VISIT_KEY, 'true')
    setStage(hasVisited ? 'curtains' : 'preloader')
  }, [])

  useEffect(() => {
    if (stage !== 'curtains') return
    const frame = window.requestAnimationFrame(() => setOpen(true))
    return () => window.cancelAnimationFrame(frame)
  }, [stage])

  if (stage === 'checking') return <Curtains open={false} />

  if (stage === 'preloader') {
    return <LoadingScreen onComplete={() => setStage('complete')} />
  }

  if (stage === 'curtains') {
    return <Curtains open={open} onComplete={() => setStage('complete')} />
  }

  return null
}
