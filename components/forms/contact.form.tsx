'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { contactFormSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader, Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = ({ name, email, message }: z.infer<typeof contactFormSchema>) => {
    setIsLoading(true)

    const telegramBotId = process.env.NEXT_PUBLIC_TETELGRAM_BOT_API!
    const telegramChatId = process.env.NEXT_PUBLIC_TETELGRAM_CHAT_ID!

    const promise = fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cache-control': 'no-cache' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: `Name: ${name}
Email: ${email}
Message: ${message}`,
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
        <FormField
          control={contactForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} placeholder='Enter your name' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={contactForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} placeholder='Enter your email address' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={contactForm.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={isLoading} placeholder='Type a message...' />
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
