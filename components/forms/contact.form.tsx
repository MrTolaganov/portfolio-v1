'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { contactFormSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader, Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Session } from 'next-auth'

interface ContactFormProps {
  session: Session | null
}

export default function ContactForm({ session }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { message: '' },
  })

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    setIsLoading(true)
    const telegramBotId = process.env.NEXT_PUBLIC_TETELGRAM_BOT_API!
    const telegramChatId = process.env.NEXT_PUBLIC_TETELGRAM_CHAT_ID!

    const promise = fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: `Name: ${session?.currentUser?.fullName}
Email: ${session?.currentUser?.email}
Message: ${values.message}`,
      }),
    })
      .then(() => contactForm.reset())
      .finally(() => setIsLoading(false))

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Message sent successfully',
      error: 'Something went wrong',
    })
  }

  return (
    <Form {...contactForm}>
      <form onSubmit={contactForm.handleSubmit(onSubmit)} className={'space-y-3'}>
        <FormItem>
          <Label className={'mb-2'}>Full name</Label>
          <FormControl>
            <Input disabled value={session?.currentUser?.fullName ?? ''} />
          </FormControl>
        </FormItem>
        <FormItem>
          <Label className={'mb-2'}>Email address</Label>
          <FormControl>
            <Input disabled value={session?.currentUser?.email ?? ''} />
          </FormControl>
        </FormItem>
        <FormField
          control={contactForm.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <Label className={'mb-2'}>Message</Label>
              <FormControl>
                <Textarea {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={'submit'} disabled={isLoading} aria-label={'Send message'}>
          {isLoading ? (
            <>
              <Loader className={'animate-spin'} />
              Loading...
            </>
          ) : (
            <>
              <Send /> Send message
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
