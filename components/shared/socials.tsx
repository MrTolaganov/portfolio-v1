import { SiGmail } from 'react-icons/si'
import Link from 'next/link'
import { FaGithub, FaLinkedinIn, FaPhoneAlt, FaTelegramPlane } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

export default function Socials() {
  return (
    <div className='flex justify-between md:flex-col flex-row md:text-xl w-full gap-2 max-md:h-10'>
      <Link
        href={'https://t.me/tulaganovok'}
        target='_blank'
        className=' bg-secondary rounded-2xl px-4 flex items-center gap-2 flex-1 max-md:justify-center'
      >
        <FaTelegramPlane />
        <span className='max-md:hidden'>@tulaganovok</span>
      </Link>

      <Link
        href='https://www.linkedin.com/in/otabek-%D1%82ulaganov-143106294/'
        target='_blank'
        className='  bg-secondary rounded-2xl px-4 flex items-center gap-2 flex-1 max-md:justify-center'
      >
        <FaLinkedinIn />
        <span className='max-md:hidden'>@otabektulaganov</span>
      </Link>

      <Link
        href={'https://github.com/MrTolaganov'}
        target='_blank'
        className='  bg-secondary rounded-2xl px-4 flex items-center gap-2 flex-1 max-md:justify-center'
      >
        <FaGithub />
        <span className='max-md:hidden'>@MrTolaganov</span>
      </Link>

      <Link
        href={
          'https://www.google.com/maps/place/Tashkent,+Uzbekistan/@41.2824799,69.1145579,11z/data=!3m1!4b1!4m6!3m5!1s0x38ae8b0cc379e9c3:0xa5a9323b4aa5cb98!8m2!3d41.2994958!4d69.2400734!16zL20vMGZzbXk?entry=ttu'
        }
        target='_blank'
        className='   bg-secondary rounded-2xl px-4 flex items-center gap-2 flex-1 max-md:justify-center'
      >
        <FaLocationDot />
        <span className='max-md:hidden'>Tashkent, Uzbekistan</span>
      </Link>

      <span className=' bg-secondary rounded-2xl px-4 flex items-center gap-2 flex-1 max-md:justify-center '>
        <SiGmail />
        <span className='max-md:hidden'>tulaganovok04@gmail.com</span>
      </span>

      <div className=' bg-secondary rounded-2xl px-4 flex items-center gap-2 flex-1 max-md:justify-center'>
        <FaPhoneAlt />
        <span className='max-md:hidden'>+998 (94) 368 62 65</span>
      </div>
    </div>
  )
}
