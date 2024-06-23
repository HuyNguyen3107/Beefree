"use client";

import React from "react";
import logo from "../../../../public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { FaFolder } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { notifyInfo } from "@/utils/toast";

function Navigation() {
  let pathname = usePathname();
  pathname = pathname.slice(pathname.lastIndexOf("/") + 1);
  if (pathname !== "settings" && pathname !== "projects") {
    pathname = "projects";
  }
  return (
    <div className="h-[95%]">
      <div>
        <Link
          href={"/"}
          className="flex items-center pl-2 gap-x-3 py-2 justify-center mt-4"
        >
          <Image src={logo} alt="logo beefree" />
        </Link>
      </div>
      <div className="mt-14 px-2 py-2">
        <Link
          href={"/app/projects"}
          className={
            "flex items-center gap-x-3 px-4 py-4 font-semibold text-lg rounded-sm" +
            (pathname === "projects" ? " text-purple-600 bg-zinc-100" : "")
          }
        >
          <FaFolder /> Projects
        </Link>
        <Link
          href={"#"}
          className="flex items-center gap-x-3 px-4 py-4 font-semibold text-lg rounded-sm"
          onClick={() => {
            notifyInfo("This feature is coming soon!");
          }}
        >
          <FaTableList /> Activity
        </Link>
        <Link
          href={"#"}
          className="flex items-center gap-x-3 px-4 py-4 font-semibold text-lg rounded-sm"
          onClick={() => {
            notifyInfo("This feature is coming soon!");
          }}
        >
          <FaRegBookmark /> Library
        </Link>
        <Link
          href={"/app/settings"}
          className={
            "flex items-center gap-x-3 px-4 py-4 font-semibold text-lg rounded-sm" +
            (pathname === "settings" ? " text-purple-600 bg-zinc-100" : "")
          }
        >
          <CiSettings /> Settings
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
