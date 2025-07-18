import { getFeaturedProjects } from '@/actions/project.action'
import FeaturedProjectCard from '@/components/cards/featured-project.card'
import SeeAllProjects from '../shared/see-all-projects'

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects()

  return (
    <section id={'projects'}>
      <div className='min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-32'>
        <h2 className={'text-3xl mb-16 font-bold gradient-foreground text-center'}>Projects</h2>

        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
          {projects.length > 0 ? (
            projects.map(project => <FeaturedProjectCard key={project._id} project={project} />)
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        <div className={'mx-auto my-16'}>
          <SeeAllProjects />
        </div>
      </div>
    </section>
  )
}
