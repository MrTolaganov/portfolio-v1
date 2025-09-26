'use server'

import { IProject, IResponse, SearchParamsValues } from '@/types'
import connectDatabase from '@/lib/mongoose'
import ProjectModel from '@/models/project.model'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

export async function addProject(project: Partial<IProject>): Promise<IResponse> {
  try {
    await connectDatabase()
    await ProjectModel.create(project)
    revalidatePath('/projects', 'page')
    return { status: 200, message: 'Project added successfully.' }
  } catch {
    return { status: 500, message: 'Something went wrong' }
  }
}

export async function getProjects({
  page,
  pageSize,
  query,
  filter,
}: SearchParamsValues): Promise<{ projects: IProject[]; isNext: boolean }> {
  try {
    await connectDatabase()

    const skip = (page - 1) * pageSize
    const searchFilter: any = {}
    let sort: any = { createdAt: -1 }

    if (query) {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      searchFilter.name = { $regex: escapedQuery, $options: 'i' }
    }

    switch (filter) {
      case 'most-starred':
        sort = { starsCount: -1 }
        break
      case 'most-viewed':
        sort = { viewsCount: -1 }
        break
    }

    // Aggregation pipeline to support sorting by array length (stars/views)
    const pipeline = [
      { $match: searchFilter },
      { $addFields: { starsCount: { $size: '$stars' }, viewsCount: { $size: '$views' } } },
      { $sort: sort },
      { $skip: skip },
      { $limit: pageSize },
    ]

    const projects = await ProjectModel.aggregate(pipeline)

    // Count total matching documents (without pagination)
    const totalProjects = await ProjectModel.countDocuments(searchFilter)
    const isNext = totalProjects > projects.length + skip

    return { projects: JSON.parse(JSON.stringify(projects)), isNext }
  } catch {
    return { projects: [], isNext: false }
  }
}

export const getFeaturedProjects = cache(async (): Promise<IProject[]> => {
  try {
    await connectDatabase()

    const projects = await ProjectModel.find().sort({ createdAt: -1 }).limit(6)

    return JSON.parse(JSON.stringify(projects))
  } catch {
    return []
  }
})

export async function editProject(
  projectId: string,
  project: Partial<IProject>
): Promise<IResponse> {
  try {
    await connectDatabase()
    await ProjectModel.findByIdAndUpdate(projectId, project)

    revalidatePath('/projects', 'page')

    return { status: 200, message: 'Project edited successfully.' }
  } catch {
    return { status: 500, message: 'Something went wrong' }
  }
}

export async function deleteProject(projectId: string): Promise<IResponse> {
  try {
    await connectDatabase()
    await ProjectModel.findByIdAndDelete(projectId)

    revalidatePath('/projects', 'page')

    return { status: 200, message: 'Project deleted successfully.' }
  } catch {
    return { status: 500, message: 'Something went wrong' }
  }
}
