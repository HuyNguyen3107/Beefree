import React from "react";
import ResetForm from "./components/ResetForm";
import { client } from "@/utils/client";
import Link from "next/link";
import InvalidToken from "./components/InvalidToken";
import { cookies } from "next/headers";

const checkResetToken = async (obj) => {
  try {
    const params = new URLSearchParams(obj).toString();
    const { response, data } = await client.get(
      `/auth/reset-password?${params}`
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
};

async function ResetPasswordPage({ params }) {
  const data = {};
  if (params) {
    params.slug.forEach((param) => {
      const [key, value] = param.split("-");
      data[`_${key}`] = value;
    });
    const response = await checkResetToken(data);
    if (!response.success) {
      return <InvalidToken />;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Reset Password</h1>
      <ResetForm />
    </div>
  );
}

export default ResetPasswordPage;
