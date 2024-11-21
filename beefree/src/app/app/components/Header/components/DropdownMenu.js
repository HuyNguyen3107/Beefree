"use client";
import React, {useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,} from "@nextui-org/react";
import {FaAngleDown, FaRegBell} from "react-icons/fa";
import AvatarComponent from "./Avatar";
import Link from "next/link";
import {client} from "@/utils/client";
import Spinner from "@/components/Spinner/Spinner";
import {useRouter} from "next/navigation";
import {clearCookies, setCookies} from "../action";
import {notifyError} from "@/utils/toast";

function DropdownMenuComponent({token, data: userData}) {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const formDelRef = React.useRef(null);
    const formSetRef = React.useRef(null);

    const handleLogout = async (access, refresh) => {
        setLoading(true);

        let accessToken = "";
        let refreshToken = "";
        if (access && refresh) {
            accessToken = access;
            refreshToken = refresh;
        } else {
            const {accessTokenParse, refreshTokenParse} = JSON.parse(token);
            accessToken = accessTokenParse;
            refreshToken = refreshTokenParse;
        }

        client.setToken(accessToken);
        const {response, data} = await client.post("/auth/logout", {
            refreshToken,
        });
        setLoading(false);

        if (response.status === 401) {
            // refresh token
            const {response: refreshResponse, data: refreshData} =
                await client.post("/auth/refresh", {
                    refreshToken,
                });
            if (!refreshResponse.ok) {
                formDelRef.current.requestSubmit();
                router.push("/auth/login");
            } else {
                setData(refreshData);
                formSetRef.current.requestSubmit();
            }
        }

        if (response.ok) {
            formDelRef.current.requestSubmit();
        }
    };

    return (
        <div className="flex justify-end gap-x-5 items-center">
            <FaRegBell className="text-xl cursor-pointer"/>
            <Dropdown>
                <DropdownTrigger>
                    <div className="flex items-center gap-x-6 cursor-pointer">
                        <div className="flex justify-start items-center gap-x-3">
                            <AvatarComponent/>
                            <div className="flex flex-col">
                <span className="font-bold">
                  {userData?.firstName} {userData?.lastName}
                </span>
                                <span className="text-sm">Organization</span>
                            </div>
                            <FaAngleDown/>
                        </div>
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" color="secondary">
                    <DropdownItem key="profile">
                        <Link href={"/app/profile"} className="block w-full">
                            Profile
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="projects">
                        <Link href={"/app/projects"} className="block w-full">
                            Projects
                        </Link>
                    </DropdownItem>
                    <DropdownItem
                        key="logout"
                        className="text-danger"
                        color="danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Spinner isLoading={isLoading}/>
            <form
                action={async (form) => {
                    await clearCookies();
                    router.push("/auth/login");
                }}
                style={{display: "none"}}
                ref={formDelRef}
            >
                <button></button>
            </form>
            <form
                action={async (form) => {
                    const response = await setCookies(data);
                    if (!response.success) {
                        notifyError(response.error);

                    } else {
                        handleLogout(data.accessToken, data.refreshToken);
                    }
                }}
                style={{display: "none"}}
                ref={formSetRef}
            >
                <button></button>
            </form>
        </div>
    );
}

export default DropdownMenuComponent;
