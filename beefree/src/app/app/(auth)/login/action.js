"use server";
import { client } from "@/utils/client";
import { isEmailValid, isPasswordValid } from "@/utils/regex";
import { cookies } from "next/headers";

export const handleLogin = async (loginInfo) => {
  try {
    const { email, password } = Object.fromEntries(loginInfo);

    if (!email || !password) {
      throw new Error("Please fill in all fields");
    }
    if (!isEmailValid(email)) {
      throw new Error("Invalid email address");
    }

    if (!isPasswordValid(password)) {
      throw new Error(
        "Password must be at least 8 characters long and contain at least one lowercase letter, and one number"
      );
    }

    const { response, data } = await client.post("/auth/login", {
      email,
      password,
    });

    if (!response.ok) {
      throw new Error(data.errors);
    }

    // set user data to cookies
    cookies().set("user", JSON.stringify(data.data), {
      maxAge: 60 * 60 * 192,
      path: "/",
    });

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
