import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { navItems } from '@/constants'
import Link from 'next/link'

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild className='cursor-pointer md:hidden'>
        <Menu role='button' />
      </SheetTrigger>

      <SheetContent side='top'>
        <SheetTitle />
        <SheetDescription />

        <div className={'h-full flex flex-col justify-center'}>
          {navItems.map(navItem => (
            <SheetClose key={navItem.name} asChild>
              <Link
                id={'navItem'}
                href={navItem.path}
                className={'text-center text-xl py-4 hover:text-primary font-semibold'}
              >
                {navItem.name}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
