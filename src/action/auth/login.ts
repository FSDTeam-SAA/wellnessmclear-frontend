"use server";

import { loginFormSchema, LoginFormValues } from "@/schemas/auth";
import { cookies } from "next/headers";

export async function loginAction(data: LoginFormValues) {
  const parsedData = loginFormSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid form input. Please check your email and password.",
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsedData.data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message || "Login failed. Please check your credentials.",
      };
    }

    // Manage "Remember Me" cookies using the reusable function
    await manageRememberMeCookies(
      !!data.rememberMe,
      data.rememberMe ? data.email : undefined,
      data.rememberMe ? data.password : undefined
    );
    return {
      success: true,
      message: "Login successful. Welcome back!",
      data: result, // optional, includes token/user info
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong while logging in.",
    };
  }
}

/**
 * A reusable server action to manage "Remember Me" cookies.
 *
 * @param {boolean} rememberMe - Whether the user wants to be remembered.
 * @param {string | undefined} email - The email to store in the cookie (optional if deleting).
 * @param {string | undefined} password - The password to store in the cookie (optional if deleting).
 */
export async function manageRememberMeCookies(
  rememberMe: boolean,
  email?: string,
  password?: string
) {
  const cookieOptions = {
    sameSite: "strict" as const, // Prevents the cookie from being sent with cross-site requests
    maxAge: 2592000, // Expires after 30 days (in seconds)
  };

  if (rememberMe && email && password) {
    // Set the "rememberMeEmail" and "rememberMePassword" cookies
    cookies().set({
      name: "rememberMeEmail",
      value: email,
      ...cookieOptions,
    });
    cookies().set({
      name: "rememberMePassword",
      value: password,
      ...cookieOptions,
    });
  } else {
    // Delete the "rememberMeEmail" and "rememberMePassword" cookies
    cookies().delete("rememberMeEmail");
    cookies().delete("rememberMePassword");
  }
}
