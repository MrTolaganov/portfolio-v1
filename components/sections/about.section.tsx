'use client'

import { Session } from 'next-auth'

interface AboutSectionProps {
  session: Session | null
}

export default function AboutSection({ session }: AboutSectionProps) {
  return (
    <section id={'about'}>
      <div className='h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32'>
        <h2 className={'text-3xl mb-16 font-bold gradient-foreground'}>About me</h2>

        <p className='md:leading-10 text-xl md:text-3xl'>
          Hi {session?.currentUser?.fullName ?? session?.user?.name}, I&apos;m nice to meet you. As
          I introduce myself for you, so my fullname is Otabek Tulaganov. I was born on March 24,
          2004. I&apos;m from Uzbekistan. I have benn studying in Tashkent University of Information
          Technologies since 2022. I have over a year web development experience. I&apos;m
          interested in building and deploying large scalable, optimizing performance both frontend
          and backend that is full stack web applications.
        </p>
      </div>
    </section>
  )
}
