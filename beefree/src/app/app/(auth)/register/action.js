"use server";

import {client} from "@/utils/client";
import {isEmailValid, isPasswordValid} from "@/utils/regex";

export const handleRegister = async (registerInfo) => {
    try {
        const {email, password, firstName, lastName} =
            Object.fromEntries(registerInfo);

        if (!email || !password || !firstName || !lastName) {
            throw new Error("Please fill in all fields");
        }
        if (!isEmailValid(email)) {
            throw new Error("Invalid email address");
        }

        if (!isPasswordValid(password)) {
            throw new Error(
                "Password need between 6 and 20 characters, at least one number, one uppercase letter, and one lowercase letter"
            );
        }

        const {response, data} = await client.post("/auth/register", {
            email,
            password,
            firstName,
            lastName,
        });

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
