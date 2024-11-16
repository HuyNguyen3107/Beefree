"use client";

import React from 'react';
import {Button} from "@nextui-org/react";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {handleGetRedirect} from "@/utils/login";

function SocialLogin() {
    const handleRedirect = async (provider) => {
        const redirect = await handleGetRedirect(provider);
        if (redirect) {
            window.location.href = redirect;
        }
    }
    return (
        <>
            <div className="flex gap-x-2">
                <Button
                    className="w-full mt-4 font-semibold" color="secondary" onClick={() => handleRedirect("google")}
                >
                    <FaGoogle/>
                    Continue with Google
                </Button>
                <Button
                    className="w-full mt-4 font-semibold" color="secondary" onClick={() => handleRedirect("github")}
                >
                    <FaGithub/>
                    Continue with Github
                </Button>
            </div>
        </>
    );
}

export default SocialLogin;