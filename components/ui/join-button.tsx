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
      <LogIn
        role='button'
        className='md:hidden cursor-pointer'
        onClick={() => router.push('/sign-in')}
      />
    </>
  )
}
