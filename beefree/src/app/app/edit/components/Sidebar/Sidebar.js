"use client";

import { AiOutlineAppstore } from "react-icons/ai";
import { GoRows } from "react-icons/go";
import { RiPagesLine } from "react-icons/ri";
import React from "react";
import { Draggable } from "../Draggable/Draggable";
import { contents } from "@/utils/content";
import TitleToolEdit from "./components/TitleToolEdit/TitleToolEdit";

function Sidebar() {
  return (
    <aside className="sidebar shadow-md">
      <div className="grid grid-cols-3">
        <div className="flex items-center gap-x-3 px-4 py-4 col-span-1 border cursor-pointer">
          <AiOutlineAppstore className="text-2xl" />{" "}
          <span className="font-normal">CONTENT</span>
        </div>
        <div className="flex items-center gap-x-3 px-4 py-4 col-span-1 border cursor-pointer bg-zinc-200">
          <GoRows className="text-2xl" />{" "}
          <span className="font-normal">ROWS</span>
        </div>
        <div className="flex items-center gap-x-3 px-4 py-4 col-span-1 border cursor-pointer bg-zinc-200">
          <RiPagesLine className="text-2xl" />{" "}
          <span className="font-normal">SETTINGS</span>
        </div>
      </div>
      {/* <div className="grid grid-cols-3 px-4 py-4 gap-3 bg-slate-50">
        {contents.map((item, index) => {
          return (
            <Draggable id={item.id} key={index}>
              <div className="col-span-1 shadow-md bg-white px-1 py-3 text-sm flex flex-col justify-center items-center gap-y-3 cursor-pointer hover:scale-110">
                <div className="text-5xl">{item.icon}</div>{" "}
                {item.id.toLocaleUpperCase()}
              </div>
            </Draggable>
          );
        })}
      </div> */}
      <TitleToolEdit />
    </aside>
  );
}

export default Sidebar;
