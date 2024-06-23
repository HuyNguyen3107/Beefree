import React from "react";
import "./header.module.scss";
import DropdownMenuComponent from "./components/DropdownMenu";
import WorkSpace from "./components/WorkSpace";

function Header() {
  return (
    <header className="bg-zinc-100 w-full px-4 py-4 shadow-white">
      <div className="flex justify-between items-center gap-x-3">
        <WorkSpace />
        <DropdownMenuComponent />
      </div>
    </header>
  );
}

export default Header;
