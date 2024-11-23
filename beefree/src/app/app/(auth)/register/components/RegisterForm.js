"use client";

import React, {useState} from "react";
import {Button, Input} from "@nextui-org/react";
import {notifyWarning} from "@/utils/toast";
import {useRouter} from "next/navigation";
import {handleRegister} from "../action";

function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <form
                action={async (form) => {
                    // setIsLoading(true);
                    const response = await handleRegister(form);
                    setIsLoading(false);
                    if (!response.success) {
                        notifyWarning(response.error);
                        return;
                    }
                    router.push("/app/login");
                }}
            >
                <div className="flex gap-x-2">
                    <div className="mt-4 text-left w-full">
                        <label className="font-semibold" htmlFor="first-name">
                            First Name
                        </label>
                        <Input
                            className="w-full mt-2"
                            placeholder="Enter your First Name"
                            type="text"
                            required
                            color="secondary"
                            id="first-name"
                            name="firstName"
                        />
                    </div>
                    <div className="mt-4 text-left w-full">
                        <label className="font-semibold" htmlFor="last-name">
                            Last Name
                        </label>
                        <Input
                            className="w-full mt-2"
                            placeholder="Enter your Last Name"
                            type="text"
                            required
                            color="secondary"
                            id="last-name"
                            name="lastName"
                        />
                    </div>
                </div>
                <div className="mt-4 text-left">
                    <label className="font-semibold" htmlFor="email">
                        Email
                    </label>
                    <Input
                        className="w-full mt-2"
                        placeholder="Enter your Email"
                        type="email"
                        required
                        color="secondary"
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
                <Button
                    className="w-full mt-4 font-semibold"
                    color="secondary"
                    type="submit"
                    isDisabled={isLoading}
                >
                    {
                        isLoading ? "Loading..." : "Register"
                    }
                </Button>
            </form>
            {/*<Spinner isLoading={isLoading} />*/}
        </>
    );
}

export default RegisterForm;
