'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <Skeleton className='size-8 rounded-full' />

  return theme === 'light' ? (
    <Button
      size={'icon'}
      className='p-1 hover:bg-transparent'
      variant={'ghost'}
      asChild
      onClick={() => setTheme('dark')}
    >
      <Moon />
    </Button>
  ) : (
    <Button
      size={'icon'}
      className='p-1 hover:bg-transparent'
      variant={'ghost'}
      asChild
      onClick={() => setTheme('light')}
    >
      <Sun />
    </Button>
  )
}
