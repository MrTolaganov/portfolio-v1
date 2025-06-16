"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IProject } from "@/types";
import { getFeaturedProjects } from "@/actions/project.action";
import SkeletonProjectCard from "@/components/cards/skeleton-project.card";
import FeaturedProjectCard from "@/components/cards/featured-project.card";

export default function ProjectsSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<IProject[]>([]);

  const getAllFeaturedProjects = async () => {
    const featuredProjects = await getFeaturedProjects();
    setProjects(featuredProjects);
  };

  useEffect(() => {
    getAllFeaturedProjects().finally(() => setIsLoading(false));
  }, []);

  return (
    <section id={"projects"}>
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-32">
        <h2
          className={"text-3xl mb-16 font-bold gradient-foreground text-center"}
        >
          Projects
        </h2>
        
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          }
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProjectCard key={index} />
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <FeaturedProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        <div className={"mx-auto my-16"}>
          <Button asChild aria-label={"See all projects"}>
            <Link href={"/projects"}>See all projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
