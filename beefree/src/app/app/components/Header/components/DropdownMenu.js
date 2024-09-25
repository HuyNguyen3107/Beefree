"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaRegBell } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import AvatarComponent from "./Avatar";
import Link from "next/link";
import { client } from "@/utils/client";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { clearCookies } from "../action";

function DropdownMenuComponent({ token }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const formRef = React.useRef(null);
  const handleLogout = async () => {
    setLoading(true);
    const { accessToken, refreshToken } = JSON.parse(token.value);
    client.setToken(accessToken);

    const { response, data } = await client.post("/auth/logout", {
      refreshToken,
    });
    setLoading(false);

    if (response.status === 401) {
      // refresh token
      const { response: refreshResponse, data: refreshData } =
        await client.post("/auth/refresh", {
          refreshToken,
        });
      if (!refreshResponse.ok) {
        formRef.current.requestSubmit();
        router.push("/auth/login");
      }
    }

    if (response.ok) {
      formRef.current.requestSubmit();
    }
  };
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex items-center gap-x-6 cursor-pointer">
            <FaRegBell className="text-xl cursor-pointer" />
            <div className="flex justify-start items-center gap-x-3">
              <AvatarComponent />
              <div className="flex flex-col">
                <span className="font-bold">Nguyen Manh Huy</span>
                <span className="text-sm">Huy organization</span>
              </div>
              <FaAngleDown />
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
      <Spinner isLoading={isLoading} />
      <form
        action={async (form) => {
          await clearCookies();
          router.push("/auth/login");
        }}
        style={{ display: "none" }}
        ref={formRef}
      >
        <button></button>
      </form>
    </>
  );
}

export default DropdownMenuComponent;
