import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { FaRegFileCode } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { FaPen } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaRegQuestionCircle } from "react-icons/fa";
import ExportButton from "./components/ExportButton/ExportButton";
import MessageButton from "./components/MessageButton/MessageButton";
import PreviewButton from "./components/PreviewButton/PreviewButton";
import NameFile from "./components/NameFile/NameFile";
import SaveButton from "./components/SaveButton/SaveButton";
import { cookies } from "next/headers";

function Header() {
  const token = cookies().get("token");
  const { accessToken } = JSON.parse(token.value);

  return (
    <header className="header px-3 py-3 flex justify-between items-center shadow shadow-gray-100">
      <div className="flex items-center gap-x-8">
        <div className="flex items-center gap-x-4">
          <Link
            href={"/app/projects"}
            className="border px-2 py-2 rounded-md border-black hover:bg-violet-200"
          >
            <FaAngleLeft />
          </Link>
          <NameFile />
          <span className="flex items-center bg-indigo-300 px-1 py-1 gap-x-2 text-sm rounded-md">
            <MdEmail /> Email
          </span>
        </div>
        <div className="flex items-center gap-x-5">
          <PreviewButton />|{" "}
          <div className="hover:bg-violet-200 px-2 py-2 rounded-md cursor-pointer">
            <VscSend />
          </div>{" "}
          |{" "}
          <div className="hover:bg-violet-200 px-2 py-2 rounded-md cursor-pointer">
            <FaPen />
          </div>{" "}
          | <MessageButton />|{" "}
          <div className="hover:bg-violet-200 px-2 py-2 rounded-md cursor-pointer">
            <AiOutlineGlobal />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-5">
        {/* <span>Saved!</span> */}
        <Link href={"#"}>
          <FaRegQuestionCircle />
        </Link>
        <SaveButton accessToken={accessToken} />
        <ExportButton />
      </div>
    </header>
  );
}

export default Header;
