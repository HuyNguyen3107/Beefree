"use client";
import React, {useEffect} from 'react';
import {handleCallback} from "@/utils/login";
import {useRouter} from "next/navigation";
import {setCookies} from "@/app/auth/[provider]/callback/action";

function Auth({params}) {
    const {provider} = params;
    const router = useRouter();
    const formRef = React.useRef(null);
    const [info, setInfo] = React.useState(null);
    const getData = async () => {
        const data = await handleCallback(provider, window.location.href);
        if (data.success) {
            setInfo(data);
        } else {
            router.push("/auth/login");
        }
    }
    useEffect(() => {
        if (info === null) {
            getData();
        } else {
            formRef.current.submit();
        }
    }, [info]);
    return (
        <div>
            Redirecting...
            <form
                action={async (form) => {
                    const res = await setCookies(info);
                    if (res.success) {
                        router.push("/app/projects");
                    } else {
                        router.push("/auth/login");
                    }
                }}
                style={{display: "none"}}
                ref={formRef}
            >
                <button></button>
            </form>
        </div>
    );
}

export default Auth;