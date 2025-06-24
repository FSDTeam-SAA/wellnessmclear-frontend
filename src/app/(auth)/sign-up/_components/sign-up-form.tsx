"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema, SignUpFormValues } from "@/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") || undefined;

  const { mutate: registeruser, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: SignUpFormValues) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      console.log(data);
      // handle success
      if (data.status) {
        setLoading(true);
        toast.success("Registration successfully");
        router.push(callback ? `/login?callback=${callback}` : "/login");
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Initialize the form
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  async function onSubmit(data: SignUpFormValues) {
    registeruser(data);
  }

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const isLoading = loading;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
          {/* Name field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your first Name"
                      type="text"
                      autoComplete="name"
                      className="border-primary border-[1px]  min-h-[45px] "
                      disabled={isLoading}
                      startIcon={User}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your last Name"
                      type="text"
                      autoComplete="name"
                      className="border-primary border-[1px]  min-h-[45px] "
                      disabled={isLoading}
                      startIcon={User}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your Email"
                      type="email"
                      autoComplete="email"
                      className="border-primary border-[1px]  min-h-[45px]"
                      disabled={isLoading}
                      startIcon={Mail}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Create a Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className=" pr-10 border-primary border-[1px]  min-h-[45px]"
                      disabled={isLoading}
                      startIcon={Lock}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Confirm a Password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className=" pr-10 border-primary border-[1px]  min-h-[45px]"
                      disabled={isLoading}
                      startIcon={Lock}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-gray-400"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember me */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium text-gray-700"
                >
                  Remember me
                </label>
              </div>
            )}
          />

          {/* Submit button */}
          <Button
            type="submit"
            className=" min-h-[45px] w-full"
            disabled={isLoading}
          >
            {isPending
              ? "Signing Up..."
              : loading
              ? "Just a second..."
              : "Sign Up"}
          </Button>
        </form>
      </Form>

      {/* Login link */}
      <div className="text-center text-sm">
        <span className="text-gray-600">Already have Account?</span>{" "}
        <Link
          href={callback ? `/login?callback=${callback}` : "/login"}
          className="font-medium text-orange-500 hover:text-orange-600"
        >
          Sign In Here
        </Link>
      </div>
    </>
  );
}
