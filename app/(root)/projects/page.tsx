import AddProjectForm from '@/components/forms/add-project.form'
import { getProjects } from '@/actions/project.action'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/auth-options'
import Filter from '@/components/shared/filter'
import ProjectList from '@/components/shared/project-list'
import { SearchParams } from '@/types'
import Pagination from '@/components/shared/pagination'
import { Metadata } from 'next'

interface Params {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Tulaganov | Projects',
}

export default async function ProjectsPage(params: Params) {
  const searchParams = await params.searchParams
  const session = await getServerSession(nextAuthOptions)

  const { projects, isNext } = await getProjects({
    ...searchParams,
    page: +searchParams.page! || 1,
    pageSize: 9,
  })

  return (
    <div className={'mt-20 px-4 sm:px-8 md:px-16 lg:px-32 min-h-[82vh] mb-8'}>
      <div className='flex items-center justify-between gap-4'>
        <Filter />
        {session?.currentUser?.isAdmin && <AddProjectForm />}
      </div>

      {projects.length > 0 ? (
        <>
          <ProjectList projects={projects} />
          <Pagination page={+searchParams.page! || 1} isNext={isNext} />
        </>
      ) : (
        <p className='text-center text-lg mt-32 text-muted-foreground'>No projects found.</p>
      )}
    </div>
  )
}
