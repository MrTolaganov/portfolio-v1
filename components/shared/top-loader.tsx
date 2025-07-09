'use client'

import { useTheme } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import { useEffect, useState } from 'react'

export default function TopLoader() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    mounted && (
      <NextTopLoader
        color={resolvedTheme === 'dark' ? '#fff' : '#000'}
        initialPosition={0.5}
        crawlSpeed={200}
        height={2}
        crawl={true}
        showSpinner={false}
        easing='ease'
        speed={200}
        shadow={`0 0 10px ${resolvedTheme === 'dark' ? '#fff' : '#000'},0 0 5px ${
          resolvedTheme === 'dark' ? '#fff' : '#000'
        }`}
      />
    )
  )
}
