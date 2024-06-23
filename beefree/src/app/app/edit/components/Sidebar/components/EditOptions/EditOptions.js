"use client";

import React from "react";
import { BsChatSquare } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { IoCopySharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { editorSlice } from "@/redux/slice/editorSlice";
import { builderSlice } from "@/redux/slice/builderSlice";
// const { updateEditor } = editorSlice.actions;

function EditOptions() {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80">
        CONTENT PROPERTIES
      </div>
      <div className="flex items-center">
        {/* <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
          <BsChatSquare />
        </div> */}
        <div
          className="px-4 py-2 border-l text-[18px] cursor-pointer"
          onClick={() => {
            dispatch(builderSlice.actions.deleteContent());
            dispatch(editorSlice.actions.updateEditor(null));
            dispatch(builderSlice.actions.updateContentIndex(null));
          }}
        >
          <CiTrash />
        </div>
        <div
          className="px-4 py-2 border-l text-[18px] cursor-pointer"
          onClick={() => {
            dispatch(builderSlice.actions.replicationContent());
          }}
        >
          <IoCopySharp />
        </div>
        <div
          className="px-4 py-2 border-l text-[18px] cursor-pointer"
          onClick={() => {
            dispatch(editorSlice.actions.updateEditor(null));
            dispatch(
              builderSlice.actions.updateContent({
                hideEditor: true,
              })
            );
            dispatch(builderSlice.actions.updateContentIndex(null));
          }}
        >
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
}

export default EditOptions;
