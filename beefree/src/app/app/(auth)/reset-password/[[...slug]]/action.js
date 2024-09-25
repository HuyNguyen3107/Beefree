"use server";
import { client } from "@/utils/client";
import { cookies } from "next/headers";

export async function handleResetPassword(form) {
  try {
    const { password, passwordRetype } = Object.fromEntries(form);

    if (!password || !passwordRetype) {
      throw new Error("Please fill in all fields");
    }

    if (password !== passwordRetype) {
      throw new Error("Passwords do not match");
    }

    const resetToken = cookies.get("resetToken");
    if (!resetToken) {
      throw new Error("Invalid reset token");
    }

    const email = cookies.get("user").email;

    const params = new URLSearchParams({
      _email: email,
      _reset_token: resetToken,
    }).toString();

    const { response, data } = await client.post(
      `/auth/reset-password?${params}`,
      {
        password,
        passwordRetype,
      }
    );

    if (!response.ok) {
      throw new Error(data.errors);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error.message,
      success: false,
    };
  }
}
