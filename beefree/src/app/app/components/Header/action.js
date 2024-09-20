"use server";
import { cookies } from "next/headers";

export const clearCookies = async () => {
  try {
    // delete all cookies automatically
    const allCookies = cookies().getAll();
    allCookies.forEach((cookie) => {
      cookies().delete(cookie.name);
    });
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
