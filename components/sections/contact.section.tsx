'use client'

import { SiGmail } from 'react-icons/si'
import Link from 'next/link'
import { FaGithub, FaLinkedinIn, FaPhoneAlt, FaTelegramPlane } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import ContactForm from '@/components/forms/contact.form'
import { Session } from 'next-auth'

interface ContactSectionProps {
  session: Session | null
}

export default function ContactSection({ session }: ContactSectionProps) {
  return (
    <section id='contact'>
      <div className='min-h-screen flex flex-col justify-center md:items-center max-md:px-4'>
        <h2 className={'text-3xl mb-16 font-bold gradient-foreground'}>
          <span className={'max-md:hidden'}>Contact me</span>

          <div className={'md:hidden flex justify-center'}>
            <span className={'gradient-foreground text-center'}>Contact me</span>
          </div>
        </h2>

        <div className={'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-48 lg:gap-64'}>
          <ContactForm session={session} />

          <div className='flex flex-col gap-y-4 md:text-xl w-full'>
            <Link
              href={'https://t.me/tulaganovok'}
              target='_blank'
              className='flex items-center gap-2 underline'
            >
              <FaTelegramPlane />
              <span>@tulaganovok</span>
            </Link>

            <Link
              href='https://www.linkedin.com/in/otabek-%D1%82ulaganov-143106294/'
              target='_blank'
              className='flex items-center gap-2 underline'
            >
              <FaLinkedinIn />
              <span>@otabektulaganov</span>
            </Link>

            <Link
              href={'https://github.com/MrTolaganov'}
              target='_blank'
              className='flex items-center gap-2 underline'
            >
              <FaGithub />
              <span>@MrTolaganov</span>
            </Link>

            <Link
              href={
                'https://www.google.com/maps/place/Tashkent,+Uzbekistan/@41.2824799,69.1145579,11z/data=!3m1!4b1!4m6!3m5!1s0x38ae8b0cc379e9c3:0xa5a9323b4aa5cb98!8m2!3d41.2994958!4d69.2400734!16zL20vMGZzbXk?entry=ttu'
              }
              target='_blank'
              className='flex items-center gap-2 underline'
            >
              <FaLocationDot />
              <span>Tashkent, Uzbekistan</span>
            </Link>

            <span className='flex items-center gap-2'>
              <SiGmail />
              tulaganovok04@gmail.com
            </span>

            <span className='flex items-center gap-2'>
              <FaPhoneAlt />
              +998 (94) 368 62 65
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
