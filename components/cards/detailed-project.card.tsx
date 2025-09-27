'use client'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Event, IProject } from '@/types'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Edit2, Github, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

interface DetailedProjectCardProps {
  project: IProject
  setEditedProject?: (editedProject: IProject) => void
  setDeletedProject?: (deletedProject: IProject) => void
}

export default function DetailedProjectCard({
  project,
  setEditedProject,
  setDeletedProject,
}: DetailedProjectCardProps) {
  const { data: session } = useSession()

  const onVisitProjectDemo = () => {
    open(project.demoUrl, '_blank')
  }

  const onVisitProjectGithub = (event: Event) => {
    event.stopPropagation()
    open(project.githubUrl, '_blank')
  }

  const onEditProject = (event: Event) => {
    event.stopPropagation()
    if (!setEditedProject) return
    setEditedProject(project)
  }

  const onDeleteProject = (event: Event) => {
    event.stopPropagation()
    if (!setDeletedProject) return
    setDeletedProject(project)
  }

  return (
    <div
      role='button'
      onClick={onVisitProjectDemo}
      className='cursor-pointer hover:scale-105 rounded-2xl h-full'
    >
      <Card className={'shadow-xl h-full'}>
        <CardContent className='flex flex-col'>
          <div className={'h-48 w-full relative'}>
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className={'object-cover rounded-t-2xl'}
            />
          </div>

          <div className='p-3 flex flex-col flex-1 gap-y-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className={'text-xl font-bold'}>{project.name}</CardTitle>
              <div className='flex items-center gap-x-2'>
                <Button
                  size={'icon'}
                  variant={'outline'}
                  className='bg-card size-7 hover:bg-card'
                  aria-label={'Source code'}
                  onClick={onVisitProjectGithub}
                >
                  <Github />
                </Button>
                {session?.currentUser?.isAdmin && (setEditedProject || setDeletedProject) && (
                  <>
                    <Button
                      size={'icon'}
                      variant={'outline'}
                      className='bg-card size-7 hover:bg-card'
                      onClick={onEditProject}
                      aria-label={'Edit'}
                    >
                      <Edit2 />
                    </Button>

                    <Button
                      size={'icon'}
                      variant={'outline'}
                      className='bg-card size-7 hover:bg-card'
                      onClick={onDeleteProject}
                      aria-label={'Delete'}
                    >
                      <Trash2 />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <CardDescription className='flex-1'>
              {project.techs.split(', ').map(tech => (
                <Badge
                  key={tech}
                  className={
                    'bg-transparent border border-muted-foreground font-semibold text-muted-foreground m-1 rounded-full shadow-md'
                  }
                >
                  {tech}
                </Badge>
              ))}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
