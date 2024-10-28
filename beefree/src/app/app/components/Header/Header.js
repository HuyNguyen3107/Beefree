import React from "react";
import "./header.module.scss";
import DropdownMenuComponent from "./components/DropdownMenu";
import WorkSpace from "./components/WorkSpace";
import { cookies } from "next/headers";
import { getSessionServer } from "@/utils/session";
import { headers } from "next/headers";

async function Header() {
  const token = cookies().get("token");
  const session = await getSessionServer(headers().get("cookie"));

  return (
    <header className="bg-zinc-100 w-full px-4 py-4 shadow-white">
      <div className="flex justify-between items-center gap-x-3">
        <WorkSpace />
        <DropdownMenuComponent token={token.value} data={session.data} />
      </div>
    </header>
  );
}

export default Header;
