'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { techs } from '@/constants'

export default function TechsSection() {
  return (
    <section id={'techs'}>
      <div className='h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32'>
        <h2 className={'text-3xl mb-16 font-bold gradient-foreground'}>Technologies</h2>
        
        <Carousel
          opts={{ align: 'center', loop: true }}
          plugins={[Autoplay({ delay: 2000 })]}
          className={'w-full container'}
        >
          <CarouselContent>
            {techs.map(tech => (
              <CarouselItem key={tech.image} className={`sm:basis-1/2 md:basis-1/3 lg:basis-1/4`}>
                <div className='p-1'>
                  <Card className={'bg-background rounded-0 border-0'}>
                    <CardContent className='bg-background flex aspect-square items-center justify-center p-6 relative border-0'>
                      <Image src={tech.image} alt={tech.label} fill className={'object-cover'} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
