import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

function RegisterPage() {
  return (
    <div className="w-[35%] absolute top-[50%] left-[30%] translate-x-[-50%] translate-y-[-50%] text-center">
      <h2 className="mb-3 text-[35px] font-semibold">
        Try <span className="text-violet-600">Beefree</span> - its free!
      </h2>
      <p className="text-[20px]">Breeze through: no credit card needed!</p>
      <div className="flex gap-x-2">
        <Button className="w-full mt-4 font-semibold" color="secondary">
          <FaGoogle />
          Continue with Google
        </Button>
        <Button className="w-full mt-4 font-semibold" color="secondary">
          <FaGithub />
          Continue with Github
        </Button>
      </div>
      <div className="flex items-center justify-center w-full mt-4">
        <div className="w-full h-[1px] bg-gray-300"></div>
        <div className="mx-4 text-gray-400">or</div>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>
      <RegisterForm />
      <div className="mt-2 text-[12px]">
        <p>
          By continuing, you agree to Beefree’s{" "}
          <Link href="#" className="text-violet-500 underline">
            Terms of Service
          </Link>
        </p>
        <p>
          Read our{" "}
          <Link href="#" className="text-violet-500 underline">
            Privacy Policy
          </Link>
        </p>
      </div>
      <div className="mt-4 text-[16px]">
        Already have an account?{" "}
        <Link href="/app/login" className="text-violet-500 underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
