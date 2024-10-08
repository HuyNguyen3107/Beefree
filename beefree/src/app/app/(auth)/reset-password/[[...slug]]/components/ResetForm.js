"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { handleResetPassword } from "../action";
import { useRouter } from "next/navigation";
import { notifyError } from "@/utils/toast";

function ResetForm() {
  const router = useRouter();
  return (
    <form
      className="mt-4 w-full max-w-sm"
      action={async (form, a = "abe") => {
        const response = await handleResetPassword(form);
        if (response.success) {
          router.push("/auth/login");
        } else {
          notifyError(response.error);
        }
      }}
    >
      <div className="mt-4 text-left">
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <Input
          className="w-full mt-2"
          placeholder="Enter your email"
          type="email"
          color="secondary"
          required
          id="email"
          name="email"
        />
      </div>
      <div className="mt-4 text-left">
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <Input
          className="w-full mt-2"
          placeholder="Enter your password"
          type="password"
          color="secondary"
          required
          id="password"
          name="password"
        />
      </div>
      <div className="mt-4 text-left">
        <label className="font-semibold" htmlFor="password-retype">
          Confirm Password
        </label>
        <Input
          className="w-full mt-2"
          placeholder="Confirm your password"
          type="password"
          color="secondary"
          required
          id="password-retype"
          name="passwordRetype"
        />
      </div>
      <Button className="w-full mt-4 font-semibold" color="secondary" auto>
        Reset Password
      </Button>
    </form>
  );
}

export default ResetForm;
