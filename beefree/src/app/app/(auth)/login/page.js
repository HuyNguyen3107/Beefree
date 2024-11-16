import React from "react";
import Link from "next/link";
import LoginForm from "./components/LoginForm/LoginForm";
import SocialLogin from "@/app/app/(auth)/login/components/SocialLogin/SocialLogin";

function LoginPage() {
    return (
        <div className="w-[35%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
            <h2 className="mb-3 text-[35px] font-semibold">
                Welcome back to <span className="text-violet-600">Beefree</span>
            </h2>
            <p className="text-[20px]">Login with your account</p>
            <SocialLogin/>
            <div className="flex items-center justify-center w-full mt-4">
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="mx-4 text-gray-400">or</div>
                <div className="w-full h-[1px] bg-gray-300"></div>
            </div>
            <LoginForm/>
            <div className="mt-4 text-[16px]">
                Do not have an account yet?{" "}
                <Link href="/app/register" className="text-violet-500 underline">
                    Create an account
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;
