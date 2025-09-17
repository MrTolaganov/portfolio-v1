import Link from 'next/link'
import { Button } from './button'
import { LogIn } from 'lucide-react'

export default function JoinButton() {
  return (
    <Link href={'/sign-in'}>
      <Button type='button' className='max-md:hidden'>
        Join now
      </Button>
      <LogIn className='md:hidden' />
    </Link>
  )
}
