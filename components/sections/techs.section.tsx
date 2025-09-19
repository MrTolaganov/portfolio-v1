import Image from 'next/image'
import { techs } from '@/constants'

export default function TechsSection() {
  return (
    <section id={'techs'}>
      <div className='min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 max-md:mb-32'>
        <h2 className={'text-3xl mb-16 font-bold text-primary'}>Technologies</h2>

        <div className='w-full flex flex-wrap gap-8 md:gap-16 justify-center'>
          {techs.map(tech => (
            <Image
              key={tech.label}
              src={tech.image}
              alt={tech.label}
              width={100}
              height={100}
              className='rounded-2xl object-contain aspect-square'
            />
          ))}
        </div>
      </div>
    </section>
  )
}
