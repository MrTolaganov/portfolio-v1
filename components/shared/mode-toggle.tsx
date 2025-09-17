'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return theme === 'light' ? (
    <Moon className='cursor-pointer' onClick={() => setTheme('dark')} />
  ) : (
    <Sun className='cursor-pointer' onClick={() => setTheme('light')} />
  )
}
