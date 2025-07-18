'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

export default function SeeAllProjects() {
  return (
    <Button asChild aria-label={'See all projects'}>
      <Link href={'/projects'}>See all projects</Link>
    </Button>
  )
}
