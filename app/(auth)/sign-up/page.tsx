'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signUpSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { getUserByEmail } from '@/actions/auth.action'
import { sendOtp } from '@/actions/mail.action'
import { toast } from 'sonner'
import OtpForm from '@/components/forms/otp.form'
import { Eye, EyeOff, Loader } from 'lucide-react'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  })

  const onSubmit = async ({ email }: z.infer<typeof signUpSchema>) => {
    setIsLoading(true)

    const user = await getUserByEmail(email.trim())
    if (!user) {
      await sendOtp(email.trim())

      setIsVerifying(true)

      toast.success('Verification code sent to your email')
    } else {
      toast.error('User has already signed up, Please sign in')
    }

    setIsLoading(false)
  }

  return (
    <>
      {!isVerifying ? (
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={signUpForm.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <Label className={'mb-2'}>Full name</Label>
                  <FormControl>
                    <Input type={'text'} {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <Label className={'mb-2'}>Email address</Label>
                  <FormControl>
                    <Input type={'email'} {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <Label className={'mb-2'}>Password</Label>
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
                      className={'size-12'}
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

            <Button type='submit' className={'w-full'} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className={'animate-spin'} />
                  <span>Loading...</span>
                </>
              ) : (
                'Next'
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <OtpForm
          fullName={signUpForm.watch('fullName')}
          email={signUpForm.watch('email')}
          password={signUpForm.watch('password')}
          setIsVerifying={setIsVerifying}
        />
      )}
      
      <div className={'text-sm space-x-2'}>
        <span className={'text-muted-foreground'}>Already have an account?</span>
        <Link href={'/sign-in'} className={'underline'}>
          Sign in
        </Link>
      </div>
    </>
  )
}
