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
              <FormLabel className={'mb-2'}>Email address</FormLabel>
              <FormControl>
                <Input type={'email'} {...field} disabled={isLoading} />
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
              <FormLabel className={'mb-2'}>Password</FormLabel>
              <div className={'flex items-center'}>
                <FormControl>
                  <Input
                    type={isVisiblePassword ? 'text' : 'password'}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <Button
                  type={'button'}
                  size={'icon'}
                  variant={'outline'}
                  className={'size-12 bg-secondary'}
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

        <div className={'text-sm space-x-2'}>
          <span className={'text-muted-foreground'}>Don&apos;t have an account?</span>
          <Link href={'/sign-up'} className={'underline'}>
            Sign up
          </Link>
          <div>
            <Link href={'/forgot-password'} className={'underline'}>
              Forgot password?
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
