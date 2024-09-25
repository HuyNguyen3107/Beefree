"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { handleLogin } from "../../action";
import { notifyWarning } from "@/utils/toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import ModalForgotPassword from "../Modal/Modal";

function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <form
        action={async (form) => {
          setIsLoading(true);
          const response = await handleLogin(form);
          setIsLoading(false);
          if (!response.success) {
            notifyWarning(response.error);
            return;
          }
          router.push("/app/projects");
        }}
      >
        <div className="mt-4 text-left">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <Input
            className="w-full mt-2"
            placeholder="Enter your Email"
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
            placeholder="Enter your Password"
            type="password"
            required
            color="secondary"
            id="password"
            name="password"
          />
        </div>
        <div className="text-left text-[12px] text-violet-500 mt-4">
          <ModalForgotPassword onSetIsLoading={setIsLoading} />
        </div>
        <Button
          className="w-full mt-4 font-semibold"
          color="secondary"
          type="submit"
        >
          Login
        </Button>
      </form>
      <Spinner isLoading={isLoading} />
    </>
  );
}

export default LoginForm;
