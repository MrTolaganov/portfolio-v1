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
      className='cursor-pointer hover:border hover:border-primary rounded-2xl'
    >
      <Card className={'shadow-lg bg-secondary'}>
        <CardContent>
          <div className={'h-48 w-full relative'}>
            {session?.currentUser?.isAdmin && (setEditedProject || setDeletedProject) && (
              <span className={'absolute top-0 right-0 z-30 flex items-center'}>
                <Button size={'icon'} variant={'ghost'} onClick={onEditProject} aria-label={'Edit'}>
                  <Edit2 className='text-primary' />
                </Button>

                <Button
                  size={'icon'}
                  variant={'ghost'}
                  onClick={onDeleteProject}
                  aria-label={'Delete'}
                >
                  <Trash2 className={'text-red-500'} />
                </Button>
              </span>
            )}
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className={'object-cover rounded-t-2xl'}
            />
          </div>

          <div className='p-2 flex flex-col h-40'>
            <CardTitle className={'text-lg font-bold m-1'}>{project.name}</CardTitle>

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

            {/* <div className={'grid grid-cols-2 gap-3 mt-2 p-1'}> */}
            {/* <Button size={'sm'} aria-label={'View'} asChild className='text-sm'>
              <Link href={project.demoUrl} target='_blank'>
                <Eye />
                Visit now
              </Link>
            </Button> */}
            <Button
              size={'sm'}
              className='text-sm'
              aria-label={'Source code'}
              onClick={onVisitProjectGithub}
            >
              {/* <Link href={project.githubUrl} target={'_blank'}> */}
              <Github />
              Source code
              {/* </Link> */}
            </Button>
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
