'use client'

import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

export default function Oauth() {
  return (
    <div className={'grid grid-cols-2 gap-x-3'}>
      <Button
        variant={'outline'}
        onClick={() => signIn('github', { callbackUrl: '/' })}
        aria-label={'Github'}
      >
        <FaGithub /> Github
      </Button>

      <Button
        variant={'outline'}
        onClick={() => signIn('google', { callbackUrl: '/' })}
        aria-label={'Google'}
      >
        <FaGoogle />
        Google
      </Button>
    </div>
  )
}
