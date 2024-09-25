"use server";
import { client } from "@/utils/client";

export const handleResetPassword = async (email) => {
  try {
    const { response, data } = await client.post("/auth/reset-password", {
      email,
    });

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
};
