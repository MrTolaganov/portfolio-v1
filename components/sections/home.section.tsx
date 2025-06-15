'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Download, Github } from 'lucide-react'
import { Session } from 'next-auth'

interface HomeSectionProps {
  session: Session | null
}

export default function HomeSection({ session }: HomeSectionProps) {
  return (
    <section id={''}>
      <div className='h-[90vh] flex flex-col md:flex-row-reverse justify-center items-center md:gap-x-32 gap-y-4'>
        <div className='bg-primary rounded-full'>
          <Image
            src={'/avatar.jpg'}
            alt='my-image'
            width={350}
            height={350}
            className='rounded-full p-1'
          />
        </div>
        <div className='flex flex-col gap-y-2 md:gap-y-4 items-center md:items-start'>
          <p className='text-4xl md:text-6xl font-semibold capitalize'>
            Hi👋 {(session?.currentUser?.fullName ?? session?.user?.name)?.split(' ').at(0)},
          </p>
          <div className='flex flex-col text-5xl md:text-7xl font-bold '>
            <p>
              I&apos;m <span className={'gradient-foreground'}>Otabek</span>
            </p>
            <h1 className={'gradient-foreground'}>Tulaganov</h1>
          </div>
          <p className='font-normal text-3xl md:text-5xl text-muted-foreground'>Web Developer</p>
          <div className={'flex items-center gap-x-4 mt-4'}>
            <Button asChild aria-label={'Download resume'}>
              <Link href='/O. Tulaganov Web Developer resume.pdf (1).pdf' target={'_blank'}>
                <Download />
                Download resume
              </Link>
            </Button>
            <Button asChild variant={'secondary'} aria-label={'Github profile'}>
              <Link href={'https://github.com/MrTolaganov'} target={'_blank'}>
                <Github />
                Github profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
