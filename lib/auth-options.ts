import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { createUser, getUserByEmail } from '@/actions/auth.action'
import { IUser } from '@/types'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: { email: { label: 'Email', type: 'email' } },

      async authorize(credentials) {
        const user = await getUserByEmail(credentials?.email)
        return JSON.parse(JSON.stringify(user))
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }) {
      let user: IUser | null

      user = (await getUserByEmail(session.user.email!)) as IUser

      if (!user) {
        user = await createUser(session.user.name!, session.user.email!)
      }

      session.currentUser = user

      return session
    },
  },

  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}
