'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { otpSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Button } from '../ui/button'
import { useState } from 'react'
import { sendOtp, verifyOtp } from '@/actions/mail.action'
import { toast } from 'sonner'
import { signIn as signInWithCredentials } from 'next-auth/react'
import { signUp } from '@/actions/auth.action'

interface OtpFormProps {
  fullName?: string
  email: string
  password?: string
  setIsVerifying?: (isVerifying: boolean) => void
  isForgotPassword?: boolean
  setStep?: (step: 'first' | 'second' | 'final') => void
}

export default function OtpForm({
  fullName,
  email,
  password,
  isForgotPassword,
  setStep,
  setIsVerifying,
}: OtpFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  const onResend = async (email: string) => {
    try {
      setIsLoading(true)

      await sendOtp(email)

      toast.success('Verification code resent to your email')
      otpForm.reset({ otp: '' })
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const onVerifyOtp = async ({ otp }: z.infer<typeof otpSchema>) => {
    setIsLoading(true)

    const { status, message } = await verifyOtp(email, otp)

    if (status === 200) {
      if (isForgotPassword && setStep) {
        setStep('final')
      } else {
        await signUp(fullName!, email, password!)
        toast.success(message)

        await signInWithCredentials('credentials', {
          email,
          password,
          callbackUrl: '/',
        })
      }
    } else {
      toast.error(message)
    }

    setIsLoading(false)
  }

  return (
    <Form {...otpForm}>
      <form onSubmit={otpForm.handleSubmit(onVerifyOtp)} className='space-y-3'>
        <FormItem className={'space-y-0'}>
          <FormLabel className={'mb-2'}>Email address</FormLabel>
          <FormControl>
            <Input type='email' value={email} disabled />
          </FormControl>
          <FormMessage className={'text-sm'} />
        </FormItem>

        <FormField
          control={otpForm.control}
          name='otp'
          render={({ field }) => (
            <FormItem className={'space-y-0'}>
              <FormLabel className={'mb-2'}>Verification code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  {...field}
                  className='w-full'
                  disabled={isLoading}
                >
                  <InputOTPGroup className='w-full space-x-2'>
                    <InputOTPSlot index={0} className='w-full h-12 bg-secondary text-lg' />
                    <InputOTPSlot index={1} className='w-full h-12 bg-secondary text-lg' />
                    <InputOTPSlot index={2} className='w-full h-12 bg-secondary text-lg' />
                    <InputOTPSlot index={3} className='w-full h-12 bg-secondary text-lg' />
                    <InputOTPSlot index={4} className='w-full h-12 bg-secondary text-lg' />
                    <InputOTPSlot index={5} className='w-full h-12 bg-secondary text-lg' />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className={'text-xs'} />
            </FormItem>
          )}
        />

        <div className={'grid grid-cols-3 gap-x-4'}>
          <Button type='submit' disabled={isLoading} aria-label={'Verify'}>
            Verify
          </Button>

          <Button
            type='button'
            variant={'secondary'}
            disabled={isLoading}
            aria-label={'Resend'}
            onClick={() => onResend(email)}
          >
            Resend
          </Button>

          {setStep && (
            <Button
              type='button'
              variant={'outline'}
              disabled={isLoading}
              aria-label={'Back'}
              onClick={() => setStep('first')}
            >
              Back
            </Button>
          )}

          {setIsVerifying && (
            <Button
              type='button'
              variant={'outline'}
              disabled={isLoading}
              aria-label={'Back'}
              onClick={() => setIsVerifying(false)}
            >
              Back
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
