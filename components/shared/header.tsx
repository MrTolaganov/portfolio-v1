'use client'

import Link from 'next/link'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { useSession } from 'next-auth/react'
import { navItems } from '@/constants'
import Logo from './logo'
import UserBox from './user-box'
import { Skeleton } from '../ui/skeleton'
import MobileMenu from './mobile-menu'
import JoinButton from '../ui/join-button'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className={'h-20 fixed inset-0 bg-background z-50'}>
      <div className='size-full flex justify-between items-center px-2 sm:px-4 md:px-8 lg:px-16'>
        <Logo />

        <div className={'max-md:hidden flex items-center gap-x-12'}>
          {navItems.map(navItem => (
            <Link
              key={navItem.name}
              id={'navItem'}
              href={navItem.path}
              className={'text-xl font-semibold hover:text-primary'}
            >
              {navItem.name}
            </Link>
          ))}
        </div>

        <div className={'flex items-center gap-x-6'}>
          <ModeToggle />

          {status === 'loading' && <Skeleton className='size-10 rounded-full' />}
          {status === 'authenticated' && <UserBox currentUser={session.currentUser} />}
          {status === 'unauthenticated' && <JoinButton />}

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
