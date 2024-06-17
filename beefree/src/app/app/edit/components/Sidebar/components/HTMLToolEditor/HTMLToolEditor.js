"use client";
import React, { useEffect, useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import EditOptions from "../EditOptions/EditOptions";
import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { editorSlice } from "@/redux/slice/editorSlice";
const { updateHTML } = builderSlice.actions;

function HTMLToolEditor() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
  const columnIndex = useSelector((state) => state.builder.columnIndex);
  const rowIndex = useSelector((state) => state.builder.rowIndex);
  const [code, setCode] = useState(``);
  useEffect(() => {
    let html =
      data?.rows[rowIndex]?.columns[columnIndex]?.contents[contentIndex]
        ?.content;
    html = html.slice(html.indexOf(">") + 1, html.lastIndexOf("</"));
    setCode(html.trim());
  }, []);
  return (
    <div className="html_tool h-screen">
      <EditOptions />
      <div className="bg-gray-50 h-[78%] overflow-auto">
        <div className="py-5 px-5">
          <Editor
            height="400px"
            language="html"
            theme="vs-dark"
            value={code}
            options={{
              inlineSuggest: true,
              fontSize: "16px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { scale: 2 },
              autoClosingComments: true,
              autoClosingDelete: true,
              autoClosingOvertype: true,
              autoClosingQuotes: true,
              autoDetectHighContrast: true,
              autoIndent: true,
              automaticLayout: true,
              autoSurround: true,
              trimAutoWhitespace: true,
            }}
            onChange={(value) => {
              setCode(value);
              dispatch(updateHTML(value));
            }}
          />
        </div>
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
