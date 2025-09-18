'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { emailSchema, forgotPasswordSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { getUserByEmail, updatePassword } from '@/actions/auth.action'
import { sendOtp } from '@/actions/mail.action'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Eye, EyeOff, Loader } from 'lucide-react'
import OtpForm from '@/components/forms/otp.form'
import { useRouter } from 'next/navigation'

export default function ForgotPassPage() {
  const [step, setStep] = useState<'first' | 'second' | 'final'>('first')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const router = useRouter()

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  const onSendEmail = async (values: z.infer<typeof emailSchema>) => {
    setIsLoading(true)

    const user = await getUserByEmail(values.email.trim())

    if (user) {
      await sendOtp(values.email.trim())
      setStep('second')
      toast.success('Verification code sent to your email')
    } else {
      toast.error('You have not signed up yet, Please sign up first')
    }

    setIsLoading(false)
  }

  const onUpdatePassword = async ({ confirmPassword }: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true)

    const { status, message } = await updatePassword(
      emailForm.watch('email').trim(),
      confirmPassword.trim()
    )

    if (status === 200) {
      router.push('/sign-in')

      toast.success(message)
    } else {
      toast.error(message)
    }

    setIsLoading(false)
  }

  return (
    <>
      {step === 'first' && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onSendEmail)} className='space-y-3'>
            <FormField
              control={emailForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
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

            <Button type='submit' className={'w-full'} disabled={isLoading} aria-label='Send email'>
              {isLoading ? (
                <>
                  <Loader className={'animate-spin'} />
                  <span>Loading...</span>
                </>
              ) : (
                'Send email'
              )}
            </Button>
          </form>
        </Form>
      )}

      {step === 'second' && (
        <OtpForm email={emailForm.watch('email').trim()} isForgotPassword setStep={setStep} />
      )}

      {step === 'final' && (
        <Form {...forgotPasswordForm}>
          <form
            onSubmit={forgotPasswordForm.handleSubmit(onUpdatePassword)}
            className={'space-y-3'}
          >
            <FormField
              control={forgotPasswordForm.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <div className={'flex items-center'}>
                    <FormControl>
                      <Input
                        type={isVisiblePassword ? 'text' : 'password'}
                        {...field}
                        disabled={isLoading}
                        className='rounded-r-none'
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

            <FormField
              control={forgotPasswordForm.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <div className={'flex items-center'}>
                    <FormControl>
                      <Input
                        type={isVisiblePassword ? 'text' : 'password'}
                        {...field}
                        disabled={isLoading}
                        className='rounded-r-none'
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

            <Button type='submit' className={'w-full'} disabled={isLoading} aria-label={'Submit'}>
              {isLoading ? (
                <>
                  <Loader className={'animate-spin'} />
                  <span>Loading...</span>
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
      )}

      <div className={'space-x-2'}>
        <span>Don&apos;t have an account?</span>
        <Link href={'/sign-up'} className={'underline text-primary'}>
          Sign up
        </Link>
      </div>
    </>
  )
}
