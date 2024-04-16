import React from "react";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import myAvatar from "../../../../assets/images/myAvatar.jpg";
import { FaAngleDown } from "react-icons/fa";
import "./header.module.scss";

function Header() {
  return (
    <header className="bg-zinc-100 w-full px-6 py-6 shadow-white">
      <div className="flex justify-end items-center gap-x-3">
        <FaRegBell className="text-xl" />
        <div className="flex justify-start items-center gap-x-3">
          <div>
            <Image
              width={50}
              height={50}
              src={myAvatar}
              alt="avatar"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Nguyen Manh Huy</span>
            <span className="text-sm">Huy's organization</span>
          </div>
          <FaAngleDown />
        </div>
      </div>
    </header>
  );
}

export default Header;
