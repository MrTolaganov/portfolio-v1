'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signInSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { signIn } from '@/actions/auth.action'
import { useState } from 'react'
import { signIn as signInWithCredentials } from 'next-auth/react'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader } from 'lucide-react'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async ({ email, password }: z.infer<typeof signInSchema>) => {
    setIsLoading(true)

    const { status, message } = await signIn(email.trim(), password.trim())

    if (status === 200) {
      await signInWithCredentials('credentials', {
        email: email.trim(),
        password: password.trim(),
        callbackUrl: '/',
      })

      toast.success(message)
    } else {
      toast.error(message)
    }

    setIsLoading(false)
  }

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={signInForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type={'email'}
                  {...field}
                  disabled={isLoading}
                  placeholder='Enter your email address'
                  autoComplete='email'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signInForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className={'flex items-center'}>
                <FormControl>
                  <Input
                    type={isVisiblePassword ? 'text' : 'password'}
                    {...field}
                    disabled={isLoading}
                    className='rounded-r-none'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                  />
                </FormControl>
                <Button
                  type={'button'}
                  size={'icon'}
                  variant={'secondary'}
                  className={
                    'bg-secondary size-11 text-foreground border border-input rounded-l-none dark:bg-input/30'
                  }
                  aria-label={'Toggle password'}
                  onClick={() => setIsVisiblePassword(prev => !prev)}
                >
                  {isVisiblePassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className={'w-full'} disabled={isLoading} aria-label={'Sign in'}>
          {isLoading ? (
            <>
              <Loader className={'animate-spin'} />
              <span>Loading...</span>
            </>
          ) : (
            'Sign in'
          )}
        </Button>

        <div className={'space-x-2'}>
          <span>Don&apos;t have an account?</span>
          <Link href={'/sign-up'} className={'underline text-primary'}>
            Sign up
          </Link>
          <div>
            <Link href={'/forgot-password'} className={'underline text-primary'}>
              Forgot password?
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
