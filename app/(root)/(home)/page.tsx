import HomeSection from '@/components/sections/home.section'
import AboutSection from '@/components/sections/about.section'
import TechsSection from '@/components/sections/techs.section'
import ContactSection from '@/components/sections/contact.section'
import ProjectsSection from '@/components/sections/projects.section'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/auth-options'

export default async function HomePage() {
  const session = await getServerSession(nextAuthOptions)

  return (
    <main>
      <HomeSection session={session} />
      <AboutSection session={session} />
      <TechsSection />
      <ProjectsSection />
      <ContactSection session={session} />
    </main>
  )
}
