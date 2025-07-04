'use client'
import { IProject } from '@/types'
import DetailedProjectCard from '@/components/cards/detailed-project.card'
import { useState } from 'react'
import EditProjectForm from '@/components/forms/edit-project.form'
import DeleteProjectForm from '@/components/forms/delete-project.form'

interface ProjectListProps {
  projects: IProject[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [editedProject, setEditedProject] = useState<IProject | null>(null)
  const [deletedProject, setDeletedProject] = useState<IProject | null>(null)

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8'>
      {projects.map(project => (
        <DetailedProjectCard
          key={project._id}
          project={project}
          setEditedProject={setEditedProject}
          setDeletedProject={setDeletedProject}
        />
      ))}

      {editedProject && (
        <EditProjectForm editedProject={editedProject} setEditedProject={setEditedProject} />
      )}

      {deletedProject && (
        <DeleteProjectForm deletedProject={deletedProject} setDeletedProject={setDeletedProject} />
      )}
    </div>
  )
}
