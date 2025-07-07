"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { useSession } from "next-auth/react";
import * as z from "zod";
import { toast } from "sonner";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

function ChangePassword() {
  // const { data: session } = useSession();

  const [passwords, setPasswords] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (
    field: keyof PasswordFormData,
    value: string
  ) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const passwordMutation = useMutation<unknown, Error, PasswordFormData>({
    mutationFn: async (data: PasswordFormData) => {
      // const token = session?.user?.accessToken;

      const payload = {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const response = await res.json();
      if (!res.ok || !response?.status) {
        throw new Error(response?.message || "Failed to update password");
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success( "Password changed successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (err: Error) => {
      console.error(err);
      toast.error(err.message || "Failed to change password");
    },
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parse = passwordSchema.safeParse(passwords);
    if (!parse.success) {
      const message = parse.error.errors[0]?.message || "Invalid input";
      toast.error(message);
      return;
    }

    passwordMutation.mutate(passwords);
  };

  return (
    <form onSubmit={handlePasswordSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="lg:text-2xl md:text-xl text-base font-semibold leading-[120%] text-[#131313]">
          Change password
        </h3>
        <Button
          type="submit"
          className="bg-[#A8C2A3] hover:bg-green-600 text-white w-[130px]"
        >
          Save
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <Label
            htmlFor="currentPassword"
            className="text-base font-medium text-[#131313]"
          >
            Current Password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            value={passwords.currentPassword}
            onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
            placeholder="Enter current password"
            className="mt-1 h-[52px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="newPassword"
              className="text-base font-medium text-[#131313]"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
              placeholder="Enter new password"
              className="mt-1 h-[52px]"
            />
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="text-base font-medium text-[#131313]"
            >
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
              placeholder="Confirm new password"
              className="mt-1 h-[52px]"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ChangePassword;
