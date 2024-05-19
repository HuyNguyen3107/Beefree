"use client";

import { AiOutlineAppstore } from "react-icons/ai";
import { GoRows } from "react-icons/go";
import { RiPagesLine } from "react-icons/ri";
import React from "react";
import { Draggable } from "../Draggable/Draggable";
import { contents } from "@/core/content";
import ContentSidebar from "./components/ContentSidebar/ContentSidebar";
import { useSelector, useDispatch } from "react-redux";
import { editorSlice } from "@/redux/slice/editorSlice";
import { builderSlice } from "@/redux/slice/builderSlice";
const {
  updateContent,
  updateContentIndex,
  updateColumnIndex,
  updateRowIndex,
  changeRowEditStatus,
} = builderSlice.actions;
const { updateSidebar, updateEditor } = editorSlice.actions;

function Sidebar() {
  const sidebar = useSelector((state) => state.editor.sidebar);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    let type = e.target.id;
    let target = e.target;
    while (!type) {
      target = target.parentElement;
      type = target.id;
      if (type) {
        break;
      }
    }
    dispatch(updateSidebar(type));
    dispatch(updateEditor(null));
    dispatch(
      updateContent({
        hideEditor: true,
      })
    );
    dispatch(updateContentIndex(null));
    dispatch(updateColumnIndex(null));
    dispatch(updateRowIndex(null));
    dispatch(changeRowEditStatus(null));
  };
  return (
    <aside className="sidebar shadow-md h-3/5">
      <div className="grid grid-cols-3">
        <div
          className={
            "flex items-center gap-x-3 px-4 py-4 col-span-1 border cursor-pointer" +
            (sidebar.type === "contents" ? "" : " bg-zinc-200")
          }
          onClick={(e) => handleClick(e)}
          id="contents"
        >
          <AiOutlineAppstore className="text-2xl" />{" "}
          <span className="text-[14px] font-semibold">CONTENT</span>
        </div>
        <div
          className={
            "flex items-center gap-x-3 px-4 py-4 col-span-1 border cursor-pointer" +
            (sidebar.type === "rows" ? "" : " bg-zinc-200")
          }
          onClick={(e) => handleClick(e)}
          id="rows"
        >
          <GoRows className="text-2xl" />{" "}
          <span className="text-[14px] font-semibold">ROWS</span>
        </div>
        <div
          className={
            "flex items-center gap-x-3 px-4 py-4 col-span-1 border cursor-pointer" +
            (sidebar.type === "settings" ? "" : " bg-zinc-200")
          }
          onClick={(e) => handleClick(e)}
          id="settings"
        >
          <RiPagesLine className="text-2xl" />{" "}
          <span className="text-[14px] font-semibold">SETTINGS</span>
        </div>
      </div>
      {sidebar.sidebar}
    </aside>
  );
}

export default Sidebar;
