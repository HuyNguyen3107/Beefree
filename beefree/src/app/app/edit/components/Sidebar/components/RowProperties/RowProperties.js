"use client";

import React from "react";
import { BsChatSquare } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { IoCopySharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { editorSlice } from "@/redux/slice/editorSlice";
// import { builderSlice } from "@/redux/slice/builderSlice";
// const { updateEditor } = editorSlice.actions;

function RowProperties() {
  //   const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between bg-white">
      <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80">
        ROW PROPERTIES
      </div>
      <div className="flex items-center">
        <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
          <FaRegSave />
        </div>
        <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
          <BsChatSquare />
        </div>
        <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
          <CiTrash />
        </div>
        <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
          <IoCopySharp />
        </div>
        <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
}

export default RowProperties;
