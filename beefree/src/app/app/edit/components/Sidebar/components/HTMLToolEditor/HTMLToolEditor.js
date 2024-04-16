"use client";
import React from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import EditOptions from "../EditOptions/EditOptions";

function HTMLToolEditor() {
  return (
    <div className="html_tool h-screen">
      <EditOptions />
      <div className="bg-gray-50 h-full overflow-auto">
        <div className="py-5 px-5 flex flex-col gap-y-5">
          <span className="font-bold text-[24px] opacity-60">
            HTML experts only
          </span>
          <p className="text-[14px] opacity-60">
            Using your own code may affect how the message is rendered. <br />
            Make sure to use correct and responsive HTML.
          </p>
        </div>
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          BLOCK OPTIONS
        </div>
        <div className="px-5 py-2 flex justify-between text-[14px] opacity-70 font-semibold items-center">
          <span>Hide on</span>
          <div className="flex items-center border text-[18px]">
            <div className="px-2 py-2 cursor-pointer border-r rounded-sm">
              <FaDesktop />
            </div>
            <div className="px-2 py-2 cursor-pointer">
              <MdPhoneAndroid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HTMLToolEditor;
