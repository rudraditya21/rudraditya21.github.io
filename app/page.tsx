'use client'

import { useState } from 'react'
import LoadingScreen from '@/components/loading-screen'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div className="flex h-[90svh] items-center justify-center">
        <p>Rudraditya Thakur</p>
      </div>
    </>
  )
}
