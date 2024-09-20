import React from "react";
import "./header.module.scss";
import DropdownMenuComponent from "./components/DropdownMenu";
import WorkSpace from "./components/WorkSpace";
import { cookies } from "next/headers";

function Header() {
  const token = cookies().get("token");
  console.log(token);

  return (
    <header className="bg-zinc-100 w-full px-4 py-4 shadow-white">
      <div className="flex justify-between items-center gap-x-3">
        <WorkSpace />
        <DropdownMenuComponent token={token} />
      </div>
    </header>
  );
}

export default Header;
