import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes
const protectedRoutes = [
  "/account",
  "/dashboard",
  "/profile",
  "/settings",
  "/booking",
  "/order",
]

interface AuthenticatedRequest extends NextRequest {
  auth?: unknown; // Replace 'unknown' with your actual auth type if available
}

export default auth((req: AuthenticatedRequest) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/login", nextUrl.origin)
    loginUrl.searchParams.set("callback", nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from login/signup
  // if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/sign-up")) {
  //   return NextResponse.redirect(new URL("/account", nextUrl.origin))
  // }

  // Allow all other requests
  return NextResponse.next()
})

// Configure middleware matcher
export const config = {
  matcher: [
    '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
    '/(api|trpc)(.*)',
    "/account",
    "/booking",
    "/order",
  ],
}
