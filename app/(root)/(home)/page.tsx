import connectDatabase from "@/lib/mongoose";
import HomeSection from "@/components/sections/home.section";
import AboutSection from "@/components/sections/about.section";
import TechsSection from "@/components/sections/techs.section";
import ContactSection from "@/components/sections/contact.section";
import ProjectsSection from "@/components/sections/projects.section";

export default async function HomePage() {
  await connectDatabase();

  return (
    <main>
      <HomeSection />
      <AboutSection />
      <TechsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
