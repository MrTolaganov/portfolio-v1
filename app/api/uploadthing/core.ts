import { getServerSession } from 'next-auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { nextAuthOptions } from '@/lib/auth-options'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await getServerSession(nextAuthOptions)
      if (!session) throw new UploadThingError('Unauthorized')
      return { session }
    })
    .onUploadComplete(async ({ file }) => ({ ...file })),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
