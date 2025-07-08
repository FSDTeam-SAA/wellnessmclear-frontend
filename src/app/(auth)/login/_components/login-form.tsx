"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { z } from "zod"

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

const rememberedEmail = Cookies.get("rememberMeEmail")
const rememberMePassword = Cookies.get("rememberMePassword")
const isRemembered = !!rememberedEmail && !!rememberMePassword

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pending, startTransition] = useTransition()
  const [isMounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get("callback") || undefined

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: rememberedEmail ?? "",
      password: rememberMePassword ?? "",
      rememberMe: isRemembered ?? false,
    },
  })

  async function onSubmit(data: LoginFormValues) {
    startTransition(async () => {
      try {
        setIsLoading(true)

        // Handle remember me functionality
        if (data.rememberMe) {
          Cookies.set("rememberMeEmail", data.email, { expires: 30 })
          Cookies.set("rememberMePassword", data.password, { expires: 30 })
        } else {
          Cookies.remove("rememberMeEmail")
          Cookies.remove("rememberMePassword")
        }

        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (result?.error) {
          toast.error(result?.error)
          setIsLoading(false)
          return
        }

        if (result?.ok) {
          toast.success("Login successful!")
          router.push(callback ?? "/")
          router.refresh()
        }
      } catch (error) {
        console.error("Login error:", error)
        toast.error("An error occurred during login. Please try again.")
        setIsLoading(false)
      }
    })
  }

  const loading = isLoading || pending

  if (!isMounted) return null

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      type="email"
                      className="border-primary border-[1px] min-h-[45px] pl-10"
                      disabled={loading}
                    />
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="pr-10 pl-10 border-primary border-[1px] min-h-[45px]"
                      disabled={loading}
                    />
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} disabled={loading} />
                  <label htmlFor="rememberMe" className="text-sm font-medium text-gray-700">
                    Remember me
                  </label>
                </div>
              )}
            />
            <Link href="/forget-password" className="text-sm font-medium text-[#8C311ECC] hover:text-[#8C311ECC]/60">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full min-h-[45px]" disabled={loading}>
            {pending ? "Signing In..." : isLoading ? "Just a second..." : "Sign In"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <span className="text-gray-600">New to our platform?</span>{" "}
        <Link
          href={callback ? `/sign-up?callback=${callback}` : "/sign-up"}
          className="font-medium text-primary-blue hover:text-primary-blue/80"
        >
          Sign Up Here
        </Link>
      </div>
    </>
  )
}
