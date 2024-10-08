"use server";
import { client } from "@/utils/client";

export async function handleResetPassword(data, form) {
  const info = data;
  try {
    const { password, passwordRetype } = Object.fromEntries(form);

    if (!password || !passwordRetype) {
      throw new Error("Please fill in all fields");
    }

    if (password !== passwordRetype) {
      throw new Error("Passwords do not match");
    }

    const params = new URLSearchParams({
      _email: info._user_email,
      _reset_token: info._reset_token,
      _user_id: info._user_id,
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
