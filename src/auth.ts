import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  role: "USER" | "ADMIN"
  id: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

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
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const result = await response.json()

          if (!response.ok || !result.status) {
            return null
          }

          const { user, accessToken } = result.data

          return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: user.profileImage || null,
            role: user.role,
            accessToken: accessToken,
            refreshToken: user.refreshToken,
          }
        } catch (error) {
          console.error("Login error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = String(token.id)
        if (token.role === "USER" || token.role === "ADMIN") {
          session.user.role = token.role
        }
      }
      return session
    },
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
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})
