"use client";
import React from "react";
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

function DropdownMenuComponent() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center gap-x-6 cursor-pointer">
          <FaRegBell className="text-xl cursor-pointer" />
          <div className="flex justify-start items-center gap-x-3">
            <AvatarComponent />
            <div className="flex flex-col">
              <span className="font-bold">Nguyen Manh Huy</span>
              <span className="text-sm">Huy's organization</span>
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
        <DropdownItem key="logout" className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownMenuComponent;
