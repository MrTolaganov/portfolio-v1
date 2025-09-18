'use client'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { projectSchema } from '@/lib/validations'
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
import { UploadDropzone } from '@/lib/uploadthing'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { deleteFile } from '@/actions/file.action'
import { addProject } from '@/actions/project.action'

export default function AddProjectForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const addProjectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: '', imageUrl: '', techs: '', demoUrl: '', githubUrl: '' },
  })

  const onRemoveImage = () => {
    setIsLoading(true)

    deleteFile(addProjectForm.getValues('imageKey'))
      .then(() => {
        addProjectForm.setValue('imageUrl', '')
        addProjectForm.setValue('imageKey', '')
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    setIsLoading(true)

    if (!values.imageUrl || !values.imageKey) return
    const { status, message } = await addProject(values)

    if (status === 200) {
      toast.success(message)
      setOpen(false)
      addProjectForm.reset()
    } else {
      toast.error(message)
    }

    setIsLoading(false)
  }

  const onOpenChange = () => {
    setOpen(false)
    addProjectForm.reset()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} aria-label='Add project'>
        Add project
      </Button>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle className={'gradient-foreground inline text-xl'}>Add project</DialogTitle>
          <DialogDescription />

          <Form {...addProjectForm}>
            <form onSubmit={addProjectForm.handleSubmit(onSubmit)} className={'space-y-3 mt-4'}>
              <FormField
                control={addProjectForm.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addProjectForm.control}
                name='techs'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addProjectForm.control}
                name='demoUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo URL</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addProjectForm.control}
                name='githubUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github URL</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {addProjectForm.watch('imageUrl') ? (
                <div className='relative w-full h-[200px] bg-secondary flex justify-center items-center'>
                  <Button
                    type='button'
                    size={'icon'}
                    variant={'secondary'}
                    className='absolute top-0 right-0 z-20'
                    disabled={isLoading}
                    onClick={onRemoveImage}
                    aria-label='Remove image'
                  >
                    <X />
                  </Button>

                  <Image
                    src={addProjectForm.watch('imageUrl')}
                    alt='Product image'
                    fill
                    className='object-cover'
                  />
                </div>
              ) : (
                <UploadDropzone
                  endpoint={'imageUploader'}
                  config={{ appendOnPaste: true, mode: 'auto' }}
                  appearance={{ container: { height: 200, padding: 10 } }}
                  onClientUploadComplete={res => {
                    addProjectForm.setValue('imageUrl', res[0].ufsUrl)
                    addProjectForm.setValue('imageKey', res[0].key)
                  }}
                />
              )}

              <Button
                type={'submit'}
                className={'w-full'}
                disabled={isLoading}
                aria-label={'Submit'}
              >
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
