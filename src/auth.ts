import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  role: "USER" | "ADMIN"
  id: string
  accessToken?: string
  refreshToken?: string
}

// Extend the default session
declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

// Extend the default user
declare module "next-auth" {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: "USER" | "ADMIN"
    accessToken?: string
    refreshToken?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          )

          const result = await response.json()

          if (!response.ok || !result.status) {
            return null
          }

          const { user, accessToken, refreshToken } = result.data

          return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: user.profileImage || null,
            role: user.role,
            accessToken,
            refreshToken,
          }
        } catch (error) {
          console.error("Login error:", error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = String(token.id)
        session.user.role = token.role as "USER" | "ADMIN"
        session.user.accessToken = token.accessToken as string
        session.user.refreshToken = token.refreshToken as string
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
})
