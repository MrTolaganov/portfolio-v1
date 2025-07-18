'use client'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { IProject } from '@/types'
import { starProject, viewProject } from '@/actions/project.action'
import { toast } from 'sonner'
import { Eye, Github, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

interface FeaturedProjectCardProps {
  project: IProject
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  const pathname = usePathname()

  const starred = project.stars
    .map(star => star.toString())
    .includes(session?.currentUser?._id ?? '')

  const viewed = project.views
    .map(view => view.toString())
    .includes(session?.currentUser?._id ?? '')

  const onStarProject = async () => {
    if (isLoading) return

    setIsLoading(true)

    const { status, message } = await starProject(project._id, pathname)

    if (status !== 200) {
      toast.error(message)
    }

    setIsLoading(false)
  }

  const onViewProject = async () => {
    setIsLoading(true)

    const { status, message } = await viewProject(project._id, pathname)

    if (status === 200) {
      window.open(project.demoUrl, '_blank')
    } else {
      toast.error(message)
    }

    setIsLoading(false)
  }

  return (
    <Card className={'shadow-lg'}>
      <CardContent>
        <div className={'h-48 w-full relative'}>
          <Image src={project.imageUrl} alt={project.name} fill className={'object-cover'} />
        </div>

        <div className={'p-1'}>
          <div className={'flex justify-between items-center m-1'}>
            <CardTitle className={'text-lg font-bold'}>{project.name}</CardTitle>
            <p className={'text-xs text-muted-foreground'}>
              {format(project.createdAt, 'dd/MM/yyyy')}
            </p>
          </div>

          <CardDescription>
            {project.techs.split(', ').map(tech => (
              <Badge key={tech} className={'bg-secondary text-primary m-1'}>
                {tech}
              </Badge>
            ))}
          </CardDescription>

          <div className={'grid grid-cols-2 mt-2 text-sm'}>
            <div className={'flex items-center gap-x-2'}>
              <Star
                size={20}
                className={cn('cursor-pointer text-primary', starred && 'fill-primary')}
                onClick={onStarProject}
              />
              <span className={cn(starred ? 'text-primary' : 'text-muted-foreground')}>
                {project.stars.length} {project.stars.length > 1 ? 'stars' : 'star'}
              </span>
            </div>

            <div className={'flex items-center gap-x-2'}>
              <Eye className={cn(viewed ? 'text-primary' : 'text-muted-foreground')} />
              <span className={cn(viewed ? 'text-primary' : 'text-muted-foreground')}>
                {project.views.length} {project.views.length > 1 ? 'views' : 'view'}
              </span>
            </div>
          </div>

          <div className={'grid grid-cols-2 gap-2 mt-3 p-1'}>
            <Button size={'sm'} onClick={onViewProject} disabled={isLoading} aria-label={'View'}>
              <Eye /> View
            </Button>
            <Button
              size={'sm'}
              variant={'secondary'}
              asChild
              disabled={isLoading}
              className={cn(isLoading && 'text-muted-foreground')}
              aria-label={'Source code'}
            >
              <Link href={project.githubUrl} target={'_blank'}>
                <Github />
                Source code
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
