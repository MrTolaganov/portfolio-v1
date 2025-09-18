'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { projectSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import { useState } from 'react'
import { deleteFile } from '@/actions/file.action'
import { toast } from 'sonner'
import { editProject } from '@/actions/project.action'
import { IProject } from '@/types'

interface ProjectFormProps {
  editedProject: IProject
  setEditedProject: (project: IProject | null) => void
}

export default function EditProjectForm({ editedProject, setEditedProject }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { _id, name, techs, demoUrl, githubUrl, imageKey, imageUrl } = editedProject

  const editProjectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name, demoUrl, githubUrl, imageKey, imageUrl, techs },
  })

  const onRemoveImage = () => {
    setIsLoading(true)

    deleteFile(editProjectForm.getValues('imageKey'))
      .then(() => {
        editProjectForm.setValue('imageUrl', '')
        editProjectForm.setValue('imageKey', '')
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    setIsLoading(true)

    if (editedProject && setEditedProject) {
      const { status, message } = await editProject(_id, values)

      if (status === 200) {
        toast.success(message)
        setEditedProject(null)
        editProjectForm.reset()
      } else {
        toast.error(message)
      }
    }

    setIsLoading(false)
  }

  const onOpenChange = () => {
    setEditedProject(null)
    editProjectForm.reset()
  }

  return (
    <Dialog open={!!editedProject} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className={'gradient-foreground inline text-xl'}>Edit project</DialogTitle>
        <DialogDescription />

        <Form {...editProjectForm}>
          <form onSubmit={editProjectForm.handleSubmit(onSubmit)} className={'space-y-3 mt-4'}>
            <FormField
              control={editProjectForm.control}
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
              control={editProjectForm.control}
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
              control={editProjectForm.control}
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
              control={editProjectForm.control}
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

            {editProjectForm.watch('imageUrl') ? (
              <div className='relative w-full h-[200px] bg-secondary flex justify-center items-center'>
                <Button
                  type='button'
                  size={'icon'}
                  variant={'secondary'}
                  className='absolute top-0 right-0 z-20'
                  disabled={isLoading}
                  onClick={onRemoveImage}
                  aria-label={'Remove image'}
                >
                  <X />
                </Button>

                <Image
                  src={editProjectForm.watch('imageUrl')}
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
                  editProjectForm.setValue('imageUrl', res[0].ufsUrl)
                  editProjectForm.setValue('imageKey', res[0].key)
                }}
              />
            )}

            <Button type={'submit'} className={'w-full'} disabled={isLoading} aria-label={'Submit'}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
