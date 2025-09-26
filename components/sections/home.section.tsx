import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Download, Github } from 'lucide-react'

export default function HomeSection() {
  return (
    <section className='min-h-screen max-sm:mt-8 flex flex-col md:flex-row-reverse justify-center items-center md:gap-x-32 gap-y-8'>
      <Image
        src={'/avatar.jpg'}
        alt='my-image'
        width={300}
        height={300}
        priority
        className='rounded-full border-4 border-primary'
      />

      <div className='flex flex-col gap-y-2 md:gap-y-4 items-center md:items-start'>
        <div className='flex flex-col text-4xl md:text-5xl font-bold '>
          <p className='text-muted-foreground max-md:text-center mb-1'>Hello👋, I&apos;m</p>
          <p className='mt-2 text-5xl md:text-6xl font-bold text-primary max-md:text-center'>
            Otabek
          </p>
          <p className='text-5xl md:text-6xl font-bold text-primary max-md:text-center'>
            Tulaganov.
          </p>
        </div>

        <p className='font-semibold text-3xl md:text-5xl text-muted-foreground'>Web Developer</p>

        <div className={'flex items-center gap-x-4 mt-4'}>
          <Button asChild aria-label={'Download resume'}>
            <Link
              href='https://gsebcf8sup.ufs.sh/f/SzyWteeJGb1CdYb22A1C7NJOQzeZmBu05IpYgT8HV4KlSEG2'
              target={'_blank'}
            >
              <Download />
              Download resume
            </Link>
          </Button>

          <Button
            asChild
            variant={'outline'}
            aria-label={'Github profile'}
            className='border-primary border-2 hover:bg-background'
          >
            <Link href={'https://github.com/MrTolaganov'} target={'_blank'}>
              <Github />
              Github profile
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
