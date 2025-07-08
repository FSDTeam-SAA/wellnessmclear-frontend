"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetReqestForm, ResetRequestFormValues } from "@/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function ResetRequestForm() {
  // Initialize the form
  const form = useForm<ResetRequestFormValues>({
    resolver: zodResolver(resetReqestForm),
    defaultValues: {
      email: "",
    },
  });

  const session = useSession();
  // Use type assertion if you are sure accessToken exists on user
  const TOKEN = (session?.data?.user as { accessToken?: string })?.accessToken;

  const forgotPassMutation = useMutation({
  mutationFn: async (bodyData: { email: string }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(bodyData),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return res.json(); // returns the response data
  },
});


  // Handle form submission
  async function onSubmit(data: ResetRequestFormValues) {
    console.log(data);
    forgotPassMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    placeholder="Enter your email"
                    type="email"
                    className="border-primary border-[1px]  min-h-[45px] "
                    disabled={false}
                    startIcon={Mail}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button type="submit" className="w-full  min-h-[45px]" disabled={false}>
          {false ? "Please wait..." : "Send OTP"}
        </Button>
      </form>
    </Form>
  );
}
