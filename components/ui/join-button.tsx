'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'
import { LogIn } from 'lucide-react'

export default function JoinButton() {
  const router = useRouter()

  return (
    <>
      <Button type='button' className='max-md:hidden' onClick={() => router.push('/sign-in')}>
        Join now
      </Button>
      <Button
        size={'icon'}
        variant={'ghost'}
        className='md:hidden p-1'
        asChild
        onClick={() => router.push('/sign-in')}
      >
        <LogIn />
      </Button>
    </>
  )
}
