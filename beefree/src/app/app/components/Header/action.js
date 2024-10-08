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

export const setCookies = async (data) => {
  try {
    cookies().set(
      "token",
      JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }),
      {
        maxAge: 60 * 60 * 192,
        path: "/",
        httpOnly: true,
      }
    );
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
