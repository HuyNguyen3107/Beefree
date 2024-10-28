"use server";
import { client } from "@/utils/client";
import { cookies } from "next/headers";
import { ironOptions } from "@/app/api/session/route";

export const handleUpdateUserInfo = async (userInfo, userData) => {
  try {
    const { firstName, lastName } = Object.fromEntries(userInfo);
    if (!firstName || !lastName) {
      throw new Error("Please fill in all fields");
    }

    const token = cookies().get("token");
    if (!token) {
      throw new Error("Unauthorized");
    }

    const { accessToken } = JSON.parse(token.value);
    client.setToken(accessToken);

    const { response, data } = await client.patch("/user", {
      firstName,
      lastName,
    });

    if (response.status !== 200) {
      throw new Error(data.error);
    }

    cookies().delete(ironOptions.cookieName);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      error: error.message,
      success: false,
    };
  }
};

export const handleChangePassword = async (passwordData) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } =
      Object.fromEntries(passwordData);
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      throw new Error("Please fill in all fields");
    }

    if (newPassword !== confirmNewPassword) {
      throw new Error("Passwords do not match");
    }

    const token = cookies().get("token");
    if (!token) {
      throw new Error("Unauthorized");
    }

    const { accessToken } = JSON.parse(token.value);
    client.setToken(accessToken);

    const { response, data } = await client.patch("/user/password", {
      currentPassword,
      newPassword,
      retypePassword: confirmNewPassword,
    });
    if (response.status !== 200) {
      throw new Error(data.error);
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      error: error.message,
      success: false,
    };
  }
};
