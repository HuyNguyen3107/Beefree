import React from "react";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { FaFolder } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";

function SideBar() {
  return (
    <aside className="aside">
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
          href={"#"}
          className="flex items-center gap-x-3 px-4 py-4 text-purple-600 bg-zinc-100 font-semibold text-lg rounded-sm"
        >
          <FaFolder /> Projects
        </Link>
        <Link
          href={"#"}
          className="flex items-center gap-x-3 px-4 py-4 font-semibold text-lg rounded-sm"
        >
          <FaRegBookmark /> Library
        </Link>
        <Link
          href={"#"}
          className="flex items-center gap-x-3 px-4 py-4 font-semibold text-lg rounded-sm"
        >
          <CiSettings /> Settings
        </Link>
      </div>
    </aside>
  );
}

export default SideBar;
