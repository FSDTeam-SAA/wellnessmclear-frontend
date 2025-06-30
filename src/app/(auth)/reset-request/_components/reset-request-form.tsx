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

export default function ResetRequestForm() {
  // Initialize the form
  const form = useForm<ResetRequestFormValues>({
    resolver: zodResolver(resetReqestForm),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: ResetRequestFormValues) {
    console.log(data);
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
