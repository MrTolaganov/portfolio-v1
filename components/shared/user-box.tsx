import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { IUser } from '@/types'
import { UserRound } from 'lucide-react'

interface UserBoxProps {
  currentUser?: IUser
}

export default function UserBox({ currentUser }: UserBoxProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar role='button'>
          <AvatarFallback aria-label='Avatar' className='cursor-pointer text-xl font-semibold '>
            <UserRound className='fill-background text-background' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='rounded-2xl'>
        <DropdownMenuItem className={'flex flex-col gap-y-1 items-start'}>
          <p className={'gradient-foreground text-lg'}>{currentUser?.fullName}</p>
          <p className={'text-muted-foreground text-base'}>{currentUser?.email}</p>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button
            size={'sm'}
            className='w-full bg-transparent border-red-500 text-red-500 hover:text-red-500 hover:bg-transparent'
            aria-label={'Sign out'}
            onClick={() => signOut({ callbackUrl: '/sign-in' })}
          >
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
