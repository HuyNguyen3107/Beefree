"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { handleResetPassword } from "../action";
import { useParams, useRouter } from "next/navigation";
import { notifyError } from "@/utils/toast";

function ResetForm() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = {};
    params.slug.forEach((param) => {
      const [key, value] = param.split("-");
      data[`_${key}`] = value;
    });
    setData(data);
  }, []);

  return (
    <form
      className="mt-4 w-full max-w-sm"
      action={async (form) => {
        const response = await handleResetPassword(data, form);
        if (response.success) {
          router.push("/auth/login");
        } else {
          notifyError(response.error);
        }
      }}
    >
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
      <Button
        className="w-full mt-4 font-semibold"
        color="secondary"
        type="submit"
      >
        Reset Password
      </Button>
    </form>
  );
}

export default ResetForm;
