'use client'

import { useTheme } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import { useEffect, useState } from 'react'

export default function TopLoader() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    mounted && (
      <NextTopLoader
        color={`${theme === 'dark' ? 'white' : 'black'}`}
        initialPosition={0.5}
        crawlSpeed={200}
        height={2}
        crawl={true}
        showSpinner={false}
        easing='ease'
        speed={200}
        shadow={`0 0 10px ${theme === 'dark' ? 'white' : 'black'},0 0 5px ${
          theme === 'dark' ? 'white' : 'black'
        }`}
      />
    )
  )
}
