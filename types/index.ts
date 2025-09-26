import { MouseEvent, ReactNode } from 'react'
import { Schema } from 'mongoose'

export interface ChildProps {
  children: ReactNode
}

export type SearchParams = { [key: string]: string | string[] | undefined }

export type Event = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>

export interface IUser {
  _id: string
  fullName: string
  email: string
  isAdmin: boolean
}

export interface IResponse {
  status: number
  message: string
}

export interface IOtp {
  _id: string
  email: string
  otp: string
  expiredAt: Date
}

export interface IProject {
  _id: string
  name: string
  techs: string
  demoUrl: string
  githubUrl: string
  imageUrl: string
  imageKey: string
  createdAt: Date
  stars: Array<Schema.Types.ObjectId>
  views: Array<Schema.Types.ObjectId>
}

export interface QueryParams {
  params: string
  key: string
  value?: string | null
}

export interface SearchParamsValues {
  page: number
  pageSize: number
  query?: string
  filter?: string
}
