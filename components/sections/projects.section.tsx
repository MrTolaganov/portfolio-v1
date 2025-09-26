import { getFeaturedProjects } from '@/actions/project.action'
import DetailedProjectCard from '../cards/detailed-project.card'
import { Button } from '../ui/button'
import Link from 'next/link'

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects()

  return (
    <section id={'projects'}>
      <div className='min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-32'>
        <h2 className={'text-3xl mb-16 font-bold text-primary text-center'}>Projects</h2>

        <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'}>
          {projects.length > 0 ? (
            projects.map(project => <DetailedProjectCard key={project._id} project={project} />)
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        <div className={'mx-auto my-16'}>
          <Button asChild aria-label={'See all projects'}>
            <Link href={'/projects'}>See all projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
