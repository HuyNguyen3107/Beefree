import React from "react";
import "./header.module.scss";
import DropdownMenuComponent from "./components/DropdownMenu";
import WorkSpace from "./components/WorkSpace";
import {cookies, headers} from "next/headers";
import {getSessionServer} from "@/utils/session";

async function Header() {
    const token = cookies().get("token");
    // console.log(headers().get("cookie"));
    const session = await getSessionServer(headers().get("cookie"));
    // console.log(session);
    return (
        <header className="bg-zinc-100 w-full px-4 py-4 shadow-white h-[10%] relative z-50">
            <div className="flex justify-between items-center gap-x-3">
                <WorkSpace/>
                <DropdownMenuComponent token={token.value} data={session.data}/>
            </div>
        </header>
    );
}

export default Header;
