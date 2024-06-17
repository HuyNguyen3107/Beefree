"use client";
import React, { useState, useEffect } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import EditOptions from "../EditOptions/EditOptions";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { editorSlice } from "@/redux/slice/editorSlice";
const { updateHeight } = builderSlice.actions;
import { getStyleObjectFromString } from "@/utils/convert";

function SpaceToolEditor() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  const rowIndex = useSelector((state) => state.builder.rowIndex);
  const columnIndex = useSelector((state) => state.builder.columnIndex);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
  const [height, setHeight] = useState(100);
  useEffect(() => {
    const dataSpace =
      data?.rows[rowIndex]?.columns[columnIndex]?.contents[contentIndex];
    const content = dataSpace?.content;
    let style = content?.match(/style=".*?"/g);
    if (style?.length) {
      style = style[0].replace(/style="/g, "").replace(/"/g, "");
      const obj = getStyleObjectFromString(style);
      if (obj.height) {
        const value = obj.height.replace("px", "");
        setHeight(+value);
      }
    }
  }, []);
  return (
    <div className="space_tool h-screen">
      <EditOptions />
      <div className="bg-gray-50 h-full overflow-auto">
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">Height</span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
              <div className="flex border rounded-sm">
                <div
                  className="bg-white px-2 border text-[14px] cursor-pointer"
                  onClick={() => {
                    let value = height;
                    value = value - 5;
                    if (value < 0) {
                      value = 0;
                    }
                    setHeight(value);
                    dispatch(updateHeight(value));
                  }}
                >
                  -
                </div>
                <div className="bg-white px-2 border text-[15px] ">
                  {height}
                </div>
                <div
                  className="bg-white px-2 border text-[14px] cursor-pointer"
                  onClick={() => {
                    let value = height;
                    value = value + 5;
                    setHeight(value);
                    dispatch(updateHeight(value));
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
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

export default SpaceToolEditor;
