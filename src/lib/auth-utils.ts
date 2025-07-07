import { auth } from "@/auth"
import { redirect } from "next/navigation"
import type { ExtendedUser } from "@/auth"

export async function getCurrentUser(): Promise<ExtendedUser | undefined> {
  const session = await auth()
  return session?.user
}

export async function requireAuth(): Promise<ExtendedUser> {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  return session.user
}

// Client-side hook for getting session
export { useSession } from "next-auth/react"
