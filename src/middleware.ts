import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes
const protectedRoutes = [
  "/account",
  "/dashboard",
  "/profile",
  "/settings",
  // Add more protected routes here
]

// Define public routes that don't require authentication
// const publicRoutes = [
//   "/",
//   "/login",
//   "/sign-up",
//   "/reset-request",
//   "/about",
//   "/contact",
//   // Add more public routes here
// ]

interface AuthenticatedRequest extends NextRequest {
  auth?: unknown; // Replace 'unknown' with your actual auth type if available
}

export default auth((req: AuthenticatedRequest) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))

  // Check if the current route is public
//   const isPublicRoute = publicRoutes.some((route) => nextUrl.pathname === route || nextUrl.pathname.startsWith(route))

  // If user is not logged in and trying to access protected route
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/login", nextUrl.origin)
    loginUrl.searchParams.set("callback", nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is logged in and trying to access login/signup pages
  if (!isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/account", nextUrl.origin))
  }

  // Allow access to all other routes
  return NextResponse.next()
})

// Configure which routes the middleware should run on
export const config = {
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    * - public folder
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  // ],

  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
