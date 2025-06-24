"use server";

import { loginFormSchema, LoginFormValues } from "@/schemas/auth";

export async function loginAction(data: LoginFormValues) {
  const parsedData = loginFormSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid form input. Please check your email and password.",
    };
  }

  const { email, password } = parsedData.data;

  if (email !== "user@example.com" || password !== "securePassword123") {
    return {
      success: false,
      message: "Incorrect email or password.",
    };
  }

  return {
    success: true,
    message: "Login successful.",
  };
}
