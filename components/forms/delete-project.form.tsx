'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { deleteProject } from '@/actions/project.action'
import { toast } from 'sonner'
import { IProject } from '@/types'

interface DeleteProjectFormProps {
  deletedProject: IProject
  setDeletedProject: (deletedProject: IProject | null) => void
}

export default function DeleteProjectForm({
  deletedProject,
  setDeletedProject,
}: DeleteProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onDeleteProject = async () => {
    setIsLoading(true)

    const { status, message } = await deleteProject(deletedProject._id)

    if (status === 200) {
      toast.success(message)
    } else {
      toast.error(message)
    }

    setIsLoading(false)
    setDeletedProject(null)
  }

  return (
    <AlertDialog open={!!deleteProject} onOpenChange={() => setDeletedProject(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to want to delete this {deletedProject.name} project?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your project and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            onClick={() => setDeletedProject(null)}
            aria-label={'Cancel'}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onDeleteProject} aria-label={'Continue'}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
